import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { CTA } from "@/components/sections/CTA";
import { getProjects } from "@/lib/notion";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch projects from Notion CMS
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Services />
      <PortfolioPreview projects={projects} />
      <CTA />
    </>
  );
}
