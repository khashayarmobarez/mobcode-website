import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  COOKIE_MAX_AGE,
  createAdminToken,
  verifyAdminToken,
} from "@/lib/admin-token";

export {
  ADMIN_COOKIE,
  isAdminPassword,
  verifyAdminToken,
} from "@/lib/admin-token";

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