import { Link } from "react-router";
import { useEffect, useRef } from "react";
import SectionHeaderText from "./SectionHeaderText";
import Hexagons from "./Hexagons";
import Tag from "./Tag";


interface SimpleHeroSectionProps {
    title1?: string;
    title2?: string;
    subtitle?: string;
    tag?: string;
    theme?: "light" | "dark" | "blue";
    decoration?: string;
}

export default function SimpleHeroSection({  title1, title2, tag, subtitle, theme = "dark", decoration = "none" }: SimpleHeroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    const TagText = tag ? <Tag text={tag} theme={theme} /> : null;

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
    const borderClassleft = isDark || isBlue ? "border-l-0 xl:border-l-3 border-l-white border-l-solid" : "border-l-3 border-l-gray-200 border-l-solid";
    const borderClassright = isDark || isBlue ? "border-r-0 xl:border-r-3 border-r-white border-r-solid" : "border-r-3 border-r-gray-200 border-r-solid";
    const tagClass = isDark || isBlue ? "text-brand-sky" : "text-brand-sky";


   return (
        <section id="expertise-hero" className="bg-gradient-to-br from-[#000] to-wsm-cliff min-h-[55vh] relative overflow-hidden">
            <div className="hidden md:block">
                <Hexagons
                    len={40}
                    randomlen={120}
                    randomlenChance={40}
                    turnangle={60}
                    count={80}
                    baseTime={10}
                    addedTime={60}
                    dieChance={0.01}
                    spawnChance={1}
                    sparkChance={0.1}
                    sparkDist={2}
                    sparkSize={1}
                    color="hsl(hue,100%,light%)"
                    baseLight={70}
                    addedLight={10}
                    shadowToTimePropMult={10}
                    baseLightInputMultiplier={0.01}
                    addedLightInputMultiplier={0.02}
                    repaintAlpha={0.08}
                    hueChange={0.7}
                    followMouse={true}
                />
   
            </div>
            <div className="py-20 lg:py-28 relative z-10 pointer-events-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {TagText}
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                            <span className="text-gray-100">{title1}</span>{" "}<span className="text-brand-sky">{title2}</span>
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );


}
