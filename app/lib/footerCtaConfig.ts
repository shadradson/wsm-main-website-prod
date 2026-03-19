export interface FooterCtaConfig {
	buttonText: string;
	recordTypeId: string;
	showCta: boolean;
	title?: string;
	subtitle?: string;
	submissionPage?: string;
}

const RECORD_TYPE_GENERAL = "012Hs0000007XzWIAU";
const RECORD_TYPE_EMPLOYEE = "012Hs0000007XzbIAE";
const RECORD_TYPE_RESCUE = "012Hs0000007bDBIAY";

const configs: Record<string, FooterCtaConfig> = {
	"/": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/about-us": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/expertise": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/case-studies": { buttonText: "See How We Can Apply Our Skill", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/success-stories": { buttonText: "Let's Make a Success Story Together", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready for your Success Story?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/ai-consulting": { buttonText: "Get AI Working for You", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Get on Top of AI?", subtitle: "Let's discuss how AI tools can safely and effectively overcome your issues." },
	"/mountain-guide-services": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Need to be rescued?", subtitle: "Get in touch with use to learn about the process and how we can get you back on track!" },
	"/system-integration-services": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready to Connect your Systems?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/fractional-cto-services": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true, title: "Ready for the next level of guidance?", subtitle: "Let's discuss how we can become your technology executive team." },
	"/our-team": { buttonText: "Interested in Working With Us?", recordTypeId: RECORD_TYPE_EMPLOYEE, showCta: true, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/contact": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: false, title: "Ready to Summit your Tech?", subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages." },
	"/mountain-rescue": { buttonText: "Request Mountain Rescue", recordTypeId: RECORD_TYPE_RESCUE, showCta: true, title: "Need to be rescued?", subtitle: "Get in touch with use to learn about the process and how we can get you back on track!" },
};

const defaultConfig: FooterCtaConfig = {
	buttonText: "Get In Touch",
	recordTypeId: RECORD_TYPE_GENERAL,
	showCta: true,
	title: "Ready to Reach Your Summit?",
	subtitle: "Let's discuss how we can transform your technology challenges into competitive advantages.",
};

export function getFooterCtaConfig(pathname: string): FooterCtaConfig {
	return { ...defaultConfig, ...configs[pathname] };
}
