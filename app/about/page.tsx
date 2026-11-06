import type { Metadata } from "next";
import { AboutBlock } from "@/components/AboutBlock";
import { Icon } from "@/components/Icon";
import { Frame, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { aboutContent as about, IMG, LAYOUT, TYPE } from "@/data/data";

export const metadata: Metadata = {
  title: about.metadata.title,
  description: about.metadata.description,
};

export default function AboutPage() {
  const { purpose } = about;
  return (
    <>
      <PageHero title={about.hero.title} />
      <AboutBlock full />

      <section className={`overflow-hidden bg-white ${LAYOUT.section}`}>
        <div className={`${LAYOUT.container} grid items-center gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2`}>
          <div>
            <Reveal>
              <p className={`inline-flex items-center gap-[clamp(0.7rem,1.5vw,1.4rem)] text-[#211b18] ${TYPE.eyebrowSm}`}>
                <span className="h-px w-[clamp(1.8rem,5vw,4.8rem)] bg-current opacity-60" aria-hidden="true" />
                {purpose.eyebrow}
              </p>
            </Reveal>
            <h2 className={`mt-[0.47em] text-[#211b18] ${TYPE.h2}`}>
              <WordReveal text={purpose.title} accent={purpose.accent} />
            </h2>
            <Reveal delay={0.1}>
              <p className={`mt-[clamp(0.8rem,1.6vw,1.6rem)] w-full max-w-xl text-[#211b18] lg:max-w-[34vw] ${TYPE.p}`}>{purpose.text}</p>
            </Reveal>

            <Stagger className="mt-[clamp(1.4rem,2.8vw,2.6rem)] space-y-[clamp(1.2rem,2.2vw,2.2rem)]">
              {purpose.pillars.map((pillar) => (
                <StaggerItem key={pillar.title} className="group flex items-start sm:items-center gap-[clamp(0.9rem,2vw,2rem)]">
                  <span className="grid size-[clamp(3.2rem,4.8vw,4.6rem)] shrink-0 place-items-center bg-[#8a5230] text-white transition-all duration-500 group-hover:rotate-[6deg] group-hover:scale-105 group-hover:bg-[#35282a]">
                    <Icon name={pillar.icon} className="size-[52%]" strokeWidth={1.2} />
                  </span>
                  <span className="hidden h-[clamp(3.2rem,5.5vw,5rem)] w-px shrink-0 bg-[#9b7b69]/60 xs:block" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-[#211b18] ${TYPE.pillarTitle}`}>{pillar.title}</h3>
                    <p className={`mt-[0.3em] w-full max-w-xl text-[#2a2523] lg:max-w-[28vw] ${TYPE.small}`}>{pillar.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="relative mx-auto w-full max-w-md pb-[clamp(1.2rem,3vw,2.8rem)] pr-[clamp(1.2rem,3.1vw,3rem)] sm:max-w-lg lg:max-w-none">
            <Reveal dir="zoom" className="absolute bottom-0 right-0 size-[82%] bg-[#8a5230]">
              <span className="block size-full" />
            </Reveal>
            <Frame parallax={5} className="relative aspect-[582/568] w-[94%]">
              <Photo src={IMG[purpose.image]} alt={purpose.imageAlt} sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 92vw" />
            </Frame>
          </div>
        </div>
      </section>
    </>
  );
}
