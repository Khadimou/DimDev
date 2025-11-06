import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/notion";

export const revalidate = 3600;

export const metadata = {
  title: "Works - DimDev Portfolio",
  description: "Découvrez mes projets et réalisations : POC, MVP et applications complètes.",
};

export default async function WorksPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-surface py-20">
      <div className="max-w-container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4">
            Mes réalisations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une sélection de projets POC, MVP et applications complètes développés pour mes clients.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
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
                        {project.tags.map((tag) => (
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
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">
              Aucun projet disponible pour le moment. Configurez votre base de données Notion pour afficher vos projets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
