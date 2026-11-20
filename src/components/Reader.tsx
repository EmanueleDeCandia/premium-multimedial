import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Film,
  Headphones,
  Heart,
  Images,
  ListChecks,
  Lock,
  Map as MapIcon,
  Maximize2,
  Pause,
  Play,
  Send,
  Sparkles,
  Unlock,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  engineById,
  formatNumber,
  getEdition,
  moduleById,
  photo,
  primaryStakeholder,
  type EditionId,
  type Kpi,
  type MediaKind,
  type Module,
} from "../data/content";
import { useApp } from "../context";
import { EASE, useCountUp } from "../lib/hooks";
import { WindowGlyph } from "./ui";
import { cn } from "../utils/cn";

const mediaIcon: Record<MediaKind, typeof Film> = {
  video: Film,
  gallery: Images,
  audio: Headphones,
  map: MapIcon,
  text: FileText,
  quiz: ListChecks,
};

type View = "lettore" | "partner";
type Tab = "video" | "gallery" | "audio";

const fmtTime = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export function Reader({
  state,
  onClose,
}: {
  state: { edition: EditionId; moduleId?: string };
  onClose: () => void;
}) {
  const { requestProposal } = useApp();
  const edition = getEdition(state.edition);
  const [moduleId, setModuleId] = useState(
    state.moduleId && edition.modules.includes(state.moduleId) ? state.moduleId : edition.modules[0],
  );
  const [view, setView] = useState<View>("lettore");
  const [tab, setTab] = useState<Tab>("video");
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const m = moduleById[moduleId];
  const idx = edition.modules.indexOf(moduleId);
  const accent = edition.accent;

  // blocco scroll + gestione focus
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => dialogRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, []);

  // ESC + focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const go = (id: string) => {
    setModuleId(id);
    setTab("video");
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activate = () => {
    onClose();
    requestProposal(edition.stakeholder ?? primaryStakeholder(m.id)?.id, `Modulo ${m.id} · ${m.short}`);
  };

  const prev = idx > 0 ? moduleById[edition.modules[idx - 1]] : null;
  const next = idx < edition.modules.length - 1 ? moduleById[edition.modules[idx + 1]] : null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-ink/75 backdrop-blur-md" onClick={onClose} aria-hidden />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reader-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden bg-night text-ivory shadow-2xl outline-none ring-1 ring-white/10 sm:h-[92vh] sm:rounded-[30px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-35"
          style={{ background: `radial-gradient(55% 100% at 18% 0%, ${edition.color}, transparent 70%)` }}
        />

        {/* Header */}
        <header className="relative flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: edition.color }}>
            <WindowGlyph kind={edition.kind} className="h-7 w-7" frame={edition.ink} glass={edition.color} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10.5px] uppercase tracking-[0.2em] text-white/50">
              Finestre sulla Danza · versione multimediale
            </p>
            <h2 id="reader-title" className="truncate font-display text-lg sm:text-xl">
              {edition.title}
              <span className="hidden text-white/45 md:inline"> — {edition.subtitle}</span>
            </h2>
          </div>
          <ViewToggle view={view} setView={setView} layoutKey="desk" className="hidden sm:flex" />
          <button
            onClick={onClose}
            aria-label="Chiudi l’opera multimediale"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="relative flex min-h-0 flex-1">
          {/* Indice capitoli */}
          <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-white/10 p-4 md:block" aria-label="Capitoli">
            <p className="px-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Capitoli · {edition.modules.length}
            </p>
            <ol className="mt-3 space-y-1">
              {edition.modules.map((id) => {
                const mm = moduleById[id];
                const active = id === moduleId;
                return (
                  <li key={id}>
                    <button
                      onClick={() => go(id)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "relative w-full rounded-xl px-3 py-2.5 text-left transition",
                        active ? "bg-white/10" : "hover:bg-white/5",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="chapter-indicator"
                          className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full"
                          style={{ background: accent }}
                        />
                      )}
                      <span className="block font-mono text-[10.5px] text-white/45">
                        {mm.id} · {mm.domain === "A" ? "Pilastro" : "Estensione"}
                      </span>
                      <span className={cn("mt-0.5 block text-sm leading-snug", active ? "text-white" : "text-white/75")}>
                        {mm.editorialTitle}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/55">
              <p className="font-semibold text-white/80">Editorial First, Business by Design</p>
              <p className="mt-1.5">
                Sponsor ed enti sono mecenati dell’opera, mai protagonisti della narrazione. Passa alla{" "}
                <button className="underline decoration-white/30 underline-offset-2 hover:text-white" onClick={() => setView("partner")}>
                  vista partner
                </button>{" "}
                per leggere diffusione e KPI.
              </p>
            </div>
          </aside>

          {/* Contenuto */}
          <div ref={scrollRef} className="min-w-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="sticky top-0 z-10 space-y-3 border-b border-white/10 bg-night/90 px-4 py-3 backdrop-blur md:hidden">
              <ViewToggle view={view} setView={setView} layoutKey="mob" className="flex w-full" />
              <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
                {edition.modules.map((id) => (
                  <button
                    key={id}
                    onClick={() => go(id)}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1.5 text-xs transition",
                      id === moduleId ? "border-white/60 bg-white text-ink" : "border-white/15 text-white/75",
                    )}
                  >
                    {id} · {moduleById[id].short}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${moduleId}-${view}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-9"
              >
                {view === "lettore" ? (
                  <ReaderView m={m} tab={tab} setTab={setTab} accent={accent} />
                ) : (
                  <PartnerView m={m} accent={accent} onActivate={activate} />
                )}

                <nav className="mt-12 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2" aria-label="Navigazione capitoli">
                  {prev ? (
                    <button
                      onClick={() => go(prev.id)}
                      className="group rounded-2xl border border-white/10 p-4 text-left transition hover:border-white/25 hover:bg-white/[0.03]"
                    >
                      <span className="flex items-center gap-1.5 text-xs text-white/50">
                        <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" /> Capitolo precedente
                      </span>
                      <span className="mt-1 block text-sm text-white/85">
                        {prev.id} · {prev.editorialTitle}
                      </span>
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  {next && (
                    <button
                      onClick={() => go(next.id)}
                      className="group rounded-2xl border border-white/10 p-4 text-right transition hover:border-white/25 hover:bg-white/[0.03]"
                    >
                      <span className="flex items-center justify-end gap-1.5 text-xs text-white/50">
                        Capitolo successivo <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1 block text-sm text-white/85">
                        {next.id} · {next.editorialTitle}
                      </span>
                    </button>
                  )}
                </nav>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ViewToggle({
  view,
  setView,
  layoutKey,
  className,
}: {
  view: View;
  setView: (v: View) => void;
  layoutKey: string;
  className?: string;
}) {
  return (
    <div role="group" aria-label="Prospettiva di lettura" className={cn("relative rounded-full bg-white/10 p-1", className)}>
      {(["lettore", "partner"] as const).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          aria-pressed={view === v}
          className="relative flex-1 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold"
        >
          {view === v && (
            <motion.span
              layoutId={`view-pill-${layoutKey}`}
              className="absolute inset-0 rounded-full bg-ivory"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          <span className={cn("relative transition-colors", view === v ? "text-ink" : "text-white/70")}>
            {v === "lettore" ? "Vista lettore" : "Vista partner"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ---------------------------- Vista lettore ---------------------------- */

function ReaderView({ m, tab, setTab, accent }: { m: Module; tab: Tab; setTab: (t: Tab) => void; accent: string }) {
  const tabs: { id: Tab; label: string; icon: typeof Film }[] = [
    { id: "video", label: "Documentario", icon: Film },
    { id: "gallery", label: "Galleria", icon: Images },
    { id: "audio", label: "Audio-guida", icon: Headphones },
  ];
  return (
    <article>
      <p className="font-mono text-xs text-white/50">
        Capitolo {m.id} · {m.domain === "A" ? "Pilastro fondamentale" : "Estensione modulare"}
      </p>
      <h3 className="mt-2 text-balance font-display text-3xl leading-[1.08] sm:text-[2.6rem]">{m.editorialTitle}</h3>

      <div role="tablist" aria-label="Formati multimediali" className="mt-6 inline-flex rounded-full bg-white/[0.06] p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className="relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold sm:text-sm"
          >
            {tab === t.id && (
              <motion.span layoutId="media-tab" className="absolute inset-0 rounded-full bg-white/12 ring-1 ring-white/15" />
            )}
            <t.icon className="relative h-4 w-4" style={{ color: tab === t.id ? accent : undefined }} />
            <span className={cn("relative", tab === t.id ? "text-white" : "text-white/60")}>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4" role="tabpanel">
        {tab === "video" && <VideoPlayer m={m} accent={accent} />}
        {tab === "gallery" && <Gallery m={m} />}
        {tab === "audio" && <AudioGuide m={m} accent={accent} />}
      </div>

      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_250px]">
        <div>
          <p className="eyebrow" style={{ color: accent }}>
            Valore editoriale · cosa legge e vive il pubblico
          </p>
          <p className="mt-4 text-pretty text-[1.07rem] leading-relaxed text-white/85 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-[3.6rem] first-letter:leading-[0.8]">
            {m.editorial}
          </p>
          <p className="mt-5 border-l-2 pl-4 font-display text-lg italic text-white/70" style={{ borderColor: accent }}>
            {m.claim}
          </p>
        </div>
        <aside>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/45">Nel capitolo</p>
          <ul className="mt-3 space-y-2">
            {m.media.map((md) => {
              const Icon = mediaIcon[md.kind];
              return (
                <li key={md.label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                  <span className="min-w-0">
                    <span className="block text-sm leading-snug text-white/85">{md.label}</span>
                    <span className="text-xs text-white/45">{md.meta}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <DirectorsCut accent={accent} key={m.id} />
    </article>
  );
}

function VideoPlayer({ m, accent }: { m: Module; accent: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [cc, setCc] = useState(true);
  const [cap, setCap] = useState(0);
  const [time, setTime] = useState({ cur: 0, dur: 0 });
  const progress = time.dur ? time.cur / time.dur : 0;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    p?.then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [m.id]);

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => setCap((c) => (c + 1) % m.captions.length), 4200);
    return () => window.clearInterval(t);
  }, [playing, m.captions.length]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const videoLabel = m.media.find((x) => x.kind === "video");

  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
      <video
        ref={ref}
        key={m.video.src}
        className="absolute inset-0 h-full w-full object-cover"
        src={m.video.src}
        poster={m.video.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => setReady(true)}
        onTimeUpdate={(e) => setTime({ cur: e.currentTarget.currentTime, dur: e.currentTarget.duration || 0 })}
        aria-label={`Trailer del capitolo ${m.id}: ${m.editorialTitle}`}
      />
      {!ready && (
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.07)_50%,transparent_70%)] bg-[length:200%_100%]" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/45" />

      <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
        <span className="rounded-full bg-black/55 px-2.5 py-1 text-[10.5px] font-bold tracking-wide backdrop-blur">4K · TRAILER</span>
        {videoLabel && (
          <span className="hidden rounded-full bg-white/15 px-2.5 py-1 text-[11px] backdrop-blur sm:inline">
            {videoLabel.label} · {videoLabel.meta}
          </span>
        )}
      </div>

      <AnimatePresence>
        {!playing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggle}
            aria-label="Riproduci il trailer"
            className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition hover:scale-105"
          >
            <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>

      {cc && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 px-4 text-center sm:bottom-16" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${m.id}-${cap}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45 }}
              className="mx-auto inline-block max-w-xl rounded-lg bg-black/55 px-3 py-1.5 font-display text-sm italic backdrop-blur sm:text-lg"
            >
              {m.captions[cap]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 px-3 pb-3 sm:gap-3 sm:px-4">
        <button onClick={toggle} aria-label={playing ? "Pausa" : "Riproduci"} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15">
          {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4" fill="currentColor" />}
        </button>
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(progress * 1000)}
          onChange={(e) => {
            const v = ref.current;
            if (v && v.duration) v.currentTime = (Number(e.target.value) / 1000) * v.duration;
          }}
          aria-label="Avanzamento del trailer"
          className="range min-w-0 flex-1"
          style={{ "--p": `${progress * 100}%`, "--accent": accent } as CSSProperties}
        />
        <span className="hidden font-mono text-[11px] tabular-nums text-white/80 sm:inline">
          {fmtTime(time.cur)} / {fmtTime(time.dur)}
        </span>
        <button
          onClick={() => setCc((c) => !c)}
          aria-pressed={cc}
          aria-label="Sottotitoli"
          className={cn("rounded border px-1 text-[10px] font-bold leading-4", cc ? "border-white bg-white text-ink" : "border-white/60 text-white")}
        >
          CC
        </button>
        <button
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            v.muted = !v.muted;
            setMuted(v.muted);
          }}
          aria-label={muted ? "Attiva l’audio" : "Disattiva l’audio"}
          className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <button
          onClick={() => void ref.current?.requestFullscreen?.()}
          aria-label="Schermo intero"
          className="hidden h-8 w-8 place-items-center rounded-full hover:bg-white/15 sm:grid"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Gallery({ m }: { m: Module }) {
  const [i, setI] = useState(0);
  const shot = m.gallery[i];
  const n = m.gallery.length;
  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
        <AnimatePresence initial={false}>
          <motion.img
            key={shot.id}
            src={photo(shot.id)}
            alt={shot.caption}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <p className="absolute bottom-4 left-4 right-20 font-display text-base italic sm:text-lg">{shot.caption}</p>
        <span className="absolute right-4 top-4 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] backdrop-blur">
          {i + 1} / {n}
        </span>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={() => setI((i - 1 + n) % n)}
            aria-label="Immagine precedente"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setI((i + 1) % n)}
            aria-label="Immagine successiva"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {m.gallery.map((g, j) => (
          <button
            key={g.id}
            onClick={() => setI(j)}
            aria-label={`Mostra: ${g.caption}`}
            aria-current={j === i ? "true" : undefined}
            className={cn(
              "aspect-[16/10] overflow-hidden rounded-xl ring-2 transition",
              j === i ? "ring-white" : "opacity-55 ring-transparent hover:opacity-100",
            )}
          >
            <img src={photo(g.id, 480, 300)} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function AudioGuide({ m, accent }: { m: Module; accent: string }) {
  const text = m.editorial;
  const [playing, setPlaying] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const started = useRef(0);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const words = useMemo(() => {
    let off = 0;
    return text.split(" ").map((w) => {
      const o = off;
      off += w.length + 1;
      return { w, o };
    });
  }, [text]);

  const bars = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => 0.22 + 0.78 * Math.abs(Math.sin(i * 1.7 + m.id.charCodeAt(2)) * Math.cos(i * 0.37))),
    [m.id],
  );

  const stop = () => {
    if (supported) window.speechSynthesis.cancel();
    window.clearInterval(timer.current);
    setPlaying(false);
  };

  useEffect(() => () => stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const play = () => {
    stop();
    setCharIdx(0);
    started.current = performance.now();
    if (supported) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "it-IT";
      u.rate = 0.97;
      const voice = window.speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith("it"));
      if (voice) u.voice = voice;
      u.onboundary = (e) => setCharIdx((c) => Math.max(c, e.charIndex));
      u.onend = () => {
        window.clearInterval(timer.current);
        setPlaying(false);
        setCharIdx(text.length);
      };
      window.speechSynthesis.speak(u);
    }
    setPlaying(true);
    // stima di avanzamento (fallback se il motore vocale non emette eventi di confine)
    timer.current = window.setInterval(() => {
      const est = ((performance.now() - started.current) / 1000) * 14.5;
      setCharIdx((c) => {
        const nextVal = Math.min(text.length, Math.max(c, est));
        if (nextVal >= text.length && !supported) {
          window.clearInterval(timer.current);
          setPlaying(false);
        }
        return nextVal;
      });
    }, 200);
  };

  const progress = Math.min(1, charIdx / text.length);
  const totalSec = Math.round(text.length / 14.5);

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 ring-1 ring-white/10 sm:p-6">
      <div className="flex items-center gap-4">
        <button
          onClick={playing ? stop : play}
          aria-label={playing ? "Interrompi l’audio-guida" : "Ascolta l’audio-guida"}
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-ink shadow-lg transition hover:scale-105"
          style={{ background: accent }}
        >
          {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />}
        </button>
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/50">Audio-guida d’autore · anteprima</p>
          <p className="truncate font-display text-lg sm:text-xl">{m.editorialTitle}</p>
          <p className="text-xs text-white/45">
            {fmtTime(progress * totalSec)} / {fmtTime(totalSec)} · {supported ? "sintesi vocale in italiano" : "trascrizione sincronizzata"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex h-16 items-end gap-[3px]" aria-hidden>
        {bars.map((h, i) => {
          const done = i / bars.length < progress;
          return (
            <span
              key={i}
              className={cn("flex-1 rounded-full", playing && "eq")}
              style={{
                height: `${h * 100}%`,
                background: done ? accent : "rgba(255,255,255,0.18)",
                animationDelay: `${(i % 9) * -0.12}s`,
                transition: "background-color .3s",
              }}
            />
          );
        })}
      </div>

      <p className="mt-6 text-pretty text-[0.98rem] leading-relaxed" aria-label="Trascrizione">
        {words.map(({ w, o }, i) => (
          <span key={i} className="transition-colors duration-300" style={{ color: o < charIdx ? "#fff" : "rgba(255,255,255,0.38)" }}>
            {w}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}

function DirectorsCut({ accent }: { accent: string }) {
  const [invites, setInvites] = useState(0);
  const [donated, setDonated] = useState(false);
  const unlocked = invites >= 3 || donated;
  return (
    <section
      className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5 sm:p-6"
      aria-label="Director’s Cut"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
            {unlocked ? <Unlock className="h-5 w-5" style={{ color: accent }} /> : <Lock className="h-5 w-5 text-white/70" />}
          </span>
          <div>
            <p className="font-semibold">Director’s Cut del capitolo</p>
            <p className="mt-0.5 text-sm text-white/60">Masterclass integrale, backstage dello spettacolo e partiture coreografiche.</p>
            <div className="mt-3 flex items-center gap-1.5" aria-label={`${Math.min(invites, 3)} inviti su 3`}>
              {[0, 1, 2].map((k) => (
                <motion.span
                  key={k}
                  animate={{ scale: invites > k || donated ? 1 : 0.85 }}
                  className="h-1.5 w-10 rounded-full"
                  style={{ background: invites > k || donated ? accent : "rgba(255,255,255,0.15)" }}
                />
              ))}
              <span className="ml-2 text-xs text-white/50">{donated ? "sbloccato con donazione" : `${Math.min(invites, 3)}/3 inviti`}</span>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {unlocked ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink"
            >
              <Sparkles className="h-4 w-4" /> Contenuto sbloccato
            </motion.div>
          ) : (
            <motion.div key="cta" exit={{ opacity: 0 }} className="flex flex-wrap gap-2">
              <button
                onClick={() => setInvites((n) => n + 1)}
                className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
                style={{ background: accent }}
              >
                <Send className="h-4 w-4" /> Invita un collega
              </button>
              <button
                onClick={() => setDonated(true)}
                className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
              >
                <Heart className="h-4 w-4" /> Dona €2 per le borse
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-white/40">
        Motore 5.6 · Peer-to-peer unlock: lo sblocco premia la condivisione con valore editoriale, mai con sconti commerciali.
      </p>
    </section>
  );
}

/* ---------------------------- Vista partner ---------------------------- */

function KpiCard({ k, accent }: { k: Kpi; accent: string }) {
  const v = useCountUp(k.value, true, 1400);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm text-white/65">{k.label}</p>
      <p className="mt-2 font-display text-4xl tabular-nums sm:text-[2.8rem]" style={{ color: accent }}>
        {k.prefix}
        {formatNumber(v, k.decimals ?? 0)}
        {k.suffix}
      </p>
      {k.extra && <p className="mt-1 text-sm text-white/75">{k.extra}</p>}
      <div className="relative mt-4 h-1.5 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent }}
          initial={{ width: 0 }}
          animate={{ width: `${k.ratio * 100}%` }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
        />
        {k.baseRatio !== undefined && (
          <span
            className="absolute top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded bg-white/80"
            style={{ left: `${k.baseRatio * 100}%` }}
            title="Baseline di riferimento"
          />
        )}
      </div>
      <p className="mt-3 text-xs text-white/45">{k.baseline}</p>
      <p className="mt-2 text-xs leading-relaxed text-white/60">{k.desc}</p>
    </div>
  );
}

function PartnerView({ m, accent, onActivate }: { m: Module; accent: string; onActivate: () => void }) {
  const es = m.engines.map((id) => engineById[id]);
  return (
    <article>
      <p className="eyebrow" style={{ color: accent }}>
        Cosa ottiene il partner · diffusione, impatto & KPI
      </p>
      <h3 className="mt-3 text-balance font-display text-3xl leading-[1.1] sm:text-[2.4rem]">{m.title}</h3>
      <p className="mt-3 text-white/65">{m.claim}</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {m.kpis.map((k) => (
          <KpiCard key={k.label} k={k} accent={accent} />
        ))}
      </div>
      <p className="mt-2 text-[11px] text-white/40">Valori target a 12–24 mesi · il marcatore bianco indica la baseline di riferimento.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/55">Come lo realizziamo</h4>
          <ol className="mt-4 space-y-4">
            {m.activities.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold text-ink"
                  style={{ background: accent }}
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-white/80">{a}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/55">Benefici</h4>
          <ul className="mt-4 space-y-3">
            {m.benefits.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/55">Motori di diffusione dominanti</h4>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {es.map((e, i) => (
            <div key={e.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold">{e.id}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white/70">
                  {i === 0 ? "Primario" : "Secondario"}
                </span>
              </div>
              <p className="mt-2 font-semibold leading-snug">{e.name}</p>
              <p className="mt-1.5 text-sm text-white/60">{e.how}</p>
              <div className="mt-4 flex gap-6">
                {e.kpis.map((k) => (
                  <div key={k.label}>
                    <p className="font-display text-xl text-gold">{k.value}</p>
                    <p className="text-[11px] text-white/50">{k.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-white/60">
          Leva psicologica e relazionale: <span className="font-semibold text-white">{m.lever}</span>
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={onActivate} className="btn btn-light">
          Attiva questo modulo <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
