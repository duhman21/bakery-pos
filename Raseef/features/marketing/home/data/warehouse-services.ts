import {
  Box,
  CalendarClock,
  Layers,
  Settings,
  ThermometerSnowflake,
  Wind,
} from "lucide-react";
import type { WarehouseServiceConfig } from "@/features/marketing/home/types";

export const WAREHOUSE_SERVICES: WarehouseServiceConfig[] = [
  { id: 1, icon: Box },
  { id: 2, icon: ThermometerSnowflake },
  { id: 3, icon: Wind },
  { id: 4, icon: Layers },
  { id: 5, icon: Settings },
  { id: 6, icon: CalendarClock },
];
