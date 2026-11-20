import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Play } from "lucide-react";
import { stakeholderById, stakeholders, type StakeholderId } from "../data/content";
import { useApp } from "../context";
import { EASE } from "../lib/hooks";
import { WindowArt } from "./Windows";
import { WindowGlyph } from "./ui";
import { cn } from "../utils/cn";

const steps = [
  { n: "01", t: "Scegli la tua finestra", d: "Profilo, obiettivi e territorio: selezioniamo moduli e motori pertinenti." },
  { n: "02", t: "Co-progettiamo l’edizione", d: "Dal brief alla pubblicazione in 8–12 settimane, con firme indipendenti." },
  { n: "03", t: "Diffondiamo e misuriamo", d: "Dashboard in tempo reale e report d’impatto trimestrale sui KPI concordati." },
];

export function CTA() {
  const { proposal, openReader } = useApp();
  const [profile, setProfile] = useState<StakeholderId>("fondazioni");
  const [topic, setTopic] = useState("");
  const [form, setForm] = useState({ name: "", org: "", email: "", consent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!proposal.nonce) return;
    if (proposal.profile) setProfile(proposal.profile);
    setTopic(proposal.plan ?? "");
    setStatus("idle");
  }, [proposal]);

  const s = stakeholderById[profile];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.org.trim()) return setError("Inserisci nome e organizzazione.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) return setError("Inserisci un indirizzo email valido.");
    if (!form.consent) return setError("È necessario accettare l’informativa privacy.");
    setError("");
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  const field =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-ivory placeholder:text-white/35 outline-none transition focus:border-white/50 focus:bg-white/10";

  return (
    <section id="contatti" aria-labelledby="cta-title" className="relative px-3 py-16 sm:px-5 sm:py-24">
      <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-ink text-ivory">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -left-20 -top-32 h-[34rem] w-[34rem] rounded-full blur-3xl"
            animate={{ background: `radial-gradient(closest-side, ${s.color}66, transparent)` }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(227,111,90,0.28),transparent)]" />
        </div>

        <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:p-16">
          <div>
            <p className="eyebrow flex items-center gap-2 text-[#F4977F]">
              <span className="h-px w-6 bg-[#F4977F]/60" aria-hidden /> Inizia ora
            </p>
            <h2 id="cta-title" className="mt-4 text-balance font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem]">
              Apri la tua finestra <em className="text-[#F4977F]">sull’ecosistema</em>.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/65">
              Raccontaci chi sei: in 48 ore riceverai un’edizione dimostrativa con capitoli, motori e KPI selezionati per il tuo profilo.
            </p>
            <ol className="mt-10 space-y-5">
              {steps.map((st) => (
                <li key={st.n} className="flex gap-4">
                  <span className="font-mono text-sm text-[#F4977F]">{st.n}</span>
                  <span>
                    <span className="block font-semibold">{st.t}</span>
                    <span className="block text-sm text-white/55">{st.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10 hidden items-end gap-3 sm:flex" aria-hidden>
              {stakeholders.map((x) => (
                <motion.div
                  key={x.id}
                  animate={{ y: x.id === profile ? -10 : 0, opacity: x.id === profile ? 1 : 0.55 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={cn("win-tile aspect-square w-16 overflow-hidden rounded-2xl", x.id === profile && "win-open")}
                  style={{ background: x.color }}
                >
                  <WindowArt kind={x.kind} className="h-full w-full" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-dark rounded-[28px] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-10 text-center"
                  role="status"
                >
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
                    <CheckCircle2 className="h-16 w-16 text-[#9CC3B0]" />
                  </motion.span>
                  <p className="mt-6 font-display text-3xl">Grazie, {form.name.split(" ")[0]}.</p>
                  <p className="mt-3 max-w-sm text-white/65">
                    Ti invieremo entro 48 ore l’edizione dimostrativa dedicata a <strong className="text-white">{s.label}</strong>
                    {topic ? ` (${topic})` : ""}.
                  </p>
                  <button onClick={() => openReader(profile)} className="btn btn-light mt-8">
                    <Play className="h-4 w-4" fill="currentColor" /> Intanto, apri la tua edizione
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-5">
                  <fieldset>
                    <legend className="text-sm font-semibold">Chi sei?</legend>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {stakeholders.map((x) => {
                        const on = x.id === profile;
                        return (
                          <label
                            key={x.id}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition",
                              on ? "border-transparent" : "border-white/12 text-white/70 hover:border-white/30",
                            )}
                            style={on ? { background: x.color, color: x.ink } : undefined}
                          >
                            <input
                              type="radio"
                              name="profilo"
                              value={x.id}
                              checked={on}
                              onChange={() => setProfile(x.id)}
                              className="sr-only"
                            />
                            <WindowGlyph kind={x.kind} className="h-4 w-4 shrink-0" frame={on ? x.ink : x.accent} glass={on ? x.color : "#17121B"} />
                            <span className="leading-tight">{x.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-white/60">Nome e cognome</span>
                      <input
                        className={field}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        autoComplete="name"
                        placeholder="Elena Marchetti"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-white/60">Organizzazione</span>
                      <input
                        className={field}
                        value={form.org}
                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                        autoComplete="organization"
                        placeholder="Fondazione, ente, azienda…"
                        required
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-white/60">Email di lavoro</span>
                    <input
                      type="email"
                      className={field}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      autoComplete="email"
                      placeholder="nome@organizzazione.it"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-white/60">Interesse (facoltativo)</span>
                    <input
                      className={field}
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Es. Istituzionale, modulo 4.2, edizione territoriale…"
                    />
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/60">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#F4977F]"
                    />
                    Acconsento al trattamento dei dati per ricevere l’edizione dimostrativa, nel rispetto del GDPR. Nessuno spam, mai.
                  </label>
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="alert"
                        className="rounded-lg bg-coral/15 px-3 py-2 text-xs text-[#F7B3A5]"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <button type="submit" disabled={status === "sending"} className="btn btn-light w-full disabled:opacity-70">
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Invio in corso…
                      </>
                    ) : (
                      <>
                        Richiedi l’edizione dimostrativa <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
