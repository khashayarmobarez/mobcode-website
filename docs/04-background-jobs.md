# Background Jobs and Workers

## Default decision

Do NOT create a persistent bot/server by default.

First determine whether the task is:

1. request-driven
2. scheduled and short-lived
3. asynchronous but bounded
4. persistent/long-running

## Request-driven

Keep it in Next.js.

Example:

```text
Customer -> Next.js -> Database
```

## Scheduled and short-lived

Use a scheduled job/cron where appropriate.

Example:

```text
Scheduler
   |
   v
Next.js job endpoint
   |
   v
Database / external provider
```

The job must:

- authenticate the invocation
- be idempotent
- have bounded execution
- handle retries
- avoid duplicate work

## Persistent worker

Use a VPS only when the process genuinely needs:

- continuous execution
- long-running tasks
- persistent connections
- queue consumption
- process-level state
- workloads that exceed serverless execution constraints

Architecture:

```text
Next.js
   |
   v
Postgres / Queue
   |
   v
Worker on VPS
   |
   +--> External provider
   |
   +--> Database
```

## Worker principles

Workers must be stateless where possible.

Persist job state in the database or queue.

A worker restart must not corrupt orders or permanently lose jobs.

Every job should have:

```text
job ID
type
status
attempt count
created_at
started_at
completed_at
error information
```

## Retries

Use exponential backoff for transient external failures.

Do not retry permanent failures indefinitely.

## Fulfillment safety

Never allow a worker retry to accidentally deliver the same purchased resource twice.

Use database locking, unique constraints, idempotency keys, or an equivalent mechanism.

## Observability

Every job should have enough metadata to answer:

- What happened?
- When?
- For which order?
- Which user?
- Which provider?
- Which attempt?
- Why did it fail?

Never log passwords, API keys, access tokens, or other secrets.
