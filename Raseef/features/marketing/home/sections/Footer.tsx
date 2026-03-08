"use client";

import { BrandLogo } from "@/components/shared/BrandLogo";
import { Container } from "@/components/shared/Container";
import { FOOTER_LINK_GROUPS } from "@/features/marketing/home/data/footer-links";
import { useI18n } from "@/i18n/provider";

export function Footer() {
  const { messages } = useI18n();
  const footer = messages.home.footer;

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <BrandLogo
              label={messages.common.brand.name}
              alt={messages.common.brand.logoAlt}
              wrapperClassName="mb-6"
            />
            <p className="text-navy/60 text-sm leading-relaxed mb-6">
              {footer.description}
            </p>
          </div>

          {FOOTER_LINK_GROUPS.map((group, groupIndex) => (
            <div key={group.id}>
              <h4 className="font-bold text-navy mb-6">
                {footer.groups[groupIndex]?.title}
              </h4>
              <ul className="space-y-4">
                {group.hrefs.map((href, linkIndex) => (
                  <li key={`${group.id}-${linkIndex}`}>
                    <a
                      href={href}
                      className="text-navy/60 hover:text-primary text-sm font-medium transition-colors"
                    >
                      {footer.groups[groupIndex]?.links[linkIndex]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy/50 text-sm font-medium">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="w-8 h-8 rounded-pill bg-offwhite flex items-center justify-center text-navy/50 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
              <span className="text-xs">X</span>
            </div>
            <div className="w-8 h-8 rounded-pill bg-offwhite flex items-center justify-center text-navy/50 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
              <span className="text-xs">IN</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
