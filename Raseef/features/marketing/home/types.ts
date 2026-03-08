import type { LucideIcon } from "lucide-react";

export interface HomeNavItem {
  id: "howItWorks" | "services" | "warehouses" | "testimonials";
  href: string;
}

export interface HowItWorksStepConfig {
  id: number;
  icon: LucideIcon;
}

export interface WarehouseServiceConfig {
  id: number;
  icon: LucideIcon;
}

export interface FeaturedWarehouseConfig {
  id: number;
  available: boolean;
  image: string;
}

export interface TestimonialConfig {
  id: number;
  rating: number;
  image: string;
}

export interface FooterLinkHrefGroup {
  id: string;
  hrefs: string[];
}
