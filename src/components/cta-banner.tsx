import { ArrowLeftIcon } from "@/components/icons";
import { telegramUrl } from "@/lib/site";

export function CtaBanner() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="bg-grid bg-grid-fade absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          آماده‌ی <span className="text-accent">شروع هستی؟</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          همین حالا سفارشت را ثبت کن؛ کمتر از چند دقیقه اکانت تحویل داده می‌شود.
        </p>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          سفارش در تلگرام
          <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
