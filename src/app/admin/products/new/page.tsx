import { AdminNav } from "../../admin-nav";
import { ProductForm } from "../product-form";

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <AdminNav active="/admin/products" />
      <h1 className="mb-8 font-display text-2xl font-bold">محصول جدید</h1>
      <ProductForm />
    </main>
  );
}