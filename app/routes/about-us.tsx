import type { Route } from "./+types/about-us";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "About Us | We Summit Mountains" },
		{
			name: "description",
			content:
				"Learn about We Summit Mountains — a Dallas-based Salesforce and AI consulting firm transforming complex tech challenges into growth opportunities since 2023.",
		},
	];
}

export default function AboutUs() {
	return (
		<>
			<PageHero />
			<MissionSection />
			<ValuesSection />
			<StorySection />
			<CTASection />
		</>
	);
}

function PageHero() {
	return (
		<section id="about-hero" className="bg-summit-dark">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">
							About Us
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							Transforming Challenges Into{" "}
							<span className="text-brand-sky">Opportunities</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							We Summit Mountains is a Dallas-based software
							development firm that partners with organizations to
							provide strategic guidance and innovative tools for
							measurable business results.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function MissionSection() {
	return (
		<section id="about-mission">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16 items-center">
						<div className="lg:w-1/2">
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
								Our Mission
							</h2>
							<p className="text-lg text-gray-600 leading-relaxed mb-6">
								To solve problems, overcome obstacles, and foster
								progress together. We partner with organizations to
								provide strategic guidance and innovative tools for
								measurable business results.
							</p>
							<p className="text-lg text-gray-600 leading-relaxed">
								Every mountain represents a challenge waiting to be
								conquered. We believe that with the right team, the
								right tools, and the right strategy, no peak is out
								of reach.
							</p>
						</div>
						<div className="lg:w-1/2 bg-gradient-to-br from-brand-teal/10 to-brand-blue/10 rounded-3xl p-12 text-center">
							<blockquote className="text-2xl font-light text-gray-800 italic leading-relaxed">
								"Let's climb your software mountain together."
							</blockquote>
							<p className="mt-4 text-brand-blue font-semibold">
								— We Summit Mountains
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function ValuesSection() {
	const values = [
		{
			title: "Collaboration",
			description:
				"We build lasting partnerships with our clients, working side-by-side to understand challenges and co-create solutions.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
				</svg>
			),
		},
		{
			title: "Innovation",
			description:
				"We stay at the forefront of technology, bringing fresh perspectives and cutting-edge solutions to every project.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
				</svg>
			),
		},
		{
			title: "Excellence",
			description:
				"We hold ourselves to the highest standards, delivering solutions that enable operational excellence and sustainable success.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
				</svg>
			),
		},
		{
			title: "Growth",
			description:
				"We grow ourselves and encourage others. Every engagement is an opportunity for mutual learning and development.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
				</svg>
			),
		},
	];

	return (
		<section id="about-values" className="bg-gray-50">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							Our Core Values
						</h2>
						<p className="text-lg text-gray-600">
							These principles guide everything we do and every
							solution we build.
						</p>
					</div>

					<div className="flex flex-wrap gap-8">
						{values.map((value) => (
							<div
								key={value.title}
								className="w-full sm:w-[calc(50%-1rem)] bg-white p-8 rounded-2xl shadow-sm cursor-pointer"
							>
								<div className="w-14 h-14 rounded-xl bg-brand-sky/10 text-brand-sky flex items-center justify-center mb-5">
									{value.icon}
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									{value.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{value.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function StorySection() {
	return (
		<section id="about-story">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
							Our Story
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed mb-6">
							Founded in 2023 in Dallas, Texas, We Summit Mountains
							was born from a shared passion for solving complex
							technology challenges. Our founders saw a gap in the
							market — organizations struggling to build functional
							software that truly serves their needs.
						</p>
						<p className="text-lg text-gray-600 leading-relaxed mb-6">
							We set out to change that. By combining deep Salesforce
							expertise with a collaborative, partnership-driven
							approach, we help businesses of all sizes unlock the full
							potential of their technology investments.
						</p>
						<p className="text-lg text-gray-600 leading-relaxed">
							Today, we continue to grow — not just as a company, but
							as partners to the organizations we serve. Together, we
							summit mountains.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section id="about-cta" className="bg-gray-50">
			<div className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Ready to Start Climbing?
					</h2>
					<p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
						Join the organizations that have partnered with us to reach
						new heights.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							to="/contact"
							className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all"
						>
							Get In Touch
						</Link>
						<Link
							to="/our-team"
							className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
						>
							Meet Our Team
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
