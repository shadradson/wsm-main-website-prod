import type { Route } from "./+types/case-studies";
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

const TITLE = "Client Success Stories | Salesforce & AI Results | We Summit Mountains";
const DESCRIPTION =
	"See how We Summit Mountains delivers real results — Salesforce transformations, AI implementations, and system integrations across industries.";

export function meta({}: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/case-studies" });
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;
	const { results } = await db.prepare(
		`SELECT sf_id, name, subtitle, short_description, article_body, html_body,
			article_category, subcategory, author_first_name, author_last_name, author_title,
			splash_image_url, splash_image_background, publish_status, article_order,
			vertical_product, admin_approval
		FROM articles
		WHERE article_category = 'Case Study'
			AND admin_approval = 1
			AND publish_status = 'Published'
		ORDER BY article_order ASC`
	).all<Article>();

	const articles = results ?? [];
	const industryArticles = articles.filter((a) => a.subcategory === "Industry");
	const productArticles = articles.filter((a) => a.subcategory === "Product");

	return { industryArticles, productArticles };
}

export default function CaseStudies() {
	return (
		<>
			<PageHero />
			<IndustrySection />
			<ProductSection />
			<ResultsSection />
		</>
	);
}

function PageHero() {
	return (
		<section id="cases-hero" className="bg-gradient-to-br from-wsm-dark to-wsm-mountain min-h-[66vh] relative overflow-hidden">
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
							Case Studies
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							Real Results,{" "}
							<span className="text-brand-sky">Real Impact</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							Discover how we've helped organizations overcome their
							technology challenges and achieve measurable success.
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

function ArticleGrid({ articles, id, title, description }: { articles: Article[]; id: string; title: string; description: string }) {
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
						<p className="text-gray-400 italic p-6">No case studies yet.</p>
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

function IndustrySection() {
	const { industryArticles } = useLoaderData<typeof loader>();
	return (
		<ArticleGrid
			id="cases-industry"
			title="Industry Knowledge"
			description="Deep expertise across the industries we serve."
			articles={industryArticles}
		/>
	);
}

function ProductSection() {
	const { productArticles } = useLoaderData<typeof loader>();
	return (
		<ArticleGrid
			id="cases-products"
			title="Software Proficiencies"
			description="Proven results with the platforms and tools we specialize in."
			articles={productArticles}
		/>
	);
}

function ResultsSection() {
	const stats = [
		{ value: "95%", label: "Client Retention Rate" },
		{ value: "60%", label: "Avg. Efficiency Gain" },
		{ value: "4.9/5", label: "Client Satisfaction" },
		{ value: "<2wk", label: "Avg. Time to First Value" },
	];

	return (
		<section id="cases-results" className="bg-summit-dark">
			<div className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl font-bold text-white text-center mb-12">
						By the Numbers
					</h2>
					<div className="flex flex-wrap gap-8 justify-center">
						{stats.map((stat) => (
							<div key={stat.label} className="w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] text-center">
								<p className="text-3xl sm:text-4xl font-bold text-brand-sky mb-2">
									{stat.value}
								</p>
								<p className="text-gray-400 text-sm uppercase tracking-wider">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
