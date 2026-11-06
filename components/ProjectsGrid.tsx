import Link from "next/link";
import { PROJECTS, TYPE } from "@/data/data";
import { ArrowUpRightIcon } from "@/lib/icons";
import { Frame, Reveal } from "./Motion";
import { Photo } from "./Photo";

// Tile proportions cut straight from the design (px of the 1349-wide mockup).
const ASPECTS = [
  "aspect-[405/516]",
  "aspect-[405/520]",
  "aspect-[405/519]",
  "aspect-[406/483]",
  "aspect-[403/583] lg:-mt-[3vw]",
  "aspect-[405/484]",
];

export function ProjectsGrid() {
  return (
    <div className="grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-[clamp(2.5rem,5.2vw,5rem)] sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
      {PROJECTS.map((project, index) => (
        <Reveal key={project.slug} delay={(index % 3) * 0.12}>
          <Link href={`/projects/${project.slug}`} className="block">
            <Frame className={ASPECTS[index] ?? "aspect-[4/5]"}>
              <Photo
                src={project.image}
                alt={`${project.title}, ${project.category} interior by ARQIVO`}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#2b201f]/80 via-[#2b201f]/10 to-transparent p-[clamp(1rem,2vw,2rem)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className={`text-white/80 ${TYPE.eyebrowSm}`}>{project.category}</p>
                <div className="mt-1 flex items-end justify-between gap-4">
                  <h3 className={`text-white ${TYPE.itemTitle}`}>{project.title}</h3>
                  <span className="grid size-[clamp(2.2rem,3vw,2.8rem)] shrink-0 translate-y-3 place-items-center bg-white text-[#211b18] transition-all duration-500 group-hover:translate-y-0 group-hover:bg-[#8a5230] group-hover:text-white">
                    <ArrowUpRightIcon size={18} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </Frame>
            <p className={`mt-[clamp(0.5rem,0.9vw,0.9rem)] text-right text-[#211b18] ${TYPE.number}`}>{project.no}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
