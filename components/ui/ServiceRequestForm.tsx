"use client";

import { useState } from "react";
import { Button } from "./Button";
import { logEvent } from "@/lib/analytics";

interface ServiceRequestFormProps {
  serviceId: string;
  serviceName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  projectGoals: string;
  mainFeatures: string;
  timeline: string;
  budget: string;
  referralSource: string;
  additionalInfo: string;
}

export function ServiceRequestForm({
  serviceId,
  serviceName,
  onSuccess,
  onCancel,
}: ServiceRequestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceId,
    serviceName,
    projectGoals: "",
    mainFeatures: "",
    timeline: "",
    budget: "",
    referralSource: "",
    additionalInfo: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        logEvent("Form", "Submit", `Service Request - ${serviceName}`);

        // Wait 2 seconds before calling onSuccess
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
      } else {
        setStatus("error");
        logEvent("Form", "Error", `Service Request Failed - ${serviceName}`);
      }
    } catch (error) {
      setStatus("error");
      logEvent("Form", "Error", `Service Request Error - ${serviceName}`);
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-2xl text-dark mb-3">
            Demande envoyée avec succès !
          </h3>
          <p className="text-gray-600 mb-2">
            Merci pour votre intérêt pour <strong>{serviceName}</strong>.
          </p>
          <p className="text-gray-600 mb-6">
            Je vais étudier votre demande et vous répondre sous <strong>24h</strong> avec :
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-gray-700 mb-8">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Une confirmation que le service correspond à vos besoins</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Des ajustements de prix/délais si nécessaire</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Un lien de paiement sécurisé pour démarrer</span>
            </li>
          </ul>
          <p className="text-sm text-gray-500">
            Vérifiez vos emails (y compris les spams) 📧
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service sélectionné */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-1">Service sélectionné :</p>
        <p className="font-semibold text-dark text-lg">{serviceName}</p>
      </div>

      {/* Informations de contact */}
      <div className="grid md:grid-cols-2 gap-4">
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-dark mb-2">
            Entreprise / Projet
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Nom de votre entreprise"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      {/* Détails du projet */}
      <div>
        <label htmlFor="projectGoals" className="block text-sm font-medium text-dark mb-2">
          Objectifs du projet *
        </label>
        <textarea
          id="projectGoals"
          name="projectGoals"
          value={formData.projectGoals}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
          placeholder="Ex: Créer un MVP pour valider mon idée de marketplace de services locaux auprès de 100 premiers utilisateurs..."
        />
      </div>

      <div>
        <label htmlFor="mainFeatures" className="block text-sm font-medium text-dark mb-2">
          Fonctionnalités principales attendues *
        </label>
        <textarea
          id="mainFeatures"
          name="mainFeatures"
          value={formData.mainFeatures}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
          placeholder="Ex: Inscription/connexion, profils utilisateurs, système de recherche, messagerie, paiement Stripe..."
        />
      </div>

      {/* Budget & Délai */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-dark mb-2">
            Délai souhaité *
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          >
            <option value="">Sélectionnez un délai</option>
            <option value="urgent">Urgent (moins d'une semaine)</option>
            <option value="1-2weeks">1-2 semaines</option>
            <option value="2-4weeks">2-4 semaines</option>
            <option value="1-2months">1-2 mois</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-dark mb-2">
            Budget confirmé *
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          >
            <option value="">Sélectionnez votre budget</option>
            <option value="300-500">300€ - 500€</option>
            <option value="500-1000">500€ - 1000€</option>
            <option value="1000-2000">1000€ - 2000€</option>
            <option value="2000-5000">2000€ - 5000€</option>
            <option value="5000+">5000€+</option>
            <option value="to-discuss">À discuter</option>
          </select>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div>
        <label htmlFor="referralSource" className="block text-sm font-medium text-dark mb-2">
          Comment avez-vous entendu parler de nous ?
        </label>
        <select
          id="referralSource"
          name="referralSource"
          value={formData.referralSource}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
        >
          <option value="">Sélectionnez une option</option>
          <option value="linkedin">LinkedIn</option>
          <option value="github">GitHub</option>
          <option value="google">Recherche Google</option>
          <option value="recommendation">Recommandation</option>
          <option value="portfolio">Votre portfolio</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-dark mb-2">
          Informations complémentaires
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
          placeholder="Contraintes techniques, inspirations, références..."
        />
      </div>

      {/* Status Messages */}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          ❌ Une erreur est survenue. Réessayez ou écrivez-moi directement à contact@dimdev.com
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={status === "loading"}
          >
            Annuler
          </Button>
        )}
        <Button
          type="submit"
          variant="accent"
          className="flex-1"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        En soumettant ce formulaire, vous acceptez d'être contacté par email concernant votre projet.
      </p>
    </form>
  );
}
