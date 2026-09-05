import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative size-8 overflow-hidden rounded-lg transition-transform group-hover:-rotate-6">
        <Image
          src="/logo.png"
          alt={site.name}
          fill
          priority
          sizes="32px"
          className="object-cover"
        />
      </span>
      <span className="font-[family-name:var(--font-unbounded)] text-base font-semibold tracking-tight">
        {site.name}
        <span className="animate-blink text-accent">_</span>
      </span>
    </a>
  );
}
