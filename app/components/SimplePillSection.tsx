import { Link } from "react-router";
import { useEffect, useRef } from "react";
import SectionHeaderText from "./SectionHeaderText";
import Tag from "./Tag";

interface Pill {
    linkUrl?: string;
    buttontext: string;
}

interface SimplePillSectionProps {
    pills: Pill[];
    title1?: string;
    title2?: string;
    subtitle?: string;
    imageUrl?: string;
    tag?: string;
    type?: "pills" | "imgpills";
    theme?: "light" | "dark" | "blue";
    dots?: string;
}

export default function SimplePillSection({ pills, title1, title2, tag, subtitle, imageUrl, type, theme = "dark", dots }: SimplePillSectionProps) {
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
    const borderClasstop = isDark || isBlue ? "border-t-0 md:border-t-3 border-t-white border-t-solid" : "border-t-3 border-t-gray-200 border-t-solid";
    const borderClassbot = isDark || isBlue ? "border-b-0 md:border-b-3 border-b-white border-b-solid" : "border-b-3 border-b-gray-200 border-b-solid";
    const borderClassleft = isDark || isBlue ? "border-l-0 md:border-l-3 border-l-white border-l-solid" : "border-l-3 border-l-gray-200 border-l-solid";
    const borderClassright = isDark || isBlue ? "border-r-0 md:border-r-3 border-r-white border-r-solid" : "border-r-3 border-r-gray-200 border-r-solid";
    const tagClass = isDark || isBlue ? "text-brand-sky" : "text-brand-sky";

    if (type === "pills") {
        return (
            <section id="team-certifications" className="bg-gradient-to-b from-gray-100 to-gray-300 flex">
                <div className="flex flex-col flex-1">
                    <div className="py-20 lg:py-28">
                        <div className="max-w-7xl mx-auto py-8 relative">
                            <div className="flex flex-row flex-wrap">
                                <SectionHeaderText
                                    title1={title1}
                                    title2={title2}
                                    subtitle={subtitle}
                                    theme={theme}
                                    titlemultiline="true"
                                />
                                <div className="flex-1">
                                    {/* Salesforce Partner Badge */}
                                    <div className="flex justify-center mb-12">
                                        <div className="p-4 rounded-[20px] w-full max-w-[200px] flex flex-col justify-between items-center gap-4 shadow-[6px_6px_3px_rgba(0,0,0,0.15)] bg-wsm-light-blue">
                                            <div className="w-4/5">
                                                <img src="/images/Salesforce logo.svg" alt="Salesforce" />
                                            </div>
                                            <div className="text-center text-wsm-dark">
                                                <p className="text-[2rem] font-black leading-[2rem]">PARTNER</p>
                                            </div>
                                            <div className="text-center text-wsm-dark">
                                                <p className="text-[1.75rem] font-bold leading-[1.75rem]">SINCE 2023</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center">
                                {pills.map((pill) => (
                                    <div key={pill.buttontext}
                                        className="p-2.5  flex-1 flex justify-center">
                                        <div className="px-5 py-2.5 bg-gray-50 rounded-full shadow-md shadow-md h-[100%] flex items-center justify-center w-fit min-w-[120px]">
                                            <span className="text-sm font-[700] text-gray-700 whitespace-nowrap">
                                                {pill.buttontext}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    else if (type === "imgpills") {
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

        )
    }


}
