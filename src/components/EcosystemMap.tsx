import { useMemo, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MousePointerClick, RotateCcw } from "lucide-react";
import {
  MAP_COLORS,
  engineById,
  engines,
  formatKpi,
  moduleById,
  modules,
  modulesForEngine,
  stakeholderById,
  stakeholders,
  stakeholdersForEngine,
  stakeholdersForModule,
  type StakeholderId,
} from "../data/content";
import { useApp } from "../context";
import { useMediaQuery } from "../lib/hooks";
import { SectionHeader, WindowGlyph, hexA } from "./ui";
import { cn } from "../utils/cn";

type Focus =
  | { type: "core" }
  | { type: "module"; id: string }
  | { type: "engine"; id: string }
  | { type: "stakeholder"; id: StakeholderId };

interface Box {
  x: number;
  w: number;
  h: number;
  y: (i: number) => number;
}
interface Layout {
  w: number;
  h: number;
  compact: boolean;
  headerY: number;
  core: { x: number; y: number; w: number; h: number };
  mod: Box;
  eng: Box;
  st: Box;
}

const DESKTOP: Layout = {
  w: 1000,
  h: 730,
  compact: false,
  headerY: 22,
  core: { x: 12, y: 280, w: 134, h: 170 },
  mod: { x: 214, w: 226, h: 34, y: (i) => 50 + i * 49 + (i >= 6 ? 24 : 0) },
  eng: { x: 530, w: 196, h: 46, y: (j) => 104 + j * 84 },
  st: { x: 806, w: 184, h: 72, y: (k) => 92 + k * 124 },
};

const COMPACT: Layout = {
  w: 360,
  h: 640,
  compact: true,
  headerY: 16,
  core: { x: 4, y: 222, w: 40, h: 200 },
  mod: { x: 70, w: 62, h: 30, y: (i) => 38 + i * 44 + (i >= 6 ? 14 : 0) },
  eng: { x: 174, w: 58, h: 34, y: (j) => 104 + j * 70 },
  st: { x: 270, w: 86, h: 56, y: (k) => 96 + k * 102 },
};

const engIndex: Record<string, number> = Object.fromEntries(engines.map((e, j) => [e.id, j]));
const TEXT = "#F3EEE6";

const keyOf = (f: Focus | null) => (f ? (f.type === "core" ? "core" : `${f.type}-${f.id}`) : "none");

function computeHighlight(f: Focus | null) {
  if (!f || f.type === "core") return null;
  const mods = new Set<string>();
  const engs = new Set<string>();
  const sts = new Set<string>();
  const links = new Set<string>();
  if (f.type === "stakeholder") {
    const s = stakeholderById[f.id];
    sts.add(s.id);
    s.modules.forEach((m) => {
      mods.add(m);
      links.add(`c-${m}`);
      moduleById[m].engines.forEach((e) => s.engines.includes(e) && links.add(`${m}-${e}`));
    });
    s.engines.forEach((e) => {
      engs.add(e);
      links.add(`${e}-${s.id}`);
    });
  } else if (f.type === "module") {
    const m = moduleById[f.id];
    mods.add(m.id);
    links.add(`c-${m.id}`);
    m.engines.forEach((e) => {
      engs.add(e);
      links.add(`${m.id}-${e}`);
    });
    stakeholdersForModule(m.id).forEach((s) => {
      sts.add(s.id);
      m.engines.forEach((e) => s.engines.includes(e) && links.add(`${e}-${s.id}`));
    });
  } else {
    engs.add(f.id);
    modulesForEngine(f.id).forEach((m) => {
      mods.add(m.id);
      links.add(`c-${m.id}`);
      links.add(`${m.id}-${f.id}`);
    });
    stakeholdersForEngine(f.id).forEach((s) => {
      sts.add(s.id);
      links.add(`${f.id}-${s.id}`);
    });
  }
  return { mods, engs, sts, links };
}

export function EcosystemMap() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const L = desktop ? DESKTOP : COMPACT;
  const [selected, setSelected] = useState<Focus | null>(null);
  const [hovered, setHovered] = useState<Focus | null>(null);
  const focus = hovered ?? selected;
  const hl = useMemo(() => computeHighlight(focus), [focus]);

  const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = (b.x - a.x) * 0.5;
    return `M${a.x},${a.y} C${a.x + dx},${a.y} ${b.x - dx},${b.y} ${b.x},${b.y}`;
  };

  const links = useMemo(() => {
    const arr: { key: string; d: string; color: string }[] = [];
    const modCY = (i: number) => L.mod.y(i) + L.mod.h / 2;
    const engCY = (j: number) => L.eng.y(j) + L.eng.h / 2;
    modules.forEach((m, i) =>
      arr.push({
        key: `c-${m.id}`,
        d: curve(
          { x: L.core.x + L.core.w, y: L.core.y + 18 + (i / 12) * (L.core.h - 36) },
          { x: L.mod.x, y: modCY(i) },
        ),
        color: MAP_COLORS[m.domain],
      }),
    );
    modules.forEach((m, i) =>
      m.engines.forEach((e) =>
        arr.push({
          key: `${m.id}-${e}`,
          d: curve({ x: L.mod.x + L.mod.w, y: modCY(i) }, { x: L.eng.x, y: engCY(engIndex[e]) }),
          color: MAP_COLORS.engine,
        }),
      ),
    );
    stakeholders.forEach((s, k) =>
      s.engines.forEach((e) =>
        arr.push({
          key: `${e}-${s.id}`,
          d: curve({ x: L.eng.x + L.eng.w, y: engCY(engIndex[e]) }, { x: L.st.x, y: L.st.y(k) + L.st.h / 2 }),
          color: s.accent,
        }),
      ),
    );
    return arr;
  }, [L]);

  const same = (a: Focus | null, b: Focus) => keyOf(a) === keyOf(b);

  const bind = (f: Focus, label: string) => ({
    role: "button",
    tabIndex: 0,
    "aria-label": label,
    "aria-pressed": same(selected, f),
    style: { cursor: "pointer", outline: "none" },
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setHovered(f),
    onPointerLeave: (e: PointerEvent) => e.pointerType === "mouse" && setHovered(null),
    onFocus: () => setHovered(f),
    onBlur: () => setHovered(null),
    onClick: () => setSelected((cur) => (same(cur, f) ? null : f)),
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setSelected((cur) => (same(cur, f) ? null : f));
      }
    },
  });

  const nodeOpacity = (on: boolean) => ({ opacity: hl && !on ? 0.16 : 1, transition: "opacity .45s ease" });

  const cx = L.core.x + L.core.w / 2;
  const cy = L.core.y + L.core.h / 2;

  const headers = L.compact
    ? [
        { x: cx, t: "L0" },
        { x: L.mod.x + L.mod.w / 2, t: "MODULI" },
        { x: L.eng.x + L.eng.w / 2, t: "MOTORI" },
        { x: L.st.x + L.st.w / 2, t: "TARGET" },
      ]
    : [
        { x: cx, t: "LIVELLO 0 · NUCLEO" },
        { x: L.mod.x + L.mod.w / 2, t: "LIVELLO 1 · 13 LINEE DI VALORIZZAZIONE" },
        { x: L.eng.x + L.eng.w / 2, t: "LIVELLO 2 · 7 MOTORI" },
        { x: L.st.x + L.st.w / 2, t: "LIVELLO 3 · 5 STAKEHOLDER" },
      ];

  const filterTo = (id: StakeholderId | null) => {
    setHovered(null);
    setSelected(id ? { type: "stakeholder", id } : null);
  };
  const activeFilter = selected?.type === "stakeholder" ? selected.id : null;

  const ordered = hl ? [...links.filter((l) => !hl.links.has(l.key)), ...links.filter((l) => hl.links.has(l.key))] : links;

  return (
    <section id="ecosistema" aria-labelledby="eco-title" className="relative overflow-hidden bg-night py-24 text-ivory sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(227,111,90,0.18),transparent)]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(156,195,176,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          dark
          eyebrow="Mappa interattiva dell’ecosistema"
          title={
            <span id="eco-title">
              Dal nucleo editoriale a ogni stakeholder, <em className="text-[#F4977F]">in quattro livelli</em>.
            </span>
          }
          lead="Seleziona il tuo profilo per evidenziare la filiera pertinente — Nucleo → Moduli → Motori → Stakeholder — oppure tocca un nodo per leggerne temi, meccaniche e KPI."
        />

        {/* Filtri */}
        <div role="group" aria-label="Filtra per interlocutore" className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => filterTo(null)}
            aria-pressed={!selected}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              !selected ? "border-white bg-white text-ink" : "border-white/15 text-white/75 hover:border-white/40 hover:text-white",
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Tutto l’ecosistema
          </button>
          {stakeholders.map((s) => {
            const on = activeFilter === s.id;
            return (
              <button
                key={s.id}
                onClick={() => filterTo(on ? null : s.id)}
                aria-pressed={on}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition",
                  on ? "text-ink" : "border-white/15 text-white/75 hover:border-white/40 hover:text-white",
                )}
                style={on ? { background: s.color, borderColor: s.color, color: s.ink } : undefined}
              >
                <span className="grid h-6 w-6 place-items-center rounded-md" style={{ background: s.color }}>
                  <WindowGlyph kind={s.kind} className="h-4 w-4" frame={s.ink} glass={s.color} />
                </span>
                {s.filterLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="glass-dark rounded-[28px] p-3 sm:p-5">
            <svg
              viewBox={`0 0 ${L.w} ${L.h}`}
              className={cn("block h-auto w-full", L.compact && "mx-auto max-w-[480px]")}
              role="group"
              aria-label="Mappa dell’ecosistema: nucleo, 13 moduli, 7 motori di diffusione e 5 stakeholder"
            >
              <defs>
                <linearGradient id="core-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F08C76" />
                  <stop offset="100%" stopColor="#A43A46" />
                </linearGradient>
              </defs>

              {headers.map((h) => (
                <text
                  key={h.t}
                  x={h.x}
                  y={L.headerY}
                  textAnchor="middle"
                  fontSize={L.compact ? 9 : 10}
                  fontWeight={700}
                  letterSpacing={L.compact ? 1.2 : 1.6}
                  fill="rgba(243,238,230,0.42)"
                >
                  {h.t}
                </text>
              ))}

              {!L.compact && (
                <>
                  <text
                    transform={`rotate(-90 ${L.mod.x - 16} ${(L.mod.y(0) + L.mod.y(5) + L.mod.h) / 2})`}
                    x={L.mod.x - 16}
                    y={(L.mod.y(0) + L.mod.y(5) + L.mod.h) / 2}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight={700}
                    letterSpacing="2"
                    fill={MAP_COLORS.A}
                    opacity="0.75"
                  >
                    A · 6 PILASTRI
                  </text>
                  <text
                    transform={`rotate(-90 ${L.mod.x - 16} ${(L.mod.y(6) + L.mod.y(12) + L.mod.h) / 2})`}
                    x={L.mod.x - 16}
                    y={(L.mod.y(6) + L.mod.y(12) + L.mod.h) / 2}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight={700}
                    letterSpacing="2"
                    fill={MAP_COLORS.B}
                    opacity="0.75"
                  >
                    B · 7 ESTENSIONI
                  </text>
                </>
              )}

              {/* Collegamenti */}
              <g fill="none" aria-hidden="true">
                {ordered.map((l) => {
                  const on = !!hl && hl.links.has(l.key);
                  return (
                    <path
                      key={l.key}
                      d={l.d}
                      stroke={l.color}
                      className={on ? "flow" : "flow-slow"}
                      style={{
                        strokeOpacity: on ? 0.95 : hl ? 0.05 : L.compact ? 0.36 : 0.24,
                        strokeWidth: on ? 1.9 : 1.1,
                        transition: "stroke-opacity .45s ease, stroke-width .45s ease",
                      }}
                    />
                  );
                })}
              </g>

              {/* Livello 0 · Nucleo */}
              <g id="core" data-level="0" {...bind({ type: "core" }, "Nucleo: il Libro Multimediale. Editorial First, Business by Design")}>
                <rect
                  x={L.core.x}
                  y={L.core.y}
                  width={L.core.w}
                  height={L.core.h}
                  rx={L.compact ? 20 : 30}
                  fill="none"
                  stroke="#F08C76"
                  strokeWidth="1.5"
                  className="animate-pulse-ring"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
                <rect
                  x={L.core.x}
                  y={L.core.y}
                  width={L.core.w}
                  height={L.core.h}
                  rx={L.compact ? 20 : 30}
                  fill="url(#core-grad)"
                  stroke={focus?.type === "core" ? "#fff" : "rgba(255,255,255,0.25)"}
                  strokeWidth={focus?.type === "core" ? 2 : 1}
                />
                {L.compact ? (
                  <text
                    transform={`rotate(-90 ${cx} ${cy})`}
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="11"
                    fontWeight={700}
                    letterSpacing="1.6"
                    fill="#fff"
                  >
                    IL LIBRO MULTIMEDIALE
                  </text>
                ) : (
                  <>
                    <text x={cx} y={cy - 36} textAnchor="middle" fontSize="9" fontWeight={700} letterSpacing="1.8" fill="rgba(255,255,255,0.75)">
                      NUCLEO
                    </text>
                    <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fill="#fff" fontFamily="Fraunces, serif">
                      Il Libro
                    </text>
                    <text x={cx} y={cy + 17} textAnchor="middle" fontSize="18" fill="#fff" fontFamily="Fraunces, serif" fontStyle="italic">
                      Multimediale
                    </text>
                    <text x={cx} y={cy + 44} textAnchor="middle" fontSize="9" fontWeight={600} letterSpacing="0.8" fill="rgba(255,255,255,0.8)">
                      EDITORIAL FIRST
                    </text>
                  </>
                )}
              </g>

              {/* Livello 1 · Moduli */}
              {modules.map((m, i) => {
                const y = L.mod.y(i);
                const color = MAP_COLORS[m.domain];
                const on = !hl || hl.mods.has(m.id);
                const emph = !!hl && hl.mods.has(m.id);
                const targets = stakeholdersForModule(m.id).map((s) => s.id);
                return (
                  <g
                    key={m.id}
                    id={`node-${m.id.replace(".", "-")}`}
                    data-level="1"
                    data-domain={m.domain}
                    data-engines={m.engines.join(",")}
                    data-targets={targets.join(",")}
                    {...bind({ type: "module", id: m.id }, `Modulo ${m.id}: ${m.title}`)}
                    style={{ ...bind({ type: "module", id: m.id }, "").style, ...nodeOpacity(on) }}
                  >
                    <rect
                      x={L.mod.x}
                      y={y}
                      width={L.mod.w}
                      height={L.mod.h}
                      rx={L.mod.h / 2}
                      fill={emph ? hexA(color, 0.2) : "rgba(255,255,255,0.035)"}
                      stroke={color}
                      strokeOpacity={emph ? 1 : 0.4}
                      strokeWidth={same(selected, { type: "module", id: m.id }) ? 2 : 1}
                    />
                    {L.compact ? (
                      <text x={L.mod.x + L.mod.w / 2} y={y + L.mod.h / 2} textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight={700} fill={TEXT}>
                        {m.id}
                      </text>
                    ) : (
                      <>
                        <circle cx={L.mod.x + 17} cy={y + L.mod.h / 2} r="12" fill={color} />
                        <text x={L.mod.x + 17} y={y + L.mod.h / 2} textAnchor="middle" dominantBaseline="central" fontSize="9.5" fontWeight={800} fill="#17121B">
                          {m.id}
                        </text>
                        <text x={L.mod.x + 37} y={y + L.mod.h / 2} dominantBaseline="central" fontSize="12.5" fontWeight={500} fill={TEXT}>
                          {m.short}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Livello 2 · Motori */}
              {engines.map((e, j) => {
                const y = L.eng.y(j);
                const on = !hl || hl.engs.has(e.id);
                const emph = !!hl && hl.engs.has(e.id);
                return (
                  <g
                    key={e.id}
                    id={`engine-${e.id.replace(".", "-")}`}
                    data-level="2"
                    data-modules={modulesForEngine(e.id).map((m) => m.id).join(",")}
                    data-targets={stakeholdersForEngine(e.id).map((s) => s.id).join(",")}
                    {...bind({ type: "engine", id: e.id }, `Motore ${e.id}: ${e.name}`)}
                    style={{ cursor: "pointer", outline: "none", ...nodeOpacity(on) }}
                  >
                    <rect
                      x={L.eng.x}
                      y={y}
                      width={L.eng.w}
                      height={L.eng.h}
                      rx="12"
                      fill={emph ? hexA(MAP_COLORS.engine, 0.2) : "rgba(255,255,255,0.035)"}
                      stroke={MAP_COLORS.engine}
                      strokeOpacity={emph ? 1 : 0.4}
                      strokeWidth={same(selected, { type: "engine", id: e.id }) ? 2 : 1}
                    />
                    {L.compact ? (
                      <text x={L.eng.x + L.eng.w / 2} y={y + L.eng.h / 2} textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight={700} fill={MAP_COLORS.engine}>
                        {e.id}
                      </text>
                    ) : (
                      <>
                        <text x={L.eng.x + 14} y={y + 20} fontSize="10.5" fontWeight={700} fill={MAP_COLORS.engine} fontFamily="JetBrains Mono, monospace">
                          {e.id}
                        </text>
                        <text x={L.eng.x + 48} y={y + 20} fontSize="13" fontWeight={600} fill={TEXT}>
                          {e.short}
                        </text>
                        <text x={L.eng.x + 48} y={y + 35} fontSize="10.5" fill="rgba(243,238,230,0.55)">
                          {e.mapTag}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Livello 3 · Stakeholder */}
              {stakeholders.map((s, k) => {
                const y = L.st.y(k);
                const scy = y + L.st.h / 2;
                const on = !hl || hl.sts.has(s.id);
                const emph = !!hl && hl.sts.has(s.id);
                return (
                  <g
                    key={s.id}
                    id={`stakeholder-${s.id}`}
                    data-level="3"
                    data-target={s.id}
                    data-modules={s.modules.join(",")}
                    data-engines={s.engines.join(",")}
                    {...bind({ type: "stakeholder", id: s.id }, `Stakeholder: ${s.label}`)}
                    style={{ cursor: "pointer", outline: "none", ...nodeOpacity(on) }}
                  >
                    <rect
                      x={L.st.x}
                      y={y}
                      width={L.st.w}
                      height={L.st.h}
                      rx={L.compact ? 14 : 18}
                      fill={hexA(s.color, emph ? 0.26 : 0.08)}
                      stroke={s.accent}
                      strokeOpacity={emph ? 1 : 0.45}
                      strokeWidth={activeFilter === s.id ? 2 : 1}
                    />
                    {L.compact ? (
                      <>
                        <text x={L.st.x + L.st.w / 2} y={scy - 6} textAnchor="middle" fontSize="10" fontWeight={700} fill={TEXT}>
                          {s.lines[0]}
                        </text>
                        <text x={L.st.x + L.st.w / 2} y={scy + 8} textAnchor="middle" fontSize="9.5" fill="rgba(243,238,230,0.65)">
                          {s.lines[1]}
                        </text>
                      </>
                    ) : (
                      <>
                        <rect x={L.st.x + 12} y={scy - 17} width="34" height="34" rx="10" fill={s.color} />
                        <svg x={L.st.x + 17} y={scy - 12} width="24" height="24" overflow="visible">
                          <WindowGlyph kind={s.kind} frame={s.ink} glass={s.color} />
                        </svg>
                        <text x={L.st.x + 56} y={scy - 5} fontSize="14" fontWeight={600} fill={TEXT}>
                          {s.lines[0]}
                        </text>
                        <text x={L.st.x + 56} y={scy + 13} fontSize="12.5" fill="rgba(243,238,230,0.65)">
                          {s.lines[1]}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-2 text-[11px] text-white/55">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: MAP_COLORS.A }} /> Pilastri (A)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: MAP_COLORS.B }} /> Estensioni (B)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: MAP_COLORS.engine }} /> Motori di diffusione
              </span>
              <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                <MousePointerClick className="h-3.5 w-3.5" /> 13 moduli · 7 motori · 5 stakeholder · 55 connessioni
              </span>
            </div>
          </div>

          <div className="glass-dark rounded-[28px] p-6 xl:sticky xl:top-28 xl:self-start" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={keyOf(focus)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Panel focus={focus} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/75"
      style={color ? { borderColor: hexA(color, 0.5) } : undefined}
    >
      {children}
    </span>
  );
}

function Panel({ focus }: { focus: Focus | null }) {
  const { openReader } = useApp();

  if (!focus) {
    return (
      <div>
        <p className="eyebrow text-[#F4977F]">Come leggere la mappa</p>
        <p className="mt-3 font-display text-2xl leading-snug">Un sistema di propagazione progressiva.</p>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          Il valore nasce nel nucleo editoriale e si irradia verso l’esterno: dalle 13 linee di valorizzazione ai 7 motori di
          diffusione, fino ai 5 nodi terminali. Scegli un profilo o tocca un nodo per evidenziarne la filiera.
        </p>
        <ol className="mt-5 space-y-2.5 text-sm text-white/75">
          {[
            ["L0", "Nucleo", "Il Libro Multimediale"],
            ["L1", "13 linee", "6 pilastri + 7 estensioni"],
            ["L2", "7 motori", "Il ponte operativo verso l’esterno"],
            ["L3", "5 stakeholder", "Destinatari e impatti"],
          ].map(([l, a, b]) => (
            <li key={l} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 font-mono text-[11px]">{l}</span>
              <span>
                <span className="font-semibold text-white">{a}</span> · {b}
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (focus.type === "core") {
    return (
      <div>
        <p className="eyebrow text-[#F4977F]">Livello 0 · Nucleo</p>
        <p className="mt-3 font-display text-2xl leading-snug">Il Libro Multimediale</p>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          L’elemento centrale da cui tutto ha origine: un’opera editoriale d’autore che non appare mai come una brochure.
          Editorial First, Business by Design.
        </p>
        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          {[
            ["13", "moduli"],
            ["7", "motori"],
            ["5", "target"],
            ["26", "KPI"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-white/[0.05] py-3">
              <p className="font-display text-xl">{v}</p>
              <p className="text-[10.5px] text-white/50">{l}</p>
            </div>
          ))}
        </div>
        <button onClick={() => openReader("integrale")} className="btn btn-light mt-6 w-full !py-3 !text-sm">
          Apri l’edizione integrale <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (focus.type === "module") {
    const m = moduleById[focus.id];
    const sts = stakeholdersForModule(m.id);
    return (
      <div>
        <p className="eyebrow" style={{ color: MAP_COLORS[m.domain] }}>
          Livello 1 · Modulo {m.id} · {m.domain === "A" ? "Pilastro" : "Estensione"}
        </p>
        <p className="mt-3 text-balance font-display text-xl leading-snug">{m.title}</p>
        <p className="mt-2 text-sm italic text-white/60">“{m.editorialTitle}”</p>
        <div className="mt-4 space-y-3 text-sm">
          <p>
            <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/45">Il pubblico vive</span>
            <span className="text-white/80">{m.publicValue}</span>
          </p>
          <p>
            <span className="block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/45">Il partner ottiene</span>
            <span className="text-white/80">{m.partnerValue}</span>
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {m.kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-white/[0.05] p-3">
              <p className="font-display text-lg" style={{ color: MAP_COLORS[m.domain] }}>
                {formatKpi(k)}
              </p>
              <p className="mt-0.5 text-[10.5px] leading-snug text-white/55">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {m.engines.map((e) => (
            <Chip key={e} color={MAP_COLORS.engine}>
              <span className="font-mono text-gold">{e}</span> {engineById[e].short}
            </Chip>
          ))}
          {sts.map((s) => (
            <Chip key={s.id} color={s.accent}>
              {s.label}
            </Chip>
          ))}
        </div>
        <button onClick={() => openReader(sts[0].id, m.id)} className="btn btn-light mt-6 w-full !py-3 !text-sm">
          Apri il capitolo multimediale <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (focus.type === "engine") {
    const e = engineById[focus.id];
    return (
      <div>
        <p className="eyebrow text-gold">Livello 2 · Motore {e.id}</p>
        <p className="mt-3 text-balance font-display text-xl leading-snug">{e.name}</p>
        <p className="mt-1 text-sm italic text-white/55">{e.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/75">{e.what}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          <span className="font-semibold text-white/85">Meccanica · </span>
          {e.how}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {e.kpis.map((k) => (
            <div key={k.label} className="rounded-xl bg-white/[0.05] p-3">
              <p className="font-display text-lg text-gold">{k.value}</p>
              <p className="mt-0.5 text-[10.5px] text-white/55">{k.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/45">Alimenta i moduli</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {modulesForEngine(e.id).map((m) => (
            <Chip key={m.id} color={MAP_COLORS[m.domain]}>
              <span className="font-mono">{m.id}</span> {m.short}
            </Chip>
          ))}
        </div>
      </div>
    );
  }

  const s = stakeholderById[focus.id];
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: s.color }}>
          <WindowGlyph kind={s.kind} className="h-7 w-7" frame={s.ink} glass={s.color} />
        </span>
        <div>
          <p className="eyebrow" style={{ color: s.accent }}>
            Livello 3 · Stakeholder
          </p>
          <p className="font-display text-xl">{s.label}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-white/50">{s.audience}</p>
      <p className="mt-4 text-pretty font-display text-lg italic leading-snug text-white/90">“{s.message}”</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {s.kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-white/[0.05] p-2.5">
            <p className="font-display text-base" style={{ color: s.accent }}>
              {k.value}
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-white/55">{k.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/45">Moduli e motori attivi</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {s.modules.map((id) => (
          <Chip key={id} color={MAP_COLORS[moduleById[id].domain]}>
            <span className="font-mono">{id}</span> {moduleById[id].short}
          </Chip>
        ))}
        {s.engines.map((id) => (
          <Chip key={id} color={MAP_COLORS.engine}>
            <span className="font-mono text-gold">{id}</span> {engineById[id].short}
          </Chip>
        ))}
      </div>
      <button onClick={() => openReader(s.id)} className="btn btn-light mt-6 w-full !py-3 !text-sm">
        Apri l’edizione dedicata <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
