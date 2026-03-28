import type { Route } from "./+types/home";
import { Link, useLoaderData } from "react-router";
import StatsSection from "~/components/StatSection";
import SplashSection from "~/components/SplashSection";
import Transition from "~/components/Transition"
import SectionHeaderText from "~/components/SectionHeaderText";
import ArticleCardSection from "~/components/ArticleCardSection";
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
			`SELECT sf_id, name, account_name, first_name, last_name, title,
				star_rating, refer_likelihood, website_testimonial_blurb,
				permission_for_website, csat_date
			FROM csat_surveys
			WHERE permission_for_website = 1
				AND website_testimonial_blurb IS NOT NULL
				AND website_testimonial_blurb != ''
			ORDER BY csat_date DESC
			LIMIT 8`
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
			<ServicesOverview />

			<Transition
				type="text"
				text="KEEP"
				textpos="bot"
				textcolor="#101622"
				bgtop="#036588"
			/>

			<Transition
				type="text"
				text="MOVING"
				textpos="bot"
				textcolor="#fff"
				bgtop="#101622"
			/>

			<SplashSection
				//title=""
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
			/>

			{testimonials.length > 0 && (
				<ArticleCardSection
					id="home-testimonials"
					title1="Client Testimonials"
					subtitle="Hear what our clients have to say about working with us."
					articles={testimonials}
					theme="dark"
					dots
					trail="home"
				/>
			)}

			<CsatSection surveys={csatSurveys} />

			<StatsSection
				tag="STATS"
				theme="light"
				dots="true"
				stats={[
					{ value: "2023", label: "Founded" },
					{ value: "5 / 5", label: "CSAT Score" },
					{ value: "100+", label: "Projects Delivered" },
					{ value: "30+", label: "Certifications" },
					{ value: "USA", label: "Located" },
				]}
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
					<div className="splash1_logo">
						<div className="header_logo_main">
							<img
								src="/images/WSM_LOGO_V2_Norm_TXT_Wht.svg"
								alt="We Summit Mountains"
								className="logo_img"
							/>
							<img
								src="/images/WSM Logo V2 White Vertical.svg"
								alt="We Summit Mountains"
								className="logo_img_vert"
							/>
						</div>
					</div>
					<div className="blurb_outer textcenter">
						<p>WE ARE HERE TO HELP YOU</p>
						<p>SUMMIT YOUR SOFTWARE MOUNTAINS</p>
					</div>
					<div className="arrow-container">
						<div className="arrow floating fill-wsm-glacier flex justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="68.7114mm" height="59.5059mm" version="1.1" className="max-h-[5rem]"
								viewBox="0 0 5047 4371"
								xmlns:xlink="http://www.w3.org/1999/xlink">
								<defs>
									<linearGradient x1="50%" y1="92.034%" x2="50%" y2="7.2%" id="a">
										<stop stop-opacity="0.8" offset="0%" stop-color="white" />
										<stop stop-opacity="0.4" offset="100%" stop-color="white" />
									</linearGradient>
								</defs>
								<g id="Layer_x0020_1">
									<path fill="url(#a)" d="M0 0l5047 0 -2523 4371 -2524 -4371zm2524 2513l912 -1580 -1825 0 913 1580z" />
								</g>
							</svg>

						</div>
					</div>
				</div>
			</div>

			{/* Layer 4: Mountains */}
			<div className="paralayer botlay lay4">
				<div className="splash1_mountains">
					<img
						src="/images/Mountains Rendered Cutout.png"
						alt=""
						className="mountains_img"
					/>
				</div>
			</div>

			{/* Layer 5: Tag text */}
			<div className="paralayer midlay lay5">
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
			description: "Leverage the power of artificial intelligence to drive smarter decisions. From strategy to deployment, we make AI work for your business.",
			href: "/ai-consulting",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
				</svg>
			),
		},
		{
			title: "CTO Fractional Services",
			description: "Get executive-level technology leadership without the full-time cost. We provide strategic CTO guidance to align your tech vision with business goals.",
			href: "/fractional-cto-services",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
				</svg>
			),
		},
		{
			title: "Salesforce Implementation",
			description: "End-to-end Salesforce solutions tailored to your business processes. From Sales Cloud to Service Cloud, we build systems that scale.",
			href: "/mountain-guide-services",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg>
			),
		},
		{
			title: "System Integrations",
			description: "Seamlessly connect your business tools and platforms. We build robust integrations that eliminate data silos and automate workflows.",
			href: "/system-integration-services",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
				</svg>
			),
		},
	];

	return (
		<section id="home-services" className="bg-gradient-to-b from-[#111] to-wsm-cliff pattern-bg-dots">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeaderText
						title1="OUR EXPERTISE"
						title2="WHAT WE DO"
						subtitle="We combine technical expertise with a collaborative approach to deliver solutions that enable operational excellence and sustainable success."
						theme="dark"
						horzAlign="center"
					/>

					<div className="flex flex-wrap gap-5 md:gap-10">
						{services.map((service) => (
							<Link
								key={service.title}
								to={service.href}
								className="w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.875rem)] flex flex-col group p-8 border border-white/10 hover:border-brand-sky/30 hover:shadow-xl hover:shadow-brand-sky/5 transition-all overflow-hidden"
							>
								<div className="w-14 h-14 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
									{service.icon}
								</div>
								<h3 className="text-xl font-bold text-white mb-3">
									{service.title}
								</h3>
								<p className="text-gray-300 leading-relaxed">
									{service.description}
								</p>
							</Link>
						))}
					</div>

					<div className="text-center mt-12">
						<Link
							to="/expertise"
							className="inline-flex items-center text-brand-sky font-semibold hover:text-white transition-colors"
						>
							EXPLORE OUR CAPABILITIES
							<svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

function CsatSection({ surveys }: { surveys: CsatSurvey[] }) {
	if (surveys.length === 0) return null;

	return (
		<section id="home-csat" className="bg-wsm-dark">
			<div className="py-20 lg:py-28 pattern-bg-dots">
				<div className="max-w-7xl mx-auto p-4 border-2 border-solid border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff18,_#ffffff18_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed">
					<div className="bg-wsm-dark p-4 border-2 border-solid border-[#ffffff22]">
						<SectionHeaderText title1="CLIENT REVIEWS" subtitle="Real feedback from the people at the tops of their mountains." />
					</div>
					<div className="flex flex-wrap justify-center bg-[#ffffff44]">
						{surveys.map((survey) => (
							<div
								key={survey.sf_id}
								className="w-full sm:w-[calc(50%-0.5rem)] min-w-[340px] grow group p-1"
							>
								<div className="bg-wsm-dark border-2 border-solid border-gray-600 flex flex-col h-full relative z-10 p-6">
									{survey.star_rating != null && (
										<div className="flex gap-1 mb-3">
											{Array.from({ length: 5 }).map((_, i) => (
												<svg
													key={i}
													className={`w-5 h-5 ${i < survey.star_rating! ? "text-yellow-400" : "text-gray-600"}`}
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
										</div>
									)}
									{survey.website_testimonial_blurb && (
										<p className="text-gray-300 text-sm leading-relaxed italic mb-4 max-h-[100px] overflow-y-clip">
											"{survey.website_testimonial_blurb}"
										</p>
									)}
									<div className="mt-auto pt-3 border-t border-gray-800">
										<p className="text-white font-bold text-sm">
											{survey.first_name} {survey.last_name}
										</p>
										{survey.title && <p className="text-gray-500 text-xs">{survey.title}</p>}
										{survey.account_name && <p className="text-gray-500 text-xs">{survey.account_name}</p>}
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
