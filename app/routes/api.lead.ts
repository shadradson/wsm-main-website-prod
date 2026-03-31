import type { Route } from "./+types/api.lead";
import { getAccessToken } from "~/lib/salesforce.server";
import { checkRateLimit } from "~/lib/rateLimit.server";

const VALID_RECORD_TYPES = new Set([
	"012Hs0000007XzWIAU", // Implementation Lead
	"012Hs0000007XzbIAE", // Employee / Partner
	"012Hs0000007bDBIAY", // Mountain Rescue Client
]);

const MAX_LEN: Record<string, number> = {
	firstName: 80,
	lastName: 80,
	email: 254,
	company: 255,
	phone: 40,
	message: 5000,
	service: 100,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim, strip HTML tags, and enforce max length */
function sanitize(value: unknown, field: string): string {
	if (value == null) return "";
	return String(value)
		.trim()
		.replace(/<[^>]*>/g, "")
		.slice(0, MAX_LEN[field] ?? 255);
}

export async function action({ request, context }: Route.ActionArgs) {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	// Rate limit — 5 submissions per 10 minutes per IP
	const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
	const { allowed, remaining } = await checkRateLimit(context.cloudflare.env.DB, ip, "/api/lead", 5, 600);
	if (!allowed) {
		return Response.json(
			{ error: "Too many submissions. Please try again later." },
			{ status: 429, headers: { "Retry-After": "600" } },
		);
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON" }, { status: 400 });
	}

	// Honeypot — bots fill this hidden field, humans don't
	if (body.website) {
		return Response.json({ success: true, id: "ok" });
	}

	// Sanitize all inputs
	const firstName = sanitize(body.firstName, "firstName");
	const lastName = sanitize(body.lastName, "lastName");
	const email = sanitize(body.email, "email");
	const company = sanitize(body.company, "company");
	const phone = sanitize(body.phone, "phone");
	const message = sanitize(body.message, "message");
	const service = sanitize(body.service, "service");
	const recordTypeId = String(body.recordTypeId ?? "").trim();

	// Required fields
	if (!firstName || !lastName || !email) {
		return Response.json({ error: "First name, last name, and email are required." }, { status: 400 });
	}

	// Email format
	if (!EMAIL_RE.test(email)) {
		return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
	}

	// Record type whitelist
	if (recordTypeId && !VALID_RECORD_TYPES.has(recordTypeId)) {
		return Response.json({ error: "Invalid record type." }, { status: 400 });
	}

	// Turnstile CAPTCHA verification
	const cfTurnstileResponse = String(body.cfTurnstileResponse ?? "");
	if (!cfTurnstileResponse) {
		return Response.json({ error: "CAPTCHA verification required." }, { status: 400 });
	}

	const env = context.cloudflare.env;
	const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			secret: env.TURNSTILE_SECRET_KEY,
			response: cfTurnstileResponse,
			remoteip: ip,
		}),
	});
	const turnstileData = await turnstileRes.json() as { success: boolean };
	if (!turnstileData.success) {
		return Response.json({ error: "CAPTCHA verification failed. Please try again." }, { status: 403 });
	}

	try {
		const token = await getAccessToken(env);

		const leadData: Record<string, string | null> = {
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			Company: company || "[Not Provided]",
			Phone: phone || null,
			Description: message || null,
			LeadSource: "Website",
		};

		if (recordTypeId) {
			leadData.RecordTypeId = recordTypeId;
		}

		if (service) {
			leadData.Website_Service_Interest__c = service;
		}

		const res = await fetch(
			`${token.instance_url}/services/data/v62.0/sobjects/Lead`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token.access_token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(leadData),
			},
		);

		if (!res.ok) {
			const errText = await res.text();
			console.error("Salesforce Lead creation failed:", errText);
			return Response.json(
				{ error: "Failed to submit. Please try again." },
				{ status: 502 },
			);
		}

		const result = await res.json();
		return Response.json({ success: true, id: (result as { id: string }).id });
	} catch (error) {
		console.error("Lead API error:", error);
		return Response.json(
			{ error: "Internal server error." },
			{ status: 500 },
		);
	}
}
