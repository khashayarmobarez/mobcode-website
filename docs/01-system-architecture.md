# System Architecture

## Deployment

### Primary application

- Framework: Next.js
- Hosting: Vercel
- Runtime: serverless/request-driven by default
- Database: PostgreSQL
- Initial database provider: Neon
- ORM: Drizzle

### Optional infrastructure

A small Linux VPS may be introduced later for workloads that cannot reliably run as short-lived serverless functions.

Examples:

- persistent workers
- queue consumers
- long-running automation
- WebSocket/connection-heavy integrations
- processes that require filesystem/process persistence

Do not deploy a VPS until a concrete requirement exists.

## Important clarification

Multiple Next.js route handlers do NOT mean multiple backend servers.

For example:

```text
/api/products
/api/orders
/api/payments
/api/webhooks
/api/admin
```

can all be part of the same Next.js application.

Do not split these into separate services without a demonstrated architectural need.

## Logical architecture

```text
                    ┌──────────────────────┐
                    │      Customers       │
                    └──────────┬───────────┘
                               |
                               v
                    ┌──────────────────────┐
                    │       Vercel         │
                    │      Next.js         │
                    │                      │
                    │ UI + Server Actions  │
                    │ Route Handlers       │
                    │ Auth                 │
                    │ Admin                │
                    └──────────┬───────────┘
                               |
                               v
                    ┌──────────────────────┐
                    │   Neon PostgreSQL     │
                    │                      │
                    │ Users                │
                    │ Products             │
                    │ Inventory            │
                    │ Orders               │
                    │ Payments             │
                    │ Fulfillments         │
                    │ Audit logs           │
                    └──────────┬───────────┘
                               ^
                               |
                    ┌──────────┴───────────┐
                    │ Optional VPS Worker  │
                    │                      │
                    │ Jobs / Queue         │
                    │ Provider integration │
                    │ Fulfillment          │
                    └──────────────────────┘
```

## Design goals

- Minimize infrastructure.
- Keep domains modular inside one application.
- Make external providers replaceable.
- Make payment processing idempotent.
- Keep sensitive credentials out of the frontend.
- Make every fulfillment operation traceable.
- Avoid unnecessary microservices.

## Scaling strategy

### Stage 1

```text
Next.js + Vercel + Neon
```

### Stage 2

Add scheduled jobs if needed.

```text
Next.js + Vercel + Neon
             |
             +--> Cron / scheduled tasks
```

### Stage 3

Add a worker only when needed.

```text
Next.js + Vercel + Neon
             |
             +--> VPS Worker
```

### Stage 4

Only consider separate services when there is an actual scaling, reliability, ownership, or security boundary requiring them.

Do not prematurely build microservices.
