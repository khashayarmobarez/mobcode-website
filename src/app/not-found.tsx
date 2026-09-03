import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-5 text-center">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
          ۴۰۴
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          صفحه‌ای که دنبالش بودی پیدا نشد.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          شاید آدرس اشتباه است یا محصول دیگر در دسترس نیست.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-7 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}