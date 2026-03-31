import { useEffect, useRef, useCallback } from "react";

declare global {
	interface Window {
		turnstile?: {
			render: (el: HTMLElement, opts: Record<string, unknown>) => string;
			remove: (id: string) => void;
			reset: (id: string) => void;
		};
	}
}

const SITE_KEY = "0x4AAAAAACyUcMd5PKaJH9z1";

interface TurnstileWidgetProps {
	onToken: (token: string) => void;
}

export default function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);

	const stableOnToken = useCallback(onToken, []);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		function tryRender() {
			if (!window.turnstile || !el) return;
			if (widgetIdRef.current) return;
			widgetIdRef.current = window.turnstile.render(el, {
				sitekey: SITE_KEY,
				callback: (token: string) => stableOnToken(token),
				"refresh-expired": "auto",
			});
		}

		// Script may already be loaded
		if (window.turnstile) {
			tryRender();
		} else {
			// Wait for script to load
			const interval = setInterval(() => {
				if (window.turnstile) {
					clearInterval(interval);
					tryRender();
				}
			}, 100);
			return () => clearInterval(interval);
		}

		return () => {
			if (widgetIdRef.current && window.turnstile) {
				window.turnstile.remove(widgetIdRef.current);
				widgetIdRef.current = null;
			}
		};
	}, [stableOnToken]);

	return <div ref={containerRef} />;
}
