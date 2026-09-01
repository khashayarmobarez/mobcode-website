# Payment and Order Architecture

## Core principle

Payment state comes from the payment provider/server-side verification, not from the browser.

## Recommended flow

```text
Customer
   |
   v
Create Order
   |
   v
Create Payment Attempt
   |
   v
Redirect to Payment Provider
   |
   v
Provider Callback/Webhook
   |
   v
Verify Payment
   |
   v
Mark Payment Paid
   |
   v
Mark Order Paid
   |
   v
Create Fulfillment Job
   |
   v
Fulfill
   |
   v
Mark Order Fulfilled
```

## Never do this

```text
Browser says:
"payment succeeded"

Backend:
"Great, order is paid."
```

The server must verify the payment.

## Price integrity

The frontend may display a price, but the backend must calculate the final amount from trusted database data.

Never accept:

```text
POST /api/order
{
  productId: "...",
  price: 1
}
```

as authoritative pricing.

Instead:

```text
productId
   |
   v
database
   |
   v
trusted price
   |
   v
order
```

## Idempotency

A payment provider may retry callbacks.

The handler must safely handle:

```text
event A
event A
event A
```

without creating three orders/fulfillments.

Use unique provider event IDs and transactional state transitions.

## Refunds

Refunds should create an auditable state transition.

Do not simply delete the payment or order.

Example:

```text
paid
  |
  v
refund_requested
  |
  v
refunded
```

## Reconciliation

Build an admin mechanism to identify:

- paid payment with unpaid order
- paid order with failed fulfillment
- duplicate callbacks
- provider/reference mismatches

Payment systems require operational reconciliation, not just happy-path code.
