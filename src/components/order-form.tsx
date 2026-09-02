"use client";

import { useState, type FormEvent } from "react";
import { toFaDigits, formatToman } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MAX_SIZE = 4 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

type Variant = { id: string; name: string; price: number };

export function OrderForm({
  productName,
  productSlug,
  variants,
}: {
  productName: string;
  productSlug: string;
  variants: Variant[];
}) {
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [telegram, setTelegram] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const selectedVariant = variants.find((v) => v.id === variantId);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!variantId) {
      setError("یک گزینه را انتخاب کن.");
      return;
    }
    if (!file) {
      setError("تصویر رسید را انتخاب کن.");
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      setError("فرمت تصویر باید jpg یا png باشد.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("حجم تصویر باید کمتر از ۴ مگابایت باشد.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("product", productSlug);
      formData.set("variantId", variantId);
      formData.set("telegram", telegram);
      formData.set("note", note);
      formData.set("receipt", file);

      const res = await fetch("/api/orders", { method: "POST", body: formData });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          data?.error === "invalid_telegram"
            ? "نام کاربری تلگرام معتبر نیست."
            : data?.error === "unknown_variant"
              ? "گزینه انتخاب‌شده نامعتبر است."
              : "ثبت سفارش ناموفق بود؛ دوباره تلاش کن.";
        setError(message);
        return;
      }
      setDone(true);
    } catch {
      setError("خطای شبکه؛ دوباره تلاش کن.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-accent/40 bg-surface-2 p-10 text-center shadow-[0_0_80px_-24px_var(--accent-glow)]">
        <p className="text-3xl">✓</p>
        <h3 className="mt-3 font-display text-xl font-bold">
          سفارش ثبت شد!
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          اطلاعات سفارش و رسید شما ارسال شد؛ بعد از بررسی، اکانت در تلگرام
          تحویل داده می‌شود.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-surface p-8"
    >
      <h3 className="font-display text-xl font-bold">ثبت سفارش</h3>
      <p className="mt-1 text-sm text-muted">
        بعد از واریز، اطلاعات سفارش و رسید را بفرست.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            نوع اکانت
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-right transition-colors",
                  variantId === v.id
                    ? "border-accent bg-accent/10"
                    : "border-line bg-background hover:border-accent/40"
                )}
              >
                <span className="block text-sm font-semibold text-foreground">
                  {v.name}
                </span>
                <span className="mt-1 block font-display text-sm font-bold text-accent">
                  {formatToman(v.price)}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            {productName} ·{" "}
            {selectedVariant
              ? `مبلغ قابل پرداخت: ${formatToman(selectedVariant.price)}`
              : "یک گزینه انتخاب کن"}
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            نام کاربری تلگرام
          </label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value.replace(/^@/, ""))}
            placeholder="your_username"
            dir="ltr"
            className="w-full rounded-xl border border-line bg-background px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            تصویر رسید پرداخت
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-muted outline-none transition-colors file:mr-3 file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent focus:border-accent"
          />
          <p className="mt-1.5 text-xs text-muted">
            حداکثر {toFaDigits(4)} مگابایت · jpg / png / webp
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            یادداشت <span className="text-muted">(اختیاری)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full rounded-full bg-accent py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          )}
        >
          {loading ? "در حال ارسال…" : "ثبت سفارش"}
        </button>
      </div>
    </form>
  );
}