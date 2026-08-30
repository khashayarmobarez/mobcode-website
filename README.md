# passkadeh

فروشگاه اکانت‌های هوش مصنوعی (اولین محصول: اکانت opencode) — فارسی و راست‌چین.
پرداخت فعلاً به‌صورت کارت به کارت و تحویل/پشتیبانی در تلگرام.

Built with Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app/` — layout (RTL, Vazirmatn/Unbounded/JetBrains Mono fonts), page
  composition, theme tokens in `globals.css`.
- `src/components/` — one file per section (hero, products, payment-info, …).
- `src/lib/site.ts` — all copy and config: brand, telegram, payment card,
  nav, products, faqs. Edit prices/products here.
- `src/lib/utils.ts` — `cn()`, `toFaDigits()`, `formatToman()`.

## Verification

```bash
npm run lint
npm run build
```

See `PLAN.md` for the roadmap (more accounts → AI service packages → online
checkout).
