import type { Route } from "./+types/case-studies";
import { Link } from "react-router";

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

export default function CaseStudies() {
	return (
		<>
			<PageHero />
			<CaseStudiesList />
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

function CaseStudiesList() {
	const caseStudies = [
		{
			title: "Nonprofit CRM Transformation",
			industry: "Nonprofit",
			challenge:
				"A growing nonprofit struggled with disconnected donor management systems, manual reporting, and limited visibility into fundraising performance.",
			solution:
				"We implemented Salesforce Nonprofit Cloud with custom donation tracking, automated acknowledgment workflows, and real-time fundraising dashboards.",
			results: [
				"60% reduction in manual data entry",
				"Real-time visibility into donor engagement",
				"Automated tax receipt generation",
				"Unified donor communication platform",
			],
			tags: ["Salesforce", "Nonprofit Cloud", "Automation"],
		},
		{
			title: "Sales Pipeline Modernization",
			industry: "Professional Services",
			challenge:
				"A professional services firm was losing deals due to an outdated CRM, lack of pipeline visibility, and inconsistent sales processes across teams.",
			solution:
				"We redesigned their Sales Cloud implementation with custom opportunity stages, automated lead scoring, and integrated email tracking to create a unified sales engine.",
			results: [
				"40% improvement in pipeline visibility",
				"25% increase in lead conversion rates",
				"Standardized sales process across all teams",
				"Automated weekly forecasting reports",
			],
			tags: ["Sales Cloud", "Lead Management", "Analytics"],
		},
		{
			title: "Multi-System Integration Hub",
			industry: "Technology",
			challenge:
				"A fast-growing tech company had critical data spread across 5+ disconnected systems, causing duplicate records, missed handoffs, and reporting nightmares.",
			solution:
				"We built a centralized integration hub connecting Salesforce, their ERP, marketing automation, support platform, and billing system with real-time data synchronization.",
			results: [
				"Eliminated 95% of duplicate records",
				"Real-time data sync across all platforms",
				"Single source of truth for customer data",
				"4-hour reduction in daily manual processes",
			],
			tags: ["Integration", "API Development", "Data Quality"],
		},
		{
			title: "AI-Powered Customer Service",
			industry: "E-Commerce",
			challenge:
				"An e-commerce company faced rising support ticket volumes with declining resolution times and customer satisfaction scores.",
			solution:
				"We deployed Salesforce Service Cloud with Einstein AI for case classification, automated routing, and a self-service knowledge base powered by intelligent search.",
			results: [
				"50% reduction in average resolution time",
				"30% decrease in support ticket volume",
				"Customer satisfaction score increased to 92%",
				"AI-powered case routing accuracy of 88%",
			],
			tags: ["Service Cloud", "Einstein AI", "Self-Service"],
		},
	];

	return (
		<section id="cases-list">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="space-y-12">
						{caseStudies.map((study, i) => (
							<div
								key={study.title}
								className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
							>
								<div className="p-8 lg:p-10">
									<div className="flex flex-wrap gap-2 mb-4">
										<span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-full">
											{study.industry}
										</span>
										{study.tags.map((tag) => (
											<span
												key={tag}
												className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
											>
												{tag}
											</span>
										))}
									</div>

									<h3 className="text-2xl font-bold text-gray-900 mb-6">
										{study.title}
									</h3>

									<div className="flex flex-col lg:flex-row gap-8">
										<div className="lg:flex-1">
											<h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
												<span className="w-2 h-2 rounded-full bg-red-400" />
												Challenge
											</h4>
											<p className="text-gray-600 text-sm leading-relaxed">
												{study.challenge}
											</p>
										</div>
										<div className="lg:flex-1">
											<h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
												<span className="w-2 h-2 rounded-full bg-brand-blue" />
												Solution
											</h4>
											<p className="text-gray-600 text-sm leading-relaxed">
												{study.solution}
											</p>
										</div>
										<div className="lg:flex-1">
											<h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
												<span className="w-2 h-2 rounded-full bg-brand-green" />
												Results
											</h4>
											<ul className="space-y-2">
												{study.results.map((result) => (
													<li
														key={result}
														className="flex items-start gap-2 text-sm text-gray-600"
													>
														<svg className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
														</svg>
														{result}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						))}
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
					<div className="flex flex-wrap gap-8">
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
