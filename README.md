# EHL Website

Marketing site for the Endangered Habitats League. Astro 7 static site +
Tailwind v4. See `CLAUDE.md` for the hosting/deploy guardrails — this repo
shares an IIS web root with a live legacy ASP.NET app that must never be
touched.

## Commands

| Command           | Action                                  |
| ------------------ | ---------------------------------------- |
| `npm install`      | Install dependencies                     |
| `npm run dev`       | Start local dev server at `localhost:4321` |
| `npm run build`     | Build production site to `./dist/`        |
| `npm run preview`   | Preview the build locally                 |

## Deploy

`.github/workflows/deploy.yml` builds and deploys `dist/` to Hostway over
FTPS on every push to `main`. Before the first live deploy:

1. Set these repo secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
2. Confirm the real Hostway FTP root and update `server-dir` in the workflow
   (currently a placeholder `/`).
3. Confirm with the host whether `robots.txt` or a favicon already exists at
   the shared web root — ours would silently overwrite them on first sync.

`dangerous-clean-slate` must stay `false` — it would wipe the legacy
ASP.NET app's files, which aren't in this repo.

## Client-review preview

`.github/workflows/deploy-preview.yml` deploys to GitHub Pages on every push
to `main` — separate infrastructure from Hostway, nothing to configure, safe
to redeploy freely. Live at `https://halliday2026.github.io/ehl_website/`
once GitHub Pages is turned on for this repo (Settings → Pages → Source:
GitHub Actions — one-time manual step). It's `noindex`ed so it won't show up
in search results. Canonical links/JSON-LD on that preview still point at
`ehleague.org` — expected, not a bug, since that's the real production
domain regardless of where a given build happens to be hosted.

## Open placeholders

Run `grep -r "TODO" src/lib/config.ts` for the full list (Donate URL,
Formspree endpoint IDs, address, ZIP, analytics IDs, logo). Bracketed
copy like `[ Street Address ]` or `[ Field story headline ]` is intentional
client-supplied-later placeholder text, not a bug. Phone (`213-804-2750`)
was supplied in the brief — confirm it's still current before it goes live.

## Forms

Both the homepage/get-involved newsletter signup and the contact form post
to Formspree (`src/lib/config.ts` → `FORMSPREE`), not to any server-side
handler. The newsletter signup **replaces the legacy `involved.aspx`
member-signup** — new signups now arrive by email instead of writing to the
SQL member database. **CONFIRM where these should land:** a staff inbox, or
forwarded into EHL's list tool.

## Analytics coverage note

Plausible (once enabled) only tracks pages rendered through this Astro
site's `BaseLayout`. The legacy `/news/*` ASP.NET pages sit outside this
layout and are not tracked — the Google Search Console verification tag on
the homepage still verifies the whole domain, but Search Console/Plausible
won't show `/news/*` traffic.

## Known accessibility follow-up

Two design tokens fall short of WCAG 2.2 AA text contrast (4.5:1) at the
sizes currently used — flagged here rather than silently changed, since
both are named brand colors:

- **Donate button** (white text on `#e0682f`): ~3.4:1. Passes the 3:1
  non-text/large-text threshold but not the 4.5:1 normal-text threshold at
  15–17px. Options: bump button text to ≥19px bold (qualifies as "large
  text," 3:1 applies), or darken the button background slightly.
- **Ochre eyebrow labels** (`#a07b3c` on `#fbf8f1`): ~3.7:1. Used for every
  section's small uppercase kicker text. Would need a darker shade to clear
  4.5:1 at this size.

The design handoff's own README flagged the first of these as unverified;
both need a client/design decision before launch, not just an
implementation fix.
