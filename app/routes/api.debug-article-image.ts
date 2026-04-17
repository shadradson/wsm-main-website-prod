import type { Route } from "./+types/api.debug-article-image";
import { getAccessToken, soqlQuery, fetchImage } from "../lib/salesforce.server";

export async function loader({ context }: Route.LoaderArgs) {
	try {
		const env = context.cloudflare.env;
		const token = await getAccessToken(env);

		// Grab one article with the formula field populated
		const results = await soqlQuery<{
			Id: string;
			Name: string;
			Article_Image_Selector_formula__c: string | null;
			Splash_Image_URL__c: string | null;
		}>(
			token,
			"SELECT Id, Name, Article_Image_Selector_formula__c, Splash_Image_URL__c FROM Article__c WHERE Article_Image_Selector_formula__c != null LIMIT 3",
		);

		const diagnostics = [];

		for (const article of results) {
			const formulaUrl = article.Article_Image_Selector_formula__c;
			const diag: Record<string, unknown> = {
				id: article.Id,
				name: article.Name,
				formula_url: formulaUrl,
				splash_url: article.Splash_Image_URL__c,
			};

			if (formulaUrl) {
				// Test 1: Check ContentVersion regex match
				const cvMatch = formulaUrl.match(/[?&]ids=([a-zA-Z0-9]+)/);
				diag.cv_id_extracted = cvMatch?.[1] ?? null;

				// Test 2: Try the fetchImage function
				try {
					const image = await fetchImage(token, formulaUrl);
					diag.fetch_result = image
						? { success: true, contentType: image.contentType, size: image.data.byteLength }
						: { success: false, reason: "fetchImage returned null" };
				} catch (e) {
					diag.fetch_result = { success: false, error: String(e) };
				}

				// Test 3: Try direct fetch without auth (maybe it's a public URL)
				try {
					const directRes = await fetch(formulaUrl, { redirect: "manual" });
					const directHeaders: Record<string, string> = {};
					directRes.headers.forEach((v, k) => { directHeaders[k] = v; });
					diag.direct_no_auth = {
						status: directRes.status,
						headers: directHeaders,
					};
				} catch (e) {
					diag.direct_no_auth = { error: String(e) };
				}

				// Test 4: Try ContentVersion API directly
				if (cvMatch) {
					const cvId = cvMatch[1];
					const apiUrl = `${token.instance_url}/services/data/v62.0/sobjects/ContentVersion/${cvId}/VersionData`;
					try {
						const cvRes = await fetch(apiUrl, {
							headers: { Authorization: `Bearer ${token.access_token}` },
							redirect: "manual",
						});
						const cvHeaders: Record<string, string> = {};
						cvRes.headers.forEach((v, k) => { cvHeaders[k] = v; });
						diag.cv_api_result = {
							status: cvRes.status,
							headers: cvHeaders,
						};

						// If redirect, try following it
						if (cvRes.status >= 300 && cvRes.status < 400) {
							const loc = cvRes.headers.get("location");
							if (loc) {
								const redirectUrl = loc.startsWith("http") ? loc : `${token.instance_url}${loc}`;
								const followRes = await fetch(redirectUrl, {
									headers: { Authorization: `Bearer ${token.access_token}` },
								});
								diag.cv_redirect_follow = {
									url: redirectUrl,
									status: followRes.status,
									contentType: followRes.headers.get("content-type"),
									size: (await followRes.arrayBuffer()).byteLength,
								};
							}
						}
					} catch (e) {
						diag.cv_api_result = { error: String(e) };
					}
				}
			}

			diagnostics.push(diag);
		}

		return Response.json({ diagnostics }, { headers: { "Content-Type": "application/json" } });
	} catch (error) {
		return Response.json({ success: false, error: String(error) }, { status: 500 });
	}
}
