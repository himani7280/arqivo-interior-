"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Transition,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { MOTION } from "@/data/data";

const { ease: EASE, duration: DURATION } = MOTION;

type RevealProps = {
  children: ReactNode;
  dir?: keyof typeof MOTION.reveal;
  delay?: number;
  className?: string;
};

export function Reveal({ children, dir = "up", delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={MOTION.reveal[dir]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: DURATION, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={MOTION.stagger.container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={MOTION.stagger.item}
      transition={{ duration: DURATION, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type WordRevealProps = {
  text: string;
  accent?: string;
  className?: string;
  accentClassName?: string;
  by?: "word" | "char";
  delay?: number;
  /** When set, the reveal is driven by this flag instead of scroll (used for hero text after the preloader). */
  trigger?: boolean;
};

const baseWord = MOTION.word.container.show as { transition: Transition };

/** Words (or characters) rise one by one from a mask. `accent` words render italic in the brand colour. */
export function WordReveal({
  text,
  accent,
  className,
  accentClassName = "italic text-[#8a5230]",
  by = "word",
  delay = 0,
  trigger,
}: WordRevealProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { ...baseWord.transition, delayChildren: delay } },
  };
  const words = [
    ...text.split(" ").filter(Boolean).map((word) => ({ word, accent: false })),
    ...(accent ? accent.split(" ").map((word) => ({ word, accent: true })) : []),
  ];
  const drive =
    trigger === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-40px" } }
      : { initial: "hidden", animate: trigger ? "show" : "hidden" };

  return (
    <motion.span className={className} variants={container} {...drive}>
      {words.map(({ word, accent: isAccent }, index) => {
        const units = by === "char" ? Array.from(word) : [word];
        return (
          <span key={`${word}-${index}`} className="mr-[0.26em] inline-block whitespace-nowrap last:mr-0">
            {units.map((unit, unitIndex) => (
              <span key={unitIndex} className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-bottom">
                <motion.span
                  className={`inline-block ${by === "char" ? "" : "pr-[0.06em]"} ${isAccent ? accentClassName : ""}`}
                  variants={MOTION.word.item}
                  transition={{ duration: 1, ease: EASE }}
                >
                  {unit}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}

type FrameProps = {
  children: ReactNode;
  className?: string;
  /** Percentage the image drifts against the scroll; 0 disables parallax. */
  parallax?: number;
  delay?: number;
};

/** Image frame: wipes open on scroll, optional parallax drift. Add nothing else; `group` is built in for hover zoom. */
export function Frame({ children, className = "", parallax = 0, delay = 0 }: FrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    // The observed wrapper is never clipped (a fully clipped element can report "not intersecting");
    // the clip-path wipe lives on the child and follows the wrapper's variant state.
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        variants={MOTION.clip}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={parallax ? { y, scale: 1 + (parallax * 2.4) / 100 } : undefined}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Grows a hairline from the left when it scrolls into view. */
export function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/** Pulls its child towards the pointer (fine pointers only). */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.6 });

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (box.left + box.width / 2)) * 0.22);
        y.set((event.clientY - (box.top + box.height / 2)) * 0.32);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Gentle endless bobbing for floating accents. */
export function Float({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${ratio})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#9b7b69] via-[#8a5230] to-[#35282a]"
    />
  );
}
