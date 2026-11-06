"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION } from "@/data/data";

export default function Template({ children }: { children: ReactNode }) {
  return <motion.div {...MOTION.page}>{children}</motion.div>;
}
