# passkadeh Architecture

This directory contains the architectural source of truth for the passkadeh project.

## Purpose

passkadeh is a developer-focused digital products store targeting customers in Iran. The initial product offering includes OpenCode and Cline accounts, but the architecture must not hard-code the business around a single supplier or account model.

## Core principles

1. Keep the first production architecture simple.
2. Use Next.js as the main application and backend-for-frontend.
3. Deploy the Next.js application on Vercel.
4. Use PostgreSQL as the primary database, Neon currently.
5. Use Prisma (the web app's ORM). Do not introduce a second ORM.
6. Start without a persistent worker unless a real workload requires one.
7. Use scheduled/serverless jobs for short, bounded background tasks.
8. Add a small VPS worker only for persistent, long-running, queue-driven, or connection-heavy workloads.
9. Model the business around products, orders, inventory, payments, and fulfillment—not around OpenCode accounts.
10. Security, idempotency, auditability, and provider abstraction are production requirements.

> **Status note:** this document describes the **target** architecture. The
> current implementation is a subset: products with variants, card-to-card
> orders with receipt upload, and an admin panel. Inventory, payment providers,
> fulfillment, and background workers are **future** work — marked as such in
> each file.

## Architecture at a glance

```text
Customer
   |
   v
Next.js application
   |
   +--> Server Actions / Route Handlers
   |
   +--> Authentication
   |
   +--> Admin
   |
   +--> Payment callbacks/webhooks
   |
   v
Neon PostgreSQL
   ^
   |
Optional Worker (VPS)
   |
   +--> Queue processing
   +--> Long-running integrations
   +--> Fulfillment tasks
```

The worker is optional. Do not introduce it merely because the application has multiple API endpoints.

## Related documents

- `01-system-architecture.md` — system boundaries and deployment
- `02-nextjs-backend.md` — Next.js backend conventions
- `03-database.md` — database architecture and domain model
- `04-background-jobs.md` — jobs, cron, queues, and worker decisions
- `05-payments.md` — payment and order lifecycle
- `06-security.md` — security requirements
- `07-project-structure.md` — repository structure
- `08-design-system.md` — visual identity and UI tokens
- `09-business-model.md` — provider/product abstraction and account-resale constraints
- `10-agent-rules.md` — rules agents must follow
