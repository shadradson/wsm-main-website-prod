import ArticleLinkCard from "./ArticleLinkCard";
import type { ArticleCardData } from "~/lib/types";
import SectionHeaderText from "./SectionHeaderText";

type Theme = "light" | "dark" | "blue";

interface ArticleCardSectionProps {
	articles: ArticleCardData[];
	title1?: string;
	title2?: string;
	subtitle?: string;
	emptyText?: string;
	theme?: Theme;
	dots?: boolean;
	id?: string;
	trail?: string;
}

const themeStyles: Record<Theme, {
	wrapper: string;
	outerBorder: string;
	header: string;
	title1: string;
	title2: string;
	subtitle: string;
	grid: string;
	empty: string;
}> = {
	dark: {
		wrapper: "bg-wsm-dark",
		outerBorder: "border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff18,_#ffffff18_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]",
		header: "bg-wsm-dark border-[#ffffff22]",
		grid: "bg-[#ffffff44]",
		empty: "text-gray-400",
	},
	light: {
		wrapper: "bg-gray-50",
		outerBorder: "border-gray-200 bg-[image:repeating-linear-gradient(315deg,_#00000011,_#00000011_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]",
		header: "bg-white border-gray-200",
		grid: "bg-gray-200",
		empty: "text-gray-500",
	},
	blue: {
		wrapper: "bg-[#036588]",
		outerBorder: "border-[#ffffff33] bg-[image:repeating-linear-gradient(315deg,_#ffffff18,_#ffffff18_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]",
		header: "bg-[#03658844] border-[#ffffff33]",
		grid: "bg-[#ffffff22]",
		empty: "text-[#B1E2F5]",
	},
};

export default function ArticleCardSection({
	articles,
	title1,
	title2,
	subtitle,
	emptyText = "No articles yet.",
	theme = "dark",
	dots = false,
	id,
	trail,
}: ArticleCardSectionProps) {
	const s = themeStyles[theme];
	const dotsClass = dots
		? theme === "light" ? "pattern-bg-dots-light" : "pattern-bg-dots"
		: "";

	return (
		<section id={id}>
			<div className={`py-20 lg:py-28 ${s.wrapper} ${dotsClass}`}>
				<div className={`max-w-7xl mx-auto p-4 border-2 border-solid ${s.outerBorder} bg-fixed`}>
					{(title1 || title2 || subtitle) && (
						<SectionHeaderText title1={title1} title2={title2} subtitle={subtitle} theme={theme} vertAlign="center" horzAlign="center" noPad="false" compact="true"/>
					)}
					{articles.length === 0 ? (
						<p className={`${s.empty} italic p-6`}>{emptyText}</p>
					) : (
						<div className={`flex flex-wrap justify-center ${s.grid}`}>
							{articles.map((article) => (
								<ArticleLinkCard
									key={article.sf_id}
									article={article}
									theme={theme}
									trail={trail}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
