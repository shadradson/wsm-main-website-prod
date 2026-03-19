import type { Route } from "./+types/mountain-guide-services";
import { Link } from "react-router";
import ParticleDots from "~/components/ParticleDots";
import { MOUNTAIN_POINTS_PATH } from "~/lib/svgPaths";
import { buildMeta, SITE_URL } from "~/lib/seo";

const TITLE = "Mountain Guide Services | Fractional Salesforce | We Summit Mountains";
const DESCRIPTION =
	"Monthly fractional Salesforce implementation — expert Salesforce consulting on a flexible monthly engagement designed to keep your org growing.";

export function meta({}: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/mountain-guide-services" });
}

export default function MountainGuideServices() {
	return (
		<>
			<PageHero />
			<WhatWeDoSection />
			<WhatsIncludedSection />
			<CtaSection />
		</>
	);
}

function PageHero() {
	return (
		<section id="mgs-hero" className="bg-gradient-to-tl from-summit-dark to-wsm-mountain min-h-[50vh] relative overflow-hidden">
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
							Mountain Guide{" "}
							<span className="text-brand-sky">Services</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							Monthly fractional Salesforce implementation — an experienced guide in your corner every month,
							moving your org forward without the cost of a full-time hire.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function WhatWeDoSection() {
	return (
		<section id="mgs-what-we-do" className="bg-white">
			<div className="py-20 lg:py-28 pattern-bg-dots-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16 items-start">
						<div className="lg:w-1/2">
							<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">What We Do</p>
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
								Expert Salesforce Guidance, Every Month
							</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								Not every company needs a full Salesforce implementation team. But every Salesforce org
								needs consistent, expert attention to keep growing and stay healthy. Mountain Guide Services
								gives you a fractional Salesforce consultant who acts as an extension of your team —
								planning, building, and iterating every month.
							</p>
							<p className="text-gray-600 leading-relaxed mb-8">
								We prioritize based on your roadmap, handle the technical work, and keep you moving
								forward — no project scope games, no long-term lock-in.
							</p>
							<Link
								to="/contact"
								className="inline-flex items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-wsm-mountain transition-colors"
							>
								FIND YOUR GUIDE
							</Link>
						</div>
						<div className="lg:w-1/2 flex flex-col gap-6">
							{[
								{
									num: "01",
									title: "Monthly Engagement",
									desc: "Consistent monthly hours dedicated to your org — not a one-time project that disappears after go-live.",
								},
								{
									num: "02",
									title: "Flexible Scope",
									desc: "Work prioritized by you each month. Adjust focus as your business needs change.",
								},
								{
									num: "03",
									title: "Certified Execution",
									desc: "All work done by certified Salesforce consultants — no outsourcing, no handoffs.",
								},
								{
									num: "04",
									title: "Continuous Growth",
									desc: "We don't just build and walk away. We iterate, optimize, and evolve your org over time.",
								},
							].map((item) => (
								<div key={item.num} className="flex gap-6 items-start border-l-4 border-brand-sky pl-6">
									<div className="text-brand-sky font-bold text-lg shrink-0">{item.num}</div>
									<div>
										<h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
										<p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function WhatsIncludedSection() {
	const items = [
		"Sales Cloud",
		"Service Cloud",
		"Experience Cloud",
		"Flow Automation",
		"Apex Development",
		"Agentforce Integration",
		"Reports & Dashboards",
		"User Training",
		"Data Cleanup",
		"Process Optimization",
		"User Adoption Support",
		"Roadmap Planning",
	];

	return (
		<section id="mgs-included" className="bg-gray-50">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
						Work across the full Salesforce platform — whatever your org needs most.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						{items.map((item) => (
							<span
								key={item}
								className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
							>
								{item}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function CtaSection() {
	return (
		<section id="mgs-cta" className="bg-gradient-to-br from-wsm-dark to-wsm-mountain">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						Ready for a Guide?
					</h2>
					<p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
						Let's talk about your Salesforce org and build a monthly plan that fits your team and budget.
					</p>
					<Link
						to="/contact"
						className="inline-flex items-center px-8 py-4 bg-brand-sky text-wsm-dark font-bold text-lg hover:bg-white transition-colors"
					>
						START THE CONVERSATION
					</Link>
				</div>
			</div>
		</section>
	);
}
