import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { engineById, formatKpi, modules, primaryStakeholder, type Module } from "../data/content";
import { useApp } from "../context";
import { SectionHeader, WindowGlyph } from "./ui";
import { cn } from "../utils/cn";

type Filter = "all" | "A" | "B";

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "Tutte", count: 13 },
  { id: "A", label: "6 Pilastri", count: 6 },
  { id: "B", label: "7 Estensioni", count: 7 },
];

function ModuleCard({ m }: { m: Module }) {
  const { openReader } = useApp();
  const s = primaryStakeholder(m.id);
  return (
    <button
      onClick={() => openReader(s.id, m.id)}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-ink/10 bg-white/60 p-6 text-left backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-ink/20 hover:bg-white/85 hover:shadow-[0_34px_70px_-38px_rgba(23,18,27,0.45)] sm:p-7"
      aria-label={`Apri il capitolo ${m.id}: ${m.editorialTitle}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 blur-2xl transition duration-700 group-hover:opacity-60"
        style={{ background: s.color }}
      />
      <span className="relative flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] font-semibold text-ivory">{m.id}</span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em]",
              m.domain === "A" ? "bg-coral/15 text-crimson" : "bg-sage/25 text-[#3F5A4C]",
            )}
          >
            {m.domain === "A" ? "Pilastro" : "Estensione"}
          </span>
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: s.color }} title={s.label}>
          <WindowGlyph kind={s.kind} className="h-6 w-6" frame={s.ink} glass={s.color} />
        </span>
      </span>

      <span className="relative mt-6 block text-[15px] font-semibold tracking-tight text-ink/80">{m.short}</span>
      <span className="relative mt-1 block text-balance font-display text-[1.45rem] italic leading-snug text-ink">
        {m.editorialTitle}
      </span>

      <span className="relative mt-5 grid gap-4 text-sm sm:grid-cols-2">
        <span>
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink/45">Il pubblico vive</span>
          <span className="mt-1 block leading-snug text-ink/75">{m.publicValue}</span>
        </span>
        <span>
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink/45">Il partner ottiene</span>
          <span className="mt-1 block leading-snug text-ink/75">{m.partnerValue}</span>
        </span>
      </span>

      <span className="relative mt-auto block pt-6">
        <span className="grid grid-cols-2 gap-4 border-t border-ink/10 pt-5">
          {m.kpis.map((k) => (
            <span key={k.label}>
              <span className="block font-display text-2xl tabular-nums tracking-tight text-ink">{formatKpi(k)}</span>
              <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-ink/55">{k.label}</span>
            </span>
          ))}
        </span>
        <span className="mt-5 flex items-center justify-between gap-3">
          <span className="flex flex-wrap gap-1.5">
            {m.engines.map((e) => (
              <span key={e} className="rounded-full border border-ink/10 bg-ivory px-2.5 py-1 text-[11px] text-ink/70">
                <span className="font-mono text-ink/45">{e}</span> {engineById[e].short}
              </span>
            ))}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-ink transition group-hover:gap-2">
            Apri <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>
    </button>
  );
}

export function Modules() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = modules.filter((m) => filter === "all" || m.domain === filter);

  return (
    <section id="moduli" aria-labelledby="moduli-title" className="relative bg-paper/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="13 linee di valorizzazione"
            title={
              <span id="moduli-title">
                Sei pilastri, sette estensioni. <em className="text-crimson">Un’unica opera.</em>
              </span>
            }
            lead="Per ogni modulo, la doppia anima: ciò che il pubblico legge e vive, e ciò che il partner ottiene in diffusione, impatto e KPI. Apri una scheda per entrare nel capitolo multimediale."
          />
          <div role="group" aria-label="Filtra i moduli" className="glass inline-flex self-start rounded-full p-1 shadow-sm lg:self-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className="relative rounded-full px-4 py-2 text-sm font-semibold"
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="mod-filter"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={cn("relative", filter === f.id ? "text-ivory" : "text-ink/65")}>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((m, i) => (
                <motion.li
                  layout
                  key={m.id}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}
                >
                  <ModuleCard m={m} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
