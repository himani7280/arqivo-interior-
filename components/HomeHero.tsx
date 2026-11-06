"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { homeContent, IMG, MOTION, TYPE } from "@/data/data";
import { WordReveal } from "./Motion";
import { useIntroDone } from "./Preloader";

const { hero } = homeContent;

/** The photo keeps the 1349:670 proportion of the design on tablets and up, so headline and swatch card sit exactly as designed. */
export function HomeHero() {
  const done = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate h-[30rem] overflow-hidden bg-[#d9cfc9] sm:h-[34rem] md:aspect-[1349/670] md:h-auto">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image src={IMG[hero.image]} alt={hero.imageAlt} fill priority quality={90} sizes="100vw" className="object-cover object-[50%_60%]" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="absolute inset-x-0 top-[7%] px-4 text-center md:top-[9%]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={done ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: MOTION.ease }}
          className={`inline-flex items-center gap-[clamp(0.6rem,1.6vw,1.6rem)] text-[#2a2523]/90 ${TYPE.eyebrowMd}`}
        >
          <span className="h-px w-[clamp(1.5rem,4.2vw,4rem)] bg-[#2a2523]/50" aria-hidden="true" />
          {hero.eyebrow}
          <span className="h-px w-[clamp(1.5rem,4.2vw,4rem)] bg-[#2a2523]/50" aria-hidden="true" />
        </motion.p>
        <h1 className="mt-[clamp(0.6rem,1.8vw,1.8rem)] text-[clamp(1.7rem,3.8vw,4rem)] leading-[1.1] text-[#262120]">
          <WordReveal text={hero.title} trigger={done} className="block font-medium uppercase tracking-[0.03em]" />
          <WordReveal text={hero.accent} trigger={done} delay={0.35} className="block italic text-[#6d4c3d]" />
        </h1>
      </motion.div>
    </section>
  );
}
