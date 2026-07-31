import { DONATE_URL } from "./config";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Primary nav — used by SiteNav (desktop) and MobileNav. */
export const PRIMARY_NAV: NavLink[] = [
  { label: "About", href: "/about/" },
  { label: "What We Do", href: "/what-we-do/" },
  { label: "Projects", href: "/projects/" },
  { label: "Get Involved", href: "/get-involved/" },
];

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

/** Footer's 4 link columns — fuller nav than the primary row. */
export const FOOTER_NAV: FooterColumn[] = [
  {
    heading: "About",
    links: [
      { label: "Our Mission", href: "/about/" },
      { label: "Board & Staff", href: "/about/" },
      { label: "Financials", href: "/about/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    heading: "What We Do",
    links: [
      { label: "Saving Nature", href: "/what-we-do/#saving-nature" },
      { label: "Strategic Planning", href: "/what-we-do/#strategic-planning" },
      { label: "Collaboration", href: "/what-we-do/#collaboration" },
      { label: "Land Trust", href: "/land-trust/" },
      { label: "Projects", href: "/projects/" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      // Donate always uses DONATE_URL directly (never a route) — see CLAUDE.md.
      { label: "Donate", href: DONATE_URL, external: true },
      { label: "Volunteer", href: "/get-involved/" },
      { label: "Newsletter", href: "/get-involved/#newsletter" },
      { label: "Events", href: "/get-involved/" },
    ],
  },
  {
    heading: "Land Trust",
    links: [
      // "Our Preserves" / "Stewardship" removed: carried over from the
      // original design mockup, but there's no distinct content for either
      // (on this site or the legacy one) to actually link to — see prior
      // conversation. Revisit if the client provides real preserve-listing
      // or stewardship-practices content later.
      { label: "EH Conservancy", href: "/land-trust/" },
    ],
  },
];
