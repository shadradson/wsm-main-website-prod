import type { Route } from "./+types/expertise";
import Hexagons from "~/components/Hexagons";
import { MOUNTAIN_POINTS_PATH } from "~/lib/svgPaths";
import { buildMeta, SITE_URL } from "~/lib/seo";
import Transition from "~/components/Transition";
import SplashSection from "~/components/SplashSection";
import ProcessSection from "~/components/ProcessSection";
import SimplePillSection from "~/components/SimplePillSection";
import SectionHeaderText from "~/components/SectionHeaderText";
import { Link, useLoaderData } from "react-router";
import SimpleButton from "~/components/SimpleButton";
import Tag from "~/components/Tag";

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
			<ServicesOverview/>
			{/*<SplashSection
				theme="light"
				dots="true"
				titlesize="small"
				cards={[
					{
						title1: "AI CONSULTING",
						title2: "& IMPLEMENTATION",
						subtitle: "Artificial intelligence is transforming how businesses operate. We help you develop an AI strategy, identify high-impact use cases, and implement solutions that deliver real, measurable value — not just hype.",
						haslink: true,
						buttontext: "LET'S SUMMIT AI",
						linkUrl: "/ai-consulting",
						tag: "AI EXPERTS",
						infotype: "tags",
						infotext: "Agentforce,Agentic Automation,Predictive Analytics,Process Automation with AI,Next Gen Chatbots,AI-Powered Customer Insights"
					},
					{
						title1: "SALESFORCE",
						title2: "IMPLEMENTATION",
						subtitle: "We design, build, and optimize Salesforce solutions that align perfectly with your business processes. Whether you're starting fresh or optimizing an existing org, our certified consultants deliver systems that drive adoption and results.",
						haslink: true,
						buttontext: "FULL SEND SALESFORCE",
						linkUrl: "/mountain-guide-services",
						tag: "SALESFORCE EXPERTS",
						infotype: "tags",
						infotext: "Agentforce Integration,Sales Cloud & Service Cloud,Experience Cloud & Communities,Business Process Implementation,Mulesoft,API Automation,User Training & Adoption,Continuous Growth"
					},
					{
						title1: "SYSTEM",
						title2: "INTEGRATIONS",
						subtitle: "Disconnected systems slow you down. We build robust, scalable integrations that connect your tools, eliminate data silos, and create seamless workflows across your entire technology ecosystem.",
						haslink: true,
						buttontext: "OVERCOME INTEGRATIONS",
						linkUrl: "/system-integration-services",
						tag: "CONNECTED",
						infotype: "tags",
						infotext: "API Development & Management,Middleware & iPaaS Solutions,Real-Time Data Synchronization,Legacy System Modernization,Third-Party App Connections,Integration Testing & Monitoring"
					},
					{
						title1: "FRACTIONAL CTO",
						title2: "SERVICES",
						subtitle: "When you need executive help with your entire stack. Let us set a path, define future success, and execute the plan.",
						haslink: true,
						buttontext: "LET'S CLIMB TOGETHER",
						linkUrl: "/fractional-cto-services",
						tag: "GROW EVERYTHING",
						infotype: "tags",
						infotext: "KPIs,Reporting,Business Process Optimization,Optimization,Business Unit Unification,Multi-Department Automation,Role Optimization"
					},
				]}
			/>*/}
			

			<ProcessSection
				tag="PROCESS"
				title1="OUR PROCESS"
				subtitle="Our proven approach to delivering excellent results."
				theme="light"
				dots="true"
				steps={[
					{
						step: "01",
						title: "Learn",
						subtitle: "Discovery / Strategy",
						description: "We dive deep into your business, understanding your goals, challenges, and existing technology landscape. We discuss best practices and architect platforms built for long term growth.",
					},
					{
						step: "02",
						title: "Climb",
						subtitle: "Build / Testing",
						description: "We start climbing. Quick wins, demos, and testing together allow us to remain flexible and show immense value without long nerve wracking waiting periods.",
					},
					{
						step: "03",
						title: "Summit",
						subtitle: "Deployment / Training",
						description: "We are not just here to build software. We are here to make sure everyone is enabled in using it. We love training. Let's get your teams happy with the build, and excited to share feedback.",
					},
					{
						step: "04",
						title: "Keep Climbing",
						subtitle: "Continuous Growth",
						description: "The next mountain calls. Let's tackle the next problem, and then the next. Growth is never finished. Just keep climbing.",
					},
				]}
			/>
			<SimplePillSection
				pills={[
					{ "buttontext": "AgenticWorkflows" },
					{ "buttontext": "Salesforce" },
					{ "buttontext": "Lightning Web Components" },
					{ "buttontext": "Apex" },
					{ "buttontext": "Einstein AI" },
					{ "buttontext": "Agentforce" },
					{ "buttontext": "MuleSoft" },
					{ "buttontext": "React" },
					{ "buttontext": "Node.js" },
					{ "buttontext": "Cloudflare" },
					{ "buttontext": "REST APIs" },
					{ "buttontext": "n8n" },
					{ "buttontext": "Payment Systems" },
					{ "buttontext": "Credit Scoring" },
					{ "buttontext": "AI Data Tools" },
					{ "buttontext": "make.com" },
				]}
				title1="TECH WE"
				title2="SUMMIT"
				subtitle="We leverage the best tools and platforms to deliver exceptional results."
				tag=""
				type="pills"
			theme= "light"
			dots="true"
			/>
		</>
	);
}

function PageHero() {
	return (
		<section id="expertise-hero" className="bg-gradient-to-br from-[#000] to-wsm-cliff min-h-[55vh] relative overflow-hidden">
			<div className="hidden md:block">
				<Hexagons
					len={40}
					randomlen={120}
					randomlenChance={40}
					turnangle={60}
					count={80}
					baseTime={10}
					addedTime={60}
					dieChance={0.01}
					spawnChance={1}
					sparkChance={0.1}
					sparkDist={2}
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
			<div className="py-20 lg:py-28 relative z-10 pointer-events-none">
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

function ServicesOverview() {
	const services = [
		{
			title: "AI Consulting",
			description: "Strategic Artificial Intelligence Implementation. We know AI",
			href: "/ai-consulting",
			alt_text: "Learn about our AI consulting services",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
				</svg>
			),
			button_text: "LEARN ABOUT AI",
		},
		{
			title: "CTO Fractional Services",
			description: "We provide strategic CTO guidance to fast track your business goals.",
			href: "/fractional-cto-services",
			alt_text: "Learn about our fractional CTO partnerships",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
				</svg>
			),
			button_text: "HOW WE GROW YOUR BUSINESS",
		},
		{
			title: "Salesforce Implementation",
			description: "Scalable Salesforce solutions tailored to your business.",
			href: "/mountain-guide-services",
			alt_text: "Learn about our Salesforce implementation successes",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg>
			),
			button_text: "IMPLEMENT SALESFORCE",
		},
		{
			title: "System Integrations",
			description: "Robust integrations that eliminate data silos and automate workflows.",
			href: "/system-integration-services",
			alt_text: "Learn about how we connect your systems",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
				</svg>
			),
			button_text: "CONNECT EVERYTHING",
		},
	];

	return (
		<section id="home-services" className="bg-gradient-to-b from-[#111] to-wsm-cliff">
			<div className="py-20 lg:py-28 flex flex-row">
				<div className="flex-1 pattern-bg-dots"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeaderText
						title1="WHAT"
						title2="WE DO"
						subtitle="We combine technical expertise with a collaborative approach to deliver solutions that enable operational excellence and sustainable success."
						theme="dark"
						horzAlign="left"
					/>

					<div className="flex flex-wrap justify-between gap-2 md:gap-4">
						{services.map((service) => (
							<Link
								key={service.title}
								to={service.href}
								aria-label={`Learn about ${service.title}`}
								className="w-full min-w-[200px] flex-1 sm:w-[calc(50%-0.625rem)] md:w-[calc(50%-1.25rem)] rounded-xl lg:w-[calc(25%-1.875rem)] flex flex-col justify-between group p-2 md:p-4 border-4 border-white/10 hover:border-brand-sky/30 hover:shadow-xl hover:shadow-brand-sky/5 transition-all overflow-hidden"
							>
								{/*<div className="w-14 h-14 bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
									{service.icon}
								</div>*/}
								<h3 className="text-xl font-bold text-white mb-3">
									{service.title}
								</h3>
								<p className="text-gray-300 leading-relaxed">
									{service.description}
								</p>
								<p className="inline-flex items-center justify-center text-center text-brand-sky font-semibold hover:text-white transition-colors pt-2 md:pt-4">
									<span>LEARN MORE</span>
									<svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</p>

							</Link>
						))}
					</div>

					<div className="text-center mt-12">
						<SimpleButton link="/expertise" aria_label="Explore Our Services" button_text="EXPLORE OUR SERVICES" />
					</div>
				</div>
				<div className="flex-1 pattern-bg-dots"></div>
			</div>
		</section>
	);
}








