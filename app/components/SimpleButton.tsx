import { Link } from "react-router";

interface SimpleButtonProps {
	button_text: string;
	aria_label: string;
	link: string;
	theme?: "dark" | "light" | "blue" | "purple";
	horzAlign?: "left" | "center" | "reactive";
	external?: boolean;
	onClick?: () => void;
	type?: "regular" | "schedule";
}

// tw-safelist: content-center content-start text-left text-center text-center lg:text-left p-4

const themeClasses: Record<NonNullable<SimpleButtonProps["theme"]>, string> = {
	dark: "bg-summit-dark text-white hover:bg-navy-800",
	light: "bg-wsm-cliff text-white hover:bg-wsm-mountain",
	blue: "bg-brand-sky text-summit-dark hover:bg-brand-sky/80",
	purple: "bg-[#a365c1] text-white hover:bg-[#8d4fb0]",
};

const typeClasses: Record<NonNullable<SimpleButtonProps["type"]>, string> = {
	regular: "",
	schedule: "rounded-full",
	rounded: "rounded-full",
};

const horzAlignClasses: Record<NonNullable<SimpleButtonProps["horzAlign"]>, string> = {
	left: "text-center justify-start",
	center: "text-center justify-center",
	reactive: "text-center lg:text-left",
};

export default function SimpleButton({
	button_text,
	aria_label,
	link,
	theme = "dark",
	horzAlign = "left",
	external,
	onClick,
	type = "regular",
}: SimpleButtonProps) {
	const isExternal = external ?? /^https?:\/\//.test(link);

	const buttonClasses = [
		"inline-flex items-center px-6 py-3 font-semibold transition-colors",
		themeClasses[theme],
		typeClasses[type],
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2",
	].join(" ");

	return (
		<div className={`p-4 flex-col ${horzAlignClasses[horzAlign]}`}>
			{isExternal ? (
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={aria_label}
					title={aria_label}
					onClick={onClick}
					className={buttonClasses}
				>
					{button_text}
				</a>
			) : (
				<Link
					to={link}
					prefetch="intent"
					aria-label={aria_label}
					title={aria_label}
					onClick={onClick}
					className={buttonClasses}
				>
					{button_text}
				</Link>
			)}
		</div>
	);
}
