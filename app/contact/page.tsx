import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForms";
import { Icon } from "@/components/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { BRAND, contactContent as contact, LAYOUT, TYPE } from "@/data/data";
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

          <Reveal className="mx-auto mt-[clamp(1.6rem,3vw,3rem)] max-w-5xl">
            <div className="rounded-none border border-[#e7dbd3] bg-white/70 p-[clamp(1.6rem,3.4vw,3.2rem)] shadow-sm">
              <h3 className={`mb-[clamp(1.2rem,2vw,1.8rem)] flex items-center justify-center gap-[clamp(0.6rem,1.5vw,1.5rem)] text-center text-[#211b18] ${TYPE.formTitle}`}>
                <span className="hidden h-px w-[clamp(1.5rem,3.5vw,3.2rem)] bg-[#9b7b69] sm:block" aria-hidden="true" />
                {contact.formTitle}
                <span className="hidden h-px w-[clamp(1.5rem,3.5vw,3.2rem)] bg-[#9b7b69] sm:block" aria-hidden="true" />
              </h3>
              <EnquiryForm variant="contact" />
            </div>
          </Reveal>

          <Stagger className="mt-[clamp(1.6rem,3.5vw,3.5rem)] grid gap-[clamp(1.6rem,4vw,3.6rem)] text-center md:grid-cols-3 md:gap-0">
            {contact.areas.map((area) => (
              <StaggerItem key={area.title} className="group md:border-l md:border-[#d9cfc9] md:first:border-0">
                <span className="mx-auto grid size-[clamp(4.2rem,7.5vw,6.5rem)] place-items-center bg-[#f1e7e2] text-[#9b7b69] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:bg-[#8a5230] group-hover:text-white">
                  <Icon
                    name={area.icon}
                    strokeWidth={1.2}
                    className="size-[50%] transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <h3 className="mt-[0.9em] font-(family-name:--font-ui) text-[clamp(1.15rem,2.1vw,2rem)] font-semibold text-[#211b18]">{area.title}</h3>
                <p className="text-[clamp(0.95rem,1.7vw,1.6rem)] text-[#211b18]">{area.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
