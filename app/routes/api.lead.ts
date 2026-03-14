import type { Route } from "./+types/api.lead";
import { getAccessToken } from "~/lib/salesforce.server";

const VALID_RECORD_TYPES = new Set([
	"012Hs0000007XzWIAU", // Implementation Lead
	"012Hs0000007XzbIAE", // Employee / Partner
	"012Hs0000007bDBIAY", // Mountain Rescue Client
]);

export async function action({ request, context }: Route.ActionArgs) {
	if (request.method !== "POST") {
		return Response.json({ error: "Method not allowed" }, { status: 405 });
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const { firstName, lastName, email, company, phone, message, recordTypeId, service } = body as Record<string, string>;

	if (!firstName || !lastName || !email) {
		return Response.json({ error: "First name, last name, and email are required." }, { status: 400 });
	}

	if (recordTypeId && !VALID_RECORD_TYPES.has(recordTypeId)) {
		return Response.json({ error: "Invalid record type." }, { status: 400 });
	}

	try {
		const env = context.cloudflare.env;
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
