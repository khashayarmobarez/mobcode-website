import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-token";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token)) {
    const res = NextResponse.redirect(new URL("/admin", request.url));
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/admin/orders/:path*", "/admin/products/:path*"],
};