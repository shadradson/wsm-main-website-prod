import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/ai-scrape-test";
import { useLoaderData } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
    // Server-only — not visible to the browser

    const letters: Record<string, number[]> = {
        A: [
            0, 0, 1, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
        ],
        B: [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
        ],
        C: [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0,
        ],
        D: [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
        ],
        E: [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
        ],
        F: [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
        ],
        G: [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0,
        ],
        H: [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
        ],
        I: [
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            1, 1, 1, 1, 1,
        ],
        J: [
            0, 0, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0,
        ],
        K: [
            1, 0, 0, 0, 1,
            1, 0, 0, 1, 0,
            1, 0, 1, 0, 0,
            1, 1, 0, 0, 0,
            1, 1, 0, 0, 0,
            1, 0, 1, 0, 0,
            1, 0, 0, 1, 0,
            1, 0, 0, 0, 1,
        ],
        L: [
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
        ],
        M: [
            1, 0, 0, 0, 1,
            1, 1, 0, 1, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
        ],
        N: [
            1, 0, 0, 0, 1,
            1, 1, 0, 0, 1,
            1, 1, 0, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 0, 1, 1,
            1, 0, 0, 1, 1,
            1, 0, 0, 0, 1,
        ],
        O: [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0,
        ],
        P: [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
        ],
        Q: [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 0, 1, 0,
            0, 1, 1, 0, 1,
        ],
        R: [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
            1, 0, 1, 0, 0,
            1, 0, 0, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
        ],
        S: [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0,
        ],
        T: [
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
        ],
        U: [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0,
        ],
        V: [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
            0, 0, 1, 0, 0,
        ],
        W: [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 1, 0, 1, 1,
            1, 0, 0, 0, 1,
        ],
        X: [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
        ],
        Y: [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
        ],
        Z: [
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
        ],
    };
    const words = [
        "strawberry", "mountain", "sunshine", "elephant", "keyboard",
        "volcano", "dolphin", "crystal", "thunder", "compass",
        "horizon", "lantern", "penguin", "whisper", "blanket",
        "cactus", "dragon", "falcon", "galaxy", "jungle",
        "marble", "nebula", "orchid", "puzzle", "quartz",
        "rocket", "salmon", "temple", "umbrella", "walrus",
    ];
    const word = words[Math.floor(Math.random() * words.length)];
    const lettersData = word.toUpperCase().split("").map((char) => letters[char] ?? []);

    let layers = ""; // this will store the layers of divs that contain a word with partial letters.
    for (let i = 0; i < 8; i++) {

        let letterDom = ""; // letterDom will be the divs for the current layer of the letters, which we will append to layers
        lettersData.forEach(letter => {

            let letterdivs = ""; // this will store the divs for the current letter, which we will append to letterDom
            letter.forEach((let_bin, binIdx) => {
                let let_bin_output = binIdx % 8 === i ? let_bin : 0;
                let letter_bin_dom = '<div class="letterb" data-num="' + let_bin_output + '" data-ind="' + binIdx + '" ></div>';
                letterdivs += letter_bin_dom;
            });
            letterDom += '<div class="letter">' + letterdivs + '</div>';
        });
        layers += '<div class="letterlayer layer" data-layer="' + i + '">' + letterDom + '</div>';
    }

    let allLayersDom = '<div class="alllayers">' + layers + '</div>';
    return { html: allLayersDom, width: lettersData.length };
}

export default function AiScrapeTest() {

    const { html, width } = useLoaderData<typeof loader>();
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position as percentage of the container (0 to 1)
    const [mouseX, setMouseX] = useState(() => Math.random());
    const [mouseY, setMouseY] = useState(() => Math.random());
    const [hasMouseEntered, setHasMouseEntered] = useState(false);

    let widthStyle = width * 5 * 10 + "px"; // 5 divs per letter, 10px per div

    const totalLayers = 8;
    // Max pixel offset when mouse is at the edge. Layers align when mouse is at center.
    const maxOffset = 30;

    // Randomize position until mouse enters the screen
    useEffect(() => {
        if (hasMouseEntered) return;
        const interval = setInterval(() => {
            setMouseX(Math.random());
            setMouseY(Math.random());
        }, 100);
        return () => clearInterval(interval);
    }, [hasMouseEntered]);

    // Once the mouse moves, stop randomizing and track the real position
    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            setHasMouseEntered(true);
            const container = containerRef.current;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setMouseX(Math.max(0, Math.min(1, x)));
            setMouseY(Math.max(0, Math.min(1, y)));
        }
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Each layer gets an offset based on its index.
    // At mouse center (0.5, 0.5) all offsets are 0 — the word aligns.
    // Layer 2 (middle) is the anchor with no offset; others spread out from it.
    function getLayerOffset(layerIndex: number) {
        const centerLayer = Math.floor(totalLayers / 2);
        const distanceFromCenter = layerIndex - centerLayer; // e.g. -2, -1, 0, 1, 2
        const offsetX = distanceFromCenter * (mouseX - 0.5) * 2 * maxOffset;
        const offsetY = distanceFromCenter * (mouseY - 0.5) * 2 * maxOffset;
        return `translate(${offsetX}px, ${offsetY}px)`;
    }

    const layerTransforms = Array.from({ length: totalLayers }, (_, i) =>
        `.letterlayer.layer[data-layer="${i}"] { transform: ${getLayerOffset(i)}; }`
    ).join("\n");

    const layerStyle = `
.alllayers {
    position: relative;
}
.letterlayer.layer {
    display: flex;
    gap: 1rem;
    position: absolute;
    transition: transform 0.05s linear;
}
.letter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 2.5rem;
}
.letterb {
    height: 0.5rem;
    width: 0.5rem;
}
.letterb[data-num="1"] {
    background: black;
}
.letterb[data-num="0"] {
    background: transparent;

}
${layerTransforms}
    `;

    return (
        <div ref={containerRef} className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-500">
            <style>{layerStyle}</style>
            <div className={`w-${widthStyle}`} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}