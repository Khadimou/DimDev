"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Loader2, ShoppingCart } from "lucide-react";

interface CheckoutButtonProps {
  serviceId: string;
  serviceName: string;
  variant?: "primary" | "accent" | "outline";
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  serviceId,
  serviceName,
  variant = "primary",
  className = "",
  children,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the checkout API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création de la session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de paiement non reçue");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant={variant}
        className={`w-full ${className}`}
        onClick={handleCheckout}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Chargement...
          </>
        ) : (
          <>
            {children || (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Commander maintenant
              </>
            )}
          </>
        )}
      </Button>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
