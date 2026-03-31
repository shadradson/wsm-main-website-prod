import { useRef } from "react";
import { useLeadForm } from "~/lib/useLeadForm";
import TurnstileWidget from "./TurnstileWidget";
import "./FooterContactForm.css";

interface FooterContactFormProps {
	recordTypeId: string;
}

export default function FooterContactForm({ recordTypeId }: FooterContactFormProps) {
	const { formState, errorMsg, submitLead } = useLeadForm();
	const turnstileToken = useRef("");

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		submitLead({
			firstName: fd.get("firstName"),
			lastName: fd.get("lastName"),
			email: fd.get("email"),
			company: fd.get("company"),
			phone: fd.get("phone"),
			message: fd.get("message"),
			website: fd.get("website"),
			cfTurnstileResponse: turnstileToken.current,
			recordTypeId,
		});
	}

	if (formState === "success") {
		return (
			<div className="fcf-success">
				<div className="fcf-success-icon">
					<svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 className="fcf-success-title">Message Sent!</h3>
				<p className="fcf-success-text">We'll get back to you within 1 business day.</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="fcf-form">
			{/* Honeypot — hidden from humans, bots fill it */}
			<div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
				<label htmlFor="footer-website">Website</label>
				<input type="text" id="footer-website" name="website" tabIndex={-1} autoComplete="off" />
			</div>
			<div className="fcf-row">
				<div className="fcf-field">
					<label htmlFor="footer-firstName" className="fcf-label">
						First Name *
					</label>
					<input
						type="text"
						id="footer-firstName"
						name="firstName"
						required
						className="fcf-input"
						placeholder="First name"
					/>
				</div>
				<div className="fcf-field">
					<label htmlFor="footer-lastName" className="fcf-label">
						Last Name *
					</label>
					<input
						type="text"
						id="footer-lastName"
						name="lastName"
						required
						className="fcf-input"
						placeholder="Last name"
					/>
				</div>
			</div>

			<div className="fcf-row">
				<div className="fcf-field">
					<label htmlFor="footer-email" className="fcf-label">
						Email *
					</label>
					<input
						type="email"
						id="footer-email"
						name="email"
						required
						className="fcf-input"
						placeholder="you@company.com"
					/>
				</div>
			</div>

			<div className="fcf-row">
				<div className="fcf-field">
					<label htmlFor="footer-company" className="fcf-label">
						Company
					</label>
					<input
						type="text"
						id="footer-company"
						name="company"
						className="fcf-input"
						placeholder="Company name"
					/>
				</div>
				<div className="fcf-field">
					<label htmlFor="footer-phone" className="fcf-label">
						Phone
					</label>
					<input
						type="tel"
						id="footer-phone"
						name="phone"
						className="fcf-input"
						placeholder="(555) 123-4567"
					/>
				</div>
			</div>

			<div className="fcf-row">
				<div className="fcf-field">
					<label htmlFor="footer-message" className="fcf-label">
						Message
					</label>
					<textarea
						id="footer-message"
						name="message"
						rows={3}
						className="fcf-textarea"
						placeholder="Tell us about your project or how we can help..."
					/>
				</div>
			</div>


			<TurnstileWidget onToken={(t) => { turnstileToken.current = t; }} />

			{formState === "error" && (
				<p className="fcf-error">{errorMsg}</p>
			)}
			<div className="flex justify-center">
				<button
				type="submit"
				disabled={formState === "submitting"}
				className="fcf-submit min-w-[400px]"
			>
				{formState === "submitting" ? "Sending..." : "Send Message"}
			</button>
			</div>
		</form>
	);
}
