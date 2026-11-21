import { useMemo, useState } from "react";
import { ArrowLeft, Check, Copy, Download, RotateCcw, SlidersHorizontal, TrendingUp } from "lucide-react";
import { formatNumber, stakeholders, type StakeholderId } from "../../data/content";
import {
  PRESETS,
  runSimulation,
  type PresetId,
  type SimulatorInputs,
} from "../../data/simulatorModel";
import { Logo, WindowGlyph } from "../ui";
import { InputControl } from "./InputControl";
import { FormulaCard } from "./QuadrantResults";
import { StakeholderWorkbench } from "./StakeholderWorkbench";
import { cn } from "../../utils/cn";

type TabId = "overview" | StakeholderId;

export function SimulatorPage({ onBack }: { onBack: () => void }) {
  const [preset, setPreset] = useState<PresetId | "custom">("realistico");
  const [inputs, setInputs] = useState<SimulatorInputs>(() => ({ ...PRESETS.realistico.inputs }));
  const [tab, setTab] = useState<TabId>("overview");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => runSimulation(inputs), [inputs]);
  const siteBaseline = useMemo(() => runSimulation(PRESETS.sitoOriginario.inputs), []);

  const updateField = (key: keyof SimulatorInputs, next: number) => {
    setPreset("custom");
    setInputs((prev) => ({ ...prev, [key]: next }));
  };

  const patchInputs = (patch: Partial<SimulatorInputs>) => {
    setPreset("custom");
    setInputs((prev) => ({ ...prev, ...patch }));
  };

  const selectPreset = (id: PresetId) => {
    setPreset(id);
    setInputs({ ...PRESETS[id].inputs });
  };

  const exportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      preset,
      inputs,
      results: {
        pnl: result.pnl,
        audience: result.audience,
        stakeholders: result.stakeholders,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `business-case-calibrato-${preset}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyMarkdownSummary = async () => {
    const p = result.pnl;
    const a = result.audience;
    const lines = [
      `# Riepilogo Calibrazione Business Case (${preset})`,
      `- Ricavi Cash 24M: €${Math.round(p.totalRevenueCash24m).toLocaleString("it-IT")} (Y1: €${Math.round(p.revenueY1Cash).toLocaleString("it-IT")} | Y2: €${Math.round(p.revenueY2Cash).toLocaleString("it-IT")})`,
      `- Commissioni Turismo 4.4: €${Math.round(p.tourismCommissionRevenue24m).toLocaleString("it-IT")} (${inputs.tCommissioneStartupPct}%)`,
      `- Azioni monetizzate DB Istituzioni: €${Math.round(p.institutionDbMonetized24m).toLocaleString("it-IT")}`,
      `- Barter Tecnico (riduzione COGS): €${Math.round(p.barterValue24m).toLocaleString("it-IT")}`,
      `- EBITDA 24M: €${Math.round(p.ebitda24m).toLocaleString("it-IT")} (${p.ebitdaMarginPct.toFixed(1)}%) | Picco Cassa Y1 con DSO ${inputs.dsoGiorniIncassoB2G}gg: €${Math.round(p.peakCashNeedY1).toLocaleString("it-IT")}`,
      `- Audience: Reach Unica ${Math.round(a.uniqueReach).toLocaleString("it-IT")} | K=${inputs.kViralita} | Lettori Attivi ${Math.round(a.totalActiveReaders).toLocaleString("it-IT")} | CAC diretto €${a.directCacEur.toFixed(2)} | CAC fully-loaded €${a.fullyLoadedCacEur.toFixed(2)}`,
      ...stakeholders.map((s) => {
        const st = result.stakeholders[s.id];
        return `- ${s.label}: Startup €${Math.round(st.startupMonetaryEur).toLocaleString("it-IT")} | Stakeholder €${Math.round(st.stakeholderMonetaryEur).toLocaleString("it-IT")}`;
      }),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback ignorato in contesti senza permessi clipboard
    }
  };

  const totalRev = result.pnl.totalRevenueCash24m;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      {/* Topbar coerente con Navbar originale */}
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
        <div className="glass mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-2.5 shadow-[0_10px_40px_-18px_rgba(23,18,27,0.28)]">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden h-5 w-px bg-ink/15 sm:block" />
            <span className="hidden rounded-full bg-crimson/10 px-3 py-1 font-mono text-[11px] font-semibold text-crimson sm:inline-flex">
              Simulatore Pure-Input · model-business
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={copyMarkdownSummary} className="btn btn-ghost !px-3.5 !py-2 !text-xs">
              {copied ? <Check className="h-3.5 w-3.5 text-teal" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copiato" : "Copia riepilogo"}
            </button>
            <button onClick={exportJson} className="btn btn-ghost !px-3.5 !py-2 !text-xs">
              <Download className="h-3.5 w-3.5" /> Esporta JSON
            </button>
            <button onClick={onBack} className="btn btn-primary !px-3.5 !py-2 !text-xs">
              <ArrowLeft className="h-3.5 w-3.5" /> Torna al sito
            </button>
          </div>
        </div>
      </header>

      {/* Sezione Hero / Scoreboard Live (design night coerente con EcosystemMap & Impact) */}
      <section className="grain relative mt-4 overflow-hidden bg-night py-12 text-ivory sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[34rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(227,111,90,0.20),transparent)]" />
          <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(156,195,176,0.14),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow inline-flex items-center gap-2 text-[#F4977F]">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Calibration Workbench · Zero costanti fisse
              </p>
              <h1 className="mt-3 text-balance font-display text-3xl leading-[1.06] sm:text-5xl">
                Simulatore Parametrico per <em className="text-[#F4977F]">Startup e 5 Stakeholder</em>.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                Ogni prezzo, tasso, commissione (0%–80%+), CPM (default €90 su sola reach incrementale), viralità (K libero) e
                valore d’obiettivo è una variabile di <strong className="text-white">INPUT</strong> con formula live e nota esplicativa.
              </p>
            </div>

            {/* Selettore Preset */}
            <div className="flex flex-col items-start gap-2 lg:items-end">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PRESETS) as PresetId[]).map((id) => {
                  const active = preset === id;
                  return (
                    <button
                      key={id}
                      onClick={() => selectPreset(id)}
                      className={cn(
                        "rounded-full border px-3.5 py-2 text-xs font-semibold transition",
                        active
                          ? "border-white bg-white text-ink"
                          : "border-white/15 bg-white/[0.04] text-white/80 hover:border-white/40 hover:text-white",
                      )}
                    >
                      {PRESETS[id].label}
                    </button>
                  );
                })}
                {preset === "custom" && (
                  <button
                    onClick={() => selectPreset("realistico")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#F4977F]/50 bg-coral/20 px-3.5 py-2 text-xs font-semibold text-[#F4977F]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Personalizzato · Ripristina
                  </button>
                )}
              </div>
              <p className="max-w-xl text-left text-xs text-white/55 lg:text-right">
                {preset === "custom"
                  ? "Stai testando una calibrazione personalizzata. Ogni cambiamento aggiorna live P&L, CAC, cassa e attribuzioni."
                  : PRESETS[preset].description}
              </p>
            </div>
          </div>

          {/* 6 KPI Live principali */}
          <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {[
              {
                label: "Ricavi Cash 24M",
                val: `€${formatNumber(Math.round(result.pnl.totalRevenueCash24m))}`,
                sub: `Y1 €${formatNumber(Math.round(result.pnl.revenueY1Cash))} · Y2 €${formatNumber(Math.round(result.pnl.revenueY2Cash))}`,
                delta: `vs sito €${formatNumber(Math.round(siteBaseline.pnl.totalRevenueCash24m))}`,
              },
              {
                label: "EBITDA 24 Mesi",
                val: `€${formatNumber(Math.round(result.pnl.ebitda24m))}`,
                sub: `Margine ${result.pnl.ebitdaMarginPct.toFixed(1)}% · Gross ${result.pnl.grossMarginPct.toFixed(1)}%`,
                delta: `Break-even €${formatNumber(Math.round(result.pnl.breakEvenRevenue24m))}`,
              },
              {
                label: "Picco Cassa Y1 (DSO)",
                val: `€${formatNumber(Math.round(result.pnl.peakCashNeedY1))}`,
                sub: `Crediti fine Y1: €${formatNumber(Math.round(result.pnl.receivablesEndY1FromDso))}`,
                delta: `DSO B2G: ${inputs.dsoGiorniIncassoB2G} gg`,
              },
              {
                label: "Commissioni & DB Enti",
                val: `€${formatNumber(Math.round(result.pnl.tourismCommissionRevenue24m + result.pnl.institutionDbMonetized24m))}`,
                sub: `Turismo ${inputs.tCommissioneStartupPct}% (€${formatNumber(Math.round(result.pnl.tourismCommissionRevenue24m))})`,
                delta: `DB Enti: €${formatNumber(Math.round(result.pnl.institutionDbMonetized24m))}`,
              },
              {
                label: "Lettori Attivi (Live)",
                val: formatNumber(Math.round(result.audience.totalActiveReaders)),
                sub: `Primari ${formatNumber(Math.round(result.audience.primaryReaders))} × ${result.audience.viralMultiplier.toFixed(2)}x`,
                delta: `K = ${inputs.kViralita.toFixed(2)} (netto +${result.audience.effectiveKNet.toFixed(2)})`,
              },
              {
                label: "CAC Derivato (Reale)",
                val: `€${result.audience.directCacEur.toFixed(2).replace(".", ",")}`,
                sub: `Fully-Loaded (incl. Sales): €${result.audience.fullyLoadedCacEur.toFixed(2).replace(".", ",")}`,
                delta: `Profili ZPD: ${formatNumber(Math.round(result.audience.zeroPartyProfiles))}`,
              },
            ].map((k) => (
              <div key={k.label} className="glass-dark rounded-2xl p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">{k.label}</dt>
                <dd className="mt-1.5 font-display text-2xl text-white tabular-nums sm:text-[1.7rem]">{k.val}</dd>
                <p className="mt-1 text-[11px] text-white/70">{k.sub}</p>
                <p className="mt-1 font-mono text-[10px] text-[#F4977F]">{k.delta}</p>
              </div>
            ))}
          </dl>

          {/* Barra Mix Ricavi Cash */}
          <div className="glass-dark mt-4 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold uppercase tracking-[0.16em] text-white/60">
                Composizione Ricavi Cash Startup 24M (Barter €{formatNumber(Math.round(result.pnl.barterValue24m))} & Borse €
                {formatNumber(Math.round(result.pnl.passThroughScholarshipFund24m))} esclusi dal Cash)
              </span>
              <span className="font-mono text-white/70">Totale Cash: €{formatNumber(Math.round(totalRev))}</span>
            </div>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-white/10">
              {result.pnl.revenueMix.map((r) => (
                <div
                  key={r.id}
                  style={{
                    width: `${totalRev > 0 ? (r.value / totalRev) * 100 : 0}%`,
                    background: r.color,
                  }}
                  className="h-full border-r border-night/60 transition-all duration-300 last:border-0"
                  title={`${r.label}: €${formatNumber(Math.round(r.value))}`}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/75">
              {result.pnl.revenueMix.map((r) => (
                <span key={r.id} className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                  {r.label}: <strong className="font-mono">€{formatNumber(Math.round(r.value))}</strong> (
                  {totalRev > 0 ? Math.round((r.value / totalRev) * 100) : 0}%)
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigazione Tab (P&L Globale + 5 Stakeholder) */}
      <div className="sticky top-[68px] z-30 border-b border-ink/10 bg-ivory/90 backdrop-blur-md">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          <button
            onClick={() => setTab("overview")}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm",
              tab === "overview"
                ? "border-ink bg-ink text-ivory"
                : "border-ink/10 bg-white/70 text-ink/75 hover:bg-white hover:text-ink",
            )}
          >
            <TrendingUp className="h-4 w-4" /> Regia P&L, Costi, Viralità & CPM
          </button>

          {stakeholders.map((s) => {
            const on = tab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setTab(s.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:text-sm",
                  on ? "border-ink bg-ink text-ivory" : "border-ink/10 bg-white/70 text-ink/75 hover:bg-white hover:text-ink",
                )}
              >
                <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: s.color }}>
                  <WindowGlyph kind={s.kind} className="h-3.5 w-3.5" frame={s.ink} glass={s.color} />
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Corpo principale */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {tab === "overview" ? (
          <div className="space-y-8">
            {/* Riepilogo Comparativo 5 Stakeholder */}
            <section className="rounded-[28px] border border-ink/10 bg-white/75 p-5 sm:p-7">
              <p className="eyebrow text-crimson">Quadro d'insieme · Benefici separati per attore</p>
              <h2 className="mt-1 font-display text-3xl text-ink">Confronto Startup vs 5 Stakeholder (24 Mesi)</h2>
              <p className="mt-2 text-sm text-ink/65">
                Ogni riga mostra separatamente ciò che entra nelle casse della Startup, ciò che costituisce beneficio monetario/economico dello
                Stakeholder (costi evitati, indotto, obiettivi raggiunti, borse) e il principale beneficio non monetario.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 text-[11px] uppercase tracking-[0.14em] text-ink/50">
                      <th className="py-3 pr-4">Stakeholder (Livello 3)</th>
                      <th className="px-4 py-3">Startup · Monetario Cash</th>
                      <th className="px-4 py-3">Stakeholder · Valore / Risparmio</th>
                      <th className="px-4 py-3">Benefici Non Monetari Chiave</th>
                      <th className="py-3 pl-4 text-right">Apri Scheda</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/[0.07]">
                    {stakeholders.map((s) => {
                      const st = result.stakeholders[s.id];
                      return (
                        <tr key={s.id} className="transition hover:bg-paper">
                          <td className="py-4 pr-4 font-semibold text-ink">
                            <div className="flex items-center gap-2.5">
                              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: s.color }}>
                                <WindowGlyph kind={s.kind} className="h-4 w-4" frame={s.ink} glass={s.color} />
                              </span>
                              {s.label}
                            </div>
                          </td>
                          <td className="px-4 py-4 font-mono font-semibold text-ink">
                            €{formatNumber(Math.round(st.startupMonetaryEur))}
                            <span className="mt-0.5 block font-sans text-[11px] font-normal text-ink/55">{st.startupMonetaryDetail}</span>
                          </td>
                          <td className="px-4 py-4 font-mono font-semibold text-crimson">
                            €{formatNumber(Math.round(st.stakeholderMonetaryEur))}
                            <span className="mt-0.5 block font-sans text-[11px] font-normal text-ink/55">{st.stakeholderMonetaryDetail}</span>
                          </td>
                          <td className="px-4 py-4 text-xs text-ink/75">
                            <p>• {st.startupNonMonetary[0]}</p>
                            <p className="mt-1">• {st.stakeholderNonMonetary[0]}</p>
                          </td>
                          <td className="py-4 pl-4 text-right">
                            <button
                              onClick={() => setTab(s.id)}
                              className="rounded-full border border-ink/15 bg-ivory px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-ink hover:text-ivory"
                            >
                              Calibra
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Controlli Globali Viralità, CPM, Costi & DSO */}
            <section className="rounded-[28px] border border-ink/10 bg-white/70 p-5 sm:p-7">
              <div className="border-b border-ink/10 pb-4">
                <p className="eyebrow text-crimson">Variabili di Regia Startup (Pure-Input)</p>
                <h3 className="mt-1 font-display text-2xl text-ink">Viralità (K), CPM Culturale (€90), Costi Completi & Cassa (DSO)</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/65">
                  Modificando questi parametri vedi in tempo reale come il CAC smette di essere una costante fissa (€0,40 sul sito) e diventa il risultato
                  matematico tra costi effettivi, deduplicazione e viralità scelta.
                </p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {(
                  [
                    "kViralita",
                    "decadimentoViralePct",
                    "cpmCulturaleEur",
                    "sovrapposizioneCanaliPct",
                    "quotaRicaviAnno1Pct",
                    "dsoGiorniIncassoB2G",
                    "capexPiattaforma24m",
                    "costiFissiRedazione24m",
                    "costiSalesAbm24m",
                    "costiDistribuzioneSeeding24m",
                    "costiGaCdnGdpr24m",
                  ] as (keyof SimulatorInputs)[]
                ).map((field) => (
                  <InputControl key={field} field={field} value={inputs[field]} onChange={updateField} />
                ))}
              </div>
            </section>

            {/* Formule Live Globali */}
            <section className="rounded-[28px] border border-ink/10 bg-white/75 p-5 sm:p-7">
              <p className="eyebrow text-crimson">Verifica formule consolidate</p>
              <h3 className="mt-1 font-display text-2xl text-ink">Equazioni Live: Viralità, CAC & EBITDA / Cassa</h3>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {result.audience.formulas.map((f) => (
                  <FormulaCard key={f.id} trace={f} />
                ))}
                {result.pnl.formulas.map((f) => (
                  <FormulaCard key={f.id} trace={f} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <StakeholderWorkbench
            stakeholderId={tab}
            inputs={inputs}
            result={result}
            baseline={siteBaseline}
            onChange={updateField}
            onPatch={patchInputs}
          />
        )}
      </main>
    </div>
  );
}
