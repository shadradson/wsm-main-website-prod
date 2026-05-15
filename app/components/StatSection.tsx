import { Link } from "react-router";
import styles from "./StatSection.module.css";

interface Stat {
    value: string;
    label: string;
    link?: string;
}

interface StatsSectionProps {
    stats: Stat[];
    title?: string;
    subtitle?: string;
    tag?: string;
    theme?: "light" | "dark" | "blue";
    dots?: string;
}


export default function StatsSection({ stats, title, subtitle, tag, theme = "dark", dots }: StatsSectionProps) {

    const dotsclass = dots === "true" ? "pattern-bg-dots" : "";
    const floatingFinsColor = theme === "blue" || theme === "light"? "#cccccc" : "#000000";


    return (
        <section className={styles[theme]}>
            <div className="stat-inner">
                <div className={`h-20`}></div>
                <div className="stat-border-row flex flex-row">
                    <div className={`flex-2 ${dotsclass}`} />
                    <div className="max-w-7xl mx-auto relative">
                        {tag && (
                            <div className="wsm-tag absolute top-4 -left-19 px-3 py-1" style={{ fontFamily: "Gabato, sans-serif", fontWeight: 900, fontSize: "1.25rem", writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em" }}>
                                {tag}
                            </div>
                        )}
                        {/*<div className="absolute top-0 -left-10 w-10 h-[100%]" style={{ borderLeft: `2px solid ${floatingFinsColor}`, backgroundImage: `repeating-linear-gradient(315deg, ${floatingFinsColor}, ${floatingFinsColor} 1px, transparent 0, transparent 50%)`, backgroundSize: "10px 10px", backgroundAttachment: "fixed" }}></div>*/}
                        {title && (
                            <h2 className="stat-title text-6xl font-bold text-center m-12">{title}</h2>
                        )}
                        {subtitle && (
                            <p className="stat-subtitle text-lg text-center mb-12">{subtitle}</p>
                        )}
                        <div className="flex flex-wrap">
                            {stats.map((stat) => (
                                <div key={stat.label} className="stat-cell text-center min-w-[300px] flex-1 flex justify-center items-center">
                                    <div className="p-8">
                                        <p className="stat-value text-6xl font-bold">{stat.value}</p>
                                        <p className="stat-label font-bold mt-2">{stat.label}</p>
                                        {stat.link && (
                                            <Link to={stat.link} aria-label={`Learn more about ${stat.label}`} className="text-brand-sky text-sm mt-2 inline-block hover:underline">
                                                Learn more
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*<div className="absolute top-0 -right-10 w-10 h-[100%]" style={{ borderRight: `2px solid ${floatingFinsColor}`, backgroundImage: `repeating-linear-gradient(315deg, ${floatingFinsColor}, ${floatingFinsColor} 1px, transparent 0, transparent 50%)`, backgroundSize: "10px 10px", backgroundAttachment: "fixed" }}></div>*/}
                    </div>
                    <div className={`flex-2 ${dotsclass}`} />
                </div>
                <div className={`h-20`}></div>
            </div>
        </section>
    );
}
