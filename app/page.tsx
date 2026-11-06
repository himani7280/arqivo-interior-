import type { Metadata } from "next";
import { AboutBlock } from "@/components/AboutBlock";
import { BlogCard } from "@/components/BlogCard";
import { LinkButton } from "@/components/Button";
import { HomeHero } from "@/components/HomeHero";
import { Reveal, Stagger } from "@/components/Motion";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicesBlock } from "@/components/ServicesBlock";
import { homeContent as home, LAYOUT, POSTS } from "@/data/data";

export const metadata: Metadata = {
  title: { absolute: home.metadata.title },
  description: home.metadata.description,
};

export default function HomePage() {
  const { projectsSection, blogSection } = home;
  return (
    <>
      <HomeHero />
      <AboutBlock />
      <ServicesBlock />

      <section className={`overflow-hidden bg-[#fcf8f7] ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <SectionHeading center {...projectsSection} />
          <div className="mt-[clamp(1.5rem,3.5vw,3.2rem)]">
            <ProjectsGrid />
          </div>
        </div>
      </section>

      <section className={`overflow-hidden bg-[#fcf8f7] ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <SectionHeading center {...blogSection} />
          <Stagger className="mt-[clamp(1.5rem,2.8vw,2.6rem)] grid gap-[clamp(1rem,2vw,2rem)] md:grid-cols-3">
            {POSTS.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Stagger>
          <Reveal className="mt-[clamp(1.4rem,2.4vw,2.2rem)] text-center">
            <LinkButton href={blogSection.button.href} tone="brown" small>
              {blogSection.button.label}
            </LinkButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
