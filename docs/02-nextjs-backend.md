# Next.js Backend Conventions

> **Status:** mostly current. The app today uses **Route Handlers** for all
> mutations and performs hand-written validation (no Zod, no Server Actions
> yet). The rules below are the conventions to follow as the backend grows.

## General rule

Next.js is the primary backend-for-frontend.

Use:

- Server Components for server-side data access where appropriate.
- Server Actions for application mutations where appropriate.
- Route Handlers for HTTP APIs, webhooks, callbacks, and externally consumed endpoints.

Do not create a separate Express/Nest/Fastify backend unless a concrete requirement justifies it.

## Domain boundaries

Organize backend code by domain rather than by technical type.

Recommended conceptual domains:

```text
auth
products
orders
inventory
payments
fulfillment
admin
users
```

## API rules

Every mutation must:

1. Authenticate/authorize the caller.
2. Validate input.
3. Execute the domain operation.
4. Use a database transaction where multiple related writes must be atomic.
5. Return a predictable result.
6. Log important failures without leaking secrets.

## Validation

Validate all untrusted input at the server boundary.

Use a schema validation library such as Zod.

Never trust:

- client-side validation
- hidden form fields
- product prices sent by the client
- user IDs supplied by the client
- payment status supplied by the browser

Prices and product state must be read from the database.

## Authentication and authorization

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

Keep these concepts separate.

Admin operations must perform explicit authorization checks on the server.

Never protect an admin route only through frontend UI visibility.

## Database access

Database access should stay server-side.

Never expose:

- database credentials
- provider API secrets
- internal inventory credentials
- payment secrets

to client bundles.

## Error handling

Do not expose raw internal exceptions to users.

Bad:

```text
PostgresError: relation payments_secret_table...
```

Good:

```text
Payment could not be processed. Please try again.
```

Log the detailed error server-side with a correlation/request ID.

## Idempotency

Payment callbacks, fulfillment operations, and external-provider operations must be designed to tolerate retries.

A webhook can arrive more than once.

The same payment must never create multiple successful orders or multiple fulfillments.

## Caching

Do not cache user-specific or payment-sensitive data accidentally.

Public product information can be cached aggressively.

Order/payment/inventory state should use appropriate dynamic behavior.
