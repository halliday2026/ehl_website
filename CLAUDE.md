# EHL Website — CLAUDE.md

## What this is

Marketing site for the Endangered Habitats League (EHL), a Southern California
land-conservation nonprofit. Astro 7 static site + Tailwind v4. Production
deploys to Hostway (Windows/IIS) via GitHub Actions + FTPS; a second workflow
deploys the same build to GitHub Pages as a client-review preview (see
"Client-review preview" below). The original design-handoff reference folder
has been deleted (its spec is now fully implemented) — don't recreate it.
Verify changes with `npm run build`. Design tokens live in the `@theme` block
in `src/styles/global.css`; real habitat photos live in `src/assets/images/`
(see that folder's own `README.md` for what's used where).

## Hosting guardrails — read before touching anything server-related

The site shares its IIS web root with a **live legacy ASP.NET application**
(the newsletter). This is the load-bearing constraint behind nearly every
technical decision here:

- **Never create, edit, or deploy a `web.config`.** The existing server one is
  load-bearing for the newsletter's Forms auth, SQL connection strings, and
  Telerik editor handlers. There must be no `web.config` anywhere in this repo
  or in `dist/`.
- **Never touch** `/news/`, `bin/`, `App_Data/`, `App_GlobalResources/`,
  `Global.asax`, or `involved.aspx`. These live only on the host, not in this
  repo. `.claude/settings.json` hard-blocks writes to these paths.
- **Never generate a route named `news`.** The new "Get Involved" page lives
  at `/get-involved/`, distinct from the retired `involved.aspx`.
- Output is static (`output: 'static'`, `build.format: 'directory'`,
  `trailingSlash: 'always'`) — this matches the server's existing
  default-document behavior (`/about/` → `/about/index.html`).
- **`.webp` images are an open risk, not a solved problem.** All photos build
  through Astro's image pipeline to `.webp`. Older/unpatched IIS installs
  don't have that MIME type registered, and we can't fix it the normal way
  (a `web.config` `<mimeMap>` entry) because we can't touch `web.config`. This
  has NOT been verified against the real Hostway server yet. Before the first
  real production deploy: either confirm `.webp` already 404s or works on
  Hostway and have the client add the mapping by hand (small, additive,
  outside this repo — see conversation history / ask the user), or switch
  Astro's image output to `.jpg` (universally safe, modest size cost). Don't
  assume either is done without checking.

## Deploy guardrail

`.github/workflows/deploy.yml` uses `SamKirkland/FTP-Deploy-Action`. **Never
enable `dangerous-clean-slate`** — it would wipe the ASP.NET files, which
aren't in this repo and can't be restored from git. The `exclude` list is the
other half of that protection; don't remove entries from it.

## Client-review preview (GitHub Pages)

`.github/workflows/deploy-preview.yml` deploys the same site to GitHub Pages
on every push to `main` — entirely separate infrastructure from Hostway, safe
to redeploy freely. It builds with `BUILD_TARGET=gh-pages`, which
`astro.config.mjs` uses to switch `site`/`base` to the subpath GitHub Pages
serves project sites from (`https://halliday2026.github.io/ehl_website/`),
since there's no custom domain for the preview. Because of that subpath,
**every internal link must go through `withBase()`** (`src/lib/url.ts`) —
a bare `href="/about/"` will 404 on the preview (still fine on production,
where `base` is `/`). `robots.txt` (`src/pages/robots.txt.ts`) disallows all
crawling on the preview build so it never gets indexed as if it were the
real site. Requires GitHub Pages enabled in repo settings (Settings → Pages
→ Source: GitHub Actions) — a one-time manual step, not something a workflow
run can turn on itself.

## Other invariants

- **Fonts** load from the Google Fonts CDN (`BaseLayout.astro`), not
  self-hosted — self-hosting `.woff2` would require adding a MIME type to the
  untouchable root `web.config`.
- **Forms** post to Formspree via `src/scripts/forms.ts` (client-side fetch,
  no server-side handling). Endpoint IDs live in `src/lib/config.ts`.
- **Donate** is always the `DONATE_URL` constant in `src/lib/config.ts` —
  never hardcode a donate link elsewhere.
- **Never invent copy** for bracketed placeholders (`[ Street Address ]`,
  `[ Field story headline ]`, etc.) or unresolved config values — leave them
  clearly marked for the client to fill in. Comments use `TODO(EHL): ...`;
  actual placeholder string values use a grep-able `TODO-EHL-...` token (e.g.
  `"TODO-EHL-donate-url"`) since URLs can't contain parens/spaces. `grep -rn
  "TODO(EHL)\|TODO-EHL" src/` finds every open item, both kinds. Note: `ORG.phone`
  (`213-804-2750`) is a real value from the brief, not a placeholder — it
  still needs a currency check before launch, but don't treat it as unknown.

## Development

Start the dev server in background mode: `astro dev --background`. Manage it
with `astro dev stop`, `astro dev status`, `astro dev logs`.
