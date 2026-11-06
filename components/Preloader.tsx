"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { IMG, MOTION } from "@/data/data";

// First-visit intro state shared with Header / hero components (must live in a client module).
let introDone = false;
const introListeners = new Set<() => void>();

export const markIntroDone = () => {
  if (introDone) return;
  introDone = true;
  introListeners.forEach((listener) => listener());
};

const subscribeToIntro = (listener: () => void) => {
  introListeners.add(listener);
  return () => {
    introListeners.delete(listener);
  };
};

/** False until the first-visit preloader has opened (or was skipped). */
export const useIntroDone = () =>
  useSyncExternalStore(
    subscribeToIntro,
    () => introDone,
    () => false,
  );

const { duration, storageKey } = MOTION.preloader;

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(storageKey) === "1";
    } catch {
      seen = false;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      markIntroDone();
      const skip = setTimeout(() => setShow(false), 0);
      return () => clearTimeout(skip);
    }

    document.body.style.overflow = "hidden";
    const finish = setTimeout(() => {
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {}
      document.body.style.overflow = "";
      markIntroDone();
      setShow(false);
    }, duration * 1000);

    return () => {
      clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-[#2b201f]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: MOTION.ease }}
          >
            <Image src={IMG.logoLight} alt="" width={900} height={241} priority className="w-56 sm:w-72" />
          </motion.div>
          <div className="h-px w-48 overflow-hidden bg-white/15">
            <motion.div
              className="h-full origin-left bg-[#9b7b69]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: duration - 0.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
