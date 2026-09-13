# passkadeh — Development Plan

**Goal:** Persian (RTL) store selling AI accounts (opencode, Cline, more via
admin), paid manually via **card-to-card** with order/receipt handling in
**Telegram**. Stack: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind v4,
App Router, Prisma 7 + Neon (HTTP adapter, no `$transaction`), Vercel Blob
(private), Telegram Bot API, admin CRUD.

## Remaining work (in order)

1. **Fill placeholders** — final brand name (`site.name`), card holder name
   (`payment.holderName`), real Telegram link (`site.telegram`), and real
   prices in `/admin/products` (entered in **dollars**).
2. **Price sync** — prices are entered in dollars in admin; the daily Vercel
   cron `/api/cron/update-prices` refreshes `Variant.priceToman` from Navasan
   (`NAVASAN_API_KEY`, guarded by `CRON_SECRET`). The storefront and the
   shared Telegram bot read `priceToman` directly. Verify the cron runs and
   `priceToman` stays current.
3. **More accounts** — create products + variants in `/admin/products`; the
   storefront picks them up automatically.
4. **AI service packages** — new section/page selling service bundles; reuse
   the `Product`/`Variant` data shape.
5. **Online checkout** — wire variants to a payment gateway (Stripe or a local
   PSP) when in-site selling activates; keep card-to-card as fallback.

## Verification (per change)

`npm run lint` → `npm run build` → `npm run dev`.
