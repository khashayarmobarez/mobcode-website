"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CardIcon, CheckIcon, TelegramIcon } from "@/components/icons";
import { payment, telegramUrl } from "@/lib/site";
import { toFaDigits } from "@/lib/utils";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      onClick={copy}
      className="rounded-full border border-line px-4 py-2 font-mono text-xs font-semibold text-foreground transition-colors hover:border-accent/50 hover:bg-surface"
    >
      {copied ? "کپی شد ✓" : "کپی شماره کارت"}
    </button>
  );
}

export function PaymentInfo() {
  const groups = payment.cardNumber.match(/.{1,4}/g) ?? [payment.cardNumber];

  return (
    <section id="payment" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <SectionHeading
            kicker="پرداخت"
            title="کارت به کارت، بدون درگاه."
            sub="مبلغ سفارش را به شماره کارت زیر واریز کنید و تصویر رسید را در تلگرام بفرستید."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 rounded-2xl border border-accent/40 bg-surface-2 p-8 text-center shadow-[0_0_80px_-24px_rgba(200,242,75,0.4)]">
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
              <CardIcon className="size-6" />
            </span>

            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              شماره کارت — {payment.bank}
            </p>

            <p dir="ltr" className="mt-4 font-mono text-2xl font-bold tracking-wider sm:text-3xl">
              {groups.join("-")}
            </p>

            {payment.holderName && (
              <p className="mt-2 text-sm text-muted">به نام {payment.holderName}</p>
            )}

            <div className="mt-6 flex justify-center">
              <CopyButton value={payment.cardNumber} />
            </div>

            <p className="mt-6 border-t border-line pt-6 text-sm leading-relaxed text-muted">
              {payment.note}
            </p>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              <TelegramIcon className="size-4" />
              ارسال رسید در تلگرام
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mt-10 grid gap-3 text-sm text-muted sm:grid-cols-3">
            {[
              "واریز مبلغ به‌صورت کامل",
              "اسکرین‌شات یا تصویر رسید",
              "ارسال در تلگرام و دریافت اکانت",
            ].map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4"
              >
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  <span className="font-mono text-xs text-accent">
                    {toFaDigits(i + 1)} ·{" "}
                  </span>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
