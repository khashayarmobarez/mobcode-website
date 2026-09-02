"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function ProductRowActions({
  productId,
  active,
}: {
  productId: string;
  active: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleActive() {
    setBusy(true);
    try {
      await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
      <button
        onClick={toggleActive}
        disabled={busy}
        className={cn(
          "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
          active
            ? "bg-green-100 text-green-700"
            : "border border-line text-muted hover:border-accent/50"
        )}
      >
        {active ? "فعال · کلیک برای مخفی‌کردن" : "مخفی · کلیک برای فعال‌سازی"}
      </button>
    </div>
  );
}