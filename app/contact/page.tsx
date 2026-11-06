import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForms";
import { Frame, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { BRAND, contactContent as contact, enquireContent as enquire, IMG, LAYOUT, TYPE } from "@/data/data";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: contact.metadata.title,
  description: contact.metadata.description,
};

const CARD_ICONS = { phone: PhoneIcon, email: MailIcon, address: MapPinIcon };

const CARD_VALUES = {
  phone: { value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
  email: { value: BRAND.enquiryEmail, href: `mailto:${BRAND.enquiryEmail}` },
  address: { value: BRAND.address, href: undefined },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title={contact.hero.title} />
      <section className={`overflow-hidden bg-[#fffdfc] ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <SectionHeading center tone="bold" {...contact.section} />

          <Stagger className="mt-[clamp(1.6rem,3.5vw,3.5rem)] grid gap-[clamp(1.4rem,3vw,2.6rem)] md:grid-cols-3 md:gap-0">
            {contact.cards.map((card) => {
              const key = card.key as keyof typeof CARD_ICONS;
              const Ico = CARD_ICONS[key];
              const { value, href } = CARD_VALUES[key];
              const body = (
                <>
                  <span className="grid size-[clamp(3.6rem,6.2vw,6rem)] shrink-0 place-items-center bg-[#f1e7e2] text-[#211b18] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-[#8a5230] group-hover:text-white">
                    <Ico strokeWidth={1.2} className="size-[50%]" />
                  </span>
                  <span className="text-[clamp(1rem,1.5vw,1.4rem)] leading-[1.35]">
                    <span className="block font-(family-name:--font-ui) font-semibold text-[#211b18]">{card.title}</span>
                    <span className="block break-words text-[#211b18]">{value}</span>
                  </span>
                </>
              );
              return (
                <StaggerItem key={card.key} className="md:border-l md:border-[#d9cfc9] md:px-[3vw] md:first:border-0 md:first:pl-0">
                  {href ? (
                    <a href={href} className="group flex items-center gap-[clamp(0.9rem,1.6vw,1.6rem)]">
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-[clamp(0.9rem,1.6vw,1.6rem)]">{body}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="mx-auto mt-[clamp(2rem,4vw,4rem)] max-w-6xl">
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

          <Reveal className="mx-auto mt-[clamp(2.5rem,5vw,4.5rem)] max-w-6xl">
            <div className="relative overflow-hidden border border-[#e7dbd3] bg-[#fbf7f5] shadow-sm">
              <iframe
                title="Studio Location Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(BRAND.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="h-[clamp(170px,20vw,240px)] w-full border-0 [filter:grayscale(100%)_sepia(50%)_hue-rotate(345deg)_saturate(180%)_contrast(92%)] transition-all duration-700 hover:[filter:grayscale(30%)_sepia(30%)_hue-rotate(345deg)_saturate(130%)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 bg-[#8a5230]/5 mix-blend-multiply" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
