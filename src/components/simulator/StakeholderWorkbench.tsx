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
      "Chiarimento strutturale v2: le Scuole coinvolte sono Scuole e Accademie di Danza; Fondazioni (bancarie o d'impresa) ed Enti Pubblici (Comuni/Regioni) acquistano pacchetti di licenze (es. 100–500 licenze per Comune) e le distribuiscono per promuovere spettacoli, contest e realtà locali. Con 0 contratti non si attiva alcun flusso B2G. Il Turismo 4.4 separa le giornate di presenza gratuite (Istituzioni) dalle commissioni 0%–80%+ (Startup).",
    useCases: [
      {
        label: "Comuni & Fondazioni (100-500 licenze) + Turismo 15%",
        description: "Default realistico: 17 enti contrattualizzati che distribuiscono licenze locali + commissione ricettività 15%.",
        patch: { tCommissioneStartupPct: 15, fLicenzeMediePerEnte: 450, tAccessiGratuitiTerritorio: 24000, tAccessiBookingStartup: 18000 },
      },
      {
        label: "Servizi organizzati Startup (Comm. 80%)",
        description: "Simula esperienze/pacchetti turistici organizzati direttamente dalla Startup con commissione dell'80%.",
        patch: { tCommissioneStartupPct: 80, tAccessiBookingStartup: 12000, tConvBookingPct: 12, tScontrinoMedioServizioEur: 75 },
      },
      {
        label: "Co-finanziamento Civico 'Vota Donando' (50% Enti)",
        description: "Destina il 50% del fondo netto Vota Donando a progetti culturali territoriali sostenuti da Comuni/Fondazioni.",
        patch: { cQuotaDonazioniCommunityPct: 50, cQuotaDonazioniFondazioniPct: 50, cQuotaDonazioniAziendeEsgPct: 0 },
      },
    ],
    groups: [
      {
        title: "1A · Contratti B2B/B2G Fondazioni & Comuni (3.1, 3.3-B2G)",
        subtitle: "Acquisto di pacchetti di licenze come bene culturale per promuovere spettacoli e contest territoriali.",
        auditSummary:
          "Assunzione chiave: riconcilia il piano 'Istituzionale' (€9.800) e gli acquisti comunali minori (es. 100 licenze) tramite il mix F1/F2/F3.",
        fields: ["f1Contratti24m", "f1PrezzoEur", "f2Contratti24m", "f2PrezzoEur", "f3Contratti24m", "f3PrezzoEur", "fCogsPct", "fCapexEvitatoPerEnteEur"],
      },
      {
        title: "1B · Distribuzione Licenze Enti & Scuole di Danza Locali (4.2)",
        subtitle: "Deriva direttamente dal numero di Fondazioni e Comuni contrattualizzati (0 contratti = 0 attivazioni).",
        auditSummary:
          "Correzione v2: elimina l'origine astratta dei 'DB enti'. Ogni Comune/Fondazione distribuisce le licenze acquistate (es. 100-500 copie) sui propri canali spettacoli/contest e sostiene scuole di danza locali.",
        fields: [
          "fLicenzeMediePerEnte",
          "fContattiCanaliLocaliPerEnte",
          "fRedemptionEntiPct",
          "fLetturaProfondaEntiPct",
          "fScuoleDanzaPerEnte",
          "fClassiGruppiPerScuola",
          "fCompletamentoDidatticoPct",
        ],
      },
      {
        title: "1C · Turismo 4.4 — Presenze Istituzioni vs Commissioni Startup (0%–80%+)",
        subtitle: "Separa la fruizione gratuita nei borghi (giornate di presenza per Enti) dalle prenotazioni monetizzate dalla Startup.",
        auditSummary:
          "Correzione critica: l'indotto da presenze è attribuito alle Istituzioni; le commissioni variabili (0%-80%+) sui servizi prenotati tramite contenuti Startup vanno ai ricavi Startup.",
        fields: [
          "tAccessiGratuitiTerritorio",
          "tTurismoLetturaProfondaPct",
          "tEstensioneSoggiornoPct",
          "tGiorniExtraMedi",
          "tSpesaGiornalieraTerritorioEur",
          "tAccessiBookingStartup",
          "tConvBookingPct",
          "tScontrinoMedioServizioEur",
          "tCommissioneStartupPct",
          "tCogsGestioneBookingPct",
        ],
      },
    ],
  },
  aziende: {
    headlineNote:
      "Architettura v2 per Aziende e Brand: distingue 3 basi di contatti reali — (1) CRM proprio dell'azienda (per Retention, Loyalty e Crisis Management); (2) Pool Cross-Sponsor orchestrato dalla Startup tra le basi di più aziende; (3) Database Proprietario selezionato dalla Startup (default 20.000/azienda) + lettori Opera e Trailer Contest. Valuta Lead, Clienti e Retention tramite CLV separato (€500 B2C e €2.500 B2B Tech).",
    useCases: [
      {
        label: "10 Sponsor · Pool Cross-DB (200k) + DB Startup (200k)",
        description: "Simula il caso di 10 aziende sponsor con 20k contatti propri ciascuna + 20k selezionati dalla Startup per azienda.",
        patch: {
          aCultContratti24m: 5,
          aTechContratti24m: 5,
          aCrmProprioPerAzienda: 20000,
          aQuotaScambioCrossSponsorPct: 100,
          aDbProprioStartupPerAzienda: 20000,
        },
      },
      {
        label: "Focus Brand Loyalty & Crisis Management (CLV €500)",
        description: "Valorizza la difesa della customer base su CRM proprio tramite popup strategici e CLV B2C €500.",
        patch: { aClickLoyaltyCrisisPct: 35, aConvRetentionLoyaltyPct: 15, aQuotaClvSalvataRetentionPct: 45, aClvB2cEur: 500 },
      },
      {
        label: "Focus Filiera Tech B2B (CLV €2.500)",
        description: "Simula fornitori tecnici (pavimenti, luci, audio) rivolti a teatri e scuole con CLV B2B €2.500 e slot trailer extra.",
        patch: { aTechContratti24m: 7, aTechTicketLordoEur: 18000, aClvB2bTechEur: 2500, aSponsorTrailerAutonomi: 4, aPrezzoSponsorTrailerEur: 3500 },
      },
    ],
    groups: [
      {
        title: "2A · Pacchetti Cultural, Tech Showcase & Sponsorizzazione Trailer Contest",
        subtitle: "Ricavi cash, barter tecnico reale (solo riduzione COGS) e chiarezza sui Trailer dei Contest.",
        auditSummary:
          "Nota di trasparenza: la sponsorizzazione dei Trailer Contest rientra normalmente nel costo della licenza/pacchetto sponsor (quindi senza doppio conteggio); usa i campi extra solo se vendi slot trailer separati.",
        fields: [
          "aCultContratti24m",
          "aCultPrezzoEur",
          "aCogsCultPct",
          "aTechContratti24m",
          "aTechTicketLordoEur",
          "aTechBarterPct",
          "aCogsTechLordoPct",
          "aSponsorTrailerAutonomi",
          "aPrezzoSponsorTrailerEur",
        ],
      },
      {
        title: "2B · Le 3 Basi Dati: CRM Proprio, Pool Cross-Sponsor & DB Proprietario Startup",
        subtitle: "Base di calcolo trasparente che risolve l'errore dei '22 lead' sconnessi dall'audience reale.",
        auditSummary:
          "Con 10 sponsor da 20.000 contatti si forma un pool da 200.000 contatti orchestrato dalla Startup, a cui si sommano 20.000 contatti/azienda selezionati dal DB proprietario Startup + audience Opera e Trailer Contest.",
        fields: [
          "aCrmProprioPerAzienda",
          "aQuotaScambioCrossSponsorPct",
          "aDbProprioStartupPerAzienda",
          "aQuotaAudienceOperaEspostaPct",
          "aRedemptionCrmProprioPct",
          "aAperturaNuoviContattiStartupPct",
        ],
      },
      {
        title: "2C · Lead Reali, Loyalty/Crisis, Zero-Party Data & CLV Duale (€500 / €2.500)",
        subtitle: "Calcola nuovi clienti acquisiti e retention su CRM proprio usando CLV B2C (€500) e CLV B2B Tech (€2.500).",
        auditSummary:
          "Ogni lead deriva dall'audience effettivamente esposta e converte in clienti valorizzati con il rispettivo Customer Lifetime Value.",
        fields: [
          "aTassoLeadSuLettoriNuoviPct",
          "aTassoChiusuraVenditaB2cPct",
          "aTassoChiusuraVenditaB2bPct",
          "aClvB2cEur",
          "aClvB2bTechEur",
          "aCplComparabileMercatoEur",
          "aClickLoyaltyCrisisPct",
          "aConvRetentionLoyaltyPct",
          "aQuotaClvSalvataRetentionPct",
          "aSurveyCompletionPct",
          "aGdprOptInPct",
          "aValoreRicercaEvitataBrandEur",
        ],
      },
    ],
  },
  istituzioni: {
    headlineNote:
      "Modello v2 senza doppi conteggi: nessun CPM fittizio sui contatti dell'Istituzione, nessuna vendita di ulteriori licenze conteggiata sulle spedizioni di licenze già pagate. Il DB Istituzione porta traffico qualificato verso Turismo 4.4 e Contest 3.2 + Autorevolezza (Halo Effect). Engagement diviso in micro-obiettivi (es. €30 loyalty) e macro-obiettivi discreti (es. €100.000 conferenza stampa).",
    useCases: [
      {
        label: "Festival Standard (Loyalty €30 & CPM €90)",
        description: "DB ente a 0 CPM + 80k contatti nuovi Startup a €90 CPM + micro-loyalty abbonati.",
        patch: { iReachPropriaIstituzione: 240000, iReachStartupIncrementale: 80000, cpmCulturaleEur: 90, iMacroProgettiFinanziatiCount: 0, iValoreMicroObiettivoIstituzioneEur: 30 },
      },
      {
        label: "Conferenza Stampa Fundraising (€100k, K=2)",
        description: "Simula 1 progetto privato da €100.000 finanziato grazie all'invito virale (K=2) sui contenuti interattivi.",
        patch: { kViralitaOpera: 2.0, iMacroProgettiFinanziatiCount: 1, iValoreMacroProgettoEur: 100000, iClickEventoImportantePct: 35 },
      },
      {
        label: "Crisis Management Istituzionale",
        description: "Focus su popup critici ('cosa ha fatto / non ha fatto l'Istituzione') per tutela reputazionale.",
        patch: { iClickEventoImportantePct: 40, iConvMicroObiettivoIstituzionePct: 12, iValoreMicroObiettivoIstituzioneEur: 85, iMacroProgettiFinanziatiCount: 0 },
      },
    ],
    groups: [
      {
        title: "3A · Doppia Diffusione: DB Istituzione (0 CPM) vs Reach Incrementale Startup (€90 CPM)",
        subtitle: "Separa audience già posseduta dall'ente e nuova reach portata dalla Startup, esplicitando il costo Startup.",
        auditSummary:
          "Correzione v2: eliminate azioni monetizzate duplicate sulle licenze già pagate. Il DB dell'Istituzione genera traffico verso Turismo 4.4 e Contest 3.2, oltre all'Halo Effect.",
        fields: [
          "iSpeciali24m",
          "iReachPropriaIstituzione",
          "iReachStartupIncrementale",
          "cpmCulturaleEur",
          "iCostoProdEvitatoEnteEur",
          "iCostoDirettoStartupSpecialeEur",
          "iQuotaDbVersoTurismoPct",
          "iQuotaDbVersoContestPct",
          "iMoltiplicatoreAutorevolezzaPct",
          "iContattiB2BOriginePerSpeciale",
          "iConvPipelineIstituzioniPct",
          "iValoreMedioDealPipelineEur",
        ],
      },
      {
        title: "3B · Engagement Interattivo ('Lettura di qualcosa di importante') & Stampa/Inchieste",
        subtitle: "Distingue micro-obiettivi (Loyalty/Abbonati) da macro-obiettivi discreti (es. progetto €100k), con lettura attiva omogenea.",
        auditSummary:
          "Correzione v2: aggiunge iLetturaProfondaSuAperturaPct per allineare il calcolo dei Lettori Attivi a tutti gli altri canali ed evita l'inflazione da moltiplicazione su grandi numeri.",
        fields: [
          "iAperturaContenutoPct",
          "iLetturaProfondaSuAperturaPct",
          "iClickEventoImportantePct",
          "iConvMicroObiettivoIstituzionePct",
          "iValoreMicroObiettivoIstituzioneEur",
          "iMacroProgettiFinanziatiCount",
          "iValoreMacroProgettoEur",
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
      "Cuore operativo v2: modella i Contest Online con Trailer in cui gareggiano Compagnie di Danza e Scuole di Danza (con studenti, inviti e K_contest reale = Inviti × Conv%), le 3 linee di monetizzazione (Iscrizione, Licenze Concorso, Vota Donando + Sblocca €2 ripartite tra Community 80% / Fondazioni 20% / Aziende ESG 0% / Fee Startup 0%), più costi variabili per partecipante, Bandi 4.3 e Living Archive 4.1.",
    useCases: [
      {
        label: "Modello Core Contest (80% Comm. / 20% Enti / 0% fee)",
        description: "25 Compagnie + 60 Scuole di Danza, iscrizione €120, licenze concorso €35, 0% fee su Vota Donando.",
        patch: { cPrezzoIscrizioneCompagniaEur: 120, cPrezzoIscrizioneScuolaEur: 120, cFeeGestioneStartupDonazioniPct: 0, cQuotaDonazioniCommunityPct: 80, cQuotaDonazioniFondazioniPct: 20 },
      },
      {
        label: "Contest Freemium (Iscrizione €0 + Focus Licenze & Fee 10%)",
        description: "Partecipazione gratuita per massimizzare scuole iscritte, monetizzando con licenze multimediali e fee 10% su donazioni.",
        patch: { cCompagnieContest: 40, cScuoleContest: 100, cPrezzoIscrizioneCompagniaEur: 0, cPrezzoIscrizioneScuolaEur: 0, cFeeGestioneStartupDonazioniPct: 10, cLicenzeMediePerPartecipante: 9 },
      },
    ],
    groups: [
      {
        title: "4A · Motore Core: Contest Online con Trailer (Compagnie & Scuole di Danza)",
        subtitle: "Partecipanti, studenti in gara, viralità reale (Inviti × Conv%), iscrizioni, licenze concorso e costi variabili.",
        auditSummary:
          "Novità v2: sostituisce i numeri piatti della v1 con il vero imbuto dei tornei trailer online. I votanti generati alimentano anche l'audience dell'opera e l'esposizione per le Aziende Sponsor.",
        fields: [
          "cTappe24m",
          "cCompagnieContest",
          "cScuoleContest",
          "cStudentiPerCompagnia",
          "cStudentiPerScuola",
          "cPrezzoIscrizioneCompagniaEur",
          "cPrezzoIscrizioneScuolaEur",
          "cLicenzeMediePerPartecipante",
          "cPrezzoLicenzaConcorsoEur",
          "cInvitiMediPerStudente",
          "cConvInvitiContestPct",
          "cSovrapposizioneContestPct",
          "cQuotaSpettatoriLettoriOperaPct",
          "cCostoVariabilePerPartecipanteEur",
          "cCostoFissoPerTappaGiuriaEur",
          "cRitenzioneSerialePct",
        ],
      },
      {
        title: "4B · Flusso 'Vota Donando' + 'Sblocca Donando €2' (Attribuzione Multi-Stakeholder)",
        subtitle: "Ripartizione trasparente tra Community Danza (80%), Fondazioni/Comuni (20%), Aziende ESG (0%) ed eventuale Fee Startup.",
        auditSummary:
          "Unisce le donazioni dei votanti nei contest con lo sblocco alternativo del Director's Cut (€2) nel Reader, allocando il netto senza doppi conteggi.",
        fields: [
          "cTassoDonantiSuVotantiPct",
          "cDonazioneMediaVotoEur",
          "cTassoSbloccaDonandoReaderPct",
          "cImportoSbloccaDonandoEur",
          "cCostoGatewayPct",
          "cFeeGestioneStartupDonazioniPct",
          "cQuotaDonazioniCommunityPct",
          "cQuotaDonazioniFondazioniPct",
          "cQuotaDonazioniAziendeEsgPct",
          "cValoreBorsaEur",
        ],
      },
      {
        title: "4C · Portale Bandi (4.3) & Living Archive B2B (4.1)",
        subtitle: "Featured Calls lato domanda e abbonamenti annuali per Università/Biblioteche (Cash 24M vs Exit ARR).",
        auditSummary:
          "Distingue chiaramente i ricavi ricorrenti B2B degli atenei dall'accesso gratuito dei danzatori.",
        fields: [
          "cReturningMau",
          "cVisiteAnnuePerMau",
          "cCtrCallPct",
          "cFeaturedCalls24m",
          "cFeaturedCallPrezzoEur",
          "cCostiCuratelaBandi24m",
          "cArchiveLicenzeY1",
          "cArchiveNuoveY2",
          "cArchiveRinnovoPct",
          "cArchivePrezzoAnnuoEur",
          "cArchiveCogsPct",
        ],
      },
    ],
  },
  tecnologia: {
    headlineNote:
      "Modello v2 coerente: il canone SaaS Anno 2 deriva automaticamente dalle commesse consegnate in Anno 1 (zero canoni fantasma con 0 progetti), il costo marginale include PM/Account (45%) e il risparmio del committente si misura contro un'alternativa reale (€40k).",
    useCases: [
      {
        label: "Musei Sottosoglia + 1 Enterprise",
        description: "3 commesse da €24k (affidamento diretto) + 1 Enterprise €45k con rinnovo SaaS Y2.",
        patch: { tCommesseSottosoglia24m: 3, tPrezzoSottosogliaEur: 24000, tCommesseEnterprise24m: 1, tPrezzoEnterpriseEur: 45000, tRinnovoSaasY2Pct: 100 },
      },
      {
        label: "Espansione Lirica & Design (PLG)",
        description: "4 Sprint + 3 Enterprise in 24 mesi spinti dal badge 'Powered by'.",
        patch: { tCommesseSottosoglia24m: 4, tCommesseEnterprise24m: 3, tCanoneSaasAnnuoEur: 4200, tRinnovoSaasY2Pct: 100 },
      },
    ],
    groups: [
      {
        title: "5A · Commesse White-Label, Canone SaaS Y2 & Margini Operativi (4.7, 4.6-Platform)",
        subtitle: "Template editoriale-tecnologico chiavi in mano per altri settori creativi.",
        auditSummary:
          "Correzione v2: elimina il campo scollegato del numero piattaforme SaaS Y2 e la costante 15% COGS SaaS, derivandoli direttamente dai progetti Y1 e da input espliciti.",
        fields: [
          "tCommesseSottosoglia24m",
          "tPrezzoSottosogliaEur",
          "tCommesseEnterprise24m",
          "tPrezzoEnterpriseEur",
          "tRinnovoSaasY2Pct",
          "tCanoneSaasAnnuoEur",
          "tCogsSaasPct",
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
        <div className="max-w-4xl">
          <p className="eyebrow text-crimson">Simulatore verticale v2 · {s.audience}</p>
          <h2 className="mt-2 font-display text-3xl text-ink">{s.label} — Catene Input, Formule & Attribuzioni</h2>
          <p className="mt-2.5 flex items-start gap-2 text-sm leading-relaxed text-ink/75">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
            <span>{cfg.headlineNote}</span>
          </p>
        </div>

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

      {/* Metriche intermedie di controllo per massima trasparenza */}
      {stakeholderId === "fondazioni" && (
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Licenze Enti Distribuite", formatNumber(Math.round(raw.fLicensesIssued)), `${raw.fContractsTot} enti contrattualizzati`],
            ["Scuole di Danza Coinvolte", formatNumber(raw.fSchoolsTot), `${raw.fClassesTot} gruppi/corsi attivi`],
            ["Commissioni Turismo 4.4", `€${formatNumber(Math.round(raw.fTourismCommStartup))}`, `${inputs.tCommissioneStartupPct}% su €${formatNumber(Math.round(raw.fTourismGmv))} GMV`],
            ["Giornate Presenza Extra", formatNumber(Math.round(raw.fTourismExtraDays)), `€${formatNumber(Math.round(raw.fTourismSpillover))} indotto territorio`],
          ].map(([l, v, sub]) => (
            <div key={l} className="rounded-2xl border border-ink/10 bg-white/75 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">{l}</p>
              <p className="mt-1 font-display text-2xl text-ink tabular-nums">{v}</p>
              <p className="mt-0.5 text-xs text-ink/55">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {stakeholderId === "aziende" && (
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Pool Cross-DB + DB Startup", formatNumber(Math.round(raw.aTotalNewReachForBrands)), `Cross ${formatNumber(Math.round(raw.aCrossPoolContacts))} + DB Startup ${formatNumber(Math.round(raw.aStartupDbContacts))}`],
            ["Lead Reali Generati", formatNumber(Math.round(raw.aLeadsGeneratedFromAudience)), `Su ${formatNumber(Math.round(raw.aNewBrandReadersFromDbAndOpera))} lettori esposti (CPL ${formatNumber(Math.round(raw.aBrandEffectiveCpl))}€)`],
            ["Valore Nuovi Clienti (CLV)", `€${formatNumber(Math.round(raw.aClvValueNewCustomers))}`, `B2C €${inputs.aClvB2cEur} · B2B €${inputs.aClvB2bTechEur}`],
            ["Valore Loyalty/Crisis CRM", `€${formatNumber(Math.round(raw.aRetentionClvValue))}`, `Su ${formatNumber(Math.round(raw.aCrmProprioTot))} contatti CRM proprio`],
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
            ["Traffico DB → Turismo / Contest", `${formatNumber(Math.round(raw.iDbTrafficToTourism))} / ${formatNumber(Math.round(raw.iDbTrafficToContest))}`, "Nessun doppio conteggio licenze"],
            ["Pipeline B2B + Halo Effect", `€${formatNumber(Math.round(raw.iPipelineValueEstimated))}`, `Con +${inputs.iMoltiplicatoreAutorevolezzaPct}% autorevolezza`],
          ].map(([l, v, sub]) => (
            <div key={l} className="rounded-2xl border border-ink/10 bg-white/75 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">{l}</p>
              <p className="mt-1 font-display text-2xl text-ink tabular-nums">{v}</p>
              <p className="mt-0.5 text-xs text-ink/55">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {stakeholderId === "community" && (
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["Studenti in Gara & K_contest", `${formatNumber(raw.cStudentsTot)} · ${raw.cContestK.toFixed(2)}x`, `${raw.cContestParticipants} realtà (${inputs.cCompagnieContest} comp. + ${inputs.cScuoleContest} scuole)`],
            ["Spettatori/Votanti Trailer", formatNumber(Math.round(raw.cContestVoters)), "Audience reale generata dai contest"],
            ["Ricavi Diretti Contest Startup", `€${formatNumber(Math.round(raw.cContestRegistrationRev + raw.cContestLicensesRev))}`, `Iscr. €${formatNumber(Math.round(raw.cContestRegistrationRev))} + Lic. €${formatNumber(Math.round(raw.cContestLicensesRev))}`],
            ["Fondo Netto 'Vota Donando'", `€${formatNumber(Math.round(raw.cDonationsNetPool))}`, `${inputs.cQuotaDonazioniCommunityPct}% Comm. · ${inputs.cQuotaDonazioniFondazioniPct}% Enti · ${inputs.cFeeGestioneStartupDonazioniPct}% Fee`],
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
