// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// Set BUILD_TARGET=gh-pages to build a client-preview copy for GitHub Pages
// (served from a /ehl_website/ subpath, not the domain root). Leave unset
// for the real production build targeting Hostway — never mix these up in
// the deploy workflow that pushes to the live FTPS server.
const isGhPages = process.env.BUILD_TARGET === 'gh-pages';

// https://astro.build/config
export default defineConfig({
  site: isGhPages
    ? 'https://halliday2026.github.io/ehl_website'
    : 'https://ehleague.org',
  base: isGhPages ? '/ehl_website' : '/',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});