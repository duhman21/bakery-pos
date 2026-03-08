import { HomePage } from "@/features/marketing/home/HomePage";
import { getHomeMetadata } from "@/i18n/metadata";

export const metadata = getHomeMetadata("ar");

export default function MarketingHomePageRoute() {
  return <HomePage locale="ar" />;
}
