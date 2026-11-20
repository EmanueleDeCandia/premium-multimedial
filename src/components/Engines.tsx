import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Megaphone, Network, Radio, ScanLine, Share2, Target, Unlock } from "lucide-react";
import { engineById, engines, modules, primaryStakeholder } from "../data/content";
import { useApp } from "../context";
import { EASE } from "../lib/hooks";
import { SectionHeader, rise, stagger } from "./ui";

const icons: Record<string, typeof Network> = {
  "5.1": Network,
  "5.2": Target,
  "5.3": Share2,
  "5.4": ScanLine,
  "5.5": Megaphone,
  "5.6": Unlock,
  "5.7": Radio,
};

export function Engines() {
  const { openReader } = useApp();
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <section id="motori" aria-labelledby="motori-title" className="relative bg-paper/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="7 motori di diffusione"
          title={
            <span id="motori-title">
              L’opera viaggia da sola. <em className="text-crimson">Perché è progettata per farlo.</em>
            </span>
          }
          lead="L’infrastruttura operativa che porta il libro attraverso reti istituzionali, territori, media e community, massimizzando la reach con costi di acquisizione prossimi allo zero."
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {engines.map((e, i) => {
            const Icon = icons[e.id];
            return (
              <motion.li
                key={e.id}
                variants={rise}
                className={
                  i === 0
                    ? "group relative overflow-hidden rounded-[26px] bg-ink p-6 text-ivory sm:col-span-2 lg:col-span-2"
                    : "group relative overflow-hidden rounded-[26px] border border-ink/10 bg-white/65 p-6 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_30px_60px_-36px_rgba(23,18,27,0.45)]"
                }
              >
                {i === 0 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(227,111,90,0.45),transparent_65%)]"
                  />
                )}
                <div className="relative flex items-center justify-between">
                  <span
                    className={
                      i === 0
                        ? "grid h-11 w-11 place-items-center rounded-2xl bg-white/10"
                        : "grid h-11 w-11 place-items-center rounded-2xl bg-ivory text-crimson ring-1 ring-ink/10 transition duration-500 group-hover:bg-ink group-hover:text-ivory"
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={i === 0 ? "font-mono text-xs text-white/50" : "font-mono text-xs text-ink/40"}>{e.id}</span>
                </div>
                <h3 className="relative mt-5 text-lg font-semibold leading-snug tracking-tight">{e.name}</h3>
                <p className={i === 0 ? "relative mt-1 text-sm italic text-[#F4977F]" : "relative mt-1 text-sm italic text-crimson"}>
                  {e.tagline}
                </p>
                <p className={i === 0 ? "relative mt-3 text-sm leading-relaxed text-white/70" : "relative mt-3 text-sm leading-relaxed text-ink/65"}>
                  {i === 0 ? `${e.what} ${e.how}` : e.how}
                </p>
                <div className={i === 0 ? "relative mt-5 flex gap-8 border-t border-white/10 pt-4" : "relative mt-5 flex gap-6 border-t border-ink/10 pt-4"}>
                  {e.kpis.map((k) => (
                    <div key={k.label}>
                      <p className="font-display text-2xl">{k.value}</p>
                      <p className={i === 0 ? "text-[11px] text-white/55" : "text-[11px] text-ink/50"}>{k.label}</p>
                    </div>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Matrice di sinergia */}
        <div className="mt-10 overflow-hidden rounded-[26px] border border-ink/10 bg-white/60 backdrop-blur">
          <button
            onClick={() => setShowMatrix((v) => !v)}
            aria-expanded={showMatrix}
            aria-controls="matrice"
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/60"
          >
            <span>
              <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-crimson">Matrice di sinergia</span>
              <span className="mt-1 block font-display text-xl sm:text-2xl">13 moduli × 7 motori: chi spinge cosa, e con quale leva</span>
            </span>
            <motion.span animate={{ rotate: showMatrix ? 180 : 0 }} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-ivory">
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {showMatrix && (
              <motion.div
                id="matrice"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto border-t border-ink/10">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <caption className="sr-only">Matrice di sinergia tra moduli editoriali e motori di diffusione</caption>
                    <thead>
                      <tr className="text-[10.5px] uppercase tracking-[0.16em] text-ink/45">
                        <th scope="col" className="px-6 py-3 font-semibold">Modulo dell’ecosistema</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Motore primario</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Motore secondario</th>
                        <th scope="col" className="px-6 py-3 font-semibold">Leva psicologica / relazionale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modules.map((m) => (
                        <tr
                          key={m.id}
                          onClick={() => openReader(primaryStakeholder(m.id).id, m.id)}
                          className="cursor-pointer border-t border-ink/[0.07] transition hover:bg-coral/[0.07]"
                        >
                          <th scope="row" className="px-6 py-3.5 font-medium">
                            <span className="mr-2 rounded-md bg-ink px-1.5 py-0.5 font-mono text-[11px] text-ivory">{m.id}</span>
                            {m.short}
                          </th>
                          {m.engines.map((e) => (
                            <td key={e} className="px-4 py-3.5 text-ink/75">
                              <span className="font-mono text-xs text-ink/45">{e}</span> {engineById[e].short}
                            </td>
                          ))}
                          <td className="px-6 py-3.5 italic text-ink/65">{m.lever}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
