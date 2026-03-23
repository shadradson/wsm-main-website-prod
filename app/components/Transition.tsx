import { Link } from "react-router";

interface Trans {
    value: string;
    label: string;
    link?: string;
}

interface TransSectionProps {
    type: string; // text, mountains
    text: string;
    textpos: string; // top, bot
    bgtop: string;
    textcolor: string;
    bgbottom: string;

}


export default function StatsSection({ type, text, textpos, bgtop, textcolor, bgbottom }: StatsSectionProps) {
    if (type === 'text') {
        if (textpos === 'top') {
            return (
                <div className="transition1" style={{background: bgbottom}}>
                    <div className="translayer midlay t1_lay5">
                        <div className="splash_tag_box">
                            <div className="splash_tag_text" style={{ color: textcolor }}>
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (textpos === 'bot') {
            return (
                <div className="transition1" style={{background: bgtop}}>
                    <div className="translayer midlay t1_lay5">
                        <div className="splash_tag_box">
                            <div className="splash_tag_text" style={{ color: textcolor }}>
                                {text}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    else {
    }
}
