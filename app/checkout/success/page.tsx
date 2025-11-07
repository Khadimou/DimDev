"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Calendar, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);
  const emailFrom = process.env.NEXT_PUBLIC_EMAIL_FROM || "contact@dimdev.pro";

  useEffect(() => {
    // Simulate loading time for visual effect
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SuccessFallback />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
            Paiement réussi ! 🎉
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Merci pour votre confiance ! Votre commande a été confirmée et vous allez recevoir un email de confirmation sous peu.
          </p>

          {/* Session ID (for debugging) */}
          {sessionId && (
            <div className="bg-surface rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-500">
                Numéro de commande : <span className="font-mono text-gray-700">{sessionId.slice(0, 24)}...</span>
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-heading font-semibold text-xl text-dark mb-4 flex items-center">
              <span className="mr-2">📋</span> Prochaines étapes
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">1.</span>
                <span className="text-gray-700">
                  Vous recevrez un <strong>email de confirmation</strong> avec les détails de votre commande et votre facture.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">2.</span>
                <span className="text-gray-700">
                  Je vous contacterai dans les <strong>24 heures</strong> pour planifier notre premier appel de découverte.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">3.</span>
                <span className="text-gray-700">
                  Nous définirons ensemble les détails du projet et la feuille de route.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 mt-1">4.</span>
                <span className="text-gray-700">
                  Le développement commencera dès que nous aurons validé tous les détails !
                </span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA: Calendar */}
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                <Calendar className="mr-2" size={18} />
                Planifier un appel maintenant
              </Button>
            </a>

            {/* Secondary CTA: Email */}
            <a href={`mailto:${emailFrom}`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2" size={18} />
                M'envoyer un email
              </Button>
            </a>
          </div>

          {/* Back to home link */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/" className="inline-flex items-center text-primary hover:text-primary-dark transition-colors">
              Retour à l'accueil
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Vous n'avez pas reçu d'email ? Vérifiez vos spams ou contactez-moi directement.
          </p>
        </div>
      </div>
    </div>
  );
}

function SuccessFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
