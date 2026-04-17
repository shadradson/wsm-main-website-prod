import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { organizationSchema, websiteSchema } from "~/lib/seo";
import gabatoUrl from "~/fonts/Gabato.ttf?url";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
	},
	{ rel: "icon", href: "/favicon.ico", sizes: "any" },
	{ rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
	{ rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
	{ rel: "manifest", href: "/manifest.json" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<style>{`@font-face { font-family: 'Gabato'; src: url('${gabatoUrl}') format('truetype'); font-weight: normal; font-style: normal; } html,body{background-color:#000;}`}</style>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				/>
				<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
			</head>
			<body className="bg-black" style={{ backgroundColor: "#000" }}>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-white p-4">
			<div className="text-center max-w-lg">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">{message}</h1>
				<p className="text-lg text-gray-700 mb-6">{details}</p>
				{stack && (
					<pre className="w-full p-4 overflow-x-auto bg-gray-100 text-gray-800 text-sm rounded">
						<code>{stack}</code>
					</pre>
				)}
			</div>
		</main>
	);
}
