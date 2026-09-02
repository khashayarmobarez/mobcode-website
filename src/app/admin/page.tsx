import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-auth";
import { AdminLoginForm } from "./admin-login-form";

export default async function AdminLoginPage() {
  if (await isAdminRequest()) {
    redirect("/admin/orders");
  }
  return <AdminLoginForm />;
}