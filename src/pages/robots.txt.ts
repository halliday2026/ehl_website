import type { APIRoute } from "astro";

// The BUILD_TARGET=gh-pages variant (the default halliday2026.github.io/
// ehl_website/ subpath URL, not the ehleague.org custom domain — see
// astro.config.mjs) should never be indexed, since it's a secondary/fallback
// URL for the same content. The real production build (BUILD_TARGET unset,
// served at ehleague.org) advertises itself to crawlers and points at the
// sitemap.
const isGhPages = process.env.BUILD_TARGET === "gh-pages";

export const GET: APIRoute = ({ site }) => {
  const body = isGhPages
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
