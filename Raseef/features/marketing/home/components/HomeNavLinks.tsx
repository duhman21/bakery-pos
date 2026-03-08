"use client";

import { HOME_NAV_ITEMS } from "@/features/marketing/home/data/navigation";
import { useI18n } from "@/i18n/provider";

export function HomeNavLinks({
  className,
}: {
  className: string;
}) {
  const { messages } = useI18n();

  const navLabels = messages.home.header.nav;

  return (
    <>
      {HOME_NAV_ITEMS.map((item) => (
        <a key={item.href} href={item.href} className={className}>
          {navLabels[item.id]}
        </a>
      ))}
    </>
  );
}
