import { FALLBACK_USD_TO_TOMAN } from "@/lib/navasan";

export function tomanPrice(priceUsd: number, priceToman: number | null) {
  return priceToman ?? Math.round(priceUsd * FALLBACK_USD_TO_TOMAN);
}

export function minVariantToman(
  variants: { price: number; priceToman: number | null }[],
) {
  return variants.length
    ? Math.min(...variants.map((v) => tomanPrice(v.price, v.priceToman)))
    : null;
}