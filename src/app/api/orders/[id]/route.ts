import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-auth";

const STATUSES = ["PENDING", "PAID", "DELIVERED", "CANCELLED"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;
  if (typeof status !== "string" || !STATUSES.includes(status as (typeof STATUSES)[number])) {
    return NextResponse.json({ error: "invalid_status" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status: status as (typeof STATUSES)[number] },
  });

  return NextResponse.json(order);
}