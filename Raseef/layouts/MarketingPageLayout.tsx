import type { ReactNode } from "react";
import { getLocaleDirection, type Locale } from "@/i18n/config";

export function MarketingPageLayout({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <main
      lang={locale}
      dir={getLocaleDirection(locale)}
      className="min-h-screen flex flex-col overflow-x-hidden"
    >
      {children}
    </main>
  );
}
