"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const buttons = [
  { value: "PENDING", label: "در انتظار" },
  { value: "PAID", label: "پرداخت شده" },
  { value: "DELIVERED", label: "تحویل شده" },
  { value: "CANCELLED", label: "لغو شده" },
] as const;

type Status = (typeof buttons)[number]["value"];

export function OrderStatusButtons({
  orderId,
  status,
}: {
  orderId: string;
  status: Status;
}) {
  const [current, setCurrent] = useState<Status>(status);
  const [busy, setBusy] = useState(false);

  async function update(next: Status) {
    if (next === current || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) setCurrent(next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
      {buttons.map((b) => (
        <button
          key={b.value}
          onClick={() => update(b.value)}
          disabled={busy}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
            current === b.value
              ? "bg-accent text-background"
              : "border border-line text-muted hover:border-accent/50 hover:text-foreground"
          )}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}