import type { Route } from "./+types/api.article-image.$id";
import { getAccessToken, fetchImage } from "../lib/salesforce.server";

export async function loader({ params, context }: Route.LoaderArgs) {
	const id = params.id;
	if (!id) return new Response("Not found", { status: 404 });

	const env = context.cloudflare.env;
	const bucket = env.ASSETS_BUCKET;
	const r2Key = `articles/${id}.img`;

	// 1. Check R2 cache first
	const cached = await bucket.get(r2Key);
	if (cached) {
		return new Response(cached.body as ReadableStream, {
			headers: {
				"Content-Type": cached.httpMetadata?.contentType || "image/jpeg",
				"Cache-Control": "public, max-age=86400",
			},
		});
	}

	// 2. Look up the formula URL from D1
	const row = await env.DB.prepare(
		"SELECT sf_id, splash_image_url FROM articles WHERE sf_id = ?"
	).bind(id).first<{ sf_id: string; splash_image_url: string | null }>();

	if (!row) return new Response("Not found", { status: 404 });

	// The splash_image_url is our proxy path — we need the raw SF URL from the formula field.
	// Re-query Salesforce for the formula URL for this specific article.
	const token = await getAccessToken(env);
	const queryUrl = `${token.instance_url}/services/data/v62.0/query?q=${encodeURIComponent(
		`SELECT Article_Image_Selector_formula__c FROM Article__c WHERE Id = '${id}' LIMIT 1`
	)}`;
	const sfRes = await fetch(queryUrl, {
		headers: { Authorization: `Bearer ${token.access_token}` },
	});
	if (!sfRes.ok) return new Response("SF query failed", { status: 502 });

	const sfData = (await sfRes.json()) as {
		records: Array<{ Article_Image_Selector_formula__c: string | null }>;
	};
	const formulaUrl = sfData.records?.[0]?.Article_Image_Selector_formula__c;
	if (!formulaUrl) return new Response("No image", { status: 404 });

	// 3. Download image from Salesforce
	const image = await fetchImage(token, formulaUrl);
	if (!image) return new Response("Image download failed", { status: 502 });

	// 4. Cache in R2
	await bucket.put(r2Key, image.data, {
		httpMetadata: { contentType: image.contentType },
	});

	// 5. Serve it
	return new Response(image.data, {
		headers: {
			"Content-Type": image.contentType,
			"Cache-Control": "public, max-age=86400",
		},
	});
}
