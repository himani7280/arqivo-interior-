import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent, LAYOUT, projectsContent as projects } from "@/data/data";

export const metadata: Metadata = {
  title: projects.metadata.title,
  description: projects.metadata.description,
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero title={projects.hero.title} />
      <section className={`overflow-hidden bg-[#fcf8f7] ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <SectionHeading center {...homeContent.projectsSection} />
          <div className="mt-[clamp(1.5rem,3.5vw,3.2rem)]">
            <ProjectsGrid />
          </div>
        </div>
      </section>
    </>
  );
}
