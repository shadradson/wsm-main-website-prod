import type { Route } from "./+types/success-stories";
import { Link, useLoaderData } from "react-router";
import ParticleDots from "~/components/ParticleDots";
import { WSM_LOGO_PATH } from "~/lib/svgPaths";
import { buildMeta } from "~/lib/seo";

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

const TITLE = "Customer Success Stories | We Summit Mountains";
const DESCRIPTION =
	"Read how real clients have transformed their businesses with We Summit Mountains — Salesforce, AI, and beyond.";

export function meta({}: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/success-stories" });
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;

	const [{ results: successResults }, { results: implResults }] = await Promise.all([
		db.prepare(
			`SELECT sf_id, name, subtitle, short_description, article_body, html_body,
				article_category, subcategory, author_first_name, author_last_name, author_title,
				splash_image_url, splash_image_background, publish_status, article_order,
				vertical_product, admin_approval
			FROM articles
			WHERE article_category = 'Customer Success Story'
				AND admin_approval = 1
				AND publish_status = 'Published'
			ORDER BY article_order ASC`
		).all<Article>(),
		db.prepare(
			`SELECT sf_id, name, subtitle, short_description, article_body, html_body,
				article_category, subcategory, author_first_name, author_last_name, author_title,
				splash_image_url, splash_image_background, publish_status, article_order,
				vertical_product, admin_approval
			FROM articles
			WHERE article_category = 'Successful Implementation'
				AND admin_approval = 1
				AND publish_status = 'Published'
			ORDER BY article_order ASC`
		).all<Article>(),
	]);

	return { articles: successResults ?? [], implArticles: implResults ?? [] };
}

export default function SuccessStories() {
	return (
		<>
			<PageHero />
			<StoriesSection />
			<ImplementationsSection />
		</>
	);
}

function PageHero() {
	return (
		<section id="stories-hero" className="bg-gradient-to-br from-wsm-dark to-wsm-mountain min-h-[66vh] relative overflow-hidden">
			<ParticleDots
				particleCount={600}
				color="#ffffff22"
				lineColor="#ffffff"
				repelRadius={180}
				repelStrength={0.08}
				linkDistance={90}
				svgLinkDistance={30}
				svgPath={WSM_LOGO_PATH}
				svgScale={5}
				svgOffsetX={-200}
				svgOffsetY={60}
				svgPoints={300}
				attractStrength={0.0005}
				svgFit="none"
				svgAlign="right"
			/>
			<div className="py-20 lg:py-28 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">
							Success Stories
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							Our Clients,{" "}
							<span className="text-brand-sky">Their Wins</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							Real stories from real clients — see how We Summit Mountains
							has helped organizations unlock the full potential of their technology.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function ArticleCard({ article }: { article: Article }) {
	const initials = `${article.name?.[0] ?? ""}${article.name?.split(" ")?.[1]?.[0] ?? ""}`;
	return (
		<Link
			to={`/article/${article.sf_id}`}
			className="w-full sm:w-[calc(50%-0.5rem)] min-w-[340px] grow group p-1 hover:shadow-xl transition-all"
		>
			<div className="bg-wsm-dark group-hover:bg-[#141b2a] border-2 border-solid border-gray-600 group-hover:border-brand-sky flex h-full relative z-10 transition-colors">
				{article.splash_image_url ? (
					<img
						src={article.splash_image_url}
						alt={article.name}
						className="w-1/3 aspect-square object-contain flex-shrink-0 border-r-2 border-gray-600 p-8"
					/>
				) : (
					<div className="w-1/3 aspect-square bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0 border-r-2 border-gray-600">
						{initials}
					</div>
				)}
				<div className="text-left p-4 w-2/3 flex flex-col">
					<div className="flex flex-wrap gap-1 mb-2">
						{article.subcategory && (
							<span className="text-xs font-semibold text-wsm-glacier bg-[#ffffff11] border border-[#ffffff22] px-2 py-1 rounded">
								{article.subcategory}
							</span>
						)}
						{article.vertical_product && (
							<span className="text-xs font-medium text-gray-400 bg-[#ffffff08] border border-[#ffffff15] px-2 py-1 rounded">
								{article.vertical_product}
							</span>
						)}
					</div>
					<h3 className="text-lg font-bold text-white leading-snug">
						{article.name}
					</h3>
					{article.subtitle && (
						<p className="text-wsm-glacier text-sm font-medium mt-1">
							{article.subtitle}
						</p>
					)}
					{article.short_description && (
						<p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-3">
							{article.short_description}
						</p>
					)}
					{article.author_first_name && (
						<p className="text-xs text-gray-500 mt-auto pt-3 border-t border-gray-800">
							By {article.author_first_name} {article.author_last_name}
							{article.author_title && ` — ${article.author_title}`}
						</p>
					)}
				</div>
			</div>
		</Link>
	);
}

function ArticleGrid({ id, title, description, articles, emptyText }: { id: string; title: string; description: string; articles: Article[]; emptyText: string }) {
	return (
		<section id={id}>
			<div className="py-20 lg:py-28 bg-wsm-dark pattern-bg-dots">
				<div className="max-w-7xl mx-auto p-4 border-2 border-solid border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff18,_#ffffff18_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed">
					<div className="bg-wsm-dark p-4 border-2 border-solid border-[#ffffff22]">
						<h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
							{title}
						</h2>
						<p className="text-gray-400 mt-2">{description}</p>
					</div>
					{articles.length === 0 ? (
						<p className="text-gray-400 italic p-6">{emptyText}</p>
					) : (
						<div className="flex flex-wrap justify-center bg-[#ffffff44]">
							{articles.map((article) => (
								<ArticleCard key={article.sf_id} article={article} />
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

function StoriesSection() {
	const { articles } = useLoaderData<typeof loader>();
	return (
		<ArticleGrid
			id="stories-grid"
			title="Client Success Stories"
			description="Hear directly from the clients we've helped achieve their goals."
			articles={articles}
			emptyText="No success stories yet."
		/>
	);
}

function ImplementationsSection() {
	const { implArticles } = useLoaderData<typeof loader>();
	return (
		<ArticleGrid
			id="implementations-grid"
			title="Successful Implementations"
			description="See the solutions we've delivered — built right, on time, and built to last."
			articles={implArticles}
			emptyText="No implementation stories yet."
		/>
	);
}
