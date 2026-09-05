# Database Architecture

## Database

Use PostgreSQL.

Initial recommendation:

- Provider: Neon
- ORM: Prisma (the web app's ORM — do not introduce Drizzle)

The database is the source of truth for application state.

## Core entities

At minimum, model:

```text
users          (future)
products       (implemented)
product_plans  (implemented as "variants")
inventory      (future)
orders         (implemented)
order_items    (future)
payments       (future)
payment_events (future)
fulfillments   (future)
audit_logs     (future)
```

**Current implementation:** the schema in `prisma/schema.prisma` contains
`Product`, `Variant`, and `Order`. Entities marked "(future)" above are target
design, not yet built.

## Conceptual relationships

```text
User
 |
 +---- Orders
          |
          +---- OrderItems ---- Product
          |
          +---- Payments
          |
          +---- Fulfillments ---- Inventory
```

## Products

Products should represent what passkadeh sells.

Do not encode provider-specific assumptions into the product table.

**Current model:** `Product` (name, slug, tagline, `features String[]`,
badge?, featured, active, imagePath) with a `Variant` child (name, price,
active, sortOrder). Pricing lives on the variant — this is the
"product plan/variant" concept when multiple durations or packages exist.

## Inventory

Inventory represents fulfillable resources.

It should support states such as:

```text
available
reserved
sold
disabled
```

Never expose raw inventory credentials to customers before fulfillment is authorized.

If credentials must be stored, prefer encrypted storage or an external secret-management approach appropriate to the threat model.

## Orders

An order represents customer intent to purchase.

**Current state machine (in `prisma/schema.prisma`, shared with the web app):**

```text
PENDING
PAID
DELIVERED
CANCELLED
```

The bot and web app must use exactly these states. If richer states are needed
later (e.g. `fulfilling`, `refunded`, `failed`), that is a **shared schema
migration** coordinated with the web app — never a bot-only divergence.

Example target lifecycle (future):

```text
pending
payment_pending
paid
fulfilling
fulfilled
cancelled
refunded
failed
```

## Payments

> **Future.** Today payments are **manual card-to-card**: the customer uploads a
> receipt image (stored in Vercel Blob, private) and the owner verifies it
> manually. There is no payment provider, no `payments` table, and no callback
> verification yet.

Payments are separate from orders.

An order can have multiple payment attempts.

Store provider references and event identifiers needed for reconciliation.

Never use the browser as the source of truth for payment success.

## Payment events

Persist webhook/event identifiers to make callbacks idempotent.

Example:

```text
provider
event_id
event_type
received_at
processed_at
payload_hash
processing_status
```

Do not blindly store sensitive raw payment payloads if unnecessary.

## Fulfillments

A fulfillment represents the action that delivers the purchased product.

This abstraction is intentional.

The fulfillment mechanism might later change from:

```text
account delivery
```

to:

```text
license delivery
API credit provisioning
manual delivery
subscription activation
```

without changing the order model.

## Audit logs

Important administrative actions should be auditable.

Examples:

- inventory changed
- order manually modified
- refund issued
- fulfillment retried
- product price changed
- admin permissions changed

## Money

Never use floating point for money.

Prefer integer minor units:

```text
amount = 129900
currency = IRR
```

or another explicit monetary representation appropriate to the payment provider.

Always store the currency.

## Constraints

Use database constraints for important invariants.

Examples:

- unique product slug
- unique payment provider event ID
- unique external transaction ID where appropriate
- valid foreign keys
- non-negative monetary values

Do not rely only on application-level checks.

> **Prisma 7 / Neon HTTP adapter constraint:** the web app's runtime client
> uses `PrismaNeonHttp` (`@prisma/adapter-neon`), which does **not** support
> `$transaction`. Write sequential queries and avoid nested `create` on
> relations. If atomicity is required (e.g. future payment/fulfillment work),
> use the WebSocket adapter (`PrismaNeon` + `ws`) or enforce invariants with
> DB constraints and idempotency keys.
