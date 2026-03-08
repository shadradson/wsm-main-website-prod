/**
 * Salesforce OAuth2 client credentials flow + REST API helpers.
 * Runs server-side only (Cloudflare Workers).
 */

interface SalesforceTokenResponse {
	access_token: string;
	instance_url: string;
	token_type: string;
}

interface SalesforceEnv {
	SF_CLIENT_ID: string;
	SF_CLIENT_SECRET: string;
	SF_INSTANCE_URL: string;
}

export async function getAccessToken(env: SalesforceEnv): Promise<SalesforceTokenResponse> {
	const tokenUrl = `${env.SF_INSTANCE_URL}/services/oauth2/token`;

	const body = new URLSearchParams({
		grant_type: "client_credentials",
		client_id: env.SF_CLIENT_ID,
		client_secret: env.SF_CLIENT_SECRET,
	});

	const res = await fetch(tokenUrl, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Salesforce auth failed (${res.status}): ${text}`);
	}

	return res.json() as Promise<SalesforceTokenResponse>;
}

export async function soqlQuery<T = Record<string, unknown>>(
	token: SalesforceTokenResponse,
	query: string,
): Promise<T[]> {
	const url = `${token.instance_url}/services/data/v62.0/query?q=${encodeURIComponent(query)}`;

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${token.access_token}` },
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`SOQL query failed (${res.status}): ${text}`);
	}

	const data = (await res.json()) as { records: T[]; totalSize: number };
	return data.records;
}

export async function fetchImage(
	token: SalesforceTokenResponse,
	imageUrl: string,
	contactId?: string,
): Promise<{ data: ArrayBuffer; contentType: string } | null> {
	if (!imageUrl) return null;

	// For rtaImage URLs, use the Salesforce REST API richTextImageFields endpoint
	const rtaMatch = imageUrl.match(/refid=([a-zA-Z0-9]+)/);
	if (rtaMatch && contactId) {
		const refId = rtaMatch[1];
		const apiUrl = `${token.instance_url}/services/data/v62.0/sobjects/Contact/${contactId}/richTextImageFields/WSM_Website_Photo_1__c/${refId}`;

		const res = await fetch(apiUrl, {
			headers: { Authorization: `Bearer ${token.access_token}` },
		});

		if (!res.ok) return null;

		const contentType = res.headers.get("content-type") || "image/jpeg";
		if (contentType.includes("text/html")) return null;

		const data = await res.arrayBuffer();
		return { data, contentType };
	}

	// Fallback: direct URL fetch
	const fullUrl = imageUrl.startsWith("http")
		? imageUrl
		: `${token.instance_url}${imageUrl}`;

	const res = await fetch(fullUrl, {
		headers: { Authorization: `Bearer ${token.access_token}` },
	});

	if (!res.ok) return null;

	const contentType = res.headers.get("content-type") || "image/png";
	if (contentType.includes("text/html")) return null;

	const data = await res.arrayBuffer();
	return { data, contentType };
}
