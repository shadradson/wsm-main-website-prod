interface SectionHeaderTextProps {
	title1: string;
	title2: string;
	subtitle?: string;
	theme?: "dark" | "light" | "blue" | "purple";
	vertAlign?: "top" | "center";
	horzAlign?: "left" | "center" | "reactive";
	noPad?: "true" | "false";
}

// tw-safelist: content-center content-start text-left text-center text-center lg:text-left p-4

export default function SectionHeaderText({ title1, title2, subtitle, theme = "dark", horzAlign = "left", vertAlign = "top", noPad = "false" }: SectionHeaderTextProps) {
	let topColor: string;
	switch (theme) {
		case "light":
			topColor = "text-gray-900";
			break;
		case "dark":
		case "blue":
		case "purple":
		default:
			topColor = "text-white";
			break;
	}

	let subtitleColor: string;
	switch (theme) {
		case "light":
			subtitleColor = "text-gray-600";
			break;
		case "dark":
		case "blue":
		case "purple":
		default:
			subtitleColor = "text-gray-300";
			break;
	}

	let gradientColors: string;
	switch (theme) {
		case "light":
			gradientColors = "bg-gradient-to-r from-wsm-dark to-wsm-cliff";
			break;
		case "purple":
			gradientColors = "bg-gradient-to-r from-[#a365c1] to-[#53C4EE]";
			break;
		case "dark":
		case "blue":
		default:
			gradientColors = "bg-gradient-to-r from-wsm-glacier to-brand-peach";
			break;
	}

	let vertalignClass: string;
	switch (vertAlign) {
		case "center":
			vertalignClass = "content-center";
			break;
		case "top":
		default:
			vertalignClass = "content-start";
			break;
	}

	let horzAlignClass: string;
	switch (horzAlign) {
		case "center":
			horzAlignClass = "text-center";
			break;
		case "reactive":
			horzAlignClass = "text-center lg:text-left";
			break;
		case "left":
		default:
			horzAlignClass = "text-left";
			break;
	}

	const outerPaddingClass = noPad === "true" ? "" : "p-4";

	return (
		<div className={`${outerPaddingClass} flex-col ${vertalignClass}`}>
			<h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] leading-6 sm:leading-8 md:leading-10 lg:leading-12 leading-tight ${horzAlignClass}`}>
				<span className={`block ${topColor}`}>{title1}</span>
				<span className={`${gradientColors} inline-block text-transparent bg-clip-text`}>{title2}</span>
			</h1>
			{subtitle && (
				<p className={`text-lg ${subtitleColor} ${horzAlignClass} max-w-2xl mx-auto mb-12 mt-4`}>
					{subtitle}
				</p>
			)}
		</div>
	);
}
