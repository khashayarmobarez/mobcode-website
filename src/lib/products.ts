import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const activeProducts = cache(() =>
  prisma.product.findMany({
    where: { active: true },
    include: { variants: { where: { active: true }, orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "asc" },
  }),
);

export const productBySlug = cache((slug: string) =>
  prisma.product.findUnique({
    where: { slug },
    include: { variants: { where: { active: true }, orderBy: { sortOrder: "asc" } } },
  }),
);

export function minVariantPrice(variants: { price: number }[]) {
  return variants.length ? Math.min(...variants.map((v) => v.price)) : null;
}