import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { stakeholderById, testimonials } from "../data/content";
import { SectionHeader, WindowGlyph, rise, stagger } from "./ui";
import { cn } from "../utils/cn";

export function Testimonials() {
  return (
    <section id="voci" aria-labelledby="voci-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          align="center"
          eyebrow="Voci dal programma pilota"
          title={
            <span id="voci-title">
              Chi ha aperto una finestra, <em className="text-crimson">non l’ha più chiusa</em>.
            </span>
          }
        />
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => {
            const s = stakeholderById[t.stakeholder];
            const featured = i === 0;
            return (
              <motion.li
                key={t.name}
                variants={rise}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[28px] p-7 transition duration-500 hover:-translate-y-1",
                  featured
                    ? "bg-ink text-ivory lg:col-span-2 lg:row-span-1"
                    : "border border-ink/10 bg-white/60 hover:bg-white hover:shadow-[0_30px_60px_-36px_rgba(23,18,27,0.45)]",
                )}
              >
                {featured && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-2xl"
                    style={{ background: s.color }}
                  />
                )}
                <div className="relative flex items-center justify-between">
                  <Quote className={cn("h-8 w-8", featured ? "text-[#F4977F]" : "text-crimson/70")} />
                  <span
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ background: s.color, color: s.ink }}
                  >
                    <WindowGlyph kind={s.kind} className="h-3.5 w-3.5" frame={s.ink} glass={s.color} />
                    {s.label}
                  </span>
                </div>
                <blockquote
                  className={cn(
                    "relative mt-6 flex-1 text-pretty font-display leading-snug",
                    featured ? "text-2xl sm:text-[1.9rem]" : "text-lg text-ink/85",
                  )}
                >
                  “{t.quote}”
                </blockquote>
                <div className={cn("relative mt-8 flex items-end justify-between gap-4 border-t pt-5", featured ? "border-white/10" : "border-ink/10")}>
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-semibold"
                      style={{ background: s.color, color: s.ink }}
                      aria-hidden
                    >
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className={cn("text-xs", featured ? "text-white/55" : "text-ink/55")}>
                        {t.role} · {t.org}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-display text-2xl", featured ? "text-[#F4977F]" : "text-crimson")}>{t.metric.value}</p>
                    <p className={cn("max-w-[9rem] text-[11px] leading-snug", featured ? "text-white/50" : "text-ink/50")}>{t.metric.label}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
