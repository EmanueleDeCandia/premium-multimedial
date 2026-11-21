/* =========================================================================
   Modello Parametrico Pure-Input v2 ("Finestre sulla Danza")
   Branch: model-business
   Novità architetturali v2 (da revisione-simulatore.md):
   1. Motore Core Contest Online con Trailer (Compagnie + Scuole di Danza × Studenti
      × Inviti × Conv% = K_contest reale) con 3 monetizzazioni dirette
      (Iscrizioni, Licenze Concorso, Vota Donando + Sblocca Donando €2).
   2. Flusso "Vota Donando" ripartibile via INPUT tra Community (80%),
      Fondazioni/Enti (20%), Aziende ESG (0%) ed eventuale Fee Startup (0%).
   3. Origine chiara delle basi di Fondazioni & Comuni: licenze acquistate da
      Fondazioni e Comuni distribuite per promuovere spettacoli, contest e
      scuole di danza locali (0 contratti = 0 attivazioni B2G).
   4. Aziende e Brand con 3 basi distinte: (a) CRM proprio sponsor (Retention /
      Loyalty / Crisis), (b) Pool Cross-Sponsor orchestrato dalla Startup,
      (c) DB proprietario segmentato dalla Startup (20.000/azienda default)
      + Trailer Contest. Introduzione CLV duale: €500 B2C e €2.500 B2B Tech.
   5. Zero doppio conteggio su licenze diffuse da DB Istituzioni; Engagement S3
      separato tra micro-obiettivi e macro-obiettivi discreti; zero costanti
      hardcoded nascoste; DSO duale (B2G/PA vs B2B privato).
   ========================================================================= */

import type { StakeholderId } from "./content";

export type PresetId = "realistico" | "sitoOriginario" | "esigenzaAltaPosta" | "conservativo";

export interface SimulatorInputs {
  // 0. Diffusione Globale, Viralità Opera, Engagement, Costi & DSO Duale
  sovrapposizioneCanaliPct: number;
  kViralitaOpera: number;
  decadimentoViralePct: number;
  cpmCulturaleEur: number;
  dedupUtentiSuSessioniPct: number;
  quotaRicaviAnno1Pct: number;
  quotaCapexAnno1Pct: number;
  quotaOpexFissiAnno1Pct: number;
  dsoGiorniIncassoB2G: number;
  dsoGiorniIncassoB2B: number;
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
  fLicenzeMediePerEnte: number;
  fContattiCanaliLocaliPerEnte: number;
  fRedemptionEntiPct: number;
  fLetturaProfondaEntiPct: number;
  fScuoleDanzaPerEnte: number;
  fClassiGruppiPerScuola: number;
  fCompletamentoDidatticoPct: number;
  fCapexEvitatoPerEnteEur: number;
  // 4.4 Turismo Dual-Flow
  tAccessiGratuitiTerritorio: number;
  tTurismoLetturaProfondaPct: number;
  tEstensioneSoggiornoPct: number;
  tGiorniExtraMedi: number;
  tSpesaGiornalieraTerritorioEur: number;
  tAccessiBookingStartup: number;
  tConvBookingPct: number;
  tScontrinoMedioServizioEur: number;
  tCommissioneStartupPct: number;
  tCogsGestioneBookingPct: number;

  // 2. Aziende e Brand (3.3-B2B, 4.5, 4.6-Insight, Cross-DB, Trailer & CLV Duale)
  aCultContratti24m: number;
  aCultPrezzoEur: number;
  aCogsCultPct: number;
  aTechContratti24m: number;
  aTechTicketLordoEur: number;
  aTechBarterPct: number;
  aCogsTechLordoPct: number;
  aSponsorTrailerAutonomi: number;
  aPrezzoSponsorTrailerEur: number;
  aCrmProprioPerAzienda: number;
  aQuotaScambioCrossSponsorPct: number;
  aDbProprioStartupPerAzienda: number;
  aQuotaAudienceOperaEspostaPct: number;
  aRedemptionCrmProprioPct: number;
  aClickLoyaltyCrisisPct: number;
  aConvRetentionLoyaltyPct: number;
  aQuotaClvSalvataRetentionPct: number;
  aAperturaNuoviContattiStartupPct: number;
  aTassoLeadSuLettoriNuoviPct: number;
  aTassoChiusuraVenditaB2cPct: number;
  aTassoChiusuraVenditaB2bPct: number;
  aClvB2cEur: number; // default €500
  aClvB2bTechEur: number; // default €2.500
  aCplComparabileMercatoEur: number;
  aSurveyCompletionPct: number;
  aGdprOptInPct: number;
  aValoreRicercaEvitataBrandEur: number;

  // 3. Istituzioni Culturali e Media (3.4, 3.5, 3.6)
  iSpeciali24m: number;
  iReachPropriaIstituzione: number;
  iReachStartupIncrementale: number;
  iCostoProdEvitatoEnteEur: number;
  iCostoDirettoStartupSpecialeEur: number;
  iQuotaDbVersoTurismoPct: number;
  iQuotaDbVersoContestPct: number;
  iMoltiplicatoreAutorevolezzaPct: number;
  iContattiB2BOriginePerSpeciale: number;
  iConvPipelineIstituzioniPct: number;
  iValoreMedioDealPipelineEur: number;
  iAperturaContenutoPct: number;
  iLetturaProfondaSuAperturaPct: number;
  iClickEventoImportantePct: number;
  iConvMicroObiettivoIstituzionePct: number;
  iValoreMicroObiettivoIstituzioneEur: number;
  iMacroProgettiFinanziatiCount: number;
  iValoreMacroProgettoEur: number;
  iCopieStampaEsposte: number;
  iQrScanPct: number;
  iStampaLetturaProfondaPct: number;
  iCostoPonteStampaStartupEur: number;
  iCicliInchiesta: number;
  iRipreseStampaPerCiclo: number;
  iRispostaIstituzionalePct: number;

  // 4. Contest Online Trailer, Vota Donando, Bandi & Living Archive (3.2, 4.3, 4.1)
  cTappe24m: number;
  cCompagnieContest: number;
  cScuoleContest: number;
  cStudentiPerCompagnia: number;
  cStudentiPerScuola: number;
  cPrezzoIscrizioneCompagniaEur: number;
  cPrezzoIscrizioneScuolaEur: number;
  cLicenzeMediePerPartecipante: number;
  cPrezzoLicenzaConcorsoEur: number;
  cInvitiMediPerStudente: number;
  cConvInvitiContestPct: number;
  cSovrapposizioneContestPct: number;
  cQuotaSpettatoriLettoriOperaPct: number;
  cTassoDonantiSuVotantiPct: number;
  cDonazioneMediaVotoEur: number;
  cTassoSbloccaDonandoReaderPct: number;
  cImportoSbloccaDonandoEur: number;
  cCostoGatewayPct: number;
  cFeeGestioneStartupDonazioniPct: number;
  cQuotaDonazioniCommunityPct: number;
  cQuotaDonazioniFondazioniPct: number;
  cQuotaDonazioniAziendeEsgPct: number;
  cValoreBorsaEur: number;
  cRitenzioneSerialePct: number;
  cCostoVariabilePerPartecipanteEur: number;
  cCostoFissoPerTappaGiuriaEur: number;
  cReturningMau: number;
  cVisiteAnnuePerMau: number;
  cCtrCallPct: number;
  cFeaturedCalls24m: number;
  cFeaturedCallPrezzoEur: number;
  cCostiCuratelaBandi24m: number;
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
  tRinnovoSaasY2Pct: number;
  tCanoneSaasAnnuoEur: number;
  tCogsSaasPct: number;
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
    assumptionNote: "Quota stimata di persone raggiunte su più canali (es. sia da festival che da contest/social) sottratta per calcolare la reach unica.",
    biasNote: "Il sito originario sommava i canali senza esplicitare alcuna deduplicazione.",
  },
  kViralitaOpera: {
    key: "kViralitaOpera",
    label: "Viralità organica generale dell'Opera (K-factor)",
    unit: "x",
    min: 0,
    max: 3,
    step: 0.05,
    assumptionNote: "Viralità generale dei lettori dell'ebook (esclusa la spinta specifica dei contest già calcolata da Studenti × Inviti × Conv%). Può essere 0 o 2.",
    biasNote: "Sul sito era bloccato a K = 1,35 senza distinzione tra pubblico contest e pubblico editoriale.",
  },
  decadimentoViralePct: {
    key: "decadimentoViralePct",
    label: "Smorzamento di rete tra ondate successive",
    unit: "%",
    min: 0,
    max: 90,
    step: 5,
    assumptionNote: "Decadimento fisiologico della viralità dalla 1ª alla 3ª ondata per saturazione delle community.",
  },
  cpmCulturaleEur: {
    key: "cpmCulturaleEur",
    label: "CPM media culturali su reach incrementale Startup",
    unit: "€",
    min: 0,
    max: 300,
    step: 5,
    assumptionNote: "Valore equivalente per 1.000 contatti diversi dal DB già posseduto dall'Istituzione. Default €90 CPM.",
    biasNote: "Corregge il €1,20/contatto (= €1.200 CPM) applicato sul sito anche alla mailing list dell'ente.",
  },
  dedupUtentiSuSessioniPct: {
    key: "dedupUtentiSuSessioniPct",
    label: "Rapporto utenti unici su sessioni attive totali",
    unit: "%",
    min: 40,
    max: 100,
    step: 1,
    assumptionNote: "Fattore di conversione da letture/sessioni attive a persone fisiche uniche (sostituisce la vecchia costante 0,85 nascosta).",
  },
  quotaRicaviAnno1Pct: {
    key: "quotaRicaviAnno1Pct",
    label: "Quota ricavi maturata in Anno 1 (vs Anno 2)",
    unit: "%",
    min: 10,
    max: 70,
    step: 2,
    assumptionNote: "Ripartizione dei ricavi 24M tra Anno 1 (build & lancio) e Anno 2 (scala & rinnovi).",
  },
  quotaCapexAnno1Pct: {
    key: "quotaCapexAnno1Pct",
    label: "Quota Capex piattaforma sostenuta in Anno 1",
    unit: "%",
    min: 30,
    max: 100,
    step: 5,
    assumptionNote: "Quota dell'investimento tech iniziale concentrata nei primi 12 mesi (sostituisce la vecchia costante 75%).",
  },
  quotaOpexFissiAnno1Pct: {
    key: "quotaOpexFissiAnno1Pct",
    label: "Quota costi fissi redazione/sales/G&A in Anno 1",
    unit: "%",
    min: 30,
    max: 70,
    step: 2,
    assumptionNote: "Incidenza sui primi 12 mesi di redazione, sales e struttura (sostituisce la vecchia costante 48%).",
  },
  dsoGiorniIncassoB2G: {
    key: "dsoGiorniIncassoB2G",
    label: "DSO · Tempi medi incasso Enti, PA, Atenei & Musei",
    unit: "gg",
    min: 0,
    max: 240,
    step: 15,
    assumptionNote: "Giorni medi d'incasso su Fondazioni, Comuni, Università (4.1) e Musei White-Label (4.7).",
    biasNote: "Nella v1 era applicato solo a Fondazioni escludendo Università e Musei pubblici.",
  },
  dsoGiorniIncassoB2B: {
    key: "dsoGiorniIncassoB2B",
    label: "DSO · Tempi medi incasso Aziende Private & B2B",
    unit: "gg",
    min: 0,
    max: 180,
    step: 15,
    assumptionNote: "Giorni medi di incasso delle fatture verso imprese private sponsor e partner tech.",
  },
  capexPiattaforma24m: {
    key: "capexPiattaforma24m",
    label: "Capex piattaforma tech, player & contest engine (24M)",
    unit: "€",
    min: 0,
    max: 200000,
    step: 5000,
    assumptionNote: "Sviluppo web-app multimediale, piattaforma contest trailer/voti, tracking popup interattivi e modularizzazione White-Label.",
  },
  costiFissiRedazione24m: {
    key: "costiFissiRedazione24m",
    label: "Costi fissi redazione, produzione L0 e inchieste (24M)",
    unit: "€",
    min: 0,
    max: 350000,
    step: 5000,
    assumptionNote: "Direzione editoriale, autori indipendenti e dossier d'inchiesta indipendenti dai singoli contratti.",
  },
  costiSalesAbm24m: {
    key: "costiSalesAbm24m",
    label: "Costi team Sales, ABM, PM & Account (24M)",
    unit: "€",
    min: 0,
    max: 250000,
    step: 4000,
    assumptionNote: "Compensi commerciali, cofanetti ABM e account management (usato per il CAC fully-loaded).",
  },
  costiDistribuzioneSeeding24m: {
    key: "costiDistribuzioneSeeding24m",
    label: "Spese dirette Phygital (QR/NFC), media kit & seeding (24M)",
    unit: "€",
    min: 0,
    max: 150000,
    step: 2000,
    assumptionNote: "Stampa QR/NFC, media kit personalizzati e seeding. Il CAC diretto si calcola dividendo questa spesa per i lettori effettivi.",
  },
  costiGaCdnGdpr24m: {
    key: "costiGaCdnGdpr24m",
    label: "G&A, cloud streaming 4K, legali GDPR & amministrazione (24M)",
    unit: "€",
    min: 0,
    max: 150000,
    step: 2000,
    assumptionNote: "Hosting video/trailer, DPO/GDPR compliance, contabilità e struttura.",
  },

  // S1 Fondazioni & Enti
  f1Contratti24m: {
    key: "f1Contratti24m",
    label: "Contratti Tier F1 · Fondazioni / Comuni Base (24M)",
    unit: "n",
    min: 0,
    max: 40,
    step: 1,
    assumptionNote: "Fondazioni bancarie, fondazioni d'impresa o Comuni che acquistano pacchetti di licenze per promuovere spettacoli, contest o progetti locali.",
  },
  f1PrezzoEur: {
    key: "f1PrezzoEur",
    label: "Prezzo unitario Tier F1",
    unit: "€",
    min: 0,
    max: 35000,
    step: 500,
    assumptionNote: "Prezzo del pacchetto base (default €9.800 da listino sito, libero anche per pacchetti comunali piccoli da €2.000–€5.000).",
  },
  f2Contratti24m: {
    key: "f2Contratti24m",
    label: "Contratti Tier F2 · Edizione Territoriale & Tourism (24M)",
    unit: "n",
    min: 0,
    max: 25,
    step: 1,
    assumptionNote: "Comuni, Unioni di Comuni o DMO che attivano edizioni territoriali e itinerari geolocalizzati (3.3-B2G + 4.4).",
  },
  f2PrezzoEur: {
    key: "f2PrezzoEur",
    label: "Prezzo unitario Tier F2",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Include produzione reportage territoriali, audio-guide e QR su strutture/teatri comunali.",
  },
  f3Contratti24m: {
    key: "f3Contratti24m",
    label: "Contratti Tier F3 · Programma Regionale Annuale (24M)",
    unit: "n",
    min: 0,
    max: 15,
    step: 1,
    assumptionNote: "Accordi quadro regionali o grandi Fondazioni con programma annuale multi-uscita.",
  },
  f3PrezzoEur: {
    key: "f3PrezzoEur",
    label: "Prezzo unitario Tier F3",
    unit: "€",
    min: 0,
    max: 60000,
    step: 500,
    assumptionNote: "Prezzo comprensivo di sconto programma annuale.",
  },
  fCogsPct: {
    key: "fCogsPct",
    label: "COGS variabili erogazione Fondazioni/Enti (%)",
    unit: "%",
    min: 0,
    max: 70,
    step: 1,
    assumptionNote: "Costi variabili di personalizzazione ex-libris, contenuti territoriali e report d'impatto.",
  },
  fLicenzeMediePerEnte: {
    key: "fLicenzeMediePerEnte",
    label: "Licenze medie acquistate e distribuite per Ente/Comune",
    unit: "n",
    min: 0,
    max: 2000,
    step: 50,
    assumptionNote: "Es. un Comune acquista 100-500 licenze per distribuirle a cittadini, spettatori teatrali e scuole di danza locali promuovendo gli spettacoli comunali; una Fondazione fino a 1.000.",
    biasNote: "Nella v1 i contatti degli enti erano un numero astratto attivo anche con 0 contratti; ora derivano dai contratti chiusi.",
  },
  fContattiCanaliLocaliPerEnte: {
    key: "fContattiCanaliLocaliPerEnte",
    label: "Contatti medi newsletter/cartellone del singolo Ente",
    unit: "n",
    min: 0,
    max: 30000,
    step: 500,
    assumptionNote: "Cittadini e spettatori raggiunti tramite i canali del Comune/Fondazione quando l'ente promuove le copie/spettacoli acquistati.",
  },
  fRedemptionEntiPct: {
    key: "fRedemptionEntiPct",
    label: "Tasso attivazione effettiva tra licenze & canali Ente",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Percentuale di cittadini/destinatari che riscatta e apre l'ebook tramite le copie o i link distribuiti dall'ente.",
  },
  fLetturaProfondaEntiPct: {
    key: "fLetturaProfondaEntiPct",
    label: "Quota attivazioni Enti con lettura attiva (> 4 min)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di chi apre l'ebook da canale comunale/fondazione che fruisce in profondità i contenuti.",
  },
  fScuoleDanzaPerEnte: {
    key: "fScuoleDanzaPerEnte",
    label: "Scuole di Danza / Accademie sostenute per Ente contrattualizzato",
    unit: "n",
    min: 0,
    max: 30,
    step: 0.5,
    assumptionNote: "Scuole di danza e realtà coreutiche del territorio coinvolte da ciascun Comune o Fondazione che acquista il pacchetto (0 contratti = 0 scuole B2G).",
  },
  fClassiGruppiPerScuola: {
    key: "fClassiGruppiPerScuola",
    label: "Gruppi / corsi medi coinvolti per Scuola di Danza",
    unit: "n",
    min: 0,
    max: 15,
    step: 0.2,
    assumptionNote: "Numero medio di classi/corsi che utilizzano i moduli multimediali in ciascuna scuola di danza sostenuta.",
  },
  fCompletamentoDidatticoPct: {
    key: "fCompletamentoDidatticoPct",
    label: "Completamento moduli didattici (4.2)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Percentuale di classi/gruppi che completa il percorso multimediale.",
  },
  fCapexEvitatoPerEnteEur: {
    key: "fCapexEvitatoPerEnteEur",
    label: "Costo progetto culturale/editoriale evitato per Ente",
    unit: "€",
    min: 0,
    max: 100000,
    step: 2000,
    assumptionNote: "Spesa evitata dall'ente rispetto a sviluppare internamente un portale o pubblicazione territoriale equivalente.",
  },
  tAccessiGratuitiTerritorio: {
    key: "tAccessiGratuitiTerritorio",
    label: "Accessi turistici gratuiti su territorio (non monetizzati)",
    unit: "n",
    min: 0,
    max: 200000,
    step: 2000,
    assumptionNote: "Fruizione gratuita di mappe/audio-guide nei borghi e info-point: genera giornate di presenza attribuite alle Istituzioni.",
  },
  tTurismoLetturaProfondaPct: {
    key: "tTurismoLetturaProfondaPct",
    label: "Quota accessi turistici con lettura attiva (> 4 min)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale dei visitatori gratuiti che fruisce in profondità l'itinerario (sostituisce la vecchia costante 25%).",
  },
  tEstensioneSoggiornoPct: {
    key: "tEstensioneSoggiornoPct",
    label: "% visitatori che estende soggiorno grazie alla guida",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Quota che aggiunge permanenza locale per assistere a spettacoli o visitare artigiani.",
  },
  tGiorniExtraMedi: {
    key: "tGiorniExtraMedi",
    label: "Giornate di presenza extra medie per convertito",
    unit: "gg",
    min: 0,
    max: 7,
    step: 0.1,
    assumptionNote: "Durata media dell'estensione di soggiorno sul territorio.",
  },
  tSpesaGiornalieraTerritorioEur: {
    key: "tSpesaGiornalieraTerritorioEur",
    label: "Spesa media giornaliera sul territorio",
    unit: "€",
    min: 0,
    max: 350,
    step: 5,
    assumptionNote: "Spesa locale media per alloggio, ristorazione, artigianato e cultura.",
  },
  tAccessiBookingStartup: {
    key: "tAccessiBookingStartup",
    label: "Accessi da contenuti Startup verso servizi prenotabili (4.4)",
    unit: "n",
    min: 0,
    max: 200000,
    step: 1000,
    assumptionNote: "Traffico indirizzato da itinerari, schede spettacolo o newsletter verso servizi ricettivi/esperienziali prenotabili.",
  },
  tConvBookingPct: {
    key: "tConvBookingPct",
    label: "Tasso conversione in prenotazione effettiva",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Percentuale di utenti interessati che completa una prenotazione tracciata.",
  },
  tScontrinoMedioServizioEur: {
    key: "tScontrinoMedioServizioEur",
    label: "Scontrino medio prenotazione / servizio (GMV)",
    unit: "€",
    min: 0,
    max: 1000,
    step: 5,
    assumptionNote: "Valore lordo medio della prenotazione ricettiva, esperienza o servizio.",
  },
  tCommissioneStartupPct: {
    key: "tCommissioneStartupPct",
    label: "Commissione Startup su servizi turistici (0% – 80%+)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Fee applicata alle imprese ricettive/operatori (es. 12%-18%) o fino all'80% per servizi organizzati dalla Startup.",
  },
  tCogsGestioneBookingPct: {
    key: "tCogsGestioneBookingPct",
    label: "Costo variabile gestione booking Startup (% su commissioni)",
    unit: "%",
    min: 0,
    max: 60,
    step: 2,
    assumptionNote: "Assistenza prenotazioni, gateway e costi operativi sulle transazioni (sostituisce la costante 12%).",
  },

  // S2 Aziende e Brand
  aCultContratti24m: {
    key: "aCultContratti24m",
    label: "Aziende Sponsor Culturali Private (3.3-B2B)",
    unit: "n",
    min: 0,
    max: 30,
    step: 1,
    assumptionNote: "Brand consumer/lifestyle che acquistano un pacchetto/capitolo tematico (può includere anche la sponsorizzazione dei trailer contest).",
  },
  aCultPrezzoEur: {
    key: "aCultPrezzoEur",
    label: "Prezzo unitario Cultural Sponsorship",
    unit: "€",
    min: 0,
    max: 50000,
    step: 1000,
    assumptionNote: "Ticket pacchetto sponsor (include distribuzione al CRM aziendale + pool Startup).",
  },
  aCogsCultPct: {
    key: "aCogsCultPct",
    label: "COGS produzione capitolo sponsorizzato (%)",
    unit: "%",
    min: 0,
    max: 70,
    step: 1,
    assumptionNote: "Costi redazionali e di attivazione campagne multi-database.",
  },
  aTechContratti24m: {
    key: "aTechContratti24m",
    label: "Aziende Filiera Tech & B2B (4.5 Tech Showcase)",
    unit: "n",
    min: 0,
    max: 30,
    step: 1,
    assumptionNote: "Partner tecnici (pavimentazioni, illuminotecnica, acustica, tessuti, fisioterapia sportiva) che vendono a teatri, compagnie e scuole.",
  },
  aTechTicketLordoEur: {
    key: "aTechTicketLordoEur",
    label: "Valore lordo pacchetto Tech Showcase",
    unit: "€",
    min: 0,
    max: 60000,
    step: 1000,
    assumptionNote: "Corrispettivo lordo (cash + eventuale quota barter).",
  },
  aTechBarterPct: {
    key: "aTechBarterPct",
    label: "Quota Barter tecnico reale (% sul lordo)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Fornitura tecnica contabilizzata solo a riduzione COGS tecnici (mai nei ricavi cash).",
  },
  aCogsTechLordoPct: {
    key: "aCogsTechLordoPct",
    label: "COGS lordo produzione video-esplosi 4K (4.5)",
    unit: "%",
    min: 0,
    max: 80,
    step: 1,
    assumptionNote: "Costo di produzione reportage tecnici prima della compensazione barter.",
  },
  aSponsorTrailerAutonomi: {
    key: "aSponsorTrailerAutonomi",
    label: "Sponsorizzazioni Trailer Contest autonome (se extra licenza)",
    unit: "n",
    min: 0,
    max: 40,
    step: 1,
    assumptionNote: "Nota esplicita: normalmente la sponsorizzazione dei trailer contest rientra già nel costo di acquisto della licenza/pacchetto sponsor; usa questo campo (>0) solo per slot venduti a parte.",
    biasNote: "Evita il doppio conteggio tra pacchetti sponsor e sponsorizzazione dei trailer contest.",
  },
  aPrezzoSponsorTrailerEur: {
    key: "aPrezzoSponsorTrailerEur",
    label: "Prezzo slot Sponsor Trailer Contest autonomo (default €0 se incluso)",
    unit: "€",
    min: 0,
    max: 25000,
    step: 500,
    assumptionNote: "Impostato a €0 o usato solo per pacchetti autonomi oltre la licenza principale.",
  },
  aCrmProprioPerAzienda: {
    key: "aCrmProprioPerAzienda",
    label: "Contatti CRM propri conferiti per singola Azienda Sponsor",
    unit: "n",
    min: 0,
    max: 100000,
    step: 1000,
    assumptionNote: "Es. 20.000 contatti per ciascuno dei 10 sponsor = 200.000 contatti propri totali usati per Retention/Loyalty/Crisis e condivisi nel pool Startup.",
  },
  aQuotaScambioCrossSponsorPct: {
    key: "aQuotaScambioCrossSponsorPct",
    label: "% Pool Cross-Sponsor orchestrato dalla Startup (attivo se ≥2 sponsor)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Grazie all'orchestrazione Startup, ciascun brand raggiunge contatti provenienti dalle basi degli altri sponsor del pool (trasferimento basi clienti).",
  },
  aDbProprioStartupPerAzienda: {
    key: "aDbProprioStartupPerAzienda",
    label: "Contatti DB proprietario selezionati dalla Startup / Azienda",
    unit: "n",
    min: 0,
    max: 100000,
    step: 1000,
    assumptionNote: "Database proprietario segmentato dalla Startup e spedito per conto di ciascuna Azienda Cliente (default 20.000 per azienda).",
  },
  aQuotaAudienceOperaEspostaPct: {
    key: "aQuotaAudienceOperaEspostaPct",
    label: "% Audience Opera & Trailer Contest esposta ai moduli Sponsor",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota di lettori attivi dell'ebook + spettatori dei trailer contest che incontra i capitoli/trailer sponsorizzati.",
  },
  aRedemptionCrmProprioPct: {
    key: "aRedemptionCrmProprioPct",
    label: "Apertura/lettura su CRM proprio dello Sponsor",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Tasso di risposta dei clienti già presenti nel CRM dell'azienda.",
  },
  aClickLoyaltyCrisisPct: {
    key: "aClickLoyaltyCrisisPct",
    label: "Click su popup strategico Brand (Loyalty / Crisis Management)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Clienti sul CRM proprio che cliccano contenuti critici su valori, qualità o gestione crisi.",
  },
  aConvRetentionLoyaltyPct: {
    key: "aConvRetentionLoyaltyPct",
    label: "Tasso retention / riattivazione clienti da Loyalty & Crisis",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Quota di clienti ingaggiati che rinnova o evita l'abbandono grazie alla comunicazione d'autore.",
  },
  aQuotaClvSalvataRetentionPct: {
    key: "aQuotaClvSalvataRetentionPct",
    label: "% di CLV preservato per ciascun cliente fidelizzato/trattenuto",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota del Customer Lifetime Value (€500 B2C / €2.500 B2B) salvaguardata dall'azione di Loyalty/Crisis.",
  },
  aAperturaNuoviContattiStartupPct: {
    key: "aAperturaNuoviContattiStartupPct",
    label: "Apertura/lettura su nuovi contatti (Cross-Sponsor + DB Startup)",
    unit: "%",
    min: 0,
    max: 40,
    step: 1,
    assumptionNote: "Tasso di lettura su audience nuove raggiunte tramite il DB segmentato Startup e il pool cross-sponsor.",
  },
  aTassoLeadSuLettoriNuoviPct: {
    key: "aTassoLeadSuLettoriNuoviPct",
    label: "Conversione in Lead qualificati su audience nuove & opera",
    unit: "%",
    min: 0,
    max: 25,
    step: 0.5,
    assumptionNote: "Quota di lettori nuovi (da Pool Cross-Sponsor, DB Startup, Opera & Trailer) che lascia un contatto/richiesta commerciale per l'azienda.",
    biasNote: "Sostituisce i '22 lead da fiera' scollegati della v1: ora i lead derivano dall'audience reale totale.",
  },
  aTassoChiusuraVenditaB2cPct: {
    key: "aTassoChiusuraVenditaB2cPct",
    label: "Close rate Lead → Clienti B2C / Cultural Sponsor",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Percentuale di lead generati ai brand consumer che diventa cliente pagante.",
  },
  aTassoChiusuraVenditaB2bPct: {
    key: "aTassoChiusuraVenditaB2bPct",
    label: "Close rate Lead → Clienti B2B Filiera Tech",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Percentuale di lead B2B (teatri, compagnie, scuole di danza) convertita in contratto tecnico.",
  },
  aClvB2cEur: {
    key: "aClvB2cEur",
    label: "Customer Lifetime Value · Aziende B2C / Brand (default €500)",
    unit: "€",
    min: 50,
    max: 10000,
    step: 50,
    assumptionNote: "Valore netto generato lungo il ciclo di vita da un cliente consumer acquisito o trattenuto (default €500).",
  },
  aClvB2bTechEur: {
    key: "aClvB2bTechEur",
    label: "Customer Lifetime Value · Aziende B2B Filiera Tech (default €2.500)",
    unit: "€",
    min: 200,
    max: 50000,
    step: 100,
    assumptionNote: "Valore ciclo di vita di un cliente B2B (teatro, scuola di danza, studio) per fornitori tecnici (default €2.500).",
  },
  aCplComparabileMercatoEur: {
    key: "aCplComparabileMercatoEur",
    label: "Valore equivalente di mercato per Lead qualificato (benchmark)",
    unit: "€",
    min: 0,
    max: 500,
    step: 5,
    assumptionNote: "Costo alternativo per ottenere un lead qualificato equivalente su canali paid/fiere.",
  },
  aSurveyCompletionPct: {
    key: "aSurveyCompletionPct",
    label: "Completamento quiz / sondaggi interattivi (4.6)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Percentuale di utenti unici attivi che compila i moduli Zero-Party Data.",
  },
  aGdprOptInPct: {
    key: "aGdprOptInPct",
    label: "Consenso esplicito GDPR su rispondenti",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Quota che autorizza l'uso segmentato delle preferenze dichiarate.",
  },
  aValoreRicercaEvitataBrandEur: {
    key: "aValoreRicercaEvitataBrandEur",
    label: "Valore ricerca di mercato risparmiata per Azienda (4.6)",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Costo evitato rispetto a panel/ricerche esterne sul pubblico culturale.",
  },

  // S3 Istituzioni Culturali e Media
  iSpeciali24m: {
    key: "iSpeciali24m",
    label: "Speciali editoriali per Festival & Teatri (3.4)",
    unit: "n",
    min: 0,
    max: 20,
    step: 1,
    assumptionNote: "Numero di speciali monografici realizzati a costo zero per l'istituzione.",
  },
  iReachPropriaIstituzione: {
    key: "iReachPropriaIstituzione",
    label: "Contatti propri dell'Istituzione (DB/abbonati ente · 0 CPM)",
    unit: "n",
    min: 0,
    max: 2000000,
    step: 10000,
    assumptionNote: "Audience dell'ente (0 CPM fittizio). Genera traffico qualificato verso gli imbuti reali e Autorevolezza (Halo Effect) per la Startup, senza doppio conteggio licenze.",
    biasNote: "Eliminato il doppio conteggio della v1 sulle azioni monetizzate da DB Ente: le licenze sono già pagate a monte.",
  },
  iReachStartupIncrementale: {
    key: "iReachStartupIncrementale",
    label: "Contatti DIVERSI pubblicati dalla Startup (Reach Incrementale)",
    unit: "n",
    min: 0,
    max: 1500000,
    step: 10000,
    assumptionNote: "Audience nuova e diversa da quella già posseduta dall'istituzione, valorizzata a CPM culturale (€90 default).",
  },
  iCostoProdEvitatoEnteEur: {
    key: "iCostoProdEvitatoEnteEur",
    label: "Costo produzione editoriale risparmiato dall'Ente / speciale",
    unit: "€",
    min: 0,
    max: 100000,
    step: 1000,
    assumptionNote: "Risparmio reale per il festival rispetto a produrre esternamente contenuti editoriali e video equivalenti.",
  },
  iCostoDirettoStartupSpecialeEur: {
    key: "iCostoDirettoStartupSpecialeEur",
    label: "Costo marginale Startup per produrre lo speciale (3.4)",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Spesa reale sostenuta dalla Startup per erogare il servizio gratuito all'istituzione.",
  },
  iQuotaDbVersoTurismoPct: {
    key: "iQuotaDbVersoTurismoPct",
    label: "% lettori DB Istituzione indirizzati a offerte Turismo 4.4",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Quota di pubblico del festival che naviga verso prenotazioni/itinerari 4.4 (mostra il contributo al traffico senza duplicare i ricavi).",
  },
  iQuotaDbVersoContestPct: {
    key: "iQuotaDbVersoContestPct",
    label: "% lettori DB Istituzione che partecipa/vota ai Contest 3.2",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Cross-fertilization di pubblico tra grandi festival e contest online.",
  },
  iMoltiplicatoreAutorevolezzaPct: {
    key: "iMoltiplicatoreAutorevolezzaPct",
    label: "Autorevolezza acquisita per coinvolgere altre Istituzioni (Halo %)",
    unit: "%",
    min: 0,
    max: 200,
    step: 5,
    assumptionNote: "Beneficio NON monetizzabile strategico: legittimazione della startup emergente presso altri enti/festival.",
  },
  iContattiB2BOriginePerSpeciale: {
    key: "iContattiB2BOriginePerSpeciale",
    label: "Nuovi contatti decisionali originati / speciale (3.4)",
    unit: "n",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Direttori e partner conosciuti tramite lo speciale.",
  },
  iConvPipelineIstituzioniPct: {
    key: "iConvPipelineIstituzioniPct",
    label: "Conversione pipeline in proposte/contratti",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota di contatti originati che si trasforma in trattativa attiva.",
  },
  iValoreMedioDealPipelineEur: {
    key: "iValoreMedioDealPipelineEur",
    label: "Valore medio atteso per deal originato in pipeline",
    unit: "€",
    min: 0,
    max: 80000,
    step: 1000,
    assumptionNote: "Valore indicativo di origination (tracciato a parte per non sommarlo due volte ai ricavi S1/S2/S5).",
  },
  iAperturaContenutoPct: {
    key: "iAperturaContenutoPct",
    label: "Tasso apertura opera multimediale su esposti (3.4)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota complessiva di utenti raggiunti che apre lo speciale.",
  },
  iLetturaProfondaSuAperturaPct: {
    key: "iLetturaProfondaSuAperturaPct",
    label: "Quota aperture con lettura attiva (> 4 min) — omogenea",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Allinea la definizione di Lettore Attivo del canale festival a quella degli altri canali (risolve l'inflazione al 77% della v1).",
  },
  iClickEventoImportantePct: {
    key: "iClickEventoImportantePct",
    label: "Click su popup critico (Loyalty / Crisis / Invito Conf. Stampa)",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Lettori che cliccano il contenuto strategico chiave ('cosa ha fatto / non ha fatto l'Istituzione').",
  },
  iConvMicroObiettivoIstituzionePct: {
    key: "iConvMicroObiettivoIstituzionePct",
    label: "Conversione su micro-obiettivo abbonato/loyalty (%)",
    unit: "%",
    min: 0,
    max: 100,
    step: 0.5,
    assumptionNote: "Quota di chi clicca che conferma loyalty o rinnovo/iscrizione (basso valore unitario, alto volume).",
  },
  iValoreMicroObiettivoIstituzioneEur: {
    key: "iValoreMicroObiettivoIstituzioneEur",
    label: "Valore unitario micro-obiettivo Istituzione (es. €30 loyalty)",
    unit: "€",
    min: 0,
    max: 500,
    step: 5,
    assumptionNote: "Valore realistico di un micro-obiettivo di massa (es. €25-€45), evitando la moltiplicazione di massa per €350 vista nella v1.",
    biasNote: "Corregge l'esplosione a €351k della v1 separando micro-obiettivi di massa dai macro-obiettivi rari.",
  },
  iMacroProgettiFinanziatiCount: {
    key: "iMacroProgettiFinanziatiCount",
    label: "Macro-obiettivi discreti raggiunti (es. progetti finanziati)",
    unit: "n",
    min: 0,
    max: 20,
    step: 1,
    assumptionNote: "Numero discreto di grandi risultati (es. 1 progetto finanziato da privati dopo conferenza stampa).",
  },
  iValoreMacroProgettoEur: {
    key: "iValoreMacroProgettoEur",
    label: "Valore medio per singolo Macro-obiettivo (es. €100.000)",
    unit: "€",
    min: 0,
    max: 500000,
    step: 5000,
    assumptionNote: "Valore del progetto finanziato o della crisi risolta per singola occorrenza.",
  },
  iCopieStampaEsposte: {
    key: "iCopieStampaEsposte",
    label: "Copie stampa e abbonati esposti agli inserti (3.5)",
    unit: "n",
    min: 0,
    max: 1000000,
    step: 10000,
    assumptionNote: "Tiratura complessiva degli allegati phygital su testate partner.",
  },
  iQrScanPct: {
    key: "iQrScanPct",
    label: "Tasso scansione QR da carta a digitale (3.5)",
    unit: "%",
    min: 0,
    max: 25,
    step: 0.2,
    assumptionNote: "Conversione carta → digitale (realistico stampa italiana: 0,8%-2,5%).",
  },
  iStampaLetturaProfondaPct: {
    key: "iStampaLetturaProfondaPct",
    label: "Quota scan QR stampa con lettura attiva (> 4 min)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di chi scansiona che legge in profondità l'opera.",
  },
  iCostoPonteStampaStartupEur: {
    key: "iCostoPonteStampaStartupEur",
    label: "Costo Startup ponte digitale e clip video stampa (3.5)",
    unit: "€",
    min: 0,
    max: 50000,
    step: 500,
    assumptionNote: "Spesa di produzione dei contenuti digitali collegati agli inserti cartacei.",
  },
  iCicliInchiesta: {
    key: "iCicliInchiesta",
    label: "Cicli d'inchiesta 'Stati Generali & Pagina Bianca' (3.6)",
    unit: "n",
    min: 0,
    max: 12,
    step: 1,
    assumptionNote: "Numero di dossier pubblici nei 24 mesi.",
  },
  iRipreseStampaPerCiclo: {
    key: "iRipreseStampaPerCiclo",
    label: "Riprese stampa e media per ciclo (3.6)",
    unit: "n",
    min: 0,
    max: 150,
    step: 1,
    assumptionNote: "Articoli e servizi generati da ogni inchiesta.",
  },
  iRispostaIstituzionalePct: {
    key: "iRispostaIstituzionalePct",
    label: "Tasso risposta enti interpellati ('Pagina Bianca')",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Percentuale di istituzioni che fornisce presa di posizione ufficiale.",
  },

  // S4 Contest Trailer, Vota Donando, Bandi & Archive
  cTappe24m: {
    key: "cTappe24m",
    label: "Edizioni / tappe di Contest Trailer nei 24 mesi (3.2)",
    unit: "n",
    min: 0,
    max: 30,
    step: 1,
    assumptionNote: "Tornei/concorsi online con trailer e giurie di giornalisti nei 24 mesi.",
  },
  cCompagnieContest: {
    key: "cCompagnieContest",
    label: "Compagnie di Danza partecipanti ai Contest (tot. 24M)",
    unit: "n",
    min: 0,
    max: 300,
    step: 1,
    assumptionNote: "Compagnie professionali o emergenti che partecipano con un proprio trailer coreografico online.",
  },
  cScuoleContest: {
    key: "cScuoleContest",
    label: "Scuole di Danza partecipanti ai Contest (tot. 24M)",
    unit: "n",
    min: 0,
    max: 500,
    step: 2,
    assumptionNote: "Scuole di danza che iscrivono gruppi/coreografie con trailer dedicati nella piattaforma.",
  },
  cStudentiPerCompagnia: {
    key: "cStudentiPerCompagnia",
    label: "Danzatori / componenti medi per Compagnia in gara",
    unit: "n",
    min: 1,
    max: 50,
    step: 1,
    assumptionNote: "Numero medio di danzatori che compongono il cast del trailer della compagnia (attivi negli inviti).",
  },
  cStudentiPerScuola: {
    key: "cStudentiPerScuola",
    label: "Studenti / allievi medi per Scuola di Danza in gara",
    unit: "n",
    min: 1,
    max: 200,
    step: 1,
    assumptionNote: "Allievi partecipanti per singola scuola di danza.",
  },
  cPrezzoIscrizioneCompagniaEur: {
    key: "cPrezzoIscrizioneCompagniaEur",
    label: "Prezzo iscrizione al Contest · Compagnia (€0 = gratis)",
    unit: "€",
    min: 0,
    max: 1000,
    step: 10,
    assumptionNote: "Quota d'iscrizione o pack trailer pagata da ogni compagnia partecipante (default €120).",
  },
  cPrezzoIscrizioneScuolaEur: {
    key: "cPrezzoIscrizioneScuolaEur",
    label: "Prezzo iscrizione al Contest · Scuola di Danza (€0 = gratis)",
    unit: "€",
    min: 0,
    max: 1000,
    step: 10,
    assumptionNote: "Quota d'iscrizione pagata da ogni scuola partecipante (default €120).",
  },
  cLicenzeMediePerPartecipante: {
    key: "cLicenzeMediePerPartecipante",
    label: "Licenze multimediali concorso acquistate per Scuola/Compagnia",
    unit: "n",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Pacchetti multimediali del torneo (video integrali, schede, backstage, voting pass) acquistati da scuole, compagnie o famiglie.",
  },
  cPrezzoLicenzaConcorsoEur: {
    key: "cPrezzoLicenzaConcorsoEur",
    label: "Prezzo unitario Licenza Multimediale del Concorso",
    unit: "€",
    min: 0,
    max: 250,
    step: 5,
    assumptionNote: "Prezzo per singola licenza digitale del concorso (default €35).",
  },
  cInvitiMediPerStudente: {
    key: "cInvitiMediPerStudente",
    label: "Amici/familiari invitati in media da ogni studente in gara",
    unit: "n",
    min: 0,
    max: 40,
    step: 1,
    assumptionNote: "Ogni ballerino/studente invita amici, parenti e community a guardare e votare il trailer.",
  },
  cConvInvitiContestPct: {
    key: "cConvInvitiContestPct",
    label: "Tasso conversione inviti Contest → Spettatori/Votanti",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Coefficiente virale del contest = Inviti × Conv% (es. 8 × 30% = 2,40 votanti/studente).",
  },
  cSovrapposizioneContestPct: {
    key: "cSovrapposizioneContestPct",
    label: "Sovrapposizione spettatori tra più trailer dello stesso torneo",
    unit: "%",
    min: 0,
    max: 70,
    step: 2,
    assumptionNote: "Deduplicazione dei votanti/spettatori che seguono più scuole nella medesima tappa.",
  },
  cQuotaSpettatoriLettoriOperaPct: {
    key: "cQuotaSpettatoriLettoriOperaPct",
    label: "% spettatori Trailer Contest che legge anche l'Opera (> 4 min)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota di votanti del contest che prosegue leggendo capitoli editoriali, sostituendo i semi organici astratti della v1.",
  },
  cTassoDonantiSuVotantiPct: {
    key: "cTassoDonantiSuVotantiPct",
    label: "% votanti che effettua 'Vota Donando'",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Quota di votanti che associa una micro-donazione al proprio voto (default 12%).",
  },
  cDonazioneMediaVotoEur: {
    key: "cDonazioneMediaVotoEur",
    label: "Donazione media per donante ('Vota Donando')",
    unit: "€",
    min: 0,
    max: 50,
    step: 0.5,
    assumptionNote: "Importo medio versato da chi vota donando (default €4).",
  },
  cTassoSbloccaDonandoReaderPct: {
    key: "cTassoSbloccaDonandoReaderPct",
    label: "% lettori Opera che usa 'Sblocca Donando' (Director's Cut)",
    unit: "%",
    min: 0,
    max: 25,
    step: 0.5,
    assumptionNote: "Alternativa ai 3 inviti sul Reader per sbloccare i contenuti extra donando.",
  },
  cImportoSbloccaDonandoEur: {
    key: "cImportoSbloccaDonandoEur",
    label: "Importo donazione sblocco Director's Cut (default €2)",
    unit: "€",
    min: 0,
    max: 20,
    step: 0.5,
    assumptionNote: "Micro-donazione proposta nel modulo Director's Cut del sito (€2).",
  },
  cCostoGatewayPct: {
    key: "cCostoGatewayPct",
    label: "Costi transazione gateway pagamenti (%)",
    unit: "%",
    min: 0,
    max: 10,
    step: 0.5,
    assumptionNote: "Commissioni Stripe/carte detratte dal lordo donato.",
  },
  cFeeGestioneStartupDonazioniPct: {
    key: "cFeeGestioneStartupDonazioniPct",
    label: "Fee di gestione Startup su Vota Donando (0% – 80%)",
    unit: "%",
    min: 0,
    max: 80,
    step: 1,
    assumptionNote: "Quota trattenuta dalla Startup (default 0% per etica; il restante 100% viene ripartito tra gli stakeholder sotto).",
  },
  cQuotaDonazioniCommunityPct: {
    key: "cQuotaDonazioniCommunityPct",
    label: "% fondo donazioni attribuito a Community Danza (borse/scuole)",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota destinata a borse di studio, scuole e compagnie (default 80%).",
  },
  cQuotaDonazioniFondazioniPct: {
    key: "cQuotaDonazioniFondazioniPct",
    label: "% fondo donazioni attribuito a Fondazioni / Progetti Territoriali",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota destinata a co-finanziare progetti civici/locali di Fondazioni o Comuni (default 20%).",
  },
  cQuotaDonazioniAziendeEsgPct: {
    key: "cQuotaDonazioniAziendeEsgPct",
    label: "% fondo donazioni attribuito a cause ESG Aziende Sponsor",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota associata a iniziative cause-marketing patrocinate da brand (default 0%, normalizzata sul 100% netto).",
  },
  cValoreBorsaEur: {
    key: "cValoreBorsaEur",
    label: "Valore unitario singola borsa di studio / premio",
    unit: "€",
    min: 100,
    max: 5000,
    step: 100,
    assumptionNote: "Parametro per stimare il numero di borse equivalenti finanziate.",
  },
  cRitenzioneSerialePct: {
    key: "cRitenzioneSerialePct",
    label: "Ritenzione seriale tra tappe contest (3.2)",
    unit: "%",
    min: 0,
    max: 100,
    step: 2,
    assumptionNote: "Percentuale di utenti che segue con continuità la stagione seriale.",
  },
  cCostoVariabilePerPartecipanteEur: {
    key: "cCostoVariabilePerPartecipanteEur",
    label: "Costo variabile Startup per Scuola/Compagnia in gara",
    unit: "€",
    min: 0,
    max: 500,
    step: 5,
    assumptionNote: "Moderazione trailer, hosting video, supporto operativo e verifiche anti-frode voto per partecipante.",
    biasNote: "Colma l'assenza dei costi variabili dei contest trailer nella v1.",
  },
  cCostoFissoPerTappaGiuriaEur: {
    key: "cCostoFissoPerTappaGiuriaEur",
    label: "Costo organizzativo e giuria giornalisti per tappa",
    unit: "€",
    min: 0,
    max: 5000,
    step: 100,
    assumptionNote: "Coordinamento giurie giornalistiche e comunicazione per ciascuna edizione/tappa.",
  },
  cReturningMau: {
    key: "cReturningMau",
    label: "Returning MAU portale Bandi & Audizioni (4.3)",
    unit: "n",
    min: 0,
    max: 30000,
    step: 250,
    assumptionNote: "Professionisti unici di ritorno ogni mese (nicchia Italia: 1.500-3.500).",
  },
  cVisiteAnnuePerMau: {
    key: "cVisiteAnnuePerMau",
    label: "Sessioni call qualificate all'anno per MAU",
    unit: "x",
    min: 0,
    max: 24,
    step: 0.2,
    assumptionNote: "Numero medio annuo di consultazioni bandi per utente attivo.",
  },
  cCtrCallPct: {
    key: "cCtrCallPct",
    label: "Click-through su bandi e audizioni (4.3)",
    unit: "%",
    min: 0,
    max: 60,
    step: 1,
    assumptionNote: "Tasso di candidatura o click qualificato verso residenze e casting.",
  },
  cFeaturedCalls24m: {
    key: "cFeaturedCalls24m",
    label: "Call / Audizioni B2B in evidenza (24M)",
    unit: "n",
    min: 0,
    max: 200,
    step: 2,
    assumptionNote: "Bandi pubblicati a pagamento da teatri e residenze (accesso gratuito ai danzatori).",
  },
  cFeaturedCallPrezzoEur: {
    key: "cFeaturedCallPrezzoEur",
    label: "Prezzo unitario Featured Call B2B",
    unit: "€",
    min: 0,
    max: 2000,
    step: 50,
    assumptionNote: "Fee per scheda video residenza ed evidenza WhatsApp.",
  },
  cCostiCuratelaBandi24m: {
    key: "cCostiCuratelaBandi24m",
    label: "Costi operativi curatela bandi & community (24M)",
    unit: "€",
    min: 0,
    max: 120000,
    step: 2000,
    assumptionNote: "Lavoro redazionale di selezione e verifica bandi/casting nei 24 mesi.",
  },
  cArchiveLicenzeY1: {
    key: "cArchiveLicenzeY1",
    label: "Licenze B2B Living Archive attivate in Anno 1 (4.1)",
    unit: "n",
    min: 0,
    max: 100,
    step: 1,
    assumptionNote: "Atenei, DAMS, Conservatori e Biblioteche abbonate in Anno 1.",
  },
  cArchiveNuoveY2: {
    key: "cArchiveNuoveY2",
    label: "Nuove licenze Living Archive in Anno 2",
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
    assumptionNote: "Quota licenze Anno 1 rinnovate in Anno 2.",
  },
  cArchivePrezzoAnnuoEur: {
    key: "cArchivePrezzoAnnuoEur",
    label: "Canone annuo licenza Living Archive (4.1)",
    unit: "€",
    min: 0,
    max: 6000,
    step: 100,
    assumptionNote: "Calibrabile sui reali budget biblioteche/atenei (€1.200–€1.800).",
  },
  cArchiveCogsPct: {
    key: "cArchiveCogsPct",
    label: "COGS aggiornamento trimestrale archivio (%)",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Costo variabile di catalogazione e manutenzione schede.",
  },

  // S5 Tecnologia & White-Label
  tCommesseSottosoglia24m: {
    key: "tCommesseSottosoglia24m",
    label: "Commesse White-Label Sprint / Sottosoglia (24M)",
    unit: "n",
    min: 0,
    max: 20,
    step: 1,
    assumptionNote: "Edizioni replicate per musei e fondazioni in affidamento diretto.",
  },
  tPrezzoSottosogliaEur: {
    key: "tPrezzoSottosogliaEur",
    label: "Prezzo unitario White-Label Sprint",
    unit: "€",
    min: 0,
    max: 60000,
    step: 1000,
    assumptionNote: "Fascia entry su template modulare.",
  },
  tCommesseEnterprise24m: {
    key: "tCommesseEnterprise24m",
    label: "Commesse White-Label Enterprise (24M)",
    unit: "n",
    min: 0,
    max: 15,
    step: 1,
    assumptionNote: "Edizioni complete a 13 moduli e design dedicato.",
  },
  tPrezzoEnterpriseEur: {
    key: "tPrezzoEnterpriseEur",
    label: "Prezzo unitario White-Label Enterprise",
    unit: "€",
    min: 0,
    max: 120000,
    step: 1000,
    assumptionNote: "Listino enterprise editabile (default €45.000).",
  },
  tRinnovoSaasY2Pct: {
    key: "tRinnovoSaasY2Pct",
    label: "% commesse Y1 che attiva canone SaaS annuale in Y2",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Lega logicamente il canone SaaS alle commesse effettivamente consegnate in Anno 1 (evita canoni con 0 commesse).",
  },
  tCanoneSaasAnnuoEur: {
    key: "tCanoneSaasAnnuoEur",
    label: "Canone annuo SaaS / Analytics / Hosting",
    unit: "€",
    min: 0,
    max: 15000,
    step: 300,
    assumptionNote: "Manutenzione, hosting e dashboard Zero-Party Data dal secondo anno.",
  },
  tCogsSaasPct: {
    key: "tCogsSaasPct",
    label: "COGS hosting & supporto SaaS (% su canone)",
    unit: "%",
    min: 0,
    max: 50,
    step: 1,
    assumptionNote: "Costo infrastruttura cloud e assistenza tecnica (sostituisce la costante 15%).",
  },
  tCostoMarginaleProduzionePct: {
    key: "tCostoMarginaleProduzionePct",
    label: "Costo marginale consegna incl. PM & Account (%)",
    unit: "%",
    min: 10,
    max: 85,
    step: 1,
    assumptionNote: "Costo reale personalizzazione inclusivo di PM e Account.",
  },
  tQuotaLeadPlgBadgePct: {
    key: "tQuotaLeadPlgBadgePct",
    label: "% pipeline futura generata da badge 'Powered by'",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    assumptionNote: "Quota di nuove richieste inbound generate dal footer tecnologico (5.6).",
  },
  tCapexAlternativoClienteEur: {
    key: "tCapexAlternativoClienteEur",
    label: "Costo alternativo sviluppo agenzia/CMS evitato dal cliente",
    unit: "€",
    min: 0,
    max: 180000,
    step: 2500,
    assumptionNote: "Benchmark realistico mercato italiano (€35k–€50k).",
  },
  tSettimaneConsegna: {
    key: "tSettimaneConsegna",
    label: "Time-to-market edizione White-Label (settimane)",
    unit: "sett",
    min: 2,
    max: 24,
    step: 1,
    assumptionNote: "Tempi medi di pubblicazione dal brief.",
  },
  tSettimaneCustomExNovo: {
    key: "tSettimaneCustomExNovo",
    label: "Time-to-market sviluppo ex novo (settimane)",
    unit: "sett",
    min: 8,
    max: 52,
    step: 2,
    assumptionNote: "Tempi stimati con sviluppo software tradizionale da zero.",
  },
};

export const PRESETS: Record<PresetId, { label: string; badge: string; description: string; inputs: SimulatorInputs }> = {
  realistico: {
    label: "Default Revisionato v2 (Italia)",
    badge: "Consigliato",
    description:
      "Integra Contest Trailer (Compagnie+Scuole×Studenti), Vota Donando (80% Community / 20% Fondazioni / 0% fee), 3 Basi Aziende + CLV (€500 B2C / €2.500 B2B), DSO duale e zero doppi conteggi.",
    inputs: {
      sovrapposizioneCanaliPct: 20,
      kViralitaOpera: 0.25,
      decadimentoViralePct: 50,
      cpmCulturaleEur: 90,
      dedupUtentiSuSessioniPct: 85,
      quotaRicaviAnno1Pct: 32,
      quotaCapexAnno1Pct: 75,
      quotaOpexFissiAnno1Pct: 48,
      dsoGiorniIncassoB2G: 90,
      dsoGiorniIncassoB2B: 45,
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
      fLicenzeMediePerEnte: 450,
      fContattiCanaliLocaliPerEnte: 3500,
      fRedemptionEntiPct: 12,
      fLetturaProfondaEntiPct: 45,
      fScuoleDanzaPerEnte: 4.5,
      fClassiGruppiPerScuola: 3.2,
      fCompletamentoDidatticoPct: 58,
      fCapexEvitatoPerEnteEur: 28000,
      tAccessiGratuitiTerritorio: 24000,
      tTurismoLetturaProfondaPct: 25,
      tEstensioneSoggiornoPct: 12,
      tGiorniExtraMedi: 1.4,
      tSpesaGiornalieraTerritorioEur: 85,
      tAccessiBookingStartup: 18000,
      tConvBookingPct: 10,
      tScontrinoMedioServizioEur: 95,
      tCommissioneStartupPct: 15,
      tCogsGestioneBookingPct: 12,

      aCultContratti24m: 5,
      aCultPrezzoEur: 18000,
      aCogsCultPct: 30,
      aTechContratti24m: 5,
      aTechTicketLordoEur: 15000,
      aTechBarterPct: 20,
      aCogsTechLordoPct: 38,
      aSponsorTrailerAutonomi: 0,
      aPrezzoSponsorTrailerEur: 0,
      aCrmProprioPerAzienda: 20000,
      aQuotaScambioCrossSponsorPct: 40,
      aDbProprioStartupPerAzienda: 20000,
      aQuotaAudienceOperaEspostaPct: 35,
      aRedemptionCrmProprioPct: 6,
      aClickLoyaltyCrisisPct: 25,
      aConvRetentionLoyaltyPct: 10,
      aQuotaClvSalvataRetentionPct: 35,
      aAperturaNuoviContattiStartupPct: 8,
      aTassoLeadSuLettoriNuoviPct: 3.0,
      aTassoChiusuraVenditaB2cPct: 12,
      aTassoChiusuraVenditaB2bPct: 14,
      aClvB2cEur: 500,
      aClvB2bTechEur: 2500,
      aCplComparabileMercatoEur: 90,
      aSurveyCompletionPct: 24,
      aGdprOptInPct: 32,
      aValoreRicercaEvitataBrandEur: 6000,

      iSpeciali24m: 3,
      iReachPropriaIstituzione: 240000,
      iReachStartupIncrementale: 80000,
      iCostoProdEvitatoEnteEur: 18000,
      iCostoDirettoStartupSpecialeEur: 4800,
      iQuotaDbVersoTurismoPct: 4,
      iQuotaDbVersoContestPct: 6,
      iMoltiplicatoreAutorevolezzaPct: 40,
      iContattiB2BOriginePerSpeciale: 10,
      iConvPipelineIstituzioniPct: 25,
      iValoreMedioDealPipelineEur: 14000,
      iAperturaContenutoPct: 22,
      iLetturaProfondaSuAperturaPct: 35,
      iClickEventoImportantePct: 25,
      iConvMicroObiettivoIstituzionePct: 8,
      iValoreMicroObiettivoIstituzioneEur: 30,
      iMacroProgettiFinanziatiCount: 0,
      iValoreMacroProgettoEur: 100000,
      iCopieStampaEsposte: 120000,
      iQrScanPct: 2.0,
      iStampaLetturaProfondaPct: 50,
      iCostoPonteStampaStartupEur: 6000,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 22,
      iRispostaIstituzionalePct: 30,

      cTappe24m: 8,
      cCompagnieContest: 25,
      cScuoleContest: 60,
      cStudentiPerCompagnia: 12,
      cStudentiPerScuola: 35,
      cPrezzoIscrizioneCompagniaEur: 120,
      cPrezzoIscrizioneScuolaEur: 120,
      cLicenzeMediePerPartecipante: 6,
      cPrezzoLicenzaConcorsoEur: 35,
      cInvitiMediPerStudente: 8,
      cConvInvitiContestPct: 30,
      cSovrapposizioneContestPct: 20,
      cQuotaSpettatoriLettoriOperaPct: 45,
      cTassoDonantiSuVotantiPct: 12,
      cDonazioneMediaVotoEur: 4,
      cTassoSbloccaDonandoReaderPct: 2.5,
      cImportoSbloccaDonandoEur: 2,
      cCostoGatewayPct: 2.5,
      cFeeGestioneStartupDonazioniPct: 0,
      cQuotaDonazioniCommunityPct: 80,
      cQuotaDonazioniFondazioniPct: 20,
      cQuotaDonazioniAziendeEsgPct: 0,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 55,
      cCostoVariabilePerPartecipanteEur: 65,
      cCostoFissoPerTappaGiuriaEur: 600,
      cReturningMau: 2800,
      cVisiteAnnuePerMau: 2.4,
      cCtrCallPct: 15,
      cFeaturedCalls24m: 24,
      cFeaturedCallPrezzoEur: 300,
      cCostiCuratelaBandi24m: 18000,
      cArchiveLicenzeY1: 10,
      cArchiveNuoveY2: 14,
      cArchiveRinnovoPct: 80,
      cArchivePrezzoAnnuoEur: 1600,
      cArchiveCogsPct: 10,

      tCommesseSottosoglia24m: 3,
      tPrezzoSottosogliaEur: 24000,
      tCommesseEnterprise24m: 1,
      tPrezzoEnterpriseEur: 45000,
      tRinnovoSaasY2Pct: 100,
      tCanoneSaasAnnuoEur: 3600,
      tCogsSaasPct: 15,
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
    description:
      "Mappa i parametri pubblicati sul sito (K=1,35, 14% QR, 30% barter su €360k, 80×€3k archive, €0 commissioni turismo, 0 contest a pagamento) per confronto diretto.",
    inputs: {
      sovrapposizioneCanaliPct: 15,
      kViralitaOpera: 1.35,
      decadimentoViralePct: 45,
      cpmCulturaleEur: 1200,
      dedupUtentiSuSessioniPct: 87.5,
      quotaRicaviAnno1Pct: 35,
      quotaCapexAnno1Pct: 75,
      quotaOpexFissiAnno1Pct: 48,
      dsoGiorniIncassoB2G: 0,
      dsoGiorniIncassoB2B: 0,
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
      fLicenzeMediePerEnte: 750,
      fContattiCanaliLocaliPerEnte: 3750,
      fRedemptionEntiPct: 27,
      fLetturaProfondaEntiPct: 50,
      fScuoleDanzaPerEnte: 8.0,
      fClassiGruppiPerScuola: 3.44,
      fCompletamentoDidatticoPct: 72,
      fCapexEvitatoPerEnteEur: 40000,
      tAccessiGratuitiTerritorio: 48000,
      tTurismoLetturaProfondaPct: 30,
      tEstensioneSoggiornoPct: 22,
      tGiorniExtraMedi: 1.0,
      tSpesaGiornalieraTerritorioEur: 32,
      tAccessiBookingStartup: 48000,
      tConvBookingPct: 22,
      tScontrinoMedioServizioEur: 32,
      tCommissioneStartupPct: 0,
      tCogsGestioneBookingPct: 12,

      aCultContratti24m: 10,
      aCultPrezzoEur: 24000,
      aCogsCultPct: 28,
      aTechContratti24m: 12,
      aTechTicketLordoEur: 30000,
      aTechBarterPct: 30,
      aCogsTechLordoPct: 35,
      aSponsorTrailerAutonomi: 0,
      aPrezzoSponsorTrailerEur: 0,
      aCrmProprioPerAzienda: 16000,
      aQuotaScambioCrossSponsorPct: 0,
      aDbProprioStartupPerAzienda: 0,
      aQuotaAudienceOperaEspostaPct: 20,
      aRedemptionCrmProprioPct: 27,
      aClickLoyaltyCrisisPct: 0,
      aConvRetentionLoyaltyPct: 0,
      aQuotaClvSalvataRetentionPct: 0,
      aAperturaNuoviContattiStartupPct: 0,
      aTassoLeadSuLettoriNuoviPct: 1.8,
      aTassoChiusuraVenditaB2cPct: 0,
      aTassoChiusuraVenditaB2bPct: 15,
      aClvB2cEur: 500,
      aClvB2bTechEur: 2500,
      aCplComparabileMercatoEur: 250,
      aSurveyCompletionPct: 58,
      aGdprOptInPct: 46,
      aValoreRicercaEvitataBrandEur: 10000,

      iSpeciali24m: 2,
      iReachPropriaIstituzione: 700000,
      iReachStartupIncrementale: 0,
      iCostoProdEvitatoEnteEur: 35000,
      iCostoDirettoStartupSpecialeEur: 5000,
      iQuotaDbVersoTurismoPct: 0,
      iQuotaDbVersoContestPct: 0,
      iMoltiplicatoreAutorevolezzaPct: 50,
      iContattiB2BOriginePerSpeciale: 22,
      iConvPipelineIstituzioniPct: 27,
      iValoreMedioDealPipelineEur: 15000,
      iAperturaContenutoPct: 18,
      iLetturaProfondaSuAperturaPct: 45,
      iClickEventoImportantePct: 0,
      iConvMicroObiettivoIstituzionePct: 0,
      iValoreMicroObiettivoIstituzioneEur: 0,
      iMacroProgettiFinanziatiCount: 0,
      iValoreMacroProgettoEur: 0,
      iCopieStampaEsposte: 180000,
      iQrScanPct: 14,
      iStampaLetturaProfondaPct: 55,
      iCostoPonteStampaStartupEur: 5000,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 85,
      iRispostaIstituzionalePct: 60,

      cTappe24m: 12,
      cCompagnieContest: 30,
      cScuoleContest: 90,
      cStudentiPerCompagnia: 14,
      cStudentiPerScuola: 40,
      cPrezzoIscrizioneCompagniaEur: 0,
      cPrezzoIscrizioneScuolaEur: 0,
      cLicenzeMediePerPartecipante: 0,
      cPrezzoLicenzaConcorsoEur: 0,
      cInvitiMediPerStudente: 15,
      cConvInvitiContestPct: 80,
      cSovrapposizioneContestPct: 15,
      cQuotaSpettatoriLettoriOperaPct: 30,
      cTassoDonantiSuVotantiPct: 100,
      cDonazioneMediaVotoEur: 1,
      cTassoSbloccaDonandoReaderPct: 0,
      cImportoSbloccaDonandoEur: 2,
      cCostoGatewayPct: 0,
      cFeeGestioneStartupDonazioniPct: 0,
      cQuotaDonazioniCommunityPct: 100,
      cQuotaDonazioniFondazioniPct: 0,
      cQuotaDonazioniAziendeEsgPct: 0,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 64,
      cCostoVariabilePerPartecipanteEur: 0,
      cCostoFissoPerTappaGiuriaEur: 1500,
      cReturningMau: 9500,
      cVisiteAnnuePerMau: 3.6,
      cCtrCallPct: 18,
      cFeaturedCalls24m: 0,
      cFeaturedCallPrezzoEur: 0,
      cCostiCuratelaBandi24m: 18000,
      cArchiveLicenzeY1: 20,
      cArchiveNuoveY2: 63,
      cArchiveRinnovoPct: 85,
      cArchivePrezzoAnnuoEur: 3000,
      cArchiveCogsPct: 10,

      tCommesseSottosoglia24m: 8,
      tPrezzoSottosogliaEur: 22500,
      tCommesseEnterprise24m: 0,
      tPrezzoEnterpriseEur: 45000,
      tRinnovoSaasY2Pct: 0,
      tCanoneSaasAnnuoEur: 0,
      tCogsSaasPct: 15,
      tCostoMarginaleProduzionePct: 38,
      tQuotaLeadPlgBadgePct: 40,
      tCapexAlternativoClienteEur: 95000,
      tSettimaneConsegna: 8,
      tSettimaneCustomExNovo: 32,
    },
  },
  esigenzaAltaPosta: {
    label: "Caso Specifico · Conf. Stampa, 10 Sponsor Pool & 80%",
    badge: "Esempio Custom",
    description:
      "Simula i tuoi esempi reali: 10 sponsor con pool cross-DB (200k) + DB Startup (200k) + CLV €500/€2.500, conferenza stampa €100.000 (K=2), servizi turismo all'80% e contest con 100 partecipanti.",
    inputs: {
      sovrapposizioneCanaliPct: 15,
      kViralitaOpera: 2.0,
      decadimentoViralePct: 55,
      cpmCulturaleEur: 90,
      dedupUtentiSuSessioniPct: 85,
      quotaRicaviAnno1Pct: 35,
      quotaCapexAnno1Pct: 75,
      quotaOpexFissiAnno1Pct: 48,
      dsoGiorniIncassoB2G: 60,
      dsoGiorniIncassoB2B: 30,
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
      fLicenzeMediePerEnte: 500,
      fContattiCanaliLocaliPerEnte: 4000,
      fRedemptionEntiPct: 14,
      fLetturaProfondaEntiPct: 50,
      fScuoleDanzaPerEnte: 5,
      fClassiGruppiPerScuola: 3.0,
      fCompletamentoDidatticoPct: 60,
      fCapexEvitatoPerEnteEur: 28000,
      tAccessiGratuitiTerritorio: 20000,
      tTurismoLetturaProfondaPct: 25,
      tEstensioneSoggiornoPct: 14,
      tGiorniExtraMedi: 1.5,
      tSpesaGiornalieraTerritorioEur: 90,
      tAccessiBookingStartup: 12000,
      tConvBookingPct: 12,
      tScontrinoMedioServizioEur: 75,
      tCommissioneStartupPct: 80,
      tCogsGestioneBookingPct: 15,

      aCultContratti24m: 5,
      aCultPrezzoEur: 20000,
      aCogsCultPct: 30,
      aTechContratti24m: 5,
      aTechTicketLordoEur: 16000,
      aTechBarterPct: 20,
      aCogsTechLordoPct: 38,
      aSponsorTrailerAutonomi: 0,
      aPrezzoSponsorTrailerEur: 0,
      aCrmProprioPerAzienda: 20000,
      aQuotaScambioCrossSponsorPct: 50,
      aDbProprioStartupPerAzienda: 20000,
      aQuotaAudienceOperaEspostaPct: 40,
      aRedemptionCrmProprioPct: 8,
      aClickLoyaltyCrisisPct: 30,
      aConvRetentionLoyaltyPct: 14,
      aQuotaClvSalvataRetentionPct: 40,
      aAperturaNuoviContattiStartupPct: 10,
      aTassoLeadSuLettoriNuoviPct: 3.5,
      aTassoChiusuraVenditaB2cPct: 14,
      aTassoChiusuraVenditaB2bPct: 16,
      aClvB2cEur: 500,
      aClvB2bTechEur: 2500,
      aCplComparabileMercatoEur: 110,
      aSurveyCompletionPct: 28,
      aGdprOptInPct: 35,
      aValoreRicercaEvitataBrandEur: 7000,

      iSpeciali24m: 3,
      iReachPropriaIstituzione: 180000,
      iReachStartupIncrementale: 120000,
      iCostoProdEvitatoEnteEur: 20000,
      iCostoDirettoStartupSpecialeEur: 5000,
      iQuotaDbVersoTurismoPct: 5,
      iQuotaDbVersoContestPct: 8,
      iMoltiplicatoreAutorevolezzaPct: 65,
      iContattiB2BOriginePerSpeciale: 12,
      iConvPipelineIstituzioniPct: 30,
      iValoreMedioDealPipelineEur: 16000,
      iAperturaContenutoPct: 28,
      iLetturaProfondaSuAperturaPct: 40,
      iClickEventoImportantePct: 35,
      iConvMicroObiettivoIstituzionePct: 10,
      iValoreMicroObiettivoIstituzioneEur: 35,
      iMacroProgettiFinanziatiCount: 1,
      iValoreMacroProgettoEur: 100000,
      iCopieStampaEsposte: 100000,
      iQrScanPct: 2.5,
      iStampaLetturaProfondaPct: 55,
      iCostoPonteStampaStartupEur: 6000,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 28,
      iRispostaIstituzionalePct: 35,

      cTappe24m: 10,
      cCompagnieContest: 30,
      cScuoleContest: 70,
      cStudentiPerCompagnia: 14,
      cStudentiPerScuola: 40,
      cPrezzoIscrizioneCompagniaEur: 150,
      cPrezzoIscrizioneScuolaEur: 150,
      cLicenzeMediePerPartecipante: 8,
      cPrezzoLicenzaConcorsoEur: 35,
      cInvitiMediPerStudente: 10,
      cConvInvitiContestPct: 35,
      cSovrapposizioneContestPct: 20,
      cQuotaSpettatoriLettoriOperaPct: 50,
      cTassoDonantiSuVotantiPct: 14,
      cDonazioneMediaVotoEur: 4,
      cTassoSbloccaDonandoReaderPct: 3.0,
      cImportoSbloccaDonandoEur: 2,
      cCostoGatewayPct: 2.5,
      cFeeGestioneStartupDonazioniPct: 0,
      cQuotaDonazioniCommunityPct: 80,
      cQuotaDonazioniFondazioniPct: 20,
      cQuotaDonazioniAziendeEsgPct: 0,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 60,
      cCostoVariabilePerPartecipanteEur: 65,
      cCostoFissoPerTappaGiuriaEur: 650,
      cReturningMau: 3400,
      cVisiteAnnuePerMau: 2.6,
      cCtrCallPct: 16,
      cFeaturedCalls24m: 30,
      cFeaturedCallPrezzoEur: 350,
      cCostiCuratelaBandi24m: 18000,
      cArchiveLicenzeY1: 12,
      cArchiveNuoveY2: 18,
      cArchiveRinnovoPct: 82,
      cArchivePrezzoAnnuoEur: 1800,
      cArchiveCogsPct: 10,

      tCommesseSottosoglia24m: 3,
      tPrezzoSottosogliaEur: 25000,
      tCommesseEnterprise24m: 2,
      tPrezzoEnterpriseEur: 45000,
      tRinnovoSaasY2Pct: 100,
      tCanoneSaasAnnuoEur: 4000,
      tCogsSaasPct: 15,
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
    description: "Adozione prudente, viralità bassa (K=0,10), nessun ricavo iscrizione contest (gratis) e DSO 120 gg per verificare il punto di pareggio.",
    inputs: {
      sovrapposizioneCanaliPct: 25,
      kViralitaOpera: 0.1,
      decadimentoViralePct: 60,
      cpmCulturaleEur: 70,
      dedupUtentiSuSessioniPct: 85,
      quotaRicaviAnno1Pct: 26,
      quotaCapexAnno1Pct: 75,
      quotaOpexFissiAnno1Pct: 48,
      dsoGiorniIncassoB2G: 120,
      dsoGiorniIncassoB2B: 60,
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
      fLicenzeMediePerEnte: 300,
      fContattiCanaliLocaliPerEnte: 2500,
      fRedemptionEntiPct: 10,
      fLetturaProfondaEntiPct: 40,
      fScuoleDanzaPerEnte: 3,
      fClassiGruppiPerScuola: 2.8,
      fCompletamentoDidatticoPct: 48,
      fCapexEvitatoPerEnteEur: 24000,
      tAccessiGratuitiTerritorio: 14000,
      tTurismoLetturaProfondaPct: 20,
      tEstensioneSoggiornoPct: 8,
      tGiorniExtraMedi: 1.2,
      tSpesaGiornalieraTerritorioEur: 75,
      tAccessiBookingStartup: 9000,
      tConvBookingPct: 7,
      tScontrinoMedioServizioEur: 85,
      tCommissioneStartupPct: 10,
      tCogsGestioneBookingPct: 12,

      aCultContratti24m: 3,
      aCultPrezzoEur: 16000,
      aCogsCultPct: 32,
      aTechContratti24m: 3,
      aTechTicketLordoEur: 12000,
      aTechBarterPct: 20,
      aCogsTechLordoPct: 40,
      aSponsorTrailerAutonomi: 0,
      aPrezzoSponsorTrailerEur: 0,
      aCrmProprioPerAzienda: 15000,
      aQuotaScambioCrossSponsorPct: 25,
      aDbProprioStartupPerAzienda: 15000,
      aQuotaAudienceOperaEspostaPct: 25,
      aRedemptionCrmProprioPct: 4,
      aClickLoyaltyCrisisPct: 18,
      aConvRetentionLoyaltyPct: 7,
      aQuotaClvSalvataRetentionPct: 30,
      aAperturaNuoviContattiStartupPct: 6,
      aTassoLeadSuLettoriNuoviPct: 2.2,
      aTassoChiusuraVenditaB2cPct: 10,
      aTassoChiusuraVenditaB2bPct: 12,
      aClvB2cEur: 500,
      aClvB2bTechEur: 2500,
      aCplComparabileMercatoEur: 75,
      aSurveyCompletionPct: 18,
      aGdprOptInPct: 26,
      aValoreRicercaEvitataBrandEur: 5000,

      iSpeciali24m: 2,
      iReachPropriaIstituzione: 140000,
      iReachStartupIncrementale: 40000,
      iCostoProdEvitatoEnteEur: 15000,
      iCostoDirettoStartupSpecialeEur: 4500,
      iQuotaDbVersoTurismoPct: 2.5,
      iQuotaDbVersoContestPct: 4,
      iMoltiplicatoreAutorevolezzaPct: 25,
      iContattiB2BOriginePerSpeciale: 8,
      iConvPipelineIstituzioniPct: 20,
      iValoreMedioDealPipelineEur: 12000,
      iAperturaContenutoPct: 16,
      iLetturaProfondaSuAperturaPct: 30,
      iClickEventoImportantePct: 18,
      iConvMicroObiettivoIstituzionePct: 5,
      iValoreMicroObiettivoIstituzioneEur: 25,
      iMacroProgettiFinanziatiCount: 0,
      iValoreMacroProgettoEur: 100000,
      iCopieStampaEsposte: 70000,
      iQrScanPct: 1.2,
      iStampaLetturaProfondaPct: 45,
      iCostoPonteStampaStartupEur: 4500,
      iCicliInchiesta: 2,
      iRipreseStampaPerCiclo: 14,
      iRispostaIstituzionalePct: 20,

      cTappe24m: 6,
      cCompagnieContest: 15,
      cScuoleContest: 35,
      cStudentiPerCompagnia: 10,
      cStudentiPerScuola: 28,
      cPrezzoIscrizioneCompagniaEur: 0,
      cPrezzoIscrizioneScuolaEur: 0,
      cLicenzeMediePerPartecipante: 4,
      cPrezzoLicenzaConcorsoEur: 30,
      cInvitiMediPerStudente: 6,
      cConvInvitiContestPct: 25,
      cSovrapposizioneContestPct: 25,
      cQuotaSpettatoriLettoriOperaPct: 35,
      cTassoDonantiSuVotantiPct: 8,
      cDonazioneMediaVotoEur: 3,
      cTassoSbloccaDonandoReaderPct: 1.5,
      cImportoSbloccaDonandoEur: 2,
      cCostoGatewayPct: 2.5,
      cFeeGestioneStartupDonazioniPct: 0,
      cQuotaDonazioniCommunityPct: 80,
      cQuotaDonazioniFondazioniPct: 20,
      cQuotaDonazioniAziendeEsgPct: 0,
      cValoreBorsaEur: 1000,
      cRitenzioneSerialePct: 46,
      cCostoVariabilePerPartecipanteEur: 55,
      cCostoFissoPerTappaGiuriaEur: 500,
      cReturningMau: 1800,
      cVisiteAnnuePerMau: 2.0,
      cCtrCallPct: 12,
      cFeaturedCalls24m: 12,
      cFeaturedCallPrezzoEur: 250,
      cCostiCuratelaBandi24m: 14000,
      cArchiveLicenzeY1: 7,
      cArchiveNuoveY2: 9,
      cArchiveRinnovoPct: 75,
      cArchivePrezzoAnnuoEur: 1400,
      cArchiveCogsPct: 12,

      tCommesseSottosoglia24m: 2,
      tPrezzoSottosogliaEur: 22000,
      tCommesseEnterprise24m: 1,
      tPrezzoEnterpriseEur: 40000,
      tRinnovoSaasY2Pct: 100,
      tCanoneSaasAnnuoEur: 3000,
      tCogsSaasPct: 15,
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
    contestStudentsTot: number;
    contestKFactor: number;
    contestViewersVoters: number;
    primaryReaders: number;
    viralMultiplier: number;
    effectiveKNet: number;
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
    contestDirectRevenue24m: number;
    votaDonandoGross24m: number;
    votaDonandoNetToStakeholders24m: number;
    barterValue24m: number;
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
    raw: {
      fRevB2G: number;
      fContractsTot: number;
      fLicensesIssued: number;
      fLocalReachFromContracts: number;
      fSchoolsTot: number;
      fClassesTot: number;
      fTourismGmv: number;
      fTourismCommStartup: number;
      fTourismNetOperators: number;
      fTourismExtraDays: number;
      fTourismSpillover: number;
      fAvoidedCapex: number;
      fDonationsShare: number;
      aCultCash: number;
      aTechCash: number;
      aTrailerAddonCash: number;
      aBarter: number;
      aTotalCompanies: number;
      aCrmProprioTot: number;
      aCrossPoolContacts: number;
      aStartupDbContacts: number;
      aTotalNewReachForBrands: number;
      aNewBrandReadersFromDbAndOpera: number;
      aLeadsGeneratedFromAudience: number;
      aB2cCustomers: number;
      aB2bCustomers: number;
      aClvValueNewCustomers: number;
      aRetentionClvValue: number;
      aLeadsEquivValue: number;
      aBrandEffectiveCpl: number;
      aDonationsEsgShare: number;
      iReachStartupDedup: number;
      iCpmMediaValue: number;
      iAvoidedProdCost: number;
      iDbTrafficToTourism: number;
      iDbTrafficToContest: number;
      iPipelineValueEstimated: number;
      iImportantClicks: number;
      iMicroConversions: number;
      iEngagementGoalValue: number;
      iPrintQrScans: number;
      cContestParticipants: number;
      cStudentsTot: number;
      cContestK: number;
      cContestVoters: number;
      cContestRegistrationRev: number;
      cContestLicensesCount: number;
      cContestLicensesRev: number;
      cContestDirectCogs: number;
      cVotaDonandoContestGross: number;
      cSbloccaDonandoReaderGross: number;
      cTotalDonationsGross: number;
      cStartupDonationFee: number;
      cDonationsNetPool: number;
      cDonationsCommunityShare: number;
      cScholarshipsFunded: number;
      cCallAppsAnnual: number;
      cFeaturedCallsRev: number;
      cArchiveLicensesY2: number;
      cArchiveExitArr: number;
      cArchiveRev24m: number;
      tProjectsCount: number;
      tSaasEligibleCount: number;
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

  // --- A. MOTORE CORE: CONTEST ONLINE CON TRAILER (3.2) ---
  const cContestParticipants = inp.cCompagnieContest + inp.cScuoleContest;
  const cStudentsTot = inp.cCompagnieContest * inp.cStudentiPerCompagnia + inp.cScuoleContest * inp.cStudentiPerScuola;
  const cContestK = inp.cInvitiMediPerStudente * (inp.cConvInvitiContestPct / 100);
  const cContestVoters = cStudentsTot * cContestK * Math.max(0, 1 - inp.cSovrapposizioneContestPct / 100);
  const cContestReadersIntoOpera = cContestVoters * (inp.cQuotaSpettatoriLettoriOperaPct / 100);

  const cContestRegistrationRev =
    inp.cCompagnieContest * inp.cPrezzoIscrizioneCompagniaEur + inp.cScuoleContest * inp.cPrezzoIscrizioneScuolaEur;
  const cContestLicensesCount = cContestParticipants * inp.cLicenzeMediePerPartecipante;
  const cContestLicensesRev = cContestLicensesCount * inp.cPrezzoLicenzaConcorsoEur;
  const cContestDirectCogs =
    cContestParticipants * inp.cCostoVariabilePerPartecipanteEur + inp.cTappe24m * inp.cCostoFissoPerTappaGiuriaEur;

  // --- 1. FONDAZIONI ED ENTI (Contratti -> Licenze, Comuni, Scuole di Danza & Turismo) ---
  const fContractsTot = inp.f1Contratti24m + inp.f2Contratti24m + inp.f3Contratti24m;
  const fRevB2G = inp.f1Contratti24m * inp.f1PrezzoEur + inp.f2Contratti24m * inp.f2PrezzoEur + inp.f3Contratti24m * inp.f3PrezzoEur;
  const fAcv = fContractsTot > 0 ? fRevB2G / fContractsTot : 0;
  const fCogsB2G = fRevB2G * (inp.fCogsPct / 100);

  // Origine trasparente: solo gli enti contrattualizzati distribuiscono licenze & promuovono scuole di danza locali
  const fLicensesIssued = fContractsTot * inp.fLicenzeMediePerEnte;
  const fLocalReachFromContracts = fContractsTot * (inp.fLicenzeMediePerEnte + inp.fContattiCanaliLocaliPerEnte);
  const fDbRedemptions = fLocalReachFromContracts * (inp.fRedemptionEntiPct / 100);
  const fDbDeepReaders = fDbRedemptions * (inp.fLetturaProfondaEntiPct / 100);
  const fSchoolsTot = Math.round(fContractsTot * inp.fScuoleDanzaPerEnte);
  const fClassesTot = Math.round(fSchoolsTot * inp.fClassiGruppiPerScuola);
  const fAvoidedCapex = fContractsTot * inp.fCapexEvitatoPerEnteEur;

  // 4.4 Turismo Dual-Flow
  const fTourismExtraDays = inp.tAccessiGratuitiTerritorio * (inp.tEstensioneSoggiornoPct / 100) * inp.tGiorniExtraMedi;
  const fTourismSpillover = fTourismExtraDays * inp.tSpesaGiornalieraTerritorioEur;
  const fTourismBookingsCount = inp.tAccessiBookingStartup * (inp.tConvBookingPct / 100);
  const fTourismGmv = fTourismBookingsCount * inp.tScontrinoMedioServizioEur;
  const fTourismCommStartup = fTourismGmv * (inp.tCommissioneStartupPct / 100);
  const fTourismNetOperators = fTourismGmv - fTourismCommStartup;
  const fTourismCogsStartup = fTourismCommStartup * (inp.tCogsGestioneBookingPct / 100);
  const fTourismDeepReaders = inp.tAccessiGratuitiTerritorio * (inp.tTurismoLetturaProfondaPct / 100);

  // --- 3. ISTITUZIONI CULTURALI E MEDIA (Doppia Diffusione + Engagement + Stampa/Inchieste) ---
  const iReachStartupDedup = inp.iReachStartupIncrementale * overlapFactor;
  const iCpmMediaValue = (iReachStartupDedup / 1000) * inp.cpmCulturaleEur;
  const iAvoidedProdCost = inp.iSpeciali24m * inp.iCostoProdEvitatoEnteEur;
  const iStartupProdCost = inp.iSpeciali24m * inp.iCostoDirettoStartupSpecialeEur + inp.iCostoPonteStampaStartupEur;

  // Traffico qualificato generato dal DB Istituzione verso i flussi reali (no doppio conteggio licenze!)
  const iDbTrafficToTourism = inp.iReachPropriaIstituzione * (inp.iQuotaDbVersoTurismoPct / 100);
  const iDbTrafficToContest = inp.iReachPropriaIstituzione * (inp.iQuotaDbVersoContestPct / 100);

  const iTotalReachCombined = inp.iReachPropriaIstituzione + iReachStartupDedup;
  const iOpenedReaders = iTotalReachCombined * (inp.iAperturaContenutoPct / 100);
  const iDeepReaders = iOpenedReaders * (inp.iLetturaProfondaSuAperturaPct / 100);
  const iImportantClicks = iOpenedReaders * (inp.iClickEventoImportantePct / 100);
  const iMicroConversions = iImportantClicks * (inp.iConvMicroObiettivoIstituzionePct / 100);
  const iEngagementGoalValue =
    iMicroConversions * inp.iValoreMicroObiettivoIstituzioneEur + inp.iMacroProgettiFinanziatiCount * inp.iValoreMacroProgettoEur;

  const iPipelineContacts = inp.iSpeciali24m * inp.iContattiB2BOriginePerSpeciale;
  const iPipelineDealsBase = iPipelineContacts * (inp.iConvPipelineIstituzioniPct / 100);
  const iPipelineDealsWithHalo = iPipelineDealsBase * (1 + inp.iMoltiplicatoreAutorevolezzaPct / 100);
  const iPipelineValueEstimated = iPipelineDealsWithHalo * inp.iValoreMedioDealPipelineEur;

  const iPrintQrScans = inp.iCopieStampaEsposte * (inp.iQrScanPct / 100);
  const iPrintDeepReaders = iPrintQrScans * (inp.iStampaLetturaProfondaPct / 100);
  const iPressClippingsTot = inp.iCicliInchiesta * inp.iRipreseStampaPerCiclo;

  // --- B. AUDIENCE COMPLESSIVA & VIRALITA' OPERA (Prima del calcolo Aziende & Vota Donando Reader) ---
  const primaryOperaReaders =
    fDbDeepReaders +
    iDeepReaders +
    iPrintDeepReaders +
    fTourismDeepReaders +
    cContestReadersIntoOpera;

  const decay = Math.max(0, 1 - inp.decadimentoViralePct / 100);
  const w1 = inp.kViralitaOpera;
  const w2 = w1 * (inp.kViralitaOpera * decay);
  const w3 = w2 * (inp.kViralitaOpera * decay * decay);
  const effectiveKNet = w1 + w2 + w3;
  const viralMultiplier = 1 + effectiveKNet;
  const viralOperaReaders = primaryOperaReaders * viralMultiplier;

  // --- 2. AZIENDE E BRAND (3 Basi Dati Esplicite + Trailer + CLV €500 / €2.500) ---
  const aTotalCompanies = inp.aCultContratti24m + inp.aTechContratti24m;
  const aCultCash = inp.aCultContratti24m * inp.aCultPrezzoEur;
  const aCogsCult = aCultCash * (inp.aCogsCultPct / 100);
  const aTechGross = inp.aTechContratti24m * inp.aTechTicketLordoEur;
  const aBarter = aTechGross * (inp.aTechBarterPct / 100);
  const aTechCash = aTechGross - aBarter;
  const aTechGrossCogs = aTechGross * (inp.aCogsTechLordoPct / 100);
  const aTechCashCogs = Math.max(0, aTechGrossCogs - aBarter);
  const aTrailerAddonCash = inp.aSponsorTrailerAutonomi * inp.aPrezzoSponsorTrailerEur;

  // Base 1: CRM Proprio delle Aziende (Retention / Brand Loyalty / Crisis Management)
  const aCrmProprioTot = aTotalCompanies * inp.aCrmProprioPerAzienda;
  const aCrmProprioReaders = aCrmProprioTot * (inp.aRedemptionCrmProprioPct / 100);
  const aBrandEventsRead = aCrmProprioReaders * (inp.aClickLoyaltyCrisisPct / 100);
  const aRetentionCustomers = aBrandEventsRead * (inp.aConvRetentionLoyaltyPct / 100);
  // Ripartizione pro-quota tra B2C e B2B Tech su CLV conservato
  const b2cCompanyShare = aTotalCompanies > 0 ? inp.aCultContratti24m / aTotalCompanies : 0.5;
  const aBlendedClv = b2cCompanyShare * inp.aClvB2cEur + (1 - b2cCompanyShare) * inp.aClvB2bTechEur;
  const aRetentionClvValue = aRetentionCustomers * aBlendedClv * (inp.aQuotaClvSalvataRetentionPct / 100);

  // Base 2: Pool Cross-Sponsor orchestrato dalla Startup (attivo solo se >= 2 aziende sponsor)
  const aCrossPoolContacts = aTotalCompanies >= 2 ? aCrmProprioTot * (inp.aQuotaScambioCrossSponsorPct / 100) : 0;
  // Base 3: Database Proprietario selezionato/segmentato dalla Startup (default 20k per azienda)
  const aStartupDbContacts = aTotalCompanies * inp.aDbProprioStartupPerAzienda;

  const aTotalNewReachForBrands = aCrossPoolContacts + aStartupDbContacts;
  const aNewReadersFromStartupDbAndPool = aTotalNewReachForBrands * (inp.aAperturaNuoviContattiStartupPct / 100);
  const aExposedOperaAndTrailer = (viralOperaReaders + cContestVoters) * (inp.aQuotaAudienceOperaEspostaPct / 100);
  const aNewBrandReadersFromDbAndOpera = aNewReadersFromStartupDbAndPool + aExposedOperaAndTrailer;

  const aLeadsGeneratedFromAudience = aNewBrandReadersFromDbAndOpera * (inp.aTassoLeadSuLettoriNuoviPct / 100);
  const aLeadsB2c = aLeadsGeneratedFromAudience * b2cCompanyShare;
  const aLeadsB2b = aLeadsGeneratedFromAudience * (1 - b2cCompanyShare);
  const aB2cCustomers = aLeadsB2c * (inp.aTassoChiusuraVenditaB2cPct / 100);
  const aB2bCustomers = aLeadsB2b * (inp.aTassoChiusuraVenditaB2bPct / 100);
  const aClvValueNewCustomers = aB2cCustomers * inp.aClvB2cEur + aB2bCustomers * inp.aClvB2bTechEur;
  const aLeadsEquivValue = aLeadsGeneratedFromAudience * inp.aCplComparabileMercatoEur;
  const aTotalSponsorInvest = aCultCash + aTechGross + aTrailerAddonCash;
  const aBrandEffectiveCpl = aLeadsGeneratedFromAudience > 0 ? aTotalSponsorInvest / aLeadsGeneratedFromAudience : 0;
  const aResearchValue = aTotalCompanies * inp.aValoreRicercaEvitataBrandEur;
  const aStartupCash = aCultCash + aTechCash + aTrailerAddonCash;

  // --- C. TOTAL ACTIVE READERS UNIFICATO (inclusi lettori da CRM & DB Aziende) & ZPD ---
  const totalActiveReaders = viralOperaReaders + aCrmProprioReaders + aNewReadersFromStartupDbAndPool;
  const uniqueUsersRatio = inp.dedupUtentiSuSessioniPct / 100;
  const zeroPartyProfiles = totalActiveReaders * uniqueUsersRatio * (inp.aSurveyCompletionPct / 100) * (inp.aGdprOptInPct / 100);

  const grossReach =
    fLocalReachFromContracts +
    aCrmProprioTot +
    aTotalNewReachForBrands +
    inp.iReachPropriaIstituzione +
    inp.iReachStartupIncrementale +
    inp.iCopieStampaEsposte +
    inp.tAccessiGratuitiTerritorio +
    inp.tAccessiBookingStartup +
    cContestVoters;
  const uniqueReach = grossReach * overlapFactor;

  const directCacEur = totalActiveReaders > 0 ? inp.costiDistribuzioneSeeding24m / totalActiveReaders : 0;
  const fullyLoadedCacEur =
    totalActiveReaders > 0 ? (inp.costiDistribuzioneSeeding24m + inp.costiSalesAbm24m) / totalActiveReaders : 0;

  // --- 4. VOTA DONANDO + SBLOCCA DONANDO + BANDI 4.3 + ARCHIVE 4.1 ---
  const cVotaDonandoContestGross = cContestVoters * (inp.cTassoDonantiSuVotantiPct / 100) * inp.cDonazioneMediaVotoEur;
  const cSbloccaDonandoReaderGross = totalActiveReaders * (inp.cTassoSbloccaDonandoReaderPct / 100) * inp.cImportoSbloccaDonandoEur;
  const cTotalDonationsGross = cVotaDonandoContestGross + cSbloccaDonandoReaderGross;

  const cGatewayFees = cTotalDonationsGross * (inp.cCostoGatewayPct / 100);
  const cStartupDonationFee = cTotalDonationsGross * (inp.cFeeGestioneStartupDonazioniPct / 100);
  const cDonationsNetPool = Math.max(0, cTotalDonationsGross - cGatewayFees - cStartupDonationFee);

  const allocSum = Math.max(1, inp.cQuotaDonazioniCommunityPct + inp.cQuotaDonazioniFondazioniPct + inp.cQuotaDonazioniAziendeEsgPct);
  const cDonationsCommunityShare = cDonationsNetPool * (inp.cQuotaDonazioniCommunityPct / allocSum);
  const fDonationsShare = cDonationsNetPool * (inp.cQuotaDonazioniFondazioniPct / allocSum);
  const aDonationsEsgShare = cDonationsNetPool * (inp.cQuotaDonazioniAziendeEsgPct / allocSum);
  const cScholarshipsFunded = Math.floor(cDonationsCommunityShare / Math.max(1, inp.cValoreBorsaEur));

  const cCallAppsAnnual = inp.cReturningMau * inp.cVisiteAnnuePerMau * (inp.cCtrCallPct / 100);
  const cFeaturedCallsRev = inp.cFeaturedCalls24m * inp.cFeaturedCallPrezzoEur;

  const cArchiveRevY1 = inp.cArchiveLicenzeY1 * inp.cArchivePrezzoAnnuoEur;
  const cArchiveRenewedY2 = Math.round(inp.cArchiveLicenzeY1 * (inp.cArchiveRinnovoPct / 100));
  const cArchiveLicensesY2 = cArchiveRenewedY2 + inp.cArchiveNuoveY2;
  const cArchiveExitArr = cArchiveLicensesY2 * inp.cArchivePrezzoAnnuoEur;
  const cArchiveRev24m = cArchiveRevY1 + cArchiveExitArr;
  const cArchiveCogs = cArchiveRev24m * (inp.cArchiveCogsPct / 100);

  const contestDirectRevenue24m = cContestRegistrationRev + cContestLicensesRev + cStartupDonationFee;
  const cStartupCash = cArchiveRev24m + cFeaturedCallsRev + contestDirectRevenue24m;

  // --- 5. TECNOLOGIA & WHITE-LABEL ---
  const tProjectsCount = inp.tCommesseSottosoglia24m + inp.tCommesseEnterprise24m;
  const tProjRev = inp.tCommesseSottosoglia24m * inp.tPrezzoSottosogliaEur + inp.tCommesseEnterprise24m * inp.tPrezzoEnterpriseEur;
  const tY1ProjectsEstimated = Math.round(tProjectsCount * (inp.quotaRicaviAnno1Pct / 100));
  const tSaasEligibleCount = Math.round(tY1ProjectsEstimated * (inp.tRinnovoSaasY2Pct / 100));
  const tSaasRev = tSaasEligibleCount * inp.tCanoneSaasAnnuoEur;
  const tRev24m = tProjRev + tSaasRev;
  const tProjCogs = tProjRev * (inp.tCostoMarginaleProduzionePct / 100);
  const tSaasCogs = tSaasRev * (inp.tCogsSaasPct / 100);
  const tContribMarginEur = tProjRev - tProjCogs;
  const tContribMarginPct = tProjRev > 0 ? (tContribMarginEur / tProjRev) * 100 : 0;
  const tAvoidedCapexNet = Math.max(0, tProjectsCount * inp.tCapexAlternativoClienteEur - tProjRev);

  // --- 6. P&L CONSOLIDATO STARTUP & DSO DUALE ---
  const fStartupCash = fRevB2G + fTourismCommStartup;
  const totalRevenueCash24m = fStartupCash + aStartupCash + cStartupCash + tRev24m;

  const y1Share = inp.quotaRicaviAnno1Pct / 100;
  const revenueY1Cash = totalRevenueCash24m * y1Share;
  const revenueY2Cash = totalRevenueCash24m - revenueY1Cash;

  const totalCogsCash24m =
    fCogsB2G +
    fTourismCogsStartup +
    aCogsCult +
    aTechCashCogs +
    iStartupProdCost +
    cContestDirectCogs +
    inp.cCostiCuratelaBandi24m +
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

  const capexY1 = inp.capexPiattaforma24m * (inp.quotaCapexAnno1Pct / 100);
  const opexY1 = (fixedAndGtmCosts24m - inp.capexPiattaforma24m) * (inp.quotaOpexFissiAnno1Pct / 100);
  const fixedY1 = capexY1 + opexY1;
  const fixedY2 = fixedAndGtmCosts24m - fixedY1;
  const cogsY1 = totalCogsCash24m * y1Share;
  const cogsY2 = totalCogsCash24m - cogsY1;

  const ebitdaY1 = revenueY1Cash - cogsY1 - fixedY1;
  const ebitdaY2 = revenueY2Cash - cogsY2 - fixedY2;
  const ebitda24m = grossProfitCash24m - fixedAndGtmCosts24m;
  const ebitdaMarginPct = totalRevenueCash24m > 0 ? (ebitda24m / totalRevenueCash24m) * 100 : 0;
  const breakEvenRevenue24m = grossMarginPct > 0 ? fixedAndGtmCosts24m / (grossMarginPct / 100) : 0;

  // DSO Duale: PA/B2G (Fondazioni + Archive Y1 + White-Label Y1) vs B2B Privato (Aziende Y1)
  const b2gY1Volume = fRevB2G * y1Share + cArchiveRevY1 + tProjRev * y1Share;
  const b2bY1Volume = aStartupCash * y1Share;
  const receivablesEndY1FromDso =
    b2gY1Volume * Math.min(1, inp.dsoGiorniIncassoB2G / 365) + b2bY1Volume * Math.min(1, inp.dsoGiorniIncassoB2B / 365);
  const peakCashNeedY1 = Math.max(0, -(ebitdaY1 - receivablesEndY1FromDso));

  const revenueMix = [
    { id: "fondazioni" as StakeholderId, label: "Fondazioni, Comuni & Turismo", value: fStartupCash, color: "#D4C7A6" },
    { id: "aziende" as StakeholderId, label: "Aziende (Sponsor + DB/Trailer)", value: aStartupCash, color: "#A43A46" },
    { id: "istituzioni" as StakeholderId, label: "Istituzioni (Traffico & Halo · €0 fee)", value: 0, color: "#E8E4CF" },
    { id: "community" as StakeholderId, label: "Contest Trailer + Archive 4.1 + Bandi", value: cStartupCash, color: "#8E9B8D" },
    { id: "tecnologia" as StakeholderId, label: "Tecnologia & White-Label", value: tRev24m, color: "#E36F5A" },
  ];

  // --- FORMULE LIVE ESPONIBILI ---
  const fFormulas: FormulaTrace[] = [
    {
      id: "f-b2g",
      label: "Contratti B2B/B2G → Licenze, Scuole di Danza & Comuni",
      formulaSymbolic: "Licenze = Contratti × Licenze_Medie | Scuole_Danza = Contratti × Scuole_Medie",
      formulaLive: `${fContractsTot} enti contrattualizzati (${fEur(fRevB2G)}, ACV ${fEur(fAcv)}) → ${fInt(fLicensesIssued)} licenze distribuite · ${fSchoolsTot} scuole di danza (${fClassesTot} gruppi)`,
      explanation:
        "Fondazioni bancarie/d'impresa e Comuni acquistano pacchetti di licenze (es. 100-500 per Comune) per promuovere spettacoli, contest e scuole di danza sul territorio. Con 0 contratti non si attiva alcun flusso B2G.",
    },
    {
      id: "f-tour-split",
      label: "Turismo 4.4 → Presenze Istituzioni vs Commissioni Startup (0%–80%+)",
      formulaSymbolic: "Istituzioni: Accessi_Grat × Est% × Gg × Spesa | Startup: Accessi_Book × Conv% × € × Comm%",
      formulaLive: `Istituzioni: ${fInt(fTourismExtraDays)} gg presenza (${fEur(fTourismSpillover)} indotto) | Startup: ${fEur(fTourismGmv)} GMV × ${inp.tCommissioneStartupPct}% = ${fEur(fTourismCommStartup)}`,
      explanation:
        "La parte gratuita nei borghi va alle Istituzioni in giornate di presenza; le prenotazioni generate da contenuti Startup pagano la commissione variabile (0%-80%+). Il DB Festival contribuisce fino a " +
        fInt(iDbTrafficToTourism) +
        " ingressi qualificati.",
    },
    {
      id: "f-donazioni",
      label: "Quota 'Vota Donando' destinata a Progetti Territoriali Enti",
      formulaSymbolic: "Fondo_Netto_Donazioni × Quota_Fondazioni%",
      formulaLive: `${fEur(cDonationsNetPool)} netti × ${inp.cQuotaDonazioniFondazioniPct}% (normalizzato) = ${fEur(fDonationsShare)} co-finanziamento civico`,
      explanation:
        "I cittadini e le famiglie che votano donando nei contest comunali co-finanziano progetti culturali/scolastici sostenuti da Comuni o Fondazioni.",
    },
  ];

  const aFormulas: FormulaTrace[] = [
    {
      id: "a-basi",
      label: "Le 3 Basi Dati Sponsor: CRM Proprio + Pool Cross-Sponsor + DB Startup",
      formulaSymbolic: "CRM_Proprio (Retention/Loyalty) | Pool_Cross + DB_Startup + Opera/Trailer (Acquisizione)",
      formulaLive: `CRM Proprio: ${fInt(aCrmProprioTot)} | Pool Cross-Sponsor orchestrato: ${fInt(aCrossPoolContacts)} | DB Proprietario Startup: ${fInt(aStartupDbContacts)} (+ ${fInt(aExposedOperaAndTrailer)} Opera/Trailer)`,
      explanation:
        "Su CRM proprio si misura Loyalty/Crisis; sui contatti nuovi portati da Pool Cross-Sponsor (tra più aziende) e dal DB selezionato dalla Startup (default 20.000/azienda) + Opera/Trailer si calcolano i nuovi Lead e i nuovi Clienti.",
    },
    {
      id: "a-clv-lead",
      label: "Lead Reali da Audience & Valore CLV Duale (€500 B2C / €2.500 B2B Tech)",
      formulaSymbolic: "Lead = Lettori_Nuovi_Esposti × Lead% | Valore_CLV = (Clienti_B2C × CLV_B2C) + (Clienti_B2B × CLV_B2B)",
      formulaLive: `${fInt(aNewBrandReadersFromDbAndOpera)} lettori esposti × ${inp.aTassoLeadSuLettoriNuoviPct}% = ${fInt(aLeadsGeneratedFromAudience)} lead (CPL ${fEur(aBrandEffectiveCpl)}) → ${fDec(aB2cCustomers, 1)} cl. B2C (€${inp.aClvB2cEur}) + ${fDec(aB2bCustomers, 1)} cl. B2B (€${inp.aClvB2bTechEur}) = ${fEur(aClvValueNewCustomers)}`,
      explanation:
        "I lead non sono più un numero fisso da fiera (22): nascono direttamente dai lettori reali del DB Startup, del Pool Cross-Sponsor, dell'Opera e dei Trailer Contest, moltiplicati per il CLV reale B2C e B2B.",
    },
    {
      id: "a-retention",
      label: "Valore Loyalty & Crisis su CRM Proprio Sponsor via CLV",
      formulaSymbolic: "Clienti_CRM_Trattenuti × CLV_Medio × Quota_CLV_Salvata%",
      formulaLive: `${fInt(aBrandEventsRead)} interazioni Loyalty/Crisis → ${fDec(aRetentionCustomers, 1)} clienti trattenuti × ${fEur(aBlendedClv)} × ${inp.aQuotaClvSalvataRetentionPct}% = ${fEur(aRetentionClvValue)}`,
      explanation:
        "Ancora il valore di Brand Loyalty e Crisis Management direttamente al Customer Lifetime Value aziendale invece che a cifre arbitrarie.",
    },
  ];

  const iFormulas: FormulaTrace[] = [
    {
      id: "i-reach",
      label: "DB Istituzione (0 CPM, no doppio conteggio) vs Reach Nuova Startup (€90 CPM)",
      formulaSymbolic: "Reach_Incr × Overlap × CPM | Traffico DB verso 4.4 Turismo & 3.2 Contest",
      formulaLive: `DB Ente: ${fInt(inp.iReachPropriaIstituzione)} (0 CPM; indirizza ${fInt(iDbTrafficToTourism)} a Turismo e ${fInt(iDbTrafficToContest)} a Contest) | Reach Startup: ${fInt(iReachStartupDedup)} × €${inp.cpmCulturaleEur} CPM = ${fEur(iCpmMediaValue)}`,
      explanation:
        "Nessuna licenza duplicata è contata sui contatti del DB Istituzione (le licenze sono già pagate a monte). Il DB genera traffico reale verso gli altri imbuti + Halo Effect.",
    },
    {
      id: "i-halo",
      label: "Autorevolezza Istituzionale (Halo Effect) & Pipeline B2B",
      formulaSymbolic: "Deal_Origine × (1 + Halo%) × Valore_Deal",
      formulaLive: `${iPipelineContacts} contatti × ${inp.iConvPipelineIstituzioniPct}% × (1 + ${inp.iMoltiplicatoreAutorevolezzaPct}%) = ${fDec(iPipelineDealsWithHalo, 1)} deal (${fEur(iPipelineValueEstimated)} pipeline separata)`,
      explanation:
        "Essere legittimati dal DB di una grande Istituzione moltiplica la credibilità della Startup nel coinvolgere altre Istituzioni e partner.",
    },
    {
      id: "i-engage",
      label: "Engagement Obiettivo (Micro Loyalty €30 vs Macro Progetti €100k)",
      formulaSymbolic: "(Click_Importanti × Conv_Micro% × V_Micro) + (Macro_Progetti × V_Macro)",
      formulaLive: `${fInt(iImportantClicks)} click critici → ${fInt(iMicroConversions)} micro-conv. × ${fEur(inp.iValoreMicroObiettivoIstituzioneEur)} + ${inp.iMacroProgettiFinanziatiCount} macro × ${fEur(inp.iValoreMacroProgettoEur)} = ${fEur(iEngagementGoalValue)}`,
      explanation:
        "Evita l'errore di moltiplicare migliaia di click per un ticket alto: distingue micro-loyalty su abbonati e grandi progetti discreti finanziati (es. €100.000 da conferenza stampa).",
    },
  ];

  const cFormulas: FormulaTrace[] = [
    {
      id: "c-contest",
      label: "Motore Contest Online Trailer: Compagnie + Scuole × Studenti × K_contest",
      formulaSymbolic: "K_contest = Inviti × Conv% | Votanti = Studenti × K_contest × (1 − Overlap%)",
      formulaLive: `${cContestParticipants} realtà (${inp.cCompagnieContest} comp. + ${inp.cScuoleContest} scuole) = ${fInt(cStudentsTot)} studenti × K=${fDec(cContestK, 2)} → ${fInt(cContestVoters)} spettatori/votanti trailer`,
      explanation:
        "La viralità e l'audience dei contest derivano dal numero reale di compagnie/scuole di danza, allievi in gara e inviti ad amici/familiari.",
    },
    {
      id: "c-rev",
      label: "3 Monetizzazioni Contest + 'Vota Donando' + Living Archive 4.1",
      formulaSymbolic: "Iscrizioni + Licenze_Concorso + Fee_Donazioni + Archive_24M + Calls",
      formulaLive: `Iscr. ${fEur(cContestRegistrationRev)} + Lic. (${cContestLicensesCount}×€${inp.cPrezzoLicenzaConcorsoEur}) ${fEur(cContestLicensesRev)} + Vota Donando ${fEur(cDonationsCommunityShare)} a Community (${cScholarshipsFunded} borse) | Archive ${fEur(cArchiveRev24m)} (Exit ARR ${fEur(cArchiveExitArr)})`,
      explanation:
        "Esplicita tutte le linee reali di ricavo contest, i costi variabili per partecipante (" +
        fEur(cContestDirectCogs) +
        ") e distingue i fondi etici delle donazioni dalle entrate Startup.",
    },
  ];

  const tFormulas: FormulaTrace[] = [
    {
      id: "t-wl",
      label: "Commesse White-Label + SaaS Collegato a Y1 & Margine Netto",
      formulaSymbolic: "(Sprint×Ps + Ent×Pe) × (1 − CostoMarg%) + (Commesse_Y1 × Rinnovo% × SaaS)",
      formulaLive: `${fEur(tProjRev)} progetti (${tProjectsCount} ed.) × ${100 - inp.tCostoMarginaleProduzionePct}% = ${fEur(tContribMarginEur)} + ${fEur(tSaasRev)} SaaS (${tSaasEligibleCount} attive in Y2)`,
      explanation:
        "Il canone SaaS Anno 2 nasce solo dalle commesse effettivamente consegnate in Anno 1.",
    },
  ];

  const audFormulas: FormulaTrace[] = [
    {
      id: "aud-tot",
      label: "Audience Unificata Omogenea (Contest Trailer + Opera + DB Aziende) & CAC",
      formulaSymbolic: "(Primari_Opera × Molt_K_Opera) + Lettori_CRM_Sponsor + Lettori_DB_Startup",
      formulaLive: `${fInt(primaryOperaReaders)} primari × ${fDec(viralMultiplier, 2)}x + ${fInt(aCrmProprioReaders + aNewReadersFromStartupDbAndPool)} DB aziendali = ${fInt(totalActiveReaders)} lettori → CAC diretto €${fDec(directCacEur, 2)} | Fully-Loaded €${fDec(fullyLoadedCacEur, 2)}`,
      explanation:
        "Tutti i canali usano la definizione omogenea di Lettore Attivo (>4 min). Il CAC è sempre derivato dai costi sostenuti diviso l'audience reale.",
    },
  ];

  const pnlFormulas: FormulaTrace[] = [
    {
      id: "pnl-tot",
      label: "EBITDA 24M & Picco Fabbisogno Cassa Anno 1 (DSO Duale B2G + B2B)",
      formulaSymbolic: "EBITDA = Ricavi_Cash − COGS_Netti − Costi_Fissi | Crediti_DSO = B2G_Y1×(DSO_PA/365) + B2B_Y1×(DSO_B2B/365)",
      formulaLive: `${fEur(totalRevenueCash24m)} − ${fEur(totalCogsCash24m)} − ${fEur(fixedAndGtmCosts24m)} = ${fEur(ebitda24m)} | Crediti Y1: ${fEur(receivablesEndY1FromDso)} → Picco Cassa Y1: ${fEur(peakCashNeedY1)}`,
      explanation:
        "Integra DSO pubblico su Fondazioni/Comuni/Atenei/Musei e DSO privato sulle Aziende per calcolare la reale cassa necessaria in Anno 1.",
    },
  ];

  const stakeholders: SimulationResult["stakeholders"] = {
    fondazioni: {
      id: "fondazioni",
      startupMonetaryEur: fStartupCash,
      startupMonetaryDetail: `${fEur(fRevB2G)} licenze B2B/B2G (${fContractsTot} enti) + ${fEur(fTourismCommStartup)} commissioni turismo (${inp.tCommissioneStartupPct}%)`,
      startupNonMonetary: [
        `${fInt(fLicensesIssued)} licenze distribuite tramite Comuni/Fondazioni (${fInt(fDbDeepReaders)} lettori profondi)`,
        `${fSchoolsTot} scuole di danza e realtà territoriali collegate ai contratti`,
      ],
      stakeholderMonetaryEur: fStakeholderMonetary(fAvoidedCapex, fTourismSpillover, fTourismNetOperators, fDonationsShare),
      stakeholderMonetaryDetail: `${fEur(fAvoidedCapex)} portali/progetti evitati + ${fEur(fTourismSpillover)} indotto presenze + ${fEur(fTourismNetOperators)} netto ricettività + ${fEur(fDonationsShare)} quota Vota Donando`,
      stakeholderNonMonetary: [
        `${fInt(fTourismExtraDays)} giornate presenza extra nei Comuni/borghi`,
        `${fSchoolsTot} scuole di danza (${fClassesTot} gruppi) al ${inp.fCompletamentoDidatticoPct}% completamento`,
      ],
      formulas: fFormulas,
    },
    aziende: {
      id: "aziende",
      startupMonetaryEur: aStartupCash,
      startupMonetaryDetail: `${fEur(aCultCash)} Cultural + ${fEur(aTechCash)} Tech cash (+ ${fEur(aBarter)} barter COGS${aTrailerAddonCash > 0 ? ` + ${fEur(aTrailerAddonCash)} trailer extra` : "; trailer inclusi in licenza"})`,
      startupNonMonetary: [
        `${fInt(zeroPartyProfiles)} profili Zero-Party Data GDPR + pool cross-sponsor ${fInt(aCrossPoolContacts)}`,
        `${fInt(aStartupDbContacts)} contatti DB Startup segmentati per ${aTotalCompanies} aziende`,
      ],
      stakeholderMonetaryEur: aClvValueNewCustomers + aRetentionClvValue + aResearchValue + aDonationsEsgShare,
      stakeholderMonetaryDetail: `${fEur(aClvValueNewCustomers)} nuovi clienti CLV (€${inp.aClvB2cEur}/€${inp.aClvB2bTechEur}) + ${fEur(aRetentionClvValue)} Loyalty/Crisis CLV + ${fEur(aResearchValue)} ricerche (${fEur(aLeadsEquivValue)} valore lead)`,
      stakeholderNonMonetary: [
        `${fInt(aLeadsGeneratedFromAudience)} lead reali generati da audience Startup (CPL effettivo ${fEur(aBrandEffectiveCpl)})`,
        `${fInt(aBrandEventsRead)} interazioni critiche Loyalty/Crisis su CRM proprio + visibilità su ${fInt(cContestVoters)} spettatori trailer`,
      ],
      formulas: aFormulas,
    },
    istituzioni: {
      id: "istituzioni",
      startupMonetaryEur: 0,
      startupMonetaryDetail: `€0 ricavi diretti/duplicati (costo Startup speciale+stampa: ${fEur(iStartupProdCost)}); ${fEur(iPipelineValueEstimated)} pipeline separata`,
      startupNonMonetary: [
        `+${inp.iMoltiplicatoreAutorevolezzaPct}% Halo Effect / autorevolezza per coinvolgere altre Istituzioni`,
        `DB Ente porta ${fInt(iDbTrafficToTourism)} ingressi a Turismo 4.4 e ${fInt(iDbTrafficToContest)} a Contest 3.2`,
      ],
      stakeholderMonetaryEur: iCpmMediaValue + iAvoidedProdCost + iEngagementGoalValue,
      stakeholderMonetaryDetail: `${fEur(iCpmMediaValue)} reach incrementale Startup (${fEur(inp.cpmCulturaleEur)} CPM) + ${fEur(iAvoidedProdCost)} prod. evitati + ${fEur(iEngagementGoalValue)} obiettivi`,
      stakeholderNonMonetary: [
        `${fInt(iImportantClicks)} interazioni importanti ('ha fatto X / non ha fatto Y' — Loyalty/Crisis/Conf. Stampa)`,
        `${fInt(iPressClippingsTot)} riprese stampa (${inp.iRispostaIstituzionalePct}% risposta Pagina Bianca)`,
      ],
      formulas: iFormulas,
    },
    community: {
      id: "community",
      startupMonetaryEur: cStartupCash,
      startupMonetaryDetail: `Contest ${fEur(cContestRegistrationRev)} iscr. + ${fEur(cContestLicensesRev)} lic. + ${fEur(cStartupDonationFee)} fee | Archive 4.1 ${fEur(cArchiveRev24m)} (ARR ${fEur(cArchiveExitArr)}) + Calls ${fEur(cFeaturedCallsRev)}`,
      startupNonMonetary: [
        `${cContestParticipants} compagnie/scuole (${fInt(cStudentsTot)} studenti) → K_contest = ${fDec(cContestK, 2)} (${fInt(cContestVoters)} spettatori)`,
        `${fInt(inp.cReturningMau)} MAU su portale bandi & ${inp.cRitenzioneSerialePct}% ritenzione seriale`,
      ],
      stakeholderMonetaryEur: cDonationsCommunityShare,
      stakeholderMonetaryDetail: `${fEur(cDonationsCommunityShare)} netti da 'Vota Donando' + 'Sblocca €2' (${cScholarshipsFunded} borse/premi da ${fEur(inp.cValoreBorsaEur)})`,
      stakeholderNonMonetary: [
        `${fInt(cContestVoters)} spettatori/votanti mobili su trailer di scuole e compagnie`,
        `${fInt(cCallAppsAnnual)} candidature/anno generate su bandi, residenze e audizioni`,
      ],
      formulas: cFormulas,
    },
    tecnologia: {
      id: "tecnologia",
      startupMonetaryEur: tRev24m,
      startupMonetaryDetail: `${fEur(tProjRev)} progetti (${tProjectsCount} ed.) + ${fEur(tSaasRev)} SaaS Y2 (${tSaasEligibleCount} attive) | Margine ${fDec(tContribMarginPct, 1)}%`,
      startupNonMonetary: [
        `Ammortamento Capex piattaforma L0 (€${fInt(inp.capexPiattaforma24m)})`,
        `~${inp.tQuotaLeadPlgBadgePct}% nuova pipeline inbound da badge 'Powered by'`,
      ],
      stakeholderMonetaryEur: tAvoidedCapexNet,
      stakeholderMonetaryDetail: `Risparmio netto reale di ${fEur(tAvoidedCapexNet)} rispetto a sviluppo CMS/agenzia (${fEur(inp.tCapexAlternativoClienteEur)}/progetto)`,
      stakeholderNonMonetary: [
        `Consegna in ${inp.tSettimaneConsegna} settimane (vs ${inp.tSettimaneCustomExNovo} settimane sviluppo ex novo)`,
        `Piattaforma integrata con quiz Zero-Party Data GDPR e moduli contest`,
      ],
      formulas: tFormulas,
    },
    raw: {
      fRevB2G,
      fContractsTot,
      fLicensesIssued,
      fLocalReachFromContracts,
      fSchoolsTot,
      fClassesTot,
      fTourismGmv,
      fTourismCommStartup,
      fTourismNetOperators,
      fTourismExtraDays,
      fTourismSpillover,
      fAvoidedCapex,
      fDonationsShare,
      aCultCash,
      aTechCash,
      aTrailerAddonCash,
      aBarter,
      aTotalCompanies,
      aCrmProprioTot,
      aCrossPoolContacts,
      aStartupDbContacts,
      aTotalNewReachForBrands,
      aNewBrandReadersFromDbAndOpera,
      aLeadsGeneratedFromAudience,
      aB2cCustomers,
      aB2bCustomers,
      aClvValueNewCustomers,
      aRetentionClvValue,
      aLeadsEquivValue,
      aBrandEffectiveCpl,
      aDonationsEsgShare,
      iReachStartupDedup,
      iCpmMediaValue,
      iAvoidedProdCost,
      iDbTrafficToTourism,
      iDbTrafficToContest,
      iPipelineValueEstimated,
      iImportantClicks,
      iMicroConversions,
      iEngagementGoalValue,
      iPrintQrScans,
      cContestParticipants,
      cStudentsTot,
      cContestK,
      cContestVoters,
      cContestRegistrationRev,
      cContestLicensesCount,
      cContestLicensesRev,
      cContestDirectCogs,
      cVotaDonandoContestGross,
      cSbloccaDonandoReaderGross,
      cTotalDonationsGross,
      cStartupDonationFee,
      cDonationsNetPool,
      cDonationsCommunityShare,
      cScholarshipsFunded,
      cCallAppsAnnual,
      cFeaturedCallsRev,
      cArchiveLicensesY2,
      cArchiveExitArr,
      cArchiveRev24m,
      tProjectsCount,
      tSaasEligibleCount,
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
      contestStudentsTot: cStudentsTot,
      contestKFactor: cContestK,
      contestViewersVoters: cContestVoters,
      primaryReaders: primaryOperaReaders,
      viralMultiplier,
      effectiveKNet,
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
      contestDirectRevenue24m,
      votaDonandoGross24m: cTotalDonationsGross,
      votaDonandoNetToStakeholders24m: cDonationsNetPool,
      barterValue24m: aBarter,
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

function fStakeholderMonetary(avoidedCapex: number, spillover: number, netOp: number, donations: number) {
  return avoidedCapex + spillover + netOp + donations;
}
