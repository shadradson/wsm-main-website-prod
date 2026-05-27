import { useMemo, useState } from "react";
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
	searchAndFilter?: boolean;
}

const themeStyles: Record<Theme, {
	wrapper: string;
	outerBorder: string;
	header: string;
	grid: string;
	empty: string;
	searchInput: string;
	pillIdle: string;
	pillActive: string;
}> = {
	dark: {
		wrapper: "bg-[#000000]",
		outerBorder: "border-[#ffffff22] ",
		header: "bg-wsm-dark border-[#ffffff22]",
		grid: "",
		empty: "text-gray-400",
		searchInput: "bg-white/5 border-white/15 text-white placeholder-gray-400 focus:border-brand-sky",
		pillIdle: "bg-white/5 border-white/15 text-gray-300 hover:bg-white/10",
		pillActive: "bg-brand-sky border-brand-sky text-black",
	},
	light: {
		wrapper: "bg-gray-50",
		outerBorder: "border-gray-200 ",
		header: "bg-white border-gray-200",
		grid: "",
		empty: "text-gray-500",
		searchInput: "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-brand-blue",
		pillIdle: "bg-white border-gray-300 text-gray-700 hover:bg-gray-100",
		pillActive: "bg-brand-blue border-brand-blue text-white",
	},
	blue: {
		wrapper: "bg-[#101622]",
		outerBorder: "border-[#ffffff33] ",
		header: "bg-[#03658844] border-[#ffffff33]",
		grid: "",
		empty: "text-[#B1E2F5]",
		searchInput: "bg-[#ffffff0a] border-[#ffffff33] text-white placeholder-[#B1E2F5]/60 focus:border-brand-sky",
		pillIdle: "bg-[#ffffff0a] border-[#ffffff33] text-[#B1E2F5] hover:bg-[#ffffff14]",
		pillActive: "bg-brand-sky border-brand-sky text-black",
	},
};

function matchesQuery(article: ArticleCardData, query: string): boolean {
	if (!query) return true;
	const q = query.toLowerCase();
	const fields = [
		article.name,
		article.subtitle,
		article.short_description,
		article.subcategory,
		article.vertical_product,
		article.author_first_name,
		article.author_last_name,
		article.author_title,
	];
	return fields.some((f) => f?.toLowerCase().includes(q));
}

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
	searchAndFilter = false,
}: ArticleCardSectionProps) {
	const s = themeStyles[theme];
	const dotsClass = dots
		? theme === "light" ? "pattern-bg-dots-light" : "pattern-bg-dots"
		: "";

	const [query, setQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	// Categories present in this set of articles (only show buttons for what exists)
	const categories = useMemo(() => {
		const set = new Set<string>();
		for (const a of articles) {
			if (a.article_category) set.add(a.article_category);
		}
		return [...set].sort();
	}, [articles]);

	// When searchAndFilter is off, never apply filters — pass articles through unchanged.
	const filteredArticles = useMemo(() => {
		if (!searchAndFilter) return articles;
		return articles.filter((a) => {
			if (selectedCategory && a.article_category !== selectedCategory) return false;
			if (!matchesQuery(a, query)) return false;
			return true;
		});
	}, [articles, searchAndFilter, selectedCategory, query]);

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
								{searchAndFilter && (
									<div className="mb-4 flex flex-col gap-3">
										<input
											type="search"
											value={query}
											onChange={(e) => setQuery(e.target.value)}
											placeholder="Search articles..."
											aria-label="Search articles"
											className={`w-full px-4 py-2 border rounded outline-none transition-colors ${s.searchInput}`}
										/>
										{categories.length > 0 && (
											<div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
												{categories.map((cat) => {
													const isActive = selectedCategory === cat;
													return (
														<button
															key={cat}
															type="button"
															onClick={() =>
																setSelectedCategory(isActive ? null : cat)
															}
															aria-pressed={isActive}
															className={`px-3 py-1.5 text-sm font-medium border rounded transition-colors ${isActive ? s.pillActive : s.pillIdle}`}
														>
															{cat}
														</button>
													);
												})}
											</div>
										)}
									</div>
								)}
								{filteredArticles.length === 0 ? (
									<p className={`${s.empty} italic p-6`}>{emptyText}</p>
								) : (
									<div className={`flex flex-wrap justify-center gap-2 ${s.grid} `}>
										{filteredArticles.map((article) => (
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
