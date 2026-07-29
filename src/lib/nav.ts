export interface NavLink {
  label: string;
  href: string;
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
      { label: "Saving Nature", href: "/what-we-do/" },
      { label: "Strategic Planning", href: "/what-we-do/" },
      { label: "Collaboration", href: "/what-we-do/" },
      { label: "Land Trust", href: "/land-trust/" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Donate", href: "/get-involved/" },
      { label: "Volunteer", href: "/get-involved/" },
      { label: "Newsletter", href: "/get-involved/" },
      { label: "Events", href: "/get-involved/" },
    ],
  },
  {
    heading: "Land Trust",
    links: [
      { label: "EH Conservancy", href: "/land-trust/" },
      { label: "Our Preserves", href: "/land-trust/" },
      { label: "Stewardship", href: "/land-trust/" },
    ],
  },
];
