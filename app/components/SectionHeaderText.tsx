interface SectionHeaderTextProps {
	title1: string;
	title2: string;
	subtitle?: string;
	theme?: "dark" | "light" | "blue";
	vertAlign?: "top" | "center";
	noPad: "true" | "false";
}

export default function SectionHeaderText({ title1, title2, subtitle, theme = "dark", vertAlign = "top", noPad = "false" }: SectionHeaderTextProps) {
	const topColor = theme === "dark" ? "text-white" : theme === "light" ? "text-gray-900" : "text-white";
	const subtitleColor = theme === "dark" ? "text-gray-300" : theme === "light" ? "text-gray-600" : "text-gray-300";
	const gradientColors = theme === "dark" || theme === "blue" ? "bg-gradient-to-r from-wsm-glacier to-brand-peach" : "bg-gradient-to-r from-wsm-dark to-wsm-cliff";
	// tw-safelist: content-center content-start justify-center justify-start
	const vertalignClass = vertAlign === "center" ? "content-center" : "content-start";
	// tw-safelist: p-4
	const outerPaddingClass = noPad === "true" ? "" : "p-4"

	return (
		<div className={`p-4 flex-col ${vertalignClass}`}>
			<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] leading-6 sm:leading-8 md:leading-10 lg:leading-12 leading-tight">
				<span className={`block ${topColor}`}>{title1}</span>
				<span className={`${gradientColors} inline-block text-transparent bg-clip-text`}>{title2}</span>
			</h1>
			{subtitle && (
				<p className={`text-lg ${subtitleColor} max-w-2xl mx-auto mb-12 text-center lg:text-left mt-4`}>
					{subtitle}
				</p>
			)}
		</div>
	);
}
