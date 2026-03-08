"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Menu, X } from "lucide-react";
import { HomeNavLinks } from "@/features/marketing/home/components/HomeNavLinks";
import { LocaleToggle } from "@/features/marketing/home/components/LocaleToggle";
import { useHeaderState } from "@/features/marketing/home/hooks/useHeaderState";
import { useI18n } from "@/i18n/provider";

export function Header() {
  const { isScrolled, isMobileMenuOpen, setIsMobileMenuOpen } = useHeaderState();
  const { messages } = useI18n();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-offwhite/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogo
            label={messages.common.brand.name}
            alt={messages.common.brand.logoAlt}
          />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <HomeNavLinks className="text-navy/80 hover:text-primary font-medium transition-colors" />
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <LocaleToggle />
            <Button variant="outline" className="font-bold bg-white">
              {messages.home.header.actions.login}
            </Button>
            <Button>{messages.home.header.actions.requestSpace}</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4">
          <HomeNavLinks className="p-2 text-navy font-medium" />
          <div className="px-2">
            <LocaleToggle />
          </div>
          <div className="h-px bg-gray-100 my-2" />
          <Button variant="outline" className="w-full justify-center">
            {messages.home.header.actions.login}
          </Button>
          <Button className="w-full justify-center">
            {messages.home.header.actions.requestSpace}
          </Button>
        </div>
      )}
    </header>
  );
}
