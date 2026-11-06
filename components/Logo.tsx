import Image from "next/image";
import { BRAND, IMG } from "@/data/data";

type LogoProps = {
  light?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({ light = false, className = "w-36 sm:w-44", priority = false }: LogoProps) {
  return (
    <Image
      src={light ? IMG.logoLight : IMG.logo}
      alt={`${BRAND.name} ${BRAND.tagline}`}
      width={900}
      height={241}
      priority={priority}
      className={className}
    />
  );
}
