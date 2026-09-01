# Project Structure

Prefer a domain-oriented structure.

A reasonable starting point:

```text
src/
├── app/
│   ├── (marketing)/
│   ├── (shop)/
│   ├── account/
│   ├── admin/
│   └── api/
│       ├── webhooks/
│       └── ...
│
├── components/
│   ├── ui/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── products/
│   ├── orders/
│   ├── payments/
│   ├── inventory/
│   ├── fulfillment/
│   └── admin/
│
├── db/
│   ├── schema/
│   ├── queries/
│   └── index.ts
│
├── lib/
│   ├── auth/
│   ├── payments/
│   ├── providers/
│   ├── validation/
│   └── utils/
│
└── config/
```

The exact structure may evolve.

## Rules

### `app/`

Next.js routing, pages, layouts, route handlers.

Do not put large business rules directly inside page components.

### `features/`

Domain-specific application logic.

Example:

```text
features/orders/
├── actions/
├── queries/
├── schemas/
├── services/
└── types/
```

### `db/`

Database schema and reusable database access.

### `lib/providers/`

External integrations should be abstracted.

Example:

```text
lib/providers/
├── payment/
├── fulfillment/
└── notifications/
```

Do not spread provider-specific API calls throughout the application.

## Provider abstraction

Prefer:

```text
PaymentProvider
   |
   +--> IranianProviderA
   +--> IranianProviderB
```

rather than:

```text
order.ts
payment.ts
checkout.ts
admin.ts
```

all directly calling one provider's SDK/API.

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
