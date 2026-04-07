import { useEffect, useRef, useState } from "react";

/**
 * Hexagons — Canvas-based hexagonal line animation.
 *
 * Renders glowing lines that walk in hexagonal steps from the center,
 * with sparks and hue-cycling color.
 *
 * Place inside a positioned container (relative/absolute) — the canvas fills its parent.
 * SSR-safe: renders nothing on the server.
 */

interface HexagonProps {
	len?: number;
	randomlen?: number;
	randomlenChance?: number;
	turnangle?: number;
	count?: number;
	baseTime?: number;
	addedTime?: number;
	dieChance?: number;
	spawnChance?: number;
	sparkChance?: number;
	sparkDist?: number;
	sparkSize?: number;
	color?: string;
	baseLight?: number;
	addedLight?: number;
	shadowToTimePropMult?: number;
	baseLightInputMultiplier?: number;
	addedLightInputMultiplier?: number;
	repaintAlpha?: number;
	hueChange?: number;
	followMouse?: boolean;
}

export default function Hexagons({
	len = 40,
	randomlen = 120,
	randomlenChance = 10,
	turnangle = 10,
	count = 10,
	baseTime = 10,
	addedTime = 60,
	dieChance = 0.05,
	spawnChance = 1,
	sparkChance = 0.1,
	sparkDist = 10,
	sparkSize = 2,
	color = "hsl(hue,100%,light%)",
	baseLight = 50,
	addedLight = 10,
	shadowToTimePropMult = 6,
	baseLightInputMultiplier = 0.01,
	addedLightInputMultiplier = 0.02,
	repaintAlpha = 0.04,
	hueChange = 0.1,
	followMouse = false,
}: HexagonProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const parent = canvas.parentElement;
		if (!parent) return;

		let w = parent.clientWidth;
		let h = parent.clientHeight;

		canvas.width = w;
		canvas.height = h;
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const opts = {
			len, randomlen, randomlenChance, turnangle, count, baseTime, addedTime, dieChance, spawnChance,
			sparkChance, sparkDist, sparkSize, color, baseLight, addedLight,
			shadowToTimePropMult, baseLightInputMultiplier, addedLightInputMultiplier,
			repaintAlpha, hueChange,
			cx: w / 2,
			cy: h / 2,
		};

		let tick = 0;
		const lines: Line[] = [];
		let dieX = w / 2 / opts.len;
		let dieY = h / 2 / opts.len;
		const baseRad = (opts.turnangle * Math.PI) / 180;
		//console.log("Hexagons turnangle:", opts.turnangle, "baseRad:", baseRad);
		let mouseX = w / 2;
		let mouseY = h / 2;
		let mouseOver = false;

		ctx.clearRect(0, 0, w, h);

		class Line {
			x = 0;
			y = 0;
			addedX = 0;
			addedY = 0;
			rad = 0;
			stepLen = opts.len;
			lightInputMultiplier = 0;
			cumulativeTime = 0;
			lineColor = "";
			time = 0;
			targetTime = 0;

			constructor() {
				this.reset();
			}

			reset() {
				this.x = 0;
				this.y = 0;
				this.addedX = 0;
				this.addedY = 0;
				this.rad = 0;
				this.lightInputMultiplier =
					opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
				this.lineColor = opts.color.replace("hue", String(tick * opts.hueChange));
				this.cumulativeTime = 0;
				this.beginPhase();
			}

			beginPhase() {
				this.x += this.addedX;
				this.y += this.addedY;
				this.time = 0;
				this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
				this.stepLen = Math.random() * 100 < opts.randomlenChance ? opts.randomlen : opts.len;

				if (followMouse && mouseOver) {
					// Direction from this particle's world position to the mouse
					const px = opts.cx + this.x * this.stepLen;
					const py = opts.cy + this.y * this.stepLen;
					const toMouseAngle = Math.atan2(mouseY - py, mouseX - px);
					// Pick the hex direction (CW or CCW) closest to the mouse
					const cwRad = this.rad + baseRad;
					const ccwRad = this.rad - baseRad;
					const cwDiff = Math.abs(Math.atan2(Math.sin(cwRad - toMouseAngle), Math.cos(cwRad - toMouseAngle)));
					const ccwDiff = Math.abs(Math.atan2(Math.sin(ccwRad - toMouseAngle), Math.cos(ccwRad - toMouseAngle)));
					this.rad += baseRad * (cwDiff < ccwDiff ? 1 : -1);
				} else {
					this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
				}

				this.addedX = Math.cos(this.rad);
				this.addedY = Math.sin(this.rad);

				if (
					Math.random() < opts.dieChance ||
					this.x > dieX || this.x < -dieX ||
					this.y > dieY || this.y < -dieY
				) {
					this.reset();
				}
			}

			step() {
				++this.time;
				++this.cumulativeTime;

				if (this.time >= this.targetTime) this.beginPhase();

				const prop = this.time / this.targetTime;
				const wave = Math.sin((prop * Math.PI) / 2);
				const x = this.addedX * wave;
				const y = this.addedY * wave;

				ctx!.shadowBlur = prop * opts.shadowToTimePropMult;
				const lightVal = opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier);
				const fillColor = this.lineColor.replace("light", String(lightVal));
				ctx!.fillStyle = fillColor;
				ctx!.shadowColor = fillColor;
				ctx!.fillRect(
					opts.cx + (this.x + x) * this.stepLen,
					opts.cy + (this.y + y) * this.stepLen,
					2, 2
				);

				if (Math.random() < opts.sparkChance) {
					ctx!.fillRect(
						opts.cx + (this.x + x) * this.stepLen + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2,
						opts.cy + (this.y + y) * this.stepLen + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2,
						opts.sparkSize, opts.sparkSize
					);
				}
			}
		}

		let animationId: number;

		function loop() {
			animationId = window.requestAnimationFrame(loop);
			++tick;

			ctx!.globalCompositeOperation = "destination-out";
			ctx!.shadowBlur = 0;
			ctx!.fillStyle = `rgba(0,0,0,${opts.repaintAlpha})`;
			ctx!.fillRect(0, 0, w, h);
			ctx!.globalCompositeOperation = "lighter";

			if (lines.length < opts.count && Math.random() < opts.spawnChance) {
				lines.push(new Line());
			}

			lines.forEach((line) => line.step());
		}

		loop();

		function onMouseMove(e: MouseEvent) {
			const rect = canvas!.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
		function onMouseEnter() { mouseOver = true; }
		function onMouseLeave() { mouseOver = false; }

		if (followMouse) {
			canvas.addEventListener("mousemove", onMouseMove);
			canvas.addEventListener("mouseenter", onMouseEnter);
			canvas.addEventListener("mouseleave", onMouseLeave);
		}

		function onResize() {
			w = parent!.clientWidth;
			h = parent!.clientHeight;
			canvas!.width = w;
			canvas!.height = h;
			canvas!.style.width = `${w}px`;
			canvas!.style.height = `${h}px`;
			ctx!.clearRect(0, 0, w, h);
			opts.cx = w / 2;
			opts.cy = h / 2;
			dieX = w / 2 / opts.len;
			dieY = h / 2 / opts.len;
		}

		window.addEventListener("resize", onResize);

		return () => {
			cancelAnimationFrame(animationId);
			canvas!.removeEventListener("mousemove", onMouseMove);
			canvas!.removeEventListener("mouseenter", onMouseEnter);
			canvas!.removeEventListener("mouseleave", onMouseLeave);
			window.removeEventListener("resize", onResize);
		};
	}, [
		isClient, len, randomlen, randomlenChance, turnangle, count, baseTime, addedTime, dieChance, spawnChance,
		sparkChance, sparkDist, sparkSize, color, baseLight, addedLight,
		shadowToTimePropMult, baseLightInputMultiplier, addedLightInputMultiplier,
		repaintAlpha, hueChange, followMouse,
	]);

	if (!isClient) return null;

	return (
		<div className="absolute inset-0" style={{ zIndex: 0 }}>
			<canvas ref={canvasRef} className="block w-full h-full" />
		</div>
	);
}
