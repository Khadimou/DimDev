import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, getProjects } from "@/lib/notion";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: "Projet introuvable - DimDev",
    };
  }

  return {
    title: `${project.title} - DimDev Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/works" className="inline-flex items-center text-gray-600 hover:text-primary mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Retour aux projets
        </Link>

        {/* Hero Image */}
        {project.image && (
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title & Description */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-dark mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600">{project.description}</p>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-surface rounded-full text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stack */}
        {project.stack && project.stack.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading font-semibold text-xl text-dark mb-4">
              Technologies utilisées
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mb-12">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                Voir le site
                <ExternalLink className="ml-2" size={18} />
              </Button>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github className="mr-2" size={18} />
                Code source
              </Button>
            </a>
          )}
        </div>

        {/* CTA */}
        <div className="bg-surface rounded-2xl p-8 text-center">
          <h3 className="font-heading font-semibold text-2xl text-dark mb-4">
            Vous avez un projet similaire ?
          </h3>
          <p className="text-gray-600 mb-6">
            Contactez-moi pour discuter de votre idée et obtenir un devis personnalisé.
          </p>
          <Link href="/contact">
            <Button variant="accent">Demander un POC similaire</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
