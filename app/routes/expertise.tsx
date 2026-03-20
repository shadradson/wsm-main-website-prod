import type { Route } from "./+types/expertise";
import { Link } from "react-router";
import Hexagons from "~/components/Hexagons";
import { MOUNTAIN_POINTS_PATH } from "~/lib/svgPaths";
import { buildMeta, SITE_URL } from "~/lib/seo";
import { div } from "three/tsl";

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
			<ProcessSection />
			<TechStack />
		</>
	);
}

function PageHero() {
	return (
		<section id="expertise-hero" className="bg-gradient-to-br from-[#000] to-wsm-cliff min-h-[55vh] relative overflow-hidden">
			<div className="hidden md:block">
				<Hexagons
					len={80}
					count={40}
					baseTime={10}
					addedTime={60}
					dieChance={0.01}
					spawnChance={1}
					sparkChance={0.1}
					sparkDist={5}
					sparkSize={1}
					color="hsl(hue,100%,light%)"
					baseLight={70}
					addedLight={10}
					shadowToTimePropMult={10}
					baseLightInputMultiplier={0.01}
					addedLightInputMultiplier={0.02}
					repaintAlpha={0.08}
					hueChange={0.7}
					followMouse={true}
				/>

			</div>
			<div className="py-20 lg:py-28 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="absolute top-4 -left-19 text-wsm-mountain px-3 py-1" style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "1rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>EXPERTISE</div>
					<div className="max-w-3xl">
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
			href: "/ai-consulting",
			tag: "MAKE AI WORK FOR YOU",
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
			href: "/mountain-guide-services",
			tag: "SALESFORCE EXPERTS",
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
			href: "/system-integration-services",
			tag: "NO DATA SILOS",
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
			href: "/fractional-cto-services",
			tag: "GROW EVERYTHING",
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
									<div className="absolute top-4 -left-19 text-wsm-mountain px-3 py-1" style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "1rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>
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
											to={service.href}
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

function ProcessSection() {
	const steps = [
		{
			step: "01",
			title: "Learn",
			subtitle: "Discovery / Strategy",
			description:
				"We dive deep into your business, understanding your goals, challenges, and existing technology landscape. We discuss best practices and architect platforms built for long term growth.",
		},
		{
			step: "02",
			title: "Climb",
			subtitle: "Build / Testing",
			description:
				"We start climbing. Quick wins, demos, and testing together allow us to remain flexible and show immense value without long nerve wracking waiting periods.",
		},
		{
			step: "03",
			title: "Summit",
			subtitle: "Deployment / Training",
			description:
				"We are not just here to build software. We are here to make sure everyone is enabled in using it. We love training. Let's get your teams happy with the build, and excited to share feedback.",
		},
		{
			step: "04",
			title: "Keep Climbing",
			subtitle: "Continuous Growth",
			description:
				"The next mountain calls. Let's tackle the next problem, and then the next. Growth is never finished. Just keep climbing.",
		},
	];

	return (
		<section id="expertise-process" className="bg-gradient-to-tl from-summit-dark to-wsm-cliff ">

			<div className="h-30 pattern-bg-dots-nofix"></div>
			<div className="">
				<div className="border-y-solid border-y-1 border-[#ccc]">
					<div className="border-x-solid border-x-1 border-[#ccc] max-w-7xl mx-auto text-center outline-1 outline-solid outline-[#ccc] outline-offset-30 relative">
						<div className="wsm-tag absolute top-4 -left-19 text-wsm-mountain px-3 py-1" style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "1rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>
							PROCESS
						</div>
						<div className="p-10 sm:p-8 lg:p-12">
							<div className="p-2 sm:p-2 lg:p-2">
								<h2 className="text-3xl sm:text-4xl font-bold text-white">OUR PROCESS</h2>
								<p className="text-lg text-gray-300 max-w-2xl mx-auto">Our proven approach to delivering excellent results.</p>
							</div>
						</div>

						<div className="flex flex-wrap justify-center">
							{steps.map((item) => (
								<div
									key={item.title}
									className="relative p-1 flex-1 min-w-[200px] min-h-[100px] items-center flex flex-col justify-center hover:bg-white/5 transition-colors"
								>
									{/* Top-left */}
									<svg className="absolute top-0 -left-0.25 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path stroke="#ccc" strokeWidth="2" d="M0 20V0h20" />
									</svg>
									{/* Top-right */}
									<svg className="absolute top-0 right-0 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path stroke="#ccc" strokeWidth="2" d="M20 20V0H0" />
									</svg>
									{/* Bottom-left */}
									<svg className="absolute bottom-0 -left-0.25 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path stroke="#ccc" strokeWidth="2" d="M0 0v20h20" />
									</svg>
									{/* Bottom-right */}
									<svg className="absolute bottom-0 right-0 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path stroke="#ccc" strokeWidth="2" d="M20 0v20H0" />
									</svg>
									<div className="bg-[#00000077] h-[100%] w-[100%] flex-col items-center justify-center p-4">
										<div className="w-12 h-12 bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold mx-auto mb-5 absolute top-1 left-1">
											{item.step}
										</div>
										<h3 className="text-lg font-bold text-gray-200">
											{item.title}
										</h3>
										<h4 className="text-md font-[500] text-gray-200 mb-4">
											{item.subtitle}
										</h4>
										<p className="text-gray-300 text-sm leading-relaxed">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="p-10 sm:p-8 lg:p-12">
							<div className="p-2 sm:p-2 lg:p-2">
								<h3 className="text-1xl sm:text-2xl font-bold text-white">DON'T WASTE TIME</h3>
								<p className="text-lg text-gray-300 max-w-2xl mx-auto">.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="h-30 pattern-bg-dots"></div>
		</section>

	);
}

function TechStack() {
	const technologies = [
		"Agentic Workflows",

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
		"Payment Systems",
		"Credit Scoring",
		"AI Data Tools",
		"make.com",
		"Claude",
		"Gemini",
	];

	return (
		<section id="expertise-tech-stack" className="bg-gray-50 flex">
			<div className="border-r-1 border-r-solid border-r-gray-300 flex-1"></div>
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto py-8 border-y-1 border-y-solid border-y-gray-300 relative">
					<div className="wsm-tag absolute top-4 -left-19 text-wsm-mountain px-3 py-1" style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "1rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>
						TECH PROFFICIENCY
					</div>
					<h2 className="text-3xl sm:text-4xl text-center font-bold text-gray-900 mb-4">
						Technologies We Work With
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
						We leverage the best tools and platforms to deliver
						exceptional results.
					</p>
					<div className="flex flex-wrap justify-center">
						{technologies.map((tech) => (
							<div key={tech}
								className="p-2.5 border border-gray-300 bg-[#eee] flex-1 flex justify-center">
								<div className="px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm h-[100%] flex items-center justify-center w-fit min-w-[120px]">
									<span className="text-sm font-[700] text-gray-700 whitespace-nowrap">
										{tech}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="border-l-1 border-l-solid border-l-gray-300 flex-1"></div>
		</section>
	);
}







