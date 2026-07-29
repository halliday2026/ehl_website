import type { APIRoute } from "astro";

// Preview builds (GitHub Pages) should never be indexed — this is a
// throwaway client-review URL, not the real site. Only the production
// Hostway build advertises itself to crawlers and points at the sitemap.
const isGhPages = process.env.BUILD_TARGET === "gh-pages";

export const GET: APIRoute = ({ site }) => {
  const body = isGhPages
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
