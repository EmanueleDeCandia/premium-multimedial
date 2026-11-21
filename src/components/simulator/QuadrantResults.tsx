import { ArrowDownRight, ArrowUpRight, BookOpen, Calculator, Layers, Sparkles } from "lucide-react";
import { formatNumber, stakeholderById, type StakeholderId } from "../../data/content";
import type { FormulaTrace, StakeholderOutput } from "../../data/simulatorModel";
import { WindowGlyph } from "../ui";
import { cn } from "../../utils/cn";

function DeltaTag({ current, baseline, suffix = "" }: { current: number; baseline: number; suffix?: string }) {
  const diff = current - baseline;
  if (Math.abs(diff) < 1) {
    return <span className="rounded-full bg-ink/[0.06] px-2 py-0.5 font-mono text-[10.5px] text-ink/55">= Sito</span>;
  }
  const positive = diff > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-mono text-[10.5px] font-semibold",
        positive ? "bg-sage/25 text-[#2d4a3a]" : "bg-crimson/12 text-crimson",
      )}
    >
      {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {positive ? "+" : ""}
      {formatNumber(Math.round(diff))}
      {suffix} vs sito
    </span>
  );
}

export function FormulaCard({ trace, dark = false }: { trace: FormulaTrace; dark?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        dark ? "border-white/10 bg-white/[0.04]" : "border-ink/10 bg-paper",
      )}
    >
      <div className="flex items-center gap-2">
        <Calculator className={cn("h-4 w-4 shrink-0", dark ? "text-gold" : "text-crimson")} />
        <p className={cn("text-sm font-semibold", dark ? "text-ivory" : "text-ink")}>{trace.label}</p>
      </div>
      <p className={cn("mt-2 font-mono text-[11px]", dark ? "text-white/50" : "text-ink/50")}>{trace.formulaSymbolic}</p>
      <p
        className={cn(
          "mt-1.5 rounded-xl px-3 py-2 font-mono text-xs leading-relaxed",
          dark ? "bg-night/80 text-[#F4977F]" : "bg-ivory text-ink",
        )}
      >
        {trace.formulaLive}
      </p>
      <p className={cn("mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed", dark ? "text-white/65" : "text-ink/65")}>
        <BookOpen className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", dark ? "text-[#9CC3B0]" : "text-teal")} />
        <span>
          <strong className={cn("font-semibold", dark ? "text-white/85" : "text-ink/85")}>Spiegazione calcolo:</strong> {trace.explanation}
        </span>
      </p>
    </div>
  );
}

export function QuadrantResults({
  stakeholderId,
  output,
  baselineOutput,
}: {
  stakeholderId: StakeholderId;
  output: StakeholderOutput;
  baselineOutput: StakeholderOutput;
}) {
  const s = stakeholderById[stakeholderId];

  return (
    <div className="rounded-[28px] border border-ink/10 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: s.color }}>
            <WindowGlyph kind={s.kind} className="h-6 w-6" frame={s.ink} glass={s.color} />
          </span>
          <div>
            <p className="eyebrow text-ink/50">Matrice di attribuzione rigorosa a 4 quadranti</p>
            <h3 className="font-display text-2xl text-ink">{s.label} · Startup vs Stakeholder</h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ivory px-3 py-1 text-xs font-medium text-ink/70">
          <Layers className="h-3.5 w-3.5 text-crimson" /> Nessun doppio conteggio
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {/* Startup Monetario */}
        <div className="rounded-2xl bg-ink p-5 text-ivory">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#F4977F]">
              Startup · Beneficio Monetario (24M)
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/75">Cash diretto</span>
          </div>
          <p className="mt-2 font-display text-4xl tracking-tight tabular-nums">
            €{formatNumber(Math.round(output.startupMonetaryEur))}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/70">{output.startupMonetaryDetail}</p>
          <div className="mt-3 inline-block rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10.5px] text-white/80">
            Delta vs Sito:{" "}
            {output.startupMonetaryEur - baselineOutput.startupMonetaryEur >= 0 ? "+" : "−"}€
            {formatNumber(Math.abs(Math.round(output.startupMonetaryEur - baselineOutput.startupMonetaryEur)))}
          </div>
        </div>

        {/* Stakeholder Monetario */}
        <div className="rounded-2xl border border-ink/12 bg-paper p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-crimson">
              {s.label} · Beneficio Monetario (24M)
            </span>
            <DeltaTag current={output.stakeholderMonetaryEur} baseline={baselineOutput.stakeholderMonetaryEur} suffix=" €" />
          </div>
          <p className="mt-2 font-display text-4xl tracking-tight text-ink tabular-nums">
            €{formatNumber(Math.round(output.stakeholderMonetaryEur))}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ink/70">{output.stakeholderMonetaryDetail}</p>
        </div>

        {/* Startup Non Monetario */}
        <div className="rounded-2xl border border-ink/10 bg-ivory/70 p-5">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink/55">
            <Sparkles className="h-3.5 w-3.5 text-coral" /> Startup · Benefici Non Monetari
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {output.startupNonMonetary.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stakeholder Non Monetario */}
        <div className="rounded-2xl border border-ink/10 bg-white p-5">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#3F5A4C]">
            <Sparkles className="h-3.5 w-3.5 text-teal" /> {s.label} · Benefici Non Monetari
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {output.stakeholderNonMonetary.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
