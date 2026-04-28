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

// When the related article is a Case Study, use its subcategory to produce
// more specific titles/subtitles. Subcategories: Industry, Product,
// Specific Implementation, Use Case.
function relatedCaseStudyTitles(
	currentArticleCategory: string | null,
	relatedArticleSubcategory: string | null,
	articleName: string,
): { title: string; subtitle: string } {
	switch (currentArticleCategory) {
		case "Case Study":
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: "Related Industry Case Studies", subtitle: `Industry studies similar to ${articleName}.` };
				case "Product":
					return { title: "Related Product Case Studies", subtitle: `Product studies similar to ${articleName}.` };
				case "Specific Implementation":
					return { title: "Related Implementation Case Studies", subtitle: `Implementations similar to ${articleName}.` };
				case "Use Case":
					return { title: "Related Use Case Studies", subtitle: `Use cases similar to ${articleName}.` };
				default:
					return { title: "Related Case Studies", subtitle: `Similar studies to ${articleName}.` };
			}
		case "Customer Success Story":
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: "Industry Case Studies", subtitle: `Industries We Have Summited With ${articleName}.` };
				case "Product":
					return { title: "Product Case Studies", subtitle: `Products We Have Summited With ${articleName}.` };
				case "Specific Implementation":
					return { title: "Implementation Case Studies", subtitle: `Implementations We Have Summited With ${articleName}.` };
				case "Use Case":
					return { title: "Use Case Studies", subtitle: `Use Cases We Have Summited With ${articleName}.` };
				default:
					return { title: "Case Studies", subtitle: `Mountains Summited With ${articleName}.` };
			}
		case "Blog Post":
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: "Related Industry Case Studies", subtitle: `Industry studies relevant to this post.` };
				case "Product":
					return { title: "Related Product Case Studies", subtitle: `Product studies relevant to this post.` };
				case "Specific Implementation":
					return { title: "Related Implementation Case Studies", subtitle: `Implementations relevant to this post.` };
				case "Use Case":
					return { title: "Related Use Case Studies", subtitle: `Use cases relevant to this post.` };
				default:
					return { title: "Related Case Studies", subtitle: `Relevant to this post.` };
			}
		case "Testimonial":
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: "Related Industry Case Studies", subtitle: `` };
				case "Product":
					return { title: "Related Product Case Studies", subtitle: `` };
				case "Specific Implementation":
					return { title: "Related Implementation Case Studies", subtitle: `` };
				case "Use Case":
					return { title: "Related Use Case Studies", subtitle: `` };
				default:
					return { title: "Related Case Studies", subtitle: `` };
			}
		case "WSM Information":
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: "Industry Case Studies", subtitle: `` };
				case "Product":
					return { title: "Product Case Studies", subtitle: `` };
				case "Specific Implementation":
					return { title: "Implementation Case Studies", subtitle: `` };
				case "Use Case":
					return { title: "Use Case Studies", subtitle: `` };
				default:
					return { title: "Related Case Studies", subtitle: `` };
			}
		case "Successful Implementation":
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: "Industry Case Studies", subtitle: `Industries Summited With ${articleName}.` };
				case "Product":
					return { title: "Product Case Studies", subtitle: `Products Summited With ${articleName}.` };
				case "Specific Implementation":
					return { title: "Implementation Case Studies", subtitle: `Implementations Summited With ${articleName}.` };
				case "Use Case":
					return { title: "Use Case Studies", subtitle: `Use Cases Summited With ${articleName}.` };
				default:
					return { title: "Related Case Studies", subtitle: `Mountains Summited With ${articleName}.` };
			}
		case "Bio":
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: "Industry Case Studies", subtitle: `Industries Summited by ${articleName}.` };
				case "Product":
					return { title: "Product Case Studies", subtitle: `Products Summited by ${articleName}.` };
				case "Specific Implementation":
					return { title: "Implementation Case Studies", subtitle: `Implementations Summited by ${articleName}.` };
				case "Use Case":
					return { title: "Use Case Studies", subtitle: `Use Cases Summited by ${articleName}.` };
				default:
					return { title: "Related Case Studies", subtitle: `Mountains Summited by ${articleName}.` };
			}
		default:
			switch (relatedArticleSubcategory) {
				case "Industry":
					return { title: `${articleName} Industry Case Studies`, subtitle: `` };
				case "Product":
					return { title: `${articleName} Product Case Studies`, subtitle: `` };
				case "Specific Implementation":
					return { title: `${articleName} Implementation Case Studies`, subtitle: `` };
				case "Use Case":
					return { title: `${articleName} Use Case Studies`, subtitle: `` };
				default:
					return { title: `${articleName} Case Studies`, subtitle: `` };
			}
	}
}

// When the current article is a Case Study (and the related article is something
// else), use the current article's subcategory to tailor the title/subtitle.
function currentCaseStudyTitles(
	relatedArticleCategory: string | null,
	currentArticleSubcategory: string | null,
	articleName: string,
): { title: string; subtitle: string } | null {
	switch (relatedArticleCategory) {
		case "Customer Success Story":
			switch (currentArticleSubcategory) {
				case "Industry":
					return { title: `${articleName} Customer Success Stories`, subtitle: `Clients We Have Summited This Industry With.` };
				case "Product":
					return { title: `${articleName} Customer Success Stories`, subtitle: `Clients We Have Summited This Product With.` };
				case "Specific Implementation":
					return { title: `${articleName} Customer Success Stories`, subtitle: `Clients for This Implementation.` };
				case "Use Case":
					return { title: `${articleName} Customer Success Stories`, subtitle: `Clients for This Use Case.` };
				default:
					return { title: `${articleName} Customer Success Stories`, subtitle: `Clients We Have Overcome ${articleName} With.` };
			}
		case "Blog Post":
			switch (currentArticleSubcategory) {
				case "Industry":
					return { title: "Blog Posts", subtitle: `about the ${articleName} industry.` };
				case "Product":
					return { title: "Blog Posts", subtitle: `about the ${articleName} product.` };
				case "Specific Implementation":
					return { title: "Blog Posts", subtitle: `about the ${articleName} implementation.` };
				case "Use Case":
					return { title: "Blog Posts", subtitle: `about the ${articleName} use case.` };
				default:
					return { title: "Blog Posts", subtitle: `about ${articleName}.` };
			}
		case "Testimonial":
			switch (currentArticleSubcategory) {
				case "Industry":
					return { title: "Testimonials", subtitle: `for the ${articleName} industry.` };
				case "Product":
					return { title: "Testimonials", subtitle: `for the ${articleName} product.` };
				case "Specific Implementation":
					return { title: "Testimonials", subtitle: `for the ${articleName} implementation.` };
				case "Use Case":
					return { title: "Testimonials", subtitle: `for the ${articleName} use case.` };
				default:
					return { title: "Testimonials", subtitle: `for ${articleName}.` };
			}
		case "Successful Implementation":
			switch (currentArticleSubcategory) {
				case "Industry":
					return { title: "Successful Implementations", subtitle: `Clients We Have Summited in the ${articleName} industry.` };
				case "Product":
					return { title: "Successful Implementations", subtitle: `Clients We Have Summited with the ${articleName} product.` };
				case "Specific Implementation":
					return { title: "Successful Implementations", subtitle: `Clients Summited with ${articleName}.` };
				case "Use Case":
					return { title: "Successful Implementations", subtitle: `Clients Summited for the ${articleName} use case.` };
				default:
					return { title: "Successful Implementations", subtitle: `Clients We Have Summited ${articleName} with.` };
			}
		case "Bio":
			switch (currentArticleSubcategory) {
				case "Industry":
					return { title: "We Summit Team", subtitle: `Who Have Summited the ${articleName} industry.` };
				case "Product":
					return { title: "We Summit Team", subtitle: `Who Have Summited the ${articleName} product.` };
				case "Specific Implementation":
					return { title: "We Summit Team", subtitle: `Who Have Summited ${articleName}.` };
				case "Use Case":
					return { title: "We Summit Team", subtitle: `Who Have Summited the ${articleName} use case.` };
				default:
					return { title: "We Summit Team", subtitle: `Who Have Summited ${articleName}.` };
			}
		default:
			return null;
	}
}

function makeRelatedTitlesAndSubtitles(
	currentArticleCategory: string | null,
	relatedArticleCategory: string | null,
	articleName: string,
	currentArticleSubcategory: string | null,
	relatedArticleSubcategory: string | null,
): { title: string; subtitle: string } {
	// If current article is a Case Study (and related isn't), use subcategory-aware titles.
	if (currentArticleCategory === "Case Study" && relatedArticleCategory !== "Case Study") {
		const result = currentCaseStudyTitles(relatedArticleCategory, currentArticleSubcategory, articleName);
		if (result) return result;
	}

	let title = "";
	let subtitle = ``;

	switch (relatedArticleCategory) {
		case "Case Study":
			return relatedCaseStudyTitles(currentArticleCategory, relatedArticleSubcategory, articleName);
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
