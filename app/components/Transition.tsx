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
    textcolor?: string;
    bgbottom: string;
    mountaincolor?: string;
    mountaincolor2?: string;
    suncolor?: string;
}


export default function StatsSection({ type, text, textpos, bgtop, textcolor, bgbottom, mountaincolor, mountaincolor2, suncolor }: TransSectionProps) {
    if (type === 'text') {
        if (textpos === 'top') {
            return (
                <div className="transition1" style={{ background: bgbottom }}>
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
                <div className="transition1" style={{ background: bgtop }}>
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
    if (type === 'mountains') {
        const bgColor = bgtop || 'black';
        const mt1Color = mountaincolor || 'black';
        const mt2Color = mountaincolor2 || 'black';
        const sunColor = suncolor || 'white';

        return (
            <div style={{ backgroundColor: bgColor }}>
                <div className="splash_mountains min-h-80 relative overflow-clip">
                    <div className="splash_sun absolute z-0 rounded-full h-30 w-30 bg-gray-40" style={{ top: '10%', left: '70%' }}>
                        
                    </div>
                    <div className="splash_mountain1 absolute bottom-0 z-1 w-full scale-100 flex flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 136492.65 22564.52" className="w-full" style={{ color: mt1Color }}>
                            <polygon fill="currentColor" points="-0,22564.52 9619.52,15202.57 14383.08,18848.19 18967.28,15128.07 24275.64,15094.71 31144.13,9520.87 33587.9,11504 35862.77,9657.92 38096.72,9035.24 43164.48,3934.81 45316.19,3354.9 53149.96,11280.08 55668.95,9878.73 56539.33,10634.79 62945.76,6047.58 64686.51,6827.88 73100.32,0 75312.34,1072.62 78980.94,4772.17 82214.05,3743.76 93334.43,10653.09 96083.62,9190.88 102645.99,8243.67 107137.7,5827.87 111650.85,10609.38 121921.77,11260.03 136492.65,22564.52" />
                        </svg>
                        <div className="splash_mountain1_base w-full h-48 -mt-1" style={{ backgroundColor: mt1Color }}></div>
                    </div>
                    <div className="splash_mountain2 absolute bottom-0 z-2 w-full scale-120">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 189435.71 13817.4" className="w-full" style={{ color: mt2Color }}>
                            <polygon fill="currentColor" points="0.84,13815.63 14436.83,6023.97 17936.99,8228.35 29997.82,3737.18 34172.94,7272.46 39666.65,9673.1 45002.93,7337.48 51171.25,10037.27 56978.16,6159.36 64894.15,6606.53 68339.04,4306 80323.95,9890.09 82734.98,8279.98 87443.74,11424.53 95562.97,9780.72 98066.36,8119.58 98783.13,8956.99 102056.56,10632.59 115712.62,5632.77 119043.49,8013.79 125618.07,3067.74 128554.65,1417.27 129074.17,2440.92 131094.64,3653.82 136540.29,677.18 139589.83,1023.37 140470.43,2.18 149958.23,4596.33 151764.72,3201.74 156463.45,4779.41 157953.69,4772.51 162581.58,7250.37 169704.77,3407.07 171196.94,2099.92 189434.76,13815.63" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}
