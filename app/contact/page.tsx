"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { logEvent } from "@/lib/analytics";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        logEvent("Form", "Submit", "Contact Form Success");
        setFormData({
          name: "",
          email: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        setStatus("error");
        logEvent("Form", "Error", "Contact Form Failed");
      }
    } catch (error) {
      setStatus("error");
      logEvent("Form", "Error", "Contact Form Error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-surface py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4">
            Parlons de votre projet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous ou réservez directement un appel. Je réponds sous 24h.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">Email</h3>
                  <p className="text-gray-600 text-sm">contact@dimdev.com</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">Réponse</h3>
                  <p className="text-gray-600 text-sm">Sous 24h ouvrées</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">Appel découverte</h3>
                  <p className="text-gray-600 text-sm">30 min gratuit</p>
                </div>
              </div>
            </Card>

            {/* Calendly placeholder */}
            <div className="bg-accent/10 border-2 border-dashed border-accent rounded-xl p-6 text-center">
              <p className="text-sm text-gray-700 mb-3">
                Préférez réserver directement ?
              </p>
              <p className="text-xs text-gray-600 mb-4">
                Le widget Calendly sera intégré ici une fois votre compte configuré.
              </p>
              <Button variant="accent" size="sm" disabled>
                Calendly (à venir)
              </Button>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-dark mb-2">
                    Type de projet *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="poc">POC Express</option>
                    <option value="mvp">Starter MVP</option>
                    <option value="full">Full Development</option>
                    <option value="other">Autre / Non sûr</option>
                  </select>
                </div>

                {/* Budget & Timeline */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-dark mb-2">
                      Budget estimé
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    >
                      <option value="">Sélectionnez une fourchette</option>
                      <option value="< 500€">{"< 500€"}</option>
                      <option value="500€ - 1500€">500€ - 1500€</option>
                      <option value="1500€ - 5000€">1500€ - 5000€</option>
                      <option value="> 5000€">{"> 5000€"}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-dark mb-2">
                      Délai souhaité
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    >
                      <option value="">Sélectionnez un délai</option>
                      <option value="urgent">Urgent (moins d'une semaine)</option>
                      <option value="1-2weeks">1-2 semaines</option>
                      <option value="1month">1 mois</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                    Décrivez votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                    placeholder="Parlez-moi de votre idée, vos objectifs, vos contraintes..."
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✅ Message envoyé ! Je vous réponds sous 24h.
                  </div>
                )}
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    ❌ Une erreur est survenue. Réessayez ou écrivez-moi directement à contact@dimdev.com
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
