// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// Production is GitHub Pages, served at the ehleague.org custom domain root
// (see deploy-preview.yml) — that's the default (BUILD_TARGET unset) build
// below. BUILD_TARGET=gh-pages is now only a manual fallback: it builds for
// the default halliday2026.github.io/ehl_website/ subpath URL, useful if
// the custom domain is ever down, but nothing currently deploys with it set.
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