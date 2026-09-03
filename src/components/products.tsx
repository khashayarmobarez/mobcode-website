import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  ProductCarousel,
  type CarouselProduct,
} from "@/components/product-carousel";
import { activeProducts, minVariantPrice } from "@/lib/products";

export async function Products() {
  const products = await activeProducts();

  const carousel: CarouselProduct[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.tagline,
    badge: product.badge,
    featured: product.featured,
    minPrice: minVariantPrice(product.variants),
    features: product.features,
  }));

  return (
    <section id="products" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            kicker="محصولات"
            title="اکانت‌های موجود."
            sub="گزینه‌ها را ببین و محصول موردنظرت را انتخاب کن."
          />
        </Reveal>

        <Reveal delay={90}>
          <ProductCarousel products={carousel} />
        </Reveal>

        <p className="mt-8 text-center font-mono text-xs text-muted">
          پرداخت کارت به کارت · تحویل در تلگرام
        </p>
      </div>
    </section>
  );
}