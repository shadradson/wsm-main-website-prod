import type { Route } from "./+types/api.sync";
import { runSync } from "../lib/sync.server";

export async function loader({ context }: Route.LoaderArgs) {
	try {
		const env = context.cloudflare.env;
		const result = await runSync(env);
		return Response.json({ success: true, ...result });
	} catch (error) {
		const errMsg = error instanceof Error ? `${error.message}\n${error.stack}` : String(error);
		return Response.json(
			{ success: false, error: errMsg },
			{ status: 500 },
		);
	}
}
