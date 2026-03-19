import type { Route } from "./+types/system-integration-services";
import { Link } from "react-router";
import ParticleDots from "~/components/ParticleDots";
import { MOUNTAIN_POINTS_PATH } from "~/lib/svgPaths";
import { buildMeta, SITE_URL } from "~/lib/seo";

const TITLE = "System Integration Services | We Summit Mountains";
const DESCRIPTION =
	"Planning, implementing, and executing integrated solutions — connect your systems, eliminate data silos, and automate workflows across your tech stack.";

export function meta({}: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/system-integration-services" });
}

export default function SystemIntegrationServices() {
	return (
		<>
			<PageHero />
			<WhatWeDoSection />
			<CapabilitiesSection />
			<CtaSection />
		</>
	);
}

function PageHero() {
	return (
		<section id="sis-hero" className="bg-gradient-to-tl from-summit-dark to-wsm-cliff min-h-[50vh] relative overflow-hidden">
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
							System Integration{" "}
							<span className="text-brand-sky">Services</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							Planning, implementing, and executing integrated solutions — so your tools talk to each other
							and your data flows where it needs to go.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function WhatWeDoSection() {
	return (
		<section id="sis-what-we-do" className="bg-white">
			<div className="py-20 lg:py-28 pattern-bg-dots-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16 items-start">
						<div className="lg:w-1/2">
							<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">What We Do</p>
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
								Connected Systems, Zero Silos
							</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								Disconnected systems cost you time, money, and accuracy. We design and build integrations
								that connect your CRM, ERP, marketing tools, finance platforms, and everything in between —
								so data flows automatically, errors are eliminated, and your team spends time on work that
								matters.
							</p>
							<p className="text-gray-600 leading-relaxed mb-8">
								From initial architecture planning through live deployment and monitoring, we own the full
								integration lifecycle.
							</p>
							<Link
								to="/contact"
								className="inline-flex items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-wsm-mountain transition-colors"
							>
								OVERCOME INTEGRATIONS
							</Link>
						</div>
						<div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
							{[
								{
									title: "Planning & Architecture",
									desc: "We map your systems, identify integration points, and design a scalable solution before writing a line of code.",
								},
								{
									title: "API Development",
									desc: "Custom REST and event-driven APIs built to your spec — documented, versioned, and production-ready.",
								},
								{
									title: "Real-Time Sync",
									desc: "Keep data consistent across systems in real time without manual exports or batch jobs.",
								},
								{
									title: "Legacy Modernization",
									desc: "Bridge old systems into your modern stack without ripping everything out.",
								},
								{
									title: "Third-Party Connections",
									desc: "Pre-built and custom connectors for the apps your team already uses.",
								},
								{
									title: "Testing & Monitoring",
									desc: "Thorough integration testing and ongoing monitoring so you know before your users do when something breaks.",
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

function CapabilitiesSection() {
	const capabilities = [
		"REST APIs",
		"MuleSoft",
		"n8n",
		"Salesforce Integration",
		"ERP Connectors",
		"Middleware / iPaaS",
		"Webhooks & Events",
		"GraphQL",
		"Data Pipelines",
		"Zapier / Make",
		"Legacy System Bridges",
		"Integration Monitoring",
	];

	return (
		<section id="sis-capabilities" className="bg-gray-50">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Technologies &amp; Platforms</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
						We work with the tools you already have — and the ones you want to add.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						{capabilities.map((cap) => (
							<span
								key={cap}
								className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
							>
								{cap}
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
		<section id="sis-cta" className="bg-gradient-to-br from-wsm-dark to-wsm-mountain">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						Ready to Connect the Dots?
					</h2>
					<p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
						Tell us what you're working with and we'll show you what a connected stack looks like.
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
