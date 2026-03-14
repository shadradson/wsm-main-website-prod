import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import BirdsFlock from "~/components/BirdsFlock";
import FooterContactForm from "~/components/FooterContactForm";
import { getFooterCtaConfig } from "~/lib/footerCtaConfig";

function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [heroLogoGone, setHeroLogoGone] = useState(false);
	const [navVisible, setNavVisible] = useState(false);
	const location = useLocation();
	const isHome = location.pathname === "/";
	const isOurTeam = location.pathname === "/about-us";

	useEffect(() => {
		const onScroll = () => {
			if (isOurTeam) {
				setScrolled(window.scrollY > window.innerHeight * 1);
				setNavVisible(window.scrollY > window.innerHeight * 1.4);
			} else {
				setScrolled(window.scrollY > 20);
			}
			if (isHome) {
				setHeroLogoGone(window.scrollY > window.innerHeight * 1);
				setNavVisible(window.scrollY > window.innerHeight * 0.5);
			}
			if (!isHome && !isOurTeam) {
				setNavVisible(true);
			}
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [isHome, isOurTeam]);

	const navLinks = [
		{ to: "/about-us", label: "About Us" },
		{ to: "/expertise", label: "Expertise" },
		{ to: "/case-studies", label: "Case Studies" },
		{ to: "/contact", label: "Contact" },
	];

	return (
		<header id="main-header" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${(isHome || isOurTeam) && !navVisible ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"} ${scrolled ? "bg-summit-dark/95 backdrop-blur-sm border-b border-white/10" : "bg-transparent border-b border-transparent"}`}>
			<div id="header-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div id="header-row" className="relative flex items-center h-12 lg:h-16">
					{/* Logo: centered on mobile always, left-aligned on desktop */}
					<Link
						to="/"
						id="header-logo-link"
						className={`transition-all duration-300 lg:relative ${isHome && !heroLogoGone
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
									`px-4 py-2  text-sm font-medium transition-colors ${isActive
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
									`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
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
	const location = useLocation();
	const ctaConfig = getFooterCtaConfig(location.pathname);
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		setFormOpen(false);
	}, [location.pathname]);

	return (
		<footer id="main-footer" className="text-gray-400 flex flex-col items-center w-full relative">
			<img src="/images/Rendered_Bright_Mountains.png" alt="" className="footer_mtn_image absolute bottom-0 left-0 w-full h-auto z-0" />

			<BirdsFlock birdColor="#eeeeff" birdCount={120} separationDistance={20} speedLimit={7} alignmentDistance={30} birdScale={0.1} />

			<div id="footer-content" className="relative z-10">

				{ctaConfig.showCta && (
					<div className="py-20 lg:py-28">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div id="home-cta-card" className="relative p-12 lg:p-16 text-center overflow-hidden">
								<div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10  blur-3xl" />
								<div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/10  blur-3xl" />

								<div className="relative">
									<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
										Ready to Reach Your Summit?
									</h2>
									<p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
										Let's discuss how we can transform your technology
										challenges into competitive advantages.
									</p>
									<div className="flex flex-col sm:flex-row gap-4 justify-center">
										<button
											type="button"
											onClick={() => setFormOpen(!formOpen)}
											className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-semibold hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
										>
											{ctaConfig.buttonText}
										</button>
										<Link
											to="/case-studies"
											className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
										>
											View Case Studies
										</Link>
									</div>

									{formOpen && (
										<div className="mt-8">
											<FooterContactForm recordTypeId={ctaConfig.recordTypeId} />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}


				<div className="w-full ">
					{/* Box 1: Logo, copyright, social icons */}
					<div className="text-center mb-6 glow-logo">
						<Link to="/" className="inline-block">
							<img
								id="footer-logo"
								src="/images/WSM_LOGO_V2_Norm_TXT_Color.svg"
								alt="We Summit Mountains"
								className="min-w-[200px] max-w-[300px] p-4 mx-auto"
							/>
						</Link>
						<div className="flex gap-4 justify-center mt-4">
							<a href="https://www.linkedin.com/company/we-summit-mountains" target="_blank" rel="noreferrer" className="text-black hover:text-wsm-cliff transition-colors" aria-label="LinkedIn">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
							</a>
							<a href="#" target="_blank" rel="noreferrer" className="text-black hover:text-wsm-cliff transition-colors" aria-label="YouTube">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
							</a>
							<a href="#" target="_blank" rel="noreferrer" className="text-black hover:text-wsm-cliff transition-colors" aria-label="Salesforce AppExchange">
								<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.856 3.69 2.148a5.173 5.173 0 012.009-.404c2.868 0 5.19 2.337 5.19 5.218 0 2.882-2.322 5.22-5.19 5.22a5.15 5.15 0 01-1.316-.171 4.074 4.074 0 01-3.594 2.147 4.074 4.074 0 01-1.88-.46 4.622 4.622 0 01-3.81 2.022c-2.198 0-4.028-1.542-4.49-3.6a4.166 4.166 0 01-.56.038C1.232 16.267 0 14.71 0 12.818c0-1.263.683-2.467 1.727-3.1a4.498 4.498 0 01-.333-1.691C1.394 5.36 3.763 3 6.71 3c1.37 0 2.63.49 3.296 2.415z" /></svg>
							</a>
						</div>
					</div>
				</div>

				{/* Box 2: Links - horizontal */}
				<div className="flex flex-col bg-[#466E8A]">
						<div>
							<p className="text-sm text-[#08192A] font-[700] text-center p-2">
								&copy; {new Date().getFullYear()} We Summit Mountains | Dallas, Texas
							</p>
						</div>
						<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm border-t border-black/10 p-2 ">
							<Link to="/expertise" className="hover:text-wsm-mountain text-[#08192A] font-[700] transition-colors">Salesforce Implementation</Link>
							<Link to="/expertise" className="hover:text-wsm-mountain text-[#08192A] font-[700] transition-colors">Cloud CRM Solutions</Link>
							<Link to="/expertise" className="hover:text-wsm-mountain text-[#08192A] font-[700] transition-colors">System Integrations</Link>
							<Link to="/expertise" className="hover:text-wsm-mountain text-[#08192A] font-[700] transition-colors">AI Consulting</Link>
						</div>
					</div>

			</div>
			

		</footer>
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
