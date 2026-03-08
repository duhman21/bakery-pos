"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/provider";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { getLocalizedPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleToggle({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, messages } = useI18n();
  const switchLocale =
    locale === "ar"
      ? (SUPPORTED_LOCALES.find((item) => item === "en") ?? locale)
      : locale === "en"
        ? (SUPPORTED_LOCALES.find((item) => item === "ar") ?? locale)
        : (SUPPORTED_LOCALES.find((item) => item !== locale) ?? locale);

  const href = getLocalizedPathname(pathname || "/", switchLocale);
  const label =
    switchLocale === "ar"
      ? "ع"
      : (messages.common.languageToggle[switchLocale] ?? switchLocale.toUpperCase());
  const ariaLabel =
    switchLocale === "en"
      ? "Switch language to English"
      : switchLocale === "ar"
        ? "التبديل إلى العربية"
        : `Switch language to ${String(switchLocale).toUpperCase()}`;

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-button border-[length:var(--border-width-sm)] border-navy bg-white",
        className,
      )}
    >
      <Link
        href={href}
        prefetch={false}
        className="px-2.5 py-1 text-xs font-black transition-colors bg-white text-navy/70 hover:text-navy"
        aria-label={ariaLabel}
      >
        {label}
      </Link>
    </div>
  );
}
