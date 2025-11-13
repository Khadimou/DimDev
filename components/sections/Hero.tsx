"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Code2, Zap } from "lucide-react";
import { logEvent } from "@/lib/analytics";

export function Hero() {
  const handlePOCClick = () => {
    logEvent("CTA", "Click", "Commander un POC - Hero");
    window.location.href = "/services";
  };

  const handleWorksClick = () => {
    logEvent("Navigation", "Click", "Voir mes réalisations - Hero");
    window.location.href = "/works";
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full">
              <Zap className="text-primary" size={16} />
              <span className="text-sm font-medium text-primary">
                Livraison rapide garantie
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
              Je transforme vos idées en{" "}
              <span className="text-primary">prototypes fonctionnels</span> — en quelques jours.
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              POC Express, MVP rapide ou développement complet. Stack : Next.js, Django, FastAPI, Postgres. DevOps : Docker, Jenkins, Kubernetes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" onClick={handlePOCClick}>
                Commander un POC
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="outline" size="lg" onClick={handleWorksClick}>
                Voir mes réalisations
              </Button>
            </div>

            {/* Stack Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              {["React", "Next.js", "TypeScript", "Python", "FastAPI", "Postgres"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative bg-dark rounded-2xl p-8 shadow-2xl">
              {/* Mock Browser Window */}
              <div className="flex space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>

              {/* Mock Code */}
              <div className="space-y-2 font-mono text-sm">
                <div className="text-purple-400">
                  <span className="text-gray-500">const</span> buildPOC = () =&gt; {"{"}
                </div>
                <div className="text-blue-400 ml-4">
                  <span className="text-gray-500">return</span> (
                </div>
                <div className="text-green-400 ml-8">
                  &lt;Product /&gt;
                </div>
                <div className="text-blue-400 ml-4">
                  );
                </div>
                <div className="text-purple-400">{"}"}</div>
              </div>

              {/* Animated Indicator */}
              <div className="absolute -bottom-4 -right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                <Code2 size={16} />
                <span className="font-medium text-sm">Livré en 3-5 jours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
