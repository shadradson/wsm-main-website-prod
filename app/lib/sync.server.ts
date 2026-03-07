/**
 * Salesforce -> D1 sync logic.
 * Called by the scheduled cron handler.
 */
import { getAccessToken, soqlQuery, fetchImage } from "./salesforce.server";

interface SyncEnv {
	DB: D1Database;
	ASSETS_BUCKET: R2Bucket;
	SF_CLIENT_ID: string;
	SF_CLIENT_SECRET: string;
	SF_INSTANCE_URL: string;
}

// ── Contact fields from Salesforce ──────────────────────────────────
interface SFContact {
	Id: string;
	FirstName: string;
	LastName: string;
	zbe_Certifications__c: string | null;
	zbe_AboutUsSortOrder__c: number | null;
	Trailblazer_Account_URL__c: string | null;
	WSM_Website_Photo_1__c: string | null;
}

const CONTACT_QUERY = `
	SELECT Id, FirstName, LastName,
		zbe_Certifications__c, zbe_AboutUsSortOrder__c,
		Trailblazer_Account_URL__c, WSM_Website_Photo_1__c
	FROM Contact
	WHERE zbe_AboutUsSortOrder__c != null
	ORDER BY zbe_AboutUsSortOrder__c ASC
`;

// ── Article fields from Salesforce ──────────────────────────────────
interface SFArticle {
	Id: string;
	Name: string;
	Subtitle__c: string | null;
	Short_Description__c: string | null;
	Article_Body__c: string | null;
	HTML_Body__c: string | null;
	Article_Category__c: string | null;
	Subcategory__c: string | null;
	Author__c: string | null;
	Author_First_Name__c: string | null;
	Author_Last_Name__c: string | null;
	Author_Title__c: string | null;
	Splash_Image_URL__c: string | null;
	Splash_Image_Background__c: string | null;
	Publish_Status__c: string | null;
	Order__c: number | null;
	Navigation_Type__c: string | null;
	NavJSON__c: string | null;
	Rich_Text_or_HTML_body__c: string | null;
	Intended_Audiences__c: string | null;
	Parent_Article__c: string | null;
	Vertical_Product__c: string | null;
}

const ARTICLE_QUERY = `
	SELECT Id, Name, Subtitle__c, Short_Description__c,
		Article_Body__c, HTML_Body__c, Article_Category__c, Subcategory__c,
		Author__c, Author_First_Name__c, Author_Last_Name__c, Author_Title__c,
		Splash_Image_URL__c, Splash_Image_Background__c,
		Publish_Status__c, Order__c, Navigation_Type__c, NavJSON__c,
		Rich_Text_or_HTML_body__c, Intended_Audiences__c,
		Parent_Article__c, Vertical_Product__c
	FROM Article__c
	ORDER BY Order__c ASC NULLS LAST
`;

// ── CSAT Survey fields from Salesforce ──────────────────────────────
interface SFCSATSurvey {
	Id: string;
	Name: string;
	Account_Name_form__c: string | null;
	Client_Account__c: string | null;
	Contact__c: string | null;
	CSAT_Date__c: string | null;
	First_Name__c: string | null;
	Last_Name__c: string | null;
	Title__c: string | null;
	Star_Rating__c: number | null;
	Star_Rating_Out_of_5__c: string | null;
	How_Likely_to_Refer_WSM_to_a_friend__c: number | null;
	How_can_we_do_better__c: string | null;
	Permission_to_put_on_WSM_Website__c: boolean;
	Website_Testimonial_Blurb__c: string | null;
	WSM_Response__c: string | null;
}

const CSAT_SURVEY_QUERY = `
	SELECT Id, Name, Account_Name_form__c, Client_Account__c, Contact__c,
		CSAT_Date__c, First_Name__c, Last_Name__c, Title__c,
		Star_Rating__c, Star_Rating_Out_of_5__c,
		How_Likely_to_Refer_WSM_to_a_friend__c, How_can_we_do_better__c,
		Permission_to_put_on_WSM_Website__c, Website_Testimonial_Blurb__c,
		WSM_Response__c
	FROM CSAT_Survey__c
	ORDER BY CSAT_Date__c DESC NULLS LAST
`;

// ── Article Reference fields from Salesforce ────────────────────────
interface SFArticleReference {
	Id: string;
	Name: string;
	Child_Article__c: string | null;
	Parent_Or_Primary2__c: string | null;
	CSAT_Survey__c: string | null;
	Relationship_Type__c: string | null;
	WSM_Contract__c: string | null;
}

const ARTICLE_REFERENCE_QUERY = `
	SELECT Id, Name, Child_Article__c, Parent_Or_Primary2__c,
		CSAT_Survey__c, Relationship_Type__c, WSM_Contract__c
	FROM Article_Reference__c
`;

// ── Image helpers ───────────────────────────────────────────────────

function extractImageUrl(fieldValue: string | null): string | null {
	if (!fieldValue) return null;
	// If it's already a URL, return as-is
	if (fieldValue.startsWith("http") || fieldValue.startsWith("/")) {
		return fieldValue;
	}
	// If it's rich text with an <img> tag, extract the src
	const match = fieldValue.match(/src=["']([^"']+)["']/);
	return match ? match[1] : null;
}

async function syncImageToR2(
	token: Awaited<ReturnType<typeof getAccessToken>>,
	bucket: R2Bucket,
	imageFieldValue: string | null,
	r2Key: string,
): Promise<string | null> {
	const imageUrl = extractImageUrl(imageFieldValue);
	if (!imageUrl) return null;

	const image = await fetchImage(token, imageUrl);
	if (!image) return null;

	await bucket.put(r2Key, image.data, {
		httpMetadata: { contentType: image.contentType },
	});

	return r2Key;
}

// ── Main sync function ──────────────────────────────────────────────

export async function runSync(env: SyncEnv): Promise<{
	contactsSynced: number;
	articlesSynced: number;
	csatSurveysSynced: number;
	articleRefsSynced: number;
}> {
	const token = await getAccessToken(env);

	// Start sync log
	const logResult = await env.DB.prepare(
		"INSERT INTO sync_log (started_at, status) VALUES (datetime('now'), 'running') RETURNING id",
	).first<{ id: number }>();
	const logId = logResult?.id;

	try {
		// ── Sync Contacts ─────────────────────────────────────────────
		const contacts = await soqlQuery<SFContact>(token, CONTACT_QUERY);

		for (const c of contacts) {
			const photoKey = await syncImageToR2(
				token,
				env.ASSETS_BUCKET,
				c.WSM_Website_Photo_1__c,
				`contacts/${c.Id}.jpg`,
			);

			await env.DB.prepare(`
				INSERT INTO contacts (sf_id, first_name, last_name, certifications, about_us_sort_order, trailblazer_url, photo_r2_key, synced_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
				ON CONFLICT(sf_id) DO UPDATE SET
					first_name = excluded.first_name,
					last_name = excluded.last_name,
					certifications = excluded.certifications,
					about_us_sort_order = excluded.about_us_sort_order,
					trailblazer_url = excluded.trailblazer_url,
					photo_r2_key = excluded.photo_r2_key,
					synced_at = excluded.synced_at
			`).bind(
				c.Id, c.FirstName, c.LastName,
				c.zbe_Certifications__c, c.zbe_AboutUsSortOrder__c,
				c.Trailblazer_Account_URL__c, photoKey,
			).run();
		}

		// ── Sync Articles ─────────────────────────────────────────────
		const articles = await soqlQuery<SFArticle>(token, ARTICLE_QUERY);

		for (const a of articles) {
			await env.DB.prepare(`
				INSERT INTO articles (sf_id, name, subtitle, short_description, article_body, html_body,
					article_category, subcategory, author_id, author_first_name, author_last_name, author_title,
					splash_image_url, splash_image_background, publish_status, article_order,
					navigation_type, nav_json, body_type, intended_audiences, parent_article_id,
					vertical_product, synced_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
				ON CONFLICT(sf_id) DO UPDATE SET
					name = excluded.name,
					subtitle = excluded.subtitle,
					short_description = excluded.short_description,
					article_body = excluded.article_body,
					html_body = excluded.html_body,
					article_category = excluded.article_category,
					subcategory = excluded.subcategory,
					author_id = excluded.author_id,
					author_first_name = excluded.author_first_name,
					author_last_name = excluded.author_last_name,
					author_title = excluded.author_title,
					splash_image_url = excluded.splash_image_url,
					splash_image_background = excluded.splash_image_background,
					publish_status = excluded.publish_status,
					article_order = excluded.article_order,
					navigation_type = excluded.navigation_type,
					nav_json = excluded.nav_json,
					body_type = excluded.body_type,
					intended_audiences = excluded.intended_audiences,
					parent_article_id = excluded.parent_article_id,
					vertical_product = excluded.vertical_product,
					synced_at = excluded.synced_at
			`).bind(
				a.Id, a.Name, a.Subtitle__c, a.Short_Description__c,
				a.Article_Body__c, a.HTML_Body__c, a.Article_Category__c, a.Subcategory__c,
				a.Author__c, a.Author_First_Name__c, a.Author_Last_Name__c, a.Author_Title__c,
				a.Splash_Image_URL__c, a.Splash_Image_Background__c, a.Publish_Status__c,
				a.Order__c, a.Navigation_Type__c, a.NavJSON__c,
				a.Rich_Text_or_HTML_body__c, a.Intended_Audiences__c,
				a.Parent_Article__c, a.Vertical_Product__c,
			).run();
		}

		// ── Sync CSAT Surveys ─────────────────────────────────────────
		const csatSurveys = await soqlQuery<SFCSATSurvey>(token, CSAT_SURVEY_QUERY);

		for (const s of csatSurveys) {
			await env.DB.prepare(`
				INSERT INTO csat_surveys (sf_id, name, account_name, client_account_id, contact_id,
					csat_date, first_name, last_name, title, star_rating, star_rating_picklist,
					refer_likelihood, how_can_we_do_better, permission_for_website,
					website_testimonial_blurb, wsm_response, synced_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
				ON CONFLICT(sf_id) DO UPDATE SET
					name = excluded.name,
					account_name = excluded.account_name,
					client_account_id = excluded.client_account_id,
					contact_id = excluded.contact_id,
					csat_date = excluded.csat_date,
					first_name = excluded.first_name,
					last_name = excluded.last_name,
					title = excluded.title,
					star_rating = excluded.star_rating,
					star_rating_picklist = excluded.star_rating_picklist,
					refer_likelihood = excluded.refer_likelihood,
					how_can_we_do_better = excluded.how_can_we_do_better,
					permission_for_website = excluded.permission_for_website,
					website_testimonial_blurb = excluded.website_testimonial_blurb,
					wsm_response = excluded.wsm_response,
					synced_at = excluded.synced_at
			`).bind(
				s.Id, s.Name, s.Account_Name_form__c, s.Client_Account__c, s.Contact__c,
				s.CSAT_Date__c, s.First_Name__c, s.Last_Name__c, s.Title__c,
				s.Star_Rating__c, s.Star_Rating_Out_of_5__c,
				s.How_Likely_to_Refer_WSM_to_a_friend__c, s.How_can_we_do_better__c,
				s.Permission_to_put_on_WSM_Website__c ? 1 : 0,
				s.Website_Testimonial_Blurb__c, s.WSM_Response__c,
			).run();
		}

		// ── Sync Article References ───────────────────────────────────
		const articleRefs = await soqlQuery<SFArticleReference>(token, ARTICLE_REFERENCE_QUERY);

		for (const r of articleRefs) {
			await env.DB.prepare(`
				INSERT INTO article_references (sf_id, name, child_article_id, parent_or_primary_id,
					csat_survey_id, relationship_type, wsm_contract_id, synced_at)
				VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
				ON CONFLICT(sf_id) DO UPDATE SET
					name = excluded.name,
					child_article_id = excluded.child_article_id,
					parent_or_primary_id = excluded.parent_or_primary_id,
					csat_survey_id = excluded.csat_survey_id,
					relationship_type = excluded.relationship_type,
					wsm_contract_id = excluded.wsm_contract_id,
					synced_at = excluded.synced_at
			`).bind(
				r.Id, r.Name, r.Child_Article__c, r.Parent_Or_Primary2__c,
				r.CSAT_Survey__c, r.Relationship_Type__c, r.WSM_Contract__c,
			).run();
		}

		// Update sync log
		if (logId) {
			await env.DB.prepare(
				"UPDATE sync_log SET completed_at = datetime('now'), status = 'success', contacts_synced = ?, articles_synced = ? WHERE id = ?",
			).bind(contacts.length, articles.length, logId).run();
		}

		return {
			contactsSynced: contacts.length,
			articlesSynced: articles.length,
			csatSurveysSynced: csatSurveys.length,
			articleRefsSynced: articleRefs.length,
		};
	} catch (error) {
		if (logId) {
			await env.DB.prepare(
				"UPDATE sync_log SET completed_at = datetime('now'), status = 'error', error = ? WHERE id = ?",
			).bind(String(error), logId).run();
		}
		throw error;
	}
}
