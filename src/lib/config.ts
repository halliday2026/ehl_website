export const SITE = {
  name: "Endangered Habitats League",
  shortName: "EHL",
  url: "https://ehleague.org",
  description:
    "Dedicated to the protection of the diverse ecosystems of Southern California — and to sensitive, sustainable land use for the benefit of all the region's inhabitants.",
} as const;

/**
 * TODO(EHL): confirm final donation platform URL (modern hosted PayPal
 * donation page, per brief). Do not deploy with this placeholder — every
 * Donate button on the site links here.
 */
export const DONATE_URL = "https://TODO-EHL-donate-url.example";

export const FORMSPREE = {
  /** TODO(EHL): Formspree form ID for homepage/get-involved newsletter signup, e.g. https://formspree.io/f/XXXXXXX */
  joinUs: "https://formspree.io/f/TODO-EHL-joinus",
  /** TODO(EHL): Formspree form ID for the contact page */
  contact: "https://formspree.io/f/TODO-EHL-contact",
} as const;

export const ORG = {
  /**
   * Mirrored from the live contact.html, which lists both "505 S Flower St
   * #71001" and "PO Box 71001" for the same box number — using the street
   * format here since it's the more complete/deliverable of the two.
   */
  addressLine: "505 S Flower St #71001",
  city: "Los Angeles",
  state: "CA",
  zip: "90071",
  /** Given in the brief — CONFIRM this is still current before it goes live/visible in nav or footer. */
  phone: "213-804-2750",
  /** Footer copy reads "since [year]" in the design handoff. */
  foundedYear: "1991",
  foundingDate: "1991",
  /** TODO(EHL): EIN, if the client wants it in structured data. */
  ein: null as string | null,
} as const;

export const SOCIAL = {
  // TODO(EHL): add real profile URLs, or leave null to omit from sameAs/footer.
  facebook: null as string | null,
  instagram: null as string | null,
  linkedin: null as string | null,
} as const;

export const ANALYTICS = {
  // TODO(EHL): set to "ehleague.org" to enable the Plausible script.
  plausibleDomain: null as string | null,
  // TODO(EHL): Google Search Console HTML-tag verification token.
  googleSiteVerification: null as string | null,
} as const;

export const LOGO = {
  // The real logo (EHL_Logo.png) is imported directly in SiteNav.astro for
  // the nav lockup — this constant is unused there. It stays null because
  // it's only consumed by BaseLayout's JSON-LD `logo` field, which needs a
  // plain URL string (not an ImageMetadata import), and wiring that up
  // wasn't asked for yet.
  src: null as string | null,
} as const;

/**
 * Legacy ASP.NET newsletter app — never rebuilt, only linked to. Always
 * fully-qualified against the real production domain (not a root-relative
 * path): it only ever exists on Hostway, never on a preview host like the
 * GitHub Pages build, which serves everything else under a /ehl_website
 * subpath and has no /news/ of its own.
 */
export const NEWSLETTER = {
  current: "https://ehleague.org/news/public/GetCurrent.aspx",
  // Corrected: this is a static root-level page, not under /news/.
  archive: "https://ehleague.org/newsletter_archive_toc.html",
} as const;
