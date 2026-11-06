import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { Reveal, WordReveal } from "@/components/Motion";
import { BRAND, LAYOUT, miscContent, TYPE } from "@/data/data";
import { CheckCircleIcon, MailIcon, PhoneIcon } from "@/lib/icons";

const { thankYou } = miscContent;

export const metadata: Metadata = {
  title: thankYou.metadata.title,
  description: thankYou.metadata.description,
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[72vh] flex-col justify-center overflow-hidden bg-[#fffdfc] pb-[clamp(3rem,6vw,6rem)] pt-[calc(var(--header-h)+clamp(2.5rem,5vw,5rem))]">
      <div className={`${LAYOUT.container} max-w-4xl text-center`}>
        <Reveal>
          <div className="mx-auto grid size-20 place-items-center bg-[#f1e7e2] text-[#8a5230]">
            <CheckCircleIcon strokeWidth={1.2} className="size-11" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={`mt-8 inline-flex items-center gap-3 text-[#8a5230] ${TYPE.eyebrowMd}`}>
            <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
            {thankYou.eyebrow}
            <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
          </p>
        </Reveal>

        <h1 className={`mt-4 text-[#211b18] ${TYPE.h2}`}>
          <WordReveal text={thankYou.title} accent={thankYou.accent} />
        </h1>

        <Reveal delay={0.2}>
          <p className={`mx-auto mt-5 max-w-2xl text-[#3d3430] ${TYPE.p}`}>
            {thankYou.text}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <LinkButton href={thankYou.button.href} tone="taupe">
            {thankYou.button.label}
          </LinkButton>
        </Reveal>

        <Reveal delay={0.4} className="mt-14 border-t border-[#e7dbd3] pt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#736862]">{thankYou.immediateAssistance}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-sm text-[#211b18]">
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-[#8a5230]">
              <PhoneIcon strokeWidth={1.3} className="size-4 text-[#8a5230]" />
              {BRAND.phone}
            </a>
            <span className="text-[#d9cfc9]">|</span>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-[#8a5230]">
              <MailIcon strokeWidth={1.3} className="size-4 text-[#8a5230]" />
              {BRAND.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
