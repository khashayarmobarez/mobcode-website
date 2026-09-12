import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "admin_token";
export const COOKIE_MAX_AGE = 60 * 60 * 12;

function sign(value: string) {
  return createHmac("sha256", process.env.ADMIN_SECRET ?? "")
    .update(value)
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isAdminPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !value) return false;
  const a = createHash("sha256").update(value).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function createAdminToken() {
  const raw = `admin:${Date.now()}:${randomBytes(16).toString("hex")}`;
  return `${raw}.${sign(raw)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token || !process.env.ADMIN_SECRET) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const raw = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, sign(raw))) return false;
  const ts = Number(raw.split(":")[1]);
  if (!Number.isFinite(ts)) return false;
  const ageMs = Date.now() - ts;
  return ageMs >= 0 && ageMs <= COOKIE_MAX_AGE * 1000;
}