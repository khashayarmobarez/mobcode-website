# Database Architecture

## Database

Use PostgreSQL.

Initial recommendation:

- Provider: Neon
- ORM: Drizzle

The database is the source of truth for application state.

## Core entities

At minimum, model:

```text
users
products
product_plans
inventory
orders
order_items
payments
payment_events
fulfillments
audit_logs
```

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

Products should represent what MobCode sells.

Do not encode provider-specific assumptions into the product table.

Conceptual fields:

```text
id
name
slug
description
active
created_at
updated_at
```

Pricing may belong to a product plan/variant when multiple durations or packages exist.

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

Example lifecycle:

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

The exact state machine must be documented in code and enforced consistently.

## Payments

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
