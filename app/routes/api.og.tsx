import type { Route } from "./+types/api.og";
import satori from "satori";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import resvgWasm from "../../node_modules/@resvg/resvg-wasm/index_bg.wasm";

// ── Module-level cache (survives across requests in a warm Worker instance) ──
let wasmReady: Promise<void> | null = null;
let fontBold: ArrayBuffer | null = null;
let fontRegular: ArrayBuffer | null = null;

async function ensureInit() {
	if (!wasmReady) {
		wasmReady = Promise.all([
			initWasm(resvgWasm),
			fetch(
				"https://cdn.jsdelivr.net/npm/@fontsource/montserrat@5.1.1/files/montserrat-latin-700-normal.woff2"
			)
				.then((r) => r.arrayBuffer())
				.then((ab) => {
					fontBold = ab;
				}),
			fetch(
				"https://cdn.jsdelivr.net/npm/@fontsource/montserrat@5.1.1/files/montserrat-latin-400-normal.woff2"
			)
				.then((r) => r.arrayBuffer())
				.then((ab) => {
					fontRegular = ab;
				}),
		]).then(() => undefined);
	}
	return wasmReady;
}

// ── Card dimensions ──────────────────────────────────────────────────────────
const W = 1200;
const H = 630;

// ── Brand colors ─────────────────────────────────────────────────────────────
const NAVY = "#0D273C";
const BLUE = "#336d8b";
const SKY = "#B1E2F5";
const MUTED = "#7AAABB";
const WHITE = "#FFFFFF";

function OgCard({ title, description }: { title: string; description: string }) {
	// Trim to safe display lengths
	const safeTitle = title.length > 80 ? title.slice(0, 77) + "…" : title;
	const safeDesc = description.length > 120 ? description.slice(0, 117) + "…" : description;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: W,
				height: H,
				backgroundColor: NAVY,
				padding: "60px 72px",
				fontFamily: "Montserrat",
				position: "relative",
			}}
		>
			{/* Top accent line */}
			<div
				style={{
					display: "flex",
					width: "100%",
					height: 4,
					backgroundColor: BLUE,
					position: "absolute",
					top: 0,
					left: 0,
				}}
			/>

			{/* Brand header row */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 48,
				}}
			>
				<span
					style={{
						color: SKY,
						fontSize: 22,
						fontWeight: 700,
						letterSpacing: "0.12em",
					}}
				>
					WE SUMMIT MOUNTAINS
				</span>
				<span style={{ color: MUTED, fontSize: 20, fontWeight: 400 }}>
					Dallas, TX
				</span>
			</div>

			{/* Main content — flex-grow to fill remaining space */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					justifyContent: "center",
					gap: 20,
				}}
			>
				{/* Title */}
				<div
					style={{
						display: "flex",
						color: WHITE,
						fontSize: safeTitle.length > 50 ? 54 : 68,
						fontWeight: 700,
						lineHeight: 1.15,
					}}
				>
					{safeTitle}
				</div>

				{/* Description */}
				{safeDesc && (
					<div
						style={{
							display: "flex",
							color: MUTED,
							fontSize: 26,
							fontWeight: 400,
							lineHeight: 1.5,
						}}
					>
						{safeDesc}
					</div>
				)}
			</div>

			{/* Footer row */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					borderTop: "1px solid rgba(255,255,255,0.12)",
					paddingTop: 24,
					marginTop: 32,
				}}
			>
				<span style={{ color: MUTED, fontSize: 20, fontWeight: 400 }}>
					wesummitmountains.com
				</span>
				<div style={{ display: "flex", gap: 10 }}>
					{["Salesforce", "AI", "CRM"].map((tag) => (
						<span
							key={tag}
							style={{
								backgroundColor: "rgba(51, 109, 139, 0.35)",
								color: SKY,
								fontSize: 16,
								fontWeight: 700,
								padding: "5px 14px",
								borderRadius: 4,
								letterSpacing: "0.04em",
							}}
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const title = url.searchParams.get("title") ?? "We Summit Mountains";
	const description = url.searchParams.get("description") ?? "";

	await ensureInit();

	const svg = await satori(<OgCard title={title} description={description} />, {
		width: W,
		height: H,
		fonts: [
			{ name: "Montserrat", data: fontBold!, weight: 700, style: "normal" },
			{ name: "Montserrat", data: fontRegular!, weight: 400, style: "normal" },
		],
	});

	const resvg = new Resvg(svg, { fitTo: { mode: "width", value: W } });
	const png = resvg.render().asPng();

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=86400, s-maxage=86400",
		},
	});
}
