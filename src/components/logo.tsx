import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-accent font-[family-name:var(--font-unbounded)] text-sm font-bold text-background transition-transform group-hover:-rotate-6">
        {site.name.charAt(0).toUpperCase()}
      </span>
      <span className="font-[family-name:var(--font-unbounded)] text-base font-semibold tracking-tight">
        {site.name}
        <span className="animate-blink text-accent">_</span>
      </span>
    </a>
  );
}
