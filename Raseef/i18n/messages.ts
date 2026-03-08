import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import type { Locale } from "@/i18n/config";

export type I18nMessages = typeof ar;

const MESSAGES_BY_LOCALE: Record<Locale, I18nMessages> = {
  ar,
  en,
};

export function getMessages(locale: Locale): I18nMessages {
  return MESSAGES_BY_LOCALE[locale];
}
