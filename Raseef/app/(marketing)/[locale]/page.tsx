import { notFound } from "next/navigation";
import { HomePage } from "@/features/marketing/home/HomePage";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getHomeMetadata } from "@/i18n/metadata";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === DEFAULT_LOCALE) {
    return getHomeMetadata(DEFAULT_LOCALE);
  }

  return getHomeMetadata(locale);
}

export default async function LocalizedMarketingHomePageRoute({
  params,
}: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === DEFAULT_LOCALE) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
