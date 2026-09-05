import { marqueeItems } from "@/lib/site";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="border-y border-line bg-surface/40">
      <div className="flex overflow-hidden py-4">
        <div className="animate-marquee flex shrink-0 items-center">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-8 pr-8 font-mono text-sm uppercase tracking-widest text-muted"
            >
              {item}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}