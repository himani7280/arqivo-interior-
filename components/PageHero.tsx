"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IMG, LAYOUT, NAV_LINKS, TYPE } from "@/data/data";
import { ChevronRightIcon } from "@/lib/icons";
import { WordReveal } from "./Motion";

type BreadcrumbItem = { label: string; href?: string };

/** Inner-page banner with cinematic zoom-in effect and contextual breadcrumbs. */
export function PageHero({
  title,
  image,
  breadcrumbs,
  showBreadcrumb,
}: {
  title: string;
  image?: string;
  breadcrumbs?: BreadcrumbItem[];
  showBreadcrumb?: boolean;
}) {
  const pathname = usePathname();
  const isLong = title.length > 25;

  // Detail pages already have breadcrumbs in the content section below, so banner breadcrumbs are hidden for them
  const isDetailPage = pathname ? /^\/(projects|blogs)\/[^/]+$/.test(pathname) : false;
  const shouldShowBreadcrumb = showBreadcrumb !== undefined ? showBreadcrumb : !isDetailPage;

  const crumbs: BreadcrumbItem[] = breadcrumbs ?? (() => {
    const homeLabel = NAV_LINKS.find((l) => l.href === "/")?.label || "Home";
    const list: BreadcrumbItem[] = [{ label: homeLabel, href: "/" }];
    if (!pathname || pathname === "/") return list;

    const segments = pathname.split("/").filter(Boolean);
    const rootPath = `/${segments[0]}`;
    const rootLabel = NAV_LINKS.find((l) => l.href === rootPath)?.label || segments[0].charAt(0).toUpperCase() + segments[0].slice(1);

    if (segments.length > 1) {
      list.push({ label: rootLabel, href: rootPath });
      list.push({ label: title });
    } else {
      list.push({ label: title || rootLabel });
    }
    return list;
  })();

  return (
    <section className="relative flex h-[19rem] items-end overflow-hidden bg-[#2b201f] sm:h-[23rem] md:aspect-[1349/437] md:h-auto">
      <div className="absolute inset-0">
        <Image
          src={IMG.pageHero}
          alt="ARQIVO Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/30" />

      <div className={`${LAYOUT.container} relative pb-[clamp(1.5rem,4.6vw,4.6rem)]`}>
        {shouldShowBreadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-2.5 flex flex-wrap items-center gap-[0.45em] font-(family-name:--font-ui) text-[clamp(0.82rem,1.15vw,1rem)] text-white/80">
            {crumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-[0.45em]">
                {idx > 0 && <ChevronRightIcon strokeWidth={1.5} className="size-[0.8em] text-white/50" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#c9a896] font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className={`max-w-4xl text-balance text-white ${isLong ? "text-[clamp(1.6rem,4.5vw,4.2rem)] font-normal leading-[1.12]" : TYPE.heroTitle}`}>
          <WordReveal text={title} by={isLong ? "word" : "char"} trigger={true} />
        </h1>
      </div>
    </section>
  );
}
