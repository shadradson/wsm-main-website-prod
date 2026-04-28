import type { Route } from "./+types/our-team";
import { Link, useLoaderData } from "react-router";
import { buildMeta, SITE_URL } from "~/lib/seo";
import Transition from "~/components/Transition";
import SimpleTextSection from "~/components/SimpleTextSection";
import SectionHeaderText from "~/components/SectionHeaderText";
import SimplePillSection from "~/components/SimplePillSection";
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
	bio_article_id: string | null;
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
		"SELECT sf_id, first_name, last_name, title, certifications, about_us_sort_order, trailblazer_url, linkedin_url, date_started_in_industry, time_in_industry, date_started_at_wsm, years_at_wsm, photo_r2_key, bio_article_id FROM contacts ORDER BY about_us_sort_order ASC",
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
			<SimplePillSection
				pills={[
					{ "buttontext": "Salesforce Certified Administrator" },
					{ "buttontext": "Salesforce Sales Cloud Consultant" },
					{ "buttontext": "Salesforce Platform Developer I" },
					{ "buttontext": "Salesforce Service Cloud Consultant" },
					{ "buttontext": "Salesforce Digital Experience Consultant" },
					{ "buttontext": "Salesforce Platform App Builder" },
					{ "buttontext": "Salesforce Data Architect" },
					{ "buttontext": "Salesforce Sharing and Visbility Designer" },
					{ "buttontext": "Salesforce CPQ Certified Administrator" },
					{ "buttontext": "Salesforce Business Analyst" },
				]}
				title1="CERTIFIED"
				title2="PROFESSIONALS"
				subtitle="Our team maintains the industry's most respected certifications to deliver the highest quality solutions."
				tag=""
				type="pills"
				theme="light"
				dots="true"
				imageUrl="/images/Salesforce_Partner_cert_shield.svg"
				imageAlt="Salesforce Certified Partner"
				imageShadow="true"
			/>
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
				title1="THE WSM"
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
				title1="OUR CORE VALUES"
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
						<div className="wsm_img">
							<img src="/images/WSM_LOGO_V2_Norm_Wht.svg" className="" />
							<h1 className="text-5xl font-bold text-white">OUR TEAM</h1>
						</div>
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
						<div className="relative max-w-7xl mx-auto flex flex-col gap-10">
							{/*<div className="absolute top-0 -left-10 w-10 h-[100%] border-2 border-2 border-solid border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff44,_#ffffff44_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/15"></div>*/}
							<SectionHeaderText title1="THE HUMANS WHO" title2="SUMMIT MOUNTAINS" theme="dark" titlemultiline="true" />
							<div className="flex flex-wrap justify-center gap-8">
								{team.map((member: TeamMember) => {
									const initials = `${(member.first_name?.[0] ?? "")}${(member.last_name?.[0] ?? "")}`;
									const Wrapper = member.bio_article_id
										? ({ children }: { children: React.ReactNode }) => (
											<Link to={`/article/${member.bio_article_id}?trail=our-team`} className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33%-1.5rem)] min-w-[340px] group">
												{children}
											</Link>
										)
										: ({ children }: { children: React.ReactNode }) => (
											<div className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33%-1.5rem)] min-w-[340px] grow group border-x-0 sm:border-x-4 border-y-4 border-solid border-[#ffffff22] transition-all">
												{children}
											</div>
										);
									return (
										<Wrapper key={member.sf_id}>
											<div className="h-full rounded-[2rem] border-x-0 sm:border-x-4 border-y-4 border-solid border-[#6DE4F600] hover:border-[#6DE4F6ff] transition-all cursor-pointer no-underline text-inherit p-4">
												<div className="flex flex-col h-full relative z-10">
													{/* Top row: photo left, name/title right */}
													<div className="flex items-center flex-col">
														{member.photo_r2_key ? (
															<img
																src={`/api/assets/${member.photo_r2_key}`}
																alt={`${member.first_name} ${member.last_name}`}
																className="aspect-square w-1/1 rounded-[1rem] object-cover flex-shrink-0 bg-black"
															/>
														) : (
															<div className="w-1/1 aspect-square rounded-full bg-gradient-to-br from-brand-sky to-brand-teal text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
																{initials}
															</div>
														)}
														<div className="text-center sm:text-left p-2 w-1/1">
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
															{/* Career stats */}
															{(member.years_at_wsm != null || member.time_in_industry != null) && (
																<div className="text-center flex gap-2 flex-wrap width-[100%] justify-center sm:justify-start">
																	{member.years_at_wsm != null && (
																		<span className="text-xs font-bold text-[#111513] bg-[#EDC098] px-2 py-1">
																			{Math.round(member.years_at_wsm)} YR{Math.round(member.years_at_wsm) !== 1 ? "S" : ""} AT WSM
																		</span>
																	)}
																</div>
															)}
														</div>
													</div>
												</div>
											</div>
										</Wrapper>
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


