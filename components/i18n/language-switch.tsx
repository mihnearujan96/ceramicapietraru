"use client";

import { setLocale } from "@/app/actions/locale";
import { useDictionary, useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const copy = useDictionary();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const nextLocale: Locale = locale === "ro" ? "en" : "ro";
  const nextLabel =
    nextLocale === "en" ? copy.a11y.english : copy.a11y.romanian;

  function toggle() {
    if (pending) return;
    startTransition(async () => {
      await setLocale(nextLocale);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-label={`${copy.a11y.language}: ${nextLabel}`}
      title={nextLabel}
      className={cn(
        "relative inline-flex h-8 w-[3.35rem] shrink-0 items-center rounded-full border border-border bg-warm-white/80 p-0.5 transition-opacity disabled:opacity-60",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 size-7 rounded-full bg-cream shadow-[0_1px_3px_rgba(68,47,38,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          locale === "en" ? "translate-x-[1.35rem]" : "translate-x-0",
        )}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1">
        <Flag locale="ro" dimmed={locale !== "ro"} />
        <Flag locale="en" dimmed={locale !== "en"} />
      </span>
    </button>
  );
}

function Flag({ locale, dimmed }: { locale: Locale; dimmed: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex overflow-hidden rounded-[2px] transition-opacity duration-300",
        dimmed ? "opacity-40" : "opacity-100",
      )}
    >
      {locale === "ro" ? (
        <svg viewBox="0 0 3 2" className="h-3 w-[1.125rem]">
          <rect width="1" height="2" fill="#002B7F" />
          <rect x="1" width="1" height="2" fill="#FCD116" />
          <rect x="2" width="1" height="2" fill="#CE1126" />
        </svg>
      ) : (
        <svg viewBox="0 0 60 30" className="h-3 w-[1.125rem]">
          <path d="M0 0h60v30H0z" fill="#012169" />
          <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
          <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )}
    </span>
  );
}
