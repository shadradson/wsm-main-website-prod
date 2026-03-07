import {
	type RouteConfig,
	index,
	route,
	layout,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("about-us", "routes/about-us.tsx"),
		route("expertise", "routes/expertise.tsx"),
		route("case-studies", "routes/case-studies.tsx"),
		route("our-team", "routes/our-team.tsx"),
		route("contact", "routes/contact.tsx"),
	]),
] satisfies RouteConfig;
