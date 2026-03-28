import type { Route } from "./+types/article.$id";
import { Link, useLoaderData } from "react-router";
import { buildMeta, SITE_URL } from "~/lib/seo";
import ArticleCardSection from "~/components/ArticleCardSection";
import { PAGE_CRUMBS, MAX_TRAIL_DEPTH, buildTrailParam } from "~/lib/types";

function markdownToHtml(md: string): string {
	return md
		.replace(/^### (.+)$/gm, "<h3>$1</h3>")
		.replace(/^## (.+)$/gm, "<h2>$1</h2>")
		.replace(/^# (.+)$/gm, "<h1>$1</h1>")
		.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
		.replace(/\*(.+?)\*/g, "<em>$1</em>")
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
		.replace(/^- (.+)$/gm, "<li>$1</li>")
		.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
		.replace(/^(?!<[hluoi])(.*\S.*)$/gm, "<p>$1</p>")
		.replace(/\n{2,}/g, "");
}

interface Article {
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

interface RelatedArticle {
	sf_id: string;
	name: string;
	subtitle: string | null;
	short_description: string | null;
	subcategory: string | null;
	vertical_product: string | null;
	splash_image_url: string | null;
	relationship_type: string | null;
}

export function meta({ data }: Route.MetaArgs) {
	if (!data?.article) {
		return [{ title: "Article Not Found | We Summit Mountains" }];
	}
	const { article } = data;
	const title = `${article.name} | We Summit Mountains`;
	const description = article.short_description ?? article.subtitle ?? "A case study from We Summit Mountains.";
	return buildMeta({
		title,
		description,
		path: `/article/${article.sf_id}`,
		image: article.splash_image_url ?? undefined,
	});
}

export async function loader({ context, params, request }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;
	const id = params.id;
	const url = new URL(request.url);
	const trailParam = url.searchParams.get("trail") ?? "";

	const article = await db.prepare(
		`SELECT sf_id, name, subtitle, short_description, article_body, html_body,
			article_category, subcategory, author_first_name, author_last_name, author_title,
			splash_image_url, splash_image_background, publish_status, article_order,
			vertical_product, body_type, admin_approval
		FROM articles
		WHERE sf_id = ?
			AND admin_approval = 1
			AND publish_status = 'Published'`
	).bind(id).first<Article>();

	if (!article) {
		throw new Response("Not Found", { status: 404 });
	}

	const { results: relatedArticles } = await db.prepare(
		`SELECT a.sf_id, a.name, a.subtitle, a.short_description,
			a.subcategory, a.vertical_product, a.splash_image_url, ar.relationship_type
		FROM article_references ar
		JOIN articles a ON a.sf_id = ar.child_article_id
		WHERE ar.parent_or_primary_id = ?
			AND a.admin_approval = 1 AND a.publish_status = 'Published'
		UNION
		SELECT a.sf_id, a.name, a.subtitle, a.short_description,
			a.subcategory, a.vertical_product, a.splash_image_url, ar.relationship_type
		FROM article_references ar
		JOIN articles a ON a.sf_id = ar.parent_or_primary_id
		WHERE ar.child_article_id = ?
			AND a.admin_approval = 1 AND a.publish_status = 'Published'`
	).bind(id, id).all<RelatedArticle>();

	// Resolve breadcrumb trail — fetch article names for sf_ids in the trail
	const trailParts = trailParam ? trailParam.split(",").slice(-MAX_TRAIL_DEPTH) : [];
	const breadcrumbs: { label: string; path: string }[] = [];

	// Always start with Home
	breadcrumbs.push({ label: "Home", path: "/" });

	// Separate page slugs from article sf_ids
	const articleIds = trailParts.filter((p) => !PAGE_CRUMBS[p]);
	const pageSlugs = trailParts.filter((p) => PAGE_CRUMBS[p]);

	// Add the page crumb (first one found)
	if (pageSlugs.length > 0) {
		const page = PAGE_CRUMBS[pageSlugs[0]];
		breadcrumbs.push({ label: page.label, path: page.path });
	}

	// Fetch names for article sf_ids in one query
	if (articleIds.length > 0) {
		const placeholders = articleIds.map(() => "?").join(",");
		const { results: crumbArticles } = await db.prepare(
			`SELECT sf_id, name FROM articles WHERE sf_id IN (${placeholders})`
		).bind(...articleIds).all<{ sf_id: string; name: string }>();

		// Maintain trail order
		const nameMap = new Map((crumbArticles ?? []).map((a) => [a.sf_id, a.name]));
		for (const aid of articleIds) {
			const name = nameMap.get(aid);
			if (name) {
				// Build the trail up to this article for its link
				const idx = trailParts.indexOf(aid);
				const subTrail = trailParts.slice(0, idx + 1).join(",");
				breadcrumbs.push({ label: name, path: `/article/${aid}?trail=${encodeURIComponent(subTrail)}` });
			}
		}
	}

	// The trail to pass to related article links (current trail + this article)
	const nextTrail = buildTrailParam(trailParam, id);

	return {
		article,
		relatedArticles: relatedArticles ?? [],
		breadcrumbs,
		trail: trailParam,
		nextTrail,
	};
}

export default function ArticlePage() {
	const { article, relatedArticles, breadcrumbs, nextTrail } = useLoaderData<typeof loader>();

	const bodyType = article.body_type?.trim() ?? "";
	const hasHtml = !!article.html_body?.trim();
	const hasBody = !!article.article_body?.trim();

	return (
		<div className="min-h-screen bg-white">
			{/* Hero */}
			<div
				className="bg-gradient-to-br from-wsm-dark to-wsm-mountain py-20 lg:py-28"
				style={article.splash_image_background ? { backgroundColor: article.splash_image_background } : undefined}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Breadcrumbs */}
					<nav className="flex flex-wrap items-center gap-1 text-sm mb-8">
						{breadcrumbs.map((crumb, i) => (
							<span key={i} className="flex items-center gap-1">
								{i > 0 && (
									<svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								)}
								<Link
									to={crumb.path}
									className="text-gray-400 hover:text-white transition-colors"
								>
									{crumb.label}
								</Link>
							</span>
						))}
						<span className="flex items-center gap-1">
							<svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
							<span className="text-white font-medium">{article.name}</span>
						</span>
					</nav>

					<div className="flex items-start gap-6">
						<div className="flex-1">
							<div className="flex flex-wrap gap-2 mb-4">
								{article.subcategory && (
									<span className="px-3 py-1 bg-brand-blue/20 text-brand-sky text-xs font-semibold rounded-full">
										{article.subcategory}
									</span>
								)}
								{article.vertical_product && (
									<span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-medium rounded-full">
										{article.vertical_product}
									</span>
								)}
							</div>

							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
								{article.name}
							</h1>

							{article.subtitle && (
								<p className="text-xl text-brand-sky font-medium mb-6">{article.subtitle}</p>
							)}

							{article.short_description && (
								<p className="text-lg text-gray-300 leading-relaxed mb-6">{article.short_description}</p>
							)}

							{article.author_first_name && (
								<p className="text-sm text-gray-400">
									By {article.author_first_name} {article.author_last_name}
									{article.author_title && ` — ${article.author_title}`}
								</p>
							)}
						</div>

						{article.splash_image_url && (
							<img
								src={article.splash_image_url}
								alt={article.name}
								className="w-32 h-32 object-contain flex-shrink-0 hidden sm:block"
							/>
						)}
					</div>
				</div>
			</div>

			{/* Body */}
			<div className="bg-gradient-to-b from-gray-50 to-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					{bodyType === "HTML" && hasHtml ? (
						<div
							className="prose prose-lg max-w-none"
							dangerouslySetInnerHTML={{ __html: article.html_body! }}
						/>
					) : bodyType === "Rich Text" && hasBody ? (
						<div
							className="prose prose-lg max-w-none"
							dangerouslySetInnerHTML={{ __html: article.article_body! }}
						/>
					) : bodyType === "MD" && hasHtml ? (
						<div
							className="prose prose-lg max-w-none"
							dangerouslySetInnerHTML={{ __html: markdownToHtml(article.html_body!) }}
						/>
					) : hasHtml ? (
						<div
							className="prose prose-lg max-w-none"
							dangerouslySetInnerHTML={{ __html: article.html_body! }}
						/>
					) : hasBody ? (
						<div
							className="prose prose-lg max-w-none"
							dangerouslySetInnerHTML={{ __html: article.article_body! }}
						/>
					) : (
						<p className="text-gray-500 italic">Full content coming soon.</p>
					)}
				</div>

			</div>
			{/* Related Articles */}
			{relatedArticles.length > 0 && (
				<ArticleCardSection
					id="related-articles"
					title1="Related Articles"
					articles={relatedArticles}
					theme="dark"
					dots
					trail={nextTrail}
				/>
			)}

		</div>
	);
}
