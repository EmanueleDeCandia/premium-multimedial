import { AlertTriangle, Info } from "lucide-react";
import { INPUT_META, type SimulatorInputs } from "../../data/simulatorModel";
import { cn } from "../../utils/cn";

export function InputControl({
  field,
  value,
  onChange,
  dark = false,
}: {
  field: keyof SimulatorInputs;
  value: number;
  onChange: (key: keyof SimulatorInputs, next: number) => void;
  dark?: boolean;
}) {
  const m = INPUT_META[field];
  const clampedRatio = Math.min(1, Math.max(0, (value - m.min) / Math.max(1e-6, m.max - m.min)));

  const handleNum = (raw: string) => {
    const normalized = raw.replace(",", ".");
    const parsed = Number(normalized);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      onChange(field, parsed);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition",
        dark
          ? "border-white/10 bg-white/[0.035] hover:border-white/20"
          : "border-ink/10 bg-white/75 hover:border-ink/20 hover:bg-white",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <label htmlFor={`inp-${field}`} className={cn("text-sm font-semibold leading-snug", dark ? "text-ivory" : "text-ink")}>
          {m.label}
        </label>
        <div className="flex items-center gap-1.5">
          {m.unit === "€" && <span className={cn("font-mono text-xs", dark ? "text-white/55" : "text-ink/55")}>€</span>}
          <input
            id={`inp-${field}`}
            type="number"
            min={0}
            step={m.step}
            value={value}
            onChange={(e) => handleNum(e.target.value)}
            className={cn(
              "w-28 rounded-xl border px-2.5 py-1.5 text-right font-mono text-sm font-semibold outline-none transition",
              dark
                ? "border-white/15 bg-night text-ivory focus:border-[#F4977F]"
                : "border-ink/15 bg-ivory text-ink focus:border-crimson",
            )}
          />
          {m.unit !== "€" && (
            <span className={cn("min-w-[2.2rem] font-mono text-xs", dark ? "text-white/55" : "text-ink/55")}>
              {m.unit === "n" ? "unità" : m.unit}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <input
          type="range"
          min={m.min}
          max={m.max}
          step={m.step}
          value={Math.min(m.max, Math.max(m.min, value))}
          onChange={(e) => onChange(field, Number(e.target.value))}
          aria-label={`Regola ${m.label}`}
          className="range flex-1"
          style={{
            "--p": `${clampedRatio * 100}%`,
            "--accent": dark ? "#F4977F" : "#A43A46",
            background: dark
              ? `linear-gradient(to right, #F4977F ${clampedRatio * 100}%, rgba(255,255,255,0.16) ${clampedRatio * 100}%)`
              : `linear-gradient(to right, #A43A46 ${clampedRatio * 100}%, rgba(23,18,27,0.14) ${clampedRatio * 100}%)`,
          } as React.CSSProperties}
        />
        <span className={cn("shrink-0 font-mono text-[10.5px]", dark ? "text-white/40" : "text-ink/40")}>
          {m.min}–{m.max}
          {m.unit === "%" ? "%" : ""}
        </span>
      </div>

      <p className={cn("mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed", dark ? "text-white/65" : "text-ink/65")}>
        <Info className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", dark ? "text-[#9CC3B0]" : "text-teal")} />
        <span>
          <strong className={cn("font-semibold", dark ? "text-white/85" : "text-ink/85")}>Assunzione:</strong> {m.assumptionNote}
        </span>
      </p>

      {m.biasNote && (
        <p
          className={cn(
            "mt-2 flex items-start gap-1.5 rounded-xl px-2.5 py-2 text-[11.5px] leading-relaxed",
            dark ? "bg-coral/12 text-[#F7B3A5]" : "bg-crimson/[0.06] text-crimson",
          )}
        >
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            <strong>Bias sito corretto:</strong> {m.biasNote}
          </span>
        </p>
      )}
    </div>
  );
}
