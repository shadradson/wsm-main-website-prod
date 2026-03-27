export const SITE_URL = "https://www.wesummitmountains.com";
export const SITE_NAME = "We Summit Mountains";
export const SITE_LOGO = `${SITE_URL}/images/WSM_LOGO_V2_Norm_TXT_Color.svg`;
export const OG_IMAGE = `${SITE_URL}/images/Rendered_Bright_Mountains.png`;

function ogImageUrl(title: string, description: string): string {
	const params = new URLSearchParams({ title, description });
	return `${SITE_URL}/api/og?${params.toString()}`;
}

export function buildMeta({
	title,
	description,
	path,
	image,
}: {
	title: string;
	description: string;
	path: string;
	image?: string;
}) {
	const url = `${SITE_URL}${path}`;
	const img = image ?? ogImageUrl(title, description);
	return [
		{ title },
		{ name: "description", content: description },
		{ name: "robots", content: "index, follow" },
		{ name: "theme-color", content: "#036588" },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: SITE_NAME },
		{ property: "og:url", content: url },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:image", content: img },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:image:type", content: "image/png" },
		{ property: "og:image:alt", content: `${title} | ${SITE_NAME}` },
		{ property: "og:locale", content: "en_US" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: img },
		{ name: "twitter:image:alt", content: `${title} | ${SITE_NAME}` },
		{ tagName: "link", rel: "canonical", href: url },
	];
}

// ── Shared JSON-LD fragments ─────────────────────────────────────────────────

export const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": `${SITE_URL}/#organization`,
	name: SITE_NAME,
	url: SITE_URL,
	logo: {
		"@type": "ImageObject",
		url: SITE_LOGO,
	},
	description:
		"We Summit Mountains is a Dallas-based consulting firm specializing in Salesforce implementation, AI consulting, CTO fractional services, and custom software development.",
	foundingDate: "2023",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Dallas",
		addressRegion: "TX",
		addressCountry: "US",
	},
	areaServed: "US",
	sameAs: ["https://www.linkedin.com/company/we-summit-mountains"],
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "customer service",
		url: `${SITE_URL}/contact`,
		areaServed: "US",
		availableLanguage: "English",
	},
	knowsAbout: [
		"Salesforce Implementation",
		"AI Consulting",
		"CTO Services",
		"Cloud CRM",
		"System Integrations",
		"Custom Software Development",
	],
};

export const websiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${SITE_URL}/#website`,
	name: SITE_NAME,
	url: SITE_URL,
	publisher: { "@id": `${SITE_URL}/#organization` },
};
