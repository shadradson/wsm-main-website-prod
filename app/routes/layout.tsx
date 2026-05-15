import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import BirdsFlock from "~/components/BirdsFlock";
import FooterContactForm from "~/components/FooterContactForm";
import { LayoutConfigInterface } from "~/lib/LayoutConfig";

function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [navVisible, setNavVisible] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const location = useLocation();
	//const LayoutConfig = LayoutConfigInterface(location.pathname);
	const isHome = location.pathname === "/";
	const isOurTeam = location.pathname === "/about-us";
	const LayoutConfig = location.pathname.includes("article") ? LayoutConfigInterface("/article") : LayoutConfigInterface(location.pathname);

	useEffect(() => {
		const onScroll = () => {
			if (isOurTeam) {
				setScrolled(window.scrollY > window.innerHeight * 1);
				setNavVisible(window.scrollY > window.innerHeight * 1.4);
			} else {
				setScrolled(window.scrollY > 20);
			}
			if (isHome) {
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
		{ to: "/", label: "Home" },
		{ to: "/about-us", label: "About Us" },
		{
			to: "/expertise", label: "Expertise", children: [
				{ to: "/ai-consulting", label: "AI Consulting" },
				{ to: "/mountain-guide-services", label: "Salesforce Implementation" },
				{ to: "/system-integration-services", label: "System Integrations" },
				{ to: "/fractional-cto-services", label: "CTO" },
			],
		},
		{ to: "/case-studies", label: "Case Studies" },
		{ to: "/success-stories", label: "Success Stories" },
	];

	function handleGetClimbing() {
		setMobileOpen(false);
		const el = document.getElementById("home-cta-card");
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
		window.dispatchEvent(new CustomEvent("openFooterForm"));
	}

	const showEarlyHamburger = (isHome || isOurTeam) && !navVisible;

	return (
		<>
		{/* Floating hamburger shown before main nav appears on home/about-us */}
		{showEarlyHamburger && (
			<div className="fixed top-0 right-0 z-[60]">
				<button
					className="text-white bg-black p-3 m-2"
					onClick={() => { setNavVisible(true); setMobileOpen(!mobileOpen); }}
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
		)}

		{/* Single mobile menu, shared by both early hamburger and main header */}
		{mobileOpen && (
			<div id="mobile-menu" className="lg:hidden fixed top-12 left-0 right-0 z-[55] bg-black border-t border-white/10 max-h-[80vh] overflow-y-auto">
				<div id="mobile-nav-links" className="px-4 py-4 space-y-1">
					{navLinks.map((link) => (
						<div key={link.to}>
							<div className="flex items-center">
								<NavLink
									to={link.to}
									end={link.to === "/"}
									onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}
									className={({ isActive }) =>
										`flex-1 block px-4 py-3 text-sm font-medium transition-colors ${isActive
											? "text-brand-sky bg-white/10"
											: "text-gray-300 hover:text-white hover:bg-white/5"
										}`
									}
								>
									{link.label}
								</NavLink>
								{link.children && (
									<button
										onClick={() => setOpenDropdown(openDropdown === link.to ? null : link.to)}
										className="text-gray-400 hover:text-white p-3"
									>
										<svg className={`w-4 h-4 transition-transform ${openDropdown === link.to ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
										</svg>
									</button>
								)}
							</div>
							{link.children && openDropdown === link.to && (
								<div className="ml-4 border-l border-white/10 pl-2 space-y-1">
									{link.children.map((child) => (
										<NavLink
											key={child.to}
											to={child.to}
											onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}
											className={({ isActive }) =>
												`block px-4 py-2 text-sm transition-colors ${isActive
													? "text-brand-sky bg-white/10"
													: "text-gray-400 hover:text-white hover:bg-white/5"
												}`
											}
										>
											{child.label}
										</NavLink>
									))}
								</div>
							)}
						</div>
					))}
					<button
						onClick={handleGetClimbing}
						className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
					>
						Get Climbing
					</button>
				</div>
			</div>
		)}

		<header id="main-header" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${(isHome || isOurTeam) && !navVisible ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"} ${ !scrolled && LayoutConfig.navBarTransparentOnHero ? "bg-transparent" : "bg-black" }`}>
			<div id="header-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div id="header-row" className="relative flex items-center h-12 lg:h-16">
					{/* Logo: centered on mobile always, left-aligned on desktop */}
					<Link
						to="/"
						id="header-logo-link"
						aria-label="We Summit Mountains home"
						className="transition-all duration-300 absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:static"
					>
						<img
							id="header-logo"
							src="/images/WSM_LOGO_V2_Norm_TXT_Wht.svg"
							alt="We Summit Mountains"
							className="h-10"
						/>
					</Link>

					{/* Desktop nav: centered when logo hidden, right-aligned when logo shows */}
					<nav id="desktop-nav" className="hidden lg:flex items-center gap-1 transition-all duration-300 ml-auto">
						{navLinks.map((link) => (
							<div key={link.to} className="relative group">
								<NavLink
									to={link.to}
									end={link.to === "/"}
									className={({ isActive }) =>
										`px-4 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1 ${isActive
											? "text-brand-sky bg-white/10"
											: "text-gray-300 hover:text-white hover:bg-white/5"
										}`
									}
								>
									{link.label}
									{link.children && (
										<svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
										</svg>
									)}
								</NavLink>
								{link.children && (
									<div className="absolute top-full left-0 hidden group-hover:block pt-1 min-w-[200px]">
										<div className="bg-black border border-white/10 py-2">
											{link.children.map((child) => (
												<NavLink
													key={child.to}
													to={child.to}
													className={({ isActive }) =>
														`block px-4 py-2 text-sm transition-colors ${isActive
															? "text-brand-sky bg-white/10"
															: "text-gray-300 hover:text-white hover:bg-white/5"
														}`
													}
												>
													{child.label}
												</NavLink>
											))}
										</div>
									</div>
								)}
							</div>
						))}
						<button
							onClick={handleGetClimbing}
							className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
						>
							Get Climbing
						</button>
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
		</header>
		</>
	);
}

function Footer() {
	const location = useLocation();
	const LayoutConfig = LayoutConfigInterface(location.pathname);
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		setFormOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const handler = () => setFormOpen(true);
		window.addEventListener("openFooterForm", handler);
		return () => window.removeEventListener("openFooterForm", handler);
	}, []);

	return (
		<footer id="main-footer" className="text-gray-400 flex min-h-[100vh] flex-col items-center w-full relative overflow-clip">

			{/* Footer parallax layers */}
			
			<div className="footer_parallax_layer footer_mountains_anim">
				<img src="/images/Rendered_Bright_Mountains.png" alt="" className="footer_mountains_img" />
			</div>
			{/*<div className="footer_ground_box"></div>*/}
			<div className="footer_parallax_layer footer_trees">
				<img src="/images/footer_extra_trees.svg" alt="" className="footer_extra_trees_img" />
			</div>
			<div className="footer_parallax_layer footer_hillside">
				<img src="/images/footer_hillside.svg" alt="" className="footer_hillside_img" />
			</div>

			<BirdsFlock birdColor="#eeBDA0" birdCount={200} separationDistance={20} speedLimit={7} alignmentDistance={30} birdScale={0.2} birdWiggleRandomMultiplier={100} />

			<div id="footer-content" className="relative z-10">

				{LayoutConfig.showCta && (
					<div id="home-cta-card" className="sm:py-4 lg:py-20">
						<div className="max-w-7xl mx-auto md:px-8 pb-30 sm:px-2 lg:px-8">
							<div className="relative p-4 sm:p-6 md:p-12 lg:p-16 text-center overflow-hidden">
								<div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10  blur-3xl" />
								<div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/10  blur-3xl" />

								<div className="relative">
									<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
										{LayoutConfig.title}
									</h2>
									<p className="text-lg text-white max-w-xl mx-auto mb-8">
										{LayoutConfig.subtitle}
									</p>
									<div className="flex flex-col sm:flex-row gap-4 justify-center p-4">
										<button
											type="button"
											onClick={() => setFormOpen(!formOpen)}
											className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold hover:bg-brand-blue-light transition-all hover:shadow-lg hover:shadow-brand-blue/25"
										>
											{LayoutConfig.buttonText}
										</button>
									</div>

									<div
										style={{
											maxHeight: formOpen ? "1000px" : "0px",
											overflow: "hidden",
											transition: "max-height 1s ease-in-out",
										}}
									>
										<div className="mt-8">
											<FooterContactForm recordTypeId={LayoutConfig.recordTypeId} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

			</div>

			<div className="footer_bottom_box flex flex-col justify-between sm:flex-row justify-between items-center px-6 sm:px-12 py-8 gap-8 relative z-10">
				{/* Col 1: Logo & location */}
				<div className="flex flex-col gap-3 ">
					<Link to="/" aria-label="We Summit Mountains home">
						<img
							id="footer-logo"
							src="/images/WSM_LOGO_V2_Norm_TXT_Wht.svg"
							alt="We Summit Mountains"
							className="w-[200px]"
						/>
					</Link>
					<p className="text-xs text-center text-white">&copy; {new Date().getFullYear()} We Summit Mountains</p>
					<p className="text-xs text-center text-white">Dallas, Texas</p>
					<div className="flex justify-center gap-4">
						<a href="https://www.linkedin.com/company/we-summit-mountains" target="_blank" rel="noreferrer" className="text-white hover:text-wsm-mountain transition-colors" aria-label="LinkedIn">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
						</a>
						<a href="#" target="_blank" rel="noreferrer" className="text-white hover:text-wsm-mountain transition-colors" aria-label="YouTube">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
						</a>
						<a href="#" target="_blank" rel="noreferrer" className="text-white hover:text-wsm-mountain transition-colors" aria-label="Salesforce AppExchange">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.856 3.69 2.148a5.173 5.173 0 012.009-.404c2.868 0 5.19 2.337 5.19 5.218 0 2.882-2.322 5.22-5.19 5.22a5.15 5.15 0 01-1.316-.171 4.074 4.074 0 01-3.594 2.147 4.074 4.074 0 01-1.88-.46 4.622 4.622 0 01-3.81 2.022c-2.198 0-4.028-1.542-4.49-3.6a4.166 4.166 0 01-.56.038C1.232 16.267 0 14.71 0 12.818c0-1.263.683-2.467 1.727-3.1a4.498 4.498 0 01-.333-1.691C1.394 5.36 3.763 3 6.71 3c1.37 0 2.63.49 3.296 2.415z" /></svg>
						</a>
					</div>
				</div>

				{/* Col 3: Links */}
				<div className="flex flex-col gap-2 text-sm sm:text-right">
					<Link to="/expertise" aria-label="View AI Consulting service" className="text-gray-400 hover:text-wsm-mountain font-[700] transition-colors">AI Consulting</Link>
					<Link to="/expertise" aria-label="View Salesforce Implementation service" className="text-gray-400 hover:text-wsm-mountain font-[700] transition-colors">Salesforce Implementation</Link>
					<Link to="/expertise" aria-label="View CTO Services" className="text-gray-400 hover:text-wsm-mountain font-[700] transition-colors">CTO Services</Link>
					<Link to="/expertise" aria-label="View System Integrations service" className="text-gray-400 hover:text-wsm-mountain font-[700] transition-colors">System Integrations</Link>
					
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
