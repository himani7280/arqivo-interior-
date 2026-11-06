import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesBlock } from "@/components/ServicesBlock";
import { servicesContent as services } from "@/data/data";

export const metadata: Metadata = {
  title: services.metadata.title,
  description: services.metadata.description,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title={services.hero.title} />
      <ServicesBlock />
    </>
  );
}
