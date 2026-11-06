"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMG, LAYOUT, TYPE } from "@/data/data";
import { useIntroDone } from "./Preloader";
import { WordReveal } from "./Motion";

/** Inner-page banner: same 1349:437 proportion as the design, title on the bottom-left. */
export function PageHero({
  title,
  image,
}: {
  title: string;
  image?: string;
}) {
  const done = useIntroDone();
  const isLong = title.length > 25;
  return (
    <section className="relative flex h-[19rem] items-end overflow-hidden bg-[#2b201f] sm:h-[23rem] md:aspect-[1349/437] md:h-auto">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 2.6, ease: "easeOut" }}
      >
        <Image
          src={image || IMG.pageHero}
          alt={title}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/25" />

      <div className={`${LAYOUT.container} relative pb-[clamp(1rem,4.6vw,4.6rem)]`}>
        <h1 className={`max-w-4xl text-balance text-white ${isLong ? "text-[clamp(1.6rem,4.5vw,4.2rem)] font-normal leading-[1.12]" : TYPE.heroTitle}`}>
          <WordReveal text={title} by={isLong ? "word" : "char"} trigger={done} />
        </h1>
      </div>
    </section>
  );
}
