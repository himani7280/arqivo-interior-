import type { Metadata } from "next";
import { LinkButton } from "@/components/Button";
import { Reveal, WordReveal } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { BRAND, LAYOUT, TYPE } from "@/data/data";
import { CheckCircleIcon, MailIcon, PhoneIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Thank You | ARQIVO",
  description: "Thank you for reaching out to ARQIVO Interior Design Studio. We will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero title="THANK YOU" />

      <section className={`overflow-hidden bg-[#fffdfc] ${LAYOUT.section}`}>
        <div className={`${LAYOUT.container} max-w-4xl text-center`}>
          <Reveal>
            <div className="mx-auto grid size-20 place-items-center bg-[#f1e7e2] text-[#8a5230]">
              <CheckCircleIcon strokeWidth={1.2} className="size-11" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={`mt-8 inline-flex items-center gap-3 text-[#8a5230] ${TYPE.eyebrowMd}`}>
              <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
              Submission Successful
              <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
            </p>
          </Reveal>

          <h1 className={`mt-4 text-[#211b18] ${TYPE.h2}`}>
            <WordReveal text="Thank You for" accent="Reaching Out" />
          </h1>

          <Reveal delay={0.2}>
            <p className={`mx-auto mt-5 max-w-2xl text-[#3d3430] ${TYPE.p}`}>
              We have received your message. Our design team will review your requirements and get back to you within 24 hours to discuss your space.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/" tone="taupe">
              Back to Home
            </LinkButton>
            <LinkButton href="/projects" tone="brown">
              Explore Our Work
            </LinkButton>
          </Reveal>

          <Reveal delay={0.4} className="mt-14 border-t border-[#e7dbd3] pt-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#736862]">Need immediate assistance?</p>
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
    </>
  );
}

