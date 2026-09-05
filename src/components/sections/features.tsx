import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  CodeIcon,
  HeadsetIcon,
  RefreshIcon,
  RocketIcon,
  ShieldIcon,
  StoreIcon,
} from "@/components/ui/icons";
import { features, type Feature } from "@/lib/site";
import { toFaDigits } from "@/lib/utils";

const iconMap: Record<string, ReactNode> = {
  rocket: <RocketIcon className="size-5" />,
  code: <CodeIcon className="size-5" />,
  store: <StoreIcon className="size-5" />,
  shield: <ShieldIcon className="size-5" />,
  refresh: <RefreshIcon className="size-5" />,
  headset: <HeadsetIcon className="size-5" />,
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40 hover:bg-surface-2">
      <div className="mb-5 flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
          {iconMap[feature.icon]}
        </span>
        <span className="font-mono text-xs text-muted">{toFaDigits(index + 1)}</span>
      </div>
      <h3 className="font-display text-lg font-semibold leading-snug">
        {feature.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{feature.body}</p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            kicker="چرا پس‌کده"
            title="خرید مطمئن، تحویل سریع."
            sub="از انتخاب اکانت تا تحویل، همه‌چیز ساده و شفاف طراحی شده است."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={(i % 3) * 70}
              className={feature.span}
            >
              <FeatureCard feature={feature} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}