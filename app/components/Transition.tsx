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
    mountaincolor3?: string;
    suncolor?: string;
}


export default function StatsSection({ type, text, textpos, bgtop, textcolor, bgbottom, mountaincolor, mountaincolor2, mountaincolor3, suncolor }: TransSectionProps) {
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
        const mt3Color = mountaincolor3 || 'black';
        const sunColor = suncolor || 'white';

        return (
            <div style={{ backgroundColor: bgColor }}>
                <div className="splash_mountains">
                    <div className="splash_sun" style={{ top: '10%', left: '70%' }}>

                    </div>
                    <div className="splash_mountain1">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 136492.65 22564.52" className="w-full" style={{ color: mt1Color }}>
                            <polygon fill="currentColor" points="-0,22564.52 9619.52,15202.57 14383.08,18848.19 18967.28,15128.07 24275.64,15094.71 31144.13,9520.87 33587.9,11504 35862.77,9657.92 38096.72,9035.24 43164.48,3934.81 45316.19,3354.9 53149.96,11280.08 55668.95,9878.73 56539.33,10634.79 62945.76,6047.58 64686.51,6827.88 73100.32,0 75312.34,1072.62 78980.94,4772.17 82214.05,3743.76 93334.43,10653.09 96083.62,9190.88 102645.99,8243.67 107137.7,5827.87 111650.85,10609.38 121921.77,11260.03 136492.65,22564.52" />
                        </svg>
                        <div className="splash_mountain1_base w-full h-48 -mt-1" style={{ backgroundColor: mt1Color }}></div>
                    </div>
                    <div className="splash_mountain2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 136492.65 19564.52" className="w-full" style={{ color: mt2Color }}>
                            <polygon fill="currentColor" points="55493.03,14015.46 60167.67,11231.24 62209.71,6990.07 65429.86,6754.45 68021.68,5419.27 70534.97,5654.89 75718.62,0 81548.16,3434.68 87578.18,5890.51 87970.88,8875.04 91269.56,7696.94 102736.42,12723.5 104228.69,10681.46 110197.74,12173.72 115617.01,16414.89 123392.48,17278.83 132581.68,17121.75 137451.17,14922.63 138786.35,16414.89 144048.54,12959.12 150096.13,14687.01 157714.52,6204.67 160149.27,5890.51 165568.54,1649.35 168238.9,78.54 170516.57,1256.65 176878.32,2434.75 180569.7,8796.5 187559.78,14294.31 189430.14,19604.59 -0,19604.59 3540.22,14608.47 5582.27,10917.08 7310.15,11938.1 10137.6,12016.64 11001.54,9346.28 15085.63,4948.03 17127.67,6283.21 19483.87,8482.34 21918.62,7461.32 24667.52,8953.58 34956.28,12016.64 36605.63,11074.16 37312.49,11545.4 43674.24,12880.59 48857.89,10131.68 " />
                        </svg>
                        <div className="splash_mountain2_base w-full h-30 -mt-1" style={{ backgroundColor: mt2Color }}></div>
                    </div>
                    <div className="splash_mountain3">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 189435.71 13817.4" className="w-full" style={{ color: mt3Color }}>
                            <polygon fill="currentColor" points="0.84,13815.63 14436.83,6023.97 17936.99,8228.35 29997.82,3737.18 34172.94,7272.46 39666.65,9673.1 45002.93,7337.48 51171.25,10037.27 56978.16,6159.36 64894.15,6606.53 68339.04,4306 80323.95,9890.09 82734.98,8279.98 87443.74,11424.53 95562.97,9780.72 98066.36,8119.58 98783.13,8956.99 102056.56,10632.59 115712.62,5632.77 119043.49,8013.79 125618.07,3067.74 128554.65,1417.27 129074.17,2440.92 131094.64,3653.82 136540.29,677.18 139589.83,1023.37 140470.43,2.18 149958.23,4596.33 151764.72,3201.74 156463.45,4779.41 157953.69,4772.51 162581.58,7250.37 169704.77,3407.07 171196.94,2099.92 189434.76,13815.63" />
                        </svg>
                        <div className="splash_mountain3_base w-full h-2 -mt-1" style={{ backgroundColor: mt3Color }}></div>
                    </div>
                </div>
            </div>
        );
    }
}
