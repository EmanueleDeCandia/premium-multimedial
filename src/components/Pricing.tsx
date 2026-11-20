import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { formatNumber, plans, stakeholderById } from "../data/content";
import { useApp } from "../context";
import { SectionHeader, WindowGlyph, rise, stagger } from "./ui";
import { cn } from "../utils/cn";

export function Pricing() {
  const { openReader, requestProposal } = useApp();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="prezzi" aria-labelledby="prezzi-title" className="relative bg-paper/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          align="center"
          eyebrow="Pacchetti"
          title={
            <span id="prezzi-title">
              Un bene culturale acquistabile. <em className="text-crimson">Un investimento misurabile.</em>
            </span>
          }
          lead="Licenze, sponsorizzazioni ed edizioni su misura, conformi alle regole di acquisto di beni e servizi di fondazioni, enti e imprese. Ogni pacchetto include KPI dichiarati e reportistica d’impatto."
        />

        <div className="mt-10 flex justify-center">
          <div role="group" aria-label="Modalità di acquisto" className="glass inline-flex items-center rounded-full p-1 shadow-sm">
            {[
              { v: false, l: "Per edizione" },
              { v: true, l: "Programma annuale" },
            ].map((o) => (
              <button
                key={o.l}
                onClick={() => setAnnual(o.v)}
                aria-pressed={annual === o.v}
                className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              >
                {annual === o.v && (
                  <motion.span
                    layoutId="price-toggle"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={cn("relative", annual === o.v ? "text-ivory" : "text-ink/65")}>{o.l}</span>
                {o.v && (
                  <span className={cn("relative rounded-full px-1.5 py-0.5 text-[10px] font-bold", annual ? "bg-coral text-ink" : "bg-coral/15 text-crimson")}>
                    −20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {plans.map((p) => {
            const s = stakeholderById[p.stakeholder];
            const price = p.price === 0 ? 0 : annual ? Math.round(p.price * 0.8) : p.price;
            const onCta = () => (p.price === 0 ? openReader("community") : requestProposal(p.stakeholder, p.name));
            return (
              <motion.li
                key={p.id}
                variants={rise}
                className={cn(
                  "relative flex flex-col rounded-[28px] p-7 transition duration-500 hover:-translate-y-1",
                  p.highlight
                    ? "bg-ink text-ivory shadow-[0_40px_90px_-40px_rgba(23,18,27,0.7)] ring-1 ring-ink xl:-my-3 xl:py-10"
                    : "border border-ink/10 bg-white/70 hover:bg-white hover:shadow-[0_30px_60px_-36px_rgba(23,18,27,0.4)]",
                )}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-7 flex items-center gap-1 rounded-full bg-coral px-3 py-1 text-[11px] font-bold text-ink shadow">
                    <Sparkles className="h-3 w-3" /> {p.badge}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: s.color }}>
                    <WindowGlyph kind={s.kind} className="h-6 w-6" frame={s.ink} glass={s.color} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                    <p className={cn("text-xs", p.highlight ? "text-white/55" : "text-ink/50")}>{p.audience}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-baseline gap-1.5">
                  {p.from && <span className={cn("text-sm", p.highlight ? "text-white/60" : "text-ink/55")}>da</span>}
                  <motion.span key={`${p.id}-${annual}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl tracking-tight">
                    {price === 0 ? "Gratis" : `€${formatNumber(price)}`}
                  </motion.span>
                </div>
                <p className={cn("mt-1 text-sm", p.highlight ? "text-white/55" : "text-ink/50")}>
                  {p.price === 0 ? p.unit : `${p.unit}${annual ? " · programma annuale" : ""} · IVA esclusa`}
                </p>
                <p className={cn("mt-5 text-sm leading-relaxed", p.highlight ? "text-white/75" : "text-ink/65")}>{p.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className={cn("flex gap-2.5 text-sm", p.highlight ? "text-white/85" : "text-ink/75")}>
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", p.highlight ? "text-coral" : "text-crimson")} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onCta} className={cn("btn mt-8 w-full", p.highlight ? "btn-light" : "btn-primary")}>
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </button>
              </motion.li>
            );
          })}
        </motion.ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink/55">
          Festival e grandi istituzioni culturali? La partnership editoriale (modulo 3.4) è{" "}
          <strong className="font-semibold text-ink">a costo zero per l’ente</strong>.{" "}
          <button onClick={() => requestProposal("istituzioni", "Partnership editoriale 3.4")} className="font-semibold text-crimson underline underline-offset-4">
            Parliamone
          </button>
          .
        </p>
      </div>
    </section>
  );
}
