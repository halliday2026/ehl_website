/**
 * Prefixes an internal, root-relative path with Astro's configured `base`
 * (a no-op in production, where base is "/"; prepends "/ehl_website" on
 * the GitHub Pages preview build). Leaves external URLs and same-page
 * fragment links (`#main`) untouched.
 */
export function withBase(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("#")) {
    return path;
  }

  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalizedBase}${path}`;
}
