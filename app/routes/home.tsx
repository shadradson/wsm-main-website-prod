import type { Route } from "./+types/home";
import { Link, useLoaderData } from "react-router";
import StatsSection from "~/components/StatSection";
import SplashSection from "~/components/SplashSection";
import Transition from "~/components/Transition"
import SectionHeaderText from "~/components/SectionHeaderText";
import ArticleCardSection from "~/components/ArticleCardSection";
import CsatCardSection from "~/components/CsatCardSection";
import SimpleButton from "~/components/SimpleButton";
import type { Article, CsatSurvey } from "~/lib/types";

import { buildMeta, SITE_URL, SITE_LOGO, OG_IMAGE } from "~/lib/seo";

const TITLE = "We Summit Mountains | Salesforce & AI Consulting | Dallas, TX";
const DESCRIPTION =
	"Salesforce implementation, AI consulting & CTO services in Dallas, TX. We Summit Mountains turns complex technology challenges into your competitive advantage.";

export function meta({ }: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/" });
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;

	const [{ results: testimonialResults }, { results: csatResults }] = await Promise.all([
		db.prepare(
			`SELECT sf_id, name, subtitle, short_description,
				subcategory, vertical_product, splash_image_url,
				author_first_name, author_last_name, author_title
			FROM articles
			WHERE article_category = 'Testimonial'
				AND admin_approval = 1
				AND publish_status = 'Published'
			ORDER BY article_order ASC
			LIMIT 6`
		).all<Article>(),
		db.prepare(
			`SELECT cs.sf_id, cs.name, cs.account_name, cs.first_name, cs.last_name, cs.title,
				cs.star_rating, cs.refer_likelihood, cs.website_testimonial_blurb,
				cs.permission_for_website, cs.csat_date,
				ar.parent_or_primary_id AS testimonial_article_id
			FROM csat_surveys cs
			LEFT JOIN article_references ar
				ON ar.csat_survey_id = cs.sf_id
				AND ar.parent_relationship_type = 'Testimonial'
			WHERE cs.permission_for_website = 1
			ORDER BY cs.csat_date DESC
			LIMIT 16`
		).all<CsatSurvey>(),
	]);

	return {
		testimonials: testimonialResults ?? [],
		csatSurveys: csatResults ?? [],
	};
}

const localBusinessSchema = {
	"@context": "https://schema.org",
	"@type": ["LocalBusiness", "ProfessionalService"],
	"@id": `${SITE_URL}/#localbusiness`,
	name: "We Summit Mountains",
	description: DESCRIPTION,
	url: SITE_URL,
	logo: SITE_LOGO,
	image: OG_IMAGE,
	foundingDate: "2023",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Dallas",
		addressRegion: "TX",
		addressCountry: "US",
	},
	areaServed: { "@type": "Country", name: "United States" },
	sameAs: ["https://www.linkedin.com/company/we-summit-mountains"],
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Consulting Services",
		itemListElement: [
			{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Salesforce Implementation" } },
			{ "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Consulting" } },
			{ "@type": "Offer", itemOffered: { "@type": "Service", name: "CTO Fractional Services" } },
			{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud CRM Solutions" } },
			{ "@type": "Offer", itemOffered: { "@type": "Service", name: "System Integrations" } },
		],
	},
};

const homeFaqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			"@type": "Question",
			name: "What services does We Summit Mountains offer?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "We Summit Mountains offers Salesforce implementation, AI consulting, CTO fractional services, cloud CRM solutions, system integrations, and custom software development for businesses across the United States.",
			},
		},
		{
			"@type": "Question",
			name: "Where is We Summit Mountains located?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "We Summit Mountains is based in Dallas, Texas and serves clients across the United States.",
			},
		},
		{
			"@type": "Question",
			name: "How experienced is the We Summit Mountains team?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "Our team includes certified Salesforce professionals with 14+ years of combined experience in the Salesforce ecosystem. Every developer is Salesforce Certified, and our Solution Architects have deep expertise in enterprise implementations.",
			},
		},
		{
			"@type": "Question",
			name: "When was We Summit Mountains founded?",
			acceptedAnswer: {
				"@type": "Answer",
				text: "We Summit Mountains was founded in 2023. Our team has been working in the Salesforce ecosystem for over 14 combined years and serves companies across the United States.",
			},
		},
	],
};

export default function Home() {
	const { testimonials, csatSurveys } = useLoaderData<typeof loader>();

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
			<HeroSection />

			<Transition
				type="text"
				text="CLIMBING"
				textpos="top"
				textcolor="#111"
				bgbottom="#fff"
			/>

			<StatsSection
				tag="STATS"
				theme="dark2"
				dots="true"
				stats={[
					{ value: "2023", label: "Founded" },
					{ value: "5 / 5", label: "CSAT Score" },
					{ value: "100+", label: "Projects Delivered" },
					{ value: "30+", label: "Certifications" },
					{ value: "USA", label: "Located" },
				]}
			/>
			<ServicesOverview />
			

			<Transition
				type="text"
				text="KEEP"
				textpos="bot"
				textcolor="#BEE2EE"
				bgtop="#036588"
			/>

			<Transition
				type="text"
				text="MOVING"
				textpos="bot"
				textcolor="black"
				bgtop="#BEE2EE"
			/>
			<WhyWorkWithUs />
			{/*<SplashSection
				title="WHY YOU SHOULD CHOOSE US"
				//subtitle=""
				theme="light" // "light, dark, blue"
				dots="true"
				cards={[
					{
						title1: "WE ARE",
						title2: "EXPERIENCED",
						haslink: true,
						buttontext: "SEE OUR SUCCESS STORIES",
						linkUrl: "/success-stories",
						tag: "01 - EXP",
						infotype: "text",
						infotext: "We have extensive experience driving immense growth for companies through technological transformation. We have worked with companies while they grow 10x. We understand the balance between long term vision and short term productivity. This allows us to tailor the iterative process to get you running fast, while keeping on track with the long term needs from your software. Our method involves rapid adoption to get you growing as quickly as possible, and we continue to iterate."
					},
					{
						title1: "WE ARE",
						title2: "CERTIFIED",
						haslink: true,
						buttontext: "VIEW OUR CERTIFICATIONS",
						linkUrl: "/about-us#team-certifications",
						tag: "02 - CERT",
						infotype: "text",
						infotext: "Each of our developers is Salesforce Certified, with different specialties. Our 2 Solution Architects have been in the Salesforce ecosystem for over 14 years combined. We have seen many problems, and overcome them all to get here. Our entire team is United States based, and always will be. We know Salesforce, Agentic AI tools, and Cloud Solutions like the back of our hand."
					},
					{
						title1: "WE ARE",
						title2: "YOUR PARTNERS",
						haslink: true,
						buttontext: "MEET YOUR TEAM",
						linkUrl: "/about-us",
						tag: "03 - PART",
						infotype: "text",
						infotext: "Every engagement is focused on delivering tangible business outcomes that you can measure and build upon."
					},
				]}
			/>*/}

			{/*testimonials.length > 0 && (
				<ArticleCardSection
					id="home-testimonials"
					title1="CLIENT"
					title2="TESTIMONIALS"
					subtitle="Hear what our clients have to say about working with us."
					articles={testimonials}
					theme="dark"
					dots
					trail="home"
				/>
			)*/}

			<CsatCardSection
				surveys={csatSurveys}
				title1="WHAT OUR"
				title2="CLIENTS SAY"
				subtitle="Real feedback from the people at the tops of their mountains."
				id="home-csat"
				dots={true}
				multiLineTitles={false}
				theme="dark"
			/>

		</>
	);
}

function HeroSection() {
	return (
		<div id="home-hero" className="splash1">
			{/* Layer 1: Sky gradient */}
			<div className="paralayer botlay lay1">
				<div className="splash1_gradient_sky" />
			</div>

			{/* Layer 2: Clouds */}
			<div className="paralayer botlay lay2">
				<div className="splash1_clouds">
					<img
						src="/images/clouds_blurred.png"
						alt=""
						className="clouds_image"
					/>
				</div>
			</div>

			{/* Layer 3: Logo + tagline + arrow */}
			<div className="paralayer midlay lay3">
				<div className="logo_outer_box">
					{/*<div className="splash1_logo">
						<div className="header_logo_main">

						</div>
					</div>*/}
					<div className="px-8 py-4">
						<h1 className="text-[#ddddee] text-3xl text-center md:text-4xl lg:text-6xl font-semibold max-w-4xl mx-auto">
							Your AI and Software growth partners.
						</h1>
					</div>
					<div className="blurb_outer textcenter max-w-2xl mx-auto">
						<h2 className="">We build the AI atomated systems that generate sales, close deals, and help you scale.</h2>
					</div>
					<div id="home-call-to-action" className="flex flex-row gap-0 z-1000">
						<SimpleButton button_text="WHAT WE DO" link="/expertise" theme="dark" type="rounded"/>
						<SimpleButton button_text="LET'S TALK" link="https://calendar.app.google/5L58xusGKv5YfVeQ9" type="rounded" theme="light"/>
					</div>
				</div>
			</div>

			{/* Layer 4: Mountains */}
			<div className="paralayer botlay lay4 pointer-events-none">
				<div className="splash1_mountains">
					{/*<div className="absolute top-[45vh] left-0 w-full">
						<div className="arrow-container w-full">
							<div className="arrow floating fill-wsm-glacier flex justify-center z-100 w-[100vw]">
								<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="68.7114mm" height="59.5059mm" version="1.1" className="max-h-[5rem]"
									viewBox="0 0 5047 4371"
									xmlns:xlink="http://www.w3.org/1999/xlink">
									<defs>
										<linearGradient x1="50%" y1="92.034%" x2="50%" y2="7.2%" id="a">
											<stop stop-opacity="1" offset="0%" stop-color="#ddddee" />
											<stop stop-opacity="1" offset="100%" stop-color="#ddeeee" />
										</linearGradient>
									</defs>
									<g id="Layer_x0020_1">
										<path fill="url(#a)" d="M0 0l5047 0 -2523 4371 -2524 -4371zm2524 2513l912 -1580 -1825 0 913 1580z" />
									</g>
								</svg>

							</div>
						</div>
					</div>*/}
					<img
						src="/images/Mountains Rendered Cutout.png"
						alt=""
						className="mountains_img"
					/>
				</div>
			</div>

			{/* Layer 5: Tag text */}
			<div className="paralayer midlay lay5 pointer-events-none">
				<div className="splash_tag_box">
					<div className="splash_tag_text text-white">GET</div>
				</div>
			</div>
		</div>
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



function WhyWorkWithUs() {
	const reasons = [
		{
			title: "We Are Experienced",
			description: "We have been automating systems, integrating AI, and delivering innovative solutions over 100 projects since 2020",
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
			title: "We Are Certified",
			description: "30 team certifications prove our capabilities and deep knowledge of systems. We strive for excellence, and it shows.",
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
			title: "We Are Your Partners",
			description: "We are here to build long-term business relations where we contribute to your growth and success.",
			href: "/mountain-guide-services",
			alt_text: "Learn about our Salesforce implementation successes",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg>
			),
			button_text: "IMPLEMENT SALESFORCE",
		},
	];

	return (
		<section id="home-services" className="bg-gradient-to-b from-black to-wsm-dark">
			<div className="py-20 lg:py-28 flex flex-row">
				<div className="flex-1 pattern-bg-dots"></div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeaderText
						title1="WHY YOU WANT TO"
						title2="WORK WITH US"
						subtitle="We combine technical expertise with a collaborative approach to deliver solutions that enable operational excellence and sustainable success."
						theme="dark"
						horzAlign="left"
					/>

					<div className="flex flex-wrap justify-between gap-2 md:gap-4">
						{reasons.map((reason) => (
							<div
								key={reason.title}
								aria-label={`Learn about ${reason.title}`}
								className="w-full min-w-[200px] flex-1 sm:w-[calc(50%-0.625rem)] md:w-[calc(50%-1.25rem)] rounded-xl lg:w-[calc(25%-1.875rem)] flex flex-col justify-between group p-2 md:p-4 border-4 border-white/10 hover:border-brand-sky/30 hover:shadow-xl hover:shadow-brand-sky/5 transition-all overflow-hidden"
							>
								{/*<div className="w-14 h-14 bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
									{reason.icon}
								</div>*/}
								<h3 className="text-xl font-bold text-white mb-3">
									{reason.title}
								</h3>
								<p className="text-gray-300 leading-relaxed">
									{reason.description}
								</p>

							</div>
						))}
					</div>
				</div>
				<div className="flex-1 pattern-bg-dots"></div>
			</div>
		</section>
	);
}

