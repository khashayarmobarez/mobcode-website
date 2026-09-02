import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const { name, price, active, sortOrder } = body ?? {};

  const variant = await prisma.variant.update({
    where: { id },
    data: {
      ...(typeof name === "string" && name.trim() ? { name: name.trim() } : {}),
      ...(typeof price === "number" ? { price } : {}),
      ...(typeof active === "boolean" ? { active } : {}),
      ...(typeof sortOrder === "number" ? { sortOrder } : {}),
    },
  });
  return NextResponse.json(variant);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.variant.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}