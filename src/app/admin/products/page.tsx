import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatToman, toFaDigits } from "@/lib/utils";
import { AdminNav } from "../admin-nav";
import { ProductRowActions } from "./product-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { variants: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <AdminNav active="/admin/products" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">محصولات</h1>
          <p className="mt-1 text-sm text-muted">
            {toFaDigits(products.length)} محصول
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          محصول جدید
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {products.length === 0 && (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center text-sm text-muted">
            هنوز محصولی ثبت نشده است.
          </div>
        )}
        {products.map((product) => {
          const minPrice = product.variants.length
            ? Math.min(...product.variants.map((v) => v.price))
            : null;
          return (
            <div
              key={product.id}
              className={`rounded-2xl border bg-surface p-6 ${product.active ? "border-line" : "border-line opacity-60"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {product.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/products/${product.slug}/image`}
                      alt={product.name}
                      className="size-14 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="grid size-14 place-items-center rounded-xl bg-accent/10 font-display text-lg font-bold text-accent">
                      {product.name.charAt(0)}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted">
                        /shop/{product.slug}
                      </span>
                      {!product.active && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 font-mono text-xs font-semibold text-red-700">
                          مخفی
                        </span>
                      )}
                    </div>
                    <h2 className="mt-1 font-display text-lg font-semibold">
                      {product.name}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted">
                      {product.variants.length} گزینه ·{" "}
                      {minPrice !== null ? `از ${formatToman(minPrice)}` : "بدون قیمت"}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/admin/products/${product.id}`}
                  className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/50"
                >
                  ویرایش
                </Link>
              </div>

              <ProductRowActions productId={product.id} active={product.active} />
            </div>
          );
        })}
      </div>
    </main>
  );
}