import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "admin_token";
export const COOKIE_MAX_AGE = 60 * 60 * 12;

function sign(value: string) {
  return createHmac("sha256", process.env.ADMIN_PASSWORD ?? "")
    .update(value)
    .digest("hex");
}

export function isAdminPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createAdminToken() {
  const raw = `admin:${Date.now()}`;
  return `${raw}.${sign(raw)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) return false;
  if (!process.env.ADMIN_PASSWORD) return false;
  const raw = token.slice(0, token.lastIndexOf("."));
  return token === `${raw}.${sign(raw)}`;
}