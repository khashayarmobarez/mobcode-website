import { ArrowRightIcon } from "@/components/icons";

function TerminalMock() {
  return (
    <div className="relative rounded-2xl border border-line bg-surface/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-xs text-muted">
          mobcode / release-2026.08
        </span>
      </div>
      <div className="space-y-2 p-6 text-left font-mono text-sm leading-relaxed">
        <p>
          <span className="text-accent">$</span>{" "}
          <span className="text-foreground">mobcode</span> release
        </p>
        <p className="text-muted">
          › fetching roadmap… <span className="text-accent">3 features queued</span>
        </p>
        <p>
          <span className="text-accent">+</span> Login flow v2{" "}
          <span className="text-muted">(Swift · merged)</span>
        </p>
        <p>
          <span className="text-accent">+</span> Stripe checkout{" "}
          <span className="text-muted">(Kotlin · reviewed)</span>
        </p>
        <p>
          <span className="text-accent">+</span> Push notifications{" "}
          <span className="text-muted">(RN · in review)</span>
        </p>
        <p className="text-muted">› running tests… 128 passed</p>
        <p>
          <span className="text-accent">✓</span> v1.4.2 shipped to{" "}
          <span className="text-foreground">App Store</span>
        </p>
        <p>
          <span className="text-accent">$</span>{" "}
          <span className="animate-blink text-accent">▋</span>
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid bg-grid-fade absolute inset-0" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-36 text-center sm:pt-40">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-muted">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            v0.1 · private beta — limited slots open
          </span>
        </div>

        <h1
          className="animate-fade-up mx-auto mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Mobile apps, shipped <span className="text-accent">monthly.</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          mobcode hands product teams production-grade mobile code on a
          subscription. A curated feature pack, reviewed and tested, in your
          repo — every month.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#pricing"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            Get early access
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how"
            className="inline-flex h-12 items-center rounded-full border border-line px-7 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:bg-surface"
          >
            See how it works
          </a>
        </div>

        <div
          className="animate-fade-up relative mx-auto mt-16 max-w-2xl"
          style={{ animationDelay: "320ms" }}
        >
          <div className="absolute -inset-8 -z-10 rounded-full bg-accent/5 blur-2xl" />
          <TerminalMock />

          <span className="absolute -left-10 top-10 hidden rounded-lg border border-line bg-background px-3 py-1.5 font-mono text-xs text-muted lg:block">
            PR #128 · merged ✓
          </span>
          <span className="absolute -right-8 top-1/3 hidden rounded-lg border border-line bg-background px-3 py-1.5 font-mono text-xs text-accent lg:block">
            SLA 48h
          </span>
          <span className="absolute -right-6 bottom-8 hidden rounded-lg border border-line bg-background px-3 py-1.5 font-mono text-xs text-muted lg:block">
            Swift · Kotlin · RN
          </span>
        </div>
      </div>
    </section>
  );
}