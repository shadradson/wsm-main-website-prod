import type { Route } from "./+types/mountain-rescue";
import { Link } from "react-router";
import { buildMeta, SITE_URL } from "~/lib/seo";

const TITLE = "Mountain Rescue | Failed Salesforce Recovery Program | We Summit Mountains";
const DESCRIPTION =
	"Struggling with a failed Salesforce implementation or inherited tech debt? Our Mountain Rescue team specializes in rapid assessment, stabilization & recovery.";

export function meta({}: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/mountain-rescue" });
}

const rescueServiceSchema = {
	"@context": "https://schema.org",
	"@type": "Service",
	"@id": `${SITE_URL}/mountain-rescue#service`,
	name: "Mountain Rescue — Salesforce Recovery Program",
	description: DESCRIPTION,
	url: `${SITE_URL}/mountain-rescue`,
	provider: { "@id": `${SITE_URL}/#organization` },
	serviceType: "Salesforce Implementation Recovery",
	areaServed: { "@type": "Country", name: "United States" },
	breadcrumb: {
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Mountain Rescue", item: `${SITE_URL}/mountain-rescue` },
		],
	},
};

const rescueFaqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "What is the Mountain Rescue program?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Mountain Rescue is We Summit Mountains' rapid-response program for organizations with troubled Salesforce implementations, broken integrations, or systems that aren't delivering results. We assess, stabilize, and rebuild.",
			},
		},
		{
			"@type": "Question",
			name: "What does the Mountain Rescue process look like?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "The process has four steps: (1) A free Discovery Call to understand your situation, (2) a System Audit diving into your Salesforce org, (3) a prioritized Recovery Plan with milestones and costs, and (4) Execution by our certified team.",
			},
		},
		{
			"@type": "Question",
			name: "What situations can Mountain Rescue help with?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Mountain Rescue can help when a previous partner left mid-implementation, your Salesforce org has grown unmanageable, users aren't adopting the platform, integrations are failing, data quality has degraded, or you inherited a system nobody understands.",
			},
		},
		{
			"@type": "Question",
			name: "Is the initial discovery call free?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Yes. The Mountain Rescue program starts with a free, no-obligation discovery call to understand your situation, pain points, and goals.",
			},
		},
	],
};

export default function MountainRescue() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rescueServiceSchema) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rescueFaqSchema) }} />
			<PageHero />
			<WhatIsRescue />
			<RescueProcess />
			<CommonScenarios />
		</>
	);
}

function PageHero() {
	return (
		<section id="rescue-hero" className="bg-summit-dark relative overflow-hidden">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-brand-coral font-medium text-sm uppercase tracking-widest mb-4">
							Mountain Rescue
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							Stuck on the{" "}
							<span className="text-brand-coral">Mountain?</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							Failed implementations, inherited technical debt, and
							broken systems don't have to be the end of the road.
							Our Mountain Rescue team specializes in getting
							organizations back on track.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function WhatIsRescue() {
	return (
		<section id="what-is-rescue" className="bg-white">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
							What Is Mountain Rescue?
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed">
							Mountain Rescue is our rapid-response program for
							organizations dealing with troubled Salesforce
							implementations, broken integrations, or systems that
							aren't delivering the results they promised. We assess,
							stabilize, and rebuild — so you can start climbing again.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								title: "Assess",
								description:
									"We perform a thorough audit of your current system — architecture, data quality, integrations, and user adoption — to identify root causes.",
								icon: (
									<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
									</svg>
								),
							},
							{
								title: "Stabilize",
								description:
									"We address critical issues first — fixing broken workflows, patching data integrity problems, and restoring confidence in the platform.",
								icon: (
									<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
									</svg>
								),
							},
							{
								title: "Rebuild",
								description:
									"With a stable foundation, we redesign and implement the right solution — one that actually fits your business processes and scales with you.",
								icon: (
									<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.96m-5.1 5.11h13.26" />
									</svg>
								),
							},
						].map((step) => (
							<div
								key={step.title}
								className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
							>
								<div className="w-16 h-16 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center mx-auto mb-6">
									{step.icon}
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									{step.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function RescueProcess() {
	const steps = [
		{
			number: "01",
			title: "Discovery Call",
			description:
				"A free, no-obligation conversation to understand your situation, pain points, and goals.",
		},
		{
			number: "02",
			title: "System Audit",
			description:
				"Our team dives into your Salesforce org to map the current state — what's working, what's broken, and what's missing.",
		},
		{
			number: "03",
			title: "Recovery Plan",
			description:
				"We deliver a prioritized roadmap with clear milestones, timelines, and costs — no surprises.",
		},
		{
			number: "04",
			title: "Execution",
			description:
				"Our certified team implements the recovery plan, keeping you informed and involved at every step.",
		},
	];

	return (
		<section id="rescue-process" className="bg-gray-50">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							How It Works
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							A clear, structured process to get you from crisis to confidence.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{steps.map((step) => (
							<div key={step.number} className="relative">
								<div className="text-6xl font-black text-brand-coral/15 mb-2">
									{step.number}
								</div>
								<h3 className="text-lg font-bold text-gray-900 mb-2">
									{step.title}
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function CommonScenarios() {
	const scenarios = [
		"A previous partner left mid-implementation",
		"Your Salesforce org has grown unmanageable",
		"Users aren't adopting the platform",
		"Integrations are failing or unreliable",
		"Data quality has degraded over time",
		"You inherited a system nobody understands",
	];

	return (
		<section id="common-scenarios" className="bg-white">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16 items-center">
						<div className="lg:w-1/2">
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
								Sound Familiar?
							</h2>
							<p className="text-lg text-gray-600 mb-8">
								If any of these situations describe where you are today,
								Mountain Rescue can help.
							</p>
							<ul className="space-y-4">
								{scenarios.map((scenario) => (
									<li
										key={scenario}
										className="flex items-start gap-3 text-gray-700"
									>
										<svg className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
										</svg>
										{scenario}
									</li>
								))}
							</ul>
						</div>
						<div className="lg:w-1/2">
							<div className="bg-gradient-to-br from-summit-dark to-navy-800 rounded-2xl p-10 text-center">
								<h3 className="text-2xl font-bold text-white mb-4">
									Don't Stay Stranded
								</h3>
								<p className="text-gray-300 mb-8">
									The longer a broken system stays broken, the more it
									costs. Let's start the recovery conversation today.
								</p>
								<Link
									to="/contact"
									aria-label="Contact us to request mountain rescue services"
									className="inline-flex items-center justify-center px-8 py-4 bg-brand-coral text-white font-semibold hover:bg-brand-coral/90 transition-all hover:shadow-lg"
								>
									Request Mountain Rescue
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
