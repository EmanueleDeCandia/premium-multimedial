import { motion } from "framer-motion";
import { partnerNetwork, stakeholders } from "../data/content";
import { Counter, WindowGlyph, rise, stagger } from "./ui";

const proof = [
  { value: 13, label: "linee di valorizzazione" },
  { value: 7, label: "motori di diffusione" },
  { value: 26, label: "KPI con target e baseline" },
  { value: 55, label: "connessioni tracciabili" },
];

export function SocialProof() {
  const items = [...partnerNetwork, ...partnerNetwork];
  return (
    <section aria-labelledby="proof-title" className="relative border-y border-ink/10 bg-paper/70 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p id="proof-title" className="eyebrow text-center text-ink/50">
          Un ecosistema progettato con e per la rete culturale italiana
        </p>
      </div>
      <div className="mask-fade-x relative mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
          {items.map((name, i) => {
            const s = stakeholders[i % stakeholders.length];
            return (
              <div key={`${name}-${i}`} className="flex shrink-0 items-center gap-3 text-ink/70 transition hover:text-ink" aria-hidden={i >= partnerNetwork.length}>
                <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: s.color }}>
                  <WindowGlyph kind={s.kind} className="h-5 w-5" frame={s.ink} glass={s.color} />
                </span>
                <span className={i % 2 ? "font-display text-xl italic" : "text-lg font-semibold tracking-tight"}>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <motion.dl
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={stagger}
        className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 px-5 sm:grid-cols-4 sm:px-8"
      >
        {proof.map((p) => (
          <motion.div key={p.label} variants={rise} className="glass rounded-2xl px-5 py-4 text-center shadow-sm">
            <dt className="sr-only">{p.label}</dt>
            <dd>
              <Counter value={p.value} className="font-display text-3xl text-ink" />
              <p className="mt-1 text-xs leading-snug text-ink/60 sm:text-sm">{p.label}</p>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
