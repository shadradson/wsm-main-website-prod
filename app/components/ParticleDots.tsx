import { useEffect, useRef, useState } from "react";

/**
 * ParticleDots — Interactive canvas-based particle animation.
 *
 * Renders a field of small dots that:
 *   1. Drift around with random velocities, bouncing off edges
 *   2. Get repelled (pushed away) by the user's cursor
 *   3. Draw faint lines between nearby particles (closer = more opaque)
 *
 * Usage:
 *   <ParticleDots />                              // all defaults
 *   <ParticleDots particleCount={400} />           // fewer dots (better perf)
 *   <ParticleDots linkDistance={80} />              // longer connection lines
 *   <ParticleDots repelRadius={200} repelStrength={0.15} />  // bigger/stronger push
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
	linkDistance?: number; // Max distance (px) to draw lines between dots (default 60)
}

export default function ParticleDots({
	particleCount = 800,
	color = "#ffffff33",
	lineColor,
	repelRadius = 120,
	repelStrength = 0.08,
	linkDistance = 60,
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

		// ── Particle Initialization ──
		// Distribute particles in a rough grid so they start evenly spread,
		// with some randomness so it doesn't look perfectly uniform.
		const cols = Math.ceil(Math.sqrt(particleCount * (width / height))); // columns based on aspect ratio
		const rows = Math.ceil(particleCount / cols); // rows to fill the rest
		const spacingX = width / cols; // horizontal distance between grid cells
		const spacingY = height / rows; // vertical distance between grid cells

		// Each particle has: position (x, y) and velocity (vx, vy)
		const particles: { x: number; y: number; vx: number; vy: number }[] = [];

		for (let i = 0; i < particleCount; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			// Place at grid center + random offset (up to 40% of cell size) for organic feel
			const x = col * spacingX + spacingX / 2 + (Math.random() - 0.5) * spacingX * 0.4;
			const y = row * spacingY + spacingY / 2 + (Math.random() - 0.5) * spacingY * 0.4;

			// Random direction and speed so particles drift in all directions
			const angle = Math.random() * Math.PI * 2;
			const speed = 0.3 + Math.random() * 0.5; // between 0.3 and 0.8 px/frame

			particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed });
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
				// -- Cursor Repulsion --
				// Calculate distance from this particle to the mouse cursor
				const dx = p.x - mouse.x; // horizontal distance (positive = particle is right of cursor)
				const dy = p.y - mouse.y; // vertical distance (positive = particle is below cursor)
				const dist = Math.sqrt(dx * dx + dy * dy); // straight-line distance

				// If particle is within the repel radius, push it away
				if (dist < repelRadius && dist > 0) {
					// Force is strongest at the cursor (1.0) and fades to 0 at the edge of repelRadius
					const force = (1 - dist / repelRadius) * repelStrength;
					// Add force to velocity in the direction AWAY from cursor (dx/dist normalizes direction)
					p.vx += (dx / dist) * force;
					p.vy += (dy / dist) * force;
				}

				// -- Apply Velocity --
				// Move the particle by its current velocity
				p.x += p.vx;
				p.y += p.vy;

				// -- Bounce Off Edges --
				// If a particle hits a wall, reverse its velocity on that axis (like a billiard ball)
				if (p.x <= 0) { p.x = 0; p.vx *= -1; }
				if (p.x >= width) { p.x = width; p.vx *= -1; }
				if (p.y <= 0) { p.y = 0; p.vy *= -1; }
				if (p.y >= height) { p.y = height; p.vy *= -1; }

				// -- Speed Limit --
				// Cap velocity so cursor-repelled particles don't fly off too fast
				const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
				const maxSpeed = 2; // max pixels per frame
				if (speed > maxSpeed) {
					p.vx = (p.vx / speed) * maxSpeed;
					p.vy = (p.vy / speed) * maxSpeed;
				}

				// -- Friction --
				// Tiny drag (0.01% per frame) so particles don't accelerate forever,
				// but light enough that they keep drifting indefinitely
				p.vx *= 0.9999;
				p.vy *= 0.9999;

				// -- Draw the Dot --
				ctx.beginPath();
				ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); // 1.5px radius circle
				ctx.fillStyle = dotColor;
				ctx.fill();
			}

			// ── Draw Connection Lines Between Nearby Particles ──
			// For every pair of particles, if they're close enough, draw a line.
			// Opacity is based on distance: closer = more visible, farther = more transparent.
			// NOTE: This is O(n^2) — with 800 particles that's ~320k checks per frame.
			// If performance is an issue, reduce particleCount or linkDistance.
			ctx.lineWidth = 0.5;

			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const a = particles[i];
					const b = particles[j];

					// Distance between the two particles
					const ldx = a.x - b.x;
					const ldy = a.y - b.y;
					const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

					// Only draw a line if they're within linkDistance
					if (ldist < linkDistance) {
						// Opacity: 0.4 when touching, fades to 0 at linkDistance
						const opacity = (1 - ldist / linkDistance) * 0.4;

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
		// When the window resizes, update canvas dimensions to match.
		// (Doesn't reposition particles — they just keep bouncing in the new bounds.)
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
		// When the component unmounts or props change, stop the animation
		// and remove all event listeners to prevent memory leaks.
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("resize", onResize);
		};
	}, [isClient, particleCount, color, lineColor, repelRadius, repelStrength, linkDistance]);

	// Don't render anything on the server (SSR returns null)
	if (!isClient) return null;

	// The wrapper div fills its parent (absolute inset-0) and sits behind content (z-index 0).
	// The actual <canvas> element fills this wrapper.
	return (
		<div className="absolute inset-0" style={{ zIndex: 0 }}>
			<canvas ref={canvasRef} className="block w-full h-full" />
		</div>
	);
}
