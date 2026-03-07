import type { Route } from "./+types/contact";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Contact | We Summit Mountains" },
		{
			name: "description",
			content:
				"Get in touch with We Summit Mountains. Let's discuss your Salesforce, AI, and software development needs.",
		},
	];
}

export default function Contact() {
	return (
		<>
			<PageHero />
			<ContactContent />
		</>
	);
}

function PageHero() {
	return (
		<section className="bg-summit-dark py-20 lg:py-28">
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
		</section>
	);
}

function ContactContent() {
	return (
		<section className="py-20 lg:py-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
					<div className="lg:col-span-3">
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Send Us a Message
						</h2>
						<form className="space-y-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<div>
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
								<div>
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

							<button
								type="submit"
								className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
							>
								Send Message
							</button>
						</form>
					</div>

					<div className="lg:col-span-2">
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
									className="inline-flex items-center px-5 py-2.5 bg-brand-teal text-white text-sm font-semibold rounded-lg hover:bg-brand-teal/90 transition-colors"
								>
									Book a Call
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
