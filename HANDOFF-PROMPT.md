# Continue this project — handoff prompt

Paste the following into a new chat to continue working on the passkadeh
store project with full context.

---

Continue working on the passkadeh project at
`D:\programing\projects\mobcode website` (git branch `dev`). Read
`AGENTS.md` first (it includes the Next.js 16 managed-rules block pointing to
`node_modules/next/dist/docs/` — consult those docs before using any Next.js
API). All site copy is Persian; keep it that way.

## What this is

Persian (RTL) store selling AI accounts (opencode, Cline — managed via admin)
with manual card-to-card payment. Stack: Next.js 16.3.1 (Turbopack default),
React 19, TypeScript strict, Tailwind v4, App Router, Prisma 7 + Neon
(`PrismaNeonHttp` adapter — **no `$transaction`**), Vercel Blob (private
store), Telegram Bot API for owner notifications, ESLint 9 flat config.

## Where things stand (all verified working)

- **Catalog**: `Product` + `Variant` in Neon. Seeded: opencode (ماهانه
  ۲٬۱۰۰٬۰۰۰ / ۶ ماهه ۱۰٬۰۰۰٬۰۰۰) and cline (ماهانه ۸۰۰٬۰۰۰ / سالانه
  ۸٬۰۰۰٬۰۰۰) — fix real prices/names via `/admin/products`.
- **Storefront**: `/shop` (list, "از {min variant price}") and
  `/shop/[slug]` (detail: variant selector, payment panel, variant-aware
  order form with receipt upload). Landing page products section is a
  DB-driven auto-advancing RTL carousel. `/buy` redirects to `/shop`.
- **Orders**: `POST /api/orders` validates product+active variant against DB,
  snapshots name/variantName/price, uploads receipt to **private** Blob, sends
  Telegram `sendPhoto` (multipart bytes; notification dropped if it fails).
  `GET /api/orders` (admin), `PATCH /api/orders/[id]` (admin),
  `GET /api/orders/[id]/receipt` streams the private blob (admin-only).
- **Admin**: password login → HMAC httpOnly cookie; `src/proxy.ts` guards
  `/admin/orders` and `/admin/products`. `/admin` auto-redirects to
  `/admin/orders` when already authenticated. Products CRUD + variants + cover
  image upload (private Blob, cache-busted with `?v=updatedAt`).
- **Component layout**: `src/components/` grouped as `ui/` (icons, logo,
  reveal, section-heading), `sections/` (landing), `layout/` (header, footer,
  cursor-glow), `shop/` (product-carousel, order-form, payment-info). Admin UI
  colocated under `src/app/admin/**`.
- **Design system**: light navy/blue tokens in `src/app/globals.css`
  (background #F8FAFC, text #0F172A, accent #2563EB, surface #FFF, border
  #E2E8F0, glow via `--accent-glow`). Never hardcode hex in components.

## Commands

- `npm run lint` (`eslint` — `next lint` doesn't exist in v16)
- `npm run build` (also type-checks)
- `npm run dev`
- `npm run db:migrate` / `npm run db:studio` (Prisma 7; config in
  `prisma.config.ts`, loads `.env.local`; schema in `prisma/schema.prisma`;
  generated client at `src/generated/prisma`, gitignored — never hand-edit)

## Env (`.env.local`, also in Vercel)

`DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, `TELEGRAM_BOT_TOKEN`,
`TELEGRAM_ADMIN_CHAT_ID`, `BLOB_READ_WRITE_TOKEN`, `BLOB_STORE_ID`.
Admin password is set via `ADMIN_PASSWORD` and cookie signing via
`ADMIN_SECRET` in `.env.local` — never hardcode secrets in this file.

## Key gotchas to respect

1. **No `$transaction`** with `PrismaNeonHttp` — write sequential queries, no
   nested creates on relations.
2. Next 16: `params`/`searchParams`/`cookies()` are Promises; `middleware` is
   `proxy` (Node runtime); dev output in `.next/dev`.
3. Receipts and product covers are **private** Blob objects streamed through
   route handlers — never link them directly.
4. Docs: `docs/` folder is the target architecture (marked current vs
   future); `docs/07-project-structure.md` documents the real tree.

## Planned next / open items

- Fill placeholders: final brand name (`site.name` in `src/lib/site.ts`),
  card holder name (`payment.holderName`), real Telegram link
  (`site.telegram`), real prices in admin.
- The Desktop folder `Passkadeh Telegram Bot — Project Instructions
  (corrected).md` describes a separate grammY bot (not this repo).
- Future roadmap: AI service packages → online payment gateway (see
  `PLAN.md`).

Start by running `git status` and `npm run lint` + `npm run build` to confirm
a clean baseline, then proceed with the task I describe next.