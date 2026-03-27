import type { Route } from "./+types/case-studies";
import { useLoaderData } from "react-router";
import FluidParticles from "~/components/FluidParticles";
import ArticleCardSection from "~/components/ArticleCardSection";
import { buildMeta } from "~/lib/seo";
import type { Article } from "~/lib/types";

const TITLE = "Client Success Stories | Salesforce & AI Results | We Summit Mountains";
const DESCRIPTION =
	"See how We Summit Mountains delivers real results — Salesforce transformations, AI implementations, and system integrations across industries.";

export function meta({ }: Route.MetaArgs) {
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
	const { industryArticles, productArticles } = useLoaderData<typeof loader>();
	return (
		<>
			<PageHero />
			<ArticleCardSection
				id="cases-industry"
				title="Industry Knowledge"
				description="Deep expertise across the industries we serve."
				articles={industryArticles}
				emptyText="No case studies yet."
				theme="dark"
			/>
			<ArticleCardSection
				id="cases-products"
				title="Software Proficiencies"
				description="Proven results with the platforms and tools we specialize in."
				articles={productArticles}
				emptyText="No case studies yet."
				theme="dark"
			/>
			<ResultsSection />
		</>
	);
}

function PageHero() {
	return (
		<section id="cases-hero" className="bg-gradient-to-br from-black to-wsm-mountain min-h-[66vh] relative overflow-hidden">
			<div className="hidden md:block">
				<FluidParticles />
			</div>
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
