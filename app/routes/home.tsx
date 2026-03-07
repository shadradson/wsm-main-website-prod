import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "We Summit Mountains | AI & Salesforce Consulting" },
		{
			name: "description",
			content:
				"Tailored software development to drive business success. Salesforce implementation, Cloud CRM, AI consulting, and system integrations in Dallas, Texas.",
		},
	];
}

export default function Home() {
	return (
		<>
			<HeroSection />
			<TransitionLayer1 />
			<ServicesOverview />
			<TransitionLayer2 />
			<WhyChooseUs />
			<StatsSection />
			<CTASection />
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
						src="/images/clouds.svg"
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
						</div>
					</div>
					<div className="blurb_outer textcenter">
						<p>WE ARE HERE TO HELP YOU</p>
						<p>SUMMIT YOUR SOFTWARE MOUNTAINS</p>
					</div>
					<div className="arrow-container">
						<div className="arrow floating">⛛</div>
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

function TransitionLayer1() {
	return (
		<div id="home-transition" className="transition1 bg-white">
			<div className="translayer midlay t1_lay5">
				<div className="splash_tag_box">
					<div className="splash_tag_text text-wsm-dark">
						CLIMBING
					</div>
				</div>
			</div>
		</div>
	);
}

function ServicesOverview() {
	const services = [
		{
			title: "AI Consulting",
			description:
				"Leverage the power of artificial intelligence to drive smarter decisions. From strategy to deployment, we make AI work for your business.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
				</svg>
			),
		},
		{
			title: "CTO Fractional Services",
			description:
				"Get executive-level technology leadership without the full-time cost. We provide strategic CTO guidance to align your tech vision with business goals.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
				</svg>
			),
		},
		{
			title: "Salesforce Implementation",
			description:
				"End-to-end Salesforce solutions tailored to your business processes. From Sales Cloud to Service Cloud, we build systems that scale.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
				</svg>
			),
		},
		{
			title: "System Integrations",
			description:
				"Seamlessly connect your business tools and platforms. We build robust integrations that eliminate data silos and automate workflows.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
				</svg>
			),
		},
	];

	return (
		<section id="home-services" className="bg-gradient-to-b from-wsm-dark to-wsm-cliff pattern-bg-dots">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
							OUR EXPERTISE
						</h2>
						<h3 className="text-1xl sm:text-2xl font-normal text-wsm-glacier mb-4">
							What We Are Good At
						</h3>
						<p className="text-lg text-gray-300">
							We combine technical expertise with a collaborative
							approach to deliver solutions that enable operational
							excellence and sustainable success.
						</p>
					</div>

					<div className="flex flex-wrap gap-5 md:gap-10">
						{services.map((service) => (
							<div
								key={service.title}
								className="w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.875rem)] flex flex-col group p-8 border border-white/10 hover:border-brand-sky/30 hover:shadow-xl hover:shadow-brand-sky/5 transition-all overflow-hidden cursor-pointer"
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
							</div>
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

function TransitionLayer2() {
	return (
		<div>
			<div className="transition1 bg-wsm-cliff">
				<div className="translayer midlay t1_lay5">
					<div className="splash_tag_box">
						<div className="splash_tag_text text-wsm-dark">
							KEEP
						</div>
					</div>
				</div>
			</div>

			<div className="transition1 bg-wsm-dark">
				<div className="translayer midlay t1_lay5">
					<div className="splash_tag_box">
						<div className="splash_tag_text text-white">
							MOVING
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

function WhyChooseUs() {
	const reasons = [
		{
			title: "WE ARE EXPERIENCED",
			description: "We have extensive experience driving immense growth for companies through technological transformation. We have worked with companies while they grow 10x. We understand the balance between long term vision and short term productivity. This allows us to tailor the iterative process to get you running fast, while keeping on track with the long term needs from your software. Our method involves rapid adoption to get you growing as quickly as possible, and we continue to iterate.",
			haslink: true,
			linkTxt: "OUR SUCCESS STORIES",
			linkUrl: "/case-studies",
		},
		{
			title: "WE ARE CERTIFIED",
			description: "Each of our developers is Salesforce Certified, with different specialties. Our 2 Solution Architects have been in the Salesforce ecosystem for over 14 years combined. We have seen many problems, and overcome them all to get here. Our entire team is United States based, and always will be. We know Salesforce, Agentic AI tools, and Cloud Solutions like the back of our hand.",
			haslink: true,
			linkTxt: "OUR CERTIFICATIONS",
			linkUrl: "/certifications",
		},
		{
			title: "WE ARE PARTNERS",
			description: "Every engagement is focused on delivering tangible business outcomes that you can measure and build upon.",
			haslink: true,
			linkTxt: "MEET YOUR TEAM",
			linkUrl: "/about-us",
		},
	];

	return (

		<section id="home-why-us" className="bg-gray-50">

			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16 items-center">
						<div className="lg:w-1/4">
							<p className="text-brand-blue font-medium text-sm uppercase tracking-widest mb-3">
								WHY WE ARE RIGHT FOR YOU
							</p>
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
								We Foster Growth By Facing Higher Mountains Each Day
							</h2>
							<p className="text-lg text-gray-600 leading-relaxed mb-8">
							</p>
						</div>

						<div className="lg:w-3/4 space-y-6 flex flex-col">
							{reasons.map((reason, i) => (
								<div key={reason.title} className="flex flex-col gap-4 p-6 bg-white shadow-sm">
									<div>
										<h3 className="font-bold text-gray-900 mb-1">
											{reason.title}
										</h3>
										<p className="text-gray-600 text-sm leading-relaxed">
											{reason.description}
										</p>
									</div>
									{reason.haslink && (
									<div>
										<Link to={reason.linkUrl} className="inline-flex items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-navy-800 transition-colors">{reason.linkTxt}</Link>
									</div>
									)}

								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function StatsSection() {
	const stats = [
		{ value: "2023", label: "Founded" },
		{ value: "100%", label: "Client Satisfaction" },
		{ value: "100+", label: "Projects Delivered" },
		{ value: "28", label: "Certifications" },
	];

	return (
		<section id="home-stats" className="bg-summit-dark">
			<div className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-wrap gap-8">
						{stats.map((stat) => (
							<div key={stat.label} className="w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] text-center">
								<p className="text-3xl sm:text-4xl font-bold text-brand-sky mb-2">
									{stat.value}
								</p>
								<p className="text-gray-400 text-sm uppercase tracking-wider">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section id="home-cta">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div id="home-cta-card" className="relative bg-gradient-to-br from-navy-800 to-summit-dark rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
						<div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl" />

						<div className="relative">
							<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
								Ready to Reach Your Summit?
							</h2>
							<p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
								Let's discuss how we can transform your technology
								challenges into competitive advantages.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link
									to="/contact"
									className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
								>
									Get In Touch
								</Link>
								<Link
									to="/case-studies"
									className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
								>
									View Case Studies
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
