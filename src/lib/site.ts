export const siteUrl = "https://www.niklasjodin.se";

export const siteName = "Niklas Sjödin";

/** Primary line on the home hero, below the name. */
export const siteHeadline = "Backend engineer · .NET & integrations";

/** Secondary home hero line, smaller type. */
export const siteTagline = "Curious by default.";

/** Combined line for root OG image subtitle. */
export const siteHeroLine = `${siteHeadline}. ${siteTagline}`;

/** Default meta description for the site (layout, JSON-LD). */
export const siteDescription = `The personal site of ${siteName}. Backend engineer focused on .NET and integrations. Side projects and how to get in touch.`;

export const siteContact: {
  /** Shown on the Contact page when set. */
  email?: string;
  linkedin: string;
  github: string;
} = {
  email: "niklassjodin@hotmail.com",
  linkedin: "https://www.linkedin.com/in/niklas-sj%C3%B6din-626438b9",
  github: "https://github.com/NiklasSjodin",
};

