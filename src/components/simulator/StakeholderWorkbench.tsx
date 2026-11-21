import { Compass, Lightbulb } from "lucide-react";
import { formatNumber, stakeholderById, type StakeholderId } from "../../data/content";
import type { SimulationResult, SimulatorInputs } from "../../data/simulatorModel";
import { InputControl } from "./InputControl";
import { FormulaCard, QuadrantResults } from "./QuadrantResults";

interface InputGroup {
  title: string;
  subtitle: string;
  auditSummary: string;
  fields: (keyof SimulatorInputs)[];
}

interface UseCaseScenario {
  label: string;
  description: string;
  patch: Partial<SimulatorInputs>;
}

const STAKEHOLDER_GROUPS: Record<StakeholderId, { headlineNote: string; useCases: UseCaseScenario[]; groups: InputGroup[] }> = {
  fondazioni: {
    headlineNote:
      "Qui separiamo tre catene distinte: (1) l'acquisto diretto di beni culturali e kit PCTO (3.1, 3.3-B2G, 4.2); (2) la fruizione turistica gratuita sul territorio (attribuita a Istituzioni/DMO come giornate di presenza); (3) le prenotazioni generate dai contenuti Startup su cui si applicano commissioni variabili (0%–80%+).",
    useCases: [
      {
        label: "DMO / Borghi (Comm. 15% ricettività)",
        description: "Imposta commissione standard 15% su pernottamenti/esperienze e impatto presenze gratuito nei borghi.",
        patch: { tCommissioneStartupPct: 15, tAccessiGratuitiTerritorio: 24000, tAccessiBookingStartup: 18000, tConvBookingPct: 10 },
      },
      {
        label: "Servizi organizzati Startup (Comm. 80%)",
        description: "Simula pacchetti/esperienze culturali organizzati direttamente dalla Startup con commissione dell'80% sul prezzo.",
        patch: { tCommissioneStartupPct: 80, tAccessiBookingStartup: 12000, tConvBookingPct: 12, tScontrinoMedioServizioEur: 75 },
      },
      {
        label: "Solo Istituzionale B2G (Comm. 0%)",
        description: "Azzera le commissioni turistiche per valutare la sola sostenibilità delle licenze B2G e scuole.",
        patch: { tCommissioneStartupPct: 0, f1Contratti24m: 14, f2Contratti24m: 4 },
      },
    ],
    groups: [
      {
        title: "1A · Acquisto B2B/B2G, Edizioni Territoriali & COGS (3.1, 3.3-B2G)",
        subtitle: "Pacchetti di licenze digitali personalizzate e accordi regionali con costi variabili espliciti.",
        auditSummary:
          "Assunzione chiave: riconcilia il piano 'Istituzionale' (€9.800) con l'ACV medio (€12.500 sul sito) tramite i tier F2 Territoriale e F3 Regionale. Il DSO pubblico determina i crediti in attesa d'incasso.",
        fields: ["f1Contratti24m", "f1PrezzoEur", "f2Contratti24m", "f2PrezzoEur", "f3Contratti24m", "f3PrezzoEur", "fCogsPct", "fCapexEvitatoPerEnteEur"],
      },
      {
        title: "1B · DB Cittadini & Kit Didattico Scuole (4.2)",
        subtitle: "Conversioni sui database/portali dell'ente e adozioni scolastiche PCTO.",
        auditSummary:
          "Assunzione chiave: sul DB cittadini di Comuni e Fondazioni il riscatto effettivo è più conservativo (5%-12%) rispetto all'open rate; i licei coreutici italiani sono ~50, quindi volumi superiori richiedono scuole generaliste via bandi.",
        fields: ["fDbEntiContattiTot", "fDbRedemptionPct", "fDbLetturaProfondaPct", "fIstitutiAttivati", "fClassiPerIstituto", "fCompletamentoDidatticoPct"],
      },
      {
        title: "1C · Turismo 4.4 — Doppia Attribuzione: Presenze Istituzioni vs Commissioni Startup",
        subtitle: "Distingue l'impatto pubblico territoriale (non monetizzabile) dal ricavo transazionale Startup (commissioni 0%–80%+).",
        auditSummary:
          "Correzione critica: l'indicatore generico 'accessi turistici' è stato sdoppiato. Chi fruisce gratuitamente produce giornate di presenza extra per le Istituzioni; chi prenota tramite contenuti Startup genera GMV e commissioni (0%-80%+) per la Startup.",
        fields: [
          "tAccessiGratuitiTerritorio",
          "tEstensioneSoggiornoPct",
          "tGiorniExtraMedi",
          "tSpesaGiornalieraTerritorioEur",
          "tAccessiBookingStartup",
          "tConvBookingPct",
          "tScontrinoMedioServizioEur",
          "tCommissioneStartupPct",
        ],
      },
    ],
  },
  aziende: {
    headlineNote:
      "Per le imprese private separiamo i ricavi cash dal barter tecnico (usato solo a copertura dei costi di produzione video 4K), calcoliamo il vero costo per lead qualificato (SQL) sostenuto dallo sponsor e introduciamo gli indicatori di Engagement Strategico (Brand Loyalty & Crisis Management) finora assenti sul sito.",
    useCases: [
      {
        label: "Brand Loyalty & Educazione Prodotto",
        description: "Focus su popup interattivi di brand loyalty nei capitoli sostenuti (valore obiettivo €150/cliente fidelizzato).",
        patch: { aClickPopupImportantePct: 28, aConvObiettivoBrandPct: 12, aValoreObiettivoBrandEur: 150 },
      },
      {
        label: "Crisis Management / Reputazione",
        description: "Simula un'azienda che usa un dossier d'autore multimediale per chiarire un tema critico e trattenere clienti chiave (€450/obiettivo).",
        patch: { aClickPopupImportantePct: 35, aConvObiettivoBrandPct: 15, aValoreObiettivoBrandEur: 450 },
      },
      {
        label: "Tech Showcase Filiera B2B",
        description: "Simula aziende tech/sport/materiali che puntano su lead qualificati (SQL) e zero barter.",
        patch: { aTechContratti24m: 7, aTechTicketLordoEur: 18000, aTechBarterPct: 0, aLeadPerTechPartner: 26, aSqlRatePct: 35 },
      },
    ],
    groups: [
      {
        title: "2A · Cultural Sponsorship & Distribuzione CRM Aziendale (3.3-B2B)",
        subtitle: "Capitoli tematici d'autore distribuiti come omaggio culturale al CRM del brand.",
        auditSummary:
          "Assunzione chiave: i contatti CRM appartengono all'azienda (zero CPM fittizio). Il beneficio nasce dal tasso reale di lettura profonda (>4 min) e dalla raccolta Zero-Party Data.",
        fields: ["aCultContratti24m", "aCultPrezzoEur", "aCogsCultPct", "aCultCrmContattiTot", "aCultRedemptionPct", "aCultLetturaProfondaPct"],
      },
      {
        title: "2B · Tech Showcase B2B, Barter & Qualificazione Lead SQL (4.5)",
        subtitle: "Sponsorizzazioni tecniche con separazione Cash/Barter e calcolo trasparente del costo per SQL.",
        auditSummary:
          "Correzione critica: elimina l'ambiguità del 'CPL €18' e del barter sommato al fatturato. Qui vedi sia il cash netto Startup sia il reale costo per lead qualificato sostenuto dallo sponsor rispetto a una fiera.",
        fields: [
          "aTechContratti24m",
          "aTechTicketLordoEur",
          "aTechBarterPct",
          "aCogsTechLordoPct",
          "aLeadPerTechPartner",
          "aSqlRatePct",
          "aCplFieraComparabileEur",
        ],
      },
      {
        title: "2C · Engagement Strategico Impresa (Loyalty / Crisis) & Zero-Party Data (4.6)",
        subtitle: "Micro-interazioni tracciabili su popup video/schede critiche e raccolta dati consensati GDPR.",
        auditSummary:
          "Novità del simulatore: le imprese ottengono finalmente un indicatore dedicato per misurare quanti utenti leggono qualcosa di strategico (brand loyalty o crisis management) e convertono verso l'obiettivo aziendale.",
        fields: [
          "aClickPopupImportantePct",
          "aConvObiettivoBrandPct",
          "aValoreObiettivoBrandEur",
          "aSurveyCompletionPct",
          "aGdprOptInPct",
          "aValoreRicercaEvitataBrandEur",
        ],
      },
    ],
  },
  istituzioni: {
    headlineNote:
      "Modello completamente revisionato: (1) zero CPM fittizio sui contatti già posseduti dall'Istituzione, che generano però per la Startup sia azioni monetizzabili sia un enorme beneficio non monetario di Autorevolezza per coinvolgere altre Istituzioni; (2) CPM culturale (default €90) applicato SOLO ai contatti diversi raggiunti dalla Startup; (3) valore dell'Engagement determinato dall'Obiettivo finale (Loyalty, Crisis Management o Conferenza Stampa Fundraising).",
    useCases: [
      {
        label: "Festival Standard (Loyalty & CPM €90)",
        description: "Default realistico: DB proprio ente + 80k contatti nuovi Startup a €90 CPM + azioni monetizzabili da DB ente.",
        patch: {
          iReachPropriaIstituzione: 240000,
          iReachStartupIncrementale: 80000,
          cpmCulturaleEur: 90,
          iValoreObiettivoIstituzioneEur: 350,
          iValoreProgettoSpecialeFissoEur: 0,
        },
      },
      {
        label: "Conferenza Stampa Fundraising (€100k)",
        description: "Simula una campagna istituzionale (con K=2) che porta privati a finanziare un progetto da €100.000.",
        patch: {
          kViralita: 2.0,
          iClickEventoImportantePct: 35,
          iConvObiettivoIstituzionePct: 8,
          iValoreObiettivoIstituzioneEur: 250,
          iValoreProgettoSpecialeFissoEur: 100000,
        },
      },
      {
        label: "Crisis Management Istituzionale",
        description: "Focus sull'interazione critica ('cosa l'ente ha fatto / non ha fatto'): 40% click su popup di chiarimento.",
        patch: {
          iAperturaContenutoPct: 26,
          iClickEventoImportantePct: 40,
          iConvObiettivoIstituzionePct: 12,
          iValoreObiettivoIstituzioneEur: 600,
          iValoreProgettoSpecialeFissoEur: 0,
        },
      },
    ],
    groups: [
      {
        title: "3A · Doppia Diffusione: DB Istituzione (0 CPM) vs Reach Incrementale Startup (€90 CPM)",
        subtitle: "Separa i contatti già posseduti dall'ente dai contatti nuovi portati dalla Startup ed esplicita il costo Startup.",
        auditSummary:
          "Correzione critica (Esempio 1): nessun CPM sull'audience dell'ente. Sulle audience diverse pubblicate dalla Startup si applica il CPM culturale editabile (default €90). Qui calcoliamo anche il costo diretto della Startup dietro il 'costo zero per l'ente'.",
        fields: [
          "iSpeciali24m",
          "iReachPropriaIstituzione",
          "iReachStartupIncrementale",
          "cpmCulturaleEur",
          "iCostoProdEvitatoEnteEur",
          "iCostoDirettoStartupSpecialeEur",
        ],
      },
      {
        title: "3B · Valore del DB Istituzione per la Startup (Monetizzabile + Halo Effect)",
        subtitle: "Misura quanto vale per una startup emergente essere presentata dal database di una grande Istituzione.",
        auditSummary:
          "Duplice ritorno per la Startup: (a) invita il pubblico dell'ente ad azioni monetizzabili (donazioni, acquisti, prenotazioni); (b) acquisisce autorevolezza per sbloccare e coinvolgere altre Istituzioni.",
        fields: [
          "iConvDbIstituzioneAzioniStartupPct",
          "iValoreMedioAzioneMonetizzataEur",
          "iMoltiplicatoreAutorevolezzaPct",
          "iContattiB2BOriginePerSpeciale",
          "iConvPipelineIstituzioniPct",
          "iValoreMedioDealPipelineEur",
        ],
      },
      {
        title: "3C · Engagement Obiettivo ('Lettura di qualcosa di importante') & Stampa/Inchieste (3.5, 3.6)",
        subtitle: "Valuta l'impatto su popup video Loyalty/Crisis/Fundraising e ricalibra la stampa phygital.",
        auditSummary:
          "Il valore dell'engagement non dipende da una tariffa fissa ma dall'obiettivo dell'Istituzione (incluso un eventuale progetto finanziato da €100.000). Sulla stampa, il QR realistico passa dal 14% al ~2%.",
        fields: [
          "iAperturaContenutoPct",
          "iClickEventoImportantePct",
          "iConvObiettivoIstituzionePct",
          "iValoreObiettivoIstituzioneEur",
          "iValoreProgettoSpecialeFissoEur",
          "iCopieStampaEsposte",
          "iQrScanPct",
          "iStampaLetturaProfondaPct",
          "iCostoPonteStampaStartupEur",
          "iCicliInchiesta",
          "iRipreseStampaPerCiclo",
          "iRispostaIstituzionalePct",
        ],
      },
    ],
  },
  community: {
    headlineNote:
      "Distingue tre piani diversi: (1) la Community gratuita che vota e consulta i bandi; (2) la raccolta fondi borse di studio con tasso realistico di donanti tra i votanti ed eventuale fee di servizio; (3) il prodotto B2B Living Archive 4.1 venduto ad atenei e biblioteche con separazione tra Cash 24M ed Exit ARR.",
    useCases: [
      {
        label: "Modello Etico (0% fee borse + Archive B2B)",
        description: "La Startup non trattiene commissioni sulle borse (solo costi gateway 2,5%) e monetizza tramite Archive 4.1 e Featured Calls.",
        patch: { cFeeGestioneStartupPct: 0, cTassoDonantiSuVotantiPct: 10, cArchivePrezzoAnnuoEur: 1600 },
      },
      {
        label: "Platform Fee 10% su Crowdfunding Borse",
        description: "Simula il trattenimento di una fee di gestione organizzativa del 10% sui fondi raccolti.",
        patch: { cFeeGestioneStartupPct: 10, cTassoDonantiSuVotantiPct: 14, cDonazioneMediaEur: 4 },
      },
    ],
    groups: [
      {
        title: "4A · Contest Territoriali & Borse di Studio ('Dona con il Voto', 3.2)",
        subtitle: "Distingue i voti gratuiti dai donatori effettivi, i costi gateway e l'eventuale fee Startup.",
        auditSummary:
          "Correzione critica: sul sito 48.000 voti generavano 48 borse assumendo €1 pagato su ogni singolo voto (100% conversione). Qui il tasso donanti è una variabile libera (default 10%).",
        fields: [
          "cTappe24m",
          "cVotiPerTappa",
          "cTassoDonantiSuVotantiPct",
          "cDonazioneMediaEur",
          "cFeeGestioneStartupPct",
          "cCostoGatewayPct",
          "cValoreBorsaEur",
          "cRitenzioneSerialePct",
          "cCommunitySemiOrganici",
        ],
      },
      {
        title: "4B · Portale Bandi & Audizioni (4.3)",
        subtitle: "Monetizzazione lato domanda (teatri/residenze che cercano talenti) lasciando gratis l'accesso ai danzatori.",
        auditSummary:
          "Esplicita il denominatore tra Returning MAU (2.800 realistici vs 9.500 sito), sessioni annuali e candidature, oltre ai costi operativi di curatela.",
        fields: ["cReturningMau", "cVisiteAnnuePerMau", "cCtrCallPct", "cFeaturedCalls24m", "cFeaturedCallPrezzoEur", "cCostiCommunityOps24m"],
      },
      {
        title: "4C · Living Archive B2B (4.1 — Università, Biblioteche, Conservatori)",
        subtitle: "Flusso ricorrente B2B con distinzione rigorosa tra Ricavo Cash 24M ed Exit ARR Anno 2.",
        auditSummary:
          "Correzione critica: il prezzo viene calibrato sui budget reali degli atenei italiani (€1.200–€1.800/anno anziché €3.000) e i ricavi dei due anni sono separati dal valore Exit ARR.",
        fields: ["cArchiveLicenzeY1", "cArchiveNuoveY2", "cArchiveRinnovoPct", "cArchivePrezzoAnnuoEur", "cArchiveCogsPct"],
      },
    ],
  },
  tecnologia: {
    headlineNote:
      "Riconcilia la discrepanza di fattore 2× del sito tra €180.000, 8 commesse e listino 'da €45.000', separando le commesse sottosoglia PA/musei da quelle enterprise, imputando il costo di PM/Account nei margini (55% netto vs 62% lordo) e confrontando il risparmio del cliente su un'alternativa reale (€40k).",
    useCases: [
      {
        label: "Mix Musei Sottosoglia + 1 Enterprise",
        description: "3 commesse da €24k (affidamento diretto sottosoglia) + 1 Enterprise €45k + canone SaaS Y2.",
        patch: { tCommesseSottosoglia24m: 3, tPrezzoSottosogliaEur: 24000, tCommesseEnterprise24m: 1, tPrezzoEnterpriseEur: 45000 },
      },
      {
        label: "Espansione Extra-Danza (Lirica & Design)",
        description: "4 Sprint + 3 Enterprise in 24 mesi spinte da badge PLG 'Powered by'.",
        patch: { tCommesseSottosoglia24m: 4, tCommesseEnterprise24m: 3, tCanoneSaasAnnuoEur: 4500, tCommesseY1AttiveSaas: 3 },
      },
    ],
    groups: [
      {
        title: "5A · Commesse White-Label, Canone SaaS & Margini Operativi (4.7, 4.6-Platform)",
        subtitle: "Template editoriale-tecnologico chiavi in mano per altri settori creativi.",
        auditSummary:
          "Assunzione chiave: includere Account e Project Management porta il costo marginale dal 38% teorico al ~45% reale, mantenendo comunque un ottimo margine operativo (55%) grazie al riuso della piattaforma L0.",
        fields: [
          "tCommesseSottosoglia24m",
          "tPrezzoSottosogliaEur",
          "tCommesseEnterprise24m",
          "tPrezzoEnterpriseEur",
          "tCanoneSaasAnnuoEur",
          "tCommesseY1AttiveSaas",
          "tCostoMarginaleProduzionePct",
          "tQuotaLeadPlgBadgePct",
          "tCapexAlternativoClienteEur",
          "tSettimaneConsegna",
          "tSettimaneCustomExNovo",
        ],
      },
    ],
  },
};

export function StakeholderWorkbench({
  stakeholderId,
  inputs,
  result,
  baseline,
  onChange,
  onPatch,
}: {
  stakeholderId: StakeholderId;
  inputs: SimulatorInputs;
  result: SimulationResult;
  baseline: SimulationResult;
  onChange: (key: keyof SimulatorInputs, next: number) => void;
  onPatch: (patch: Partial<SimulatorInputs>) => void;
}) {
  const s = stakeholderById[stakeholderId];
  const cfg = STAKEHOLDER_GROUPS[stakeholderId];
  const out = result.stakeholders[stakeholderId];
  const baseOut = baseline.stakeholders[stakeholderId];
  const raw = result.stakeholders.raw;

  return (
    <div className="space-y-8">
      {/* Banner Introduttivo & Scenari d'Esigenza */}
      <div className="rounded-[28px] border border-ink/10 bg-paper p-5 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-crimson">Simulatore verticale · {s.audience}</p>
            <h2 className="mt-2 font-display text-3xl text-ink">{s.label} — Catene Input, Formule & Attribuzioni</h2>
            <p className="mt-2.5 flex items-start gap-2 text-sm leading-relaxed text-ink/75">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
              <span>{cfg.headlineNote}</span>
            </p>
          </div>
        </div>

        {/* Selettore rapido Esigenza Specifica */}
        <div className="mt-6 border-t border-ink/10 pt-5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/55">
            <Compass className="h-3.5 w-3.5 text-crimson" /> Simula un'esigenza specifica per questo Stakeholder (applica parametri rapidi modificabili):
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {cfg.useCases.map((uc) => (
              <button
                key={uc.label}
                type="button"
                onClick={() => onPatch(uc.patch)}
                className="group rounded-2xl border border-ink/10 bg-white/80 p-3.5 text-left transition hover:-translate-y-0.5 hover:border-crimson/40 hover:bg-white hover:shadow-sm"
              >
                <span className="block text-xs font-semibold text-crimson">{uc.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-ink/65">{uc.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Matrice 4 Quadranti */}
      <QuadrantResults stakeholderId={stakeholderId} output={out} baselineOutput={baseOut} />

      {/* Metriche intermedie specifiche dello stakeholder (trasparenza extra) */}
      {stakeholderId === "fondazioni" && (
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["GMV Prenotato Turismo", `€${formatNumber(Math.round(raw.fTourismGmv))}`, "Lordo transazioni da contenuti Startup"],
            ["Commissioni Startup 4.4", `€${formatNumber(Math.round(raw.fTourismCommStartup))}`, `Al ${inputs.tCommissioneStartupPct}% editabile`],
            ["Netto Imprese Ricettive", `€${formatNumber(Math.round(raw.fTourismNetOperators))}`, "Resta agli operatori locali"],
            ["Giornate Presenza Extra", formatNumber(Math.round(raw.fTourismExtraDays)), "Stima non monetizzabile per DMO"],
          ].map(([l, v, sub]) => (
            <div key={l} className="rounded-2xl border border-ink/10 bg-white/75 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">{l}</p>
              <p className="mt-1 font-display text-2xl text-ink tabular-nums">{v}</p>
              <p className="mt-0.5 text-xs text-ink/55">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {stakeholderId === "istituzioni" && (
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Reach Incrementale Startup", formatNumber(Math.round(raw.iReachStartupDedup)), "Contatti diversi dal DB Ente (dedup.)"],
            ["Valore Media Startup (CPM)", `€${formatNumber(Math.round(raw.iCpmMediaValue))}`, `Calcolato a €${inputs.cpmCulturaleEur} CPM`],
            ["Click Evento Importante", formatNumber(Math.round(raw.iImportantClicks)), "Popup Loyalty / Crisis / Invito"],
            ["Pipeline B2B Originate", `€${formatNumber(Math.round(raw.iPipelineValueEstimated))}`, `Con +${inputs.iMoltiplicatoreAutorevolezzaPct}% Halo Effect`],
          ].map(([l, v, sub]) => (
            <div key={l} className="rounded-2xl border border-ink/10 bg-white/75 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">{l}</p>
              <p className="mt-1 font-display text-2xl text-ink tabular-nums">{v}</p>
              <p className="mt-0.5 text-xs text-ink/55">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Gruppi di Input + Note Esplicative */}
      <div className="space-y-6">
        {cfg.groups.map((grp) => (
          <section key={grp.title} className="rounded-[28px] border border-ink/10 bg-white/60 p-5 sm:p-7">
            <div className="border-b border-ink/10 pb-4">
              <h3 className="font-display text-2xl text-ink">{grp.title}</h3>
              <p className="mt-1 text-sm text-ink/65">{grp.subtitle}</p>
              <p className="mt-2.5 rounded-xl border border-ink/10 bg-ivory/80 px-3.5 py-2.5 text-xs leading-relaxed text-ink/80">
                <strong className="font-semibold text-crimson">Nota metodologica sulle assunzioni:</strong> {grp.auditSummary}
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {grp.fields.map((field) => (
                <InputControl key={field} field={field} value={inputs[field]} onChange={onChange} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Formule Live & Spiegazioni dei Calcoli */}
      <section className="rounded-[28px] border border-ink/10 bg-white/75 p-5 sm:p-7">
        <p className="eyebrow text-crimson">Trasparenza matematica</p>
        <h3 className="mt-1 font-display text-2xl text-ink">Formule Live e Spiegazione dei Calcoli</h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {out.formulas.map((trace) => (
            <FormulaCard key={trace.id} trace={trace} />
          ))}
        </div>
      </section>
    </div>
  );
}
