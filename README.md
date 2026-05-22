# michaelwhallman.com

Personal portfolio of Michael W. Hallman — Sr. Engineering Manager, Estée Lauder.

## Stack

- **Next.js 15** (App Router, React 19) + **TypeScript 5.7**
- **Bootstrap 5.3** + custom Sass + **react-bootstrap**
- **MDX** for case studies (`next-mdx-remote/rsc`)
- **Framer Motion** for restrained animation
- **react-hook-form + zod** for the contact form
- **Resend** for transactional email; **Cloudflare Turnstile** for anti-spam
- **simple-icons** (`@icons-pack/react-simple-icons`) + **lucide-react** for icons
- Deployed on **Vercel**; domain managed via **GoDaddy** DNS

## Accounts & services

| Service | Purpose |
| --- | --- |
| **Vercel** | Hosting, CI/CD, preview deploys |
| **GoDaddy** | DNS for `michaelwhallman.com` |
| **Resend** | Transactional email from the contact form |
| **Cloudflare Turnstile** | Bot/spam protection on the contact form |

## Local development

```bash
pnpm install
cp .env.example .env.local   # fill in Resend + Turnstile keys
pnpm dev
```

Then open <http://localhost:3000>.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Run the dev server |
| `pnpm build` | Lint, typecheck, test, then production build (fails fast) |
| `pnpm build:next` | Production build only — skips the gates above |
| `pnpm start` | Run the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript |
| `pnpm test` | Run the Vitest test suite |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm test:coverage` | Vitest with v8 coverage report |

## Repo structure

```text
app/                 Next.js app router
  (site)/            Public pages (home, work, resume, contact)
  demos/[slug]/      Embedded interactive demos
  api/contact/       Resend-backed contact endpoint
components/          UI components grouped by surface
  footer/            FooterContact, FooterAI, FooterBar
  home/              Hero, FeaturedWork, ImpactStrip, Timeline, etc.
  layout/            SiteNavbar, SiteFooter
  work/              WorkGrid
content/             MDX case studies
lib/                 Site config, content data, contact schema, Turnstile helper
public/              Static assets (headshots, awards, logos, resume PDF)
styles/              Bootstrap variable overrides + bespoke styles
```

## Adding a case study

1. Add an entry to `lib/content/case-studies.ts`
2. Create `content/case-studies/<slug>.mdx` with the body
3. (Optional) If you want a featured slot on the home page, set `featured: true`
4. (Optional) Configure the `demo` field with either `embed`, `external`, or `archive`

## Deployment

Vercel auto-deploys on push to `main` and on every PR (preview deploys).

**Required environment variables** (set in Vercel project settings):

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

**Domain cutover** (GoDaddy → Vercel):

1. Deploy site to Vercel; add `michaelwhallman.com` and `www` in project settings
2. In GoDaddy DNS: `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`
3. Add Resend domain-verification MX/TXT records via GoDaddy DNS

## Built in collaboration with AI

This site is itself a demonstration of AI-assisted engineering. Every layer — from planning
and architecture to deployment configuration — was built with **Claude Code** (Anthropic)
and **Codex CLI** (OpenAI), with all direction, review, and judgment provided by the author.

The footer expands on which phases of the build used AI and how.

## License

Code: MIT. Content (writing, photos, resume): © Michael W. Hallman.
