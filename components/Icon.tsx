import { ICON_MAP, type IconName } from "@/lib/icons";

type IconProps = { name: IconName; className?: string; strokeWidth?: number };

/** Renders an icon by the key used in data.json. */
export function Icon({ name, className = "size-8", strokeWidth = 1.2 }: IconProps) {
  const Cmp = ICON_MAP[name];
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
