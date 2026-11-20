import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Play } from "lucide-react";
import { engineById, moduleById, stakeholders, type StakeholderId } from "../data/content";
import { useApp } from "../context";
import { EASE } from "../lib/hooks";
import { WindowTile } from "./Windows";
import { SectionHeader, WindowGlyph } from "./ui";
import { cn } from "../utils/cn";

export function Stakeholders() {
  const { openReader, requestProposal } = useApp();
  const [active, setActive] = useState<StakeholderId>("fondazioni");
  const s = stakeholders.find((x) => x.id === active)!;
  const idx = stakeholders.findIndex((x) => x.id === active);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (idx + (e.key === "ArrowRight" ? 1 : -1) + stakeholders.length) % stakeholders.length;
    setActive(stakeholders[n].id);
    document.getElementById(`tab-${stakeholders[n].id}`)?.focus();
  };

  return (
    <section id="stakeholder" aria-labelledby="st-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          align="center"
          eyebrow="Per chi è · i benefici"
          title={
            <span id="st-title">
              Cinque finestre, cinque modi di <em className="text-crimson">creare valore</em>.
            </span>
          }
          lead="Un’unica opera, letta da prospettive diverse. Scegli il tuo profilo: scopri cosa ottieni, quali moduli e motori lavorano per te e quali risultati puoi misurare."
        />

        <div
          role="tablist"
          aria-label="Profili di stakeholder"
          onKeyDown={onKey}
          className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 sm:mx-auto sm:flex-wrap sm:justify-center sm:overflow-visible"
        >
          {stakeholders.map((x) => {
            const on = x.id === active;
            return (
              <button
                key={x.id}
                id={`tab-${x.id}`}
                role="tab"
                aria-selected={on}
                aria-controls={`panel-${x.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(x.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                  on ? "border-transparent text-ivory" : "border-ink/10 bg-white/50 text-ink/70 hover:bg-white hover:text-ink",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="st-tab"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative grid h-6 w-6 place-items-center rounded-md" style={{ background: x.color }}>
                  <WindowGlyph kind={x.kind} className="h-4 w-4" frame={x.ink} glass={x.color} />
                </span>
                <span className="relative">{x.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            id={`panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-12 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
          >
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <WindowTile
                large
                kind={s.kind}
                color={s.color}
                ink={s.ink}
                title={s.label}
                subtitle={s.editionTitle}
                onOpen={() => openReader(s.id)}
              />
            </div>

            <div>
              <p className="eyebrow text-ink/50">{s.audience}</p>
              <h3 className="mt-3 text-balance font-display text-3xl leading-[1.12] sm:text-[2.6rem]">{s.message}</h3>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {s.benefits.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                    className="flex gap-3 rounded-2xl border border-ink/10 bg-white/55 p-4 text-sm leading-relaxed text-ink/75"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: s.color }}>
                      <Check className="h-3 w-3" style={{ color: s.ink }} strokeWidth={3} />
                    </span>
                    {b}
                  </motion.li>
                ))}
              </ul>

              <dl className="mt-8 grid grid-cols-3 gap-3">
                {s.kpis.map((k) => (
                  <div key={k.label} className="rounded-2xl bg-ink px-4 py-4 text-ivory">
                    <dt className="sr-only">{k.label}</dt>
                    <dd>
                      <span className="block font-display text-2xl sm:text-3xl">{k.value}</span>
                      <span className="mt-1 block text-[11px] leading-snug text-white/60 sm:text-xs">{k.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 space-y-3">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink/45">Moduli e motori al tuo servizio</p>
                <div className="flex flex-wrap gap-2">
                  {s.modules.map((id) => (
                    <button
                      key={id}
                      onClick={() => openReader(s.id, id)}
                      className="group flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-xs text-ink/75 transition hover:border-ink/30 hover:bg-white"
                    >
                      <span className="font-mono font-semibold text-crimson">{id}</span> {moduleById[id].short}
                      <Play className="h-3 w-3 opacity-0 transition group-hover:opacity-100" fill="currentColor" />
                    </button>
                  ))}
                  {s.engines.map((id) => (
                    <span key={id} className="flex items-center gap-1.5 rounded-full bg-ink/[0.06] px-3 py-1.5 text-xs text-ink/70">
                      <span className="font-mono font-semibold text-ink/50">{id}</span> {engineById[id].short}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => openReader(s.id)} className="btn btn-primary">
                  <Play className="h-4 w-4" fill="currentColor" /> Apri la tua edizione
                </button>
                <button onClick={() => requestProposal(s.id)} className="btn btn-ghost">
                  Richiedi una proposta <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
