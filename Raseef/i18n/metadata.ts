import type { Metadata } from "next";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export function getHomeMetadata(locale: Locale): Metadata {
  const messages = getMessages(locale);
  const isDefaultLocale = locale === DEFAULT_LOCALE;
  const canonical = isDefaultLocale ? "/" : `/${locale}`;

  return {
    title: messages.seo.home.title,
    description: messages.seo.home.description,
    alternates: {
      canonical,
      languages: {
        ar: "/",
        en: "/en",
      },
    },
  };
}
