"use client";

import React, { useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./Button";

export function BookingWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  useEffect(() => {
    if (isOpen && calendlyUrl && typeof window !== "undefined") {
      // Load Calendly widget script
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, calendlyUrl]);

  // Si Calendly n'est pas configuré, rediriger vers contact
  const handleClick = () => {
    if (!calendlyUrl || calendlyUrl.includes("your-username")) {
      window.location.href = "/contact";
      return;
    }
    setIsOpen(true);
  };

  if (!calendlyUrl || calendlyUrl.includes("your-username")) {
    // Version sans Calendly - bouton contact flottant
    return (
      <a
        href="/contact"
        className="fixed bottom-6 right-6 z-50 bg-accent text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group"
        aria-label="Parler avec Rassoul"
      >
        <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-medium">Parler avec Rassoul</span>
      </a>
    );
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 bg-accent text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group"
        aria-label="Réserver un appel"
      >
        <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
        <span className="font-medium">Réserver un appel</span>
      </button>

      {/* Calendly Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] m-4">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            {/* Calendly Embed */}
            <div
              className="calendly-inline-widget w-full h-full rounded-2xl"
              data-url={calendlyUrl}
            />
          </div>
        </div>
      )}
    </>
  );
}
