import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CheckIcon } from "@/components/icons";
import { products, type Product } from "@/lib/site";
import { formatToman } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-1",
        product.featured
          ? "border-accent bg-surface-2 shadow-[0_0_80px_-24px_var(--accent-glow)]"
          : "border-line bg-surface hover:border-accent/40"
      )}
    >
      {product.featured && product.badge && (
        <span className="absolute -top-3 right-8 rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold text-background">
          {product.badge}
        </span>
      )}

      <h3 className="font-display text-lg font-semibold">{product.name}</h3>
      <p className="mt-1 text-sm text-muted">{product.tagline}</p>

      <p className="mt-6 font-display text-3xl font-bold sm:text-4xl">
        {formatToman(product.price)}
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
        href="/shop"
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

export function Products() {
  return (
    <section id="products" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            kicker="محصولات"
            title="اکانت‌های موجود."
            sub="فعلاً اکانت opencode عرضه می‌شود؛ به‌زودی اکانت‌های دیگر هم اضافه می‌شوند."
          />
        </Reveal>

        <div
          className={cn(
            "mt-16 grid items-stretch gap-5",
            products.length === 1
              ? "mx-auto max-w-md"
              : "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {products.map((product, i) => (
            <Reveal key={product.name} delay={i * 90} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted">
          پرداخت کارت به کارت · تحویل در تلگرام · ضمانت تعویض
        </p>
      </div>
    </section>
  );
}
