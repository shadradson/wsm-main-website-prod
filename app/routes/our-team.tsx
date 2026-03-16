import type { Route } from "./+types/our-team";
import { Link, useLoaderData } from "react-router";
import { buildMeta, SITE_URL } from "~/lib/seo";

interface TeamMember {
	sf_id: string;
	first_name: string;
	last_name: string;
	title: string | null;
	certifications: string | null;
	about_us_sort_order: number;
	trailblazer_url: string | null;
	linkedin_url: string | null;
	date_started_in_industry: string | null;
	time_in_industry: number | null;
	date_started_at_wsm: string | null;
	years_at_wsm: number | null;
	photo_r2_key: string | null;
}

const TITLE = "About Us | We Summit Mountains | Dallas Salesforce & AI Consultants";
const DESCRIPTION =
	"Meet the We Summit Mountains team — certified Salesforce professionals with 14+ years of combined experience. A Dallas-based consulting firm specializing in Salesforce, AI, and custom software.";

const aboutPageSchema = {
	"@context": "https://schema.org",
	"@type": "AboutPage",
	"@id": `${SITE_URL}/about-us`,
	name: TITLE,
	description: DESCRIPTION,
	url: `${SITE_URL}/about-us`,
	publisher: { "@id": `${SITE_URL}/#organization` },
	breadcrumb: {
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about-us` },
		],
	},
};

export function meta({ }: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/about-us" });
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;
	const { results } = await db.prepare(
		"SELECT sf_id, first_name, last_name, title, certifications, about_us_sort_order, trailblazer_url, linkedin_url, date_started_in_industry, time_in_industry, date_started_at_wsm, years_at_wsm, photo_r2_key FROM contacts ORDER BY about_us_sort_order ASC",
	).all<TeamMember>();

	const team = results ?? [];
	const totalYearsExperience = team.reduce((sum, m) => sum + (m.time_in_industry ?? 0), 0).toFixed(2);

	return { team, totalYearsExperience };
}

export default function OurTeam() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
			<OurTeamHero />
			<TeamGrid />
			<TransitionLayer2 />
			<CertificationsSection />
			<MissionSection />
			<ValuesSection />
			<StorySection />
		</>
	);
}

function OurTeamHero() {
	return (
		<div className="parallax_container ">
			<div className="para_layers_all bg-[#111412]" id="parallax">
				<div className="our_team_para_layer layer1" data-speed="-1" data-blur="0" data-baseblur="0">
					<div className="clouds slide">
						<img src="/images/clouds.svg" className="clouds_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer2" data-speed="-1" data-blur="4" data-baseblur="0">
					<div className="mountains_mid slide">
						<img src="/images/MountaisMid.svg" className="mountains_mid_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer3" data-speed="-0.9" data-blur="3" data-baseblur="1">
					<div className="mountains_botleft slide">
						<img src="/images/mountains_botleft.svg" className="mountains_botleft_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer4" data-speed="-0.6" data-blur="2" data-baseblur="2">
					<div className="mountains_botright slide">
						<img src="/images/mountains_botright.svg" className="mountains_botright_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer5 mix_blend_ex" id="keyart-0" data-speed="-0.8" data-blur="0" data-baseblur="0">
					<div className="wsm slide">
						<img src="/images/WSM_LOGO_V2_Norm_Wht.svg" className="wsm_img" />
						<h1 className="absolute top-[calc(75vh-10vw)] text-5xl font-bold text-white">OUR TEAM</h1>
					</div>
				</div>

				<div className="our_team_para_layer layer6" id="keyart-0" data-speed="-0.5" data-blur="1" data-baseblur="3">
					<div className="hillside slide">
						<img src="/images/hillside.svg" className="hillside_img" />
					</div>
				</div>

				<div className="birds birds1-anim">
					<div className="birds1 slide">
						<img src="/images/Flying Birds0.svg" className="birds1_img" />
					</div>
				</div>
				<div className="birds birds2-anim">
					<div className="birds2 slide">
						<img src="/images/Flying Birds1.svg" className="birds2_img" />
					</div>
				</div>
				<div className="birds birds3-anim">
					<div className="birds3 slide">
						<img src="/images/Flying Birds2.svg" className="birds3_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer7" id="keyart-0" data-speed="-0.4" data-blur="-5" data-baseblur="5">
					<div className="extra_trees slide">
						<img src="/images/extra_trees.svg" className="extra_trees_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer8" data-speed="0" data-blur="-6" data-baseblur="6">
					<div className="close_trees slide">
						<img src="/images/trees_close.svg" className="close_trees_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer9" data-speed="0" data-blur="-7" data-baseblur="7">
					<div className="close_rocks slide">
						<img src="/images/CloseRocksSVG.svg" className="close_rocks_img" />
					</div>
				</div>

				<div className="our_team_para_layer layer10" id="keyart-8" data-speed="100">

				</div>

			</div>
			<div className="para_layer_overlay" data-speed="100"></div>
		</div>
	);
}




function TeamGrid() {
	const { team, totalYearsExperience } = useLoaderData<typeof loader>();
	const Stats = [
		{
			label: "Certifications",
			data: "30",
		},
		{
			label: "Years Experience",
			data: String(totalYearsExperience || "22"),
		},
		{
			label: "Cats",
			data: "5",
		},
	]

	return (
		<section id="team-grid">
			<div className="py-20 lg:py-28 bg-gradient-to-b from-[#111412] to-wsm-cliff
			 pattern-bg-dots">
				<div className="max-w-7xl mx-auto p-4 border-2 border-2 border-solid border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff44,_#ffffff44_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/15 mix-blend-screen">
					<div className="bg-black p-4 border-2 border-solid border-[#ffffff22]">
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
							<span className="block">The Humans Who</span>
							<span className="bg-gradient-to-r from-wsm-glacier to-brand-peach inline-block text-transparent bg-clip-text">Summit Mountains</span>
						</h1>
					</div>
					<div className="flex flex-wrap justify-center bg-[#ffffff22]">
						{team.map((member: TeamMember) => {
							const initials = `${(member.first_name?.[0] ?? "")}${(member.last_name?.[0] ?? "")}`;
							return (
								<div key={member.sf_id} className="w-full sm:w-[calc(50%-1.5rem)] min-w-[400px] grow group p-1 hover:shadow-xl transition-all cursor-pointer">
									<div className="bg-black border-2 border-solid border-gray-600 flex flex-col h-full relative z-10">
										{/* Top row: photo left, name/title right */}
										<div className="flex items-start gap-4 p-2">
											{member.photo_r2_key ? (
												<img
													src={`/api/assets/${member.photo_r2_key}`}
													alt={`${member.first_name} ${member.last_name}`}
													className="w-1/3 aspect-square object-cover flex-shrink-0"
												/>
											) : (
												<div className="w-1/3 aspect-square rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
													{initials}
												</div>
											)}
											<div className="text-left p-2 w-2/3">
												<h3 className="text-lg font-bold text-white">
													{member.first_name} {member.last_name}
												</h3>
												{member.title && (
													<p className="text-wsm-glacier text-sm font-medium mt-1">
														{member.title}
													</p>
												)}
												{/* Career stats */}
												{(member.years_at_wsm != null || member.time_in_industry != null) && (
													<div className="flex gap-2 mt-2 flex-wrap">
														{member.years_at_wsm != null && (
															<span className="text-xs font-semibold text-wsm-glacier bg-[#ffffff11] border border-[#ffffff22] px-2 py-1 rounded">
																{Math.round(member.years_at_wsm)} yr{Math.round(member.years_at_wsm) !== 1 ? "s" : ""} at WSM
															</span>
														)}
														{member.time_in_industry != null && (
															<span className="text-xs font-semibold text-gray-400 bg-[#ffffff08] border border-[#ffffff15] px-2 py-1 rounded">
																{member.time_in_industry} yr{member.time_in_industry !== 1 ? "s" : ""} in industry
															</span>
														)}
													</div>
												)}
												{/* Certifications */}
												{member.certifications && (
													<div
														className="text-gray-200 text-sm leading-relaxed text-left flex-grow p-2"
														dangerouslySetInnerHTML={{ __html: member.certifications }}
													/>
												)}
											</div>
										</div>
										{/* Buttons */}
										{(member.linkedin_url || member.trailblazer_url) && (
											<div className="flex items-center gap-3 mt-auto border-t border-gray-500 p-2 pattern-bg-dots-sm relative">
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
			<div id="home-stats" className="bg-wsm-cliff">
				<div className="py-16">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-wrap gap-8 justify-center">
							{Stats.map((stat) => (
								<div key={stat.label} className="w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] text-center stats-fade-in">
									<p className="text-8xl sm:text-6xl font-bold text-white mb-2">
										{stat.data}
									</p>
									<p className="text-white text-sm uppercase tracking-wider">
										{stat.label}
									</p>
								</div>
							))}
						</div>
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
						<div className="splash_tag_text text-gray-50">
							CERTS
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}

function CertificationsSection() {
	const sfcertifications = [
		"Salesforce Certified Administrator",
		"Salesforce Sales Cloud Consultant",
		"Salesforce Platform Developer I",
		"Salesforce Service Cloud Consultant",
		"Salesforce Digital Experience Consultant",
		"Salesforce Platform App Builder",
		"Salesforce Data Architect",
		"Salesforce Sharing and Visbility Designer",
		"Salesforce CPQ Certified Administrator",
		"Salesforce Business Analyst",
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
					{/* Salesforce Partner Badge */}
					<div className="flex justify-center mb-12">
						<div className="p-4 rounded-[20px] w-full max-w-[200px] flex flex-col justify-between items-center gap-4 shadow-[6px_6px_3px_rgba(0,0,0,0.15)] bg-wsm-light-blue">
							<div className="w-4/5">
								<img src="/images/Salesforce logo.svg" alt="Salesforce" />
							</div>
							<div className="text-center text-wsm-dark">
								<p className="text-[2rem] font-black leading-[2rem]">PARTNER</p>
							</div>
							<div className="text-center text-wsm-dark">
								<p className="text-[1.75rem] font-bold leading-[1.75rem]">SINCE 2023</p>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap justify-center gap-4">
						{sfcertifications.map((cert) => (
							<div
								key={cert}
								className="flex-1 min-w-[300px] items-center gap-3 px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm"
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
								is to give people the foundations to grow themselves and their companies by improving communication interpersonally, interdepartmentally, and with software.
								We will learn to cultivate the best in ourselves, and in eachother as we stride toward the top of each mountain.
								Our knowledge is shared so that we can all grow greater than any one of us.
							</p>
							<p className="text-lg text-gray-600 leading-relaxed">
								Every mountain represents a challenge waiting to be
								conquered. We believe that with the right team, the
								right tools, and the right strategy, no peak is out
								of reach.
							</p>
						</div>
						<div className="lg:w-1/2 bg-gradient-to-br from-brand-teal/10 to-brand-blue/10 p-12 text-center">
							<blockquote className="text-2xl font-light text-gray-800 italic leading-relaxed">
								"Let's climb your software mountain together."
							</blockquote>
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
			title: "We All Climb Together",
			description:
				"Climbing is difficult, but we're not doing it alone! We all help each other when we can. This allows us to do much more as a group, and the effects are exponential.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
				</svg>
			),
		},
		{
			title: "We Climb to Grow",
			description:
				"We work to to grow ourselves and the others around us. Growth is painful, but the reward is great. There is nothing as fulfilling as breaking through the walls that hold you back to accomplish what the previous version of yourself did not think was possible.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
				</svg>
			),
		},
		{
			title: "We Keep Climbing",
			description:
				"We are not here to do the bare minimum. We are not here to take the easy path. We are here to take the right path to the top of every mountain we face together. Let's go.",
			icon: (
				<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
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
					<div className="flex flex-col gap-8">
						{values.map((value) => (
							<div
								key={value.title}
								className="w-full bg-white p-8 rounded-2xl shadow-sm"
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
							Founded in 2023
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

