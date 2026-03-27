import { redirect } from "react-router";
import type { Route } from "./+types/s.$";

export function loader({ params }: Route.LoaderArgs) {
	const rest = params["*"] || "";
	return redirect(`/${rest}`, 301);
}
