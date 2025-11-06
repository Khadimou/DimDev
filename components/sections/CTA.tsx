"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { logEvent } from "@/lib/analytics";

export function CTA() {
  const handleCTAClick = () => {
    logEvent("CTA", "Click", "Prêt à lancer - Bottom CTA");
    window.location.href = "/contact";
  };

  return (
    <section className="py-section bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MessageSquare className="text-white" size={32} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Prêt à lancer votre projet ?
          </h2>

          {/* Description */}
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Réserve un appel gratuit de 30 minutes pour discuter de ton idée. 
            Je te proposerai une solution adaptée à ton budget et tes délais.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="accent" 
              size="lg"
              onClick={handleCTAClick}
              className="shadow-lg"
            >
              Réserver un appel
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                logEvent("CTA", "Click", "Demander un POC - Bottom CTA");
                window.location.href = "/contact?type=poc";
              }}
            >
              Demander un POC
            </Button>
          </div>

          {/* Social Proof / Note */}
          <p className="text-sm text-white/70">
            ⚡ Réponse sous 24h • 🎯 Livraison garantie • 💯 Satisfaction client
          </p>
        </div>
      </div>
    </section>
  );
}
