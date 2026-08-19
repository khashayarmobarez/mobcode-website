import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CheckIcon } from "@/components/icons";
import { tiers, type Tier } from "@/lib/site";
import { cn } from "@/lib/utils";

function PriceTag({ tier }: { tier: Tier }) {
  if (typeof tier.price === "number") {
    return (
      <p className="mt-6 font-display text-5xl font-bold">
        ${tier.price}
        <span className="font-sans text-base font-normal text-muted"> /mo</span>
      </p>
    );
  }
  return <p className="mt-6 font-display text-5xl font-bold">{tier.price}</p>;
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-8 transition-transform duration-300 hover:-translate-y-1",
        tier.featured
          ? "border-accent bg-surface-2 shadow-[0_0_80px_-24px_rgba(200,242,75,0.4)]"
          : "border-line bg-surface hover:border-accent/40"
      )}
    >
      {tier.featured && tier.badge && (
        <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 font-mono text-xs font-bold text-background">
          {tier.badge}
        </span>
      )}

      <h3 className="font-display text-lg font-semibold">{tier.name}</h3>
      <p className="mt-1 text-sm text-muted">{tier.tagline}</p>

      <PriceTag tier={tier} />

      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-muted">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#waitlist"
        className={cn(
          "mt-8 rounded-full py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5",
          tier.featured
            ? "bg-accent text-background"
            : "border border-line text-foreground hover:border-accent/50"
        )}
      >
        Join waitlist
      </a>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            kicker="Pricing"
            title="One subscription. Every release."
            sub="Launch pricing for the first cohort. Subscriptions open soon — join the waitlist to lock in these rates."
          />
        </Reveal>

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90} className="h-full">
              <TierCard tier={tier} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted">
          No lock-in · Cancel anytime · All code & IP is yours
        </p>
      </div>
    </section>
  );
}