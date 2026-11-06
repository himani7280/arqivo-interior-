import { testimonialsContent, type Testimonial } from "@/data/data";
import { QuoteIcon, StarIcon } from "@/lib/icons";
import { StaggerItem } from "./Motion";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export function TestimonialCard({ name, role, quote }: Testimonial) {
  return (
    <StaggerItem className="h-full">
      <figure className="group flex h-full flex-col border border-[#e7dbd3] bg-[#fbf7f5] p-[clamp(1.2rem,2.45vw,2.3rem)] transition-[transform,box-shadow,background-color] duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_30px_60px_-30px_rgba(53,40,42,0.35)]">
        <div className="flex items-start justify-between">
          <span className="grid size-10 place-items-center bg-[#f1e7e2] text-[#8a5230] transition-colors duration-300 group-hover:bg-[#8a5230] group-hover:text-white">
            <QuoteIcon strokeWidth={0} fill="currentColor" className="size-[55%] rotate-180" />
          </span>
          <div className="flex gap-[0.2vw] text-[#8a5230]" role="img" aria-label={testimonialsContent.ratingLabel}>
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} strokeWidth={0} fill="currentColor" className="size-[clamp(0.85rem,1.45vw,1.3rem)]" />
            ))}
          </div>
        </div>
        <blockquote className="mt-[clamp(0.8rem,1.3vw,1.3rem)] text-[clamp(0.9rem,1.1vw,1.02rem)] leading-[1.55] text-[#211b18]">{quote}</blockquote>
        <figcaption className="mt-auto flex items-center gap-[clamp(0.8rem,1.4vw,1.4rem)] border-t border-[#e7dbd3] pt-[clamp(1rem,1.7vw,1.6rem)]">
          <span
            aria-hidden="true"
            className="grid size-[clamp(3rem,4.75vw,4.5rem)] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#9b7b69] to-[#8a5230] text-[clamp(1.1rem,1.6vw,1.5rem)] text-white ring-4 ring-white"
          >
            {initials(name)}
          </span>
          <span className="h-[clamp(2rem,3vw,2.8rem)] w-px bg-[#d9cfc9]" aria-hidden="true" />
          <span>
            <span className="block font-(family-name:--font-ui) text-[clamp(0.85rem,1.1vw,1rem)] font-semibold text-[#211b18]">{name}</span>
            <span className="block text-[clamp(0.8rem,1.05vw,0.95rem)] text-[#3d3430]">{role}</span>
          </span>
        </figcaption>
      </figure>
    </StaggerItem>
  );
}
