# passkadeh — Development Plan

**Goal:** Persian (RTL) store selling AI accounts (opencode, Cline, more via
admin), paid manually via **card-to-card** with order/receipt handling in
**Telegram**. Stack: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind v4,
App Router, Prisma 7 + Neon (HTTP adapter, no `$transaction`), Vercel Blob
(private), Telegram Bot API, admin CRUD.

## Remaining work (in order)

1. **Fill placeholders** — final brand name (`site.name`), card holder name
   (`payment.holderName`), real Telegram link (`site.telegram`), and real
   prices in `/admin/products`.
2. **Navasan live rate** — set `NAVASAN_API_KEY` in `.env.local` and Vercel so
   the dollar→Toman rate is live. Prices are entered in **dollars** in admin;
   the storefront shows the Toman equivalent via `usd_usdt` (cached 16h,
   rounded to the nearest 10,000).
3. **More accounts** — create products + variants in `/admin/products`; the
   storefront picks them up automatically.
4. **AI service packages** — new section/page selling service bundles; reuse
   the `Product`/`Variant` data shape.
5. **Online checkout** — wire variants to a payment gateway (Stripe or a local
   PSP) when in-site selling activates; keep card-to-card as fallback.

## Verification (per change)

`npm run lint` → `npm run build` → `npm run dev`.
