import { ArrowLeftIcon } from "@/components/icons";

function TerminalMock() {
  return (
    <div className="relative rounded-2xl border border-line bg-surface/80 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.12)] backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-xs text-muted">
          opencode / order-2026.08
        </span>
      </div>
      <div className="space-y-2 p-6 text-left font-mono text-sm leading-relaxed">
        <p>
          <span className="text-accent">$</span>{" "}
          <span className="text-foreground">opencode</span> buy account
        </p>
        <p className="text-muted">
          › processing payment… <span className="text-accent">card-to-card ✓</span>
        </p>
        <p>
          <span className="text-accent">+</span> account ready{" "}
          <span className="text-muted">(delivered · telegram)</span>
        </p>
        <p>
          <span className="text-accent">✓</span> login sent to{" "}
          <span className="text-foreground">@you</span>
        </p>
        <p className="text-muted">› warranty: 30 days</p>
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
            تحویل آنی · پرداخت کارت به کارت
          </span>
        </div>

        <h1
          className="animate-fade-up mx-auto mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          اکانت هوش مصنوعی، <span className="text-accent">تحویل آنی.</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          خرید اکانت معتبر opencode و دیگر سرویس‌های هوش مصنوعی با ضمانت تعویض.
          پرداخت ساده کارت به کارت و پشتیبانی ۲۴/۷ در تلگرام.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#products"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            مشاهده محصولات
            <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
          </a>
          <a
            href="#how"
            className="inline-flex h-12 items-center rounded-full border border-line px-7 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:bg-surface"
          >
            نحوه خرید
          </a>
        </div>

        <div
          className="animate-fade-up relative mx-auto mt-16 max-w-2xl"
          style={{ animationDelay: "320ms" }}
        >
          <div className="absolute -inset-8 -z-10 rounded-full bg-accent/5 blur-2xl" />
          <TerminalMock />

          <span className="absolute -left-10 top-10 hidden rounded-lg border border-line bg-background px-3 py-1.5 font-mono text-xs text-muted lg:block">
            order #128 · delivered ✓
          </span>
          <span className="absolute -right-8 top-1/3 hidden rounded-lg border border-line bg-background px-3 py-1.5 font-mono text-xs text-accent lg:block">
            warranty 30d
          </span>
          <span className="absolute -right-6 bottom-8 hidden rounded-lg border border-line bg-background px-3 py-1.5 font-mono text-xs text-muted lg:block">
            telegram · 24/7
          </span>
        </div>
      </div>
    </section>
  );
}
