export interface FooterCtaConfig {
	buttonText: string;
	recordTypeId: string;
	showCta: boolean;
}

const RECORD_TYPE_GENERAL = "012Hs0000007XzWIAU";
const RECORD_TYPE_EMPLOYEE = "012Hs0000007XzbIAE";
const RECORD_TYPE_RESCUE = "012Hs0000007bDBIAY";

const configs: Record<string, FooterCtaConfig> = {
	"/": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true },
	"/about-us": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true },
	"/expertise": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true },
	"/case-studies": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true },
	"/success-stories": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: true },
	"/our-team": { buttonText: "Interested in Working With Us?", recordTypeId: RECORD_TYPE_EMPLOYEE, showCta: true },
	"/contact": { buttonText: "Get In Touch", recordTypeId: RECORD_TYPE_GENERAL, showCta: false },
	"/mountain-rescue": { buttonText: "Request Mountain Rescue", recordTypeId: RECORD_TYPE_RESCUE, showCta: true },
};

const defaultConfig: FooterCtaConfig = {
	buttonText: "Get In Touch",
	recordTypeId: RECORD_TYPE_GENERAL,
	showCta: true,
};

export function getFooterCtaConfig(pathname: string): FooterCtaConfig {
	return configs[pathname] ?? defaultConfig;
}
