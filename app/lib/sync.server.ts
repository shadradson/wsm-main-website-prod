/**
 * Salesforce -> D1 sync logic.
 * Called by the scheduled cron handler.
 *
 * Two modes:
 *   - Full run: pulls all matching records via SOQL and reconciles deletes by
 *     comparing returned IDs against D1's stored sf_ids.
 *   - Delta run: uses Salesforce's getUpdated/getDeleted endpoints to fetch
 *     only records modified or deleted since the last successful sync. Falls
 *     back to a full run if there's no prior success or the last one is older
 *     than 14 days (SF's getDeleted retention is ~15 days).
 */
import {
	getAccessToken,
	soqlQuery,
	soqlQueryByIds,
	getUpdatedIds,
	getDeletedIds,
	fetchImage,
} from "./salesforce.server";

// Removes rows whose sf_id is no longer present in Salesforce. Skipped when
// the returned set is empty so a transient SOQL failure can't wipe a table.
// D1 caps bound parameters at 100/query, so we diff in JS and delete in batches
// instead of a single NOT IN (?, ?, ...) over the keep set.
async function reconcileDeletes(
	db: D1Database,
	table: SyncTable,
	keepIds: string[],
): Promise<number> {
	if (keepIds.length === 0) return 0;

	const existing = await db.prepare(`SELECT sf_id FROM ${table}`)
		.all<{ sf_id: string }>();
	const keep = new Set(keepIds);
	const toDelete = (existing.results ?? [])
		.map((r) => r.sf_id)
		.filter((id) => !keep.has(id));
	if (toDelete.length === 0) return 0;

	return deleteByIds(db, table, toDelete);
}

type SyncTable = "contacts" | "articles" | "csat_surveys" | "article_references";

async function deleteByIds(
	db: D1Database,
	table: SyncTable,
	ids: string[],
): Promise<number> {
	if (ids.length === 0) return 0;
	const BATCH_SIZE = 90;
	let changes = 0;
	for (let i = 0; i < ids.length; i += BATCH_SIZE) {
		const batch = ids.slice(i, i + BATCH_SIZE);
		const placeholders = batch.map(() => "?").join(",");
		const result = await db.prepare(
			`DELETE FROM ${table} WHERE sf_id IN (${placeholders})`,
		).bind(...batch).run();
		changes += result.meta.changes ?? 0;
	}
	return changes;
}

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
	Title: string | null;
	Contact_Status__c: string | null;
	zbe_Certifications__c: string | null;
	zbe_AboutUsSortOrder__c: number | null;
	Trailblazer_Account_URL__c: string | null;
	Linked_In_URL__c: string | null;
	Date_Started_In_Industry__c: string | null;
	Time_In_Industry_In_Years__c: number | null;
	Date_Started_At_WSM__c: string | null;
	Years_At_WSM__c: number | null;
	WSM_Website_Photo_1__c: string | null;
	Bio__c: string | null;
}

const CONTACT_SELECT = `
	SELECT Id, FirstName, LastName, Title, Contact_Status__c,
		zbe_Certifications__c, zbe_AboutUsSortOrder__c,
		Trailblazer_Account_URL__c, Linked_In_URL__c,
		Date_Started_In_Industry__c, Time_In_Industry_In_Years__c,
		Date_Started_At_WSM__c, Years_At_WSM__c,
		WSM_Website_Photo_1__c, Bio__c
	FROM Contact
`;

const CONTACT_QUERY_FULL = `${CONTACT_SELECT}
	WHERE zbe_AboutUsSortOrder__c != null
	ORDER BY zbe_AboutUsSortOrder__c ASC
`;

const CONTACT_QUERY_BY_IDS = `${CONTACT_SELECT}
	WHERE Id IN ({IDS})
		AND zbe_AboutUsSortOrder__c != null
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
	Article_Image_Selector_formula__c: string | null;
	Splash_Image_Background__c: string | null;
	Publish_Status__c: string | null;
	Order__c: number | null;
	Navigation_Type__c: string | null;
	NavJSON__c: string | null;
	Rich_Text_or_HTML_body__c: string | null;
	Intended_Audiences__c: string | null;
	Parent_Article__c: string | null;
	Vertical_Product__c: string | null;
	Admin_Approval__c: boolean;
}

const ARTICLE_SELECT = `
	SELECT Id, Name, Subtitle__c, Short_Description__c,
		Article_Body__c, HTML_Body__c, Article_Category__c, Subcategory__c,
		Author__c, Author_First_Name__c, Author_Last_Name__c, Author_Title__c,
		Article_Image_Selector_formula__c, Splash_Image_Background__c,
		Publish_Status__c, Order__c, Navigation_Type__c, NavJSON__c,
		Rich_Text_or_HTML_body__c, Intended_Audiences__c,
		Parent_Article__c, Vertical_Product__c, Admin_Approval__c
	FROM Article__c
`;

const ARTICLE_QUERY_FULL = `${ARTICLE_SELECT} ORDER BY Order__c ASC NULLS LAST`;
const ARTICLE_QUERY_BY_IDS = `${ARTICLE_SELECT} WHERE Id IN ({IDS})`;

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

const CSAT_SURVEY_SELECT = `
	SELECT Id, Name, Account_Name_form__c, Client_Account__c, Contact__c,
		CSAT_Date__c, First_Name__c, Last_Name__c, Title__c,
		Star_Rating__c, Star_Rating_Out_of_5__c,
		How_Likely_to_Refer_WSM_to_a_friend__c, How_can_we_do_better__c,
		Permission_to_put_on_WSM_Website__c, Website_Testimonial_Blurb__c,
		WSM_Response__c
	FROM CSAT_Survey__c
`;

const CSAT_SURVEY_QUERY_FULL = `${CSAT_SURVEY_SELECT} ORDER BY CSAT_Date__c DESC NULLS LAST`;
const CSAT_SURVEY_QUERY_BY_IDS = `${CSAT_SURVEY_SELECT} WHERE Id IN ({IDS})`;

// ── Article Reference fields from Salesforce ────────────────────────
interface SFArticleReference {
	Id: string;
	Name: string;
	Child_Article__c: string | null;
	Parent_Or_Primary2__c: string | null;
	CSAT_Survey__c: string | null;
	Relationship_Type__c: string | null;
	WSM_Contract__c: string | null;
	Parent_Relationship_Type__c: string | null;
	Child_Relationship_Type__c: string | null;
	Parent_Subcategory_Type__c: string | null;
	Child_Subcategory_Type__c: string | null;
}

const ARTICLE_REFERENCE_SELECT = `
	SELECT Id, Name, Child_Article__c, Parent_Or_Primary2__c,
		CSAT_Survey__c, Relationship_Type__c, WSM_Contract__c,
		Parent_Relationship_Type__c, Child_Relationship_Type__c,
		Parent_Subcategory_Type__c, Child_Subcategory_Type__c
	FROM Article_Reference__c
`;

const ARTICLE_REFERENCE_QUERY_FULL = ARTICLE_REFERENCE_SELECT;
const ARTICLE_REFERENCE_QUERY_BY_IDS = `${ARTICLE_REFERENCE_SELECT} WHERE Id IN ({IDS})`;

// ── Image helpers ───────────────────────────────────────────────────

function extractImageUrl(fieldValue: string | null): string | null {
	if (!fieldValue) return null;
	// If it's already a URL, return as-is
	if (fieldValue.startsWith("http") || fieldValue.startsWith("/")) {
		return fieldValue;
	}
	// If it's rich text with an <img> tag, extract the src
	const match = fieldValue.match(/src=["']([^"']+)["']/);
	if (!match) return null;
	// Decode HTML entities (e.g., &amp; -> &)
	return match[1].replace(/&amp;/g, "&");
}

async function syncImageToR2(
	token: Awaited<ReturnType<typeof getAccessToken>>,
	bucket: R2Bucket,
	imageFieldValue: string | null,
	r2Key: string,
	contactId?: string,
): Promise<string | null> {
	const imageUrl = extractImageUrl(imageFieldValue);
	if (!imageUrl) return null;

	const image = await fetchImage(token, imageUrl, contactId);
	if (!image) return null;

	await bucket.put(r2Key, image.data, {
		httpMetadata: { contentType: image.contentType },
	});

	return r2Key;
}

// ── Per-object upserters ────────────────────────────────────────────

async function upsertContact(
	env: SyncEnv,
	token: Awaited<ReturnType<typeof getAccessToken>>,
	c: SFContact,
): Promise<void> {
	const photoKey = await syncImageToR2(
		token,
		env.ASSETS_BUCKET,
		c.WSM_Website_Photo_1__c,
		`contacts/${c.Id}.jpg`,
		c.Id,
	);

	await env.DB.prepare(`
		INSERT INTO contacts (sf_id, first_name, last_name, title, contact_status, certifications, about_us_sort_order, trailblazer_url, linkedin_url, date_started_in_industry, time_in_industry, date_started_at_wsm, years_at_wsm, photo_r2_key, bio_article_id, synced_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
		ON CONFLICT(sf_id) DO UPDATE SET
			first_name = excluded.first_name,
			last_name = excluded.last_name,
			title = excluded.title,
			contact_status = excluded.contact_status,
			certifications = excluded.certifications,
			about_us_sort_order = excluded.about_us_sort_order,
			trailblazer_url = excluded.trailblazer_url,
			linkedin_url = excluded.linkedin_url,
			date_started_in_industry = excluded.date_started_in_industry,
			time_in_industry = excluded.time_in_industry,
			date_started_at_wsm = excluded.date_started_at_wsm,
			years_at_wsm = excluded.years_at_wsm,
			photo_r2_key = excluded.photo_r2_key,
			bio_article_id = excluded.bio_article_id,
			synced_at = excluded.synced_at
	`).bind(
		c.Id, c.FirstName, c.LastName, c.Title, c.Contact_Status__c,
		c.zbe_Certifications__c, c.zbe_AboutUsSortOrder__c,
		c.Trailblazer_Account_URL__c, c.Linked_In_URL__c,
		c.Date_Started_In_Industry__c, c.Time_In_Industry_In_Years__c,
		c.Date_Started_At_WSM__c, c.Years_At_WSM__c, photoKey,
		c.Bio__c,
	).run();
}

async function upsertArticle(env: SyncEnv, a: SFArticle): Promise<void> {
	await env.DB.prepare(`
		INSERT INTO articles (sf_id, name, subtitle, short_description, article_body, html_body,
			article_category, subcategory, author_id, author_first_name, author_last_name, author_title,
			splash_image_url, splash_image_background, publish_status, article_order,
			navigation_type, nav_json, body_type, intended_audiences, parent_article_id,
			vertical_product, admin_approval, synced_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
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
			admin_approval = excluded.admin_approval,
			synced_at = excluded.synced_at
	`).bind(
		a.Id, a.Name, a.Subtitle__c, a.Short_Description__c,
		a.Article_Body__c, a.HTML_Body__c, a.Article_Category__c, a.Subcategory__c,
		a.Author__c, a.Author_First_Name__c, a.Author_Last_Name__c, a.Author_Title__c,
		a.Article_Image_Selector_formula__c, a.Splash_Image_Background__c, a.Publish_Status__c,
		a.Order__c, a.Navigation_Type__c, a.NavJSON__c,
		a.Rich_Text_or_HTML_body__c, a.Intended_Audiences__c,
		a.Parent_Article__c, a.Vertical_Product__c,
		a.Admin_Approval__c ? 1 : 0,
	).run();
}

async function upsertCsatSurvey(env: SyncEnv, s: SFCSATSurvey): Promise<void> {
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

async function upsertArticleReference(env: SyncEnv, r: SFArticleReference): Promise<void> {
	await env.DB.prepare(`
		INSERT INTO article_references (sf_id, name, child_article_id, parent_or_primary_id,
			csat_survey_id, relationship_type, wsm_contract_id,
			parent_relationship_type, child_relationship_type,
			parent_subcategory_type, child_subcategory_type, synced_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
		ON CONFLICT(sf_id) DO UPDATE SET
			name = excluded.name,
			child_article_id = excluded.child_article_id,
			parent_or_primary_id = excluded.parent_or_primary_id,
			csat_survey_id = excluded.csat_survey_id,
			relationship_type = excluded.relationship_type,
			wsm_contract_id = excluded.wsm_contract_id,
			parent_relationship_type = excluded.parent_relationship_type,
			child_relationship_type = excluded.child_relationship_type,
			parent_subcategory_type = excluded.parent_subcategory_type,
			child_subcategory_type = excluded.child_subcategory_type,
			synced_at = excluded.synced_at
	`).bind(
		r.Id, r.Name, r.Child_Article__c, r.Parent_Or_Primary2__c,
		r.CSAT_Survey__c, r.Relationship_Type__c, r.WSM_Contract__c,
		r.Parent_Relationship_Type__c, r.Child_Relationship_Type__c,
		r.Parent_Subcategory_Type__c, r.Child_Subcategory_Type__c,
	).run();
}

// ── Main sync function ──────────────────────────────────────────────

// Buffer applied to the delta start time to ensure no updates are missed if
// they happened during the previous sync's execution window.
const DELTA_BUFFER_SECONDS = 60;
// SF retains deleted record metadata for ~15 days. We cap at 14 to leave room
// for timezone/clock skew.
const DELTA_MAX_AGE_DAYS = 14;

interface SyncResult {
	contactsSynced: number;
	articlesSynced: number;
	csatSurveysSynced: number;
	articleRefsSynced: number;
	contactsDeleted: number;
	articlesDeleted: number;
	csatSurveysDeleted: number;
	articleRefsDeleted: number;
	mode: "full" | "delta";
}

export async function runSync(
	env: SyncEnv,
	isDeltaRun = true,
): Promise<SyncResult> {
	const token = await getAccessToken(env);

	// Determine effective mode. Delta requires a prior successful sync within
	// the getDeleted retention window.
	let mode: "full" | "delta" = isDeltaRun ? "delta" : "full";
	let deltaStart: Date | null = null;
	const deltaEnd = new Date();

	if (mode === "delta") {
		const lastSuccess = await env.DB.prepare(
			"SELECT started_at FROM sync_log WHERE status = 'success' ORDER BY started_at DESC LIMIT 1",
		).first<{ started_at: string }>();

		if (!lastSuccess) {
			mode = "full";
		} else {
			// D1 datetime('now') returns "YYYY-MM-DD HH:MM:SS" in UTC. Convert to ISO.
			const lastDate = new Date(lastSuccess.started_at.replace(" ", "T") + "Z");
			const ageDays = (deltaEnd.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
			if (ageDays > DELTA_MAX_AGE_DAYS || isNaN(lastDate.getTime())) {
				mode = "full";
			} else {
				deltaStart = new Date(lastDate.getTime() - DELTA_BUFFER_SECONDS * 1000);
			}
		}
	}

	// Start sync log
	const logResult = await env.DB.prepare(
		"INSERT INTO sync_log (started_at, status, is_delta_run) VALUES (datetime('now'), 'running', ?) RETURNING id",
	).bind(mode === "delta" ? 1 : 0).first<{ id: number }>();
	const logId = logResult?.id;

	try {
		let contactsSynced = 0;
		let articlesSynced = 0;
		let csatSurveysSynced = 0;
		let articleRefsSynced = 0;
		let contactsDeleted = 0;
		let articlesDeleted = 0;
		let csatSurveysDeleted = 0;
		let articleRefsDeleted = 0;

		if (mode === "full") {
			// ── Full sync: pull everything, reconcile deletes via diff ───
			const contacts = await soqlQuery<SFContact>(token, CONTACT_QUERY_FULL);
			for (const c of contacts) await upsertContact(env, token, c);
			contactsDeleted = await reconcileDeletes(env.DB, "contacts", contacts.map((c) => c.Id));
			contactsSynced = contacts.length;

			const articles = await soqlQuery<SFArticle>(token, ARTICLE_QUERY_FULL);
			for (const a of articles) await upsertArticle(env, a);
			articlesDeleted = await reconcileDeletes(env.DB, "articles", articles.map((a) => a.Id));
			articlesSynced = articles.length;

			const csatSurveys = await soqlQuery<SFCSATSurvey>(token, CSAT_SURVEY_QUERY_FULL);
			for (const s of csatSurveys) await upsertCsatSurvey(env, s);
			csatSurveysDeleted = await reconcileDeletes(env.DB, "csat_surveys", csatSurveys.map((s) => s.Id));
			csatSurveysSynced = csatSurveys.length;

			const articleRefs = await soqlQuery<SFArticleReference>(token, ARTICLE_REFERENCE_QUERY_FULL);
			for (const r of articleRefs) await upsertArticleReference(env, r);
			articleRefsDeleted = await reconcileDeletes(env.DB, "article_references", articleRefs.map((r) => r.Id));
			articleRefsSynced = articleRefs.length;
		} else {
			// ── Delta sync: getUpdated + getDeleted per object ───────────
			const start = deltaStart!;

			// Contacts
			const contactUpdatedIds = await getUpdatedIds(token, "Contact", start, deltaEnd);
			const contacts = await soqlQueryByIds<SFContact>(token, CONTACT_QUERY_BY_IDS, contactUpdatedIds);
			for (const c of contacts) await upsertContact(env, token, c);
			contactsSynced = contacts.length;
			const contactDeletedIds = await getDeletedIds(token, "Contact", start, deltaEnd);
			contactsDeleted = await deleteByIds(env.DB, "contacts", contactDeletedIds);

			// Articles
			const articleUpdatedIds = await getUpdatedIds(token, "Article__c", start, deltaEnd);
			const articles = await soqlQueryByIds<SFArticle>(token, ARTICLE_QUERY_BY_IDS, articleUpdatedIds);
			for (const a of articles) await upsertArticle(env, a);
			articlesSynced = articles.length;
			const articleDeletedIds = await getDeletedIds(token, "Article__c", start, deltaEnd);
			articlesDeleted = await deleteByIds(env.DB, "articles", articleDeletedIds);

			// CSAT Surveys
			const csatUpdatedIds = await getUpdatedIds(token, "CSAT_Survey__c", start, deltaEnd);
			const csatSurveys = await soqlQueryByIds<SFCSATSurvey>(token, CSAT_SURVEY_QUERY_BY_IDS, csatUpdatedIds);
			for (const s of csatSurveys) await upsertCsatSurvey(env, s);
			csatSurveysSynced = csatSurveys.length;
			const csatDeletedIds = await getDeletedIds(token, "CSAT_Survey__c", start, deltaEnd);
			csatSurveysDeleted = await deleteByIds(env.DB, "csat_surveys", csatDeletedIds);

			// Article References
			const refUpdatedIds = await getUpdatedIds(token, "Article_Reference__c", start, deltaEnd);
			const articleRefs = await soqlQueryByIds<SFArticleReference>(token, ARTICLE_REFERENCE_QUERY_BY_IDS, refUpdatedIds);
			for (const r of articleRefs) await upsertArticleReference(env, r);
			articleRefsSynced = articleRefs.length;
			const refDeletedIds = await getDeletedIds(token, "Article_Reference__c", start, deltaEnd);
			articleRefsDeleted = await deleteByIds(env.DB, "article_references", refDeletedIds);
		}

		// Update sync log
		if (logId) {
			await env.DB.prepare(
				"UPDATE sync_log SET completed_at = datetime('now'), status = 'success', contacts_synced = ?, articles_synced = ? WHERE id = ?",
			).bind(contactsSynced, articlesSynced, logId).run();
		}

		return {
			contactsSynced,
			articlesSynced,
			csatSurveysSynced,
			articleRefsSynced,
			contactsDeleted,
			articlesDeleted,
			csatSurveysDeleted,
			articleRefsDeleted,
			mode,
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
