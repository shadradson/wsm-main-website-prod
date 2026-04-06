import { Link } from "react-router";
import type { ArticleCardData } from "~/lib/types";

export type Theme = "light" | "dark" | "blue";

interface ArticleLinkCardProps {
	article: ArticleCardData;
	theme?: Theme;
	trail?: string;
}

const themeStyles: Record<Theme, {
	card: string;
	cardHover: string;
	border: string;
	borderHover: string;
	imageBorder: string;
	tagBg: string;
	tagText: string;
	productBg: string;
	productText: string;
	title: string;
	subtitle: string;
	description: string;
	author: string;
	authorBorder: string;
	initials: string;
}> = {
	dark: {
		card: "",
		cardHover: "group-hover:bg-[#141b2a]",
		border: "border-gray-600",
		borderHover: "group-hover:border-brand-sky",
		imageBorder: "border-gray-600",
		tagBg: "bg-[#ffffff11] border-[#ffffff22]",
		tagText: "text-wsm-glacier",
		productBg: "bg-[#ffffff08] border-[#ffffff15]",
		productText: "text-gray-400",
		title: "text-white",
		subtitle: "text-wsm-glacier",
		description: "text-gray-400",
		author: "text-gray-500",
		authorBorder: "border-gray-800",
		initials: " text-white",
	},
	light: {
		card: "",
		cardHover: "group-hover:bg-gray-50",
		border: "border-gray-200",
		borderHover: "group-hover:border-brand-sky",
		imageBorder: "border-gray-200",
		tagBg: "bg-[#03658811] border-[#03658822]",
		tagText: "text-wsm-glacier",
		productBg: "bg-gray-100 border-gray-200",
		productText: "text-gray-500",
		title: "text-gray-900",
		subtitle: "text-wsm-glacier",
		description: "text-gray-600",
		author: "text-gray-400",
		authorBorder: "border-gray-200",
		initials: " text-white",
	},
	blue: {
		card: "",
		cardHover: "group-hover:bg-[#03658844]",
		border: "border-[#ffffff33]",
		borderHover: "group-hover:border-white",
		imageBorder: "border-[#ffffff33]",
		tagBg: "bg-[#ffffff11] border-[#ffffff22]",
		tagText: "text-[#B1E2F5]",
		productBg: "bg-[#ffffff08] border-[#ffffff15]",
		productText: "text-[#B1E2F5]",
		title: "text-white",
		subtitle: "text-[#B1E2F5]",
		description: "text-gray-300",
		author: "text-gray-400",
		authorBorder: "border-[#ffffff22]",
		initials: " text-white",
	},
};

export default function ArticleLinkCard({ article, theme = "dark", trail }: ArticleLinkCardProps) {
	const s = themeStyles[theme];
	const initials = `${article.name?.[0] ?? ""}${article.name?.split(" ")?.[1]?.[0] ?? ""}`;
	const href = trail
		? `/article/${article.sf_id}?trail=${encodeURIComponent(trail)}`
		: `/article/${article.sf_id}`;

	return (
		<Link
			to={href}
			className="w-full sm:w-[calc(50%-0.5rem)] min-w-[340px] max-w-[100%] sm:max-w-[50%] grow group p-1 hover:shadow-xl transition-all"
		>
			<div className={`${s.card} ${s.cardHover} border-8 border-solid ${s.border} ${s.borderHover} flex flex-wrap justify-center h-full relative z-10 transition-colors`}>
				<div className={`aspect-square w-[30%] sm:w-1/3 border-r-none sm:border-r-2 ${s.imageBorder} flex items-center justify-center p-2 sm:p-4 md:p-6`}>
					{article.splash_image_url ? (
						<img
							src={article.splash_image_url}
							alt={article.name}
							className="aspect-square object-contain flex-shrink-0 "
						/>
					) : (
						<div className={`aspect-square  ${s.initials} flex items-center justify-center text-xl font-bold flex-shrink-0`}>
							{initials}
						</div>
					)}
				</div>

				<div className="text-center sm:text-left w-[100%] sm:w-2/3 flex flex-col justify-between relative">

					<div className="p-2">
						<h3 className={`text-lg font-bold ${s.title} leading-snug`}>
							{article.name}
						</h3>
						{article.subtitle && (
							<p className={`${s.subtitle} text-sm text-[0.75rem] font-medium mt-1`}>
								{article.subtitle}
							</p>
						)}
						{article.author_first_name && (
						<p className={`text-xs ${s.author} mt-auto pt-3 `}>
							By {article.author_first_name} {article.author_last_name}
							{article.author_title && ` — ${article.author_title}`}
						</p>
						)}
						{/*article.short_description && (
							<p className={`${s.description} text-sm leading-relaxed mt-2 line-clamp-3`}>
								{article.short_description}
							</p>
						)*/}
					</div>
					<div className="flex flex-wrap justify-center sm:justify-start">
						{article.subcategory && (
							<span className={`text-xs font-semibold ${s.tagText} ${s.tagBg} border px-2 py-1`}>
								{article.subcategory}
							</span>
						)}
						{article.vertical_product && (
							<span className={`text-xs font-medium ${s.productText} ${s.productBg} border px-2 py-1`}>
								{article.vertical_product}
							</span>
						)}
					</div>

				</div>
			</div>
		</Link>
	);
}
