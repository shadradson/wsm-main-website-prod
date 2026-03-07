import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";

function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [heroLogoGone, setHeroLogoGone] = useState(false);
	const [navVisible, setNavVisible] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === "/";

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 20);
			if (isHome) {
				setHeroLogoGone(window.scrollY > window.innerHeight * 1);
				setNavVisible(window.scrollY > window.innerHeight * 0.5);
			}
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [isHome]);

	const navLinks = [
		{ to: "/about-us", label: "About Us" },
		{ to: "/expertise", label: "Expertise" },
		{ to: "/case-studies", label: "Case Studies" },
		{ to: "/our-team", label: "Our Team" },
		{ to: "/contact", label: "Contact" },
	];

	return (
		<header id="main-header" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHome && !navVisible ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"} ${scrolled ? "bg-summit-dark/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent border-b border-transparent"}`}>
			<div id="header-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div id="header-row" className="relative flex items-center h-12 lg:h-16">
					{/* Logo: centered on mobile always, left-aligned on desktop */}
					<Link
						to="/"
						id="header-logo-link"
						className={`transition-all duration-300 lg:relative ${
							isHome && !heroLogoGone
								? "absolute left-1/2 -translate-x-1/2 lg:opacity-0 lg:pointer-events-none"
								: "absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:static"
						}`}
					>
						<img
							id="header-logo"
							src="/images/WSM_LOGO_V2_Norm_TXT_Wht.svg"
							alt="We Summit Mountains"
							className="h-10"
						/>
					</Link>

					{/* Desktop nav: centered when logo hidden, right-aligned when logo shows */}
					<nav id="desktop-nav" className={`hidden lg:flex items-center gap-1 transition-all duration-300 ${isHome && !heroLogoGone ? "mx-auto" : "ml-auto"}`}>
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.to === "/"}
								className={({ isActive }) =>
									`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
										isActive
											? "text-brand-sky bg-white/10"
											: "text-gray-300 hover:text-white hover:bg-white/5"
									}`
								}
							>
								{link.label}
							</NavLink>
						))}
						<Link
							id="header-cta"
							to="/contact"
							className="ml-4 px-5 py-2.5 bg-brand-blue text-white text-sm font-medium hover:bg-brand-blue-light transition-colors"
						>
							Get Started
						</Link>
					</nav>

					<button
						id="mobile-menu-toggle"
						className="lg:hidden text-white p-2 absolute right-0"
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label="Toggle menu"
					>
						{mobileOpen ? (
							<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</button>
				</div>
			</div>

			{mobileOpen && (
				<div id="mobile-menu" className="lg:hidden bg-summit-dark border-t border-white/10">
					<div id="mobile-nav-links" className="px-4 py-4 space-y-1">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.to === "/"}
								onClick={() => setMobileOpen(false)}
								className={({ isActive }) =>
									`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
										isActive
											? "text-brand-sky bg-white/10"
											: "text-gray-300 hover:text-white hover:bg-white/5"
									}`
								}
							>
								{link.label}
							</NavLink>
						))}
						<Link
							to="/contact"
							onClick={() => setMobileOpen(false)}
							className="block mt-4 px-4 py-3 bg-brand-blue text-white text-sm font-medium text-center hover:bg-brand-blue-light transition-colors"
						>
							Get Started
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}

function Footer() {
	return (
		<footer id="main-footer" className="bg-summit-dark text-gray-400">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="flex flex-wrap gap-12">
					<div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
						<Link to="/" className="flex items-center gap-3 mb-4">
							<img
							id="header-logo"
							src="/images/WSM_LOGO_V2_Norm_TXT_Wht.svg"
							alt="We Summit Mountains"
							className="h-10"
						/>
						</Link>
						<p className="text-sm leading-relaxed">
							Tailored AI Solutions, CTO Solutions, and Salesforce Implementation to drive business
							success. Let's climb your software mountain
							together.
						</p>
					</div>

					<div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
						<h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
							Services
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link to="/expertise" className="hover:text-brand-sky transition-colors">
									Salesforce Implementation
								</Link>
							</li>
							<li>
								<Link to="/expertise" className="hover:text-brand-sky transition-colors">
									Cloud CRM Solutions
								</Link>
							</li>
							<li>
								<Link to="/expertise" className="hover:text-brand-sky transition-colors">
									System Integrations
								</Link>
							</li>
							<li>
								<Link to="/expertise" className="hover:text-brand-sky transition-colors">
									AI Consulting
								</Link>
							</li>
						</ul>
					</div>

					<div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
						<h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
							Company
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link to="/about-us" className="hover:text-brand-sky transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link to="/our-team" className="hover:text-brand-sky transition-colors">
									Our Team
								</Link>
							</li>
							<li>
								<Link to="/case-studies" className="hover:text-brand-sky transition-colors">
									Case Studies
								</Link>
							</li>
							<li>
								<Link to="/contact" className="hover:text-brand-sky transition-colors">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)]">
						<h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
							Connect
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<a
									href="https://www.linkedin.com/company/we-summit-mountains"
									target="_blank"
									rel="noreferrer"
									className="hover:text-brand-sky transition-colors"
								>
									LinkedIn
								</a>
							</li>
							<li>
								<span>Dallas, Texas</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm">
						&copy; {new Date().getFullYear()} We Summit Mountains
						LLC. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

function MountainIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M8 3l4 8 5-5 7 14H0z" />
			<path d="M4.14 15.08L8 3l2.72 5.44" />
		</svg>
	);
}

export default function Layout() {
	return (
		<div id="app-layout" className="min-h-screen flex flex-col">
			<Header />
			<main id="main-content" className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
