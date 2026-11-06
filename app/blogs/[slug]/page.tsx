import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DrawLine, Frame, Reveal, Stagger, StaggerItem, WordReveal } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { blogContent as blog, getPost, LAYOUT, POSTS, TYPE } from "@/data/data";
import { CalendarIcon, ChevronRightIcon, QuoteIcon, TagIcon, UserIcon } from "@/lib/icons";

type Props = { params: Promise<{ slug: string }> };

const { detail, categories } = blog;

export const generateStaticParams = () => POSTS.map((post) => ({ slug: post.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

const SIDE_TITLE = `flex items-center gap-[clamp(0.8rem,1.6vw,1.6rem)] text-[#211b18] ${TYPE.sideTitle}`;
const SIDE_BOX = "bg-[#f6ece7] p-[clamp(1.1rem,1.8vw,1.8rem)]";
const META = `flex items-center gap-[0.6em] font-(family-name:--font-ui) text-[clamp(0.85rem,1.3vw,1.2rem)]`;

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const recent = POSTS.filter((item) => item.slug !== slug).slice(0, 3);
  const words = post.title.split(" ");
  const accent = words.pop() ?? "";

  return (
    <>
      <PageHero title={post.title} showBreadcrumb={false} />

      <article className={`overflow-hidden bg-[#fffdfc] ${LAYOUT.section}`}>
        <div className={`${LAYOUT.container}`}>
          <div className="mx-auto max-w-[86.6%]">
          <Reveal>
            <p className={`inline-flex items-center gap-[clamp(0.7rem,1.5vw,1.4rem)] text-[#211b18] ${TYPE.eyebrowMd} !font-semibold`}>
              <span className="h-px w-[clamp(1.8rem,4.6vw,4.4rem)] bg-current opacity-60" aria-hidden="true" />
              {detail.eyebrow}
            </p>
          </Reveal>
          <h2 className={`mt-[clamp(0.6rem,1.2vw,1.2rem)] max-w-[62vw] min-w-[min(100%,18rem)] text-[#211b18] ${TYPE.h2Post}`}>
            <WordReveal text={words.join(" ")} accent={accent} />
          </h2>
          <Reveal>
            <nav aria-label="Breadcrumb" className={`mt-[clamp(0.8rem,1.6vw,1.6rem)] flex flex-wrap items-center gap-[0.6em] font-(family-name:--font-ui) text-[clamp(0.9rem,1.5vw,1.4rem)] text-[#211b18]`}>
              <Link href="/" className="transition-colors hover:text-[#8a5230]">{detail.breadcrumbRoot}</Link>
              <ChevronRightIcon strokeWidth={1.5} className="size-[1em]" />
              <Link href="/blogs" className="transition-colors hover:text-[#8a5230]">{detail.breadcrumbBlogs}</Link>
              <ChevronRightIcon strokeWidth={1.5} className="size-[1em]" />
              <span className="text-[#8a5230]">{post.title}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-[clamp(0.9rem,1.8vw,1.8rem)] flex flex-wrap items-center gap-x-[2vw] gap-y-3 text-[#211b18]">
              <li className={META}>
                <CalendarIcon strokeWidth={1.4} className="size-[1.3em] text-[#8a5230]" />
                {post.date}
              </li>
              <li className={`${META} border-l border-[#d9cfc9] pl-[2vw]`}>
                <UserIcon strokeWidth={1.4} className="size-[1.2em] text-[#8a5230]" />
                {detail.author}
              </li>
              <li className={`${META} border-l border-[#d9cfc9] pl-[2vw]`}>
                <TagIcon strokeWidth={1.4} className="size-[1.2em] text-[#8a5230]" />
                {post.category}
              </li>
            </ul>
          </Reveal>

          <Reveal className="mt-[clamp(1rem,1.8vw,1.8rem)]">
            <div className="relative aspect-[394/245] w-full overflow-hidden rounded-sm bg-[#211b18]/5">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          <div className="mt-[clamp(1.2rem,2.2vw,2.2rem)] grid gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[1fr_27%]">
            <div>
              <Reveal>
                <p className={`max-w-[56vw] min-w-[min(100%,18rem)] text-[#211b18] ${TYPE.small}`}>{post.intro}</p>
              </Reveal>

              <Reveal>
                <h3 className={`mt-[clamp(1.2rem,2vw,2rem)] flex items-center gap-[clamp(0.9rem,2vw,2rem)] text-[#211b18] ${TYPE.h3Sm}`}>
                  {post.keyTitle}
                  <DrawLine className="hidden h-px w-[clamp(2.4rem,4.4vw,4.2rem)] bg-[#8a5230] sm:block" />
                </h3>
              </Reveal>

              <Stagger className="mt-[clamp(1.2rem,2.2vw,2.2rem)] space-y-[clamp(1.1rem,2vw,2rem)]">
                {post.points.map((point, index) => (
                  <StaggerItem key={point.title} className="group flex items-center gap-[clamp(0.9rem,1.6vw,1.6rem)]">
                    <span className="grid size-[clamp(3.2rem,5.6vw,5.2rem)] shrink-0 place-items-center bg-[#f6ece7] font-(family-name:--font-heading) text-[clamp(1.3rem,2.3vw,2.2rem)] font-semibold text-[#8a5230] transition-colors duration-500 group-hover:bg-[#8a5230] group-hover:text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-[clamp(2.8rem,4.6vw,4.4rem)] w-px shrink-0 bg-[#d9cfc9]" aria-hidden="true" />
                    <div>
                      <h4 className={`text-[#211b18] ${TYPE.listTitle}`}>{point.title}</h4>
                      <p className={`mt-[0.2em] max-w-[34vw] min-w-[min(100%,14rem)] text-[#2a2523] ${TYPE.small}`}>{point.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal>
                <blockquote className="mt-[clamp(1.2rem,2vw,2rem)] flex items-center gap-[clamp(1rem,2vw,2rem)] bg-[#f6ece7] px-[clamp(1.1rem,2.2vw,2.2rem)] py-[clamp(1rem,1.8vw,1.8rem)]">
                  <QuoteIcon strokeWidth={0} fill="currentColor" className="size-[clamp(2rem,3.3vw,3.2rem)] shrink-0 rotate-180 text-[#8a5230]" />
                  <span className="h-[clamp(2.6rem,4vw,3.8rem)] w-px shrink-0 bg-[#9b7b69]/60" aria-hidden="true" />
                  <p className={`text-[#211b18] ${TYPE.quote}`}>&ldquo;{post.quote}&rdquo;</p>
                </blockquote>
              </Reveal>

              <Reveal>
                <h3 className={`mt-[clamp(1.3rem,2.2vw,2.2rem)] flex items-center gap-[clamp(0.9rem,2vw,2rem)] text-[#211b18] ${TYPE.h3Sm}`}>
                  {detail.conclusionTitle}
                  <DrawLine className="h-px w-[clamp(2.4rem,4.4vw,4.2rem)] bg-[#8a5230]" />
                </h3>
                <p className={`mt-[0.6em] max-w-[56vw] min-w-[min(100%,18rem)] text-[#211b18] ${TYPE.small}`}>{post.conclusion}</p>
              </Reveal>
            </div>

            <aside className="space-y-[clamp(1.2rem,2vw,2rem)] self-start lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
              <Reveal dir="left">
                <section className={SIDE_BOX}>
                  <h3 className={SIDE_TITLE}>
                    {detail.categoriesTitle}
                    <span className="h-px w-[clamp(1.8rem,3vw,2.8rem)] bg-[#8a5230]" aria-hidden="true" />
                  </h3>
                  <ul className="mt-[clamp(0.6rem,1vw,1rem)]">
                    {categories.map((category) => (
                      <li key={category.label} className="border-b border-[#e3d5cc] last:border-0">
                        <Link href="/blogs" className={`group flex items-center justify-between py-[clamp(0.6rem,1vw,1rem)] text-[#211b18] ${TYPE.xs} !text-[clamp(0.82rem,1.1vw,1rem)]`}>
                          <span className="flex items-center gap-[0.6em] transition-transform duration-300 group-hover:translate-x-1.5">
                            <ChevronRightIcon strokeWidth={2} className="size-[0.9em] text-[#8a5230]" />
                            {category.label}
                          </span>
                          <span>({category.count})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              <Reveal dir="left" delay={0.1}>
                <section className={SIDE_BOX}>
                  <h3 className={SIDE_TITLE}>
                    {detail.recentTitle}
                    <span className="h-px w-[clamp(1.8rem,3vw,2.8rem)] bg-[#8a5230]" aria-hidden="true" />
                  </h3>
                  <ul className="mt-[clamp(0.8rem,1.4vw,1.4rem)] space-y-[clamp(0.8rem,1.4vw,1.4rem)]">
                    {recent.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/blogs/${item.slug}`} className="group flex gap-[clamp(0.7rem,1.1vw,1.1rem)]">
                          <span className="relative block aspect-[1.25] w-[clamp(4.5rem,6.2vw,6rem)] shrink-0 overflow-hidden">
                            <Image src={item.image} alt="" fill sizes="100px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          </span>
                          <span>
                            <span className="block text-[clamp(0.82rem,1.1vw,1rem)] font-medium leading-snug text-[#211b18] transition-colors group-hover:text-[#8a5230]">
                              {item.title}
                            </span>
                            <span className={`mt-1 flex items-center gap-[0.5em] text-[#3d3430] ${TYPE.xs}`}>
                              <CalendarIcon strokeWidth={1.4} className="size-[1.15em] text-[#8a5230]" />
                              {item.date}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            </aside>
          </div>
          </div>
        </div>
      </article>
    </>
  );
}
