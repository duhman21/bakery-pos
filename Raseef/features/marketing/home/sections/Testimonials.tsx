"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { HOME_SECTION_IDS } from "@/features/marketing/home/constants/home-section-ids";
import { TESTIMONIALS } from "@/features/marketing/home/data/testimonials";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/i18n/provider";

export function Testimonials() {
  const { messages } = useI18n();
  const content = messages.home.testimonials;

  return (
    <section id={HOME_SECTION_IDS.testimonials} className="py-24 bg-white">
      <Container>
        <SectionHeading
          title={content.title}
          description={content.description}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-base p-8 relative border-[length:var(--border-width-base)] border-navy transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_#131721] group"
            >
              <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20 rotate-180" />

              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-navy/90 leading-relaxed mb-8 relative z-10 font-bold">
                &quot;{content.items[index]?.content}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-pill overflow-hidden border-[length:var(--border-width-base)] border-navy transition-all group-hover:shadow-[2px_2px_0px_0px_#131721]">
                  <Image
                    src={testimonial.image}
                    alt={content.items[index]?.name || ""}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-navy">
                    {content.items[index]?.name}
                  </h4>
                  <p className="text-xs text-navy/50 font-medium">
                    {content.items[index]?.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
