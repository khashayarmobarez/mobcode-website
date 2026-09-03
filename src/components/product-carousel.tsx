"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckIcon, ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { formatToman, toFaDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";

const AUTO_MS = 5000;

export type CarouselProduct = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  badge: string | null;
  featured: boolean;
  minPrice: number | null;
  features: string[];
};

function Slide({ product }: { product: CarouselProduct }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-7 sm:p-8",
        product.featured
          ? "border-accent bg-surface-2 shadow-[0_0_80px_-24px_var(--accent-glow)]"
          : "border-line bg-surface"
      )}
    >
      {product.featured && product.badge && (
        <span className="absolute right-6 top-5 rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold text-background">
          {product.badge}
        </span>
      )}

      <h3 className="font-display text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-muted">{product.tagline}</p>

      <p className="mt-6 font-display text-3xl font-bold sm:text-4xl">
        {product.minPrice !== null ? (
          <>از {formatToman(product.minPrice)}</>
        ) : (
          "بدون قیمت"
        )}
      </p>

      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-muted">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={`/shop/${product.slug}`}
        className={cn(
          "mt-8 rounded-full py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5",
          product.featured
            ? "bg-accent text-background"
            : "border border-line text-foreground hover:border-accent/50"
        )}
      >
        ثبت سفارش و پرداخت
      </Link>
    </div>
  );
}

export function ProductCarousel({ products }: { products: CarouselProduct[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = products.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  // The site is always RTL: slide index i is revealed by translating
  // the track +i * 100% (each child is one full slide width).
  const shift = index * 100;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-3xl pt-4">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(${shift}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="h-full w-full shrink-0">
              <Slide product={product} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={next}
        aria-label="بعدی"
        className="absolute left-0 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-foreground shadow-sm transition-colors hover:border-accent/50 sm:size-10"
      >
        <ArrowLeftIcon className="size-4" />
      </button>
      <button
        onClick={prev}
        aria-label="قبلی"
        className="absolute right-0 top-1/2 grid size-9 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-line bg-surface text-foreground shadow-sm transition-colors hover:border-accent/50 sm:size-10"
      >
        <ArrowRightIcon className="size-4" />
      </button>

      <div className="mt-6 flex items-center justify-center gap-2">
        {products.map((product, i) => (
          <button
            key={product.id}
            onClick={() => setIndex(i)}
            aria-label={`اسلاید ${toFaDigits(i + 1)}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}