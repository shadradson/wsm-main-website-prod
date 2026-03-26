import { Link } from "react-router";
import styles from "./SplashSection.module.css";
import Tag from "./Tag";

interface Card {
    title1?: string;
    title2?: string;
    subtitle?: string;
    tag?: string;
    haslink?: boolean;
    buttontext?: string;
    linkUrl?: string;
    infotype?: "tags" | "text";
    infotext?: string;
}

interface SplashSectionProps {
    cards: Card[];
    title?: string;
    subtitle?: string;
    theme?: "light" | "dark" | "blue";
    titlesize: string; // small / normal
    dots?: string;
}

export default function SplashSection({ cards, title, subtitle, titlesize, theme = "dark", dots }: SplashSectionProps) {
    let titlesizeClass = titlesize === "small"? "small" : "normal"
    let dotsclass = "";
    if (dots === "true") {
        if (theme === "light") {
            dotsclass = "pattern-bg-dots-light";
        }
        else {
            dotsclass = "pattern-bg-dots";
        };
    }
    else {
        dotsclass = "";
    };

    return (
        <section className={styles[theme]}>
            <div className={`py-20 lg:py-28 ${dotsclass}`}>
                <div className="">
                    <div className="flex flex-col gap-24">
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className={`card-row`}
                            >
                                <div className="card-outer-flex">
                                    {card.tag && (
                                        <Tag text={card.tag} theme={theme} />
                                    )}
                                    <div className="card-inner-section-title">
                                        {card.title1 && (
                                            <h2 className={`card-title-text ${titlesizeClass} bg-gradient-to-r from-[#a365c1] to-[#0b596d] inline-block text-transparent bg-clip-text`}>
                                                {card.title1}
                                            </h2>
                                        )}
                                        {card.title2 && (
                                            <h2 className={`card-title-text ${titlesizeClass}  text-gray-900`}>
                                                {card.title2}
                                            </h2>
                                        )}
                                        {card.subtitle && (
                                            <p className="text-gray-600 text-[1rem] leading-relaxed">
                                                {card.subtitle}
                                            </p>
                                        )}
                                        <div className="w-full border-2 border-solid border-[#00000011] bg-[image:repeating-linear-gradient(315deg,_#00000011,_#00000011_12px,_transparent_0,_transparent_50%)] bg-[size:24px_24px] bg-fixed min-h-[40px]">
                                        </div>
                                        {card.linkUrl && (
                                            <Link to={card.linkUrl} className="inline-flex items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-navy-800 transition-colors">
                                                {card.buttontext || "Learn More"}
                                            </Link>
                                        )}
                                    </div>
                                    <div className="card-inner-section-text">
                                        {card.infotype === "tags" && card.infotext ? (
                                            <div className="card-single-tag-outer">
                                                {card.infotext.split(",").map((tag) => (
                                                    <div
                                                        key={tag.trim()}
                                                        className="card-single-tag"
                                                    >
                                                        {tag.trim()}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-800 text-[1.15rem] leading-relaxed">
                                                {card.infotext}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );

}
