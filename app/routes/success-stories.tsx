import type { Route } from "./+types/success-stories";
import { useLoaderData } from "react-router";
import ParticleDots from "~/components/ParticleDots";
import { WSM_LOGO_PATH } from "~/lib/svgPaths";
import ArticleCardSection from "~/components/ArticleCardSection";
import { buildMeta } from "~/lib/seo";
import type { Article } from "~/lib/types";

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
	const { articles, implArticles } = useLoaderData<typeof loader>();
	return (
		<>
			<PageHero />
			<ArticleCardSection
				id="stories-grid"
				title1="OUR CLIENT'S"
				title2="SUCCESS STORIES"
				subtitle="Hear directly from the clients we've helped achieve their goals."
				articles={articles}
				emptyText="No success stories yet."
				theme="dark"
				dots
				trail="success-stories"
			/>
			<ArticleCardSection
				id="implementations-grid"
				title1="SUCCESSFUL"
				title2="IMPLEMENTATIONS"
				subtitle="See the solutions we've delivered! Built right, on time, and built to last."
				articles={implArticles}
				emptyText="No implementation stories yet."
				theme="dark"
				dots
				trail="success-stories"
			/>
		</>
	);
}

function PageHero() {
	return (
		<section id="stories-hero" className="bg-gradient-to-br from-black to-wsm-mountain min-h-[66vh] relative overflow-hidden">
			<div className="hidden md:block">
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
			</div>
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

