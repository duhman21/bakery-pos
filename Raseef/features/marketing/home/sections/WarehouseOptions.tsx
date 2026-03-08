"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { HOME_SECTION_IDS } from "@/features/marketing/home/constants/home-section-ids";
import { WAREHOUSE_SERVICES } from "@/features/marketing/home/data/warehouse-services";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/provider";

export function WarehouseOptions() {
  const { messages } = useI18n();
  const content = messages.home.warehouseOptions;

  return (
    <section id={HOME_SECTION_IDS.services} className="py-24 bg-white">
      <Container>
        <SectionHeading
          title={content.title}
          description={content.description}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WAREHOUSE_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative w-full bg-white rounded-base p-8 flex flex-col items-center justify-center text-center border-[length:var(--border-width-base)] border-navy transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#131721]">
                <div className="w-16 h-16 bg-primary rounded-base border-[length:var(--border-width-base)] border-navy flex items-center justify-center mb-6 transition-all group-hover:shadow-[4px_4px_0px_0px_#131721]">
                  <service.icon className="w-8 h-8 text-navy" />
                </div>
                <h3 className="text-xl font-black text-navy mb-2">
                  {content.items[index]?.title}
                </h3>
                <p className="text-navy/90 font-bold mb-3">
                  {content.items[index]?.short}
                </p>
                <p className="text-navy/70 font-medium text-sm leading-relaxed">
                  {content.items[index]?.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
