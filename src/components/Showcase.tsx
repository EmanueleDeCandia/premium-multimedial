import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Film, Headphones, Images, ListChecks, Lock, Map as MapIcon, Play, QrCode } from "lucide-react";
import { moduleById, photo } from "../data/content";
import { useApp } from "../context";
import { EASE } from "../lib/hooks";
import { SectionHeader, rise, stagger } from "./ui";
import { cn } from "../utils/cn";

const screens = ["3.1", "3.4", "4.4", "4.5", "3.6"].map((id) => moduleById[id]);

const formats = [
  { icon: Film, title: "Documentari e trailer 4K", text: "Micro-documentari d’autore e prove commentate, con sottotitoli e capitoli." },
  { icon: Images, title: "Gallery ad alta risoluzione", text: "Reportage fotografici e archivi storici consultabili a tutto schermo." },
  { icon: Headphones, title: "Audio-guide d’autore", text: "Racconti da ascoltare in cammino, nei borghi e nei foyer dei teatri." },
  { icon: MapIcon, title: "Mappe interattive", text: "Teatri, spazi non convenzionali, itinerari e residenze geolocalizzati." },
  { icon: ListChecks, title: "Quiz e sondaggi d’autore", text: "Micro-interazioni zero-party restituite ai lettori come infografiche." },
  { icon: QrCode, title: "Ponte phygital", text: "QR e NFC che collegano carta stampata, luoghi ed eventi all’opera digitale." },
  { icon: Lock, title: "Director’s Cut", text: "Contenuti sbloccabili con il referral culturale, mai con sconti commerciali." },
];

export function Showcase() {
  const { openReader } = useApp();
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % screens.length), 4200);
    return () => window.clearInterval(t);
  }, [hover]);

  const s = screens[i];

  return (
    <section id="opera" aria-labelledby="opera-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-20 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(164,58,70,0.16),transparent_62%)] blur-2xl" />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="La versione multimediale"
              title={
                <span id="opera-title">
                  Un’opera da leggere, guardare, ascoltare, <em className="text-crimson">esplorare</em>.
                </span>
              }
              lead="Ogni capitolo regge il confronto con le migliori riviste culturali, i saggi d’arte e i documentari d’autore. Ed è progettato per essere condiviso, misurato, ricordato."
            />
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2"
            >
              {formats.map((f) => (
                <motion.li key={f.title} variants={rise} className="group flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/70 text-crimson ring-1 ring-ink/10 transition duration-500 group-hover:bg-ink group-hover:text-ivory">
                    <f.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{f.title}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-ink/60">{f.text}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Dispositivo */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative [perspective:1400px]"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
          >
            <button
              onClick={() => openReader("integrale", s.id)}
              aria-label={`Apri l’edizione integrale al capitolo ${s.id}: ${s.editorialTitle}`}
              className="group relative block w-full rounded-[30px] bg-ink p-2.5 text-left shadow-[0_50px_120px_-40px_rgba(23,18,27,0.65)] ring-1 ring-black/10 transition duration-700 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden rounded-[22px] bg-night">
                {/* barra superiore */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-coral" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sand" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sage" />
                  <span className="ml-3 truncate text-[11px] text-white/50">Finestre sulla Danza · Edizione Integrale</span>
                  <span className="ml-auto hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70 sm:inline">Vista lettore</span>
                </div>
                <div className="flex">
                  <ol className="hidden w-44 shrink-0 space-y-1 border-r border-white/10 p-3 sm:block" aria-hidden>
                    {screens.map((x, j) => (
                      <li
                        key={x.id}
                        className={cn(
                          "rounded-lg px-2.5 py-2 text-[11px] leading-snug transition-colors duration-500",
                          j === i ? "bg-white/10 text-white" : "text-white/45",
                        )}
                      >
                        <span className="block font-mono text-[9.5px] text-white/40">{x.id}</span>
                        {x.short}
                      </li>
                    ))}
                  </ol>
                  <div className="relative aspect-[16/11] flex-1 overflow-hidden">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={photo(s.gallery[0].id, 1200, 820)}
                          alt=""
                          className="kenburns absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/5" />
                        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#F4977F]">
                            Capitolo {s.id} · {s.short}
                          </p>
                          <p className="mt-2 max-w-md text-balance font-display text-2xl leading-tight text-white sm:text-3xl">
                            {s.editorialTitle}
                          </p>
                          <p className="mt-2 hidden max-w-md text-sm text-white/70 sm:block">{s.publicValue}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-xl transition duration-500 group-hover:opacity-100">
                      <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                    </span>
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-white/10">
                      <motion.div
                        key={`bar-${i}-${hover}`}
                        className="h-full bg-[#F4977F]"
                        initial={{ width: "0%" }}
                        animate={{ width: hover ? "0%" : "100%" }}
                        transition={{ duration: hover ? 0 : 4.2, ease: "linear" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* chip fluttuanti */}
            <div className="glass absolute -left-3 top-10 hidden animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-lg sm:flex lg:-left-10">
              <Film className="h-4 w-4 text-crimson" /> Documentario 4K
            </div>
            <div className="glass absolute -right-3 top-1/3 hidden animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-lg [animation-delay:-3s] sm:flex lg:-right-8">
              <Headphones className="h-4 w-4 text-teal" /> Audio-guida d’autore
            </div>
            <div className="glass absolute -bottom-5 left-10 hidden animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-lg [animation-delay:-5s] sm:flex">
              <Lock className="h-4 w-4 text-plum" /> Director’s Cut · 3 inviti
            </div>
            <div className="glass absolute -bottom-4 right-6 hidden animate-float items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-lg [animation-delay:-7s] md:flex">
              <MapIcon className="h-4 w-4 text-coral" /> 240 luoghi mappati
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
