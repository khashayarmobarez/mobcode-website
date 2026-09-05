import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            kicker="نحوه خرید"
            title="در سه قدم، اکانت مال تو."
          />
        </Reveal>

        <div className="relative mt-16 grid gap-12 lg:grid-cols-3 lg:gap-6">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block"
          />
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100} className="relative">
              <div className="flex flex-col items-start">
                <span className="text-outline font-display text-6xl font-bold">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}