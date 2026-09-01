# Agent Rules

This file is the operational source of truth for coding agents working on MobCode.

## Architecture rules

1. Do not introduce a new service without explaining the concrete requirement.
2. Prefer Next.js + Vercel for application functionality.
3. Prefer PostgreSQL/Neon for persistent data.
4. Prefer Drizzle for database access.
5. Do not create a persistent worker unless the task genuinely requires one.
6. Do not turn a simple scheduled operation into a permanent server.
7. Do not introduce microservices for organizational aesthetics.

## Security rules

1. Never expose secrets to the client.
2. Never use `NEXT_PUBLIC_*` for secrets.
3. Never trust client-provided prices.
4. Never trust client-provided payment status.
5. Verify payment server-side.
6. Make payment/webhook handling idempotent.
7. Never log credentials or API secrets.
8. Perform authorization on the server.
9. Validate all external input.
10. Treat external provider responses as untrusted input.

## Database rules

1. Use transactions when multiple writes must be atomic.
2. Use database constraints for important invariants.
3. Never use floating-point numbers for monetary values.
4. Use explicit order/payment/fulfillment states.
5. Do not delete financial history to represent refunds/cancellations.
6. Preserve auditability.

## Code organization

1. Keep business logic outside React components.
2. Organize substantial functionality by domain.
3. Keep provider-specific code behind integration boundaries.
4. Use TypeScript for new code.
5. Prefer readable code over clever abstractions.
6. Avoid premature generic frameworks/utilities.
7. Reuse existing project patterns before creating new ones.

## API rules

Every mutation should:

```text
authenticate
    ↓
authorize
    ↓
validate
    ↓
execute domain operation
    ↓
persist
    ↓
return safe result
```

## Payment rules

The canonical flow is:

```text
order
 -> payment attempt
 -> provider
 -> verified callback/webhook
 -> paid order
 -> fulfillment
```

Never:

```text
frontend
 -> "payment successful"
 -> mark paid
```

## Background job rules

Jobs must be:

- idempotent
- retry-safe
- observable
- bounded where possible
- safe to execute more than once

## UI rules

Use the established MobCode design system:

- navy `#0F172A`
- primary blue `#2563EB`
- bright blue `#3B82F6`
- background `#F8FAFC`
- soft blue `#EFF6FF`
- white `#FFFFFF`
- muted text `#64748B`
- border `#E2E8F0`

Do not introduce unrelated brand colors without a design reason.

## Before adding code

Agents should first determine:

1. Which domain does this belong to?
2. Is this client-side or server-side?
3. Does it need persistent infrastructure?
4. Does it change financial state?
5. Does it handle sensitive information?
6. Does it need idempotency?
7. Does an existing abstraction already solve this?

## Do not

- hard-code provider-specific behavior into orders
- duplicate database logic across routes
- trust frontend state for security decisions
- add infrastructure without necessity
- leak internal errors to customers
- create fake testimonials or trust claims
- bypass provider restrictions
