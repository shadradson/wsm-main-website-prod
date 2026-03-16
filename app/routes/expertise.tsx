import type { Route } from "./+types/expertise";
import { Link } from "react-router";
import ParticleDots from "~/components/ParticleDots";
import { MOUNTAIN_POINTS_PATH } from "~/lib/svgPaths";
import { buildMeta, SITE_URL } from "~/lib/seo";

const TITLE = "Salesforce & AI Consulting Services | We Summit Mountains";
const DESCRIPTION =
	"Expert Salesforce implementation, AI consulting, cloud CRM, system integrations & custom software development. Free discovery call. Dallas, TX.";

export function meta({ }: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/expertise" });
}

const servicesSchema = {
	"@context": "https://schema.org",
	"@type": "WebPage",
	"@id": `${SITE_URL}/expertise`,
	name: TITLE,
	description: DESCRIPTION,
	url: `${SITE_URL}/expertise`,
	publisher: { "@id": `${SITE_URL}/#organization` },
	breadcrumb: {
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Expertise", item: `${SITE_URL}/expertise` },
		],
	},
	mainEntity: {
		"@type": "ItemList",
		itemListElement: [
			{
				"@type": "ListItem", position: 1,
				item: { "@type": "Service", name: "Salesforce Implementation & Optimization", provider: { "@id": `${SITE_URL}/#organization` }, description: "End-to-end Salesforce implementation, customization, and optimization for Sales Cloud, Service Cloud, and more." },
			},
			{
				"@type": "ListItem", position: 2,
				item: { "@type": "Service", name: "Cloud CRM Solutions", provider: { "@id": `${SITE_URL}/#organization` }, description: "Strategic cloud CRM architecture and migration to maximize user adoption and business impact." },
			},
			{
				"@type": "ListItem", position: 3,
				item: { "@type": "Service", name: "System Integrations", provider: { "@id": `${SITE_URL}/#organization` }, description: "Connect Salesforce with your existing tools, ERPs, and data platforms for a seamless data ecosystem." },
			},
			{
				"@type": "ListItem", position: 4,
				item: { "@type": "Service", name: "AI Consulting & Implementation", provider: { "@id": `${SITE_URL}/#organization` }, description: "Practical AI strategy and implementation including Agentforce, Einstein AI, and custom agentic AI solutions." },
			},
			{
				"@type": "ListItem", position: 5,
				item: { "@type": "Service", name: "Custom Software Development", provider: { "@id": `${SITE_URL}/#organization` }, description: "Bespoke software built to your business requirements — from internal tools to customer-facing platforms." },
			},
		],
	},
};

export default function Expertise() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
			<PageHero />
			<ServicesDetail />
			<TechStack />
			<ProcessSection />
		</>
	);
}

function PageHero() {
	return (
		<section id="expertise-hero" className="bg-gradient-to-tl from-summit-dark to-wsm-cliff min-h-[50vh] relative overflow-hidden">
			<ParticleDots
				particleCount={600}
				color="#ffffff33"
				lineColor="#ffffff44"
				repelRadius={180}
				repelStrength={0.1}
				linkDistance={100}
				svgLinkDistance={100}
				svgPath={MOUNTAIN_POINTS_PATH}
				svgScale={1}
				svgOffsetX={300}
				svgOffsetY={30}
				svgPoints={300}
				attractStrength={0.015}
				svgFit="height"
				svgAlign="right"
			/>
			<div className="py-20 lg:py-28 relative z-10">
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
			</div>
		</section>
	);
}

function ServicesDetail() {
	const services = [
		{
			title: "AI Consulting & Implementation",
			description:
				"Artificial intelligence is transforming how businesses operate. We help you develop an AI strategy, identify high-impact use cases, and implement solutions that deliver real, measurable value — not just hype.",
			features: [
				"Agentforce",
				"Agentic Automation",
				"Predictive Analytics",
				"Process Automation with AI",
				"Next Gen Chatbots",
				"AI-Powered Customer Insights",
			],
			button_label: "LET'S SUMMIT AI",
			tag: "01 - AI",
		},
		{
			title: "Salesforce Implementation & Optimization",
			description:
				"We design, build, and optimize Salesforce solutions that align perfectly with your business processes. Whether you're starting fresh or optimizing an existing org, our certified consultants deliver systems that drive adoption and results.",
			features: [
				"Agentforce Integration",
				"Sales Cloud & Service Cloud",
				"Experience Cloud & Communities",
				"Business Process Implementation",
				"Mulesoft",
				"API Automation",
				"User Training & Adoption",
				"Continuous Growth",
			],
			button_label: "FULL SEND SALESFORCE",
			tag: "02 - SF",
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
			button_label: "OVERCOME INTEGRATIONS",
			tag: "03 - API",
		},
		{
			title: "Fractional CTO Services",
			description:
				"When you need executive help with your entire stack. Let us set a path, define future success, and execute the plan",
			features: [
				"KPIs",
				"Reporting",
				"Business Process Optimization",
				"Optimization",
				"Business Unit Unification",
				"Multi-Department Automation",
				"Role Optimization",
			],
			button_label: "LET'S CLIMB TOGETHER",
			tag: "04 - ALL",
		},
	];

	return (
		<section id="expertise-services">
			<div className="py-20 lg:py-28 pattern-bg-dots-light">
				<div className="">
					<div className="flex flex-col gap-24">
						{services.map((service, i) => (
							<div
								key={service.title}
								className={`relative flex flex-col lg:flex-row gap-12 items-start border-y-2 border-y-solid border-gray-200  ${i % 2 !== 0 ? "lg:flex-row-reverse " : ""
									}`}
							>
								<div className="relative max-w-7xl bg-white mx-auto flex flex-col lg:flex-row gap-12 items-start border-x-2 border-x-solid border-gray-200">
									<div className="absolute top-4 -left-19 text-wsm-mountain px-3 py-1" style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "2rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>
										{service.tag}
									</div>
									<div className="lg:w-1/2 flex flex-col gap-4 h-[-webkit-fill-available] p-16 border-x-solid border-x-2 border-gray-200">
										<h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
											{service.title}
										</h2>
										<p className="text-gray-600 leading-relaxed mb-6">
											{service.description}
										</p>
										<Link
											to="/contact"
											className="inline-flex self-start items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-navy-800 transition-colors"
										>
											{service.button_label}
										</Link>

									</div>
									<div
										className="lg:w-1/2 p-16"
									>
										<ul className="flex flex-row flex-wrap gap-2">
											{service.features.map((feature) => (
												<li className="text-white p-2 bg-gray-600"
													key={feature}
												>
													<span className="text-white font-[700]">
														{feature}
													</span>
												</li>
											))}
										</ul>
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
		<section id="expertise-tech-stack" className="bg-gray-50">
			<div className="py-20 lg:py-28">
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
		<section id="expertise-process">
			<div className="py-20 lg:py-28">
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

					<div className="flex flex-wrap gap-8">
						{steps.map((item) => (
							<div key={item.step} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] text-center">
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
			</div>
		</section>
	);
}

