import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatToman, toFaDigits } from "@/lib/utils";
import { OrderStatusButtons } from "./order-status-buttons";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  PENDING: "در انتظار",
  PAID: "پرداخت شده",
  DELIVERED: "تحویل شده",
  CANCELLED: "لغو شده",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  PAID: "bg-accent/10 text-accent",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">سفارش‌ها</h1>
          <p className="mt-1 text-sm text-muted">
            {toFaDigits(orders.length)} سفارش ثبت شده
          </p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-line px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/50"
        >
          بازگشت به سایت
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {orders.length === 0 && (
          <div className="rounded-2xl border border-line bg-surface p-10 text-center text-sm text-muted">
            هنوز سفارشی ثبت نشده است.
          </div>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted">
                    #{toFaDigits(order.id.slice(-6))}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${statusStyles[order.status]}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold">
                  {order.productName}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {formatToman(order.productPrice)} · تلگرام @{order.telegram}
                </p>
                {order.note && (
                  <p className="mt-2 text-sm text-muted">{order.note}</p>
                )}
                <p className="mt-2 font-mono text-xs text-muted">
                  {new Date(order.createdAt).toLocaleString("fa-IR")}
                </p>
              </div>

              <a
                href={order.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl border border-line px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent/50"
              >
                مشاهده رسید
              </a>
            </div>

            <OrderStatusButtons orderId={order.id} status={order.status} />
          </div>
        ))}
      </div>
    </main>
  );
}