import { Check, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CheckoutButton } from "@/components/ui/CheckoutButton";
import { Button } from "@/components/ui/Button";
import { SERVICES, ADD_ONS } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Services & Tarifs - DimDev",
  description: "Découvrez mes offres : POC Express, Starter MVP et Full Development. Solutions adaptées à tous les budgets.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4">
            Services & Tarifs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des solutions flexibles adaptées à chaque étape de votre projet
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              className={`relative ${service.popular ? "border-2 border-accent" : ""}`}
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
                <div>
                  <h3 className="font-heading font-semibold text-2xl text-dark mb-2">
                    {service.title}
                  </h3>
                  <p className="text-3xl font-bold text-primary mb-1">{service.price}</p>
                  <p className="text-sm text-gray-500">{service.duration}</p>
                </div>

                <p className="text-gray-600">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {service.paymentEnabled ? (
                  <CheckoutButton
                    serviceId={service.id}
                    serviceName={service.title}
                    variant={service.popular ? "accent" : "primary"}
                  >
                    Commander - {service.price}
                  </CheckoutButton>
                ) : (
                  <Link href={`/contact?service=${service.id}`}>
                    <button
                      className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                        service.popular
                          ? "bg-accent text-white hover:bg-accent/90"
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                      Demander un devis
                    </button>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="bg-surface rounded-2xl p-8 mb-16">
          <h2 className="font-heading font-semibold text-2xl text-dark mb-6 text-center">
            Options supplémentaires
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ADD_ONS.map((addon, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg text-dark mb-2">{addon.name}</h3>
                <p className="text-2xl font-bold text-primary">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="font-heading font-semibold text-3xl text-dark mb-8 text-center">
            Comment ça fonctionne ?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Appel découverte",
                description: "On discute de votre projet, vos objectifs et vos contraintes.",
              },
              {
                step: "02",
                title: "Devis personnalisé",
                description: "Je vous envoie une proposition détaillée sous 24h.",
              },
              {
                step: "03",
                title: "Développement",
                description: "Je développe votre solution avec des mises à jour régulières.",
              },
              {
                step: "04",
                title: "Livraison",
                description: "Vous recevez le code, la documentation et le déploiement.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-12 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Réservez un appel gratuit pour discuter de votre idée et obtenir un devis personnalisé.
          </p>
          <a href="/contact">
            <Button variant="accent" size="lg" className="shadow-lg">
              Réserver un appel gratuit
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
