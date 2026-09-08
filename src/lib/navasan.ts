const API_URL = "https://api.navasan.tech/latest/";
const REVALIDATE_SECONDS = 16 * 60 * 60;

const ROUND_TO = 10_000;

// Fallback used only when NAVASAN_API_KEY is missing or the fetch fails, so
// the storefront never breaks. Replace by setting the real key in env.
const FALLBACK_USD_TO_TOMAN = 227_000;

type NavasanLatest = {
  usd_usdt?: { value?: string; change?: number; timestamp?: number; date?: string };
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
    const value = Number(data.usd_usdt?.value);
    if (!Number.isFinite(value) || value <= 0) return FALLBACK_USD_TO_TOMAN;

    // Navasan returns the value in Toman already; present it rounded to a
    // whole, user-friendly figure (e.g. 3,127,345 -> 3,120,000).
    return Math.floor(value / ROUND_TO) * ROUND_TO;
  } catch {
    return FALLBACK_USD_TO_TOMAN;
  }
}