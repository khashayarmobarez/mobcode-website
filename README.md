# passkadeh

فروشگاه اکانت‌های هوش مصنوعی (اولین محصول: اکانت opencode) — فارسی و راست‌چین.
پرداخت فعلاً به‌صورت کارت به کارت و تحویل/پشتیبانی در تلگرام.

Built with Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4.

## Getting started

Requires [Node.js 20.9+](https://nodejs.org/).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend setup

Orders are stored in Neon (Postgres via Prisma 7) and receipt images in
Vercel Blob; new orders notify the owner via a Telegram bot. Set these env
vars in `.env.local` (and in Vercel):

```
DATABASE_URL=<neon pooled url>
ADMIN_PASSWORD=<admin login password>
TELEGRAM_BOT_TOKEN=<bot token from @BotFather>
TELEGRAM_ADMIN_CHAT_ID=<chat id receiving order notifications>
BLOB_READ_WRITE_TOKEN=<from Vercel Blob storage>
```

Run migrations after pulling schema changes:

```bash
npm run db:migrate   # apply local dev migrations
```

Admin panel: `http://localhost:3000/admin` (login), then `/admin/orders`.

## Structure

- `src/app/` — layout (RTL, Vazirmatn/Unbounded/JetBrains Mono fonts), page
  composition, theme tokens in `globals.css` (light navy/blue palette),
  API routes under `src/app/api/`, admin pages under `src/app/admin/`.
- `src/app/shop/` — catalog list (`/shop`) + product detail (`/shop/[slug]`)
  with variants and the order form.
- `src/components/` — one file per section (hero, products, payment-info,
  order-form, …).
- `src/lib/site.ts` — static copy and config (brand, telegram, payment card,
  nav, landing products, faqs). The actual product catalog lives in the DB
  (managed via `/admin/products`).
- `src/lib/utils.ts` — `cn()`, `toFaDigits()`, `formatToman()`.
- `src/lib/prisma.ts` / `src/lib/products.ts` / `src/lib/telegram.ts` /
  `src/lib/admin-auth.ts` — DB client, catalog queries, Telegram
  notifications, admin cookie helpers.

## Verification

```bash
npm run lint
npm run build
```

See `PLAN.md` for the roadmap (more accounts → AI service packages → online
checkout).
