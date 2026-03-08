"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function TrustMetrics() {
  const { messages, direction } = useI18n();
  const metrics = messages.home.trustMetrics.items;

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <Container>
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100",
            direction === "rtl" ? "divide-x-reverse" : "",
          )}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={`${metric.value}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center px-4"
            >
              <p className="text-4xl md:text-5xl font-black text-navy mb-2">
                {metric.value}
              </p>
              <p className="text-sm md:text-base font-medium text-navy/60">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
