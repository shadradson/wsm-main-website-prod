import type { Route } from "./+types/our-team";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Our Team | We Summit Mountains" },
		{
			name: "description",
			content:
				"Meet the team behind We Summit Mountains. Certified Salesforce professionals dedicated to helping you reach your technology summit.",
		},
	];
}

export default function OurTeam() {
	return (
		<>
			<PageHero />
			<TeamGrid />
			<CertificationsSection />
			<CTASection />
		</>
	);
}

function PageHero() {
	return (
		<section id="team-hero" className="bg-summit-dark">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">
							Our Team
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							The People Behind{" "}
							<span className="text-brand-sky">Every Summit</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							We solve problems, overcome challenges, grow ourselves
							and encourage others. Meet the team that makes it all
							happen.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function TeamGrid() {
	const team = [
		{
			name: "Jason Booher",
			role: "Company Owner",
			bio: "With deep expertise in Salesforce and a passion for solving complex business challenges, Jason founded We Summit Mountains to help organizations unlock the full potential of their technology investments.",
			linkedin: "https://www.linkedin.com/in/jason-booher-058510133/",
			initials: "JB",
		},
		{
			name: "Jonathan Davis",
			role: "Managing Partner",
			bio: "Jonathan brings strategic vision and hands-on technical leadership to every engagement. His focus on building lasting client partnerships drives the company's collaborative approach to consulting.",
			linkedin: "https://www.linkedin.com/in/jcd386/",
			initials: "JD",
		},
		{
			name: "Ashley Blue",
			role: "Implementation Consultant",
			bio: "Ashley specializes in Salesforce implementation and optimization, turning complex requirements into elegant, user-friendly solutions that drive adoption and measurable results.",
			linkedin: "https://www.linkedin.com/in/ashleymblue/",
			initials: "AB",
		},
		{
			name: "Zachary Byrd",
			role: "Consultant",
			bio: "Zachary brings a unique perspective to technology consulting, combining analytical thinking with creative problem-solving to deliver innovative solutions for our clients.",
			linkedin: "https://www.linkedin.com/in/zacharybyrd/",
			initials: "ZB",
		},
	];

	return (
		<section id="team-grid">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-wrap gap-8">
						{team.map((member) => (
							<div
								key={member.name}
								className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] group text-center p-8 rounded-2xl border border-gray-200 hover:border-brand-blue/30 hover:shadow-xl transition-all cursor-pointer"
							>
								<div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5">
									{member.initials}
								</div>
								<h3 className="text-lg font-bold text-gray-900 mb-1">
									{member.name}
								</h3>
								<p className="text-brand-blue text-sm font-medium mb-4">
									{member.role}
								</p>
								<p className="text-gray-600 text-sm leading-relaxed mb-5">
									{member.bio}
								</p>
								<a
									href={member.linkedin}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-blue transition-colors"
								>
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
									LinkedIn
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function CertificationsSection() {
	const certifications = [
		"Salesforce Certified Administrator",
		"Salesforce Sales Cloud Consultant",
		"Salesforce Platform Developer I",
		"Salesforce Service Cloud Consultant",
	];

	return (
		<section id="team-certifications" className="bg-gray-50">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
						Certified Professionals
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
						Our team maintains the industry's most respected
						certifications to deliver the highest quality solutions.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						{certifications.map((cert) => (
							<div
								key={cert}
								className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm"
							>
								<svg className="w-6 h-6 text-brand-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
								</svg>
								<span className="text-sm font-medium text-gray-800">
									{cert}
								</span>
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
		<section id="team-cta">
			<div className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Want to Join Our Team?
					</h2>
					<p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
						We're always looking for talented individuals who share our
						passion for solving complex challenges.
					</p>
					<Link
						to="/contact"
						className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
					>
						Get In Touch
					</Link>
				</div>
			</div>
		</section>
	);
}
