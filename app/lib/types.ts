/** Shared article type — superset of all fields used across pages */
export interface Article {
	sf_id: string;
	name: string;
	subtitle: string | null;
	short_description: string | null;
	article_body: string | null;
	html_body: string | null;
	article_category: string | null;
	subcategory: string | null;
	author_first_name: string | null;
	author_last_name: string | null;
	author_title: string | null;
	splash_image_url: string | null;
	splash_image_background: string | null;
	publish_status: string | null;
	article_order: number | null;
	vertical_product: string | null;
	body_type: string | null;
	admin_approval: number;
}

/** Minimal article shape needed by ArticleLinkCard — Article satisfies this */
export interface ArticleCardData {
	sf_id: string;
	name: string;
	subtitle?: string | null;
	short_description?: string | null;
	article_category?: string | null;
	subcategory?: string | null;
	vertical_product?: string | null;
	splash_image_url?: string | null;
	author_first_name?: string | null;
	author_last_name?: string | null;
	author_title?: string | null;
}

/** Article reference from parent→child join (used in ai-consulting, etc.) */
export interface ArticleRef {
	ref_name: string;
	ref_order: number;
	child_sf_id: string;
	child_name: string;
	child_short_description: string;
	child_splash_image_url: string | null;
}

/** CSAT survey record from D1 */
export interface CsatSurvey {
	sf_id: string;
	name: string;
	account_name: string | null;
	first_name: string | null;
	last_name: string | null;
	title: string | null;
	star_rating: number | null;
	refer_likelihood: number | null;
	website_testimonial_blurb: string | null;
	permission_for_website: number;
	csat_date: string | null;
	testimonial_article_id: string | null;
}

/** Known page slugs for breadcrumb trail */
export const PAGE_CRUMBS: Record<string, { label: string; path: string }> = {
	"home": { label: "Home", path: "/" },
	"case-studies": { label: "Case Studies", path: "/case-studies" },
	"success-stories": { label: "Success Stories", path: "/success-stories" },
	"ai-consulting": { label: "AI Consulting", path: "/ai-consulting" },
	"expertise": { label: "Expertise", path: "/expertise" },
	"our-team": { label: "Our Team", path: "/our-team" },
};

/** Max breadcrumb trail depth (not counting the current page) */
export const MAX_TRAIL_DEPTH = 4;

/** Build a trail query string for linking to an article */
export function buildTrailParam(currentTrail: string, currentArticleId: string): string {
	const parts = currentTrail ? currentTrail.split(",") : [];
	parts.push(currentArticleId);
	// Keep only the last MAX_TRAIL_DEPTH items
	const trimmed = parts.slice(-MAX_TRAIL_DEPTH);
	return trimmed.join(",");
}

/** Convert an ArticleRef into the ArticleCardData shape */
export function articleRefToCardData(ref: ArticleRef): ArticleCardData {
	return {
		sf_id: ref.child_sf_id,
		name: ref.child_name,
		short_description: ref.child_short_description,
		splash_image_url: ref.child_splash_image_url,
	};
}
