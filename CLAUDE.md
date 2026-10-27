# EHL Website — CLAUDE.md

## What this is

Marketing site for the Endangered Habitats League (EHL), a Southern California
land-conservation nonprofit. Astro 7 static site + Tailwind v4. Production is
**GitHub Pages**, served at the `ehleague.org` / `www.ehleague.org` custom
domain (DNS + HTTPS already provisioned and verified live). The original
design-handoff reference folder has been deleted (its spec is now fully
implemented) — don't recreate it. Verify changes with `npm run build`. Design
tokens live in the `@theme` block in `src/styles/global.css`; real habitat
photos live in `src/assets/images/` (see that folder's own `README.md` for
what's used where).

## Hosting

`.github/workflows/deploy-preview.yml` builds and deploys to GitHub Pages on
every push to `main` (the name is a holdover from when this was just a
preview — it's the real production deploy now). It builds with `BUILD_TARGET`
**unset**, which gives the root-relative config in `astro.config.mjs`
(`base: '/'`, `site: 'https://ehleague.org'`) that the custom domain needs.
**Never set `BUILD_TARGET=gh-pages` in that workflow** — that produces a
`/ehl_website`-subpath build, which breaks every internal link and flips
`robots.txt` to `Disallow: /` on the live domain. This exact mistake shipped
once already; it's why this section exists.

`BUILD_TARGET=gh-pages` still exists as a manual fallback: it builds for the
default `halliday2026.github.io/ehl_website/` URL (no custom domain), useful
only if `ehleague.org` itself is ever down. Nothing currently deploys with it
set. Because that fallback build lives under a subpath, **every internal
link must still go through `withBase()`** (`src/lib/url.ts`) regardless of
which target you're building for — a bare `href="/about/"` would 404 on the
fallback build (harmless no-op on the real production build, where `base` is
already `/`).

**Historical context, in case old comments/instincts reference it:** this
site used to share an IIS web root on Hostway with a live legacy ASP.NET
newsletter app, which is why `web.config`, `/news/`, `involved.aspx`, and
`.webp`-MIME-type-on-IIS used to be load-bearing constraints documented here.
**None of that applies anymore.** The newsletter has fully migrated to its
own app at `news.ehleague.org` (hosted on Render — see `NEWSLETTER` in
`src/lib/config.ts`), and the Hostway FTPS deploy workflow has been removed
entirely. This repo has no IIS, no `web.config`, and no ASP.NET-adjacent path
to avoid — if you find old comments elsewhere in the codebase still warning
about these, they're stale, not a sign of a constraint that came back.

## Launch checklist

`docs/LAUNCH_CHECKLIST.md` tracks action items that must happen at cutover,
not before (e.g. updating the PayPal donate button's return/cancel URLs in
the PayPal dashboard, currently still pointed at the legacy site). Check it
before any real production go-live, and add to it rather than letting
cutover-only tasks get silently handled inline elsewhere.

## Other invariants

- **Fonts** load from the Google Fonts CDN (`BaseLayout.astro`), not
  self-hosted — self-hosting `.woff2` would require adding a MIME type to the
  untouchable root `web.config`.
- **Forms** post to Formspree via `src/scripts/forms.ts` (client-side fetch,
  no server-side handling). Endpoint IDs live in `src/lib/config.ts`.
  `forms.ts` auto-wires *any* `form[data-formspree-form]` on the page, so new
  forms just need that attribute — no extra JS. The newsletter signup
  (`NewsletterModal.astro`) opens in a `<dialog>` rather than being inline,
  same pattern as the gallery lightbox. Its form includes a honeypot field
  (`name="_gotcha"`, visually hidden, `aria-hidden`) — Formspree silently
  discards submissions where it's filled — as lightweight bot protection
  without a CAPTCHA/Turnstile integration (which would need a site key we
  don't have). Don't remove it as dead-looking markup.
- **Donate** is always the `DONATE_URL` constant in `src/lib/config.ts` —
  never hardcode a donate link elsewhere. It's a PayPal **Hosted Donate
  Button** URL (`paypal.com/donate/?hosted_button_id=...`), i.e. a plain
  external redirect — deliberately not an embedded PayPal JS SDK button.
  Don't reintroduce an embedded/SDK version without it being asked for.
- **Newsletter** content/pages are always external — `NEWSLETTER.current` and
  `NEWSLETTER.archive` in `src/lib/config.ts`, both pointing at
  `news.ehleague.org` (a separate app on Render, not part of this repo). This
  repo doesn't mirror, rebuild, or host any newsletter content itself — there
  was a static `/newsletter-archive/` page here briefly that mirrored the old
  legacy TOC, but it was removed once the real app's own archive existed,
  since its per-issue links had gone stale. Don't recreate that pattern.
- **Never invent copy** for bracketed placeholders (`[ Street Address ]`,
  `[ Field story headline ]`, etc.) or unresolved config values — leave them
  clearly marked for the client to fill in. Comments use `TODO(EHL): ...`;
  actual placeholder string values use a grep-able `TODO-EHL-...` token (e.g.
  `"TODO-EHL-donate-url"`) since URLs can't contain parens/spaces. `grep -rn
  "TODO(EHL)\|TODO-EHL" src/` finds every open item, both kinds. Note: `ORG.phone`
  (`213-804-2750`) is a real value from the brief, not a placeholder — it
  still needs a currency check before launch, but don't treat it as unknown.

## Client-provided copy

The client sends real copy as Word docs (`.docx`), not plain text. The Read
tool can't open them (binary). To extract: a `.docx` is a zip archive —
unzip it and parse `word/document.xml`'s `w:t` text nodes for the body
text. Read the XML with UTF-8 explicitly (not a default/ANSI codepage) or
smart quotes and em-dashes come through as mojibake. When placing extracted
copy into the site, use body/paragraph text only — skip the document's own
heading/title paragraphs (the site has its own heading structure) and
anything that's an image rather than real text; treat this content as
authoritative over whatever placeholder or previously-mirrored text is
already in the site.

## Development

Start the dev server in background mode: `astro dev --background`. Manage it
with `astro dev stop`, `astro dev status`, `astro dev logs`. If `npm run dev`
or `astro dev` refuses to start, claiming a server is already running,
`.astro/dev.json`'s tracked PID may be stale (e.g. after an ungraceful
close) — Astro trusts that file without verifying the PID is still actually
the dev server. Run `astro dev stop` to clear it (or delete
`.astro/dev.json` directly if `stop` doesn't clean it up) before retrying.
