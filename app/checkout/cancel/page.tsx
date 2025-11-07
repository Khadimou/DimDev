"use client";

import { useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft, MessageCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export default function CheckoutCancelPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");

  // Find the service if service ID is provided
  const service = serviceId ? SERVICES.find((s) => s.id === serviceId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Cancel Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
            Paiement annulé
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Pas de problème ! Votre paiement a été annulé et aucun montant n'a été débité.
          </p>

          {/* Service Info */}
          {service && (
            <div className="bg-surface rounded-lg p-6 mb-8 text-left">
              <p className="text-sm text-gray-500 mb-2">Service sélectionné :</p>
              <h3 className="font-heading font-semibold text-xl text-dark mb-1">
                {service.title}
              </h3>
              <p className="text-2xl font-bold text-primary">{service.price}</p>
            </div>
          )}

          {/* Why did you cancel? */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-heading font-semibold text-lg text-dark mb-3">
              💡 Vous avez des questions ?
            </h2>
            <p className="text-gray-700 mb-4">
              Si vous avez annulé parce que vous aviez des questions ou des doutes,
              n'hésitez pas à me contacter. Je serais ravi de :
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Répondre à vos questions sur le service</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Adapter l'offre à vos besoins spécifiques</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Vous proposer un devis personnalisé</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Planifier un appel découverte gratuit</span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {/* Retry Payment */}
            {service && service.paymentEnabled && (
              <Link href="/services">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  <RefreshCcw className="mr-2" size={18} />
                  Réessayer le paiement
                </Button>
              </Link>
            )}

            {/* Contact */}
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="mr-2" size={18} />
                Contactez-moi
              </Button>
            </Link>
          </div>

          {/* Back to services link */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/services" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
              <ArrowLeft className="mr-2" size={16} />
              Retour aux services
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-dark mb-1">
                Besoin d'aide ?
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Je suis disponible pour répondre à toutes vos questions par email ou lors d'un appel.
              </p>
              <a
                href={`mailto:${process.env.EMAIL_FROM || "contact@dimdev.com"}`}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                {process.env.EMAIL_FROM || "contact@dimdev.com"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
