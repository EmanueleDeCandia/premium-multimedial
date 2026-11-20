import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import {
  MAP_COLORS,
  formatKpi,
  formatNumber,
  headlineMetrics,
  modules,
  revenueMix,
  socialMetrics,
  stakeholders,
  type StakeholderId,
} from "../data/content";
import { EASE } from "../lib/hooks";
import { Counter, SectionHeader, WindowGlyph, rise, stagger } from "./ui";
import { cn } from "../utils/cn";

export function Impact() {
  const [filter, setFilter] = useState<StakeholderId | "all">("all");
  const total = revenueMix.reduce((a, r) => a + r.value, 0);
  const list = modules.filter((m) => filter === "all" || stakeholders.find((s) => s.id === filter)!.modules.includes(m.id));

  return (
    <section id="impatto" aria-labelledby="impatto-title" className="relative overflow-hidden bg-night py-24 text-ivory sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(164,58,70,0.35),transparent)]" />
        <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(142,155,141,0.22),transparent)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          dark
          eyebrow="Metriche d’impatto"
          title={
            <span id="impatto-title">
              Un impatto che si misura, <em className="text-[#F4977F]">non che si racconta</em>.
            </span>
          }
          lead="Ogni linea di valorizzazione ha due KPI quantitativi, con valori target e baseline di riferimento: la base di una valutazione d’impatto trasparente, verificabile da ogni stakeholder."
        />

        {/* Metriche principali */}
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {headlineMetrics.map((m) => (
            <motion.div key={m.label} variants={rise} className="glass-dark group rounded-[24px] p-6 transition duration-500 hover:bg-white/[0.07]">
              <dt className="text-sm text-white/55">{m.label}</dt>
              <dd>
                <Counter
                  value={m.value}
                  decimals={m.decimals}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  className="mt-2 block font-display text-5xl tracking-tight text-white sm:text-6xl"
                />
                <p className="mt-3 text-xs leading-relaxed text-white/45">{m.note}</p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* Mix dei ricavi + impatto sociale */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className="glass-dark rounded-[24px] p-6 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">Mix dei ricavi non diluitivi · 24 mesi</p>
                <p className="mt-1 font-display text-3xl">€{formatNumber(total)}</p>
              </div>
              <p className="text-xs text-white/45">Nessuna dipendenza da un’unica fonte: 5 linee di ricavo</p>
            </div>
            <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-white/10" role="img" aria-label="Distribuzione dei ricavi per linea">
              {revenueMix.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(r.value / total) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.1 + i * 0.12, ease: EASE }}
                  style={{ background: r.color }}
                  className="h-full border-r border-night/60 last:border-0"
                />
              ))}
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {revenueMix.map((r) => (
                <li key={r.label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-white/75">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                    {r.label}
                  </span>
                  <span className="font-mono text-xs text-white/60">
                    €{formatNumber(r.value / 1000)}k · {Math.round((r.value / total) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-dark rounded-[24px] p-6 sm:p-7">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50">Impatto culturale e sociale</p>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
              {socialMetrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <Counter value={m.value} className="font-display text-4xl text-white" />
                    <p className="mt-1 text-sm font-medium text-white/80">{m.label}</p>
                    <p className="text-xs text-white/45">{m.note}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Cruscotto KPI */}
        <div className="mt-16">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#F4977F]">Cruscotto dei 26 KPI</p>
              <p className="mt-2 font-display text-3xl">Target, baseline e metodo per ogni modulo.</p>
            </div>
            <div role="group" aria-label="Filtra KPI per stakeholder" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
              <button
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition",
                  filter === "all" ? "border-white bg-white text-ink" : "border-white/15 text-white/70 hover:text-white",
                )}
              >
                Tutti
              </button>
              {stakeholders.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFilter(s.id)}
                  aria-pressed={filter === s.id}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition",
                    filter === s.id ? "border-transparent" : "border-white/15 text-white/70 hover:text-white",
                  )}
                  style={filter === s.id ? { background: s.color, color: s.ink } : undefined}
                >
                  <WindowGlyph kind={s.kind} className="h-4 w-4" frame={filter === s.id ? s.ink : s.accent} glass={filter === s.id ? s.color : "#120E16"} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="mt-8 grid gap-3 md:grid-cols-2">
            {list.flatMap((m) =>
              m.kpis.map((k, j) => (
                <motion.div
                  layout
                  key={`${m.id}-${j}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-[10.5px] text-white/45">
                        <span style={{ color: MAP_COLORS[m.domain] }}>{m.id}</span> · {m.short}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-snug text-white/90">{k.label}</p>
                    </div>
                    <p className="shrink-0 whitespace-nowrap font-display text-2xl" style={{ color: MAP_COLORS[m.domain] }}>
                      {formatKpi(k)}
                    </p>
                  </div>
                  <div className="relative mt-3 h-1.5 rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: MAP_COLORS[m.domain] }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${k.ratio * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: EASE }}
                    />
                    {k.baseRatio !== undefined && (
                      <span
                        className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 rounded bg-white/80"
                        style={{ left: `${k.baseRatio * 100}%` }}
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className="mt-2.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[11px] text-white/50">
                    <span>{k.extra ?? k.desc.split(":")[0]}</span>
                    <span>{k.baseline}</span>
                  </div>
                </motion.div>
              )),
            )}
          </motion.div>
          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-white/45">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Valori target a 12–24 mesi dal lancio; baseline stimate su progetti editoriali e campagne comparabili. Fonti di misura:
            analytics proprietari, link e QR tracciati, report dei canali partner. Dashboard in tempo reale e report d’impatto trimestrale
            per ogni partner. Il marcatore bianco indica la baseline.
          </p>
        </div>
      </div>
    </section>
  );
}
