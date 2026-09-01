import { NextResponse } from "next/server";
import { clearAdminCookie, isAdminPassword, setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
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