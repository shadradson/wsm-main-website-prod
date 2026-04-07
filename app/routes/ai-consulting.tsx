import type { Route } from "./+types/ai-consulting";
import { Link, useLoaderData } from "react-router";
import FluidParticles from "~/components/FluidParticles";
import { buildMeta } from "~/lib/seo";
import SectionHeaderText from "~/components/SectionHeaderText";
import ArticleCardSection from "~/components/ArticleCardSection";
import type { ArticleRef } from "~/lib/types";
import { articleRefToCardData } from "~/lib/types";

const TITLE = "AI Consulting & Implementation | We Summit Mountains";
const DESCRIPTION =
	"On-premise and cloud-based AI implementation — agentic workflows, data analysis, chatbots with tools, document processing, and more.";

const AI_ARTICLE_ID = "a05TP00000APBgsYAH";

export function meta({ }: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/ai-consulting" });
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;

	const { results } = await db.prepare(`
		SELECT ar.name AS ref_name, ar.ref_order,
			a.sf_id AS child_sf_id, a.name AS child_name,
			a.short_description AS child_short_description,
			a.splash_image_url AS child_splash_image_url
		FROM article_references ar
		JOIN articles a ON a.sf_id = ar.child_article_id
		WHERE ar.parent_or_primary_id = ?
			AND a.admin_approval = 1 AND a.publish_status = 'Published'
		ORDER BY ar.ref_order ASC
	`).bind(AI_ARTICLE_ID).all<ArticleRef>();

	return { articleRefs: results ?? [] };
}

export default function AiConsulting() {
	const { articleRefs } = useLoaderData<typeof loader>();

	return (
		<>
			<PageHero />
			<WhatWeDoSection articleRefs={articleRefs.slice(0, 6)} />
			<CapabilitiesSection articleRefs={articleRefs} />
		</>
	);
}

function PageHero() {
	return (
		<section id="ai-hero" className="bg-gradient-to-tl from-summit-dark to-wsm-cliff min-h-[50vh] relative overflow-hidden">
			<div className="hidden md:block">
				
			</div>
			< FluidParticles />
			<div className="py-20 lg:py-28 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">
							Service
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							AI Consulting{" "}
							<span className="text-brand-sky">&amp; Implementation</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							On-premise and cloud-based AI that actually works for your business — agentic workflows,
							data analysis, chatbots with tools, document processing, and more.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function WhatWeDoSection({ articleRefs }: { articleRefs: ArticleRef[] }) {
	return (
		<section id="ai-what-we-do" className="bg-white">
			<div className="py-20 lg:py-28 pattern-bg-dots-light">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16 items-start">
						<div className="lg:w-1/2">
							<SectionHeaderText title1="AI THAT WORKS" title2="IN THE REAL WORLD" subtitle="
								We build AI solutions tailored to your data, your processes, and your goals — whether that
								means running models on-premise, or deploying cloud-based agents that integrate
								with your existing stack. We make AI work for you." theme="light" vertAlign="top" horzAlign="left" noPad="true" titlemultiline="true"/>
							<Link
								to="/contact"
								className="inline-flex items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-wsm-mountain transition-colors"
							>
								LET'S SUMMIT AI
							</Link>
						</div>
						<div className="lg:w-1/2">
							<ArticleCardSection
								articles={articleRefs.map(articleRefToCardData)}
								theme="light"
								trail="ai-consulting"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function CapabilitiesSection({ articleRefs }: { articleRefs: ArticleRef[] }) {
	return (
		<section id="ai-capabilities" className="bg-gradient-to-tl from-summit-dark to-wsm-cliff ">
			<div className="h-30 pattern-bg-dots-nofix"></div>
				<div className="">
				<div className="border-y-solid border-y-1 border-[#ccc]">
					<div className="border-x-solid border-x-1 border-[#ccc] max-w-7xl mx-auto text-center outline-1 outline-solid outline-[#ccc] outline-offset-30 relative">
						<SectionHeaderText title1="AI CAPABILITIES" title2="THAT MATTER" subtitle="We work across the full AI stack from model selection to production deployment. Custom tailored to your needs.." theme="blue" vertAlign="top" horzAlign="center" noPad="false" titlemultiline="true"/>
						<div className="wsm-tag absolute top-4 -left-19 text-wsm-mountain px-3 py-1" style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "1rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>
							AI TOOLS
						</div>

						<div className="flex flex-wrap justify-center">
							{articleRefs.map((ref) => (
								<Link
									key={ref.child_sf_id}
									to={`/article/${ref.child_sf_id}`}
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
									<div className="bg-[#00000077] h-[100%] w-[100%] flex items-center justify-center p-4">
										<span className="text-md font-[700] text-gray-200">
											{ref.child_name}
										</span>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="h-30 pattern-bg-dots"></div>
		</section>
	);
}


