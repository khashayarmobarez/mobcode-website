import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const products = await prisma.product.findMany({
    include: { variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { name, slug, tagline, features, badge, featured, active, variants } =
    body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "invalid_slug" }, { status: 400 });
  }
  if (typeof tagline !== "string") {
    return NextResponse.json({ error: "invalid_tagline" }, { status: 400 });
  }
  if (!Array.isArray(variants) || variants.length === 0) {
    return NextResponse.json({ error: "invalid_variants" }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "slug_taken" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      slug,
      tagline,
      features: features?.filter((f: unknown) => typeof f === "string") ?? [],
      badge: typeof badge === "string" && badge ? badge : null,
      featured: Boolean(featured),
      active: Boolean(active),
    },
  });

  for (const [i, v] of variants.entries()) {
    await prisma.variant.create({
      data: {
        productId: product.id,
        name: String(v.name),
        price: Number(v.price),
        active: true,
        sortOrder: i,
      },
    });
  }

  return NextResponse.json(product, { status: 201 });
}