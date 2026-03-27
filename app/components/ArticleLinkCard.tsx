import { Link } from "react-router";
import type { ArticleCardData } from "~/lib/types";

export type Theme = "light" | "dark" | "blue";

interface ArticleLinkCardProps {
	article: ArticleCardData;
	theme?: Theme;
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
		card: "bg-wsm-dark",
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
		initials: "bg-gradient-to-br from-brand-sky to-brand-teal text-white",
	},
	light: {
		card: "bg-white",
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
		initials: "bg-gradient-to-br from-brand-sky to-brand-teal text-white",
	},
	blue: {
		card: "bg-[#03658822]",
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
		initials: "bg-gradient-to-br from-brand-sky to-brand-teal text-white",
	},
};

export default function ArticleLinkCard({ article, theme = "dark" }: ArticleLinkCardProps) {
	const s = themeStyles[theme];
	const initials = `${article.name?.[0] ?? ""}${article.name?.split(" ")?.[1]?.[0] ?? ""}`;

	return (
		<Link
			to={`/article/${article.sf_id}`}
			className="w-full sm:w-[calc(50%-0.5rem)] min-w-[340px] grow group p-1 hover:shadow-xl transition-all"
		>
			<div className={`${s.card} ${s.cardHover} border-2 border-solid ${s.border} ${s.borderHover} flex h-full relative z-10 transition-colors`}>
				<div className={`aspect-square max-w-[140px] p-[20px] border-r-2 ${s.imageBorder} flex items-center justify-center`}>
					{article.splash_image_url ? (
						<img
							src={article.splash_image_url}
							alt={article.name}
							className="aspect-square max-w-[100px] object-contain flex-shrink-0"
						/>
					) : (
						<div className={`aspect-square max-w-[100px] ${s.initials} flex items-center justify-center text-xl font-bold flex-shrink-0`}>
							{initials}
						</div>
					)}
				</div>

				<div className="text-left w-2/3 flex flex-col">
					<div className="flex flex-wrap">
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

					<div className="p-2">
						<h3 className={`text-lg font-bold ${s.title} leading-snug`}>
							{article.name}
						</h3>
						{article.subtitle && (
							<p className={`${s.subtitle} text-sm text-[0.75rem] font-medium mt-1`}>
								{article.subtitle}
							</p>
						)}
						{article.short_description && (
							<p className={`${s.description} text-sm leading-relaxed mt-2 line-clamp-3`}>
								{article.short_description}
							</p>
						)}
					</div>

					{article.author_first_name && (
						<p className={`text-xs ${s.author} mt-auto pt-3 px-2 pb-2 border-t ${s.authorBorder}`}>
							By {article.author_first_name} {article.author_last_name}
							{article.author_title && ` — ${article.author_title}`}
						</p>
					)}
				</div>
			</div>
		</Link>
	);
}
