import type { Route } from "./+types/api.debug";
import { getAccessToken, soqlQuery } from "../lib/salesforce.server";

export async function loader({ context }: Route.LoaderArgs) {
	try {
		const env = context.cloudflare.env;
		const token = await getAccessToken(env);
		const results = await soqlQuery<{ Id: string; FirstName: string; WSM_Website_Photo_1__c: string | null }>(
			token,
			"SELECT Id, FirstName, WSM_Website_Photo_1__c FROM Contact WHERE zbe_AboutUsSortOrder__c = 1 LIMIT 1",
		);

		const rawField = results[0]?.WSM_Website_Photo_1__c;

		// Extract URL like the sync does
		let imageUrl: string | null = null;
		if (rawField) {
			const match = rawField.match(/src=["']([^"']+)["']/);
			imageUrl = match ? match[1].replace(/&amp;/g, "&") : null;
		}

		// Rewrite file.force.com
		let fetchUrl = imageUrl;
		if (fetchUrl) {
			const fileForceMatch = fetchUrl.match(/https?:\/\/[^/]+\.file\.force\.com(\/.*)/);
			if (fileForceMatch) {
				fetchUrl = `${token.instance_url}${fileForceMatch[1]}`;
			}
		}

		// Try fetching with redirect: manual
		const steps: Array<{ step: number; url: string; status: number; headers: Record<string, string> }> = [];
		if (fetchUrl) {
			let url = fetchUrl;
			for (let i = 0; i < 5; i++) {
				const res = await fetch(url, {
					headers: { Authorization: `Bearer ${token.access_token}` },
					redirect: "manual",
				});

				const respHeaders: Record<string, string> = {};
				res.headers.forEach((v, k) => { respHeaders[k] = v; });

				steps.push({ step: i, url, status: res.status, headers: respHeaders });

				if (res.status >= 300 && res.status < 400) {
					const location = res.headers.get("location");
					if (!location) break;
					url = location.startsWith("http") ? location : `${token.instance_url}${location}`;
					continue;
				}
				break;
			}
		}

		return Response.json({
			raw_field: rawField,
			extracted_url: imageUrl,
			rewritten_url: fetchUrl,
			fetch_steps: steps,
		});
	} catch (error) {
		return Response.json({ success: false, error: String(error) }, { status: 500 });
	}
}
