import type { Route } from "./+types/our-team";
import { Link, useLoaderData } from "react-router";
import { buildMeta, SITE_URL } from "~/lib/seo";
import Transition from "~/components/Transition";
import SimpleTextSection from "~/components/SimpleTextSection";
import SectionHeaderText from "~/components/SectionHeaderText";
import Stats from "~/components/StatSection";

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
	const { totalYearsExperience } = useLoaderData<typeof loader>();

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
			<OurTeamHero />
			<TeamGrid />

			<Stats
				stats={[
					{
						label: "Certifications",
						value: "30",
					},
					{
						label: "Years Experience",
						value: String(totalYearsExperience || "22"),
					},
					{
						label: "Cats",
						value: "5",
					},
					{
						label: "Dogs",
						value: "5",
					},
					{
						label: "People Who Juggle",
						value: "1",
					},
				]}
				title=""
				subtitle=""
				tag=""
				theme="blue"
				dots="true"
			/>
			<Transition
				type="text"
				text="WE ARE"
				textpos="bot"
				textcolor="#000000"
				bgtop="#036588"
				dots="true"
			/>
			<Transition
				type="text"
				text="CERTIFIED"
				textpos="bot"
				textcolor="#F3F4F7"
				bgtop="#000000"
				dots="true"
			/>
			<CertificationsSection />
			<Transition
				type="text"
				text="OUR"
				textpos="bot"
				textcolor="#000"
				bgtop="#D1D5DB"
			/>
			<Transition
				type="text"
				text="MISSION"
				textpos="bot"
				textcolor="#036588"
				bgtop="#000"
			/>
			<SimpleTextSection
				theme="blue"
				type="2bar"
				title1="THE WSM "
				title2="MISSION"
				tag="TRUE NORTH"
				subtitle="is to give people the foundations to grow themselves and their companies by improving communication interpersonally, interdepartmentally, and with software. We will learn to cultivate the best in ourselves, and in each other as we stride toward the top of each mountain. Our knowledge is shared so that we can all grow greater than any one of us."
				imageUrl="/images/MountainCompass.svg"
			/>
			<Transition
				type="text"
				text="VALUES"
				textpos="bot"
				textcolor="#F3F4F6"
				bgtop="#036588"
			/>
			<SimpleTextSection
				theme="light"
				type="VCards"
				title1="OUR CORE VALUES "
				title2="THAT DRIVE US"
				subtitle="These principles guide everything we do and every solution we build."
				cards={[
					{
						title1: "We Climb Together",
						tag: "TEAMWORK",
						subtitle:
							"Climbing is difficult, but we're not doing it alone! We all help each other when we can. This allows us to do much more as a group, and the effects are exponential.",
					},
					{
						title1: "We Climb to Grow",
						tag: "IMPROVEMENT",
						subtitle:
							"We work to to grow ourselves and the others around us. Growth is painful, but the reward is great. There is nothing as fulfilling as breaking through the walls that hold you back to accomplish what the previous version of yourself did not think was possible.",
					},
					{
						title1: "We Keep Climbing",
						tag: "TENACITY",
						subtitle:
							"We are not here to do the bare minimum. We are not here to take the easy path. We are here to take the right path to the top of every mountain we face together. Let's go.",
					},
				]}
			/>
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
						<h1 className="absolute top-[calc(75vh-7vw)] text-5xl font-bold text-white">OUR TEAM</h1>
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
	const { team } = useLoaderData<typeof loader>();


	return (
		<section id="team-grid">
			<div className="bg-gradient-to-b from-[#111412] to-wsm-cliff">
				<div className="h-20 ">

				</div>
				<div className="flex flex-row">
					<div className="flex-1 ">

					</div>
					<div className="">
						<div className="relative max-w-7xl mx-auto">
							{/*<div className="absolute top-0 -left-10 w-10 h-[100%] border-2 border-2 border-solid border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff44,_#ffffff44_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/15"></div>*/}
							<SectionHeaderText title1="THE HUMANS WHO " title2="SUMMIT MOUNTAINS" theme="dark" />
							<div className="flex flex-wrap justify-center">
								{team.map((member: TeamMember) => {
									const initials = `${(member.first_name?.[0] ?? "")}${(member.last_name?.[0] ?? "")}`;
									return (
										<div key={member.sf_id} className="w-full sm:w-[calc(50%-1.5rem)] min-w-[400px] grow group border-4 border-solid border-[#ffffff22] hover-border-[#ffffff77] transition-all cursor-pointer">
											<div className="flex flex-col h-full relative z-10">
												{/* Top row: photo left, name/title right */}
												<div className="flex items-center sm:items-start flex-col sm:flex-row">
													{member.photo_r2_key ? (
														<img
															src={`/api/assets/${member.photo_r2_key}`}
															alt={`${member.first_name} ${member.last_name}`}
															className="w-1/1 sm:w-1/3 aspect-square object-cover flex-shrink-0"
														/>
													) : (
														<div className="w-1/1 sm:w-1/3 aspect-square rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
															{initials}
														</div>
													)}
													<div className="text-center sm:text-left p-2 sm:p-4 md:p-6 w-1/1 sm:w-2/3">
														<h3 className="text-lg font-bold text-white">
															{member.first_name} {member.last_name}
														</h3>
														{member.title && (
															<p className="text-center sm:text-left text-wsm-glacier text-sm font-medium mt-1">
																{member.title}
															</p>
														)}
														{/* Certifications */}
														{member.certifications && (
															<div
																className="text-center sm:text-left text-gray-200 text-sm leading-relaxed flex-grow p-2"
																dangerouslySetInnerHTML={{ __html: member.certifications }}
															/>
														)}
													</div>
												</div>
												{/* Buttons */}
												{(member.linkedin_url || member.trailblazer_url) && (
													<div className="flex items-center gap-3 mt-auto border-t border-gray-500 p-2 relative">
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
														{/* Career stats */}
														{(member.years_at_wsm != null || member.time_in_industry != null) && (
															<div className="flex gap-2flex-wrap absolute bottom-0 right-0">
																{member.years_at_wsm != null && (
																	<span className="text-xs font-bold text-[#111513] bg-[#EDC098] px-2 py-1">
																		{Math.round(member.years_at_wsm)} YR{Math.round(member.years_at_wsm) !== 1 ? "S" : ""} AT WSM
																	</span>
																)}
															</div>
														)}
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
							{/*<div className="absolute top-0 -right-10 w-10 h-[100%] border-2 border-2 border-solid border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff44,_#ffffff44_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/15"></div>*/}
						</div>
					</div>
					<div className="flex-1 ">

					</div>
				</div>
				<div className="h-20 ">

				</div>
			</div>
		</section>

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
		<section id="team-certifications" className="bg-gradient-to-b from-gray-100 to-gray-300 flex">
			<div className="flex flex-col flex-1">
				<div className="py-20 lg:py-28">
					<div className="max-w-7xl mx-auto py-8 relative">
						<div className="flex flex-row flex-wrap">
							<SectionHeaderText
								title1="CERTIFIED"
								title2="PROFESSIONALS"
								subtitle="Our team maintains the industry's most respected certifications to deliver the highest quality solutions."
								theme="light"
								titlemultiline="true"
							/>
							<div className="flex-1">
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
							</div>
						</div>

						<div className="flex flex-wrap justify-center">
							{sfcertifications.map((cert) => (
								<div key={cert}
									className="p-2.5  flex-1 flex justify-center">
									<div className="px-5 py-2.5 bg-gray-50 rounded-full shadow-md shadow-md h-[100%] flex items-center justify-center w-fit min-w-[120px]">
										<span className="text-sm font-[700] text-gray-700 whitespace-nowrap">
											{cert}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


