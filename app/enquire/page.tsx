import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForms";
import { Frame, Reveal } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { enquireContent as enquire, IMG, LAYOUT, TYPE } from "@/data/data";

export const metadata: Metadata = {
  title: enquire.metadata.title,
  description: enquire.metadata.description,
};

export default function EnquirePage() {
  return (
    <>
      <PageHero title={enquire.hero.title} />
      <section className={`overflow-hidden bg-[#fffdfc] ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <SectionHeading center tone="bold" {...enquire.section} />

          <Reveal className="mx-auto mt-[clamp(1.6rem,3vw,3rem)] max-w-6xl">
            <div className="grid overflow-hidden rounded-none bg-white shadow-[0_30px_70px_-30px_rgba(53,40,42,0.25)] lg:grid-cols-[0.38fr_0.62fr]">
              <Frame parallax={4} className="min-h-72 lg:min-h-full">
                <Photo src={IMG[enquire.image]} alt={enquire.imageAlt} sizes="(min-width: 1024px) 36vw, 100vw" />
              </Frame>
              <div className="px-[clamp(1.6rem,3.4vw,3.4rem)] py-[clamp(1.4rem,2.5vw,2.5rem)]">
                <h3 className={`mb-[clamp(1.2rem,1.8vw,1.8rem)] flex items-center gap-[clamp(0.6rem,1.2vw,1.2rem)] text-[#211b18] ${TYPE.formTitle}`}>
                  <span className="h-[1.1em] w-0.5 bg-[#9b7b69]" aria-hidden="true" />
                  {enquire.formTitle}
                </h3>
                <EnquiryForm variant="enquiry" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
