import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { sendOrderNotification } from "@/lib/telegram";
import { isAdminRequest } from "@/lib/admin-auth";
import { products } from "@/lib/site";

const MAX_SIZE = 4 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const productName = formData.get("product");
  const telegram = formData.get("telegram");
  const note = formData.get("note");
  const file = formData.get("receipt");

  if (typeof productName !== "string") {
    return NextResponse.json({ error: "invalid_product" }, { status: 400 });
  }
  if (typeof telegram !== "string" || !/^[a-zA-Z0-9_]{3,32}$/.test(telegram)) {
    return NextResponse.json({ error: "invalid_telegram" }, { status: 400 });
  }
  const product = products.find((p) => p.name === productName);
  if (!product) {
    return NextResponse.json({ error: "unknown_product" }, { status: 400 });
  }
  const cleanNote =
    typeof note === "string" && note.trim() ? note.trim().slice(0, 500) : null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing_receipt" }, { status: 400 });
  }
  if (!ACCEPTED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "bad_file_type" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }

  const receiptUrl = await put(
    `receipts/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "")}`,
    file,
    { access: "private", contentType: file.type },
  ).then((blob) => blob.url);

  const order = await prisma.order.create({
    data: {
      productName: product.name,
      productPrice: product.price,
      telegram,
      note: cleanNote,
      receiptUrl,
    },
  });

  await sendOrderNotification(
    {
      id: order.id,
      productName: order.productName,
      productPrice: order.productPrice,
      telegram: order.telegram,
      note: order.note,
    },
    { bytes: await file.arrayBuffer(), filename: file.name, type: file.type },
  );

  return NextResponse.json({ id: order.id }, { status: 201 });
}