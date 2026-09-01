# Business Model and Product Abstraction

## Architectural principle

The platform must not assume that the business will always sell one specific provider's accounts.

Model:

```text
Product
   |
   v
Order
   |
   v
Fulfillment
```

rather than:

```text
OpenCodeAccount
   |
   v
Order
```

## Why

The supplier/provider can change.

Potential future products may include:

- subscriptions
- licenses
- credits
- API access
- developer tools
- manually fulfilled products
- automatically provisioned products

The order system should remain stable.

## Provider abstraction

External providers belong behind an integration boundary.

Conceptually:

```text
MobCode
  |
  +--> Product catalog
  |
  +--> Order system
  |
  +--> Fulfillment service
           |
           +--> Provider A
           +--> Provider B
           +--> Manual fulfillment
```

## Compliance requirement

Before implementing automated creation, management, or resale of third-party accounts/access, verify that the relevant provider terms, subscription terms, and payment-provider rules permit the intended business model.

Do not design around circumventing:

- account restrictions
- geographic restrictions
- identity requirements
- payment controls
- provider enforcement
- usage limits

The architecture should support legitimate fulfillment methods.

## Business continuity

If one provider becomes unavailable:

```text
Product
   |
   +--> Provider A unavailable
   |
   +--> Provider B
```

should be possible without rewriting checkout/order infrastructure.

## Inventory abstraction

Inventory should represent a fulfillable resource, not necessarily a username/password.

Examples:

```text
license key
subscription activation
credit allocation
account
manual fulfillment ticket
```

## Refunds and failed fulfillment

Orders must distinguish:

```text
payment success
```

from:

```text
fulfillment success
```

A customer can have a successful payment but a failed fulfillment.

That state must be handled explicitly.
