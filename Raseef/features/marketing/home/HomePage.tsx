import { MarketingPageLayout } from "@/layouts/MarketingPageLayout";
import { Header } from "@/features/marketing/home/sections/Header";
import { Hero } from "@/features/marketing/home/sections/Hero";
import { TrustMetrics } from "@/features/marketing/home/sections/TrustMetrics";
import { HowItWorks } from "@/features/marketing/home/sections/HowItWorks";
import { WarehouseOptions } from "@/features/marketing/home/sections/WarehouseOptions";
import { WhyChooseUs } from "@/features/marketing/home/sections/WhyChooseUs";
import { FeaturedWarehouses } from "@/features/marketing/home/sections/FeaturedWarehouses";
import { Testimonials } from "@/features/marketing/home/sections/Testimonials";
import { FinalCTA } from "@/features/marketing/home/sections/FinalCTA";
import { Footer } from "@/features/marketing/home/sections/Footer";
import { I18nProvider } from "@/i18n/provider";
import { getMessages } from "@/i18n/messages";
import type { Locale } from "@/i18n/config";

export function HomePage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MarketingPageLayout locale={locale}>
        <Header />
        <Hero />
        <TrustMetrics />
        <HowItWorks />
        <WarehouseOptions />
        <WhyChooseUs />
        <FeaturedWarehouses />
        <Testimonials />
        <FinalCTA />
        <Footer />
      </MarketingPageLayout>
    </I18nProvider>
  );
}
