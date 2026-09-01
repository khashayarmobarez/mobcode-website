# Security Requirements

Security is a first-class architectural concern.

## Secrets

Never commit secrets.

Use environment variables/secrets management.

Examples:

```text
DATABASE_URL
PAYMENT_SECRET
PROVIDER_API_KEY
AUTH_SECRET
```

Never expose server secrets through `NEXT_PUBLIC_*`.

## Customer credentials

If the business ever handles third-party account credentials:

- minimize what is stored
- encrypt sensitive values where possible
- restrict access
- never send secrets to logs
- never return them through unintended API responses
- consider whether storing them is necessary at all

## Authorization

Every privileged operation must be authorized server-side.

Examples:

```text
create product
edit price
view inventory
modify order
issue refund
retry fulfillment
```

## Rate limiting

Rate-limit sensitive endpoints such as:

- authentication
- password reset
- payment initiation
- coupon validation
- admin APIs
- public APIs vulnerable to abuse

## Webhooks

Webhook endpoints must verify the provider's authenticity mechanism whenever the provider supports one.

Do not trust a webhook merely because it came to the correct URL.

## CSRF / mutation safety

Use the protections provided by the chosen Next.js architecture and authentication strategy.

Do not create unnecessary cross-origin mutation endpoints.

## SQL safety

Use parameterized queries/ORM APIs.

Never interpolate user input into SQL.

## XSS

Escape user-generated content.

Be especially careful with:

- product descriptions
- admin-entered content
- customer reviews
- support messages

Avoid rendering arbitrary HTML unless it is sanitized.

## Admin security

Admin accounts should receive stronger protections than ordinary customers.

Consider:

- MFA
- strict session management
- audit logs
- short session lifetime for sensitive operations
- role-based permissions

## Logging

Logs must never contain:

- passwords
- API keys
- access tokens
- payment secrets
- full credential records

Use IDs and correlation IDs instead.

## Threat model

Assume:

- customers can manipulate requests
- customers can inspect frontend JavaScript
- requests can be replayed
- webhooks can be duplicated
- external APIs can fail
- admins can make mistakes
- bots can attack public endpoints

Security decisions must account for these cases.
