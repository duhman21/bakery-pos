"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { MapPin, Box, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HOME_SECTION_IDS } from "@/features/marketing/home/constants/home-section-ids";
import { FEATURED_WAREHOUSES } from "@/features/marketing/home/data/featured-warehouses";
import { useI18n } from "@/i18n/provider";

export function FeaturedWarehouses() {
  const { messages, direction } = useI18n();
  const content = messages.home.featuredWarehouses;
  const ArrowIcon = direction === "rtl" ? ArrowLeft : ArrowRight;
  const arrowHoverClass =
    direction === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";

  return (
    <section id={HOME_SECTION_IDS.warehouses} className="py-24 bg-offwhite">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
              {content.title}
            </h2>
            <p className="text-lg text-navy/60">
              {content.description}
            </p>
          </div>
          <Button variant="outline" className="shrink-0 gap-2 group bg-white">
            {content.viewAll}
            <ArrowIcon className={`w-4 h-4 transition-transform ${arrowHoverClass}`} />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_WAREHOUSES.map((warehouse, index) => (
            <motion.div
              key={warehouse.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-base overflow-hidden border-[length:var(--border-width-base)] border-navy transition-all group hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#131721]"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden border-b-[length:var(--border-width-base)] border-navy">
                <Image
                  src={warehouse.image}
                  alt={content.items[index]?.name || ""}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  {warehouse.available ? (
                    <span className="bg-green-400 text-navy border-[length:var(--border-width-sm)] border-navy px-3 py-1 rounded-pill text-xs font-black transition-all group-hover:shadow-[2px_2px_0px_0px_#131721]">
                      {content.status.available}
                    </span>
                  ) : (
                    <span className="bg-red-400 text-navy border-[length:var(--border-width-sm)] border-navy px-3 py-1 rounded-pill text-xs font-black transition-all group-hover:shadow-[2px_2px_0px_0px_#131721]">
                      {content.status.unavailable}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-navy/50 text-sm mb-2 font-medium">
                  <MapPin className="w-4 h-4" />
                  {content.items[index]?.location}
                </div>
                <h3 className="text-xl font-black text-navy mb-4">
                  {content.items[index]?.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-offwhite p-3 rounded-button border-[length:var(--border-width-sm)] border-navy flex items-center gap-3">
                    <Box className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] text-navy/50 font-bold uppercase">
                        {content.labels.type}
                      </p>
                      <p className="text-sm font-bold text-navy">
                        {content.items[index]?.type}
                      </p>
                    </div>
                  </div>
                  <div className="bg-offwhite p-3 rounded-button border-[length:var(--border-width-sm)] border-navy flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] text-navy/50 font-bold uppercase">
                        {content.labels.area}
                      </p>
                      <p className="text-sm font-bold text-navy">
                        {content.items[index]?.area}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {content.items[index]?.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white text-navy px-2 py-1 rounded-button text-xs font-bold border-[length:var(--border-width-sm)] border-navy transition-all group-hover:shadow-[2px_2px_0px_0px_#131721]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button className="w-full" disabled={!warehouse.available}>
                  {warehouse.available
                    ? content.action.requestQuote
                    : content.action.unavailable}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
