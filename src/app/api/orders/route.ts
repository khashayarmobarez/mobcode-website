import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/telegram";
import { isAdminRequest } from "@/lib/admin-auth";
import { tomanPrice } from "@/lib/pricing";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { IMAGE_EXTENSION, sniffImageType, type ImageType } from "@/lib/image";

const MAX_SIZE = 4 * 1024 * 1024;
const ACCEPTED_TYPES = new Set<ImageType>(["image/jpeg", "image/png", "image/webp"]);

const ORDER_LIMIT = 10;
const ORDER_WINDOW = 10 * 60 * 1000;

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const limit = rateLimit(`order:${clientIp(request)}`, ORDER_LIMIT, ORDER_WINDOW);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "too_many_orders" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const productSlug = formData.get("product");
  const variantId = formData.get("variantId");
  const telegram = formData.get("telegram");
  const note = formData.get("note");
  const file = formData.get("receipt");

  if (typeof productSlug !== "string") {
    return NextResponse.json({ error: "invalid_product" }, { status: 400 });
  }
  if (typeof variantId !== "string") {
    return NextResponse.json({ error: "invalid_variant" }, { status: 400 });
  }
  if (typeof telegram !== "string" || !/^[a-zA-Z0-9_]{3,32}$/.test(telegram)) {
    return NextResponse.json({ error: "invalid_telegram" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: { variants: true },
  });
  if (!product || !product.active) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }
  const variant = product.variants.find(
    (v) => v.id === variantId && v.active,
  );
  if (!variant) {
    return NextResponse.json({ error: "unknown_variant" }, { status: 400 });
  }
  const cleanNote =
    typeof note === "string" && note.trim() ? note.trim().slice(0, 500) : null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing_receipt" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }
  const imageType = await sniffImageType(file);
  if (!imageType || !ACCEPTED_TYPES.has(imageType)) {
    return NextResponse.json({ error: "bad_file_type" }, { status: 400 });
  }

  const ext = IMAGE_EXTENSION[imageType];
  const filename = `receipt.${ext}`;
  const receiptUrl = await put(
    `receipts/${Date.now()}-${filename}`,
    file,
    { access: "private", contentType: imageType },
  ).then((blob) => blob.url);

  const order = await prisma.order.create({
    data: {
      productName: product.name,
      variantName: variant.name,
      productPrice: tomanPrice(variant.price, variant.priceToman),
      telegram,
      note: cleanNote,
      receiptUrl,
    },
  });

  await sendOrderNotification(
    {
      id: order.id,
      productName: order.productName,
      variantName: order.variantName,
      productPrice: order.productPrice,
      telegram: order.telegram,
      note: order.note,
    },
    { bytes: await file.arrayBuffer(), filename, type: imageType },
  );

  return NextResponse.json({ id: order.id }, { status: 201 });
}