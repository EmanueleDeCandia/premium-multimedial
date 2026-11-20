import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { stakeholders } from "../data/content";
import { useApp } from "../context";
import { Logo, WindowGlyph } from "./ui";

export function Footer() {
  const { openReader } = useApp();
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) setOk(true);
  };

  const cols = [
    {
      title: "L’opera",
      links: [
        { label: "Edizione integrale", action: () => openReader("integrale") },
        { label: "13 moduli", href: "#moduli" },
        { label: "Mappa dell’ecosistema", href: "#ecosistema" },
        { label: "Motori di diffusione", href: "#motori" },
      ],
    },
    {
      title: "Stakeholder",
      links: stakeholders.map((s) => ({ label: s.label, action: () => openReader(s.id) })),
    },
    {
      title: "Risorse",
      links: [
        { label: "Metriche d’impatto", href: "#impatto" },
        { label: "Pacchetti", href: "#prezzi" },
        { label: "Domande frequenti", href: "#faq" },
        { label: "Contatti", href: "#contatti" },
      ],
    },
  ];

  return (
    <footer className="relative bg-ink pb-10 pt-20 text-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              <span className="font-display text-base italic text-white/85">Finestre sulla Danza</span> — il libro multimediale che
              trasforma un’opera editoriale d’autore in un ecosistema di valore culturale, economico e civico.
            </p>
            <form onSubmit={subscribe} className="mt-7 max-w-sm" aria-label="Iscrizione alle Cronache del Movimento">
              <label htmlFor="newsletter" className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Cronache del Movimento · una puntata al mese
              </label>
              <div className="mt-3 flex gap-2 rounded-full border border-white/15 bg-white/[0.05] p-1.5 focus-within:border-white/40">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setOk(false);
                  }}
                  placeholder="La tua email"
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ivory outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  aria-label="Iscriviti"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory text-ink transition hover:scale-105"
                >
                  <AnimatePresence mode="wait">
                    {ok ? (
                      <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Check className="h-4 w-4" />
                      </motion.span>
                    ) : (
                      <motion.span key="go" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="mt-2 h-4 text-xs text-[#9CC3B0]" aria-live="polite">
                {ok ? "Iscrizione confermata: la prossima puntata arriverà nella tua casella." : ""}
              </p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {"href" in l && l.href ? (
                        <a href={l.href} className="text-sm text-white/70 transition hover:text-white">
                          {l.label}
                        </a>
                      ) : (
                        <button onClick={"action" in l ? l.action : undefined} className="text-left text-sm text-white/70 transition hover:text-white">
                          {l.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-end gap-2 overflow-hidden" aria-hidden>
          {stakeholders.concat(stakeholders).map((s, i) => (
            <span key={i} className="grid h-10 flex-1 place-items-center rounded-t-xl" style={{ background: s.color, opacity: 0.9 - (i % 5) * 0.08 }}>
              <WindowGlyph kind={s.kind} className="h-6 w-6" frame={s.ink} glass={s.color} />
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Innovation Multimedial · Tutti i diritti riservati · P.IVA 00000000000</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#faq" className="hover:text-white">Privacy & GDPR</a>
            <a href="#faq" className="hover:text-white">Accessibilità</a>
            <a href="#faq" className="hover:text-white">Cookie</a>
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-white/60">Powered by Innovation Multimedial</span>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-[11px] leading-relaxed text-white/30">
          I valori indicati sono target di progetto a 12–24 mesi con baseline stimate; nomi della rete e testimonianze sono illustrativi
          del programma pilota. Foto e video: Pexels.
        </p>
      </div>
    </footer>
  );
}
