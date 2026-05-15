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

// Salesforce expects ISO 8601 datetimes with millisecond precision for the
// getUpdated/getDeleted endpoints (e.g. 2024-01-15T12:34:56.000+00:00 or Z).
function toSfDateTime(date: Date): string {
	return date.toISOString();
}

export async function getUpdatedIds(
	token: SalesforceTokenResponse,
	sobjectType: string,
	start: Date,
	end: Date,
): Promise<string[]> {
	const params = new URLSearchParams({
		start: toSfDateTime(start),
		end: toSfDateTime(end),
	});
	const url = `${token.instance_url}/services/data/v62.0/sobjects/${sobjectType}/updated/?${params}`;

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${token.access_token}` },
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`getUpdated(${sobjectType}) failed (${res.status}): ${text}`);
	}

	const data = (await res.json()) as { ids: string[]; latestDateCovered: string };
	return data.ids ?? [];
}

export async function getDeletedIds(
	token: SalesforceTokenResponse,
	sobjectType: string,
	start: Date,
	end: Date,
): Promise<string[]> {
	const params = new URLSearchParams({
		start: toSfDateTime(start),
		end: toSfDateTime(end),
	});
	const url = `${token.instance_url}/services/data/v62.0/sobjects/${sobjectType}/deleted/?${params}`;

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${token.access_token}` },
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`getDeleted(${sobjectType}) failed (${res.status}): ${text}`);
	}

	const data = (await res.json()) as {
		deletedRecords: { id: string; deletedDate: string }[];
		earliestDateAvailable: string;
		latestDateCovered: string;
	};
	return (data.deletedRecords ?? []).map((r) => r.id);
}

// Runs a SOQL query in chunks for a large list of IDs. The caller supplies a
// query template containing the literal "{IDS}" placeholder; this is replaced
// with the chunked IN clause. Chunk size kept conservative to stay well under
// the 20k-character SOQL limit.
export async function soqlQueryByIds<T = Record<string, unknown>>(
	token: SalesforceTokenResponse,
	queryTemplate: string,
	ids: string[],
	chunkSize = 200,
): Promise<T[]> {
	if (ids.length === 0) return [];
	const out: T[] = [];
	for (let i = 0; i < ids.length; i += chunkSize) {
		const chunk = ids.slice(i, i + chunkSize);
		const inClause = chunk.map((id) => `'${id}'`).join(",");
		const query = queryTemplate.replace("{IDS}", inClause);
		const records = await soqlQuery<T>(token, query);
		out.push(...records);
	}
	return out;
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

	// For file.force.com Content Version download URLs, use the REST API
	const cvMatch = imageUrl.match(/[?&]ids=([a-zA-Z0-9]+)/);
	if (cvMatch) {
		const contentVersionId = cvMatch[1];
		const apiUrl = `${token.instance_url}/services/data/v62.0/sobjects/ContentVersion/${contentVersionId}/VersionData`;

		// Use manual redirect — the API returns a 302 to file.force.com,
		// and auto-follow strips the Auth header on cross-origin redirects
		const res = await fetch(apiUrl, {
			headers: { Authorization: `Bearer ${token.access_token}` },
			redirect: "manual",
		});

		// Follow the redirect ourselves, preserving the auth header
		if (res.status >= 300 && res.status < 400) {
			const location = res.headers.get("Location");
			if (location) {
				const redirectUrl = location.startsWith("http")
					? location
					: `${token.instance_url}${location}`;
				const fileRes = await fetch(redirectUrl, {
					headers: { Authorization: `Bearer ${token.access_token}` },
				});
				if (!fileRes.ok) return null;
				const contentType = fileRes.headers.get("content-type") || "image/png";
				if (contentType.includes("text/html")) return null;
				const data = await fileRes.arrayBuffer();
				return { data, contentType };
			}
		}

		if (!res.ok) return null;

		const contentType = res.headers.get("content-type") || "image/png";
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
