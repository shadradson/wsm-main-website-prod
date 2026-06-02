import type { Route } from "./+types/case-studies";
import { useLoaderData } from "react-router";
import FluidParticles from "~/components/FluidParticles";
import ArticleCardSection from "~/components/ArticleCardSection";
import { buildMeta } from "~/lib/seo";
import type { Article } from "~/lib/types";
import StatsSection from "~/components/StatSection";

const TITLE = "Case Studies | Salesforce & AI Studies | We Summit Mountains";
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
		WHERE (article_category = 'Case Study' OR article_category = 'Customer Success Story')
			AND admin_approval = 1
			AND publish_status = 'Published'
		ORDER BY article_order ASC`
	).all<Article>();

	return { articles: results ?? [] };
}

export default function CaseStudies() {
	const { articles } = useLoaderData<typeof loader>();
	return (
		<>
			<PageHero />
			<ArticleCardSection
				id="cases-all"
				title1="WHAT WE HAVE "
				title2="LEARNED"
				subtitle="This is our knowledge database of the things we have learned. Case Studies in specific industries, tools, and software. Customer success stories showcasing our success in implementation with our clients."
				articles={articles}
				emptyText="No case studies yet."
				theme="dark"
				trail="case-studies"
				dots
				tag="OUR WORK"
				searchAndFilter
			/>
			<StatsSection
				tag="STATS"
				theme="light"
				dots="true"
				stats={[
					{ value: "95%", label: "CLIENT RETENTION" },
					{ value: "60%", label: "AVG. EFFICIENCY GAIN" },
					{ value: "4.9/5", label: "CLIENT SATISFACTION" },
					{ value: "<2wk", label: "AVG. TIME TO FIRST VALUE" },
				]}
			/>
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

