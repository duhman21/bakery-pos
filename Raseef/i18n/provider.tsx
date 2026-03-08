"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getLocaleDirection, type Locale } from "@/i18n/config";
import type { I18nMessages } from "@/i18n/messages";

interface I18nContextValue {
  locale: Locale;
  direction: "rtl" | "ltr";
  messages: I18nMessages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: I18nMessages;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider
      value={{ locale, direction: getLocaleDirection(locale), messages }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
