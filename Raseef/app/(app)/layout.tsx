import type { ReactNode } from "react";
import type { Metadata } from "next";
import { APP_AREA_METADATA } from "@/constants/seo";

export const metadata: Metadata = APP_AREA_METADATA;

export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
