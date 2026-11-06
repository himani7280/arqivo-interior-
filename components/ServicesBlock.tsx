import { homeContent, IMG, LAYOUT, TYPE } from "@/data/data";
import { Icon } from "./Icon";
import { DrawLine, Frame, Reveal, Stagger, StaggerItem, WordReveal } from "./Motion";
import { Photo } from "./Photo";

const { services } = homeContent;

export function ServicesBlock() {
  return (
    <section className={`overflow-hidden bg-[#fcf8f7] ${LAYOUT.section}`}>
      <div className={`${LAYOUT.container} grid gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1fr_1.28fr] lg:items-start lg:gap-[8.5vw]`}>
        <div>
          <Reveal>
            <p className={`inline-flex items-center gap-[clamp(0.7rem,1.5vw,1.4rem)] text-[#211b18] ${TYPE.eyebrowSm}`}>
              <span className="h-px w-[clamp(1.8rem,5vw,4.8rem)] bg-current opacity-60" aria-hidden="true" />
              {services.eyebrow}
            </p>
          </Reveal>
          <h2 className={`mt-[0.52em] text-[#211b18] ${TYPE.h2}`}>
            <WordReveal text={services.title} accent={services.accent} />
          </h2>
          <Reveal delay={0.1}>
            <p className={`mt-[clamp(1rem,2.2vw,2.2rem)] max-w-[38vw] min-w-[min(100%,18rem)] text-[#211b18] ${TYPE.p}`}>{services.text}</p>
          </Reveal>
          <Frame parallax={6} className="mt-[clamp(1.4rem,2.6vw,2.6rem)] aspect-[486/277] w-full">
            <Photo src={IMG[services.image]} alt={services.imageAlt} sizes="(min-width: 1024px) 38vw, 100vw" />
          </Frame>
        </div>

        <Stagger className="lg:pt-[2vw]">
          {services.items.map((item, index) => (
            <StaggerItem key={item.title} className="group relative flex items-start gap-[clamp(1.2rem,3.6vw,3.4rem)] py-[clamp(1rem,1.8vw,1.8rem)] first:pt-0">
              <span className="grid size-[clamp(3.4rem,5.2vw,4.8rem)] shrink-0 place-items-center bg-[#f1e7e2] text-[#8a5230] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-[#8a5230] group-hover:text-white">
                <Icon
                  name={item.icon}
                  strokeWidth={1.2}
                  className="size-[54%] transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <div className="transition-transform duration-500 group-hover:translate-x-2">
                <h3 className={`text-[#211b18] ${TYPE.itemTitle}`}>{item.title}</h3>
                <p className={`mt-[0.5em] max-w-[26vw] min-w-[min(100%,14rem)] text-[#2a2523] ${TYPE.small}`}>{item.text}</p>
              </div>
              {index < services.items.length - 1 && <DrawLine className="absolute inset-x-0 bottom-0 h-px bg-[#d9cfc9]" />}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
