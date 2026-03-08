import type { FeaturedWarehouseConfig } from "@/features/marketing/home/types";

export const FEATURED_WAREHOUSES: FeaturedWarehouseConfig[] = [
  {
    id: 1,
    available: true,
    image: "https://picsum.photos/seed/warehouse2/800/600",
  },
  {
    id: 2,
    available: true,
    image: "https://picsum.photos/seed/warehouse3/800/600",
  },
  {
    id: 3,
    available: false,
    image: "https://picsum.photos/seed/warehouse4/800/600",
  },
];
