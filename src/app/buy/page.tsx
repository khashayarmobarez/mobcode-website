import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PaymentInfo } from "@/components/payment-info";
import { products } from "@/lib/site";
import { formatToman } from "@/lib/utils";

export const metadata: Metadata = {
  title: "خرید",
};

export default function BuyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <div className="bg-grid bg-grid-fade absolute inset-0" />
          <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-32 text-center sm:pt-36">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-muted">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                تحویل آنی · پرداخت کارت به کارت
              </span>
            </div>

            <h1
              className="animate-fade-up mt-8 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              سفارش و <span className="text-accent">پرداخت</span>
            </h1>

            <p
              className="animate-fade-up mx-auto mt-5 max-w-md text-base leading-relaxed text-muted"
              style={{ animationDelay: "160ms" }}
            >
              مبلغ سفارش را کارت به کارت کن و تصویر رسید را در تلگرام بفرست تا
              اکانت تحویل داده شود.
            </p>

            <div
              className="animate-fade-up mt-10 divide-y divide-line rounded-2xl border border-line bg-surface text-right"
              style={{ animationDelay: "240ms" }}
            >
              {products.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between gap-4 px-6 py-5"
                >
                  <div>
                    <p className="font-display text-base font-semibold">
                      {product.name}
                    </p>
                    <p className="mt-1 text-sm text-muted">{product.tagline}</p>
                  </div>
                  <p className="shrink-0 font-display text-lg font-bold text-accent">
                    {formatToman(product.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PaymentInfo />
      </main>
      <Footer />
    </>
  );
}
