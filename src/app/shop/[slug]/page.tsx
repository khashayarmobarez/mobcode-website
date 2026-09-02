import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CheckIcon } from "@/components/icons";
import { OrderForm } from "@/components/order-form";
import { PaymentInfo } from "@/components/payment-info";
import { productBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await productBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return { title: product.name };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await productBySlug(slug);
  if (!product || !product.active) notFound();

  return (
    <>
      <Header />
      <main className="pb-24">
        <section className="relative overflow-hidden border-b border-line">
          <div className="bg-grid bg-grid-fade absolute inset-0" />
          <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-36">
            <Link
              href="/shop"
              className="font-mono text-xs text-muted transition-colors hover:text-foreground"
            >
              → بازگشت به فروشگاه
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              {product.imagePath ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/api/products/${product.slug}/image`}
                  alt={product.name}
                  className="aspect-[16/10] w-full rounded-2xl border border-line object-cover"
                />
              ) : (
                <div className="grid aspect-[16/10] w-full place-items-center rounded-2xl border border-line bg-surface">
                  <span className="font-display text-7xl font-bold text-accent">
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                    {product.name}
                  </h1>
                  {product.badge && (
                    <span className="rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold text-background">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {product.tagline}
                </p>

                <ul className="mt-8 grid gap-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5">
          <PaymentInfo />
          <OrderForm
            productName={product.name}
            productSlug={product.slug}
            variants={product.variants.map((v) => ({
              id: v.id,
              name: v.name,
              price: v.price,
            }))}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}