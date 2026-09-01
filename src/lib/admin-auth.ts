import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_MAX_AGE = 60 * 60 * 12;

export function isAdminPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(value: string) {
  return createHmac("sha256", process.env.ADMIN_PASSWORD ?? "")
    .update(value)
    .digest("hex");
}

export const ADMIN_COOKIE = "admin_token";

export function verifyAdminToken(token?: string) {
  if (!token) return false;
  if (!process.env.ADMIN_PASSWORD) return false;
  const raw = token.slice(0, token.lastIndexOf("."));
  return token === `${raw}.${sign(raw)}`;
}

export function createAdminToken() {
  const raw = `admin:${Date.now()}`;
  return `${raw}.${sign(raw)}`;
}

export async function setAdminCookie() {
  const token = createAdminToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return token;
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAdminRequest() {
  const store = await cookies();
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value);
}