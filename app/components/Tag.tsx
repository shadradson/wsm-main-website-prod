import { Link } from "react-router";



interface TagProps {
    text: string;
    theme: "light" | "dark" | "blue";
}


export default function StatsSection({ text, theme = "light" }: TagProps) {
    let textColorClass = "";
    if (theme === "light") {
        textColorClass = "color-wsm-cliff"
    }
    else if (theme === "dark") {
        textColorClass = "color-wsm-glacier"
    }
    else if (theme === "blue") {
        textColorClass = "color-wsm-glacier"
    }


    return (
        <div className={`wsm-tag absolute top-4 -left-19 text-wsm-mountain px-3 py-1 ${textColorClass}`} style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "1rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>
            {text}
		</div>
    );
}
