import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { activeProducts, minVariantPrice } from "@/lib/products";
import { formatToman, toFaDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "فروشگاه",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await activeProducts();

  return (
    <>
      <Header />
      <main className="pb-24">
        <section className="relative overflow-hidden border-b border-line">
          <div className="bg-grid bg-grid-fade absolute inset-0" />
          <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 text-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-muted">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                تحویل ۲۴ ساعته · پرداخت کارت به کارت
              </span>
            </div>
            <h1
              className="animate-fade-up mt-8 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              فروشگاه <span className="text-accent">اکانت‌ها</span>
            </h1>
            <p
              className="animate-fade-up mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
              style={{ animationDelay: "160ms" }}
            >
              محصول موردنظرت را انتخاب کن، گزینه و قیمت را ببین و سفارش بده.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pt-16">
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.length === 0 && (
              <div className="rounded-2xl border border-line bg-surface p-10 text-center text-sm text-muted sm:col-span-full">
                هنوز محصولی موجود نیست.
              </div>
            )}
            {products.map((product, i) => {
              const minPrice = minVariantPrice(product.variants);
              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {product.badge && (
                    <span className="absolute -top-3 right-8 rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold text-background">
                      {product.badge}
                    </span>
                  )}

                  {product.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/products/${product.slug}/image?v=${product.updatedAt.getTime()}`}
                      alt={product.name}
                      className="mb-6 aspect-[16/9] w-full rounded-xl object-cover"
                    />
                  ) : (
                    <span className="mb-6 grid aspect-[16/9] w-full place-items-center rounded-xl bg-accent/10 font-display text-5xl font-bold text-accent">
                      {product.name.charAt(0)}
                    </span>
                  )}

                  <h2 className="font-display text-xl font-semibold">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{product.tagline}</p>

                  <p className="mt-6 font-display text-3xl font-bold">
                    {minPrice !== null ? (
                      <>
                        از {formatToman(minPrice)}
                      </>
                    ) : (
                      "بدون قیمت"
                    )}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted">
                    {toFaDigits(product.variants.length)} گزینه
                    <span className="text-accent">←</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}