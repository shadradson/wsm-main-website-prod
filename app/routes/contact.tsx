import type { Route } from "./+types/contact";
import { useRef } from "react";
import { Link } from "react-router";
import { useLeadForm } from "~/lib/useLeadForm";
import TurnstileWidget from "~/components/TurnstileWidget";
import ParticleDots from "~/components/ParticleDots";
import { buildMeta, SITE_URL } from "~/lib/seo";

const TITLE = "Contact We Summit Mountains | Free Consultation | Dallas, TX";
const DESCRIPTION =
	"Get in touch with We Summit Mountains for a free consultation. Salesforce implementation, AI consulting & custom software experts based in Dallas, Texas.";

export function meta({}: Route.MetaArgs) {
	return buildMeta({ title: TITLE, description: DESCRIPTION, path: "/contact" });
}

const contactPageSchema = {
	"@context": "https://schema.org",
	"@type": "ContactPage",
	"@id": `${SITE_URL}/contact`,
	name: TITLE,
	description: DESCRIPTION,
	url: `${SITE_URL}/contact`,
	publisher: { "@id": `${SITE_URL}/#organization` },
	breadcrumb: {
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
		],
	},
};

export default function Contact() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
			<PageHero />
			<ContactContent />
		</>
	);
}

function PageHero() {
	return (
		<section id="contact-hero" className="bg-summit-dark relative overflow-hidden">
			<div className="hidden md:block">
				<ParticleDots
					particleCount={800}
					color="#ffffff33"
					lineColor="#ffffff44"
					repelRadius={120}
					repelStrength={0.08}
					linkDistance={80}
					svgLinkDistance={80}
					svgScale={12}
					svgOffsetX={0}
					svgOffsetY={20}
					svgPoints={800}
					attractStrength={0.015}
					svgFit="none"
					svgAlign="center"
				/>
			</div>
			<div className="py-20 lg:py-28 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-brand-sky font-medium text-sm uppercase tracking-widest mb-4">
							Contact Us
						</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
							Let's Start{" "}
							<span className="text-brand-sky">Climbing</span>
						</h1>
						<p className="text-lg text-gray-300 leading-relaxed">
							Ready to transform your technology challenges into
							opportunities? We'd love to hear from you.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function ContactContent() {
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
			message: fd.get("message"),
			service: fd.get("service"),
			website: fd.get("website"),
			cfTurnstileResponse: turnstileToken.current,
			recordTypeId: "012Hs0000007XzWIAU",
		});
	}

	return (
		<section id="contact-content">
			<div className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-16">
						<div id="contact-form-column" className="lg:w-3/5">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								Send Us a Message
							</h2>

							{formState === "success" ? (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
										<svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
									<p className="text-gray-600">We'll get back to you within 1 business day.</p>
								</div>
							) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Honeypot — hidden from humans, bots fill it */}
								<div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
									<label htmlFor="contact-website">Website</label>
									<input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
								</div>
								<div className="flex flex-col sm:flex-row gap-6">
									<div className="sm:flex-1">
										<label
											htmlFor="firstName"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											First Name
										</label>
										<input
											type="text"
											id="firstName"
											name="firstName"
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
											placeholder="Your first name"
										/>
									</div>
									<div className="sm:flex-1">
										<label
											htmlFor="lastName"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Last Name
										</label>
										<input
											type="text"
											id="lastName"
											name="lastName"
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
											placeholder="Your last name"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
										placeholder="you@company.com"
									/>
								</div>

								<div>
									<label
										htmlFor="company"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Company
									</label>
									<input
										type="text"
										id="company"
										name="company"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
										placeholder="Your company name"
									/>
								</div>

								<div>
									<label
										htmlFor="service"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Service of Interest
									</label>
									<select
										id="service"
										name="service"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all bg-white"
									>
										<option value="">Select a service</option>
										<option value="salesforce">
											Salesforce Implementation
										</option>
										<option value="crm">
											Cloud CRM Solutions
										</option>
										<option value="integration">
											System Integrations
										</option>
										<option value="ai">AI Consulting</option>
										<option value="custom">
											Custom Software Development
										</option>
										<option value="other">Other</option>
									</select>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										rows={5}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all resize-none"
										placeholder="Tell us about your project or challenge..."
									/>
								</div>

								<TurnstileWidget onToken={(t) => { turnstileToken.current = t; }} />

								{formState === "error" && (
									<p className="text-red-600 text-sm">{errorMsg}</p>
								)}

								<button
									type="submit"
									disabled={formState === "submitting"}
									className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{formState === "submitting" ? "Sending..." : "Send Message"}
								</button>
							</form>
							)}
						</div>

						<div id="contact-sidebar" className="lg:w-2/5">
							<div className="space-y-8">
								<div>
									<h3 className="text-lg font-bold text-gray-900 mb-4">
										Get in Touch
									</h3>
									<div className="space-y-4">
										<div className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
												<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
												</svg>
											</div>
											<div>
												<p className="font-medium text-gray-900">
													Location
												</p>
												<p className="text-gray-600 text-sm">
													Dallas, Texas
												</p>
											</div>
										</div>

										<div className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0">
												<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
												</svg>
											</div>
											<div>
												<p className="font-medium text-gray-900">
													Online
												</p>
												<a
													href="https://www.linkedin.com/company/we-summit-mountains"
													target="_blank"
													rel="noreferrer"
													className="text-brand-blue text-sm hover:underline"
												>
													LinkedIn
												</a>
											</div>
										</div>
									</div>
								</div>

								<div className="bg-gray-50 rounded-2xl p-8">
									<h3 className="text-lg font-bold text-gray-900 mb-3">
										What to Expect
									</h3>
									<ul className="space-y-3">
										{[
											"We'll respond within 1 business day",
											"Initial discovery call to understand your needs",
											"Tailored proposal with clear scope & timeline",
											"No obligation — just a conversation",
										].map((item) => (
											<li
												key={item}
												className="flex items-start gap-3 text-sm text-gray-600"
											>
												<svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
												</svg>
												{item}
											</li>
										))}
									</ul>
								</div>

								<div className="bg-gradient-to-br from-navy-800 to-summit-dark rounded-2xl p-8 text-white">
									<h3 className="text-lg font-bold mb-3">
										Prefer to Schedule Directly?
									</h3>
									<p className="text-gray-300 text-sm mb-4">
										Book a free 30-minute consultation to
										discuss your project.
									</p>
									<Link
										to="/contact"
										aria-label="Book a free 30-minute consultation call"
										className="inline-flex items-center px-5 py-2.5 bg-brand-teal text-white text-sm font-semibold hover:bg-brand-teal/90 transition-colors"
									>
										Book a Call
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
