import type { Route } from "./+types/expertise";
import Hexagons from "~/components/Hexagons";
import { MOUNTAIN_POINTS_PATH } from "~/lib/svgPaths";
import { buildMeta, SITE_URL } from "~/lib/seo";
import { div } from "three/tsl";
import Transition from "~/components/Transition";
import SplashSection from "~/components/SplashSection";
import ProcessSection from "~/components/ProcessSection";

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
			<SplashSection
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
			/>
			<Transition
							type="text"
							text="PROCESS"
							textpos="bot"
							textcolor="#112C3C"
							bgtop="#F9FAFB"
						/>

			<ProcessSection
				tag="PROCESS"
				title="OUR PROCESS"
				subtitle="Our proven approach to delivering excellent results."
				footerTitle="DON'T WASTE TIME"
				footerText="."
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







