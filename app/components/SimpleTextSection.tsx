import { Link } from "react-router";
import { useEffect, useRef } from "react";
import SectionHeaderText from "./SectionHeaderText";
import Tag from "./Tag";

interface Card {
    title1?: string;
    title2?: string;
    subtitle?: string;
    tag?: string;
    linkUrl?: string;
    buttontext?: string;
    imageUrl?: string;
}

interface SimpleTextSectionProps {
    cards: Card[];
    title1?: string;
    title2?: string;
    subtitle?: string;
    imageUrl?: string;
    tag?: string;
    type?: "2bar" | "VCards";
    theme?: "light" | "dark" | "blue";
    dots?: string;
}

export default function SimpleTextSection({ cards, title1, title2, tag, subtitle, imageUrl, type, theme = "dark", dots }: SimpleTextSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const cards = el.querySelectorAll(".corner-card");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("corner-animate");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    let dotsclass = "";
    if (dots === "true") {
        dotsclass = theme === "light" ? "pattern-bg-dots-light" : "pattern-bg-dots";
    }

    const isDark = theme === "dark";
    const isBlue = theme === "blue";
    const bgClass = isDark ? "bg-black" : isBlue ? "bg-[#036588]" : "bg-gray-100";
    const title1Class = isDark || isBlue ? "text-white" : "bg-gradient-to-r from-[#a365c1] to-[#0b596d] inline-block text-transparent bg-clip-text"
    const textClass = isDark || isBlue ? "text-white" : "text-gray-900";
    const strokeClass = isDark || isBlue ? "stroke-white" : "stroke-gray-400";
    const subtextClass = isDark || isBlue ? "text-gray-300" : "text-gray-600";
    const borderClass = isDark || isBlue ? "border-3 border-white border-solid" : "border-3 border-gray-200 border-solid";
    const borderClasstop = isDark || isBlue ? "border-t-3 border-t-white border-t-solid" : "border-t-3 border-t-gray-200 border-t-solid";
    const borderClassbot = isDark || isBlue ? "border-b-3 border-b-white border-b-solid" : "border-b-3 border-b-gray-200 border-b-solid";
    const borderClassleft = isDark || isBlue ? "border-l-3 border-l-white border-l-solid" : "border-l-3 border-l-gray-200 border-l-solid";
    const borderClassright = isDark || isBlue ? "border-r-3 border-r-white border-r-solid" : "border-r-3 border-r-gray-200 border-r-solid";
    const tagClass = isDark || isBlue ? "text-brand-sky" : "text-brand-sky";

    if (type === "2bar") {
        return (
            <section className={bgClass}>
                <div className={``}>
                    <div className={`h-20 lg:h-28 ${dotsclass} ${borderClassbot} `}></div>
                    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative ${borderClassleft} ${borderClassright}`}>
                        <div className="flex flex-col gap-16">
                            <div
                                className={`relative flex flex-col lg:flex-row items-stretch `}
                            >
                                <Tag text={tag} theme={theme} />

                                <SectionHeaderText title1={title1} title2={title2} subtitle={subtitle} theme={theme} vertAlign="center" noPad="true"/>
                                <div className={`p-8 lg:p-16 flex items-center justify-center`}>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt={title1 || ""} className="aspect-sqare max-w-[400px]" />
                                    ) : (
                                        <div className={`w-full border-2 border-solid border-[#00000011] bg-[image:repeating-linear-gradient(315deg,_#00000011,_#00000011_12px,_transparent_0,_transparent_50%)] bg-[size:24px_24px] bg-fixed min-h-[200px] object-contain`} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`h-20 lg:h-28 ${dotsclass} ${borderClasstop} `}></div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className={bgClass}>
            <div className={``}>
                <div className={`h-20 lg:h-28 ${dotsclass} ${borderClassbot} `}></div>
                <div className={`max-w-7xl mx-auto relative ${borderClassleft} ${borderClassright}`}>
                    <div className="flex flex-col gap-16">
                        <div className={`flex flex-col gap-4 p-8 lg:p-16 text-center`}>
                            <SectionHeaderText title1={title1} title2={title2} subtitle={subtitle} theme={theme} horzAlign="left" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        {cards.map((card, i) => (
                            <div key={i} className={`flex flex-col items-start relative corner-card p-2 sm:p-4 lg:p-6 ${borderClassbot} ${borderClasstop}`}>
                                {card.tag && (
                                    <Tag text={card.tag} theme={theme} />
                                )}
                                {/* Corner brackets */}
                                <svg className="w-4 h-4 corner-tl" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path className={strokeClass} strokeWidth="8" d="M0 20V0h20" />
                                </svg>
                                <svg className="w-4 h-4 corner-tr" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path className={strokeClass} strokeWidth="8" d="M20 20V0H0" />
                                </svg>
                                <svg className="w-4 h-4 corner-bl" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path className={strokeClass} strokeWidth="8" d="M0 0v20h20" />
                                </svg>
                                <svg className="w-4 h-4 corner-br" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path className={strokeClass} strokeWidth="8" d="M20 0v20H0" />
                                </svg>

                                <div className="p-2 sm:p-4">
                                    <div className="bg-white p-2 sm:p-4 md:p-6 lg:p-8">
                                        <div className="flex flex-col gap-2">
                                            {card.title1 && (
                                                <h2 className={`text-3xl sm:text-4xl font-bold ${textClass}`}>
                                                    {card.title1}
                                                </h2>
                                            )}
                                            {card.title2 && (
                                                <h2 className={`text-3xl sm:text-4xl font-bold ${textClass}`}>
                                                    {card.title2}
                                                </h2>
                                            )}
                                            {card.subtitle && (
                                                <p className={`text-lg leading-relaxed ${subtextClass}`}>
                                                    {card.subtitle}
                                                </p>
                                            )}
                                            {card.linkUrl && (
                                                <Link to={card.linkUrl} className="inline-flex self-start items-center px-6 py-3 bg-summit-dark text-white font-semibold hover:bg-wsm-mountain transition-colors">
                                                    {card.buttontext || "Learn More"}
                                                </Link>
                                            )}
                                        </div>
                                        {card.imageUrl && (
                                            <div className="lg:w-1/2">
                                                <img src={card.imageUrl} alt={card.title1 || ""} className="w-full h-auto" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`h-20 lg:h-28 ${dotsclass} ${borderClasstop} `}></div>
            </div>
        </section>

    );
}
