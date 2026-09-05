# Project Structure

## Current structure (implemented)

```text
src/
├── app/
│   ├── page.tsx                 # landing page
│   ├── layout.tsx               # root layout (RTL, fonts, metadata)
│   ├── not-found.tsx            # Persian 404
│   ├── shop/
│   │   ├── page.tsx             # /shop catalog list
│   │   └── [slug]/page.tsx      # /shop/[slug] product detail + order form
│   ├── buy/page.tsx             # /buy -> redirect to /shop
│   ├── admin/
│   │   ├── page.tsx             # admin login
│   │   ├── admin-login-form.tsx # client form (colocated)
│   │   ├── admin-nav.tsx        # tabs: orders / products
│   │   ├── orders/              # order list + status buttons (colocated)
│   │   └── products/            # product CRUD pages + form (colocated)
│   ├── api/
│   │   ├── orders/              # POST public, GET admin, [id] PATCH, receipt
│   │   ├── admin/               # login, products CRUD, variants, image
│   │   └── products/[slug]/image/  # public cover stream
│   └── globals.css
│
├── components/
│   ├── ui/                      # primitives: icons, logo, reveal, section-heading
│   ├── sections/                # landing sections: hero, marquee, features, ...
│   ├── layout/                  # header, footer, cursor-glow
│   └── shop/                    # product-carousel, order-form, payment-info
│
├── lib/
│   ├── site.ts                  # static copy/config (no products — catalog is DB)
│   ├── products.ts              # catalog queries (React.cache)
│   ├── prisma.ts                # Prisma client (Neon HTTP adapter)
│   ├── admin-token.ts           # pure token crypto (proxy-safe)
│   ├── admin-auth.ts            # cookie helpers for routes
│   ├── telegram.ts              # order notifications via Bot API
│   └── utils.ts                 # cn(), toFaDigits(), formatToman()
│
├── generated/prisma/            # Prisma client output (gitignored)
└── proxy.ts                     # Next 16 proxy guarding /admin/* pages
```

## Rules

### `app/`

Next.js routing, pages, layouts, route handlers.

Do not put large business rules directly inside page components.

### `components/`

Group by role, not by feature (this is a small app today):

- `ui/` — reusable primitives with no business knowledge
- `sections/` — landing-page sections
- `layout/` — app shell (header, footer)
- `shop/` — shop domain UI

Admin UI is **colocated** under `src/app/admin/**` rather than in
`components/`, because it is only used by those routes.

Server components by default; `"use client"` only for interactivity.

### `lib/`

Non-UI logic: config/copy, DB client + catalog queries, auth, notifications,
utilities. Split pure modules (safe for the proxy) from React-coupled ones.

## Future: domain split

As the app grows real multi-domain logic (payments, fulfillment, inventory,
account linking), consider moving to a domain-oriented structure:

```text
features/
├── products/
├── orders/
├── payments/
├── inventory/
└── fulfillment/
```

with `lib/providers/` abstracting external integrations (payment, fulfillment,
notifications).

Do not adopt this now — a flat `components/` + `lib/` layout is the right size
for the current app. Reorganize only when a concrete domain appears.

## Provider abstraction (future)

Prefer:

```text
PaymentProvider
   |
   +--> IranianProviderA
   +--> IranianProviderB
```

rather than several modules each directly calling one provider's SDK/API.

This makes providers replaceable.

## Business logic

Keep business rules out of React components.

Bad:

```text
button click
 -> component
 -> 200 lines of payment logic
```

Better:

```text
component
 -> server action
 -> order service
 -> payment service
 -> database
```

## Types

Use TypeScript for new code.

Avoid `any` unless there is a documented reason.

Keep domain types close to their domain.