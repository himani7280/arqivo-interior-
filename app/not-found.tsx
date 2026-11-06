import { LinkButton } from "@/components/Button";
import { Reveal, WordReveal } from "@/components/Motion";
import { miscContent, TYPE } from "@/data/data";

const { notFound } = miscContent;

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center bg-[#fbf7f5] px-6 py-[clamp(3rem,8vw,7rem)] text-center">
      <div>
        <Reveal>
          <p className={`inline-flex items-center gap-4 text-[#211b18] ${TYPE.eyebrowMd}`}>
            <span className="h-px w-12 bg-current opacity-60" aria-hidden="true" />
            {notFound.eyebrow}
            <span className="h-px w-12 bg-current opacity-60" aria-hidden="true" />
          </p>
        </Reveal>
        <h1 className="mt-6 text-[clamp(3.2rem,9vw,8rem)] leading-[1.05] text-[#211b18]">
          <WordReveal text={notFound.title} accent={notFound.accent} />
        </h1>
        <Reveal delay={0.2}>
          <p className={`mx-auto mt-6 max-w-md ${TYPE.p}`}>{notFound.text}</p>
          <div className="mt-9">
            <LinkButton href={notFound.button.href}>{notFound.button.label}</LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
