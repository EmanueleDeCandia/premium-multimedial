import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, MousePointerClick, Play, Sparkles } from "lucide-react";
import { stakeholders } from "../data/content";
import { useApp } from "../context";
import { EASE } from "../lib/hooks";
import { WindowTile } from "./Windows";
import { Counter, rise, stagger } from "./ui";

const heroMetrics = [
  { value: 1.2, decimals: 1, suffix: " M", label: "persone raggiunte in 24 mesi" },
  { value: 0.4, decimals: 2, prefix: "€", label: "costo medio di acquisizione per lettore" },
  { value: 1.35, decimals: 2, label: "K-factor di viralità organica" },
  { value: 26, decimals: 0, label: "KPI misurabili e tracciati" },
];

export function Hero() {
  const { openReader } = useApp();
  const [auto, setAuto] = useState(0);
  const [paused, setPaused] = useState(false);

  // facciata "viva": le finestre si aprono una dopo l'altra
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setAuto((a) => (a + 1) % stakeholders.length), 2600);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section id="top" className="grain relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* sfondo ambientale */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(circle,rgba(227,111,90,0.30),transparent_62%)] blur-2xl" />
        <div className="absolute -left-48 top-40 h-[32rem] w-[32rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(142,155,141,0.40),transparent_62%)] blur-2xl [animation-delay:-8s]" />
        <div className="absolute -right-40 top-16 h-[36rem] w-[36rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(212,199,166,0.65),transparent_62%)] blur-2xl [animation-delay:-14s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,18,27,0.045)_1px,transparent_1px)] bg-[size:88px_100%] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ivory" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div initial="hidden" animate="show" variants={stagger} className="mx-auto max-w-4xl text-center">
          <motion.div variants={rise}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink/80 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-coral" />
              Editorial First, Business by Design
              <span className="hidden h-3 w-px bg-ink/20 sm:block" />
              <span className="hidden text-ink/55 sm:inline">Ebook multimediale sulla danza</span>
            </span>
          </motion.div>
          <motion.h1
            variants={rise}
            className="mt-7 text-balance font-display text-[2.7rem] leading-[1.02] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[5.3rem]"
          >
            Ogni finestra apre <em className="text-crimson">un mondo</em>. Ogni mondo, <em className="text-coral">un pubblico</em>.
          </motion.h1>
          <motion.p variants={rise} className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink/70 sm:text-xl">
            <strong className="font-semibold text-ink">Finestre sulla Danza</strong> è il libro multimediale di Innovation
            Multimedial: un’opera d’autore da leggere, guardare e ascoltare, progettata per viaggiare tra reti culturali,
            territori e media — e restituire a fondazioni, brand, istituzioni e community un impatto misurabile.
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => openReader("integrale")} className="btn btn-primary w-full sm:w-auto">
              <Play className="h-4 w-4" fill="currentColor" /> Apri l’opera multimediale
            </button>
            <a href="#ecosistema" className="btn btn-ghost w-full sm:w-auto">
              Esplora l’ecosistema <ArrowDownRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Facciata di finestre */}
        <div
          className="mt-14 sm:mt-20"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <ul
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-2 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0"
            aria-label="Edizioni multimediali per stakeholder"
          >
            {stakeholders.map((s, i) => (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 1, ease: EASE }}
                className="w-[70%] shrink-0 snap-center sm:w-[44%] md:w-auto"
              >
                <div className="animate-float" style={{ animationDelay: `${i * -1.7}s` }}>
                  <WindowTile
                    kind={s.kind}
                    color={s.color}
                    ink={s.ink}
                    title={s.label}
                    subtitle={s.editionTitle}
                    open={!paused && auto === i}
                    onOpen={() => openReader(s.id)}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-2 flex items-center justify-center gap-2 text-center text-sm text-ink/55"
          >
            <MousePointerClick className="h-4 w-4 shrink-0" />
            Scegli la tua finestra: ognuna apre la versione multimediale dell’opera, curata per il tuo profilo.
          </motion.p>
        </div>

        {/* Metriche */}
        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-4"
        >
          {heroMetrics.map((m) => (
            <motion.div key={m.label} variants={rise} className="text-center sm:text-left">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <Counter
                  value={m.value}
                  decimals={m.decimals}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  className="font-display text-4xl tracking-tight text-ink sm:text-5xl"
                />
                <p className="mx-auto mt-2 max-w-[13rem] text-sm leading-snug text-ink/60 sm:mx-0">{m.label}</p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
        <p className="mt-6 text-center text-xs text-ink/40 sm:text-left">Valori target di progetto a 12–24 mesi dal lancio.</p>
      </div>
    </section>
  );
}
