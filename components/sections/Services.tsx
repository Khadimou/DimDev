"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Check, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { logEvent } from "@/lib/analytics";

export function Services() {
  const handleContactClick = (serviceId: string) => {
    logEvent("CTA", "Click", `Contact - ${serviceId}`);
    window.location.href = `/contact?service=${serviceId}`;
  };

  return (
    <section className="py-section bg-white">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
            Ce que je propose
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des solutions adaptées à chaque étape de votre projet
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              className={`relative ${service.popular ? "border-2 border-accent" : ""}`}
              hover
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center space-x-1 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                    <Sparkles size={14} />
                    <span>Populaire</span>
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Title & Price */}
                <div>
                  <h3 className="font-heading font-semibold text-2xl text-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-3xl font-bold text-primary mb-1">{service.price}</p>
                  <p className="text-sm text-gray-500">{service.duration}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA - Payment enabled or Contact */}
                {service.paymentEnabled ? (
                  <CheckoutButton
                    serviceId={service.id}
                    serviceName={service.title}
                    variant={service.popular ? "accent" : "primary"}
                  >
                    Commander - {service.price}
                  </CheckoutButton>
                ) : (
                  <Button
                    variant={service.popular ? "accent" : "primary"}
                    className="w-full"
                    onClick={() => handleContactClick(service.id)}
                  >
                    Demander un devis
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-16 text-center">
          <h3 className="font-heading font-semibold text-xl text-dark mb-6">
            Options supplémentaires
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Hébergement & maintenance : 70 €/mois",
              "Design UI/UX : +300 €",
              "Intégration mobile : Sur devis",
            ].map((addon, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-surface rounded-lg text-gray-700 text-sm"
              >
                {addon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
