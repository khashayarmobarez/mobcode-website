import { NextResponse } from "next/server";
import { clearAdminCookie, isAdminPassword, setAdminCookie } from "@/lib/admin-auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW = 15 * 60 * 1000;

export async function POST(request: Request) {
  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const limit = rateLimit(`login:${clientIp(request)}`, LOGIN_LIMIT, LOGIN_WINDOW);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "too_many_attempts" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;
  if (typeof password !== "string" || !isAdminPassword(password)) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ ok: true });
}