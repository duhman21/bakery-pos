import localFont from "next/font/local";
import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  getLocaleDirection,
  isLocale,
  LOCALE_COOKIE_NAME,
} from "@/i18n/config";
import "./globals.css"; // Global styles

const brandFont = localFont({
  src: [
    {
      path: "../next/font/TheYearofHandicrafts-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../next/font/TheYearofHandicrafts-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../next/font/TheYearofHandicrafts-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../next/font/TheYearofHandicrafts-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../next/font/TheYearofHandicrafts-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-brand",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  return (
    <html
      lang={locale}
      dir={getLocaleDirection(locale)}
      className={brandFont.variable}
    >
      <body
        className="font-sans antialiased selection:bg-primary selection:text-navy"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
