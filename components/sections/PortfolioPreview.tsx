"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import { logEvent } from "@/lib/analytics";

interface PortfolioPreviewProps {
  projects: Project[];
}

export function PortfolioPreview({ projects }: PortfolioPreviewProps) {
  const handleViewAllClick = () => {
    logEvent("Navigation", "Click", "Voir tous les projets");
  };

  return (
    <section className="py-section bg-surface">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
              Projets récents
            </h2>
            <p className="text-lg text-gray-600">
              Une sélection de mes dernières réalisations
            </p>
          </div>
          <Link href="/works" onClick={handleViewAllClick}>
            <Button variant="outline" className="hidden md:inline-flex">
              Voir tous les projets
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project) => (
            <Link
              key={project.slug}
              href={`/works/${project.slug}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-4xl">🚀</span>
                    </div>
                  )}
                  {project.deliveryTime && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                      {project.deliveryTime}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-dark mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-surface rounded text-xs text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stack */}
                  {project.stack && project.stack.length > 0 && (
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span className="font-mono">{project.stack.join(" • ")}</span>
                    </div>
                  )}

                  {/* Link indicator */}
                  <div className="flex items-center text-primary text-sm font-medium pt-2">
                    Voir le projet
                    <ExternalLink className="ml-1" size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link href="/works" onClick={handleViewAllClick}>
            <Button variant="outline" className="w-full sm:w-auto">
              Voir tous les projets
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
