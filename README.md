# michaelwhallman.com

Personal portfolio of Michael W. Hallman — Sr. Engineering Manager, Estée Lauder.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Bootstrap 5.3** + custom Sass + **react-bootstrap**
- **MDX** for case studies (`next-mdx-remote/rsc`)
- **Framer Motion** for restrained motion
- **react-hook-form + zod** for the contact form
- **Resend** for transactional email; **Cloudflare Turnstile** for anti-spam
- Deployed on **Vercel**; domain managed via GoDaddy DNS

## Local development

```bash
pnpm install
cp .env.example .env.local   # fill in Resend + Turnstile keys
pnpm dev
```

Then open <http://localhost:3000>.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Run the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript |

## Repo structure

```
app/                 Next.js app router
  (site)/            Public pages (home, work, about, resume, contact)
  demos/[slug]/      Embedded interactive demos
  api/contact/       Resend-backed contact endpoint
components/          UI components grouped by surface
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

## License

Code: MIT. Content (writing, photos, resume): © Michael W. Hallman.
