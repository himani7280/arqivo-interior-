import Link from "next/link";
import type { ReactNode } from "react";
import { TYPE } from "@/data/data";
import { ArrowRightIcon } from "@/lib/icons";
import { Magnetic } from "./Motion";

const BASE = `group relative isolate inline-flex items-center gap-[clamp(0.8rem,1.4vw,1.4rem)] overflow-hidden rounded-none text-white transition-transform duration-300 active:scale-[0.96] ${TYPE.button}`;
const SIZE = "h-[clamp(2.9rem,4.2vw,4rem)] px-[clamp(1.4rem,2.9vw,2.8rem)] rounded-none";
const SIZE_LG = "h-[clamp(3.1rem,4.4vw,3.8rem)] px-[clamp(1.6rem,3.2vw,3rem)] rounded-none !text-[clamp(0.95rem,1.3vw,1.15rem)]";

const TONES = {
  taupe: { bg: "bg-[#9b7b69] rounded-none", fill: "bg-[#35282a]" },
  brown: { bg: "bg-[#8a5230] rounded-none", fill: "bg-[#35282a]" },
  dark: { bg: "bg-[#2d2a28] rounded-none", fill: "bg-[#8a5230]" },
} as const;

type Tone = keyof typeof TONES;

const Inner = ({ tone, children }: { tone: Tone; children: ReactNode }) => (
  <>
    <span
      aria-hidden="true"
      className={`absolute inset-0 -z-10 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 ${TONES[tone].fill}`}
    />
    <span>{children}</span>
    <ArrowRightIcon strokeWidth={1.5} className="size-[1.3em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5" />
  </>
);

type LinkButtonProps = { href: string; children: ReactNode; tone?: Tone; className?: string; small?: boolean };

/** `small` is the compact "View All" size from the design (about 194x40px at 1349 wide). */
const SIZE_SM = "h-[clamp(2.5rem,3vw,3rem)] px-[clamp(1.2rem,2.1vw,2.1rem)] rounded-none !text-[clamp(0.8rem,1vw,0.95rem)]";

export function LinkButton({ href, children, tone = "taupe", className = "", small = false }: LinkButtonProps) {
  return (
    <Magnetic className="inline-block">
      <Link href={href} className={`${BASE} ${small ? SIZE_SM : SIZE} ${TONES[tone].bg} ${className}`}>
        <Inner tone={tone}>{children}</Inner>
      </Link>
    </Magnetic>
  );
}

type FormButtonProps = { children: ReactNode; tone?: Tone; disabled?: boolean; className?: string };

export function FormButton({ children, tone = "dark", disabled, className = "" }: FormButtonProps) {
  return (
    <button type="submit" disabled={disabled} className={`${BASE} ${SIZE_LG} ${TONES[tone].bg} disabled:opacity-70 ${className}`}>
      <Inner tone={tone}>{children}</Inner>
    </button>
  );
}
