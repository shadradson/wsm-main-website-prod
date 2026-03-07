import { createRequestHandler } from "react-router";
import { runSync } from "../app/lib/sync.server";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	fetch(request, env, ctx) {
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},

	async scheduled(event, env, ctx) {
		ctx.waitUntil(
			runSync(env).then((result) => {
				console.log(
					`Sync complete: ${result.contactsSynced} contacts, ${result.articlesSynced} articles`,
				);
			}).catch((error) => {
				console.error("Sync failed:", error);
			}),
		);
	},
} satisfies ExportedHandler<Env>;
