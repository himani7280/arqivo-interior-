import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { Stagger } from "@/components/Motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { blogContent as blog, homeContent, LAYOUT, POSTS } from "@/data/data";

export const metadata: Metadata = {
  title: blog.metadata.title,
  description: blog.metadata.description,
};

export default function BlogsPage() {
  const { eyebrow, title, accent, text } = homeContent.blogSection;
  return (
    <>
      <PageHero title={blog.hero.title} />
      <section className={`overflow-hidden bg-[#fcf8f7] ${LAYOUT.section}`}>
        <div className={LAYOUT.container}>
          <SectionHeading center eyebrow={eyebrow} title={title} accent={accent} text={text} />
          <Stagger className="mt-[clamp(1.5rem,2.8vw,2.6rem)] grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-[clamp(1.4rem,2.8vw,2.6rem)] md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
