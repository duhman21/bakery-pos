"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Box, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/i18n/provider";

export function Hero() {
  const { messages, direction } = useI18n();
  const hero = messages.home.hero;
  const ArrowIcon = direction === "rtl" ? ArrowLeft : ArrowRight;
  const arrowHoverClass =
    direction === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-primary/10 text-primary font-bold text-sm mb-6 border-[length:var(--border-width-sm)] border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-pill bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-pill h-2 w-2 bg-primary"></span>
              </span>
              {hero.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-navy leading-[1.1] mb-6 tracking-tight">
              {hero.title.line1} <br />
              <span className="text-primary">{hero.title.highlight}</span>
            </h1>
            <p className="text-lg text-navy/70 mb-8 leading-relaxed max-w-lg">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 group">
                {hero.actions.findSpace}
                <ArrowIcon className={`w-5 h-5 transition-transform ${arrowHoverClass}`} />
              </Button>
              <Button size="lg" variant="outline" className="bg-white">
                {hero.actions.listWarehouse}
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm font-medium text-navy/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>{hero.highlights.certified}</span>
              </div>
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-primary" />
                <span>{hero.highlights.flexible}</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Main Dashboard Card */}
            <div className="relative z-20 w-full max-w-md bg-white rounded-base border-[length:var(--border-width-base)] border-navy p-6 transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#131721]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-navy text-lg">
                    {hero.previewCard.title}
                  </h3>
                  <p className="text-sm text-navy/50 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" /> {hero.previewCard.location}
                  </p>
                </div>
                <div className="bg-green-400 text-navy border-[length:var(--border-width-sm)] border-navy px-3 py-1 rounded-pill text-xs font-black transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_#131721]">
                  {hero.previewCard.status}
                </div>
              </div>

              <div className="relative h-48 rounded-base overflow-hidden mb-6 border-[length:var(--border-width-base)] border-navy">
                <Image
                  src="https://picsum.photos/seed/warehouse1/800/600"
                  alt={hero.previewCard.imageAlt}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-offwhite p-4 rounded-base border-[length:var(--border-width-sm)] border-navy">
                  <p className="text-xs text-navy/50 mb-1 font-medium">
                    {hero.previewCard.availableAreaLabel}
                  </p>
                  <p className="font-black text-navy text-xl">
                    {hero.previewCard.availableAreaValue}
                  </p>
                </div>
                <div className="bg-offwhite p-4 rounded-base border-[length:var(--border-width-sm)] border-navy">
                  <p className="text-xs text-navy/50 mb-1 font-medium">
                    {hero.previewCard.storageTypeLabel}
                  </p>
                  <p className="font-black text-navy text-xl">
                    {hero.previewCard.storageTypeValue}
                  </p>
                </div>
              </div>

              <Button className="w-full">{hero.previewCard.bookButton}</Button>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 top-20 z-30 bg-white p-4 rounded-base border-[length:var(--border-width-base)] border-navy flex items-center gap-4 transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#131721]"
            >
              <div className="w-12 h-12 bg-primary rounded-button border-[length:var(--border-width-sm)] border-navy flex items-center justify-center">
                <Box className="w-6 h-6 text-navy" />
              </div>
              <div>
                <p className="text-xs text-navy/50 font-medium">
                  {hero.floating.label}
                </p>
                <p className="font-black text-navy text-lg">{hero.floating.value}</p>
              </div>
            </motion.div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-pill blur-3xl -z-10 transform scale-150" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
