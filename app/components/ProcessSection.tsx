import styles from "./ProcessSection.module.css";
import SectionHeaderText from "./SectionHeaderText";
import Tag from "./Tag";

interface Step {
	step: string;
	title1: string;
	title2: string;
	subtitle?: string;
	description: string;
}

interface ProcessSectionProps {
	steps: Step[];
	title1?: string;
	title2?: string;
	subtitle?: string;
	tag?: string;
	footerTitle?: string;
	footerText?: string;
	theme?: "light" | "dark" | "blue";
	dots?: string;
}

export default function ProcessSection({
	steps,
	title1,
	title2,
	subtitle,
	tag,
	footerTitle,
	footerText,
	theme = "dark",
	dots,
}: ProcessSectionProps) {
	const dotsclass = dots === "true"
		? (theme === "light" ? "pattern-bg-dots-light" : "pattern-bg-dots")
		: "";

	return (
		<section className={styles[theme]}>
			<div className={`h-30`}></div>
			<div>
				<div className="proc-border border-y-solid border-y-1">
					<div className="proc-border proc-outline border-x-solid border-x-1 max-w-7xl mx-auto text-center relative pb-4 md:pb-8">
						{tag && (
							<Tag text={tag} theme={theme} />
						)}
						{(title1 || subtitle) && (
							<SectionHeaderText title1={title1} title2={title2} subtitle={subtitle} theme={theme} vertAlign="center" horzAlign="center" noPad="false"/>
						)}

						<div className="flex flex-wrap justify-center">
							{steps.map((item) => (
								<div
									key={item.title}
									className="relative p-1 flex-1 min-w-[200px] min-h-[100px] items-center flex flex-col justify-center hover:bg-white/5 transition-colors"
								>
									{/* Corner brackets 
									<svg className="absolute top-0 -left-0.25 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path className="proc-corner" strokeWidth="2" d="M0 20V0h20" />
									</svg>
									<svg className="absolute top-0 right-0 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path className="proc-corner" strokeWidth="2" d="M20 20V0H0" />
									</svg>
									<svg className="absolute bottom-0 -left-0.25 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path className="proc-corner" strokeWidth="2" d="M0 0v20h20" />
									</svg>
									<svg className="absolute bottom-0 right-0 w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path className="proc-corner" strokeWidth="2" d="M20 0v20H0" />
									</svg>*/}

									<div className="proc-step-bg h-[100%] w-[100%] flex-col items-center justify-center p-4">
										<div className="proc-step-badge">
											{item.step}
										</div>
										<h3 className="proc-step-title text-lg font-bold">
											{item.title}
										</h3>
										{item.subtitle && (
											<h4 className="proc-step-subtitle text-md font-[500] mb-4">
												{item.subtitle}
											</h4>
										)}
										<p className="proc-step-desc text-sm leading-relaxed">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>

						{(footerTitle || footerText) && (
							<div className="p-10 sm:p-8 lg:p-12">
								<div className="p-2">
									{footerTitle && <h3 className="proc-footer-title text-xl sm:text-2xl font-bold">{footerTitle}</h3>}
									{footerText && <p className="proc-footer-text text-lg max-w-2xl mx-auto">{footerText}</p>}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className={`h-30`}></div>
		</section>
	);
}
