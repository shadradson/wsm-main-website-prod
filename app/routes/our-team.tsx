import type { Route } from "./+types/our-team";
import { Link, useLoaderData } from "react-router";

interface TeamMember {
	sf_id: string;
	first_name: string;
	last_name: string;
	title: string | null;
	certifications: string | null;
	about_us_sort_order: number;
	trailblazer_url: string | null;
	linkedin_url: string | null;
	photo_r2_key: string | null;
}

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Our Team | We Summit Mountains" },
		{
			name: "description",
			content:
				"Meet the team behind We Summit Mountains. Certified Salesforce professionals dedicated to helping you reach your technology summit.",
		},
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;
	const { results } = await db.prepare(
		"SELECT sf_id, first_name, last_name, title, certifications, about_us_sort_order, trailblazer_url, linkedin_url, photo_r2_key FROM contacts ORDER BY about_us_sort_order ASC",
	).all<TeamMember>();

	return { team: results ?? [] };
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
							<p>The People Who</p>
							<p class="bg-gradient-to-r from-wsm-glacier to-brand-peach inline-block text-transparent bg-clip-text">Summit Moutains</p>
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
	const { team } = useLoaderData<typeof loader>();

	return (
		<section id="team-grid">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-solid border-gray-200 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/15">
					<div className="flex flex-wrap justify-center bg-gray-200">
						{team.map((member: TeamMember) => {
							const initials = `${(member.first_name?.[0] ?? "")}${(member.last_name?.[0] ?? "")}`;
							return (
								<div key={member.sf_id} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] group p-1 hover:shadow-xl transition-all cursor-pointer">
									<div className="bg-white rounded-md border-2 border-solid border-gray-200 flex flex-col h-full relative z-10">
										{/* Top row: photo left, name/title right */}
										<div className="flex items-start gap-4 p-2">
											{member.photo_r2_key ? (
												<img
													src={`/api/assets/${member.photo_r2_key}`}
													alt={`${member.first_name} ${member.last_name}`}
													className="w-20 h-20 object-cover flex-shrink-0"
												/>
											) : (
												<div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
													{initials}
												</div>
											)}
											<div className="text-left p-2">
												<h3 className="text-lg font-bold text-gray-900">
													{member.first_name} {member.last_name}
												</h3>
												{member.title && (
													<p className="text-brand-blue text-sm font-medium mt-1">
														{member.title}
													</p>
												)}
											</div>
										</div>
										{/* Certifications */}
										{member.certifications && (
											<div
												className="text-gray-600 text-sm leading-relaxed text-left flex-grow p-2"
												dangerouslySetInnerHTML={{ __html: member.certifications }}
											/>
										)}
										{/* Buttons */}
										{(member.linkedin_url || member.trailblazer_url) && (
											<div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 p-2 pattern-bg-dots-sm relative">
												{member.linkedin_url && (
													<a
														href={member.linkedin_url}
														target="_blank"
														rel="noreferrer"
														className="relative z-10 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0A66C2] rounded hover:bg-[#004182] transition-colors"
													>
														<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
															<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
														</svg>
														LinkedIn
													</a>
												)}
												{member.trailblazer_url && (
													<a
														href={member.trailblazer_url}
														target="_blank"
														rel="noreferrer"
														className="relative z-10 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#00A1E0] rounded hover:bg-[#0082b4] transition-colors"
													>
														<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
															<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
														</svg>
														Trailhead
													</a>
												)}
											</div>
										)}
									</div>
								</div>
							);
						})}
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
						Want to Join We Summit?
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
