import type { Route } from "./+types/sitemap[.]xml";

const SITE_URL = "https://www.wesummitmountains.com";

const staticPages = [
	{ path: "/", priority: "1.0", changefreq: "weekly" },
	{ path: "/about-us", priority: "0.8", changefreq: "monthly" },
	{ path: "/expertise", priority: "0.9", changefreq: "monthly" },
	{ path: "/ai-consulting", priority: "0.9", changefreq: "monthly" },
	{ path: "/mountain-guide-services", priority: "0.8", changefreq: "monthly" },
	{ path: "/system-integration-services", priority: "0.8", changefreq: "monthly" },
	{ path: "/fractional-cto-services", priority: "0.8", changefreq: "monthly" },
	{ path: "/case-studies", priority: "0.8", changefreq: "weekly" },
	{ path: "/success-stories", priority: "0.8", changefreq: "weekly" },
	{ path: "/contact", priority: "0.7", changefreq: "monthly" },
];

export async function loader({ context }: Route.LoaderArgs) {
	const db = context.cloudflare.env.DB;
	const today = new Date().toISOString().split("T")[0];

	// Fetch all published articles for dynamic URLs
	const { results: articles } = await db.prepare(
		`SELECT sf_id, synced_at FROM articles WHERE admin_approval = 1 AND publish_status = 'Published'`
	).all<{ sf_id: string; synced_at: string }>();

	let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

	for (const page of staticPages) {
		xml += `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
	}

	for (const article of articles ?? []) {
		const lastmod = article.synced_at ? article.synced_at.split("T")[0] : today;
		xml += `
  <url>
    <loc>${SITE_URL}/article/${article.sf_id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
	}

	xml += `
</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600, s-maxage=3600",
		},
	});
}
