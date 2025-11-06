"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_ITEMS } from "@/lib/constants";
import { logEvent } from "@/lib/analytics";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookCallClick = () => {
    logEvent("CTA", "Click", "Book a call - Header");
    // Pour l'instant, scroll vers contact. Plus tard : Calendly
    window.location.href = "/contact";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="font-heading font-bold text-xl text-dark">DimDev</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-dark hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="primary" size="sm" onClick={handleBookCallClick}>
              Réserver un appel
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-dark hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => {
                handleBookCallClick();
                setMobileMenuOpen(false);
              }}
            >
              Réserver un appel
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
