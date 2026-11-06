"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, LAYOUT, NAV_LINKS, sharedContent, TYPE } from "@/data/data";
import { LinkButton } from "./Button";
import { Logo } from "./Logo";
import { useIntroDone } from "./Preloader";

const { navbar } = sharedContent;

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const done = useIntroDone();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenPath(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <motion.header
        initial={{ y: "-100%", opacity: 0 }}
        animate={done ? { y: "0%", opacity: 1 } : undefined}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-500 ${
          scrolled ? "shadow-[0_8px_30px_-12px_rgba(53,40,42,0.25)]" : ""
        }`}
      >
        <div className={`${LAYOUT.container} flex h-(--header-h) items-center justify-between gap-4`}>
          <div className="flex items-center gap-[clamp(1rem,3.2vw,3.2rem)]">
            <Link href="/" aria-label={navbar.homeAriaLabel} onClick={() => setOpenPath(null)} className="inline-block">
              <Logo priority className="w-[clamp(7.5rem,17.4vw,17rem)]" />
            </Link>
            <span className="hidden h-[clamp(2.4rem,3.9vw,3.9rem)] w-px bg-[#d9cfc9] xl:block" aria-hidden="true" />
          </div>

          <nav aria-label="Main" className="hidden items-center gap-[clamp(1.4rem,2.9vw,2.8rem)] xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative py-2 text-black transition-colors ${TYPE.nav} ${isActive(link.href) ? "font-semibold" : ""}`}
              >
                <span className="transition-opacity duration-300 hover:opacity-70">{link.label}</span>
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-[#9b7b69]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden min-[380px]:block">
              <LinkButton href={navbar.cta.href} tone="taupe" small>
                {navbar.cta.label}
              </LinkButton>
            </div>
            <button
              type="button"
              onClick={() => setOpenPath(open ? null : pathname)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative grid h-11 w-11 place-items-center text-[#211b18] xl:hidden"
            >
              <span className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpenPath(null)}
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[2px] xl:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-3 top-[calc(var(--header-h)+0.5rem)] z-50 w-[min(20rem,calc(100vw-1.5rem))] border border-white/15 bg-[#342721] p-5 shadow-2xl xl:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpenPath(null)}
                    className={`border-b border-white/10 py-2.5 font-(family-name:--font-ui) text-[1.02rem] font-medium transition-colors ${
                      isActive(link.href) ? "text-[#c9a896]" : "text-white hover:text-[#c9a896]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-5" onClick={() => setOpenPath(null)}>
                <LinkButton href={navbar.cta.href} tone="taupe" small className="w-full justify-center">
                  {navbar.cta.label}
                </LinkButton>
              </div>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/60">
                {BRAND.phone} · {BRAND.email}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
