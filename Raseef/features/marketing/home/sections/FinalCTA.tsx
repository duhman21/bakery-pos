"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/provider";

export function FinalCTA() {
  const { messages, direction } = useI18n();
  const content = messages.home.finalCta;
  const ArrowIcon = direction === "rtl" ? ArrowLeft : ArrowRight;
  const arrowHoverClass =
    direction === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";

  return (
    <section className="py-24 bg-offwhite relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-navy/5 transform -skew-y-3 origin-top-right -z-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-pill blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-base p-12 md:p-20 border-[length:var(--border-width-lg)] border-navy relative overflow-hidden transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_0px_#131721]"
        >
          {/* Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-white/30 blur-[80px] rounded-pill pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 leading-tight relative z-10">
            {content.title.line1} <br />
            <span className="text-white">{content.title.highlight}</span>
          </h2>
          <p className="text-lg text-navy/80 font-bold mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button size="lg" variant="navy" className="gap-2 group text-lg h-14 px-8">
              {content.actions.findNow}
              <ArrowIcon className={`w-5 h-5 transition-transform ${arrowHoverClass}`} />
            </Button>
            <Button
              size="lg"
              variant="white"
              className="h-14 px-8 text-lg"
            >
              {content.actions.contactSales}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
