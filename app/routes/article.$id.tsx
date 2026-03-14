import type { Route } from "./+types/article.$id";
import { Link, useLoaderData } from "react-router";
import { buildMeta, SITE_URL } from "~/lib/seo";

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

export async function loader({ context, params }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;
	const id = params.id;

	const article = await db.prepare(
		`SELECT sf_id, name, subtitle, short_description, article_body, html_body,
			article_category, subcategory, author_first_name, author_last_name, author_title,
			splash_image_url, splash_image_background, publish_status, article_order,
			vertical_product, admin_approval
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

	return { article, relatedArticles: relatedArticles ?? [] };
}

export default function ArticlePage() {
	const { article, relatedArticles } = useLoaderData<typeof loader>();

	const hasHtml = !!article.html_body?.trim();
	const hasBody = !!article.article_body?.trim();

	return (
		<div className="min-h-screen bg-white">
			{/* Hero */}
			<div
				className="bg-gradient-to-br from-wsm-dark to-wsm-mountain py-20 lg:py-28"
				style={article.splash_image_background ? { backgroundColor: article.splash_image_background } : undefined}
			>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<Link
						to="/case-studies"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
					>
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						Back to Case Studies
					</Link>

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
								className="w-32 h-32 object-contain flex-shrink-0 border border-white/10 hidden sm:block"
							/>
						)}
					</div>
				</div>
			</div>

			{/* Body */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-gray200">
				{hasHtml ? (
					<div
						className="prose prose-lg max-w-none"
						dangerouslySetInnerHTML={{ __html: article.html_body! }}
					/>
				) : hasBody ? (
					<div className="prose prose-lg max-w-none">
						{article.article_body!.split("\n").map((line, i) =>
							line.trim() ? <p key={i}>{line}</p> : <br key={i} />
						)}
					</div>
				) : (
					<p className="text-gray-500 italic">Full content coming soon.</p>
				)}
			</div>

			{/* Related Articles */}
		{relatedArticles.length > 0 && (
			<div>
			<div className="transition1 bg-gray-200">
				<div className="translayer midlay t1_lay5">
					<div className="splash_tag_box">
						<div className="splash_tag_text text-wsm-dark">
							RELATED
						</div>
					</div>
				</div>
			</div>
			<div className="bg-wsm-dark pattern-bg-dots py-12">
				<div className="max-w-6xl mx-auto p-4 sm:p-6 lg:px-8 flex flex-col gap-0 border-2 border-solid border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff18,_#ffffff18_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed">
					<div className="bg-wsm-dark p-4 border-b-2 border-solid border-[#ffffff22]">
						<h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Related Articles</h2>
					</div>
					<div className="flex flex-wrap justify-center bg-[#ffffff44]">
						{relatedArticles.map((ref) => {
							const initials = `${ref.name?.[0] ?? ""}${ref.name?.split(" ")?.[1]?.[0] ?? ""}`;
							return (
								<Link
									key={ref.sf_id}
									to={`/article/${ref.sf_id}`}
									className="w-full sm:w-[calc(50%-0.25rem)] min-w-[300px] grow group p-1 hover:shadow-xl transition-all"
								>
									<div className="bg-wsm-dark group-hover:bg-[#141b2a] border-2 border-solid border-gray-600 group-hover:border-brand-sky flex h-full relative z-10 transition-colors">
										{ref.splash_image_url ? (
											<img
												src={ref.splash_image_url}
												alt={ref.name}
												className="w-1/3 aspect-square object-contain flex-shrink-0 border-r-2 border-gray-600 p-8"
											/>
										) : (
											<div className="w-1/3 aspect-square bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0 border-r-2 border-gray-600">
												{initials}
											</div>
										)}
										<div className="text-left p-4 w-2/3 flex flex-col">
											<div className="flex flex-wrap gap-1 mb-2">
												{ref.subcategory && (
													<span className="text-xs font-semibold text-wsm-glacier bg-[#ffffff11] border border-[#ffffff22] px-2 py-1 rounded">
														{ref.subcategory}
													</span>
												)}
												{ref.vertical_product && (
													<span className="text-xs font-medium text-gray-400 bg-[#ffffff08] border border-[#ffffff15] px-2 py-1 rounded">
														{ref.vertical_product}
													</span>
												)}
												{ref.relationship_type && (
													<span className="text-xs font-medium text-gray-500 bg-[#ffffff08] border border-[#ffffff15] px-2 py-1 rounded ml-auto">
														{ref.relationship_type}
													</span>
												)}
											</div>
											<p className="text-lg font-bold text-white leading-snug">{ref.name}</p>
											{ref.subtitle && (
												<p className="text-wsm-glacier text-sm font-medium mt-1">{ref.subtitle}</p>
											)}
											{ref.short_description && (
												<p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-2">{ref.short_description}</p>
											)}
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
			</div>
		)}

		{/* Footer CTA */}
			<div className="bg-gray-50 border-t border-gray-200">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to achieve similar results?</h2>
					<p className="text-gray-600 mb-8">Let's talk about your challenges and build a path to your summit.</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/contact"
							className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all"
						>
							Start Your Project
						</Link>
						<Link
							to="/case-studies"
							className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
						>
							More Case Studies
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
