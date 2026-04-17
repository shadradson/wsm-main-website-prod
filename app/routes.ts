import {
	type RouteConfig,
	index,
	route,
	layout,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("about-us", "routes/our-team.tsx"),
		route("expertise", "routes/expertise.tsx"),
		route("case-studies", "routes/case-studies.tsx"),
		route("success-stories", "routes/success-stories.tsx"),
		route("ai-consulting", "routes/ai-consulting.tsx"),
		route("mountain-guide-services", "routes/mountain-guide-services.tsx"),
		route("system-integration-services", "routes/system-integration-services.tsx"),
		route("fractional-cto-services", "routes/fractional-cto-services.tsx"),
		route("article/:id", "routes/article.$id.tsx"),
		route("contact", "routes/contact.tsx"),
		route("mountain-rescue", "routes/mountain-rescue.tsx"),
	]),
	route("s/*", "routes/s.$.tsx"),
	route("sitemap.xml", "routes/sitemap[.]xml.ts"),
	route("api/og", "routes/api.og.tsx"),
	route("api/lead", "routes/api.lead.ts"),
	route("api/sync", "routes/api.sync.ts"),
	route("api/assets/*", "routes/api.assets.$.ts"),
	route("api/article-image/:id", "routes/api.article-image.$id.ts"),
	route("api/debug", "routes/api.debug.ts"),
	route("api/debug-article-image", "routes/api.debug-article-image.ts"),
	route("ai-scrape-test", "routes/ai-scrape-test.tsx"),
] satisfies RouteConfig;
