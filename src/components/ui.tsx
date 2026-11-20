import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { EASE, useCountUp } from "../lib/hooks";
import { formatNumber, type WindowKind } from "../data/content";
import { cn } from "../utils/cn";

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}
    >
      <motion.p
        variants={rise}
        className={cn(
          "eyebrow inline-flex items-center gap-2",
          dark ? "text-[#F4977F]" : "text-crimson",
        )}
      >
        <span className={cn("h-px w-6", dark ? "bg-[#F4977F]/60" : "bg-crimson/50")} aria-hidden />
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={rise}
        className={cn(
          "mt-4 text-balance font-display text-[2.15rem] leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          variants={rise}
          className={cn("mt-5 text-pretty text-base leading-relaxed sm:text-lg", dark ? "text-white/65" : "text-ink/65")}
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  );
}

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const v = useCountUp(value, inView, duration);
  const final = `${prefix}${formatNumber(value, decimals)}${suffix}`;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {formatNumber(v, decimals)}
        {suffix}
      </span>
    </span>
  );
}

/** Icona semplificata delle finestre, usata in chip, tab, mappa e reader. */
export function WindowGlyph({
  kind,
  className,
  frame = "#F6F1E7",
  glass = "#17121B",
}: {
  kind: WindowKind | null;
  className?: string;
  frame?: string;
  glass?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {kind === "gothic" && (
        <>
          <path d="M6 21V11.5Q6 6.5 12 3Q18 6.5 18 11.5V21Z" fill={frame} />
          <path d="M8.3 20V12.2Q8.3 8.8 12 6.4Q15.7 8.8 15.7 12.2V20Z" fill={glass} />
          <path d="M12 7v13" stroke={frame} strokeWidth="1.2" />
        </>
      )}
      {kind === "romanesque" && (
        <>
          <path d="M2.8 21V11a9.2 9.2 0 0 1 18.4 0V21Z" fill={frame} />
          <path d="M5.4 20v-6.3a3.05 3.05 0 0 1 6.1 0V20Z" fill={glass} />
          <path d="M12.5 20v-6.3a3.05 3.05 0 0 1 6.1 0V20Z" fill={glass} />
        </>
      )}
      {kind === "classical" && (
        <>
          <path d="M3.5 8.2a8.5 5.2 0 0 1 17 0Z" fill={frame} />
          <path d="M6.4 21V12.4a5.6 5.6 0 0 1 11.2 0V21Z" fill={frame} />
          <path d="M8.5 20v-7.6a3.5 3.5 0 0 1 7 0V20Z" fill={glass} />
          <path d="M12 9v11M8.5 15h7" stroke={frame} strokeWidth="1" />
        </>
      )}
      {kind === "balcony" && (
        <>
          <rect x="5" y="3" width="14" height="2.2" fill={frame} />
          <rect x="6.5" y="5.2" width="11" height="15.8" fill={frame} />
          <rect x="8" y="6.5" width="8" height="8" fill={glass} />
          <path d="M12 6.5v8M8 10.5h8" stroke={frame} strokeWidth="0.9" />
          <rect x="7.6" y="15.4" width="8.8" height="4.6" fill={glass} />
          <path d="M9.2 15.4q1.2 2.3 0 4.6M12 15.4q1.2 2.3 0 4.6M14.8 15.4q1.2 2.3 0 4.6" stroke={frame} strokeWidth="0.8" fill="none" />
        </>
      )}
      {kind === "pediment" && (
        <>
          <path d="M4.5 7.6L12 3.4L19.5 7.6Z" fill={frame} />
          <rect x="6.5" y="8.2" width="11" height="12.8" fill={frame} />
          <rect x="8" y="9.6" width="8" height="10" fill={glass} />
          <path d="M8 9.6l8 10M16 9.6l-8 10M8 14.6h8" stroke={frame} strokeWidth="0.8" />
        </>
      )}
      {kind === null && (
        <>
          <path d="M3 21V9.5L12 4l9 5.5V21Z" fill={frame} />
          <path d="M5.6 20v-5a1.7 1.7 0 0 1 3.4 0v5Z" fill={glass} />
          <path d="M10.3 20v-5a1.7 1.7 0 0 1 3.4 0v5Z" fill={glass} />
          <path d="M15 20v-5a1.7 1.7 0 0 1 3.4 0v5Z" fill={glass} />
          <circle cx="12" cy="10" r="1.8" fill={glass} />
        </>
      )}
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="Innovation Multimedial — torna all’inizio">
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl transition-transform duration-500 group-hover:rotate-[-6deg]",
          dark ? "bg-ivory" : "bg-ink",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path d="M6.5 21V11.2a5.5 5.5 0 0 1 11 0V21Z" fill="#E36F5A" />
          <path d="M12 6v15M6.5 14h11" stroke={dark ? "#F6F1E7" : "#17121B"} strokeWidth="1.3" />
          <circle cx="15.2" cy="9.4" r="1.1" fill="#FFE1AE" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={cn("block text-[15px] font-semibold tracking-tight", dark ? "text-ivory" : "text-ink")}>
          Innovation
        </span>
        <span className={cn("block font-display text-[15px] italic", dark ? "text-[#F4977F]" : "text-crimson")}>
          Multimedial
        </span>
      </span>
    </a>
  );
}

export function hexA(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
