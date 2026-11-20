import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { BookOpenText, Eye, Handshake, Infinity as InfinityIcon, Layers, ShieldCheck } from "lucide-react";
import { Reveal, rise, stagger } from "./ui";

const statement =
  "Il libro non è *mai* *una* *brochure.* È un’opera che regge il confronto con le migliori riviste culturali, i saggi d’arte e i documentari d’autore — e proprio per questo genera valore per *chi* *la* *rende* *possibile.*";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = word.startsWith("*");
  const clean = word.replace(/\*/g, "");
  return (
    <>
      <motion.span style={{ opacity }} className={accent ? "italic text-crimson" : undefined}>
        {clean}
      </motion.span>{" "}
    </>
  );
}

function ScrollText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");
  return (
    <p ref={ref} className="text-balance font-display text-[1.9rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-5xl lg:text-[3.6rem]">
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

const principles = [
  {
    icon: ShieldCheck,
    title: "Nessuna autocelebrazione",
    text: "La startup, gli sponsor e gli enti sostenitori non sono i protagonisti della narrazione, ma i mecenati e gli abilitatori di un’opera culturale autorevole.",
  },
  {
    icon: BookOpenText,
    title: "Valore intrinseco per il lettore",
    text: "Ogni capitolo, video, mappa o inchiesta regge il confronto con le migliori riviste culturali, i saggi d’arte e i documentari d’autore.",
  },
  {
    icon: InfinityIcon,
    title: "Integrazione nativa",
    text: "Referral, sponsorizzazioni, raccolta dati e advocacy vivono intorno e in continuità con il valore culturale, senza mai interromperlo.",
  },
];

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p id="manifesto-title" className="eyebrow inline-flex items-center gap-2 text-crimson">
            <span className="h-px w-6 bg-crimson/50" aria-hidden />
            Il principio non negoziabile
          </p>
        </Reveal>
        <div className="mt-6">
          <ScrollText />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {principles.map((p) => (
            <motion.div
              key={p.title}
              variants={rise}
              className="group rounded-3xl border border-ink/10 bg-white/50 p-7 backdrop-blur transition duration-500 hover:-translate-y-1 hover:bg-white/80 hover:shadow-[0_30px_60px_-35px_rgba(23,18,27,0.4)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-ivory transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Doppia anima */}
        <Reveal className="mt-8">
          <div className="relative grid overflow-hidden rounded-[32px] ring-1 ring-ink/10 md:grid-cols-2">
            <div className="bg-paper p-8 sm:p-10">
              <p className="eyebrow flex items-center gap-2 text-ink/50">
                <Eye className="h-4 w-4" /> Cosa legge e vive il pubblico
              </p>
              <p className="mt-3 font-display text-2xl leading-snug sm:text-3xl">Valore editoriale</p>
              <ul className="mt-6 space-y-3 text-sm text-ink/75">
                {[
                  "Documentari d’autore, gallery e audio-guide",
                  "Inchieste rigorose e prese di posizione",
                  "Mappe, itinerari e cronache seriali",
                  "Archivi vivi e kit didattici per le scuole",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative bg-ink p-8 text-ivory sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgba(227,111,90,0.35),transparent_60%)]"
              />
              <p className="eyebrow relative flex items-center gap-2 text-white/55">
                <Handshake className="h-4 w-4" /> Cosa ottiene il partner
              </p>
              <p className="relative mt-3 font-display text-2xl leading-snug sm:text-3xl">Diffusione, impatto & KPI</p>
              <ul className="relative mt-6 space-y-3 text-sm text-white/80">
                {[
                  "Reach qualificata con CAC medio di €0,40",
                  "Accesso legittimato a database e CRM partner",
                  "Earned media fino a €420k per speciale",
                  "Dati zero-party e dashboard d’impatto",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-ivory shadow-[0_20px_50px_-15px_rgba(23,18,27,0.5)] ring-8 ring-ivory/40">
                <Layers className="h-6 w-6 text-crimson" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
