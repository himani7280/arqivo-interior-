import Link from "next/link";
import { BRAND, LAYOUT, sharedContent, TYPE } from "@/data/data";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/lib/icons";
import { Logo } from "./Logo";
import { Reveal } from "./Motion";

const { footer, site } = sharedContent;

const ICON = "size-[clamp(1.1rem,1.65vw,1.6rem)] shrink-0 text-[#c9a896]";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#342721] text-white/90">
      <div className={`${LAYOUT.container} pt-[clamp(2.2rem,4vw,3.8rem)]`}>
        <div className="grid gap-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[1.35fr_1fr_1.15fr] md:gap-0">
          <Reveal className="md:pl-[2.9vw] md:pr-[3vw]">
            <Logo light className="w-[clamp(10rem,21.5vw,20.5rem)]" />
            <p className={`mt-[clamp(1rem,2.2vw,2rem)] max-w-[24vw] min-w-[15rem] ${TYPE.small} text-white/90`}>{footer.blurb}</p>
          </Reveal>

          <Reveal delay={0.1} className="md:border-l md:border-[#8f7a70] md:pl-[5.9vw]">
            <h2 className={`text-white ${TYPE.footerTitle}`}>{footer.quickLinksTitle}</h2>
            <ul className="mt-[clamp(0.8rem,1.4vw,1.4rem)] space-y-[clamp(0.15rem,0.3vw,0.4rem)]">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group inline-flex items-center transition-all duration-300 hover:gap-2 hover:text-white ${TYPE.small}`}
                  >
                    <span className="h-px w-0 bg-[#c9a896] transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="md:border-l md:border-[#8f7a70] md:pl-[6.9vw]">
            <h2 className={`text-white ${TYPE.footerTitle}`}>{footer.contactTitle}</h2>
            <ul className={`mt-[clamp(0.8rem,1.4vw,1.4rem)] space-y-[clamp(0.7rem,1.3vw,1.3rem)] ${TYPE.small}`}>
              <li>
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="group flex items-center gap-[clamp(0.8rem,1.4vw,1.4rem)] transition-colors hover:text-white">
                  <span className="grid size-8 shrink-0 place-items-center bg-white/10 text-[#c9a896] transition-all duration-300 group-hover:bg-[#8a5230] group-hover:text-white">
                    <PhoneIcon strokeWidth={1.3} className="size-4" />
                  </span>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="group flex items-center gap-[clamp(0.8rem,1.4vw,1.4rem)] transition-colors hover:text-white">
                  <span className="grid size-8 shrink-0 place-items-center bg-white/10 text-[#c9a896] transition-all duration-300 group-hover:bg-[#8a5230] group-hover:text-white">
                    <MailIcon strokeWidth={1.3} className="size-4" />
                  </span>
                  {BRAND.email}
                </a>
              </li>
              <li className="group flex items-center gap-[clamp(0.8rem,1.4vw,1.4rem)]">
                <span className="grid size-8 shrink-0 place-items-center bg-white/10 text-[#c9a896] transition-all duration-300 group-hover:bg-[#8a5230] group-hover:text-white">
                  <MapPinIcon strokeWidth={1.3} className="size-4" />
                </span>
                {BRAND.address}
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      <div className={`${LAYOUT.container} mt-[clamp(1.4rem,2.4vw,2.2rem)]`}>
        <div className={`border-t border-white/45 py-[clamp(0.8rem,1.5vw,1.4rem)] pl-[1.4vw] text-white/90 ${TYPE.small}`}>
          © {new Date().getFullYear()} {site.copyright}
        </div>
      </div>
    </footer>
  );
}
