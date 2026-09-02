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
  const { name, slug, tagline, features, badge, featured, active, variants } =
    body ?? {};

  if (typeof slug === "string" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "invalid_slug" }, { status: 400 });
  }

  if (typeof slug === "string") {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return NextResponse.json({ error: "slug_taken" }, { status: 409 });
    }
  }

  await prisma.product.update({
    where: { id },
    data: {
      ...(typeof name === "string" && name.trim() ? { name: name.trim() } : {}),
      ...(typeof slug === "string" ? { slug } : {}),
      ...(typeof tagline === "string" ? { tagline } : {}),
      ...(Array.isArray(features)
        ? { features: features.filter((f: unknown) => typeof f === "string") }
        : {}),
      ...(typeof badge === "string" ? { badge: badge || null } : {}),
      ...(typeof featured === "boolean" ? { featured } : {}),
      ...(typeof active === "boolean" ? { active } : {}),
    },
  });

  if (Array.isArray(variants)) {
    const existing = await prisma.variant.findMany({ where: { productId: id } });
    const existingIds = new Set(existing.map((v) => v.id));
    const incoming: { id?: string; name: string; price: number; sortOrder: number }[] =
      [];
    for (const [i, raw] of variants.entries()) {
      if (raw && typeof raw === "object" && "name" in raw && "price" in raw) {
        const v = raw as { id?: string; name: unknown; price: unknown };
        if (typeof v.name === "string" && typeof v.price === "number") {
          incoming.push({
            ...(typeof v.id === "string" ? { id: v.id } : {}),
            name: v.name,
            price: v.price,
            sortOrder: i,
          });
        }
      }
    }
    const incomingIds = new Set(
      incoming.map((v) => v.id).filter((x): x is string => Boolean(x)),
    );

    await prisma.variant.deleteMany({
      where: { productId: id, id: { notIn: [...incomingIds] } },
    });

    for (const v of incoming) {
      if (v.id && existingIds.has(v.id)) {
        await prisma.variant.update({
          where: { id: v.id },
          data: { name: v.name, price: v.price, sortOrder: v.sortOrder },
        });
      } else {
        await prisma.variant.create({
          data: {
            productId: id,
            name: v.name,
            price: v.price,
            sortOrder: v.sortOrder,
          },
        });
      }
    }
  }

  const product = await prisma.product.findUniqueOrThrow({
    where: { id },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}