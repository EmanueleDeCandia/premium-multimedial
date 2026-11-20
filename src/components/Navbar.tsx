import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, Play, X } from "lucide-react";
import { Logo } from "./ui";
import { useApp } from "../context";
import { cn } from "../utils/cn";

const links = [
  { href: "#opera", label: "Opera" },
  { href: "#moduli", label: "Moduli" },
  { href: "#ecosistema", label: "Ecosistema" },
  { href: "#stakeholder", label: "Per chi" },
  { href: "#impatto", label: "Impatto" },
  { href: "#prezzi", label: "Prezzi" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { openReader } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-linear-to-r from-coral via-crimson to-plum"
        aria-hidden
      />
      <div className="px-3 pt-3 sm:px-5">
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4",
            scrolled || open ? "glass shadow-[0_10px_40px_-18px_rgba(23,18,27,0.35)]" : "border border-transparent",
          )}
        >
          <Logo />
          <nav aria-label="Navigazione principale" className="hidden items-center lg:flex">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openReader("integrale")}
              className="hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-ink/80 transition hover:bg-ink/5 hover:text-ink md:inline-flex"
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" /> Apri l’opera
            </button>
            <a href="#contatti" className="btn btn-primary hidden !py-2.5 !text-sm sm:inline-flex">
              Richiedi una demo <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Chiudi il menu" : "Apri il menu"}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-ivory lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="menu-mobile"
              aria-label="Navigazione mobile"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-3 shadow-[0_20px_50px_-20px_rgba(23,18,27,0.4)] lg:hidden"
            >
              <ul className="grid gap-1">
                {links.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-ink/85 hover:bg-ink/5"
                    >
                      {l.label}
                      <ArrowUpRight className="h-4 w-4 text-ink/35" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 grid gap-2 border-t border-ink/10 pt-3 sm:grid-cols-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    openReader("integrale");
                  }}
                  className="btn btn-ghost w-full"
                >
                  <Play className="h-4 w-4" fill="currentColor" /> Apri l’opera
                </button>
                <a href="#contatti" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Richiedi una demo
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
