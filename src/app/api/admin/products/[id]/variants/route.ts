import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const { name, price } = body ?? {};
  if (typeof name !== "string" || !name.trim() || typeof price !== "number") {
    return NextResponse.json({ error: "invalid_variant" }, { status: 400 });
  }

  const count = await prisma.variant.count({ where: { productId: id } });
  const variant = await prisma.variant.create({
    data: { productId: id, name: name.trim(), price, sortOrder: count },
  });
  return NextResponse.json(variant, { status: 201 });
}