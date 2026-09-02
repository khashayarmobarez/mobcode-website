# passkadeh — Development Plan

**Goal:** pivot the site from the mobcode mobile-engineering subscription to
**passkadeh** — a Persian (RTL) store selling AI accounts (opencode first),
paid manually via **card-to-card** with order/receipt handling in **Telegram**.
No backend for now.

## Phase 1 — Foundation (done)

- `src/app/layout.tsx`: `lang="fa" dir="rtl"`, Vazirmatn (sans + display) via
  `next/font/google`, Unbounded kept for the latin brand wordmark, JetBrains
  Mono for latin/mono accents. Persian metadata from `site.ts`.
- `src/app/globals.css`: `--font-display` / `--font-sans` → Vazirmatn tokens.
  See Phase 6 for the theme palette rebrand.

## Phase 2 — Data & copy (done)

- `src/lib/site.ts` — single source of truth:
  - `site`: name (`passkadeh`, placeholder until final), tagline, description,
    email, telegram handle (`telegramUrl` helper).
  - `payment`: card number `6037997471707910`, bank, holder name (empty until
    provided), instruction note.
  - `navLinks`, `marqueeItems`, `features` (value props), `steps` (purchase
    steps), `products` (currently only "اکانت opencode" at 2,000,000 Toman),
    `faqs` — all in Persian.
- `src/lib/utils.ts`: `toFaDigits()` (Latin→Persian digits) and
  `formatToman()` (price + «تومان»).

## Phase 3 — Sections (done)

- `logo.tsx` — wordmark/letter derived from `site.name`; Unbounded via
  `font-[family-name:var(--font-unbounded)]`.
- `header.tsx` — Persian nav, `@telegram` link, CTA → `#products`.
- `hero.tsx` — Persian headline; terminal mock themed as an opencode account
  order; arrows flipped for RTL (`ArrowLeftIcon`).
- `features.tsx` / `how-it-works.tsx` / `faq.tsx` — Persian headings; data
  from `site.ts`.
- `products.tsx` (replaces `pricing.tsx`) — data-driven catalog; single-product
  layout centers the card; price via `formatToman`; CTA → `/buy`.
- `payment-info.tsx` (new) — card-to-card panel: grouped card number (LTR),
  bank, holder (rendered only when set), copy-to-clipboard button, note,
  3-step checklist, Telegram CTA. Rendered **only on `/buy`** — the card
  never appears on the landing page.
- `cta-banner.tsx` / `footer.tsx` — Persian, Telegram/email links; order CTAs
  point to `/buy`.
- `src/app/buy/page.tsx` (new route) — order summary (product + price rows)
  + payment panel. Header/Footer shared; nav links use `/#section` hrefs via
  `next/link` so they work from both pages.
- `page.tsx` (landing) — Hero → Marquee → Features → HowItWorks → Products →
  Faq → CtaBanner → Footer (no payment/card content).

## Phase 4 — Docs (done)

- `AGENTS.md`, `README.md`, `future-changes.md`, this file.

## Phase 5 — Verification (per change)

`npm run lint` → `npm run build` → `npm run dev` (check RTL, Persian fonts,
copy button, all anchors).

## Phase 6 — Theme rebrand (done)

- Swapped the dark-lime palette for a **light navy/blue** theme:
  background `#F8FAFC`, surface `#FFF`, surface-2 `#EFF6FF`, text `#0F172A`,
  muted `#64748B`, accent `#2563EB`, border `#E2E8F0` — all via tokens in
  `src/app/globals.css`.
- Added `--accent-bright` (`#3B82F6`) and `--accent-glow` tokens; featured
  card / payment glow shadows now use `var(--accent-glow)`.
- `data-scroll-behavior="smooth"` on `<html>` (Next 16 no longer overrides
  smooth-scroll on SPA navigation by default).

## Phase 7 — Backend: orders + Telegram + admin (done)

- **Stack**: Neon Postgres via Prisma 7 (driver adapter
  `@prisma/adapter-neon`, HTTP — no WebSocket), Vercel Blob for receipt
  images, Telegram Bot API for owner notifications, `proxy.ts` guard for
  admin. Env: `ADMIN_PASSWORD`, `TELEGRAM_BOT_TOKEN`,
  `TELEGRAM_ADMIN_CHAT_ID`, `BLOB_READ_WRITE_TOKEN` (all in `.env.local`,
  set in Vercel too).
- `prisma/schema.prisma` — `Order` model (productName/productPrice snapshot,
  telegram, note?, receiptUrl, `OrderStatus` enum `PENDING/PAID/DELIVERED/
  CANCELLED`). Generated client at `src/generated/prisma` (gitignored).
  `prisma.config.ts` loads `.env.local` and holds the datasource URL.
- API (Route Handlers, all async per v16):
  - `POST /api/orders` (public) — multipart form: product + telegram + note
    + receipt image (≤4MB, jpg/png/webp) → upload to Blob (**private
    access**) → insert Order → Telegram `sendPhoto` (multipart file upload;
    dropped if it fails).
  - `GET /api/orders` (admin cookie) — list orders.
  - `PATCH /api/orders/[id]` (admin cookie) — update status.
  - `GET /api/orders/[id]/receipt` (admin cookie) — streams the private
    receipt blob (`get` with auto-auth); receipts never exposed as public
    URLs.
  - `POST/DELETE /api/admin/login` — password check (constant-time) → HMAC
    httpOnly cookie.
- Admin: `/admin` login form, `/admin/orders` list with receipt link and
  status buttons. `src/proxy.ts` (v16 middleware) redirects unauthenticated
  `/admin/orders` → `/admin`; real auth re-checked in routes/pages.
- Buy page: `src/components/order-form.tsx` — product select, Telegram
  handle, note, receipt upload; posts to `/api/orders`.
- Migrations: `npm run db:migrate` (dev), `npm run db:studio`;
  `vercel-build: prisma migrate deploy && next build`; `postinstall: prisma
  generate`.
- Payment remains manual card-to-card; backend records orders/receipts.

## Next up (future phases, in order)

1. **Fill placeholders** — final brand name, card holder name, real Telegram
   link, real price review (see `future-changes.md`).
2. **More accounts** — add entries to `products` in `site.ts`; layout already
   supports a 3-col grid when 2+ products exist.
3. **AI service packages** — new section/page selling service bundles; reuse
   the `Product` data shape.
4. **Online checkout** — wire `products` to a payment gateway (Stripe or a
   local PSP) when in-site selling activates; keep card-to-card as fallback.
