export interface LayoutConfig {
	buttonText: string;
	recordTypeId: string;
	showCta: boolean;
	title?: string;
	subtitle?: string;
	submissionPage?: string;
	navBarTransparentOnHero?: boolean;
	navBarStartSmall?: boolean;	
}

const RECORD_TYPE_GENERAL = "012Hs0000007XzWIAU";
const RECORD_TYPE_EMPLOYEE = "012Hs0000007XzbIAE";
const RECORD_TYPE_RESCUE = "012Hs0000007bDBIAY";

const configs: Record<string, LayoutConfig> = {
	"/": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/about-us": { buttonText: "Interested in Working With Us?", recordTypeId: RECORD_TYPE_EMPLOYEE, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.", navBarTransparentOnHero: false, navBarStartSmall: true },
	"/expertise": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/case-studies": { buttonText: "See How We Can Apply Our Skill", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/success-stories": { buttonText: "Let's Make a Success Story Together", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready for your Success Story?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/ai-consulting": { buttonText: "Get AI Working for You", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Get on Top of AI?", subtitle: "Let's discuss how AI tools can safely and effectively overcome your issues.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/mountain-guide-services": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit Salesforce?", subtitle: "", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/system-integration-services": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Connect your Systems?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/fractional-cto-services": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready for the next level of guidance?", subtitle: "Let's discuss how we can become your technology executive team.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/contact": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: false, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/mountain-rescue": { buttonText: "Request Mountain Rescue", recordTypeId: RECORD_TYPE_RESCUE, showCta: true, title: "Need to be rescued?", subtitle: "Reach out to learn about our process to get you back on track!", navBarTransparentOnHero: true, navBarStartSmall: false },
	"/article": { buttonText: "Get Started", recordTypeId: RECORD_TYPE_RESCUE, showCta: true, title: "Ready to climb?", subtitle: "You are just a few clickes away!", navBarTransparentOnHero: false, navBarStartSmall: false },
};

const defaultConfig: LayoutConfig = {
	buttonText: "Get In Touch",
	recordTypeId: RECORD_TYPE_GENERAL,
	showCta: true,
	title: "Ready to Reach Your Summit?",
	subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.",
	navBarTransparentOnHero: true
};

export function LayoutConfigInterface(pathname: string): LayoutConfig {
	return { ...defaultConfig, ...configs[pathname] };
}
