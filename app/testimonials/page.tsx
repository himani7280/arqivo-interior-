import type { Metadata } from "next";
import { Stagger } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCard } from "@/components/TestimonialCard";
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
          <Stagger className="mx-auto mt-[clamp(1.3rem,2.4vw,2.4rem)] grid max-w-[86.5%] gap-[clamp(1rem,1.6vw,1.6rem)] md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
