/**
 * Renders a grid of CSAT survey cards (account name, star rating, reviewer,
 * and an optional link to the corresponding testimonial article).
 *
 * The testimonial link is populated upstream by joining article_references
 * on csat_survey_id where parent_relationship_type = 'Testimonial'.
 */
import { Link } from "react-router";
import type { CsatSurvey } from "~/lib/types";
import SectionHeaderText from "./SectionHeaderText";
import Tag from "./Tag";

// Supported color palettes — see themeStyles below.
type Theme = "light" | "dark" | "blue";

interface CsatCardSectionProps {
	surveys: CsatSurvey[];
	title1?: string;
	title2?: string;
	subtitle?: string;
	emptyText?: string;
	theme?: Theme;
	dots?: boolean; // Adds a dotted pattern to the left/right flex spacers
	id?: string;
	tag?: string;
	showTestimonialLinks?: boolean;
}

// Per-theme color tokens. Keys map directly to className slots used in the
// JSX below so a theme switch only needs to update this table.
const themeStyles: Record<Theme, {
	wrapper: string;
	outerBorder: string;
	grid: string;
	empty: string;
	cardBg: string;
	cardBorder: string;
	starActive: string;
	starInactive: string;
	testimonial: string;
	name: string;
	detail: string;
	divider: string;
}> = {
	dark: {
		wrapper: "bg-wsm-dark",
		outerBorder: "border-[#ffffff22] ",
		grid: "",
		empty: "text-gray-400",
		cardBg: "bg-gray-800",
		cardBorder: "border-gray-600",
		starActive: "text-[#FADEBF]",
		starInactive: "text-gray-600",
		testimonial: "text-gray-300",
		name: "text-white",
		detail: "text-gray-200",
		divider: "border-gray-800",
	},
	light: {
		wrapper: "bg-gradient-to-b from-wsm-glacier to-gray-100",
		outerBorder: "border-gray-200 ",
		grid: "",
		empty: "text-gray-500",
		cardBg: "bg-white",
		cardBorder: "border-gray-200",
		starActive: "text-brand-coral",
		starInactive: "text-gray-300",
		testimonial: "text-gray-600",
		name: "text-gray-900",
		detail: "text-gray-500",
		divider: "border-gray-200",
	},
	blue: {
		wrapper: "bg-gradient-to-b from-wsm-glacier to-wsm-mountain",
		outerBorder: "border-[#ffffff33] ",
		grid: "",
		empty: "text-[#B1E2F5]",
		cardBg: "bg-[#025474]",
		cardBorder: "border-[#ffffff33]",
		starActive: "text-[#FADEBF]",
		starInactive: "text-[#036588]",
		testimonial: "text-[#B1E2F5]",
		name: "text-white",
		detail: "text-[#7dc8e0]",
		divider: "border-[#ffffff22]",
	},
};

export default function CsatCardSection({
	surveys,
	title1,
	title2,
	subtitle,
	emptyText = "No reviews yet.",
	theme = "dark",
	dots = false,
	id,
	tag,
}: CsatCardSectionProps) {
	const s = themeStyles[theme];
	// The light theme uses a different dot pattern so the dots remain visible
	// against the lighter background.
	const dotsClass = dots
		? theme === "light" ? "pattern-bg-dots-light" : "pattern-bg-dots"
		: "";

	return (
		<section id={id}>
			<div className={`py-10 lg:py-18 ${s.wrapper} relative`}>
				{/* Optional header (title / subtitle) */}
				<div className="">
					{(title1 || title2 || subtitle) && (
						<SectionHeaderText title1={title1} title2={title2} subtitle={subtitle} theme={theme} vertAlign="center" horzAlign="center" noPad="false" compact="true" />
					)}
				</div>

				{/* 3-column layout: dotted spacer | content | dotted spacer */}
				<div className="flex">
					<div className={`flex-1 ${dotsClass}`}>

					</div>

					{/* Center content column (capped width) */}
					<div className="max-w-7xl">
						<div className="relative">
							<Tag text={tag} theme={theme} />
							<div className="p-4 bg-fixed">
								{surveys.length === 0 ? (
									<p className={`${s.empty} italic p-6`}>{emptyText}</p>
								) : (
									// Card grid — flex-wrap so cards reflow on narrow screens.
									<div className={`flex flex-row flex-wrap justify-start gap-2 ${s.grid}`}>
										{surveys.map((survey) => (
											<div
												key={survey.sf_id}
												className="flex-1 min-w-[30%] grow group"
											>
												{/* Card body */}
												<div className={`${s.cardBg} flex flex-col justify-center gap-2 h-full w-full relative z-10 p-6`}>
													{/* Account name (company) */}
													{survey.account_name && <p className={`${s.detail} text-md font-bold text-center`}>{survey.account_name}</p>}

													{/* Star rating row — render 5 stars, fill in those below star_rating */}
													{survey.star_rating != null && (
														<div className="flex justify-center gap-1 mb-3">
															{Array.from({ length: 5 }).map((_, i) => (
																<svg
																	key={i}
																	className={`w-5 h-5 ${i < survey.star_rating! ? s.starActive : s.starInactive}`}
																	fill="currentColor"
																	viewBox="0 0 20 20"
																>
																	<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
																</svg>
															))}
														</div>
													)}

													{/* Reviewer footer: name, title, and optional testimonial link */}
													<div className={`border-t ${s.divider}`}>
														<p className={`${s.name} font-bold text-sm text-center`}>
															{survey.first_name} {survey.last_name}
														</p>
														{survey.title && <p className={`${s.detail} text-xs  text-center`}>{survey.title}</p>}

														{/* Only rendered when a Testimonial article reference is linked
															to this CSAT survey (resolved upstream in the loader). */}
														{survey.testimonial_article_id && (
															<div className="flex justify-center mt-3">
																<Link
																	to={`/article/${survey.testimonial_article_id}`}
																	className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-brand-blue hover:bg-brand-sky transition-colors"
																>
																	Read Testimonial
																	<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
																	</svg>
																</Link>
															</div>
														)}
													</div>
												</div>

												{/* Reserved: pull-quote blurb — kept commented while design is finalized. */}
												{/*survey.website_testimonial_blurb && (
														<p className={`${s.testimonial} text-sm leading-relaxed italic mb-4 overflow-y-clip`}>
															"{survey.website_testimonial_blurb}"
														</p>
													)*/}

											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className={`flex-1 ${dotsClass}`}>

					</div>
				</div>
			</div>
		</section>
	);
}
