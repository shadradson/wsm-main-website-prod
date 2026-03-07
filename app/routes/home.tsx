import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
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
			<ServicesOverview />
			<WhyChooseUs />
			<StatsSection />
			<CTASection />
		</>
	);
}

function HeroSection() {
	return (
		<section className="relative min-h-screen overflow-hidden">
			{/* Layer 1: Sky gradient background */}
			<div className="absolute inset-0 bg-gradient-to-b from-wsm-dark via-wsm-cliff to-teal-green" />

			{/* Layer 2: Clouds */}
			<div className="absolute top-[10%] left-0 right-0 pointer-events-none">
				<img
					src="/images/clouds.svg"
					alt=""
					className="w-full opacity-60 splsh1_clouds_img"
				/>
			</div>

			{/* Layer 3: Logo + tagline + arrow (centered content) */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pb-48">
				<img
					src="/images/WSM_LOGO_V2_Norm_TXT_Wht.svg"
					alt="We Summit Mountains"
					className="w-64 sm:w-80 lg:w-96 mb-10"
				/>
				<div className="space-y-1 mb-12">
					<p className="text-white text-lg sm:text-2xl lg:text-3xl font-light tracking-widest uppercase">
						We Are Here To Help You
					</p>
					<p className="text-white text-lg sm:text-2xl lg:text-3xl font-light tracking-widest uppercase">
						Summit Your Software Mountains
					</p>
				</div>
				<div className="animate-bounce text-wsm-glacier/70">
					<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</div>
			</div>

			{/* Layer 4: Mountains at bottom */}
			<div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
				<img
					src="/images/Mountains Rendered Cutout.png"
					alt=""
					className="w-full object-cover object-top"
				/>
			</div>
		</section>
	);
}

function ServicesOverview() {
	const services = [
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
			title: "Cloud CRM Solutions",
			description:
				"Optimize your customer relationships with cloud-native CRM strategies. We design systems that connect your teams and delight your customers.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
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
	];

	return (
		<section className="py-20 lg:py-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<p className="text-brand-blue font-medium text-sm uppercase tracking-widest mb-3">
						What We Do
					</p>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Our Expertise
					</h2>
					<p className="text-lg text-gray-600">
						We combine technical expertise with a collaborative
						approach to deliver solutions that enable operational
						excellence and sustainable success.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{services.map((service) => (
						<div
							key={service.title}
							className="group p-8 rounded-2xl border border-gray-200 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all"
						>
							<div className="w-14 h-14 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
								{service.icon}
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">
								{service.title}
							</h3>
							<p className="text-gray-600 leading-relaxed">
								{service.description}
							</p>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<Link
						to="/expertise"
						className="inline-flex items-center text-brand-blue font-semibold hover:text-brand-blue-dark transition-colors"
					>
						Explore all services
						<svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</Link>
				</div>
			</div>
		</section>
	);
}

function WhyChooseUs() {
	const reasons = [
		{
			title: "Collaborative Partnership",
			description: "We don't just deliver software — we partner with you to understand your unique challenges and build solutions together.",
		},
		{
			title: "Certified Expertise",
			description: "Our team holds multiple Salesforce certifications including Sales Cloud Consultant and Platform Developer credentials.",
		},
		{
			title: "Measurable Results",
			description: "Every engagement is focused on delivering tangible business outcomes that you can measure and build upon.",
		},
	];

	return (
		<section className="py-20 lg:py-28 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div>
						<p className="text-brand-blue font-medium text-sm uppercase tracking-widest mb-3">
							Why We Summit Mountains
						</p>
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
							We Solve Problems, Overcome Challenges, and Foster
							Growth
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed mb-8">
							Founded in 2023 in Dallas, Texas, We Summit
							Mountains was built on a simple belief: every
							organization deserves technology that works as hard
							as they do. We bring strategic guidance and
							innovative tools to help you reach your peak.
						</p>
						<Link
							to="/about-us"
							className="inline-flex items-center px-6 py-3 bg-summit-dark text-white font-semibold rounded-xl hover:bg-navy-800 transition-colors"
						>
							Learn Our Story
						</Link>
					</div>

					<div className="space-y-6">
						{reasons.map((reason, i) => (
							<div
								key={reason.title}
								className="flex gap-5 p-6 bg-white rounded-2xl shadow-sm"
							>
								<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center font-bold text-sm">
									{i + 1}
								</div>
								<div>
									<h3 className="font-bold text-gray-900 mb-1">
										{reason.title}
									</h3>
									<p className="text-gray-600 text-sm leading-relaxed">
										{reason.description}
									</p>
								</div>
							</div>
						))}
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
		{ value: "50+", label: "Projects Delivered" },
		{ value: "24/7", label: "Support Available" },
	];

	return (
		<section className="py-16 bg-summit-dark">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat) => (
						<div key={stat.label} className="text-center">
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
		</section>
	);
}

function CTASection() {
	return (
		<section className="py-20 lg:py-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative bg-gradient-to-br from-navy-800 to-summit-dark rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
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
								className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
							>
								Get In Touch
							</Link>
							<Link
								to="/case-studies"
								className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
							>
								View Case Studies
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
