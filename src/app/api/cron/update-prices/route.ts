import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUsdToToman } from "@/lib/navasan";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rate = await getUsdToToman(true);
  const variants = await prisma.variant.findMany();

  let updated = 0;
  for (const variant of variants) {
    const target = Math.round(variant.price * rate);
    if (variant.priceToman !== target) {
      await prisma.variant.update({
        where: { id: variant.id },
        data: { priceToman: target },
      });
      updated++;
    }
  }

  return NextResponse.json({ ok: true, updated, rate });
}