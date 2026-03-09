import type { Route } from "./+types/case-studies";
import { Link, useLoaderData } from "react-router";

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

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Case Studies | We Summit Mountains" },
		{
			name: "description",
			content:
				"See how We Summit Mountains has helped organizations transform their technology. Real results from real partnerships.",
		},
	];
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
			<CTASection />
		</>
	);
}

function PageHero() {
	return (
		<section id="cases-hero" className="bg-summit-dark">
			<div className="py-20 lg:py-28">
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
	return (
		<div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
			<div className="p-8 lg:p-10">
				<div className="flex flex-wrap gap-2 mb-4">
					{article.subcategory && (
						<span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-full">
							{article.subcategory}
						</span>
					)}
					{article.vertical_product && (
						<span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
							{article.vertical_product}
						</span>
					)}
				</div>

				<h3 className="text-2xl font-bold text-gray-900 mb-2">
					{article.name}
				</h3>

				{article.subtitle && (
					<p className="text-brand-sky font-medium mb-4">
						{article.subtitle}
					</p>
				)}

				{article.short_description && (
					<p className="text-gray-600 leading-relaxed mb-4">
						{article.short_description}
					</p>
				)}

				{article.author_first_name && (
					<p className="text-sm text-gray-500">
						By {article.author_first_name} {article.author_last_name}
						{article.author_title && ` — ${article.author_title}`}
					</p>
				)}
			</div>
		</div>
	);
}

function IndustrySection() {
	const { industryArticles } = useLoaderData<typeof loader>();

	return (
		<section id="cases-industry">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Industry Knowledge
					</h2>
					<p className="text-lg text-gray-600 mb-12">
						Deep expertise across the industries we serve.
					</p>

					{industryArticles.length === 0 ? (
						<p className="text-gray-500 italic">No industry case studies yet.</p>
					) : (
						<div className="space-y-8">
							{industryArticles.map((article) => (
								<ArticleCard key={article.sf_id} article={article} />
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

function ProductSection() {
	const { productArticles } = useLoaderData<typeof loader>();

	return (
		<section id="cases-products" className="bg-gray-50">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Software Proficiencies
					</h2>
					<p className="text-lg text-gray-600 mb-12">
						Proven results with the platforms and tools we specialize in.
					</p>

					{productArticles.length === 0 ? (
						<p className="text-gray-500 italic">No product case studies yet.</p>
					) : (
						<div className="space-y-8">
							{productArticles.map((article) => (
								<ArticleCard key={article.sf_id} article={article} />
							))}
						</div>
					)}
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

function CTASection() {
	return (
		<section id="cases-cta">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Your Success Story Starts Here
					</h2>
					<p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
						Ready to become our next case study? Let's discuss your
						challenges and build a solution together.
					</p>
					<Link
						to="/contact"
						className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
					>
						Start Your Project
					</Link>
				</div>
			</div>
		</section>
	);
}
