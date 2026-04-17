import ArticleLinkCard from "./ArticleLinkCard";
import type { ArticleCardData } from "~/lib/types";
import SectionHeaderText from "./SectionHeaderText";
import Tag from "./Tag";

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
	tag?: string;
	cardType?: string;
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
		wrapper: "bg-[#000000]",
		outerBorder: "border-[#ffffff22] ",
		header: "bg-wsm-dark border-[#ffffff22]",
		grid: "",
		empty: "text-gray-400",
	},
	light: {
		wrapper: "bg-gray-50",
		outerBorder: "border-gray-200 ",
		header: "bg-white border-gray-200",
		grid: "",
		empty: "text-gray-500",
	},
	blue: {
		wrapper: "bg-[#101622]",
		outerBorder: "border-[#ffffff33] ",
		header: "bg-[#03658844] border-[#ffffff33]",
		grid: "",
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
	tag,
	cardType = "regular",
}: ArticleCardSectionProps) {
	const s = themeStyles[theme];
	const dotsClass = dots
		? theme === "light" ? "pattern-bg-dots-light" : "pattern-bg-dots"
		: "";

	return (
		<section id={id}>
			<div className={`py-10 lg:py-18 ${s.wrapper} relative`}>
				<div className="">
					{(title1 || title2 || subtitle) && (
									<SectionHeaderText title1={title1} title2={title2} subtitle={subtitle} theme={theme} vertAlign="center" horzAlign="center" noPad="false" compact="true" />
								)}
				</div>
				<div className="flex">
					<div className={`flex-1 ${dotsClass}`}>

					</div>
					<div className="max-w-7xl w-[100vw]">
						<div className="relative">
							<Tag text={tag} theme={theme} />
							<div className={` p-4 bg-fixed`}>
								{articles.length === 0 ? (
									<p className={`${s.empty} italic p-6`}>{emptyText}</p>
								) : (
									<div className={`flex flex-wrap justify-center gap-2 ${s.grid} `}>
										{articles.map((article) => (
											<ArticleLinkCard
												key={article.sf_id}
												article={article}
												theme={theme}
												trail={trail}
												cardType={cardType}
											/>
										))}
									</div>
								)}
							</div>
						</div>
						<div className="">

						</div>
					</div>
					<div className={`flex-1 ${dotsClass}`}>

					</div>
				</div>

			</div>
		</section>
	);
}
