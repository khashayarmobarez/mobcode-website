<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# passkadeh project

Persian (RTL) store site for **passkadeh** — sells AI accounts (opencode,
Cline, more via admin), paid via manual **card-to-card** with order/receipt
handling in Telegram. Catalog lives in Neon (Postgres); receipts/cover
images in Vercel Blob; see `PLAN.md` for the roadmap (AI service packages →
online checkout later).
Stack: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, App
Router. Requires Node.js 20.9+. All site copy is Persian; keep it that way
unless asked.

## Next.js 16 gotchas

Read guides in `node_modules/next/dist/docs/` before writing code (see the
managed block above). Key v16 breaking changes to remember:

- **Turbopack is the default bundler** for both `next dev` and `next build` —
  no `--turbopack` flag needed; a custom `webpack()` config makes `next build`
  fail.
- **`next lint` removed** (`eslint` config option in next.config gone); run
  `eslint` directly (`npm run lint`). `next build` no longer runs linting.
- **Async request APIs**: `params`, `searchParams`, `cookies()`, `headers()`,
  `draftMode()` are all Promises — await them.
- **`middleware` renamed to `proxy`** (Node runtime only, no `edge`).
- **Dev output is separate**: `next dev` writes to `.next/dev` while
  `next build` writes to `.next`.
- `data-scroll-behavior="smooth"` on `<html>` restores Next's override of
  CSS smooth-scroll during SPA route transitions (we keep it set).

## Structure

- `src/app/page.tsx` — composes the landing page from section components.
- `src/app/shop/page.tsx` — DB-driven catalog of active products.
- `src/app/shop/[slug]/page.tsx` — product detail: variants, payment panel,
  order form.
- `src/app/buy/page.tsx` — redirects to `/shop`.
- `src/app/layout.tsx` — fonts (Vazirmatn for Persian sans/display, Unbounded
  for the latin brand wordmark, JetBrains Mono), `lang="fa" dir="rtl"`,
  metadata, global overlays.
- `src/app/globals.css` — Tailwind v4 theme tokens (light navy/blue theme:
  background `#F8FAFC`, text `#0F172A`, accent `#2563EB`, surface `#FFF`,
  border `#E2E8F0`, glow shadows via `--accent-glow`). All colors and fonts
  are theme-token driven: `bg-background`, `text-accent`, `font-display`,
  `font-sans`, `font-mono`, `border-line`, plus animation utilities
  (`animate-fade-up`, `animate-blink`, `animate-marquee`) and the `.reveal`
  scroll-reveal class. Never hardcode hex values in components.
- `src/lib/site.ts` — static site copy and config (site info, telegram link,
  payment card, nav, features, steps, faqs). The product catalog lives in the
  DB (see `src/lib/products.ts`), not here.
- `src/lib/utils.ts` — `cn()` for conditional Tailwind classes, plus
  `toFaDigits()` and `formatToman()` for Persian numerals/prices.
- `src/components/` — grouped by role: `ui/` (primitives: icons, logo,
  reveal, section-heading), `sections/` (landing sections), `layout/`
  (header/footer/cursor-glow), `shop/` (product-carousel, order-form,
  payment-info). Server components by default; add `"use client"` only for
  interactivity (state/effects). Admin UI is colocated under
  `src/app/admin/**`.
- `src/lib/prisma.ts` — Prisma 7 client singleton (Neon HTTP driver adapter).
  Generated client lives at `src/generated/prisma` (run `npx prisma
  generate`; never hand-edit).
- `src/lib/products.ts` — catalog queries (`activeProducts`,
  `productBySlug`), wrapped in `React.cache()`.
- `src/lib/admin-token.ts` — pure admin token crypto (`verifyAdminToken`,
  `createAdminToken`, `ADMIN_COOKIE`) — no React imports; safe for proxy.
- `src/lib/admin-auth.ts` — cookie helpers on top of `admin-token` for
  routes (`isAdminRequest`, `setAdminCookie`, `clearAdminCookie`).
- `src/lib/telegram.ts` — `sendOrderNotification` via Bot API `sendPhoto`.
- `src/proxy.ts` — Next 16 proxy (was middleware): guards `/admin/orders`
  and `/admin/products`.
- `src/app/api/` — `orders` (POST public / GET admin), `orders/[id]` (PATCH
  admin), `orders/[id]/receipt` (GET admin — streams private receipt),
  `admin/login` (POST/DELETE), `admin/products` + `[id]` + `[id]/variants` +
  `variants/[id]` + `[id]/image` (admin CRUD), `products/[slug]/image` (GET
  public — streams product cover). Receipts upload to Vercel Blob with
  private access; product covers too.
- `src/app/admin/` — login page + orders list + products CRUD;
  `src/components/order-form.tsx` submits orders (variant-aware) on
  `/shop/[slug]`.

## Conventions

- Persian copy everywhere; prices are numbers in Toman formatted with
  `formatToman`. Card numbers render LTR in `font-mono`.
- Brand name lives only in `site.name` (currently the placeholder
  "passkadeh"); the logo derives from it.
- Match the existing design system exactly; reuse existing components/patterns
  before writing new ones.
- No new dependencies without asking first.
- No dead code, no unused imports, no comments unless genuinely needed.

## Verification

Always run after changes: `npm run lint` then `npm run build` (build also runs
TypeScript checks). Start `npm run dev` to exercise behavior.

## Backend

- Env vars live in `.env.local` (gitignored) and must be mirrored in Vercel:
  `DATABASE_URL`, `ADMIN_PASSWORD`, `TELEGRAM_BOT_TOKEN`,
  `TELEGRAM_ADMIN_CHAT_ID`, `BLOB_READ_WRITE_TOKEN`.
- Prisma 7: schema in `prisma/schema.prisma`, config in `prisma.config.ts`
  (loads `.env.local`, datasource URL). No `url` in schema — it moved to the
  config. Run `npm run db:migrate` after schema changes, `npm run
  db:studio` to inspect. Models: `Product` + `Variant` (catalog, edited in
  admin) and `Order` (snapshots names/price incl. `variantName`).
- The Neon HTTP adapter (`PrismaNeonHttp`) does **not** support
  `$transaction` — write sequential queries, avoid nested `create` on
  relations.
- Never hand-edit `src/generated/prisma`.

## Agent team

Custom opencode agents live in `.opencode/agents/` (`orchestrator`,
`architect`, `developer`, `debugger`, `tester`, `reviewer`). `model` fields are
left unset — add them there when ready. Custom tools/skills/commands live under
`.opencode/tools`, `.opencode/skills`, `.opencode/command` respectively.
