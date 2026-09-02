import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin/orders", label: "سفارش‌ها" },
  { href: "/admin/products", label: "محصولات" },
];

export function AdminNav({ active }: { active: string }) {
  return (
    <nav className="mb-8 flex items-center gap-2 border-b border-line pb-4">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            active === tab.href
              ? "bg-accent text-background"
              : "text-muted hover:text-foreground"
          )}
        >
          {tab.label}
        </Link>
      ))}
      <Link
        href="/"
        className="ms-auto rounded-full border border-line px-4 py-1.5 text-sm text-foreground transition-colors hover:border-accent/50"
      >
        بازگشت به سایت
      </Link>
    </nav>
  );
}