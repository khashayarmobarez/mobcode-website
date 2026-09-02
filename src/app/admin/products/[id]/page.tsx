import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "../../admin-nav";
import { ProductForm } from "../product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: { orderBy: { sortOrder: "asc" } } },
  });
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <AdminNav active="/admin/products" />
      <h1 className="mb-8 font-display text-2xl font-bold">ویرایش محصول</h1>
      <ProductForm
        productId={product.id}
        initial={{
          name: product.name,
          slug: product.slug,
          tagline: product.tagline,
          features: product.features,
          badge: product.badge ?? "",
          featured: product.featured,
          active: product.active,
          imagePath: product.imagePath,
          variants: product.variants.map((v) => ({
            id: v.id,
            name: v.name,
            price: v.price,
          })),
        }}
      />
    </main>
  );
}