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
  Theme colors unchanged (dark + lime); a mobarrez-style theme is a separate
  future change.

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
  layout centers the card; price via `formatToman`; CTA → `#payment`.
- `payment-info.tsx` (new) — card-to-card panel: grouped card number (LTR),
  bank, holder (rendered only when set), copy-to-clipboard button, note,
  3-step checklist, Telegram CTA.
- `cta-banner.tsx` / `footer.tsx` — Persian, Telegram/email links.
- `page.tsx` — Hero → Marquee → Features → HowItWorks → Products →
  PaymentInfo → Faq → CtaBanner → Footer.

## Phase 4 — Docs (done)

- `AGENTS.md`, `README.md`, `future-changes.md`, this file.

## Phase 5 — Verification (per change)

`npm run lint` → `npm run build` → `npm run dev` (check RTL, Persian fonts,
copy button, all anchors).

## Next up (future phases, in order)

1. **Fill placeholders** — final brand name, card holder name, real Telegram
   link, real price review (see `future-changes.md`).
2. **More accounts** — add entries to `products` in `site.ts`; layout already
   supports a 3-col grid when 2+ products exist.
3. **AI service packages** — new section/page selling service bundles; reuse
   the `Product` data shape.
4. **Online checkout** — wire `products` to a payment gateway (Stripe or a
   local PSP) when in-site selling activates; keep card-to-card as fallback.
