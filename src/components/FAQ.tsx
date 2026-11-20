import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Plus } from "lucide-react";
import { faqs } from "../data/content";
import { EASE } from "../lib/hooks";
import { SectionHeader } from "./ui";
import { cn } from "../utils/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="Domande frequenti"
            title={
              <span id="faq-title">
                Tutto ciò che serve <em className="text-crimson">per decidere</em>.
              </span>
            }
            lead="Acquisto, misurazione, privacy, tempi: le risposte alle domande che ci pongono più spesso fondazioni, brand, istituzioni e community."
          />
          <div className="mt-8 rounded-[24px] border border-ink/10 bg-white/60 p-6">
            <p className="font-semibold">Hai un caso specifico?</p>
            <p className="mt-1 text-sm text-ink/60">Il nostro team editoriale risponde entro 48 ore lavorative.</p>
            <a href="#contatti" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-crimson">
              <Mail className="h-4 w-4" /> Scrivici
            </a>
          </div>
        </div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={cn("text-lg font-medium leading-snug transition-colors", isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink")}>
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition duration-500",
                        isOpen ? "rotate-45 border-ink bg-ink text-ivory" : "border-ink/15 text-ink group-hover:border-ink/40",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-ink/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
