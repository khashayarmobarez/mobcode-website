"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type VariantInput = { id?: string; name: string; price: string };

type Props = {
  productId?: string;
  initial?: {
    name: string;
    slug: string;
    tagline: string;
    features: string[];
    badge: string;
    featured: boolean;
    active: boolean;
    imagePath: string | null;
    variants: { id: string; name: string; price: number }[];
  };
};

export function ProductForm({ productId, initial }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [featuresText, setFeaturesText] = useState(
    initial?.features.join("\n") ?? "",
  );
  const [badge, setBadge] = useState(initial?.badge ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [active, setActive] = useState(initial?.active ?? true);
  const [variants, setVariants] = useState<VariantInput[]>(
    initial?.variants.map((v) => ({ id: v.id, name: v.name, price: String(v.price) })) ?? [
      { name: "", price: "" },
    ],
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage(file: File) {
    if (!productId) return;
    const form = new FormData();
    form.set("image", file);
    const res = await fetch(`/api/admin/products/${productId}/image`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error("upload_failed");
    router.refresh();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!slug.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError("اسلاگ باید انگلیسی و بدون فاصله باشد.");
      return;
    }
    const cleanVariants = variants
      .filter((v) => v.name.trim() && v.price.trim())
      .map((v) => ({ id: v.id, name: v.name.trim(), price: Number(v.price) }));
    if (cleanVariants.length === 0) {
      setError("حداقل یک گزینه با نام و قیمت وارد کن.");
      return;
    }
    if (cleanVariants.some((v) => !Number.isFinite(v.price) || v.price < 0)) {
      setError("قیمت گزینه‌ها نامعتبر است.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        slug,
        tagline,
        features: featuresText.split("\n").map((f) => f.trim()).filter(Boolean),
        badge,
        featured,
        active,
        variants: cleanVariants,
      };
      const res = productId
        ? await fetch(`/api/admin/products/${productId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error === "slug_taken" ? "این اسلاگ قبلاً استفاده شده." : "ثبت ناموفق بود.");
        return;
      }
      const product = await res.json();
      if (productId) {
        router.refresh();
      } else {
        router.push(`/admin/products/${product.id}`);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      await uploadImage(file);
    } catch {
      setError("آپلود تصویر ناموفق بود.");
    }
  }

  function updateVariant(i: number, patch: Partial<VariantInput>) {
    setVariants((prev) => prev.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            نام محصول
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            اسلاگ (انگلیسی)
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            dir="ltr"
            placeholder="cline"
            className="w-full rounded-xl border border-line bg-background px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-foreground">
          توضیح کوتاه
        </label>
        <input
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-foreground">
          ویژگی‌ها (هر خط یک مورد)
        </label>
        <textarea
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          rows={5}
          className="w-full resize-none rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-foreground">
          نشان (اختیاری)
        </label>
        <input
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="پیشنهاد ویژه"
          className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          ویژه
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          فعال (نمایش در فروشگاه)
        </label>
      </div>

      {productId && (
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            تصویر جلد
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={onImageChange}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-muted outline-none transition-colors file:mr-3 file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent focus:border-accent"
          />
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-foreground">
          گزینه‌ها (قیمت به تومان)
        </label>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={v.name}
                onChange={(e) => updateVariant(i, { name: e.target.value })}
                placeholder="مثلاً ماهانه"
                className="flex-1 rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
              <input
                value={v.price}
                onChange={(e) => updateVariant(i, { price: e.target.value })}
                placeholder="۲۰۰۰۰۰۰"
                dir="ltr"
                inputMode="numeric"
                className="w-36 rounded-xl border border-line bg-background px-4 py-2.5 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setVariants((prev) => prev.filter((_, idx) => idx !== i))}
                className="grid size-9 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-red-300 hover:text-red-500"
                aria-label="حذف گزینه"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setVariants((prev) => [...prev, { name: "", price: "" }])}
          className="mt-3 rounded-full border border-line px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/50"
        >
          + افزودن گزینه
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full rounded-full bg-accent py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        )}
      >
        {loading ? "در حال ذخیره…" : productId ? "ذخیره تغییرات" : "ایجاد محصول"}
      </button>
    </form>
  );
}