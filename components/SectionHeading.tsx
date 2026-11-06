import { TYPE } from "@/data/data";
import { Reveal, WordReveal } from "./Motion";

type TypeKey = keyof typeof TYPE;

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  text?: string;
  center?: boolean;
  /** Typography tokens from data.json -> typography. */
  size?: TypeKey;
  eyebrowSize?: TypeKey;
  textSize?: TypeKey;
  /** `bold` is the heavier look used on the Enquire and Contact pages. */
  tone?: "light" | "bold";
  className?: string;
};

const LINE = "block h-px w-[clamp(1.8rem,5vw,4.8rem)] bg-current opacity-60";

const TONES = {
  light: { eyebrow: "text-[#211b18]", title: "text-[#211b18]", accent: "italic text-[#8a5230]", text: "text-[#3d3430]", line: LINE },
  bold: {
    eyebrow: "text-[#211b18]",
    title: "text-[#211b18]",
    accent: "italic text-[#9b7b69]",
    text: "text-[#2a2523]",
    line: "block h-0.5 w-[clamp(1.8rem,4.2vw,4rem)] bg-[#9b7b69]",
  },
} as const;

export function SectionHeading({
  eyebrow,
  title,
  accent,
  text,
  center = false,
  size = "h2",
  eyebrowSize = center ? "eyebrowMd" : "eyebrowSm",
  textSize = "p",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const t = TONES[tone];
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal>
        <p className={`inline-flex items-center gap-[clamp(0.7rem,1.5vw,1.4rem)] ${TYPE[eyebrowSize]} ${t.eyebrow}`}>
          <span className={t.line} aria-hidden="true" />
          {eyebrow}
          {center && <span className={t.line} aria-hidden="true" />}
        </p>
      </Reveal>
      <h2 className={`mt-[0.4em] text-balance ${TYPE[size]} ${t.title}`}>
        <WordReveal text={title} accent={accent} accentClassName={t.accent} />
      </h2>
      {text && (
        <Reveal delay={0.15}>
          <p className={`mt-[clamp(0.9rem,2.2vw,2.2rem)] text-pretty ${center ? (textSize === "pXl" ? "mx-auto max-w-[72vw]" : "mx-auto max-w-[60vw]") + " min-w-[min(100%,18rem)]" : "max-w-[36vw] min-w-[min(100%,18rem)]"} ${TYPE[textSize]} ${t.text}`}>
            {text}
          </p>
        </Reveal>
      )}
    </div>
  );
}
