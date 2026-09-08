const API_URL = "https://api.navasan.tech/latest/";
const REVALIDATE_SECONDS = 16 * 60 * 60;

// Navasan returns the free-market USD price in Rial; 1 Toman = 10 Rial.
const RIAL_PER_TOMAN = 10;

// Fallback used only when NAVASAN_API_KEY is missing or the fetch fails, so
// the storefront never breaks. Replace by setting the real key in env.
const FALLBACK_USD_TO_TOMAN = 100_000;

type NavasanLatest = {
  usd?: { value?: string; change?: string; update?: string };
};

export async function getUsdToToman(): Promise<number> {
  const apiKey = process.env.NAVASAN_API_KEY;
  if (!apiKey) return FALLBACK_USD_TO_TOMAN;

  try {
    const res = await fetch(`${API_URL}?api_key=${apiKey}`, {
      cache: "force-cache",
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return FALLBACK_USD_TO_TOMAN;

    const data = (await res.json()) as NavasanLatest;
    const value = Number(data.usd?.value);
    if (!Number.isFinite(value) || value <= 0) return FALLBACK_USD_TO_TOMAN;

    return Math.round(value / RIAL_PER_TOMAN);
  } catch {
    return FALLBACK_USD_TO_TOMAN;
  }
}

export async function usdToToman(usd: number): Promise<number> {
  const rate = await getUsdToToman();
  return Math.round(usd * rate);
}