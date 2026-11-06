"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

/** Honours the visitor's reduced-motion setting and prevents browser scroll jumping on load. */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
