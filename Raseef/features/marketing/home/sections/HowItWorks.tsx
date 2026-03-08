"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { HOME_SECTION_IDS } from "@/features/marketing/home/constants/home-section-ids";
import { HOW_IT_WORKS_STEPS } from "@/features/marketing/home/data/how-it-works";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/provider";

export function HowItWorks() {
  const { messages } = useI18n();
  const content = messages.home.howItWorks;

  return (
    <section id={HOME_SECTION_IDS.howItWorks} className="py-24 bg-offwhite">
      <Container>
        <SectionHeading
          title={content.title}
          description={content.description}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10" />

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white w-24 h-24 rounded-base border-[length:var(--border-width-base)] border-navy flex items-center justify-center mx-auto mb-6 relative z-10 group transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#131721]">
                <step.icon className="w-10 h-10 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-navy rounded-pill flex items-center justify-center font-black text-sm border-[length:var(--border-width-base)] border-navy transition-all group-hover:shadow-[4px_4px_0px_0px_#131721]">
                  {step.id}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-navy mb-2">
                  {content.steps[index]?.title}
                </h3>
                <p className="text-navy/60 leading-relaxed">
                  {content.steps[index]?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
