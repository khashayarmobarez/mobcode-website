import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-accent font-display text-sm font-bold text-background transition-transform group-hover:-rotate-6">
        m
      </span>
      <span className="font-display text-base font-semibold tracking-tight">
        mob<span className="text-accent">code</span>
        <span className="animate-blink text-accent">_</span>
      </span>
    </a>
  );
}