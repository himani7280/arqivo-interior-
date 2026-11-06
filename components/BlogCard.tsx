import Link from "next/link";
import { TYPE, type Post } from "@/data/data";
import { ArrowRightIcon, CalendarIcon } from "@/lib/icons";
import { StaggerItem } from "./Motion";
import { Photo } from "./Photo";

export function BlogCard({ post }: { post: Post }) {
  return (
    <StaggerItem className="h-full">
      <Link
        href={`/blogs/${post.slug}`}
        className="group flex h-full flex-col border border-[#e7dbd3] bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(53,40,42,0.35)]"
      >
        <div className="relative aspect-[394/245] w-full overflow-hidden">
          <Photo src={post.image} alt={post.title} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="flex flex-1 flex-col px-[clamp(1.1rem,2.15vw,2.1rem)] pb-[clamp(1rem,1.7vw,1.6rem)] pt-[clamp(0.9rem,1.5vw,1.4rem)]">
          <p className="text-[clamp(0.62rem,0.88vw,0.8rem)] font-medium uppercase tracking-[0.2em] text-[#211b18]">{post.category}</p>
          <h3 className={`mt-[0.45em] text-[#211b18] ${TYPE.cardTitle}`}>{post.title}</h3>
          <div className={`mt-auto flex items-center justify-between pt-[clamp(0.9rem,1.5vw,1.4rem)] text-[#3d3430] ${TYPE.xs}`}>
            <span className="inline-flex items-center gap-[0.6em]">
              <CalendarIcon strokeWidth={1.4} className="size-[1.15em]" />
              {post.date}
            </span>
            <span className="grid size-7 place-items-center bg-[#f1e7e2] text-[#211b18] transition-all duration-300 group-hover:bg-[#8a5230] group-hover:text-white">
              <ArrowRightIcon strokeWidth={1.4} className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </StaggerItem>
  );
}
