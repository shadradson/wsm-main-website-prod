import Card, { type CardData } from "~/components/Card";

interface CardGridProps {
	cards: CardData[];
	title?: string;
	description?: string;
	mode?: "light" | "dark";
}

export default function CardGrid({ cards, title, description, mode = "dark" }: CardGridProps) {
	const isDark = mode === "dark";

	return (
		<section className={isDark ? "bg-wsm-dark" : "bg-gray-50"}>
			<div className={`py-20 lg:py-28 ${isDark ? "pattern-bg-dots" : ""}`}>
				<div className={`max-w-7xl mx-auto p-4 border-2 border-solid ${isDark ? "border-[#ffffff22] bg-[image:repeating-linear-gradient(315deg,_#ffffff18,_#ffffff18_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" : "border-gray-200"}`}>
					{(title || description) && (
						<div className={`p-4 border-2 border-solid ${isDark ? "bg-wsm-dark border-[#ffffff22]" : "bg-white border-gray-200"}`}>
							{title && (
								<h2 className={`text-3xl sm:text-4xl font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
									{title}
								</h2>
							)}
							{description && (
								<p className={`text-lg mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
									{description}
								</p>
							)}
						</div>
					)}
					<div className={`flex flex-wrap justify-center ${isDark ? "bg-[#ffffff44]" : "bg-gray-100"}`}>
						{cards.map((card, i) => (
							<Card key={i} data={card} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
