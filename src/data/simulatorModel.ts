/* =========================================================================
   Modello Parametrico Pure-Input del Business Case ("Finestre sulla Danza")
   Branch: model-business
   Principi:
   - Ogni prezzo, tasso, commissione (0%-80%+), CPM (€90 default), K-factor (0-3+)
     e valore d'obiettivo stakeholder è una variabile di INPUT libera.
   - Nessuna costante arbitraria nascosta; ogni catena espone la formula live
     e una nota esplicativa chiara su assunzioni e correzione dei bias.
   - Separazione rigorosa a 4 quadranti: Startup (Monetario / Non Monetario)
     vs Stakeholder (Monetario / Non Monetario).
   ========================================================================= */

import type { StakeholderId } from "./content";

export type PresetId = "realistico" | "sitoOriginario" | "esigenzaAltaPosta" | "conservativo";

export interface SimulatorInputs {
  // 0. Diffusione, Viralità, Engagement Obiettivo & Finanza Startup
  sovrapposizioneCanaliPct: number;
  kViralita: number;
  decadimentoViralePct: number;
  cpmCulturaleEur: number;
  quotaRicaviAnno1Pct: number;
  dsoGiorniIncassoB2G: number;
  capexPiattaforma24m: number;
  costiFissiRedazione24m: number;
  costiSalesAbm24m: number;
  costiDistribuzioneSeeding24m: number;
  costiGaCdnGdpr24m: number;

  // 1. Fondazioni ed Enti (3.1, 3.3-B2G, 4.2, 4.4)
  f1Contratti24m: number;
  f1PrezzoEur: number;
  f2Contratti24m: number;
  f2PrezzoEur: number;
  f3Contratti24m: number;
  f3PrezzoEur: number;
  fCogsPct: number;
  fDbEntiContattiTot: number;
  fDbRedemptionPct: number;
  fDbLetturaProfondaPct: number;
  fIstitutiAttivati: number;
  fClassiPerIstituto: number;
  fCompletamentoDidatticoPct: number;
  fCapexEvitatoPerEnteEur: number;
  // 4.4 Turismo Dual-Flow
  tAccessiGratuitiTerritorio: number;
  tEstensioneSoggiornoPct: number;
  tGiorniExtraMedi: number;
  tSpesaGiornalieraTerritorioEur: number;
  tAccessiBookingStartup: number;
  tConvBookingPct: number;
  tScontrinoMedioServizioEur: number;
  tCommissioneStartupPct: number; // 0% - 80%+

  // 2. Aziende e Brand (3.3-B2B, 4.5, 4.6-Insight + Loyalty/Crisis)
  aCultContratti24m: number;
  aCultPrezzoEur: number;
  aCogsCultPct: number;
  aCultCrmContattiTot: number;
  aCultRedemptionPct: number;
  aCultLetturaProfondaPct: number;
  aTechContratti24m: number;
  aTechTicketLordoEur: number;
  aTechBarterPct: number;
  aCogsTechLordoPct: number;
  aLeadPerTechPartner: number;
  aSqlRatePct: number;
  aCplFieraComparabileEur: number;
  aSurveyCompletionPct: number;
  aGdprOptInPct: number;
  aValoreRicercaEvitataBrandEur: number;
  aClickPopupImportantePct: number;
  aConvObiettivoBrandPct: number;
  aValoreObiettivoBrandEur: number;

  // 3. Istituzioni Culturali e Media (3.4, 3.5, 3.6)
  iSpeciali24m: number;
  iReachPropriaIstituzione: number;
  iReachStartupIncrementale: number;
  iCostoProdEvitatoEnteEur: number;
  iCostoDirettoStartupSpecialeEur: number;
  iConvDbIstituzioneAzioniStartupPct: number;
  iValoreMedioAzioneMonetizzataEur: number;
  iMoltiplicatoreAutorevolezzaPct: number;
  iContattiB2BOriginePerSpeciale: number;
  iConvPipelineIstituzioniPct: number;
  iValoreMedioDealPipelineEur: number;
  iAperturaContenutoPct: number;
  iClickEventoImportantePct: number;
  iConvObiettivoIstituzionePct: number;
  iValoreObiettivoIstituzioneEur: number;
  iValoreProgettoSpecialeFissoEur: number;
  iCopieStampaEsposte: number;
  iQrScanPct: number;
  iStampaLetturaProfondaPct: number;
  iCostoPonteStampaStartupEur: number;
  iCicliInchiesta: number;
  iRipreseStampaPerCiclo: number;
  iRispostaIstituzionalePct: number;

  // 4. Community Danza & Ricerca Istituzionale (3.2, 4.3, 4.1)
  cTappe24m: number;
  cVotiPerTappa: number;
  cTassoDonantiSuVotantiPct: number;
  cDonazioneMediaEur: number;
  cFeeGestioneStartupPct: number;
  cCostoGatewayPct: number;
  cValoreBorsaEur: number;
  cRitenzioneSerialePct: number;
  cCommunitySemiOrganici: number;
  cReturningMau: number;
  cVisiteAnnuePerMau: number;
  cCtrCallPct: number;
  cFeaturedCalls24m: number;
  cFeaturedCallPrezzoEur: number;
  cCostiCommunityOps24m: number;
  cArchiveLicenzeY1: number;
  cArchiveNuoveY2: number;
  cArchiveRinnovoPct: number;
  cArchivePrezzoAnnuoEur: number;
  cArchiveCogsPct: number;

  // 5. Tecnologia & White-Label (4.7, 4.6-Platform)
  tCommesseSottosoglia24m: number;
  tPrezzoSottosogliaEur: number;
  tCommesseEnterprise24m: number;
  tPrezzoEnterpriseEur: number;
  tCanoneSaasAnnuoEur: number;
  tCommesseY1AttiveSaas: number;
  tCostoMarginaleProduzionePct: number;
  tQuotaLeadPlgBadgePct: number;
  tCapexAlternativoClienteEur: number;
  tSettimaneConsegna: number;
  tSettimaneCustomExNovo: number;
}

export interface InputFieldMeta {
  key: keyof SimulatorInputs;
  label: string;
  unit: "€" | "%" | "n" | "gg" | "x" | "sett";
  min: number;
  max: number;
  step: number;
  assumptionNote: string;
  biasNote?: string;
}

export const INPUT_META: Record<keyof SimulatorInputs, InputFieldMeta> = {
  sovrapposizioneCanaliPct: {
    key: "sovrapposizioneCanaliPct",
    label: "Sovrapposizione audience tra canali",
    unit: "%",
    min: 0,
    max: 70,
    step: 1,
    assumptionNote: "Quota stimata di persone raggiunte su più canali (es. lettori sia da festival che da social) sottratta per calcolare la reach unica deduplicata.",
    biasNote: "Il sito originario somma le audience di canale senza esplicitare la deduplicazione.",
  },
  kViralita: {
    key: "kViralita",
    label: "Coefficiente di viralità (K-factor)",
    unit: "x",
    min: 0,
    max: 3,
    step: 0.05,
    assumptionNote: "Nuovi lettori generati in prima ondata da ogni lettore primario (K = inviti × tasso di conversione). Può essere 0 (nessuna viralità) o 2+ (alta mobilitazione).",
    biasNote: "Sul sito era bloccato a K = 1,35 senza decadimento, portando matematicamente a crescita infinita.",
  },
  decadimentoViralePct: {
    key: "decadimentoViralePct",
    label: "Smorzamento di saturazione per ondata",
    unit: "%",
    min: 0,
    max: 90,
    step: 5,
    assumptionNote: "Riduzione della conversione virale tra la 1ª, 2ª e 3ª ondata dovuta al fatto che le community culturali si sovrappongono rapidamente.",
  },
  cpmCulturaleEur: {
    key: "cpmCulturaleEur",
    label: "CPM media culturali su reach incrementale Startup",
    unit: "€",
    min: 0,
    max: 300,
    step: 5,
    assumptionNote: "Valore equivalente per 1.000 contatti nuovi e diversi rispetto al DB già posseduto dall'Istituzione. Default €90 CPM tipico dei media culturali verticali ad alta affinità.",
    biasNote: "Corregge il €1,20/contatto (= €1.200 CPM) del sito applicato indiscriminatamente anche alla mailing list propria dell'ente.",
  },
  quotaRicaviAnno1Pct: {
    key: "quotaRicaviAnno1Pct",
    label: "Quota ricavi maturata in Anno 1 (vs Anno 2)",
    unit: "%",
    min: 10,
    max: 70,
    step: 2,
    assumptionNote: "Ripartizione temporale dei ricavi su 24 mesi: in Anno 1 si costruisce piattaforma/pilota (es. 30%-35%), in Anno 2 scala e rinnovi (65%-70%).",
  },
  dsoGiorniIncassoB2G: {
    key: "dsoGiorniIncassoB2G",
    label: "Tempi medi incasso Enti/Fondazioni (DSO)",
    unit: "gg",
    min: 0,
    max: 240,
    step: 15,
    assumptionNote: "Giorni medi tra fatturazione e incasso effettivo da PA, Regioni e Fondazioni. Impatta il capitale circolante e il fabbisogno di cassa reale.",
    biasNote: "Completamente omesso sul sito: un contratto firmato a ottobre può essere incassato nell'anno successivo.",
  },
  capexPiattaforma24m: {
    key: "capexPiattaforma24m",
    label: "Capex piattaforma tech & tracking interattivo (24M)",
    unit: "€",
    min: 0,
    max: 200000,
    step: 5000,
    assumptionNote: "Sviluppo web-app multimediale, player 4K, mappe, telemetria popup interattivi, QR/NFC e modularizzazione White-Label.",
  },
  costiFissiRedazione24m: {
    key: "costiFissiRedazione24m",
    label: "Costi fissi redazione, produzione L0 e inchieste (24M)",
    unit: "€",
    min: 0,
    max: 350000,
    step: 5000,
    assumptionNote: "Direzione editoriale, autori indipendenti, montaggio base e produzione dossier d'inchiesta indipendenti dai singoli contratti.",
  },
  costiSalesAbm24m: {
    key: "costiSalesAbm24m",
    label: "Costi team Sales, ABM, PM & Account (24M)",
    unit: "€",
    min: 0,
    max: 250000,
    step: 4000,
    assumptionNote: "Compensi commerciali, preparazione cofanetti ABM e account management per seguire enti e sponsor.",
  },
  costiDistribuzioneSeeding24m: {
    key: "costiDistribuzioneSeeding24m",
    label: "Spese dirette Phygital (QR/NFC), media kit & seeding (24M)",
    unit: "€",
    min: 0,
    max: 150000,
    step: 2000,
    assumptionNote: "Stampa segnalibri/totem QR, tag NFC, media kit personalizzati e micro-campagne di seeding. Il CAC diretto deriva dalla divisione di questa spesa per i lettori ottenuti.",
    biasNote: "Sul sito €0,40 era presentato come parametro quasi costante anziché risultato dipendente da costi reali e viralità effettiva.",
  },
  costiGaCdnGdpr24m: {
    key: "costiGaCdnGdpr24m",
    label: "G&A, cloud streaming 4K, legali GDPR & amministrazione (24M)",
    unit: "€",
    min: 0,
    max: 150000,
    step: 2000,
    assumptionNote: "Banda video, hosting, DPO/GDPR compliance, contabilità e costi generali di funzionamento della startup.",
  },

  // S1 Fondazioni ed Enti
  f1Contratti24m: {
    key: "f1Contratti24m",
    label: "Contratti Tier F1 · Istituzionale Base (24M)",
    unit: "n",
    min: 0,
    max: 40,
    step: 1,
    assumptionNote: "Numero di fondazioni o enti acquirenti del pacchetto base (licenze digitali + ex-libris + kit scuole) in 24 mesi.",
  },
  f1PrezzoEur: {
    key: "f1PrezzoEur",
    label: "Prezzo unitario Tier F1",
    unit: "€",
    min: 0,
    max: 35000,
    step: 500,
    assumptionNote: "Prezzo editabile del pacchetto base (default €9.800 da listino sito).",
  },
  f2Contratti24m: {
    key: "f2Contratti24m",
    label: "Contratti Tier F2 · Edizione Territoriale & Tourism (24M)",
    unit: "n",
    min: 0,
    max: 25,
    step: 1,
    assumptionNote: "Unioni di Comuni, DMO o Fondazioni territoriali che attivano reportage locali + itinerari geolocalizzati (3.3-B2G + 4.4).",
  },
  f2PrezzoEur: {
    key: "f2PrezzoEur",
    label: "Prezzo unitario Tier F2",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Include produzione contenuti territoriali, audio-guide e integrazione QR su info-point/strutture.",
  },
  f3Contratti24m: {
    key: "f3Contratti24m",
    label: "Contratti Tier F3 · Programma Regionale Annuale (24M)",
    unit: "n",
    min: 0,
    max: 15,
    step: 1,
    assumptionNote: "Accordi quadro regionali multi-uscita con licenze estese e più itinerari integrati.",
  },
  f3PrezzoEur: {
    key: "f3PrezzoEur",
    label: "Prezzo unitario Tier F3",
    unit: "€",
    min: 0,
    max: 60000,
    step: 500,
    assumptionNote: "Prezzo comprensivo di eventuale sconto programma annuale.",
  },
  fCogsPct: {
    key: "fCogsPct",
    label: "COGS variabili erogazione B2B/B2G (% sui ricavi)",
    unit: "%",
    min: 0,
    max: 70,
    step: 1,
    assumptionNote: "Costo marginale di personalizzazione ex-libris, adattamento schede didattiche, reportage locali e reportistica trimestrale.",
  },
  fDbEntiContattiTot: {
    key: "fDbEntiContattiTot",
    label: "Contatti totali raggiunti sui DB/Portali degli Enti",
    unit: "n",
    min: 0,
    max: 500000,
    step: 5000,
    assumptionNote: "Iscritti a newsletter comunali/regionali, soci di fondazioni e portali cittadini a cui l'ente invia gratuitamente l'opera.",
  },
  fDbRedemptionPct: {
    key: "fDbRedemptionPct",
    label: "Tasso di riscatto (download/apertura) su DB Enti",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Percentuale di cittadini/utenti che apre effettivamente l'ebook dal link istituzionale (realistico PA/Fondazioni: 5%-12%).",
    biasNote: "Il 27% del sito è un tasso più vicino all'open-rate email che al riscatto netto su DB freddi.",
  },
  fDbLetturaProfondaPct: {
    key: "fDbLetturaProfondaPct",
    label: "Quota riscatti con lettura attiva (> 4 min)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di chi apre il link istituzionale che completa almeno una sezione multimediale.",
  },
  fIstitutiAttivati: {
    key: "fIstitutiAttivati",
    label: "Istituti scolastici / accademie adottanti (4.2)",
    unit: "n",
    min: 0,
    max: 500,
    step: 5,
    assumptionNote: "Scuole superiori, licei coreutici (circa 50 in Italia) e istituti raggiunti tramite bandi o pacchetti F1/F3.",
    biasNote: "Il target sito di 320 istituti presuppone un'ampia espansione oltre i soli licei coreutici.",
  },
  fClassiPerIstituto: {
    key: "fClassiPerIstituto",
    label: "Classi medie coinvolte per istituto",
    unit: "n",
    min: 0,
    max: 15,
    step: 0.2,
    assumptionNote: "Numero medio di classi che adottano il kit multimediale in ciascuna scuola aderente.",
  },
  fCompletamentoDidatticoPct: {
    key: "fCompletamentoDidatticoPct",
    label: "Completamento moduli didattici in classe",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Percentuale di classi che porta a termine il percorso PCTO o laboratorio assegnato.",
  },
  fCapexEvitatoPerEnteEur: {
    key: "fCapexEvitatoPerEnteEur",
    label: "Costo progetto culturale/didattico evitato per ente",
    unit: "€",
    min: 0,
    max: 100000,
    step: 2000,
    assumptionNote: "Quanto spenderebbe l'ente per commissionare separatamente piattaforma, documentari e kit PCTO.",
  },
  tAccessiGratuitiTerritorio: {
    key: "tAccessiGratuitiTerritorio",
    label: "Accessi turistici gratuiti su territorio (non monetizzati)",
    unit: "n",
    min: 0,
    max: 200000,
    step: 2000,
    assumptionNote: "Consultazioni gratuite di mappe e audio-guide nei borghi/info-point che non passano da checkout Startup: valore attribuito alle Istituzioni.",
    biasNote: "Corregge il vecchio KPI generico 'Accessi per destinazione' separando il beneficio pubblico territoriale dal ricavo Startup.",
  },
  tEstensioneSoggiornoPct: {
    key: "tEstensioneSoggiornoPct",
    label: "% visitatori che estende soggiorno/visita grazie all'opera",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Quota di fruitori gratuiti che aggiunge almeno una giornata o notte sul territorio per spettacoli o botteghe scoperte nella guida.",
  },
  tGiorniExtraMedi: {
    key: "tGiorniExtraMedi",
    label: "Giornate di presenza media aggiunte per convertito",
    unit: "gg",
    min: 0,
    max: 7,
    step: 0.1,
    assumptionNote: "Durata media dell'estensione di permanenza locale (usata dagli osservatori turistici per stimare le giornate di presenza).",
  },
  tSpesaGiornalieraTerritorioEur: {
    key: "tSpesaGiornalieraTerritorioEur",
    label: "Spesa media giornaliera sul territorio (per giornata presenza)",
    unit: "€",
    min: 0,
    max: 350,
    step: 5,
    assumptionNote: "Spesa locale media per vitto, alloggio, artigianato e biglietteria culturale attribuita al territorio/istituzioni.",
  },
  tAccessiBookingStartup: {
    key: "tAccessiBookingStartup",
    label: "Accessi da contenuti digitali Startup verso servizi prenotabili",
    unit: "n",
    min: 0,
    max: 200000,
    step: 1000,
    assumptionNote: "Utenti che arrivano alle schede prenotazione (pernottamenti, visite esperienziali, servizi organizzati) grazie ai contenuti della Startup.",
  },
  tConvBookingPct: {
    key: "tConvBookingPct",
    label: "Tasso conversione in prenotazione effettiva (4.4)",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Percentuale di accessi alle call-to-action di prenotazione che conclude l'acquisto/booking tracciato.",
  },
  tScontrinoMedioServizioEur: {
    key: "tScontrinoMedioServizioEur",
    label: "Valore medio prenotazione / servizio turistico (GMV)",
    unit: "€",
    min: 0,
    max: 1000,
    step: 5,
    assumptionNote: "Valore lordo della transazione (biglietto, esperienza artigiana, pacchetto ricettivo o servizio organizzato).",
  },
  tCommissioneStartupPct: {
    key: "tCommissioneStartupPct",
    label: "Commissione applicata dalla Startup (0% – 80%+)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Fee applicata dalla Startup alle imprese ricettive/operatori: es. 0% se non intermediato, 10%-18% su affiliate hotel/esperienze, fino all'80% su servizi organizzati direttamente dalla Startup.",
    biasNote: "Totalmente assente nel sito originario, che regalava il valore commerciale delle prenotazioni senza attribuire commissioni alla Startup.",
  },

  // S2 Aziende e Brand
  aCultContratti24m: {
    key: "aCultContratti24m",
    label: "Sponsorizzazioni Culturali Private (3.3-B2B)",
    unit: "n",
    min: 0,
    max: 30,
    step: 1,
    assumptionNote: "Numero di capitoli tematici sostenuti da brand affini (benessere, moda, lifestyle) in 24 mesi.",
  },
  aCultPrezzoEur: {
    key: "aCultPrezzoEur",
    label: "Prezzo medio capitolo Cultural Sponsorship",
    unit: "€",
    min: 0,
    max: 50000,
    step: 1000,
    assumptionNote: "Ticket negoziato con il brand privato (listino sito €24.000, calibrabile liberamente su PMI o grandi gruppi).",
  },
  aCogsCultPct: {
    key: "aCogsCultPct",
    label: "COGS produzione capitolo sponsorizzato (%)",
    unit: "%",
    min: 0,
    max: 70,
    step: 1,
    assumptionNote: "Costi editoriali dedicati, reportage foto/audio e kit distribuzione CRM per il brand.",
  },
  aCultCrmContattiTot: {
    key: "aCultCrmContattiTot",
    label: "Contatti CRM aziendali raggiunti (totale sponsor)",
    unit: "n",
    min: 0,
    max: 1000000,
    step: 10000,
    assumptionNote: "Dimensione cumulata dei database clienti/prospect a cui le aziende inviano l'ebook come omaggio culturale.",
  },
  aCultRedemptionPct: {
    key: "aCultRedemptionPct",
    label: "Redemption effettiva su CRM aziendale",
    unit: "%",
    min: 0,
    max: 45,
    step: 1,
    assumptionNote: "Tasso reale di apertura/download da DEM brand (realistico B2C/B2B: 4%-9%).",
  },
  aCultLetturaProfondaPct: {
    key: "aCultLetturaProfondaPct",
    label: "Quota redemption brand con lettura attiva (> 4 min)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di clienti del brand che fruisce in profondità il capitolo tematico.",
  },
  aTechContratti24m: {
    key: "aTechContratti24m",
    label: "Partner Tecnici & Filiera (4.5 Tech Showcase)",
    unit: "n",
    min: 0,
    max: 30,
    step: 1,
    assumptionNote: "Aziende di illuminotecnica, pavimenti tecnici, acustica, tessuti, fisioterapia sportiva coinvolte in 24 mesi.",
  },
  aTechTicketLordoEur: {
    key: "aTechTicketLordoEur",
    label: "Valore lordo pacchetto Tech Showcase",
    unit: "€",
    min: 0,
    max: 60000,
    step: 1000,
    assumptionNote: "Valore nominale dell'accordo per singolo partner tecnico (cash + eventuale quota barter).",
  },
  aTechBarterPct: {
    key: "aTechBarterPct",
    label: "Quota Barter tecnico reale (% sul lordo)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota in fornitura tecnica/riprese contabilizzata SOLO a riduzione del COGS tecnico (mai come ricavo cash).",
    biasNote: "Sul sito il 30% barter entrava impropriamente nel totale ricavi non diluitivi (€1,52M).",
  },
  aCogsTechLordoPct: {
    key: "aCogsTechLordoPct",
    label: "COGS lordo produzione video-esplosi 4K (4.5)",
    unit: "%",
    min: 0,
    max: 80,
    step: 1,
    assumptionNote: "Costo tecnico di produzione prima dell'eventuale compensazione da barter.",
  },
  aLeadPerTechPartner: {
    key: "aLeadPerTechPartner",
    label: "Lead B2B generati per partner tecnico (24M)",
    unit: "n",
    min: 0,
    max: 200,
    step: 2,
    assumptionNote: "Richieste di contatto o scheda tecnica generate da teatri, scuole e professionisti verso il partner.",
  },
  aSqlRatePct: {
    key: "aSqlRatePct",
    label: "Tasso qualificazione commerciale lead (MQL → SQL)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di lead che si trasforma in reale opportunità commerciale qualificata per il partner.",
    biasNote: "Corregge il 'CPL €18' ambiguo del sito calcolando il CPL effettivo sostenuto dallo sponsor e confrontandolo sui soli SQL reali.",
  },
  aCplFieraComparabileEur: {
    key: "aCplFieraComparabileEur",
    label: "Costo equivalente per lead qualificato in fiera B2B",
    unit: "€",
    min: 0,
    max: 1000,
    step: 10,
    assumptionNote: "Benchmark alternativo dello sponsor per acquisire un contatto qualificato equivalente in fiere o campagne B2B.",
  },
  aSurveyCompletionPct: {
    key: "aSurveyCompletionPct",
    label: "Completamento quiz / sondaggi interattivi (4.6)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Quota di lettori unici che completa il modulo Zero-Party Data (realistico: 18%-30%; sito: 58%).",
  },
  aGdprOptInPct: {
    key: "aGdprOptInPct",
    label: "Consenso esplicito GDPR su rispondenti (Opt-in)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Percentuale che lascia consenso segmentato e utilizzabile per insight e comunicazioni.",
  },
  aValoreRicercaEvitataBrandEur: {
    key: "aValoreRicercaEvitataBrandEur",
    label: "Valore ricerca di mercato risparmiata per brand (4.6)",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Costo che l'azienda eviterebbe rispetto a commissionare un panel/survey esterno sul pubblico culturale.",
  },
  aClickPopupImportantePct: {
    key: "aClickPopupImportantePct",
    label: "Click su popup strategico Brand (Loyalty / Crisis)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota di lettori esposti ai contenuti brand che clicca sul popup/scheda interattiva ('cosa ha fatto l'azienda / gestione crisi').",
    biasNote: "Indicatore completamente mancante nel sito per le imprese private.",
  },
  aConvObiettivoBrandPct: {
    key: "aConvObiettivoBrandPct",
    label: "Conversione obiettivo Brand da interazione chiave",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota di chi interagisce con il contenuto importante che raggiunge l'obiettivo aziendale (fedeltà, recupero fiducia, richiesta info).",
  },
  aValoreObiettivoBrandEur: {
    key: "aValoreObiettivoBrandEur",
    label: "Valore economico obiettivo unitario per l'Impresa",
    unit: "€",
    min: 0,
    max: 50000,
    step: 25,
    assumptionNote: "Valore stimato dall'impresa per ciascuna conversione di brand loyalty, contenimento crisi o preferenza commerciale.",
  },

  // S3 Istituzioni Culturali e Media
  iSpeciali24m: {
    key: "iSpeciali24m",
    label: "Speciali editoriali per Festival & Teatri (3.4)",
    unit: "n",
    min: 0,
    max: 20,
    step: 1,
    assumptionNote: "Numero di produzioni monografiche realizzate in partnership a costo zero per l'istituzione.",
  },
  iReachPropriaIstituzione: {
    key: "iReachPropriaIstituzione",
    label: "Contatti propri dell'Istituzione (DB/abbonati ente)",
    unit: "n",
    min: 0,
    max: 2000000,
    step: 10000,
    assumptionNote: "Audience già posseduta dall'istituzione su cui NON si applica alcun CPM fittizio, ma che genera enormi benefici diretti e di autorevolezza per la Startup.",
    biasNote: "Corregge il doppio errore del sito: toglie il CPM fittizio sul DB proprio dell'ente e valorizza il traffico portato dall'ente alla Startup.",
  },
  iReachStartupIncrementale: {
    key: "iReachStartupIncrementale",
    label: "Contatti DIVERSI pubblicati dalla Startup (Reach Incrementale)",
    unit: "n",
    min: 0,
    max: 1500000,
    step: 10000,
    assumptionNote: "Audience nuova e non sovrapposta raggiunta dalla Startup fuori dal database dell'Istituzione; su questa si calcola il CPM culturale.",
  },
  iCostoProdEvitatoEnteEur: {
    key: "iCostoProdEvitatoEnteEur",
    label: "Costo produzione editoriale risparmiato dall'Ente / speciale",
    unit: "€",
    min: 0,
    max: 100000,
    step: 1000,
    assumptionNote: "Quanto costerebbe all'istituzione produrre internamente saggi, interviste, clip prove e archivio digitale.",
  },
  iCostoDirettoStartupSpecialeEur: {
    key: "iCostoDirettoStartupSpecialeEur",
    label: "Costo marginale sostenuto dalla Startup / speciale (3.4)",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Rende esplicito il costo sostenuto dalla Startup dietro la formula 'a costo zero per l'ente'.",
  },
  iConvDbIstituzioneAzioniStartupPct: {
    key: "iConvDbIstituzioneAzioniStartupPct",
    label: "% contatti DB Istituzione → azioni monetizzabili Startup",
    unit: "%",
    min: 0,
    max: 30,
    step: 0.5,
    assumptionNote: "Quota di lettori provenienti dal database dell'Istituzione che compie azioni monetizzabili sull'ecosistema Startup (acquisti, pernottamenti, servizi, donazioni).",
  },
  iValoreMedioAzioneMonetizzataEur: {
    key: "iValoreMedioAzioneMonetizzataEur",
    label: "Margine/ricavo medio Startup per azione da DB Istituzione",
    unit: "€",
    min: 0,
    max: 500,
    step: 1,
    assumptionNote: "Ricavo netto medio incassato dalla Startup per ogni azione monetizzata generata dal traffico qualificato dell'ente.",
  },
  iMoltiplicatoreAutorevolezzaPct: {
    key: "iMoltiplicatoreAutorevolezzaPct",
    label: "Spinta di Autorevolezza su nuove Istituzioni (Halo Effect)",
    unit: "%",
    min: 0,
    max: 200,
    step: 5,
    assumptionNote: "Beneficio NON monetizzabile strategico: l'endorsement di una grande Istituzione legittima la startup sconosciuta e moltiplica la capacità di coinvolgere altri enti.",
  },
  iContattiB2BOriginePerSpeciale: {
    key: "iContattiB2BOriginePerSpeciale",
    label: "Nuovi contatti decisionali originati / speciale (3.4)",
    unit: "n",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Direttori, sponsor e partner incontrati grazie alla collaborazione con il festival/teatro.",
  },
  iConvPipelineIstituzioniPct: {
    key: "iConvPipelineIstituzioniPct",
    label: "Tasso conversione pipeline in trattative/contratti",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota di contatti originati che evolve in proposta attiva (amplificata dall'autorevolezza istituzionale).",
  },
  iValoreMedioDealPipelineEur: {
    key: "iValoreMedioDealPipelineEur",
    label: "Valore medio atteso per deal originato in pipeline",
    unit: "€",
    min: 0,
    max: 80000,
    step: 1000,
    assumptionNote: "Valore indicativo dei contratti B2B/B2G/WL originati (mostrato come origination separata per non duplicare i ricavi S1/S2/S5).",
  },
  iAperturaContenutoPct: {
    key: "iAperturaContenutoPct",
    label: "Tasso apertura contenuto multimediale su esposti (3.4)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota complessiva di utenti raggiunti (DB ente + Startup) che apre effettivamente l'opera interattiva.",
  },
  iClickEventoImportantePct: {
    key: "iClickEventoImportantePct",
    label: "Click su evento importante (popup Loyalty / Crisis / Invito)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota di lettori che interagisce con l'elemento multimediale critico ('l'Istituzione ha fatto X / non ha fatto Y').",
  },
  iConvObiettivoIstituzionePct: {
    key: "iConvObiettivoIstituzionePct",
    label: "Conversione effettiva su obiettivo Istituzione",
    unit: "%",
    min: 0,
    max: 100,
    step: 0.5,
    assumptionNote: "Percentuale di chi legge l'evento importante che compie l'azione attesa (es. partecipazione conferenza stampa, loyalty, contenimento crisi).",
  },
  iValoreObiettivoIstituzioneEur: {
    key: "iValoreObiettivoIstituzioneEur",
    label: "Valore economico unitario per obiettivo Istituzione",
    unit: "€",
    min: 0,
    max: 200000,
    step: 50,
    assumptionNote: "Valore per singola conversione obiettivo (es. €350 loyalty/abbonamento, o valore molto alto per investitore/mecenate).",
  },
  iValoreProgettoSpecialeFissoEur: {
    key: "iValoreProgettoSpecialeFissoEur",
    label: "Valore obiettivo discreto / progetto finanziato (es. Conf. Stampa)",
    unit: "€",
    min: 0,
    max: 500000,
    step: 5000,
    assumptionNote: "Input opzionale per casi binari o ad alta posta (es. €100.000 se l'invito virale a una conferenza stampa porta al finanziamento di un progetto privato).",
  },
  iCopieStampaEsposte: {
    key: "iCopieStampaEsposte",
    label: "Copie stampa e abbonati esposti agli inserti (3.5)",
    unit: "n",
    min: 0,
    max: 1000000,
    step: 10000,
    assumptionNote: "Tiratura complessiva su quotidiani e riviste culturali partner.",
  },
  iQrScanPct: {
    key: "iQrScanPct",
    label: "Tasso scansione QR da carta a digitale (3.5)",
    unit: "%",
    min: 0,
    max: 25,
    step: 0.2,
    assumptionNote: "Conversione realistica carta → QR sulla stampa italiana: 0,8%-2,5% (sul sito era 14%).",
  },
  iStampaLetturaProfondaPct: {
    key: "iStampaLetturaProfondaPct",
    label: "Quota scan QR stampa che diventa lettore attivo",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di chi inquadra il QR che completa la fruizione digitale.",
  },
  iCostoPonteStampaStartupEur: {
    key: "iCostoPonteStampaStartupEur",
    label: "Costo Startup per progettazione inserti e ponte digitale (3.5)",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Impaginazione phygital, QR dinamici e produzione clip video dedicate agli inserti.",
  },
  iCicliInchiesta: {
    key: "iCicliInchiesta",
    label: "Cicli d'inchiesta 'Stati Generali & Pagina Bianca' (3.6)",
    unit: "n",
    min: 0,
    max: 12,
    step: 1,
    assumptionNote: "Numero di dossier di advocacy pubblicati nei 24 mesi.",
  },
  iRipreseStampaPerCiclo: {
    key: "iRipreseStampaPerCiclo",
    label: "Riprese stampa e media per ciclo (3.6)",
    unit: "n",
    min: 0,
    max: 150,
    step: 1,
    assumptionNote: "Articoli, lanci agenzia e citazioni generate (realistico emergente: 12-25; sito: 85).",
  },
  iRispostaIstituzionalePct: {
    key: "iRispostaIstituzionalePct",
    label: "Tasso risposta enti interpellati ('Pagina Bianca')",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di decisori pubblici che invia presa di posizione ufficiale.",
  },

  // S4 Community Danza & Ricerca 4.1
  cTappe24m: {
    key: "cTappe24m",
    label: "Tappe territoriali contest 'Cronache' (3.2)",
    unit: "n",
    min: 0,
    max: 30,
    step: 1,
    assumptionNote: "Numero di concorsi locali con scuole, compagnie e giornalisti-giurati in 24 mesi.",
  },
  cVotiPerTappa: {
    key: "cVotiPerTappa",
    label: "Voti medi raccolti per tappa territoriale",
    unit: "n",
    min: 0,
    max: 15000,
    step: 250,
    assumptionNote: "Partecipazione del pubblico mobilitato dalle scuole e compagnie locali.",
  },
  cTassoDonantiSuVotantiPct: {
    key: "cTassoDonantiSuVotantiPct",
    label: "% votanti che effettua la micro-donazione (3.2)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota reale di votanti che dona per le borse di studio (realistico: 5%-15%; sul sito era implicitamente 100%).",
    biasNote: "Separare i voti gratuiti dai donatori effettivi evita sovrastime di 8×-10× sul fondo borse.",
  },
  cDonazioneMediaEur: {
    key: "cDonazioneMediaEur",
    label: "Importo medio micro-donazione per donante",
    unit: "€",
    min: 0,
    max: 50,
    step: 0.5,
    assumptionNote: "Ticket medio donato tramite 'dona con il voto' (es. €2–€5).",
  },
  cFeeGestioneStartupPct: {
    key: "cFeeGestioneStartupPct",
    label: "Eventuale fee di gestione piattaforma Startup (0% - 20%+)",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Impostabile a 0% per etica totale verso le borse di studio oppure >0% se la startup gestisce il servizio.",
  },
  cCostoGatewayPct: {
    key: "cCostoGatewayPct",
    label: "Costi transazione pagamento (Stripe/gateway)",
    unit: "%",
    min: 0,
    max: 10,
    step: 0.5,
    assumptionNote: "Commissione tecnica bancaria detratta dal lordo raccolto.",
  },
  cValoreBorsaEur: {
    key: "cValoreBorsaEur",
    label: "Importo unitario per singola borsa di studio",
    unit: "€",
    min: 100,
    max: 5000,
    step: 100,
    assumptionNote: "Valore di una borsa di studio assegnata agli allievi/scuole.",
  },
  cRitenzioneSerialePct: {
    key: "cRitenzioneSerialePct",
    label: "Ritenzione seriale tra episodi (3.2)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Lettori della prima puntata che seguono almeno il 60% della stagione.",
  },
  cCommunitySemiOrganici: {
    key: "cCommunitySemiOrganici",
    label: "Lettori primari organici da Community, Dark Social & Spoke",
    unit: "n",
    min: 0,
    max: 100000,
    step: 500,
    assumptionNote: "Base di lettori attivi iniziali provenienti da scuole partecipanti, gruppi WhatsApp/Telegram e clip social prima della viralità.",
  },
  cReturningMau: {
    key: "cReturningMau",
    label: "Returning MAU portale Bandi & Audizioni (4.3)",
    unit: "n",
    min: 0,
    max: 30000,
    step: 250,
    assumptionNote: "Danzatori, coreografi e operatori che tornano mensilmente (nicchia Italia realistica: 1.500-3.500; sito: 9.500).",
  },
  cVisiteAnnuePerMau: {
    key: "cVisiteAnnuePerMau",
    label: "Sessioni call qualificate all'anno per MAU",
    unit: "x",
    min: 0,
    max: 24,
    step: 0.2,
    assumptionNote: "Rende esplicito il denominatore mancante del sito tra MAU e candidature generate.",
  },
  cCtrCallPct: {
    key: "cCtrCallPct",
    label: "Click-through su bandi e audizioni (4.3)",
    unit: "%",
    min: 0,
    max: 60,
    step: 1,
    assumptionNote: "Quota di visite call che genera candidatura o click qualificato.",
  },
  cFeaturedCalls24m: {
    key: "cFeaturedCalls24m",
    label: "Call / Audizioni sponsorizzate in evidenza (24M)",
    unit: "n",
    min: 0,
    max: 200,
    step: 2,
    assumptionNote: "Bandi di teatri/residenze pubblicati in modalità premium lato offerta (B2B), lasciando gratis l'accesso ai danzatori.",
  },
  cFeaturedCallPrezzoEur: {
    key: "cFeaturedCallPrezzoEur",
    label: "Prezzo unitario Featured Call B2B",
    unit: "€",
    min: 0,
    max: 2000,
    step: 50,
    assumptionNote: "Fee per scheda video residenza, evidenza WhatsApp e raccolta portfolio.",
  },
  cCostiCommunityOps24m: {
    key: "cCostiCommunityOps24m",
    label: "Costi operativi curatela bandi & contest (24M)",
    unit: "€",
    min: 0,
    max: 120000,
    step: 2000,
    assumptionNote: "Lavoro di moderazione, ricerca call e gestione tappe territoriali sui 24 mesi.",
  },
  cArchiveLicenzeY1: {
    key: "cArchiveLicenzeY1",
    label: "Licenze B2B Living Archive attivate in Anno 1 (4.1)",
    unit: "n",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Buyer effettivi: Università, DAMS, Conservatori, Biblioteche e Associazioni (separati dalla Community gratuita).",
  },
  cArchiveNuoveY2: {
    key: "cArchiveNuoveY2",
    label: "Nuove licenze Living Archive acquisite in Anno 2",
    unit: "n",
    min: 0,
    max: 150,
    step: 1,
    assumptionNote: "Nuovi enti abbonati nel secondo anno.",
  },
  cArchiveRinnovoPct: {
    key: "cArchiveRinnovoPct",
    label: "Tasso rinnovo annuale Anno 2 (4.1)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Quota di licenze Anno 1 rinnovate in Anno 2.",
  },
  cArchivePrezzoAnnuoEur: {
    key: "cArchivePrezzoAnnuoEur",
    label: "Canone annuo licenza Living Archive (4.1)",
    unit: "€",
    min: 0,
    max: 6000,
    step: 100,
    assumptionNote: "Prezzo calibrabile per atenei/biblioteche italiane (realistico: €1.200-€1.800; sito: €3.000).",
    biasNote: "Sul sito l'ARR veniva sommato a valori 24M; qui vengono mostrati separatamente Cumulato Cash 24M ed Exit ARR.",
  },
  cArchiveCogsPct: {
    key: "cArchiveCogsPct",
    label: "COGS aggiornamento trimestrale archivio (%)",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Costo variabile di catalogazione trimestrale e supporto multi-utente.",
  },

  // S5 Tecnologia & White-Label
  tCommesseSottosoglia24m: {
    key: "tCommesseSottosoglia24m",
    label: "Commesse White-Label Sprint / Sottosoglia (24M)",
    unit: "n",
    min: 0,
    max: 20,
    step: 1,
    assumptionNote: "Progetti replicati in affidamento diretto per musei, fondazioni, rassegne su template modulare standard.",
  },
  tPrezzoSottosogliaEur: {
    key: "tPrezzoSottosogliaEur",
    label: "Prezzo unitario White-Label Sprint",
    unit: "€",
    min: 0,
    max: 60000,
    step: 1000,
    assumptionNote: "Riconcilia il valore implicito €22.500 del sito con una fascia entry accessibile a musei/teatri.",
  },
  tCommesseEnterprise24m: {
    key: "tCommesseEnterprise24m",
    label: "Commesse White-Label Enterprise (24M)",
    unit: "n",
    min: 0,
    max: 15,
    step: 1,
    assumptionNote: "Edizioni complete a 13 moduli con design custom e motore dati proprietario.",
  },
  tPrezzoEnterpriseEur: {
    key: "tPrezzoEnterpriseEur",
    label: "Prezzo unitario White-Label Enterprise",
    unit: "€",
    min: 0,
    max: 120000,
    step: 1000,
    assumptionNote: "Prezzo listino 'da €45.000' completamente editabile.",
  },
  tCanoneSaasAnnuoEur: {
    key: "tCanoneSaasAnnuoEur",
    label: "Canone annuo SaaS / Analytics / Hosting (Anno 2)",
    unit: "€",
    min: 0,
    max: 15000,
    step: 300,
    assumptionNote: "Ricavo ricorrente sulle piattaforme consegnate nell'anno precedente.",
  },
  tCommesseY1AttiveSaas: {
    key: "tCommesseY1AttiveSaas",
    label: "Piattaforme consegnate in Y1 che pagano canone in Y2",
    unit: "n",
    min: 0,
    max: 15,
    step: 1,
    assumptionNote: "Base installata che genera canone ricorrente dal secondo anno.",
  },
  tCostoMarginaleProduzionePct: {
    key: "tCostoMarginaleProduzionePct",
    label: "Costo marginale consegna incl. PM & Account (%)",
    unit: "%",
    min: 10,
    max: 85,
    step: 1,
    assumptionNote: "Costo reale di configurazione e personalizzazione (45% implica 55% margine netto di progetto vs 62% lordo del sito).",
  },
  tQuotaLeadPlgBadgePct: {
    key: "tQuotaLeadPlgBadgePct",
    label: "% pipeline futura generata da badge 'Powered by'",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Effetto Product-Led Growth (5.6) sulle richieste inbound da altri musei/istituzioni.",
  },
  tCapexAlternativoClienteEur: {
    key: "tCapexAlternativoClienteEur",
    label: "Costo alternativo sviluppo CMS/agenzia evitato dal cliente",
    unit: "€",
    min: 0,
    max: 180000,
    step: 2500,
    assumptionNote: "Benchmark realistico di mercato per un'alternativa agency/CMS (€35k-€50k) su cui misurare il risparmio reale del committente.",
    biasNote: "Evita benchmark gonfiati da €95k+ non coerenti con i budget medi dei musei italiani.",
  },
  tSettimaneConsegna: {
    key: "tSettimaneConsegna",
    label: "Time-to-market edizione White-Label (settimane)",
    unit: "sett",
    min: 2,
    max: 24,
    step: 1,
    assumptionNote: "Tempo dal brief alla messa online grazie al template già testato.",
  },
  tSettimaneCustomExNovo: {
    key: "tSettimaneCustomExNovo",
    label: "Time-to-market sviluppo custom ex novo (settimane)",
    unit: "sett",
    min: 8,
    max: 52,
    step: 2,
    assumptionNote: "Tempo stimato per sviluppare la stessa infrastruttura da zero.",
  },
};

export const PRESETS: Record<PresetId, { label: string; badge: string; description: string; inputs: SimulatorInputs }> = {
  realistico: {
    label: "Default Revisionato (Italia)",
    badge: "Consigliato",
    description: "Tutti i bias corretti: CPM €90 su sola reach incrementale Startup, commissioni turismo 15% (0%-80% editabili), K = 0,25 con smorzamento, costi completi e DSO 90gg.",
    inputs: {
      sovrapposizioneCanaliPct: 20,
      kViralita: 0.25,
      decadimentoViralePct: 50,
      cpmCulturaleEur: 90,
      quotaRicaviAnno1Pct: 32,
      dsoGiorniIncassoB2G: 90,
      capexPiattaforma24m: 65000,
      costiFissiRedazione24m: 130000,
      costiSalesAbm24m: 78000,
      costiDistribuzioneSeeding24m: 32000,
      costiGaCdnGdpr24m: 46000,

      f1Contratti24m: 10,
      f1PrezzoEur: 9800,
      f2Contratti24m: 5,
      f2PrezzoEur: 14500,
      f3Contratti24m: 2,
      f3PrezzoEur: 18400,
      fCogsPct: 25,
      fDbEntiContattiTot: 75000,
      fDbRedemptionPct: 8,
      fDbLetturaProfondaPct: 45,
      fIstitutiAttivati: 110,
      fClassiPerIstituto: 3.2,
      fCompletamentoDidatticoPct: 58,
      fCapexEvitatoPerEnteEur: 28000,
      tAccessiGratuitiTerritorio: 24000,
      tEstensioneSoggiornoPct: 12,
      tGiorniExtraMedi: 1.4,
      tSpesaGiornalieraTerritorioEur: 85,
      tAccessiBookingStartup: 18000,
      tConvBookingPct: 10,
      tScontrinoMedioServizioEur: 95,
      tCommissioneStartupPct: 15,

      aCultContratti24m: 5,
      aCultPrezzoEur: 18000,
      aCogsCultPct: 30,
      aCultCrmContattiTot: 110000,
      aCultRedemptionPct: 6,
      aCultLetturaProfondaPct: 42,
      aTechContratti24m: 5,
      aTechTicketLordoEur: 15000,
      aTechBarterPct: 20,
      aCogsTechLordoPct: 38,
      aLeadPerTechPartner: 22,
      aSqlRatePct: 30,
      aCplFieraComparabileEur: 180,
      aSurveyCompletionPct: 24,
      aGdprOptInPct: 32,
      aValoreRicercaEvitataBrandEur: 6000,
      aClickPopupImportantePct: 25,
      aConvObiettivoBrandPct: 10,
      aValoreObiettivoBrandEur: 150,

      iSpeciali24m: 3,
      iReachPropriaIstituzione: 240000,
      iReachStartupIncrementale: 80000,
      iCostoProdEvitatoEnteEur: 18000,
      iCostoDirettoStartupSpecialeEur: 4800,
      iConvDbIstituzioneAzioniStartupPct: 2.5,
      iValoreMedioAzioneMonetizzataEur: 14,
      iMoltiplicatoreAutorevolezzaPct: 40,
      iContattiB2BOriginePerSpeciale: 10,
      iConvPipelineIstituzioniPct: 25,
      iValoreMedioDealPipelineEur: 14000,
      iAperturaContenutoPct: 22,
      iClickEventoImportantePct: 25,
      iConvObiettivoIstituzionePct: 6,
      iValoreObiettivoIstituzioneEur: 350,
      iValoreProgettoSpecialeFissoEur: 0,
      iCopieStampaEsposte: 120000,
      iQrScanPct: 2.0,
      iStampaLetturaProfondaPct: 50,
      iCostoPonteStampaStartupEur: 6000,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 22,
      iRispostaIstituzionalePct: 30,

      cTappe24m: 8,
      cVotiPerTappa: 2500,
      cTassoDonantiSuVotantiPct: 10,
      cDonazioneMediaEur: 3,
      cFeeGestioneStartupPct: 0,
      cCostoGatewayPct: 2.5,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 55,
      cCommunitySemiOrganici: 9000,
      cReturningMau: 2800,
      cVisiteAnnuePerMau: 2.4,
      cCtrCallPct: 15,
      cFeaturedCalls24m: 24,
      cFeaturedCallPrezzoEur: 300,
      cCostiCommunityOps24m: 28000,
      cArchiveLicenzeY1: 10,
      cArchiveNuoveY2: 14,
      cArchiveRinnovoPct: 80,
      cArchivePrezzoAnnuoEur: 1600,
      cArchiveCogsPct: 10,

      tCommesseSottosoglia24m: 3,
      tPrezzoSottosogliaEur: 24000,
      tCommesseEnterprise24m: 1,
      tPrezzoEnterpriseEur: 45000,
      tCanoneSaasAnnuoEur: 3600,
      tCommesseY1AttiveSaas: 1,
      tCostoMarginaleProduzionePct: 45,
      tQuotaLeadPlgBadgePct: 25,
      tCapexAlternativoClienteEur: 40000,
      tSettimaneConsegna: 8,
      tSettimaneCustomExNovo: 28,
    },
  },
  sitoOriginario: {
    label: "Sito Originario (Pre-Audit)",
    badge: "Con Bias",
    description: "Replica i parametri dichiarati sul sito (K=1,35, 27% redemption, 14% QR, 30% barter su €360k, 80×€3k archive, €0 commissioni turismo, nessun DSO) per confronto diretto.",
    inputs: {
      sovrapposizioneCanaliPct: 15,
      kViralita: 1.35,
      decadimentoViralePct: 45,
      cpmCulturaleEur: 1200,
      quotaRicaviAnno1Pct: 35,
      dsoGiorniIncassoB2G: 0,
      capexPiattaforma24m: 72000,
      costiFissiRedazione24m: 144000,
      costiSalesAbm24m: 86000,
      costiDistribuzioneSeeding24m: 72000,
      costiGaCdnGdpr24m: 54000,

      f1Contratti24m: 24,
      f1PrezzoEur: 9800,
      f2Contratti24m: 10,
      f2PrezzoEur: 14500,
      f3Contratti24m: 6,
      f3PrezzoEur: 20000,
      fCogsPct: 24,
      fDbEntiContattiTot: 180000,
      fDbRedemptionPct: 27,
      fDbLetturaProfondaPct: 50,
      fIstitutiAttivati: 320,
      fClassiPerIstituto: 3.44,
      fCompletamentoDidatticoPct: 72,
      fCapexEvitatoPerEnteEur: 40000,
      tAccessiGratuitiTerritorio: 48000,
      tEstensioneSoggiornoPct: 22,
      tGiorniExtraMedi: 1.0,
      tSpesaGiornalieraTerritorioEur: 32,
      tAccessiBookingStartup: 48000,
      tConvBookingPct: 22,
      tScontrinoMedioServizioEur: 32,
      tCommissioneStartupPct: 0,

      aCultContratti24m: 10,
      aCultPrezzoEur: 24000,
      aCogsCultPct: 28,
      aCultCrmContattiTot: 160000,
      aCultRedemptionPct: 27,
      aCultLetturaProfondaPct: 55,
      aTechContratti24m: 12,
      aTechTicketLordoEur: 30000,
      aTechBarterPct: 30,
      aCogsTechLordoPct: 35,
      aLeadPerTechPartner: 53,
      aSqlRatePct: 40,
      aCplFieraComparabileEur: 250,
      aSurveyCompletionPct: 58,
      aGdprOptInPct: 46,
      aValoreRicercaEvitataBrandEur: 10000,
      aClickPopupImportantePct: 0,
      aConvObiettivoBrandPct: 0,
      aValoreObiettivoBrandEur: 0,

      iSpeciali24m: 2,
      iReachPropriaIstituzione: 700000,
      iReachStartupIncrementale: 0,
      iCostoProdEvitatoEnteEur: 35000,
      iCostoDirettoStartupSpecialeEur: 5000,
      iConvDbIstituzioneAzioniStartupPct: 0,
      iValoreMedioAzioneMonetizzataEur: 0,
      iMoltiplicatoreAutorevolezzaPct: 50,
      iContattiB2BOriginePerSpeciale: 22,
      iConvPipelineIstituzioniPct: 27,
      iValoreMedioDealPipelineEur: 15000,
      iAperturaContenutoPct: 18,
      iClickEventoImportantePct: 0,
      iConvObiettivoIstituzionePct: 0,
      iValoreObiettivoIstituzioneEur: 0,
      iValoreProgettoSpecialeFissoEur: 0,
      iCopieStampaEsposte: 180000,
      iQrScanPct: 14,
      iStampaLetturaProfondaPct: 55,
      iCostoPonteStampaStartupEur: 5000,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 85,
      iRispostaIstituzionalePct: 60,

      cTappe24m: 12,
      cVotiPerTappa: 4000,
      cTassoDonantiSuVotantiPct: 100,
      cDonazioneMediaEur: 1,
      cFeeGestioneStartupPct: 0,
      cCostoGatewayPct: 0,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 64,
      cCommunitySemiOrganici: 12000,
      cReturningMau: 9500,
      cVisiteAnnuePerMau: 3.6,
      cCtrCallPct: 18,
      cFeaturedCalls24m: 0,
      cFeaturedCallPrezzoEur: 0,
      cCostiCommunityOps24m: 36000,
      cArchiveLicenzeY1: 20,
      cArchiveNuoveY2: 63,
      cArchiveRinnovoPct: 85,
      cArchivePrezzoAnnuoEur: 3000,
      cArchiveCogsPct: 10,

      tCommesseSottosoglia24m: 8,
      tPrezzoSottosogliaEur: 22500,
      tCommesseEnterprise24m: 0,
      tPrezzoEnterpriseEur: 45000,
      tCanoneSaasAnnuoEur: 0,
      tCommesseY1AttiveSaas: 0,
      tCostoMarginaleProduzionePct: 38,
      tQuotaLeadPlgBadgePct: 40,
      tCapexAlternativoClienteEur: 95000,
      tSettimaneConsegna: 8,
      tSettimaneCustomExNovo: 32,
    },
  },
  esigenzaAltaPosta: {
    label: "Caso Specifico · Conf. Stampa & Servizi 80%",
    badge: "Esempio Custom",
    description: "Esempio concreto dei tuoi casi limite: conferenza stampa con progetto finanziato da €100.000 (K=2), e servizi turistici/esperienziali organizzati dalla Startup con commissione all'80%.",
    inputs: {
      sovrapposizioneCanaliPct: 15,
      kViralita: 2.0,
      decadimentoViralePct: 55,
      cpmCulturaleEur: 90,
      quotaRicaviAnno1Pct: 35,
      dsoGiorniIncassoB2G: 60,
      capexPiattaforma24m: 65000,
      costiFissiRedazione24m: 130000,
      costiSalesAbm24m: 78000,
      costiDistribuzioneSeeding24m: 36000,
      costiGaCdnGdpr24m: 46000,

      f1Contratti24m: 8,
      f1PrezzoEur: 9800,
      f2Contratti24m: 6,
      f2PrezzoEur: 14500,
      f3Contratti24m: 2,
      f3PrezzoEur: 18400,
      fCogsPct: 25,
      fDbEntiContattiTot: 80000,
      fDbRedemptionPct: 10,
      fDbLetturaProfondaPct: 50,
      fIstitutiAttivati: 90,
      fClassiPerIstituto: 3.0,
      fCompletamentoDidatticoPct: 60,
      fCapexEvitatoPerEnteEur: 28000,
      tAccessiGratuitiTerritorio: 20000,
      tEstensioneSoggiornoPct: 14,
      tGiorniExtraMedi: 1.5,
      tSpesaGiornalieraTerritorioEur: 90,
      tAccessiBookingStartup: 12000,
      tConvBookingPct: 12,
      tScontrinoMedioServizioEur: 75,
      tCommissioneStartupPct: 80,

      aCultContratti24m: 4,
      aCultPrezzoEur: 20000,
      aCogsCultPct: 30,
      aCultCrmContattiTot: 95000,
      aCultRedemptionPct: 7,
      aCultLetturaProfondaPct: 45,
      aTechContratti24m: 4,
      aTechTicketLordoEur: 16000,
      aTechBarterPct: 20,
      aCogsTechLordoPct: 38,
      aLeadPerTechPartner: 25,
      aSqlRatePct: 35,
      aCplFieraComparabileEur: 190,
      aSurveyCompletionPct: 26,
      aGdprOptInPct: 35,
      aValoreRicercaEvitataBrandEur: 7000,
      aClickPopupImportantePct: 32,
      aConvObiettivoBrandPct: 14,
      aValoreObiettivoBrandEur: 220,

      iSpeciali24m: 3,
      iReachPropriaIstituzione: 180000,
      iReachStartupIncrementale: 120000,
      iCostoProdEvitatoEnteEur: 20000,
      iCostoDirettoStartupSpecialeEur: 5000,
      iConvDbIstituzioneAzioniStartupPct: 4.0,
      iValoreMedioAzioneMonetizzataEur: 18,
      iMoltiplicatoreAutorevolezzaPct: 65,
      iContattiB2BOriginePerSpeciale: 12,
      iConvPipelineIstituzioniPct: 30,
      iValoreMedioDealPipelineEur: 16000,
      iAperturaContenutoPct: 28,
      iClickEventoImportantePct: 35,
      iConvObiettivoIstituzionePct: 8,
      iValoreObiettivoIstituzioneEur: 250,
      iValoreProgettoSpecialeFissoEur: 100000,
      iCopieStampaEsposte: 100000,
      iQrScanPct: 2.5,
      iStampaLetturaProfondaPct: 55,
      iCostoPonteStampaStartupEur: 6000,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 28,
      iRispostaIstituzionalePct: 35,

      cTappe24m: 8,
      cVotiPerTappa: 3000,
      cTassoDonantiSuVotantiPct: 12,
      cDonazioneMediaEur: 4,
      cFeeGestioneStartupPct: 5,
      cCostoGatewayPct: 2.5,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 58,
      cCommunitySemiOrganici: 10000,
      cReturningMau: 3200,
      cVisiteAnnuePerMau: 2.5,
      cCtrCallPct: 16,
      cFeaturedCalls24m: 28,
      cFeaturedCallPrezzoEur: 350,
      cCostiCommunityOps24m: 28000,
      cArchiveLicenzeY1: 12,
      cArchiveNuoveY2: 16,
      cArchiveRinnovoPct: 82,
      cArchivePrezzoAnnuoEur: 1800,
      cArchiveCogsPct: 10,

      tCommesseSottosoglia24m: 3,
      tPrezzoSottosogliaEur: 25000,
      tCommesseEnterprise24m: 2,
      tPrezzoEnterpriseEur: 45000,
      tCanoneSaasAnnuoEur: 4000,
      tCommesseY1AttiveSaas: 2,
      tCostoMarginaleProduzionePct: 45,
      tQuotaLeadPlgBadgePct: 30,
      tCapexAlternativoClienteEur: 42000,
      tSettimaneConsegna: 8,
      tSettimaneCustomExNovo: 28,
    },
  },
  conservativo: {
    label: "Stress-Test Conservativo",
    badge: "Minimo",
    description: "Scenario prudente con viralità quasi nulla (K=0,10), adozione lenta e DSO esteso a 120 giorni per verificare la tenuta finanziaria.",
    inputs: {
      sovrapposizioneCanaliPct: 25,
      kViralita: 0.1,
      decadimentoViralePct: 60,
      cpmCulturaleEur: 70,
      quotaRicaviAnno1Pct: 26,
      dsoGiorniIncassoB2G: 120,
      capexPiattaforma24m: 55000,
      costiFissiRedazione24m: 110000,
      costiSalesAbm24m: 60000,
      costiDistribuzioneSeeding24m: 24000,
      costiGaCdnGdpr24m: 38000,

      f1Contratti24m: 7,
      f1PrezzoEur: 9800,
      f2Contratti24m: 3,
      f2PrezzoEur: 14500,
      f3Contratti24m: 1,
      f3PrezzoEur: 18400,
      fCogsPct: 26,
      fDbEntiContattiTot: 50000,
      fDbRedemptionPct: 5,
      fDbLetturaProfondaPct: 40,
      fIstitutiAttivati: 65,
      fClassiPerIstituto: 2.8,
      fCompletamentoDidatticoPct: 48,
      fCapexEvitatoPerEnteEur: 24000,
      tAccessiGratuitiTerritorio: 14000,
      tEstensioneSoggiornoPct: 8,
      tGiorniExtraMedi: 1.2,
      tSpesaGiornalieraTerritorioEur: 75,
      tAccessiBookingStartup: 9000,
      tConvBookingPct: 7,
      tScontrinoMedioServizioEur: 85,
      tCommissioneStartupPct: 10,

      aCultContratti24m: 3,
      aCultPrezzoEur: 16000,
      aCogsCultPct: 32,
      aCultCrmContattiTot: 70000,
      aCultRedemptionPct: 4,
      aCultLetturaProfondaPct: 38,
      aTechContratti24m: 3,
      aTechTicketLordoEur: 12000,
      aTechBarterPct: 20,
      aCogsTechLordoPct: 40,
      aLeadPerTechPartner: 15,
      aSqlRatePct: 25,
      aCplFieraComparabileEur: 160,
      aSurveyCompletionPct: 18,
      aGdprOptInPct: 26,
      aValoreRicercaEvitataBrandEur: 5000,
      aClickPopupImportantePct: 18,
      aConvObiettivoBrandPct: 7,
      aValoreObiettivoBrandEur: 110,

      iSpeciali24m: 2,
      iReachPropriaIstituzione: 140000,
      iReachStartupIncrementale: 40000,
      iCostoProdEvitatoEnteEur: 15000,
      iCostoDirettoStartupSpecialeEur: 4500,
      iConvDbIstituzioneAzioniStartupPct: 1.5,
      iValoreMedioAzioneMonetizzataEur: 12,
      iMoltiplicatoreAutorevolezzaPct: 25,
      iContattiB2BOriginePerSpeciale: 8,
      iConvPipelineIstituzioniPct: 20,
      iValoreMedioDealPipelineEur: 12000,
      iAperturaContenutoPct: 16,
      iClickEventoImportantePct: 18,
      iConvObiettivoIstituzionePct: 4,
      iValoreObiettivoIstituzioneEur: 250,
      iValoreProgettoSpecialeFissoEur: 0,
      iCopieStampaEsposte: 70000,
      iQrScanPct: 1.2,
      iStampaLetturaProfondaPct: 45,
      iCostoPonteStampaStartupEur: 4500,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 14,
      iRispostaIstituzionalePct: 20,

      cTappe24m: 6,
      cVotiPerTappa: 1800,
      cTassoDonantiSuVotantiPct: 7,
      cDonazioneMediaEur: 2.5,
      cFeeGestioneStartupPct: 0,
      cCostoGatewayPct: 2.5,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 46,
      cCommunitySemiOrganici: 6000,
      cReturningMau: 1800,
      cVisiteAnnuePerMau: 2.0,
      cCtrCallPct: 12,
      cFeaturedCalls24m: 12,
      cFeaturedCallPrezzoEur: 250,
      cCostiCommunityOps24m: 24000,
      cArchiveLicenzeY1: 7,
      cArchiveNuoveY2: 9,
      cArchiveRinnovoPct: 75,
      cArchivePrezzoAnnuoEur: 1400,
      cArchiveCogsPct: 12,

      tCommesseSottosoglia24m: 2,
      tPrezzoSottosogliaEur: 22000,
      tCommesseEnterprise24m: 1,
      tPrezzoEnterpriseEur: 40000,
      tCanoneSaasAnnuoEur: 3000,
      tCommesseY1AttiveSaas: 1,
      tCostoMarginaleProduzionePct: 48,
      tQuotaLeadPlgBadgePct: 20,
      tCapexAlternativoClienteEur: 35000,
      tSettimaneConsegna: 8,
      tSettimaneCustomExNovo: 26,
    },
  },
};

export interface FormulaTrace {
  id: string;
  label: string;
  formulaSymbolic: string;
  formulaLive: string;
  explanation: string;
}

export interface StakeholderOutput {
  id: StakeholderId;
  startupMonetaryEur: number;
  startupMonetaryDetail: string;
  startupNonMonetary: string[];
  stakeholderMonetaryEur: number;
  stakeholderMonetaryDetail: string;
  stakeholderNonMonetary: string[];
  formulas: FormulaTrace[];
}

export interface SimulationResult {
  audience: {
    grossReach: number;
    uniqueReach: number;
    primaryReaders: number;
    viralMultiplier: number;
    effectiveKNet: number;
    viralAddedReaders: number;
    totalActiveReaders: number;
    directCacEur: number;
    fullyLoadedCacEur: number;
    zeroPartyProfiles: number;
    formulas: FormulaTrace[];
  };
  pnl: {
    revenueY1Cash: number;
    revenueY2Cash: number;
    totalRevenueCash24m: number;
    tourismCommissionRevenue24m: number;
    institutionDbMonetized24m: number;
    barterValue24m: number;
    passThroughScholarshipFund24m: number;
    totalCogsCash24m: number;
    grossProfitCash24m: number;
    grossMarginPct: number;
    fixedAndGtmCosts24m: number;
    ebitdaY1: number;
    ebitdaY2: number;
    ebitda24m: number;
    ebitdaMarginPct: number;
    breakEvenRevenue24m: number;
    receivablesEndY1FromDso: number;
    peakCashNeedY1: number;
    revenueMix: { id: StakeholderId; label: string; value: number; color: string }[];
    formulas: FormulaTrace[];
  };
  stakeholders: Record<StakeholderId, StakeholderOutput> & {
    // campi extra utili nelle viste dedicate
    raw: {
      fRevB2G: number;
      fTourismGmv: number;
      fTourismCommStartup: number;
      fTourismNetOperators: number;
      fTourismExtraDays: number;
      fTourismSpillover: number;
      fClasses: number;
      fAvoidedCapex: number;
      aCultCash: number;
      aTechCash: number;
      aBarter: number;
      aLeadsTot: number;
      aSqlCount: number;
      aBrandEffectiveCplSql: number;
      aBrandEventsRead: number;
      aBrandGoalsValue: number;
      iReachStartupDedup: number;
      iCpmMediaValue: number;
      iAvoidedProdCost: number;
      iDbMonetizedStartup: number;
      iPipelineValueEstimated: number;
      iImportantClicks: number;
      iEngagementGoalValue: number;
      iPrintQrScans: number;
      cTotalVotes: number;
      cDonors: number;
      cGrossDonations: number;
      cStartupFee: number;
      cNetScholarshipPool: number;
      cScholarshipsFunded: number;
      cCallAppsAnnual: number;
      cFeaturedCallsRev: number;
      cArchiveLicensesY2: number;
      cArchiveExitArr: number;
      cArchiveRev24m: number;
      tProjectsCount: number;
      tRev24m: number;
      tContribMarginEur: number;
      tContribMarginPct: number;
      tAvoidedCapexNet: number;
    };
  };
}

const fInt = (n: number) => Math.round(n).toLocaleString("it-IT");
const fEur = (n: number) => `€${Math.round(n).toLocaleString("it-IT")}`;
const fDec = (n: number, d = 2) => n.toLocaleString("it-IT", { minimumFractionDigits: d, maximumFractionDigits: d });

export function runSimulation(inp: SimulatorInputs): SimulationResult {
  const overlapFactor = Math.max(0, 1 - inp.sovrapposizioneCanaliPct / 100);

  // --- 1. FONDAZIONI ED ENTI ---
  const fRevB2G = inp.f1Contratti24m * inp.f1PrezzoEur + inp.f2Contratti24m * inp.f2PrezzoEur + inp.f3Contratti24m * inp.f3PrezzoEur;
  const fContractsTot = inp.f1Contratti24m + inp.f2Contratti24m + inp.f3Contratti24m;
  const fAcv = fContractsTot > 0 ? fRevB2G / fContractsTot : 0;
  const fCogsB2G = fRevB2G * (inp.fCogsPct / 100);
  const fDbRedemptions = inp.fDbEntiContattiTot * (inp.fDbRedemptionPct / 100);
  const fDbDeepReaders = fDbRedemptions * (inp.fDbLetturaProfondaPct / 100);
  const fClasses = Math.round(inp.fIstitutiAttivati * inp.fClassiPerIstituto);
  const fAvoidedCapex = fContractsTot * inp.fCapexEvitatoPerEnteEur;

  // 4.4 Turismo Dual-Flow
  const fTourismExtraDays = inp.tAccessiGratuitiTerritorio * (inp.tEstensioneSoggiornoPct / 100) * inp.tGiorniExtraMedi;
  const fTourismSpillover = fTourismExtraDays * inp.tSpesaGiornalieraTerritorioEur;
  const fTourismBookingsCount = inp.tAccessiBookingStartup * (inp.tConvBookingPct / 100);
  const fTourismGmv = fTourismBookingsCount * inp.tScontrinoMedioServizioEur;
  const fTourismCommStartup = fTourismGmv * (inp.tCommissioneStartupPct / 100);
  const fTourismNetOperators = fTourismGmv - fTourismCommStartup;
  const fTourismCogsStartup = fTourismCommStartup * 0.12; // gestione/supporto booking startup
  const fStartupCash = fRevB2G + fTourismCommStartup;
  const fStakeholderMonetary = fAvoidedCapex + fTourismSpillover + fTourismNetOperators;

  // --- 2. AZIENDE E BRAND ---
  const aCultCash = inp.aCultContratti24m * inp.aCultPrezzoEur;
  const aCogsCult = aCultCash * (inp.aCogsCultPct / 100);
  const aCultRedemptions = inp.aCultCrmContattiTot * (inp.aCultRedemptionPct / 100);
  const aCultDeepReaders = aCultRedemptions * (inp.aCultLetturaProfondaPct / 100);

  const aTechGross = inp.aTechContratti24m * inp.aTechTicketLordoEur;
  const aBarter = aTechGross * (inp.aTechBarterPct / 100);
  const aTechCash = aTechGross - aBarter;
  const aTechGrossCogs = aTechGross * (inp.aCogsTechLordoPct / 100);
  const aTechCashCogs = Math.max(0, aTechGrossCogs - aBarter);

  const aLeadsTot = inp.aTechContratti24m * inp.aLeadPerTechPartner;
  const aSqlCount = aLeadsTot * (inp.aSqlRatePct / 100);
  const aBrandEffectiveCplSql = aSqlCount > 0 ? aTechGross / aSqlCount : 0;
  const aFairEquivValue = aSqlCount * inp.aCplFieraComparabileEur;
  const aResearchValue = (inp.aCultContratti24m + inp.aTechContratti24m) * inp.aValoreRicercaEvitataBrandEur;

  const aBrandEventsRead = aCultDeepReaders * (inp.aClickPopupImportantePct / 100);
  const aBrandGoalsCount = aBrandEventsRead * (inp.aConvObiettivoBrandPct / 100);
  const aBrandGoalsValue = aBrandGoalsCount * inp.aValoreObiettivoBrandEur;
  const aStartupCash = aCultCash + aTechCash;

  // --- 3. ISTITUZIONI CULTURALI E MEDIA ---
  const iReachStartupDedup = inp.iReachStartupIncrementale * overlapFactor;
  const iCpmMediaValue = (iReachStartupDedup / 1000) * inp.cpmCulturaleEur;
  const iAvoidedProdCost = inp.iSpeciali24m * inp.iCostoProdEvitatoEnteEur;
  const iStartupProdCost = inp.iSpeciali24m * inp.iCostoDirettoStartupSpecialeEur + inp.iCostoPonteStampaStartupEur;

  // Beneficio monetizzabile Startup dal DB Istituzione (inviti ad azioni monetizzabili)
  const iDbMonetizedActions = inp.iReachPropriaIstituzione * (inp.iConvDbIstituzioneAzioniStartupPct / 100);
  const iDbMonetizedStartup = iDbMonetizedActions * inp.iValoreMedioAzioneMonetizzataEur;
  const iDbMonetizedCogs = iDbMonetizedStartup * 0.15;

  // Engagement "lettura di qualcosa di importante" (Loyalty / Crisis / Fundraising)
  const iTotalReachCombined = inp.iReachPropriaIstituzione + iReachStartupDedup;
  const iOpenedReaders = iTotalReachCombined * (inp.iAperturaContenutoPct / 100);
  const iImportantClicks = iOpenedReaders * (inp.iClickEventoImportantePct / 100);
  const iEngagementConversions = iImportantClicks * (inp.iConvObiettivoIstituzionePct / 100);
  const iEngagementGoalValue = iEngagementConversions * inp.iValoreObiettivoIstituzioneEur + inp.iValoreProgettoSpecialeFissoEur;

  // Pipeline & Stampa
  const iPipelineContacts = inp.iSpeciali24m * inp.iContattiB2BOriginePerSpeciale;
  const iPipelineDealsBase = iPipelineContacts * (inp.iConvPipelineIstituzioniPct / 100);
  const iPipelineDealsWithHalo = iPipelineDealsBase * (1 + inp.iMoltiplicatoreAutorevolezzaPct / 100);
  const iPipelineValueEstimated = iPipelineDealsWithHalo * inp.iValoreMedioDealPipelineEur;

  const iPrintQrScans = inp.iCopieStampaEsposte * (inp.iQrScanPct / 100);
  const iPrintDeepReaders = iPrintQrScans * (inp.iStampaLetturaProfondaPct / 100);
  const iPressClippingsTot = inp.iCicliInchiesta * inp.iRipreseStampaPerCiclo;

  // --- 4. COMMUNITY DANZA & RICERCA 4.1 ---
  const cTotalVotes = inp.cTappe24m * inp.cVotiPerTappa;
  const cDonors = cTotalVotes * (inp.cTassoDonantiSuVotantiPct / 100);
  const cGrossDonations = cDonors * inp.cDonazioneMediaEur;
  const cGatewayFees = cGrossDonations * (inp.cCostoGatewayPct / 100);
  const cStartupFee = cGrossDonations * (inp.cFeeGestioneStartupPct / 100);
  const cNetScholarshipPool = Math.max(0, cGrossDonations - cGatewayFees - cStartupFee);
  const cScholarshipsFunded = Math.floor(cNetScholarshipPool / Math.max(1, inp.cValoreBorsaEur));

  const cCallAppsAnnual = inp.cReturningMau * inp.cVisiteAnnuePerMau * (inp.cCtrCallPct / 100);
  const cFeaturedCallsRev = inp.cFeaturedCalls24m * inp.cFeaturedCallPrezzoEur;

  const cArchiveRevY1 = inp.cArchiveLicenzeY1 * inp.cArchivePrezzoAnnuoEur;
  const cArchiveRenewedY2 = Math.round(inp.cArchiveLicenzeY1 * (inp.cArchiveRinnovoPct / 100));
  const cArchiveLicensesY2 = cArchiveRenewedY2 + inp.cArchiveNuoveY2;
  const cArchiveExitArr = cArchiveLicensesY2 * inp.cArchivePrezzoAnnuoEur;
  const cArchiveRev24m = cArchiveRevY1 + cArchiveExitArr;
  const cArchiveCogs = cArchiveRev24m * (inp.cArchiveCogsPct / 100);
  const cStartupCash = cArchiveRev24m + cFeaturedCallsRev + cStartupFee;

  // --- 5. TECNOLOGIA & WHITE-LABEL ---
  const tProjectsCount = inp.tCommesseSottosoglia24m + inp.tCommesseEnterprise24m;
  const tProjRev = inp.tCommesseSottosoglia24m * inp.tPrezzoSottosogliaEur + inp.tCommesseEnterprise24m * inp.tPrezzoEnterpriseEur;
  const tSaasRev = inp.tCommesseY1AttiveSaas * inp.tCanoneSaasAnnuoEur;
  const tRev24m = tProjRev + tSaasRev;
  const tProjCogs = tProjRev * (inp.tCostoMarginaleProduzionePct / 100);
  const tSaasCogs = tSaasRev * 0.15;
  const tContribMarginEur = tProjRev - tProjCogs;
  const tContribMarginPct = tProjRev > 0 ? (tContribMarginEur / tProjRev) * 100 : 0;
  const tAvoidedCapexNet = Math.max(0, tProjectsCount * inp.tCapexAlternativoClienteEur - tProjRev);

  // --- 6. AUDIENCE DEDUPLICATA, VIRALITA' LIBERA & CAC DERIVATO ---
  const grossReach =
    inp.fDbEntiContattiTot +
    inp.aCultCrmContattiTot +
    inp.iReachPropriaIstituzione +
    inp.iReachStartupIncrementale +
    inp.iCopieStampaEsposte +
    inp.tAccessiGratuitiTerritorio +
    inp.tAccessiBookingStartup +
    inp.cCommunitySemiOrganici * 5;
  const uniqueReach = grossReach * overlapFactor;

  const primaryReaders =
    fDbDeepReaders +
    aCultDeepReaders +
    iOpenedReaders +
    iPrintDeepReaders +
    inp.tAccessiGratuitiTerritorio * 0.25 +
    inp.cCommunitySemiOrganici;

  const decay = 1 - inp.decadimentoViralePct / 100;
  const w1 = inp.kViralita;
  const w2 = w1 * (inp.kViralita * decay);
  const w3 = w2 * (inp.kViralita * decay * decay);
  const effectiveKNet = w1 + w2 + w3;
  const viralMultiplier = 1 + effectiveKNet;
  const viralAddedReaders = primaryReaders * effectiveKNet;
  const totalActiveReaders = primaryReaders * viralMultiplier;

  const directCacEur = totalActiveReaders > 0 ? inp.costiDistribuzioneSeeding24m / totalActiveReaders : 0;
  const fullyLoadedCacEur =
    totalActiveReaders > 0 ? (inp.costiDistribuzioneSeeding24m + inp.costiSalesAbm24m) / totalActiveReaders : 0;

  const zeroPartyProfiles = totalActiveReaders * 0.85 * (inp.aSurveyCompletionPct / 100) * (inp.aGdprOptInPct / 100);

  // --- 7. CONTO ECONOMICO CONSOLIDATO & WORKING CAPITAL DSO ---
  const totalRevenueCash24m = fStartupCash + aStartupCash + iDbMonetizedStartup + cStartupCash + tRev24m;
  const y1Share = inp.quotaRicaviAnno1Pct / 100;
  const revenueY1Cash = totalRevenueCash24m * y1Share;
  const revenueY2Cash = totalRevenueCash24m * (1 - y1Share);

  const totalCogsCash24m =
    fCogsB2G +
    fTourismCogsStartup +
    aCogsCult +
    aTechCashCogs +
    iStartupProdCost +
    iDbMonetizedCogs +
    inp.cCostiCommunityOps24m +
    cArchiveCogs +
    tProjCogs +
    tSaasCogs;

  const grossProfitCash24m = totalRevenueCash24m - totalCogsCash24m;
  const grossMarginPct = totalRevenueCash24m > 0 ? (grossProfitCash24m / totalRevenueCash24m) * 100 : 0;

  const fixedAndGtmCosts24m =
    inp.capexPiattaforma24m +
    inp.costiFissiRedazione24m +
    inp.costiSalesAbm24m +
    inp.costiDistribuzioneSeeding24m +
    inp.costiGaCdnGdpr24m;

  // Ripartizione realistica costi fissi Y1 (~58% per Capex iniziale) vs Y2 (~42%)
  const fixedY1 = inp.capexPiattaforma24m * 0.75 + (fixedAndGtmCosts24m - inp.capexPiattaforma24m) * 0.48;
  const fixedY2 = fixedAndGtmCosts24m - fixedY1;
  const cogsY1 = totalCogsCash24m * y1Share;
  const cogsY2 = totalCogsCash24m - cogsY1;

  const ebitdaY1 = revenueY1Cash - cogsY1 - fixedY1;
  const ebitdaY2 = revenueY2Cash - cogsY2 - fixedY2;
  const ebitda24m = grossProfitCash24m - fixedAndGtmCosts24m;
  const ebitdaMarginPct = totalRevenueCash24m > 0 ? (ebitda24m / totalRevenueCash24m) * 100 : 0;
  const breakEvenRevenue24m = grossMarginPct > 0 ? fixedAndGtmCosts24m / (grossMarginPct / 100) : 0;

  // Crediti da incassare fine Anno 1 sui ricavi B2G/Enti (DSO)
  const b2gY1Share = fRevB2G * y1Share;
  const receivablesEndY1FromDso = b2gY1Share * Math.min(1, inp.dsoGiorniIncassoB2G / 365);
  const peakCashNeedY1 = Math.max(0, -(ebitdaY1 - receivablesEndY1FromDso));

  const revenueMix = [
    { id: "fondazioni" as StakeholderId, label: "Fondazioni & Turismo (comm.)", value: fStartupCash, color: "#D4C7A6" },
    { id: "aziende" as StakeholderId, label: "Aziende (Cultural + Tech Cash)", value: aStartupCash, color: "#A43A46" },
    { id: "istituzioni" as StakeholderId, label: "DB Istituzioni (monetizzato)", value: iDbMonetizedStartup, color: "#E8E4CF" },
    { id: "community" as StakeholderId, label: "Archive 4.1 + Calls 4.3 + Fee", value: cStartupCash, color: "#8E9B8D" },
    { id: "tecnologia" as StakeholderId, label: "Tecnologia & White-Label", value: tRev24m, color: "#E36F5A" },
  ];

  // --- FORMULE LIVE ESPONIBILI ---
  const fFormulas: FormulaTrace[] = [
    {
      id: "f-b2g",
      label: "Ricavi B2B/B2G Fondazioni & Enti",
      formulaSymbolic: "(F1 × P1) + (F2 × P2) + (F3 × P3)",
      formulaLive: `(${inp.f1Contratti24m}×${fEur(inp.f1PrezzoEur)}) + (${inp.f2Contratti24m}×${fEur(inp.f2PrezzoEur)}) + (${inp.f3Contratti24m}×${fEur(inp.f3PrezzoEur)}) = ${fEur(fRevB2G)} (ACV ${fEur(fAcv)})`,
      explanation: "Distingue i 3 pacchetti B2G/B2B: ogni ente acquista licenze personalizzate + adozione scolastica/territoriale come bene culturale.",
    },
    {
      id: "f-tour-ist",
      label: "Turismo 4.4 → Attribuzione Istituzioni (Non Monetizzabile dalla Startup)",
      formulaSymbolic: "Accessi_Gratuiti × Estensione% × Giorni_Extra × Spesa_Giornaliera",
      formulaLive: `${fInt(inp.tAccessiGratuitiTerritorio)} × ${inp.tEstensioneSoggiornoPct}% × ${fDec(inp.tGiorniExtraMedi, 1)} gg = ${fInt(fTourismExtraDays)} giornate presenza → ${fEur(fTourismSpillover)} indotto`,
      explanation: "La fruizione gratuita nei borghi e info-point non genera ricavo diretto Startup ma produce giornate di presenza aggiuntive e indotto per il territorio e le istituzioni locali.",
    },
    {
      id: "f-tour-comm",
      label: "Turismo 4.4 → Attribuzione Startup (Commissioni Variabili 0%–80%+)",
      formulaSymbolic: "Accessi_Booking × Conv% × Scontrino × Commissione%",
      formulaLive: `${fInt(inp.tAccessiBookingStartup)} × ${inp.tConvBookingPct}% × ${fEur(inp.tScontrinoMedioServizioEur)} = ${fEur(fTourismGmv)} GMV × ${inp.tCommissioneStartupPct}% = ${fEur(fTourismCommStartup)} Startup`,
      explanation: "Quando il viaggiatore prenota pernottamenti, visite o servizi organizzati tramite un contenuto digitale Startup, questa trattiene la commissione variabile (da 0% fino all'80% nei servizi organizzati in proprio).",
    },
  ];

  const aFormulas: FormulaTrace[] = [
    {
      id: "a-spons",
      label: "Cultural + Tech Sponsorship (Cash vs Barter Separato)",
      formulaSymbolic: "Cult_Cash + Tech_Lordo × (1 − Barter%)",
      formulaLive: `${fEur(aCultCash)} + ${fEur(aTechGross)} × ${100 - inp.aTechBarterPct}% = ${fEur(aStartupCash)} cash (+ ${fEur(aBarter)} barter a riduzione COGS)`,
      explanation: "Il barter tecnico non viene sommato ai ricavi cash ma riduce il costo di produzione video/luce solo fino a concorrenza del COGS tecnico.",
    },
    {
      id: "a-leads",
      label: "Valore Lead B2B Reale (SQL) vs Fiere",
      formulaSymbolic: "Partner × Lead × SQL% × CPL_Fiera | CPL_Effettivo = Tech_Lordo / SQL",
      formulaLive: `${aLeadsTot} lead × ${inp.aSqlRatePct}% = ${fInt(aSqlCount)} SQL × ${fEur(inp.aCplFieraComparabileEur)} = ${fEur(aFairEquivValue)} (costo effettivo/SQL sponsor: ${fEur(aBrandEffectiveCplSql)})`,
      explanation: "Sostituisce il fuorviante 'CPL €18' del sito mostrando il vero costo per lead qualificato (SQL) sostenuto dallo sponsor rispetto a una fiera.",
    },
    {
      id: "a-loyalty",
      label: "Engagement Strategico Impresa (Popup Loyalty / Crisis)",
      formulaSymbolic: "Lettori_CRM × Click_Popup% × Conv_Obiettivo% × Valore_Obiettivo",
      formulaLive: `${fInt(aCultDeepReaders)} × ${inp.aClickPopupImportantePct}% × ${inp.aConvObiettivoBrandPct}% × ${fEur(inp.aValoreObiettivoBrandEur)} = ${fEur(aBrandGoalsValue)} (${fInt(aBrandGoalsCount)} obiettivi)`,
      explanation: "Misura il valore di micro-interazioni importanti (es. spiegazione sostenibilità, qualità o gestione crisi) per le imprese private.",
    },
  ];

  const iFormulas: FormulaTrace[] = [
    {
      id: "i-reach",
      label: "Doppia Diffusione: DB Istituzione (0 CPM) vs Reach Startup (€ CPM)",
      formulaSymbolic: "Valore_Media_Incr = (Reach_Startup × (1 − Overlap%)) / 1.000 × CPM_Culturale",
      formulaLive: `DB Ente: ${fInt(inp.iReachPropriaIstituzione)} (€0 CPM fittizio) | Startup Incr.: ${fInt(iReachStartupDedup)} / 1.000 × ${fEur(inp.cpmCulturaleEur)} = ${fEur(iCpmMediaValue)}`,
      explanation: "Nessun CPM fittizio sui contatti che l'Istituzione già possiede. Il CPM culturale (default €90) valuta solo i contatti diversi portati dalla Startup.",
    },
    {
      id: "i-db-startup",
      label: "Benefici Startup dal DB Istituzione (Monetizzabile + Halo Effect)",
      formulaSymbolic: "Ricavo_DB = Reach_Ente × Conv_Azioni% × Valore_Azione | Halo = +Autorevolezza%",
      formulaLive: `${fInt(inp.iReachPropriaIstituzione)} × ${inp.iConvDbIstituzioneAzioniStartupPct}% × ${fEur(inp.iValoreMedioAzioneMonetizzataEur)} = ${fEur(iDbMonetizedStartup)} (+${inp.iMoltiplicatoreAutorevolezzaPct}% spinta su altre Istituzioni)`,
      explanation: "Essere presentati dal DB di una grande Istituzione permette alla Startup sia di convertire azioni monetizzabili, sia soprattutto di acquisire credibilità per coinvolgere altre Istituzioni.",
    },
    {
      id: "i-engage",
      label: "Valore Engagement Obiettivo ('Lettura di qualcosa di importante')",
      formulaSymbolic: "(Esposti × Apertura% × Click_Popup% × Conv_Obiettivo% × Valore_Unit) + Progetto_Discreto",
      formulaLive: `${fInt(iImportantClicks)} click critici → ${fInt(iEngagementConversions)} conv. × ${fEur(inp.iValoreObiettivoIstituzioneEur)} + ${fEur(inp.iValoreProgettoSpecialeFissoEur)} = ${fEur(iEngagementGoalValue)}`,
      explanation: "Il valore dell'engagement non è fisso: dipende dall'obiettivo dell'Istituzione (brand loyalty, crisis management, oppure invito conferenza stampa fundraising da €100.000).",
    },
  ];

  const cFormulas: FormulaTrace[] = [
    {
      id: "c-borse",
      label: "Fondo Borse 3.2 ('Dona con il Voto' Realistico)",
      formulaSymbolic: "(Tappe × Voti × Donanti% × Donazione) × (1 − Gateway% − Fee_Startup%)",
      formulaLive: `${fInt(cTotalVotes)} voti × ${inp.cTassoDonantiSuVotantiPct}% = ${fInt(cDonors)} donanti × ${fDec(inp.cDonazioneMediaEur, 2)}€ = ${fEur(cGrossDonations)} → ${fEur(cNetScholarshipPool)} netti (${cScholarshipsFunded} borse)`,
      explanation: "Corregge l'assunzione irreale del sito (100% votanti paganti) introducendo la quota reale di donanti e l'eventuale fee di piattaforma.",
    },
    {
      id: "c-archive",
      label: "Living Archive 4.1 (Cumulato Cash 24M vs Exit ARR)",
      formulaSymbolic: "Cash_24M = (Lic_Y1 × P) + ((Lic_Y1×Rinnovo% + Nuove_Y2) × P)",
      formulaLive: `Y1: ${fEur(cArchiveRevY1)} (${inp.cArchiveLicenzeY1} lic.) + Y2: ${fEur(cArchiveExitArr)} (${cArchiveLicensesY2} lic.) = ${fEur(cArchiveRev24m)} Cash 24M (Exit ARR: ${fEur(cArchiveExitArr)})`,
      explanation: "Separa i flussi di cassa dei due anni dall'ARR di fine periodo, evitando di sommare l'ARR a ricavi biennali.",
    },
  ];

  const tFormulas: FormulaTrace[] = [
    {
      id: "t-wl",
      label: "Commesse White-Label + SaaS & Margine Netto",
      formulaSymbolic: "(N_Sprint×P_s + N_Ent×P_e) × (1 − CostoMarg%) + SaaS_Y2",
      formulaLive: `${fEur(tProjRev)} × ${100 - inp.tCostoMarginaleProduzionePct}% = ${fEur(tContribMarginEur)} margine progetti + ${fEur(tSaasRev)} SaaS`,
      explanation: "Riconcilia le due fasce (sottosoglia vs enterprise) includendo PM/Account nei costi marginali e confrontando il risparmio del cliente contro un CMS reale.",
    },
  ];

  const audFormulas: FormulaTrace[] = [
    {
      id: "aud-viral",
      label: "Viralità Libera (K-factor Input) & CAC Derivato",
      formulaSymbolic: "Lettori_Tot = Semi_Primari × (1 + w1 + w2 + w3) | CAC = Spesa / Lettori_Tot",
      formulaLive: `${fInt(primaryReaders)} primari × ${fDec(viralMultiplier, 2)}x (K=${fDec(inp.kViralita, 2)}) = ${fInt(totalActiveReaders)} lettori → CAC diretto €${fDec(directCacEur, 2)} | Fully-Loaded €${fDec(fullyLoadedCacEur, 2)}`,
      explanation: "Il CAC non è mai fisso: cambia dinamicamente al variare di K (anche 0 o 2) e dei costi effettivi sostenuti.",
    },
  ];

  const pnlFormulas: FormulaTrace[] = [
    {
      id: "pnl-ebitda",
      label: "EBITDA 24 Mesi & Fabbisogno Cassa Anno 1 (con DSO)",
      formulaSymbolic: "EBITDA = Ricavi_Cash − COGS_Netti − Costi_Fissi_GTM | Picco_Cassa_Y1 = max(0, −(EBITDA_Y1 − Crediti_DSO))",
      formulaLive: `${fEur(totalRevenueCash24m)} − ${fEur(totalCogsCash24m)} − ${fEur(fixedAndGtmCosts24m)} = ${fEur(ebitda24m)} | Crediti DSO Y1: ${fEur(receivablesEndY1FromDso)}`,
      explanation: "Mostra se il modello si sostiene davvero tenendo conto dei costi fissi redazionali/tech e dei ritardi d'incasso da enti pubblici.",
    },
  ];

  const stakeholders: SimulationResult["stakeholders"] = {
    fondazioni: {
      id: "fondazioni",
      startupMonetaryEur: fStartupCash,
      startupMonetaryDetail: `${fEur(fRevB2G)} licenze B2B/B2G + ${fEur(fTourismCommStartup)} commissioni turismo (${inp.tCommissioneStartupPct}%)`,
      startupNonMonetary: [
        `${fInt(fDbDeepReaders)} lettori profondi dai DB di enti e comuni`,
        `${fInt(fContractsTot)} contratti istituzionali a legittimazione del progetto`,
      ],
      stakeholderMonetaryEur: fStakeholderMonetary,
      stakeholderMonetaryDetail: `${fEur(fAvoidedCapex)} costi portali/didattica evitati + ${fEur(fTourismSpillover)} indotto presenze + ${fEur(fTourismNetOperators)} netto operatori ricettivi`,
      stakeholderNonMonetary: [
        `${fInt(fTourismExtraDays)} giornate di presenza turistica aggiuntive stimate`,
        `${fInt(inp.fIstitutiAttivati)} istituti (${fInt(fClasses)} classi) al ${inp.fCompletamentoDidatticoPct}% completamento`,
      ],
      formulas: fFormulas,
    },
    aziende: {
      id: "aziende",
      startupMonetaryEur: aStartupCash,
      startupMonetaryDetail: `${fEur(aCultCash)} Cultural + ${fEur(aTechCash)} Tech cash (oltre a ${fEur(aBarter)} barter a riduzione COGS)`,
      startupNonMonetary: [
        `${fInt(zeroPartyProfiles)} profili Zero-Party Data GDPR utilizzabili`,
        `${fInt(aCultDeepReaders)} lettori profondi provenienti dai CRM aziendali`,
      ],
      stakeholderMonetaryEur: aFairEquivValue + aResearchValue + aBrandGoalsValue,
      stakeholderMonetaryDetail: `${fEur(aFairEquivValue)} valore SQL vs fiere + ${fEur(aResearchValue)} ricerche evitate + ${fEur(aBrandGoalsValue)} valore obiettivi Loyalty/Crisis`,
      stakeholderNonMonetary: [
        `${fInt(aBrandEventsRead)} letture di popup strategici (Loyalty / Crisis / Prodotto)`,
        `${fInt(aSqlCount)} trattative SQL B2B (costo effettivo sponsor ${fEur(aBrandEffectiveCplSql)}/SQL)`,
      ],
      formulas: aFormulas,
    },
    istituzioni: {
      id: "istituzioni",
      startupMonetaryEur: iDbMonetizedStartup,
      startupMonetaryDetail: `${fEur(iDbMonetizedStartup)} azioni monetizzate da DB Ente + ${fEur(iPipelineValueEstimated)} pipeline B2B originata (separata) − ${fEur(iStartupProdCost)} costi prod.`,
      startupNonMonetary: [
        `+${inp.iMoltiplicatoreAutorevolezzaPct}% Halo Effect / autorevolezza per coinvolgere altre Istituzioni`,
        `${fInt(iPrintDeepReaders)} nuovi lettori da QR stampa + ${fInt(iPressClippingsTot)} riprese media`,
      ],
      stakeholderMonetaryEur: iCpmMediaValue + iAvoidedProdCost + iEngagementGoalValue,
      stakeholderMonetaryDetail: `${fEur(iCpmMediaValue)} valore media incrementale (${fEur(inp.cpmCulturaleEur)} CPM) + ${fEur(iAvoidedProdCost)} costi prod. evitati + ${fEur(iEngagementGoalValue)} obiettivi`,
      stakeholderNonMonetary: [
        `${fInt(iImportantClicks)} interazioni critiche ('ha fatto X / non ha fatto Y' — Loyalty/Crisis/Invito)`,
        `${fInt(iEngagementConversions)} conversioni obiettivo + ${inp.iRispostaIstituzionalePct}% risposta istituzionale Pagina Bianca`,
      ],
      formulas: iFormulas,
    },
    community: {
      id: "community",
      startupMonetaryEur: cStartupCash,
      startupMonetaryDetail: `${fEur(cArchiveRev24m)} Living Archive 4.1 (Exit ARR ${fEur(cArchiveExitArr)}) + ${fEur(cFeaturedCallsRev)} Featured Calls + ${fEur(cStartupFee)} fee`,
      startupNonMonetary: [
        `${fInt(inp.cReturningMau)} professionisti di ritorno al mese (MAU) su bandi & audizioni`,
        `${inp.cRitenzioneSerialePct}% ritenzione seriale e serbatoio semi organici (${fInt(inp.cCommunitySemiOrganici)})`,
      ],
      stakeholderMonetaryEur: cNetScholarshipPool,
      stakeholderMonetaryDetail: `${fEur(cNetScholarshipPool)} erogati alle borse di studio (${cScholarshipsFunded} borse da ${fEur(inp.cValoreBorsaEur)})`,
      stakeholderNonMonetary: [
        `${fInt(cTotalVotes)} voti e mobilitazione territoriale su ${inp.cTappe24m} tappe`,
        `${fInt(cCallAppsAnnual)} candidature stimate/anno a bandi, residenze e audizioni`,
      ],
      formulas: cFormulas,
    },
    tecnologia: {
      id: "tecnologia",
      startupMonetaryEur: tRev24m,
      startupMonetaryDetail: `${fEur(tProjRev)} progetti (${tProjectsCount} edizioni) + ${fEur(tSaasRev)} SaaS Y2 | Margine contribuzione ${fDec(tContribMarginPct, 1)}%`,
      startupNonMonetary: [
        `Ammortamento Capex piattaforma L0 (€${fInt(inp.capexPiattaforma24m)})`,
        `~${inp.tQuotaLeadPlgBadgePct}% nuova pipeline inbound da badge 'Powered by'`,
      ],
      stakeholderMonetaryEur: tAvoidedCapexNet,
      stakeholderMonetaryDetail: `Risparmio netto reale di ${fEur(tAvoidedCapexNet)} rispetto a sviluppo CMS/agenzia (${fEur(inp.tCapexAlternativoClienteEur)}/progetto)`,
      stakeholderNonMonetary: [
        `Consegna in ${inp.tSettimaneConsegna} settimane (vs ${inp.tSettimaneCustomExNovo} settimane sviluppo ex novo)`,
        `Stack analytics, referral e Zero-Party Data GDPR nativi chiavi in mano`,
      ],
      formulas: tFormulas,
    },
    raw: {
      fRevB2G,
      fTourismGmv,
      fTourismCommStartup,
      fTourismNetOperators,
      fTourismExtraDays,
      fTourismSpillover,
      fClasses,
      fAvoidedCapex,
      aCultCash,
      aTechCash,
      aBarter,
      aLeadsTot,
      aSqlCount,
      aBrandEffectiveCplSql,
      aBrandEventsRead,
      aBrandGoalsValue,
      iReachStartupDedup,
      iCpmMediaValue,
      iAvoidedProdCost,
      iDbMonetizedStartup,
      iPipelineValueEstimated,
      iImportantClicks,
      iEngagementGoalValue,
      iPrintQrScans,
      cTotalVotes,
      cDonors,
      cGrossDonations,
      cStartupFee,
      cNetScholarshipPool,
      cScholarshipsFunded,
      cCallAppsAnnual,
      cFeaturedCallsRev,
      cArchiveLicensesY2,
      cArchiveExitArr,
      cArchiveRev24m,
      tProjectsCount,
      tRev24m,
      tContribMarginEur,
      tContribMarginPct,
      tAvoidedCapexNet,
    },
  };

  return {
    audience: {
      grossReach,
      uniqueReach,
      primaryReaders,
      viralMultiplier,
      effectiveKNet,
      viralAddedReaders,
      totalActiveReaders,
      directCacEur,
      fullyLoadedCacEur,
      zeroPartyProfiles,
      formulas: audFormulas,
    },
    pnl: {
      revenueY1Cash,
      revenueY2Cash,
      totalRevenueCash24m,
      tourismCommissionRevenue24m: fTourismCommStartup,
      institutionDbMonetized24m: iDbMonetizedStartup,
      barterValue24m: aBarter,
      passThroughScholarshipFund24m: cNetScholarshipPool,
      totalCogsCash24m,
      grossProfitCash24m,
      grossMarginPct,
      fixedAndGtmCosts24m,
      ebitdaY1,
      ebitdaY2,
      ebitda24m,
      ebitdaMarginPct,
      breakEvenRevenue24m,
      receivablesEndY1FromDso,
      peakCashNeedY1,
      revenueMix,
      formulas: pnlFormulas,
    },
    stakeholders,
  };
}
