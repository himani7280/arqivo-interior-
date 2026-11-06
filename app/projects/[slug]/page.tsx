import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { DrawLine, Frame, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { getProject, LAYOUT, PROJECTS, projectsContent, TYPE } from "@/data/data";
import { ArrowRightIcon, ChevronRightIcon } from "@/lib/icons";

type Props = { params: Promise<{ slug: string }> };

const { detail } = projectsContent;

export const generateStaticParams = () => PROJECTS.map((project) => ({ slug: project.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.overview } : {};
}

const EYEBROW = `font-(family-name:--font-ui) inline-flex items-center gap-[clamp(0.7rem,1.5vw,1.4rem)] text-[#211b18] ${TYPE.eyebrowMd} !font-semibold`;
const EYEBROW_LINE = "h-px w-[clamp(1.8rem,4.6vw,4.4rem)] bg-current opacity-60";

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const words = project.title.split(" ");
  const accent = words.pop() ?? "";

  const rows = [
    [detail.labels.type, project.type],
    [detail.labels.location, project.location],
    [detail.labels.area, project.area],
    [detail.labels.style, project.style],
    [detail.labels.completed, project.completed],
  ];

  return (
    <>
      <PageHero title={project.title} showBreadcrumb={false} />

      <section className={`overflow-hidden bg-[#fffdfc] ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <Reveal>
            <p className={EYEBROW}>
              <span className={EYEBROW_LINE} aria-hidden="true" />
              {detail.eyebrow}
            </p>
          </Reveal>
          <h2 className={`mt-[clamp(0.6rem,1.2vw,1.2rem)] text-[#211b18] ${TYPE.h2Detail}`}>
            <WordReveal text={words.join(" ")} accent={accent} />
          </h2>
          <Reveal>
            <nav aria-label="Breadcrumb" className={`mt-[clamp(0.8rem,1.6vw,1.6rem)] flex flex-wrap items-center gap-[0.6em] font-(family-name:--font-ui) text-[clamp(0.9rem,1.5vw,1.4rem)] text-[#211b18]`}>
              <Link href="/" className="transition-colors hover:text-[#8a5230]">{detail.breadcrumbRoot}</Link>
              <ChevronRightIcon strokeWidth={1.5} className="size-[1em]" />
              <Link href="/projects" className="transition-colors hover:text-[#8a5230]">{detail.breadcrumbProjects}</Link>
              <ChevronRightIcon strokeWidth={1.5} className="size-[1em]" />
              <span className="text-[#8a5230]">{project.title}</span>
            </nav>
          </Reveal>

          <Reveal className="mt-[clamp(1rem,1.8vw,1.8rem)]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#211b18]/5 sm:aspect-[16/10]">
              <Image
                src={project.image}
                alt={`${project.title}, ${project.type}`}
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          <div className="mt-[clamp(1.4rem,2.6vw,2.4rem)] grid gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[1.25fr_0.75fr] lg:gap-[5vw]">
            <div>
              <Reveal>
                <p className={`${EYEBROW} flex-row-reverse justify-end`}>
                  <span className={EYEBROW_LINE} aria-hidden="true" />
                  {project.type}
                </p>
              </Reveal>
              <h3 className={`mt-[clamp(0.6rem,1.2vw,1.2rem)] text-[#211b18] ${TYPE.h3Lg}`}>
                <WordReveal text={detail.overviewTitle} />
              </h3>
              <Reveal delay={0.1}>
                <p className={`mt-[clamp(0.9rem,1.8vw,1.8rem)] max-w-[40vw] min-w-[min(100%,18rem)] text-[#211b18] ${TYPE.pLg}`}>{project.overview}</p>
              </Reveal>
            </div>

            <Reveal dir="left">
              <aside className="bg-[#f4e9e4] p-[clamp(1.2rem,2.7vw,2.6rem)]">
                <h3 className={`text-[#8a5230] ${TYPE.h3Sm}`}>{detail.detailsTitle}</h3>
                <dl className="mt-[clamp(0.6rem,1.2vw,1.2rem)]">
                  {rows.map(([label, value]) => (
                    <div key={label} className={`grid grid-cols-[minmax(6.5rem,0.9fr)_1.2fr] gap-4 border-b border-[#e3d5cc] py-[clamp(0.5rem,0.9vw,0.9rem)] last:border-0 ${TYPE.small}`}>
                      <dt className="font-semibold text-[#211b18]">{label}</dt>
                      <dd className="text-[#211b18]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </Reveal>
          </div>

          <div className="mt-[clamp(1.5rem,2.8vw,2.6rem)]">
            <Reveal>
              <h3 className={`flex items-center gap-[clamp(0.9rem,2vw,2rem)] text-[#211b18] ${TYPE.h3Md}`}>
                {detail.highlightsTitle}
                <DrawLine className="h-px w-[clamp(2.4rem,5.5vw,5.2rem)] bg-[#8a5230]" />
              </h3>
            </Reveal>
            <Stagger className="mt-[clamp(1.2rem,2.4vw,2.4rem)] grid gap-[clamp(1rem,2vw,2rem)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {project.highlights.map((highlight) => (
                <StaggerItem key={highlight.label} className="group flex items-center gap-[clamp(0.8rem,1.6vw,1.6rem)] lg:border-r lg:border-[#e7dbd3] lg:px-[1.8vw] lg:first:pl-0 lg:last:border-0">
                  <span className="grid size-[clamp(3.4rem,5.7vw,5.4rem)] shrink-0 place-items-center bg-[#f6ece7] text-[#8a5230] transition-all duration-500 group-hover:bg-[#8a5230] group-hover:text-white">
                    <Icon name={highlight.icon} className="size-[48%]" strokeWidth={1.2} />
                  </span>
                  <span className={`text-[#211b18] ${TYPE.small} leading-snug`}>{highlight.label}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="mt-[clamp(1.8rem,3.2vw,3rem)]">
            <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6 border-t border-[#e7dbd3] pt-[clamp(1rem,1.8vw,1.6rem)]">
              <span>
                <span className={`inline-flex items-center gap-[clamp(0.7rem,1.5vw,1.4rem)] text-[#211b18] ${TYPE.eyebrowSm}`}>
                  <span className={EYEBROW_LINE} aria-hidden="true" />
                  {detail.nextLabel}
                </span>
                <span className={`mt-2 block text-[#211b18] transition-colors group-hover:text-[#8a5230] ${TYPE.h3Md}`}>{next.title}</span>
              </span>
              <span className="grid size-[clamp(2.6rem,3.8vw,3.6rem)] shrink-0 place-items-center bg-[#f6ece7] text-[#211b18] transition-all duration-300 group-hover:bg-[#8a5230] group-hover:text-white">
                <ArrowRightIcon strokeWidth={1.2} className="size-[50%] transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
