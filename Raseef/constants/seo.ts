import type { Metadata } from "next";
import { APP_CONFIG } from "@/constants/app-config";

export const APP_AREA_METADATA: Metadata = {
  title: `${APP_CONFIG.name} | App`,
  description: "Authenticated application area",
  robots: {
    index: false,
    follow: false,
  },
};
