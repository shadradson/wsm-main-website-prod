import { useEffect, useRef, useState } from "react";

/**
 * ParticleDots — Interactive canvas-based particle animation with optional SVG attractor.
 *
 * Renders a field of small dots that:
 *   1. Drift around with random velocities, bouncing off edges
 *   2. Get repelled (pushed away) by the user's cursor
 *   3. Draw faint lines between nearby particles (closer = more opaque)
 *   4. Optionally attract toward points sampled from an SVG path (forming a shape)
 *
 * Usage:
 *   <ParticleDots />                                          // free-floating dots
 *   <ParticleDots svgPath="M8 3l4 8 5-5 7 14H0z" />          // dots form a mountain shape
 *   <ParticleDots svgPath="..." svgScale={8} svgOffsetX={100} />  // scaled & positioned
 *   <ParticleDots particleCount={400} linkDistance={80} />    // performance tuning
 *
 * SVG Attractor:
 *   When svgPath is provided, points are sampled along the path and each particle
 *   is assigned a "home" point. Particles gently drift toward their home position,
 *   forming the SVG shape. The cursor still repels them — they scatter and reform.
 *   Particles without an SVG home point (if particleCount > sampled points) bounce freely.
 *
 * Place inside a positioned container (relative/absolute) — the canvas fills its parent.
 * SSR-safe: renders nothing on the server, initializes on client only.
 */

interface ParticleDotsProps {
	particleCount?: number; // Total number of dots (default 800)
	color?: string; // Hex color for dots (default "#ffffff33")
	lineColor?: string; // Hex color for connection lines (defaults to color if not set)
	repelRadius?: number; // Pixel radius around cursor that pushes dots away (default 120)
	repelStrength?: number; // How hard the cursor pushes (0-1 range, default 0.08)
	linkDistance?: number; // Max distance (px) to draw lines between free-floating dots (default 60)
	svgLinkDistance?: number; // Max distance (px) to draw lines between SVG-attached dots (default: same as linkDistance)
	svgPath?: string; // SVG path "d" attribute string — particles attract to this shape
	svgScale?: number; // Scale factor for the SVG shape (default 1)
	svgOffsetX?: number; // Horizontal offset in px from center (default 0 = centered)
	svgOffsetY?: number; // Vertical offset in px from center (default 0 = centered)
	svgPoints?: number; // How many particles attach to the SVG (rest float free). Defaults to particleCount.
	attractStrength?: number; // How strongly particles pull toward their SVG home (default 0.015)
	svgFit?: "none" | "height" | "width" | "contain" | "cover"; // Auto-scale SVG to fit canvas dimension (default "none" = use svgScale)
	svgAlign?: "center" | "left" | "right"; // Horizontal alignment of the SVG shape (default "center")
}

export default function ParticleDots({
	particleCount = 800,
	color = "#ffffff33",
	lineColor,
	repelRadius = 120,
	repelStrength = 0.08,
	linkDistance = 60,
	svgLinkDistance,
	svgPath,
	svgScale = 1,
	svgOffsetX = 0,
	svgOffsetY = 0,
	svgPoints,
	attractStrength = 0.015,
	svgFit = "none",
	svgAlign = "center",
}: ParticleDotsProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// SSR guard — we can't access canvas/window on the server, so we wait
	// until the component mounts on the client before doing anything.
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// ── Main effect: sets up canvas, particles, events, and animation loop ──
	useEffect(() => {
		// Don't run on server or before client hydration
		if (!isClient) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		// Use the parent element's dimensions to size the canvas
		const parent = canvas.parentElement;
		if (!parent) return;

		// ── Canvas Setup ──
		// Get the logical (CSS) size from the parent container
		const width = parent.clientWidth;
		const height = parent.clientHeight;

		// Device pixel ratio — cap at 2x so we don't kill performance on 3x screens
		const dpr = Math.min(window.devicePixelRatio, 2);

		// Set the actual pixel dimensions (physical pixels) for crisp rendering
		canvas.width = width * dpr;
		canvas.height = height * dpr;

		// Set the CSS dimensions so it displays at the right size
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Scale the drawing context so we can work in CSS pixels (not physical pixels)
		ctx.scale(dpr, dpr);

		// ── SVG Path Sampling ──
		// If an svgPath is provided, create a hidden SVG element, sample points along
		// the path, scale and position them, then assign as "home" positions for particles.
		let svgHomePoints: { x: number; y: number }[] = [];

		if (svgPath) {
			// Create a temporary SVG namespace element to use the browser's path API
			const svgNS = "http://www.w3.org/2000/svg";
			const svgEl = document.createElementNS(svgNS, "svg");
			const pathEl = document.createElementNS(svgNS, "path");
			pathEl.setAttribute("d", svgPath);
			svgEl.appendChild(pathEl);
			// Must be in the DOM briefly for getTotalLength/getPointAtLength to work
			document.body.appendChild(svgEl);

			const totalLength = pathEl.getTotalLength();

			// Get the bounding box of the raw SVG path (before scaling)
			const bbox = pathEl.getBBox();

			// Sample points along the path — svgPoints controls how many particles get a home,
			// defaults to particleCount (all particles form the shape).
			const numSamples = svgPoints ?? particleCount;
			const rawPoints: { x: number; y: number }[] = [];

			for (let i = 0; i < numSamples; i++) {
				// Evenly distribute sample positions along the path length
				const pt = pathEl.getPointAtLength((i / numSamples) * totalLength);
				rawPoints.push({ x: pt.x, y: pt.y });
			}

			// Remove the temporary SVG from the DOM
			document.body.removeChild(svgEl);

			// ── Compute effective scale ──
			// If svgFit is set, auto-calculate scale from canvas vs SVG bounding box dimensions.
			// Otherwise fall back to the manual svgScale prop.
			let effectiveScale = svgScale;
			if (svgFit === "height") {
				effectiveScale = (height / bbox.height) * svgScale;
			} else if (svgFit === "width") {
				effectiveScale = (width / bbox.width) * svgScale;
			} else if (svgFit === "contain") {
				effectiveScale = Math.min(width / bbox.width, height / bbox.height) * svgScale;
			} else if (svgFit === "cover") {
				effectiveScale = Math.max(width / bbox.width, height / bbox.height) * svgScale;
			}

			// ── Compute horizontal anchor based on svgAlign ──
			const scaledWidth = bbox.width * effectiveScale;
			const bboxCenterX = bbox.x + bbox.width / 2;
			const bboxCenterY = bbox.y + bbox.height / 2;

			let anchorX: number;
			if (svgAlign === "right") {
				// Right edge of SVG shape flush with right edge of canvas
				anchorX = width - scaledWidth / 2 + svgOffsetX;
			} else if (svgAlign === "left") {
				// Left edge of SVG shape flush with left edge of canvas
				anchorX = scaledWidth / 2 + svgOffsetX;
			} else {
				// Center (default)
				anchorX = width / 2 + svgOffsetX;
			}
			const anchorY = height / 2 + svgOffsetY;

			svgHomePoints = rawPoints.map((pt) => ({
				x: (pt.x - bboxCenterX) * effectiveScale + anchorX,
				y: (pt.y - bboxCenterY) * effectiveScale + anchorY,
			}));
		}

		// ── Particle Initialization ──
		// Each particle has: position (x, y), velocity (vx, vy), and optional home point (hx, hy)
		// If svgPath is provided, particles start scattered and attract to their SVG home point.
		// If no svgPath, particles start in a grid and bounce freely.
		interface Particle {
			x: number;
			y: number;
			vx: number;
			vy: number;
			hx: number | null; // home X (SVG attractor point) — null means free-floating
			hy: number | null; // home Y
		}

		const particles: Particle[] = [];

		if (svgHomePoints.length > 0) {
			// ── SVG Mode: first N particles get SVG homes, rest float free ──
			for (let i = 0; i < particleCount; i++) {
				const x = Math.random() * width;
				const y = Math.random() * height;

				const angle = Math.random() * Math.PI * 2;
				const speed = 0.2 + Math.random() * 0.3;

				// Only assign a home if this particle is within the svgPoints count
				const hasHome = i < svgHomePoints.length;
				const home = hasHome ? svgHomePoints[i] : null;

				particles.push({
					x, y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					hx: home ? home.x : null,
					hy: home ? home.y : null,
				});
			}
		} else {
			// ── Free Mode: distribute in a grid (original behavior) ──
			const cols = Math.ceil(Math.sqrt(particleCount * (width / height)));
			const rows = Math.ceil(particleCount / cols);
			const spacingX = width / cols;
			const spacingY = height / rows;

			for (let i = 0; i < particleCount; i++) {
				const col = i % cols;
				const row = Math.floor(i / cols);

				// Place at grid center + random offset (up to 40% of cell size) for organic feel
				const x = col * spacingX + spacingX / 2 + (Math.random() - 0.5) * spacingX * 0.4;
				const y = row * spacingY + spacingY / 2 + (Math.random() - 0.5) * spacingY * 0.4;

				const angle = Math.random() * Math.PI * 2;
				const speed = 0.3 + Math.random() * 0.5;

				particles.push({
					x, y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					hx: null,
					hy: null,
				});
			}
		}

		// ── Mouse Tracking ──
		// We use window-level events (not canvas or parent) because the content
		// overlays the canvas at a higher z-index, which would block events on
		// the canvas itself. Window events always fire regardless of z-index.
		const mouse = { x: -9999, y: -9999 }; // offscreen by default (no repulsion)

		const onMouseMove = (e: MouseEvent) => {
			// Convert global mouse position to canvas-local coordinates
			const rect = canvas.getBoundingClientRect();
			const mx = e.clientX - rect.left;
			const my = e.clientY - rect.top;

			// Only track when cursor is actually over the canvas area
			if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
				mouse.x = mx;
				mouse.y = my;
			} else {
				// Cursor is outside — move tracker offscreen so no repulsion happens
				mouse.x = -9999;
				mouse.y = -9999;
			}
		};

		window.addEventListener("mousemove", onMouseMove);

		// ── Color Parsing ──
		// Extract RGB components from the hex color string for use in rgba()
		const r = parseInt(color.slice(1, 3), 16);
		const g = parseInt(color.slice(3, 5), 16);
		const b = parseInt(color.slice(5, 7), 16);
		const dotColor = `rgba(${r}, ${g}, ${b}, 0.6)`; // dots are drawn at 60% opacity

		// Parse line color separately (falls back to dot color if not provided)
		const lc = lineColor || color;
		const lr = parseInt(lc.slice(1, 3), 16);
		const lg = parseInt(lc.slice(3, 5), 16);
		const lb = parseInt(lc.slice(5, 7), 16);

		// ── Animation Loop ──
		// Runs every frame (~60fps). Updates particle positions, draws dots, draws lines.
		let animationId: number;

		const animate = () => {
			animationId = requestAnimationFrame(animate);

			// Clear the entire canvas each frame (we redraw everything)
			ctx.clearRect(0, 0, width, height);

			// ── Update & Draw Each Particle ──
			for (const p of particles) {
				const hasHome = p.hx !== null && p.hy !== null;

				// -- Cursor Repulsion --
				// Calculate distance from this particle to the mouse cursor
				const dx = p.x - mouse.x;
				const dy = p.y - mouse.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				// Track whether cursor is actively repelling this particle
				let isBeingRepelled = false;

				// If particle is within the repel radius, push it away
				if (dist < repelRadius && dist > 0) {
					isBeingRepelled = true;
					// SVG particles need a stronger push to overcome the attraction pull
					const strength = hasHome ? repelStrength * 3 : repelStrength;
					const force = (1 - dist / repelRadius) * strength;
					// Add force to velocity in the direction AWAY from cursor
					p.vx += (dx / dist) * force;
					p.vy += (dy / dist) * force;
				}

				// -- SVG Attraction --
				// If this particle has a home point, gently pull it back — but ONLY
				// when the cursor isn't actively repelling it. This prevents the two
				// forces from fighting and making the particle appear stuck.
				if (hasHome && !isBeingRepelled) {
					const ahx = p.hx! - p.x; // direction toward home
					const ahy = p.hy! - p.y;
					// Apply a gentle constant pull toward the home position
					p.vx += ahx * attractStrength;
					p.vy += ahy * attractStrength;
				}

				// -- Apply Velocity --
				p.x += p.vx;
				p.y += p.vy;

				// -- Bounce Off Edges --
				if (p.x <= 0) { p.x = 0; p.vx *= -1; }
				if (p.x >= width) { p.x = width; p.vx *= -1; }
				if (p.y <= 0) { p.y = 0; p.vy *= -1; }
				if (p.y >= height) { p.y = height; p.vy *= -1; }

				// -- Speed Limit --
				const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
				const maxSpeed = hasHome ? 4 : 2; // SVG particles can move faster when repelled
				if (speed > maxSpeed) {
					p.vx = (p.vx / speed) * maxSpeed;
					p.vy = (p.vy / speed) * maxSpeed;
				}

				// -- Friction --
				// SVG particles: high friction so they settle into the shape when idle,
				// but lower friction while being repelled so they actually scatter.
				// Free-floating particles: very light friction so they drift indefinitely.
				let friction: number;
				if (hasHome) {
					friction = isBeingRepelled ? 0.98 : 0.96;
				} else {
					friction = 0.9999;
				}
				p.vx *= friction;
				p.vy *= friction;

				// -- Draw the Dot --
				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
				ctx.fillStyle = dotColor;
				ctx.fill();
			}

			// ── Draw Connection Lines Between Nearby Particles ──
			// O(n^2) — reduce particleCount or linkDistance if performance is an issue.
			// Line distance depends on particle types:
			//   - Both free-floating: use linkDistance
			//   - Both SVG-attached: use svgLinkDistance (defaults to linkDistance)
			//   - Mixed (one free, one SVG): use linkDistance (the free-floating distance)
			const effectiveSvgLinkDistance = svgLinkDistance ?? linkDistance;
			ctx.lineWidth = 0.5;

			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const a = particles[i];
					const b = particles[j];

					const aHasHome = a.hx !== null;
					const bHasHome = b.hx !== null;

					// Pick the link distance based on particle types:
					// Both SVG → svgLinkDistance; otherwise → linkDistance
					const maxDist = (aHasHome && bHasHome) ? effectiveSvgLinkDistance : linkDistance;

					const ldx = a.x - b.x;
					const ldy = a.y - b.y;
					const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

					if (ldist < maxDist) {
						// Opacity: 0.4 when touching, fades to 0 at maxDist
						const opacity = (1 - ldist / maxDist) * 0.4;

						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${opacity})`;
						ctx.stroke();
					}
				}
			}
		};

		// Kick off the animation
		animate();

		// ── Resize Handler ──
		const onResize = () => {
			const w = parent.clientWidth;
			const h = parent.clientHeight;
			const d = Math.min(window.devicePixelRatio, 2);
			canvas.width = w * d;
			canvas.height = h * d;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.scale(d, d);
		};

		window.addEventListener("resize", onResize);

		// ── Cleanup ──
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("resize", onResize);
		};
	}, [isClient, particleCount, color, lineColor, repelRadius, repelStrength, linkDistance, svgLinkDistance, svgPath, svgScale, svgOffsetX, svgOffsetY, svgPoints, attractStrength, svgFit, svgAlign]);

	// Don't render anything on the server (SSR returns null)
	if (!isClient) return null;

	// The wrapper div fills its parent (absolute inset-0) and sits behind content (z-index 0).
	return (
		<div className="absolute inset-0" style={{ zIndex: 0 }}>
			<canvas ref={canvasRef} className="block w-full h-full" />
		</div>
	);
}
