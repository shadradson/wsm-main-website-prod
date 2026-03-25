import type { Route } from "./+types/fractional-cto-services";
import { Link } from "react-router";
import ParticleDots from "~/components/ParticleDots";
import ProcessSection from "~/components/ProcessSection"
import { MOUNTAIN_POINTS_PATH } from "~/lib/svgPaths";
import { buildMeta, SITE_URL } from "~/lib/seo";

const TITLE = "Fractional CTO Services | We Summit Mountains";
const DESCRIPTION =
	"Long-term strategic technology partnership — we discover your technical constraints, plan for growth, execute, and report on success across your entire business.";

export function meta({}: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/fractional-cto-services" });
}

export default function FractionalCtoServices() {
	return (
		<>
			<PageHero />
			<WhatWeDoSection />
			<ProcessSection
				tag="STRATEGY"
				title="HOW WE HELP YOU GROW YOUR COMPANY"
				subtitle="Our proven approach to delivering excellent results."
				dots="true"
				steps={[
					{
						step: "01",
						title: "Learn",
						description: "We dive deep into your business, from executive direction discussions, to boots on the ground strategy meetings. We find out everything about your business from start to finish. We find opportunities for growth and optimization.",
					},
					{
						step: "02",
						title: "Plan",
						description: "We start with your current state, and plan the ideal. We break that down into easily executed steps, and prioritize.",
					},
					{
						step: "03",
						title: "Climb",
						description: "Leaders put the right people in the right place. Our teams will work alongside your teams to implement the plan, while making sure that your teams are enabled on each step.",
					},
					{
						step: "04",
						title: "Report",
						description: "We define milestones and KPIs. Throughout the process we track and report on progress.",
					},
				]}
			/>
		</>
	);
}

function PageHero() {
	return (
		<section id="fcto-hero" className="bg-gradient-to-tl from-summit-dark to-wsm-dark min-h-[50vh] relative overflow-hidden">
			<div className="hidden md:block">
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
			</div>
			<div className="py-20 lg:py-28 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">
							Service
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							Fractional CTO{" "}
							<span className="text-brand-sky">Services</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							A long-term strategic partnership — we discover your technical constraints, identify opportunities
							for growth, plan the path forward, execute the plan, and report on results across your business.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function WhatWeDoSection() {
	return (
		<section id="fcto-what-we-do" className="bg-white">
			<div className="py-20 lg:py-28 pattern-bg-dots-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16 items-start">
						<div className="lg:w-1/2">
							<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">What We Do</p>
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
								Executive Technology Leadership, Without the Full-Time Cost
							</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								You don't need a full-time CTO to think strategically about technology. You need someone
								who has been there, understands your business context, and can set a direction your team
								can actually execute on.
							</p>
							<p className="text-gray-600 leading-relaxed mb-4">
								We become a long-term partner — embedded enough to understand your constraints and
								opportunities, objective enough to give you an honest read on what needs to change.
							</p>
							<p className="text-gray-600 leading-relaxed mb-8">
								From technical audits and roadmap planning to cross-department automation and vendor
								management, we handle the strategic layer so your team can focus on building.
							</p>
							<Link
								to="/contact"
								className="inline-flex items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-wsm-mountain transition-colors"
							>
								LET'S CLIMB TOGETHER
							</Link>
						</div>
						<div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
							{[
								{
									title: "Technical Discovery",
									desc: "We audit your current stack, constraints, and opportunities — giving you an honest picture of where you are.",
								},
								{
									title: "Strategic Roadmap",
									desc: "A phased plan that balances long-term vision with short-term wins your team can ship.",
								},
								{
									title: "KPIs & Reporting",
									desc: "We define what success looks like and report on it consistently so you always know where you stand.",
								},
								{
									title: "Business Process Optimization",
									desc: "Find the bottlenecks, eliminate the waste, and automate the repetitive work across your organization.",
								},
								{
									title: "Multi-Department Automation",
									desc: "Connect workflows across sales, operations, finance, and support so your teams move as one.",
								},
								{
									title: "Long-Term Partnership",
									desc: "Not a project — an ongoing relationship that evolves as your business grows and your needs change.",
								},
							].map((item) => (
								<div key={item.title} className="border border-gray-200 p-6 bg-white hover:border-brand-sky transition-colors">
									<h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
									<p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

