import type { Route } from "./+types/api.assets.$";

export async function loader({ params, context }: Route.LoaderArgs) {
	const key = params["*"];
	if (!key) {
		return new Response("Not found", { status: 404 });
	}

	const bucket = context.cloudflare.env.ASSETS_BUCKET;
	const object = await bucket.get(key);

	if (!object) {
		return new Response("Not found", { status: 404 });
	}

	const headers = new Headers();
	headers.set("Content-Type", object.httpMetadata?.contentType || "image/jpeg");
	headers.set("Cache-Control", "public, max-age=86400");

	return new Response(object.body as ReadableStream, { headers });
}
