import { Link } from "react-router";
import type { ArticleCardData } from "~/lib/types";

export type Theme = "light" | "dark" | "blue";

interface ArticleLinkCardProps {
	article: ArticleCardData;
	theme?: Theme;
	trail?: string;
	cardType?: string;
}

const themeStyles: Record<Theme, {
	cardOuter: string;
	cardHoverGradient: string;
	cardInner: string;
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
		cardOuter: "bg-[#000000]",
		cardHoverGradient: "bg-gradient-to-br from-[#a365c1] to-[#53C4EE]",
		cardInner: "bg-[#111111] ",
		border: "border-gray-800",
		borderHover: "group-hover:border-brand-sky",
		imageBorder: "border-gray-800",
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
		cardOuter: "bg-gray-50",
		cardHoverGradient: "bg-gray-200",
		cardInner: "bg-gray-50",
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
		cardOuter: "bg-[#111111]",
		cardHoverGradient: "bg-gradient-to-br from-[#a365c1] to-[#53C4EE]",
		cardInner: "bg-[#111111]",
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

export default function ArticleLinkCard({ article, theme = "dark", trail, cardType = "regular" }: ArticleLinkCardProps) {
	const s = themeStyles[theme];
	const initials = `${article.name?.[0] ?? ""}${article.name?.split(" ")?.[1]?.[0] ?? ""}`;
	const href = trail
		? `/article/${article.sf_id}?trail=${encodeURIComponent(trail)}`
		: `/article/${article.sf_id}`;

	if (cardType === "regular") {
		return (
			<Link to={href} className="w-full sm:w-[calc(50%-0.5rem)] min-w-[200px] max-w-[100%] sm:max-w-[50%] lg:max-w-[30%] grow group p-0" >
				{/* Outer Box */}
				<div className={`${s.cardOuter} p-1 aspect-[4/3] relative rounded-lg`}>
					{/* Hover gradient overlay */}
					<div className={`${s.cardHoverGradient} absolute inset-0 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-200`} />

					{/* Inner Box */}
					<div className={`${s.cardInner} rounded-sm flex flex-col justify-between gap-4 h-full relative z-10 transition-colors`}>
						{/* Header (Only Image and number) */}
						<div className="relative flex pt-8 px-8 flex-col justify-center flex-1">
							{/* Image or initials box */}
							{article.splash_image_url ? (
								<img
									src={article.splash_image_url}
									alt={article.name}
									className="aspect-square max-h-[100px] object-contain h-[20vw] opacity-50"
								/>
							) : (
								<img
									src={"images/WSM_LOGO_V2_Norm_Wht.svg"}
									alt={article.name}
									className="aspect-square max-h-[100px] object-contain opacity-50"
								/>
							)}
							{article.vertical_product && (
								<span className={`text-xs text-center font-medium ${s.productText} ${s.productBg} flex-1 px-2 py-1 absolute right-0 top-0 `}>
									{article.vertical_product}
								</span>
							)}
						</div>

						{/* Body */}
						<div className="p-2 ">
							{/* Image or initials box */}
							<div className="text-center sm:text-left w-[100%] h-[100%] flex flex-col justify-between relative">


								<h3 className={`text-lg font-bold ${s.title} leading-snug`}>
									{article.name}
								</h3>
								{article.subtitle && (
									<p className={`${s.subtitle} text-sm text-[0.75rem] font-medium`}>
										{article.subtitle}
									</p>
								)}
								{article.author_first_name && (
									<p className={`text-xs ${s.author}`}>
										By {article.author_first_name} {article.author_last_name}
										{article.author_title && ` — ${article.author_title}`}
									</p>
								)}
								{/*article.short_description && (
								<p className={`${s.description} text-sm leading-relaxed mt-2 line-clamp-3`}>
									{article.short_description}
								</p>
							)*/}
								<div className="flex flex-wrap justify-center sm:justify-start">
									{/*article.subcategory && (
							<span className={`text-xs font-semibold ${s.tagText} ${s.tagBg} border px-2 py-1`}>
								{article.subcategory}
							</span>
						)*/}
								</div>

							</div>
						</div>
					</div>

				</div>
			</Link >
		);
	}
	else if (cardType === "compact") {
		return (
			<Link to={href} className="w-full sm:w-[calc(50%-0.5rem)] min-w-[200px] max-w-[100%] sm:max-w-[50%] lg:max-w-[30%] grow group p-0" >
				{/* Outer Box */}
				<div className={`${s.cardOuter} p-1 relative rounded-lg`}>
					{/* Hover gradient overlay */}
					<div className={`${s.cardHoverGradient} absolute inset-0 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-200`} />

					{/* Inner Box */}
					<div className={`${s.cardInner} rounded-sm z-10 transition-colors`}>

						{/* Body */}
						<div className="p-2 ">
							{/* Image or initials box */}
							<div className="text-center sm:text-left w-[100%] h-[100%] flex flex-col justify-between relative">
								<h3 className={`text-md font-bold ${s.title} leading-snug`}>
									{article.name}
								</h3>
								{article.subtitle && (
									<p className={`${s.subtitle} text-sm text-[0.75rem] font-medium`}>
										{article.subtitle}
									</p>
								)}
								{article.author_first_name && (
									<p className={`text-xs ${s.author}`}>
										By {article.author_first_name} {article.author_last_name}
										{article.author_title && ` — ${article.author_title}`}
									</p>
								)}
								{/*article.short_description && (
								<p className={`${s.description} text-sm leading-relaxed mt-2 line-clamp-3`}>
									{article.short_description}
								</p>
							)*/}
								<div className="flex flex-wrap justify-center sm:justify-start">
									{/*article.subcategory && (
							<span className={`text-xs font-semibold ${s.tagText} ${s.tagBg} border px-2 py-1`}>
								{article.subcategory}
							</span>
						)*/}
								</div>

							</div>
						</div>
					</div>

				</div>
			</Link >
		);
	}
}
