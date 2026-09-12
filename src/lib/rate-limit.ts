const buckets = new Map<string, number[]>();
let lastSweep = 0;

function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, times] of buckets) {
    const live = times.filter((t) => now - t < 3_600_000);
    if (live.length === 0) buckets.delete(key);
    else buckets.set(key, live);
  }
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweep(now);
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - hits[0])) / 1000);
    return { allowed: false as const, retryAfter: Math.max(retryAfter, 1) };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { allowed: true as const, retryAfter: 0 };
}

export function clientIp(request: Request) {
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}