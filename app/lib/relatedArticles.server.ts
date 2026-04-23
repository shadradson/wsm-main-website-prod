/**
 * Fetches and groups related articles for a given article.
 */

export interface RelatedArticle {
	sf_id: string;
	name: string;
	subtitle: string | null;
	short_description: string | null;
	subcategory: string | null;
	vertical_product: string | null;
	splash_image_url: string | null;
	article_category: string | null;
	relationship_type: string | null;
	parent_relationship_type: string | null;
	child_relationship_type: string | null;
	parent_subcategory_type: string | null;
	child_subcategory_type: string | null;
	direction: string;
}

export interface RelatedGroup {
	title: string;
	subtitle: string;
	articles: RelatedArticle[];
}

function makeRelatedTitlesAndSubtitles(
	currentArticleCategory: string | null,
	relatedArticleCategory: string | null,
	articleName: string,
	currentArticleSubcategory: string | null,
	relatedArticleSubcategory: string | null,
): { title: string; subtitle: string } {
	let title = "";
	let subtitle = ``;

	switch (relatedArticleCategory) {
		case "Case Study":
			if (currentArticleCategory === "Case Study") {
				if (currentArticleSubcategory == "" && relatedArticleSubcategory) {
					title = `${articleName} ${relatedArticleSubcategory} Case Studies`;
					subtitle = `Similar ${relatedArticleSubcategory} case studies to ${articleName}.`;
				}
				title = "Related Case Studies";
				subtitle = `Similar studies to ${articleName}`;
			} else if (currentArticleCategory === "Customer Success Story") {
				title = "Case Studies";
				subtitle = `Mountains Summited With ${articleName}`;
			} else if (currentArticleCategory === "Blog Post") {
				title = "Related Case Studies";
				subtitle = `Relevant to this post.`;
			} else if (currentArticleCategory === "Testimonial") {
				title = "Related Case Studies";
				subtitle = ``;
			} else if (currentArticleCategory === "WSM Information") {
				title = "Related Case Studies";
				subtitle = ``;
			} else if (currentArticleCategory === "Successful Implementation") {
				title = "Related Case Studies";
				subtitle = `Mountains Summited With ${articleName}`;
			} else if (currentArticleCategory === "Bio") {
				title = "Related Case Studies";
				subtitle = `Mountains Summited by ${aritlceName}.`;
			} else {
				title = `${articleName} Case Studies`;
				subtitle = ``;
			}
			break;
		case "Customer Success Story":
			if (currentArticleCategory === "Case Study") {
				title = `${articleName} Customer Success Stories`;
				subtitle = `Clients We Have Overcome ${articleName} With`;
			} else if (currentArticleCategory === "Customer Success Story") {
				title = "Related Customer Success Stories";
				subtitle = `Other clients We Have Summited Mountains With`;
			} else if (currentArticleCategory === "Blog Post") {
				title = "Customer Success Stories";
				subtitle = `related to ${articleName}`;
			} else if (currentArticleCategory === "Testimonial") {
				title = "Customer Success Stories";
				subtitle = `See The Success Story That Prompted This Testimonial`;
			} else if (currentArticleCategory === "WSM Information") {
				title = "Customer Success Stories";
				subtitle = ``;
			} else if (currentArticleCategory === "Successful Implementation") {
				title = "Customer Success Stories";
				subtitle = `Similar Success Stories`;
			} else if (currentArticleCategory === "Bio") {
				title = "Customer Success Stories";
				subtitle = ``;
			} else {
				title = "Customer Success Stories";
				subtitle = `related to ${articleName}`;
			}
			break;
		case "Blog Post":
			if (currentArticleCategory === "Case Study") {
				title = "Blog Posts";
				subtitle = `about ${articleName}`;
			} else if (currentArticleCategory === "Customer Success Story") {
				title = "Blog Posts";
				subtitle = `about ${articleName}`;
			} else if (currentArticleCategory === "Blog Post") {
				title = "Related Blog Posts";
				subtitle = ``;
			} else if (currentArticleCategory === "Testimonial") {
				title = "Blog Posts";
				subtitle = ``;
			} else if (currentArticleCategory === "WSM Information") {
				title = "Blog Posts";
				subtitle = ``;
			} else if (currentArticleCategory === "Successful Implementation") {
				title = "Blog Posts";
				subtitle = `about ${articleName}`;
			} else if (currentArticleCategory === "Bio") {
				title = "Blog Posts";
				subtitle = ``;
			} else {
				title = `${articleName} Blog Posts`;
				subtitle = ``;
			}
			break;
		case "Testimonial":
			if (currentArticleCategory === "Case Study") {
				title = "Testimonials";
				subtitle = `for ${articleName}`;
			} else if (currentArticleCategory === "Customer Success Story") {
				title = "Testimonials";
				subtitle = `Testimonials From ${articleName}`;
			} else if (currentArticleCategory === "Blog Post") {
				title = "Testimonials";
				subtitle = ``;
			} else if (currentArticleCategory === "Testimonial") {
				title = "Related Testimonials";
				subtitle = ``;
			} else if (currentArticleCategory === "WSM Information") {
				title = "Testimonials";
				subtitle = ``;
			} else if (currentArticleCategory === "Successful Implementation") {
				title = "Testimonials";
				subtitle = `from ${articleName}`;
			} else if (currentArticleCategory === "Bio") {
				title = "Testimonials";
				subtitle = `Client Experience Working With ${articleName}`;
			} else {
				title = `${articleName} Testimonials`;
				subtitle = ``;
			}
			break;
		case "WSM Information":
			if (currentArticleCategory === "Case Study") {
				title = "WSM Information";
				subtitle = ``;
			} else if (currentArticleCategory === "Customer Success Story") {
				title = "WSM Information";
				subtitle = ``;
			} else if (currentArticleCategory === "Blog Post") {
				title = "WSM Information";
				subtitle = ``;
			} else if (currentArticleCategory === "Testimonial") {
				title = "WSM Information";
				subtitle = ``;
			} else if (currentArticleCategory === "WSM Information") {
				title = "Related WSM Information";
				subtitle = ``;
			} else if (currentArticleCategory === "Successful Implementation") {
				title = "WSM Information";
				subtitle = ``;
			} else if (currentArticleCategory === "Bio") {
				title = "WSM Information";
				subtitle = ``;
			} else {
				title = "WSM Information";
				subtitle = ``;
			}
			break;
		case "Successful Implementation":
			if (currentArticleCategory === "Case Study") {
				title = "Successful Implementations";
				subtitle = `Clients We Have Summited ${articleName} with.`;
			} else if (currentArticleCategory === "Customer Success Story") {
				title = "Successful Implementations";
				subtitle = `Clients We Have Summited ${articleName} with.`;
			} else if (currentArticleCategory === "Blog Post") {
				title = "Successful Implementations";
				subtitle = ``;
			} else if (currentArticleCategory === "Testimonial") {
				title = "Successful Implementations";
				subtitle = ``;
			} else if (currentArticleCategory === "WSM Information") {
				title = "Successful Implementations";
				subtitle = ``;
			} else if (currentArticleCategory === "Successful Implementation") {
				title = "Related Successful Implementations";
				subtitle = ``;
			} else if (currentArticleCategory === "Bio") {
				title = "Successful Implementations";
				subtitle = `Projects ${articleName} has worked on.`;
			} else {
				title = `${articleName} Successful Implementations`;
				subtitle = ``;
			}
			break;
		case "Bio":
			if (currentArticleCategory === "Case Study") {
				title = "We Summit Team";
				subtitle = `Who Have Summited ${articleName}`;
			} else if (currentArticleCategory === "Customer Success Story") {
				title = "The Team";
				subtitle = `Who Worked on ${articleName}`;
			} else if (currentArticleCategory === "Blog Post") {
				title = "Bios";
				subtitle = ``;
			} else if (currentArticleCategory === "Testimonial") {
				title = "The Team";
				subtitle = `The We Summit Mountains Team Related to This Testimonial.`;
			} else if (currentArticleCategory === "WSM Information") {
				title = "Bios";
				subtitle = ``;
			} else if (currentArticleCategory === "Successful Implementation") {
				title = "Bios";
				subtitle = `from ${articleName}`;
			} else if (currentArticleCategory === "Bio") {
				title = "Related Bios";
				subtitle = ``;
			} else {
				title = `${articleName} Bios`;
				subtitle = ``;
			}
			break;
		default:
			title = `${articleName} Related Articles`;
			subtitle = ``;
			break;
	}

	return { title, subtitle };
}

export async function getRelatedArticles(
	db: D1Database,
	articleId: string,
	articleName: string,
	articleCategory: string | null,
): Promise<RelatedGroup[]> {
	const { results } = await db.prepare(
		`SELECT a.sf_id, a.name, a.subtitle, a.short_description,
			a.subcategory, a.vertical_product, a.splash_image_url, a.article_category,
			ar.relationship_type, ar.parent_relationship_type, ar.child_relationship_type,
			ar.parent_subcategory_type, ar.child_subcategory_type,
			'children' AS direction
		FROM article_references ar
		JOIN articles a ON a.sf_id = ar.child_article_id
		WHERE ar.parent_or_primary_id = ?
			AND a.admin_approval = 1 AND a.publish_status = 'Published'
		UNION
		SELECT a.sf_id, a.name, a.subtitle, a.short_description,
			a.subcategory, a.vertical_product, a.splash_image_url, a.article_category,
			ar.relationship_type, ar.parent_relationship_type, ar.child_relationship_type,
			ar.parent_subcategory_type, ar.child_subcategory_type,
			'parents' AS direction
		FROM article_references ar
		JOIN articles a ON a.sf_id = ar.parent_or_primary_id
		WHERE ar.child_article_id = ?
			AND a.admin_approval = 1 AND a.publish_status = 'Published'`
	).bind(articleId, articleId).all<RelatedArticle>();

	const groupMap = new Map<string, { subtitle: string; articles: RelatedArticle[] }>();
	for (const ra of results ?? []) {
		const relatedArticleCategory = ra.article_category;
		// When direction is 'children', the current article is the parent of the
		// relationship, so parent_subcategory_type describes the current article
		// and child_subcategory_type describes the related article. For 'parents'
		// it is reversed.
		const currentArticleSubcategory = ra.direction === "children"
			? ra.parent_subcategory_type
			: ra.child_subcategory_type;
		const relatedArticleSubcategory = ra.direction === "children"
			? ra.child_subcategory_type
			: ra.parent_subcategory_type;

		const titles = makeRelatedTitlesAndSubtitles(
			articleCategory,
			relatedArticleCategory,
			articleName,
			currentArticleSubcategory,
			relatedArticleSubcategory,
		);

		if (!groupMap.has(titles.title)) {
			groupMap.set(titles.title, { subtitle: titles.subtitle, articles: [] });
		}
		groupMap.get(titles.title)!.articles.push(ra);
	}

	return [...groupMap.entries()].map(
		([title, { subtitle, articles }]) => ({ title, subtitle, articles }),
	);
}
