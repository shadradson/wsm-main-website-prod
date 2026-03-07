import type { Route } from "./+types/expertise";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Expertise | We Summit Mountains" },
		{
			name: "description",
			content:
				"Salesforce implementation, Cloud CRM, AI consulting, system integrations, and custom software development. Explore our full range of services.",
		},
	];
}

export default function Expertise() {
	return (
		<>
			<PageHero />
			<ServicesDetail />
			<TechStack />
			<ProcessSection />
			<CTASection />
		</>
	);
}

function PageHero() {
	return (
		<section className="bg-summit-dark py-20 lg:py-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl">
					<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">
						Our Expertise
					</p>
					<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
						Solutions That Scale{" "}
						<span className="text-brand-sky">With You</span>
					</h1>
					<p className="text-lg text-gray-300 leading-relaxed">
						From Salesforce implementation to AI strategy, we bring
						the technical depth and business acumen to solve your
						toughest challenges.
					</p>
				</div>
			</div>
		</section>
	);
}

function ServicesDetail() {
	const services = [
		{
			title: "Salesforce Implementation & Optimization",
			description:
				"We design, build, and optimize Salesforce solutions that align perfectly with your business processes. Whether you're starting fresh or optimizing an existing org, our certified consultants deliver systems that drive adoption and results.",
			features: [
				"Sales Cloud & Service Cloud",
				"Experience Cloud & Communities",
				"Custom Objects & Automation (Flows)",
				"AppExchange Integration",
				"Data Migration & Cleanup",
				"User Training & Adoption",
			],
		},
		{
			title: "Cloud CRM Solutions",
			description:
				"Your customer relationships deserve a platform that grows with you. We architect cloud-native CRM solutions that unify your teams, streamline operations, and give you a 360-degree view of every customer interaction.",
			features: [
				"CRM Strategy & Roadmapping",
				"Multi-Cloud Architecture",
				"Customer Journey Mapping",
				"Analytics & Reporting Dashboards",
				"Mobile-First Design",
				"Ongoing Managed Services",
			],
		},
		{
			title: "System Integrations",
			description:
				"Disconnected systems slow you down. We build robust, scalable integrations that connect your tools, eliminate data silos, and create seamless workflows across your entire technology ecosystem.",
			features: [
				"API Development & Management",
				"Middleware & iPaaS Solutions",
				"Real-Time Data Synchronization",
				"Legacy System Modernization",
				"Third-Party App Connections",
				"Integration Testing & Monitoring",
			],
		},
		{
			title: "AI Consulting & Implementation",
			description:
				"Artificial intelligence is transforming how businesses operate. We help you develop an AI strategy, identify high-impact use cases, and implement solutions that deliver real, measurable value — not just hype.",
			features: [
				"AI Readiness Assessment",
				"Salesforce Einstein & Agentforce",
				"Predictive Analytics",
				"Process Automation with AI",
				"Natural Language Processing",
				"AI-Powered Customer Insights",
			],
		},
		{
			title: "Custom Software Development",
			description:
				"When off-the-shelf doesn't cut it, we build custom. Our development team creates tailored applications that solve your unique business problems with clean, maintainable, and scalable code.",
			features: [
				"Web Application Development",
				"Lightning Web Components (LWC)",
				"Apex & Visualforce Development",
				"REST & SOAP API Development",
				"Automated Testing & CI/CD",
				"Performance Optimization",
			],
		},
	];

	return (
		<section className="py-20 lg:py-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="space-y-20">
					{services.map((service, i) => (
						<div
							key={service.title}
							className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
								i % 2 !== 0 ? "lg:direction-rtl" : ""
							}`}
						>
							<div className={i % 2 !== 0 ? "lg:order-2" : ""}>
								<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
									{service.title}
								</h2>
								<p className="text-gray-600 leading-relaxed mb-6">
									{service.description}
								</p>
								<Link
									to="/contact"
									className="inline-flex items-center text-brand-blue font-semibold hover:text-brand-blue-dark transition-colors"
								>
									Discuss this service
									<svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</Link>
							</div>
							<div
								className={`bg-gray-50 rounded-2xl p-8 ${
									i % 2 !== 0 ? "lg:order-1" : ""
								}`}
							>
								<h3 className="font-semibold text-gray-900 mb-4">
									What's included:
								</h3>
								<ul className="space-y-3">
									{service.features.map((feature) => (
										<li
											key={feature}
											className="flex items-start gap-3"
										>
											<svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
											<span className="text-gray-700">
												{feature}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function TechStack() {
	const technologies = [
		"Salesforce",
		"Lightning Web Components",
		"Apex",
		"Einstein AI",
		"Agentforce",
		"MuleSoft",
		"React",
		"Node.js",
		"Cloudflare",
		"REST APIs",
		"n8n",
		"Stripe",
	];

	return (
		<section className="py-20 lg:py-28 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
					Technologies We Work With
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
					We leverage the best tools and platforms to deliver
					exceptional results.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					{technologies.map((tech) => (
						<span
							key={tech}
							className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}

function ProcessSection() {
	const steps = [
		{
			step: "01",
			title: "Discovery",
			description:
				"We dive deep into your business, understanding your goals, challenges, and existing technology landscape.",
		},
		{
			step: "02",
			title: "Strategy",
			description:
				"We craft a tailored roadmap that aligns technology solutions with your business objectives.",
		},
		{
			step: "03",
			title: "Build",
			description:
				"Our team implements solutions using agile methodology, with regular check-ins and transparent progress updates.",
		},
		{
			step: "04",
			title: "Launch & Support",
			description:
				"We ensure smooth deployment, provide training, and offer ongoing support to maximize your investment.",
		},
	];

	return (
		<section className="py-20 lg:py-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Our Process
					</h2>
					<p className="text-lg text-gray-600">
						A proven approach to delivering exceptional results,
						every time.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((item) => (
						<div key={item.step} className="text-center">
							<div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold mx-auto mb-5">
								{item.step}
							</div>
							<h3 className="text-lg font-bold text-gray-900 mb-2">
								{item.title}
							</h3>
							<p className="text-gray-600 text-sm leading-relaxed">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section className="py-20 bg-summit-dark">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl font-bold text-white mb-4">
					Have a Project in Mind?
				</h2>
				<p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
					Let's discuss how our expertise can help you achieve your
					goals.
				</p>
				<Link
					to="/contact"
					className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
				>
					Schedule a Consultation
				</Link>
			</div>
		</section>
	);
}
