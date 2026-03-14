import { useState } from "react";

export type FormState = "idle" | "submitting" | "success" | "error";

export function useLeadForm() {
	const [formState, setFormState] = useState<FormState>("idle");
	const [errorMsg, setErrorMsg] = useState("");

	async function submitLead(payload: Record<string, unknown>) {
		setFormState("submitting");
		setErrorMsg("");

		try {
			const res = await fetch("/api/lead", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error((data as { error?: string }).error || "Submission failed.");
			}
			setFormState("success");
		} catch (err) {
			setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
			setFormState("error");
		}
	}

	return { formState, errorMsg, submitLead };
}
