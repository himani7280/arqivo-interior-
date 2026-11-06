import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialsList } from "@/components/TestimonialsList";
import { LAYOUT, TESTIMONIALS, testimonialsContent as content } from "@/data/data";

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero title={content.hero.title} />
      <section className={`overflow-hidden bg-white ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <SectionHeading center size="h2" textSize="p" {...content.section} />
          <TestimonialsList items={TESTIMONIALS} />
        </div>
      </section>
    </>
  );
}
