import { homeContent, IMG, LAYOUT, TYPE } from "@/data/data";
import { LinkButton } from "./Button";
import { Frame, Reveal, WordReveal } from "./Motion";
import { Photo } from "./Photo";

const { about } = homeContent;

/** Home intro card. On the About page both paragraphs are shown and the button is hidden. */
export function AboutBlock({ full = false }: { full?: boolean }) {
  return (
    <section className="overflow-hidden bg-[#f2ecec] py-(--side)">
      <div className={`${LAYOUT.container} grid lg:grid-cols-2`}>
        <Reveal dir="right" className="flex flex-col justify-center bg-[#fcf8f8] pl-[clamp(1.5rem,4.8vw,4.8rem)] pr-[clamp(1.5rem,1.8vw,2rem)] py-[clamp(1.8rem,4.5vw,4.5rem)]">
          <p className={`inline-flex items-center gap-[clamp(0.7rem,1.5vw,1.4rem)] text-[#211b18] ${TYPE.eyebrowSm}`}>
            <span className="h-px w-[clamp(1.8rem,5vw,4.8rem)] bg-current opacity-60" aria-hidden="true" />
            {about.eyebrow}
          </p>
          <h2 className={`mt-[0.95em] text-[#211b18] ${TYPE.h2}`}>
            <WordReveal text={about.title} accent={about.accent} />
          </h2>
          <Reveal delay={0.1}>
            <div className={`mt-[clamp(1rem,2.2vw,2.2rem)] max-w-[40vw] min-w-[min(100%,18rem)] space-y-[1.2em] text-[#2a2523] ${TYPE.p}`}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {full && <p>{about.extraParagraph}</p>}
            </div>
          </Reveal>
          {!full && (
            <Reveal delay={0.2} className="mt-[clamp(1.2rem,2.2vw,2.2rem)]">
              <LinkButton href={about.button.href}>{about.button.label}</LinkButton>
            </Reveal>
          )}
        </Reveal>

        <div className="relative grid min-h-[22rem] place-items-center bg-[#3e312d] py-[clamp(1.5rem,3.2vw,3rem)]">
          <Frame parallax={5} className="aspect-[328/483] w-[min(52%,22rem)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <Photo src={IMG[about.image]} alt={about.imageAlt} sizes="(min-width: 1024px) 26vw, 60vw" />
          </Frame>
        </div>
      </div>
    </section>
  );
}
