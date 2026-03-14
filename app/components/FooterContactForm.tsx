import { useLeadForm } from "~/lib/useLeadForm";

interface FooterContactFormProps {
	recordTypeId: string;
}

export default function FooterContactForm({ recordTypeId }: FooterContactFormProps) {
	const { formState, errorMsg, submitLead } = useLeadForm();

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
			recordTypeId,
		});
	}

	if (formState === "success") {
		return (
			<div className="max-w-2xl mx-auto text-center py-8">
				<div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
				<p className="text-gray-300">We'll get back to you within 1 business day.</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 py-6">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="sm:flex-1">
					<label htmlFor="footer-firstName" className="block text-sm font-medium text-gray-300 mb-1">
						First Name *
					</label>
					<input
						type="text"
						id="footer-firstName"
						name="firstName"
						required
						className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-sky focus:border-brand-sky outline-none transition-all"
						placeholder="First name"
					/>
				</div>
				<div className="sm:flex-1">
					<label htmlFor="footer-lastName" className="block text-sm font-medium text-gray-300 mb-1">
						Last Name *
					</label>
					<input
						type="text"
						id="footer-lastName"
						name="lastName"
						required
						className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-sky focus:border-brand-sky outline-none transition-all"
						placeholder="Last name"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="footer-email" className="block text-sm font-medium text-gray-300 mb-1">
					Email *
				</label>
				<input
					type="email"
					id="footer-email"
					name="email"
					required
					className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-sky focus:border-brand-sky outline-none transition-all"
					placeholder="you@company.com"
				/>
			</div>

			<div className="flex flex-col sm:flex-row gap-4">
				<div className="sm:flex-1">
					<label htmlFor="footer-company" className="block text-sm font-medium text-gray-300 mb-1">
						Company
					</label>
					<input
						type="text"
						id="footer-company"
						name="company"
						className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-sky focus:border-brand-sky outline-none transition-all"
						placeholder="Company name"
					/>
				</div>
				<div className="sm:flex-1">
					<label htmlFor="footer-phone" className="block text-sm font-medium text-gray-300 mb-1">
						Phone
					</label>
					<input
						type="tel"
						id="footer-phone"
						name="phone"
						className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-sky focus:border-brand-sky outline-none transition-all"
						placeholder="(555) 123-4567"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="footer-message" className="block text-sm font-medium text-gray-300 mb-1">
					Message
				</label>
				<textarea
					id="footer-message"
					name="message"
					rows={3}
					className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-sky focus:border-brand-sky outline-none transition-all resize-none"
					placeholder="Tell us about your project or how we can help..."
				/>
			</div>

			{formState === "error" && (
				<p className="text-red-400 text-sm">{errorMsg}</p>
			)}

			<button
				type="submit"
				disabled={formState === "submitting"}
				className="w-full sm:w-auto px-8 py-3 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{formState === "submitting" ? "Sending..." : "Send Message"}
			</button>
		</form>
	);
}
