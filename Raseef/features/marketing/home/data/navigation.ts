import type { HomeNavItem } from "@/features/marketing/home/types";
import { HOME_SECTION_HREFS } from "@/features/marketing/home/constants/home-routes";

export const HOME_NAV_ITEMS: HomeNavItem[] = [
  { id: "howItWorks", href: HOME_SECTION_HREFS.howItWorks },
  { id: "services", href: HOME_SECTION_HREFS.services },
  { id: "warehouses", href: HOME_SECTION_HREFS.warehouses },
  { id: "testimonials", href: HOME_SECTION_HREFS.testimonials },
];
