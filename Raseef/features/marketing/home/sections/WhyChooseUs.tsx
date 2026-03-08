"use client";

import { Container } from "@/components/shared/Container";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/provider";

export function WhyChooseUs() {
  const { messages } = useI18n();
  const content = messages.home.whyChooseUs;

  return (
    <section className="py-24 bg-deepnavy text-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              {content.title} <span className="text-primary">{content.brand}</span>{" "}
              {content.titleSuffix}
            </h2>
            <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-lg">
              {content.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {content.reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-white/90 font-medium leading-relaxed">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-primary/20 rounded-pill blur-[100px] -z-10" />

            <div className="bg-navy border-[length:var(--border-width-base)] border-primary rounded-base p-8 transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#F0A500]">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                <div>
                  <p className="text-white/50 text-sm mb-1">
                    {content.comparison.savingsLabel}
                  </p>
                  <p className="text-3xl font-black text-white">
                    {content.comparison.savingsValue}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-white/50 text-sm mb-1">
                    {content.comparison.setupLabel}
                  </p>
                  <p className="text-3xl font-black text-primary">
                    {content.comparison.setupValue}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">
                      {content.comparison.raseefCostLabel}
                    </span>
                    <span className="font-bold text-white">
                      {content.comparison.raseefCostValue}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-pill overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "40%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-primary rounded-pill"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">
                      {content.comparison.traditionalCostLabel}
                    </span>
                    <span className="font-bold text-white">
                      {content.comparison.traditionalCostValue}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-pill overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white/30 rounded-pill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
