# Revisione Critica del Simulatore (`v2` Approvata): Modello Core Contest & Trailer, "Vota Donando", Basi Dati Aziende, Fondazioni/Comuni e CLV Duale (`€500` / `€2.500`)

> **Documento distinto da [simulatore.md](./simulatore.md):** Questa revisione consolida l'architettura `v2` implementata nel simulatore (`src/data/simulatorModel.ts`), integrando tutte le correzioni approvate sul modello core. Il documento originario `doc/simulatore.md` rimane intatto come riferimento storico della `v1`.

---

## 1. Diagnosi di Fondo: Perché la `v1` era Coerente nei Conti ma Scollegata dal Modello Core

L'esame incrociato della `v1` rispetto alla meccanica operativa reale dell'ecosistema ha evidenziato quattro disallineamenti strutturali ora risolti nella `v2`:

1. Il **motore dei Contest Online con Trailer** (Compagnie di Danza + Scuole di Danza + Studenti + Inviti + Viralità) era ridotto a due numeri statici (`8 tappe × 2.500 voti`), privo di monetizzazione (iscrizioni, licenze concorso, sponsorizzazioni trailer) e di costi variabili di gestione.
2. La linea **"Vota Donando"** (`3.2` e sblocco `Director's Cut` `€2`) non era attribuita tramite percentuali configurabili agli Stakeholder beneficiari.
3. In **Aziende e Brand (`S2`)**, la generazione di Lead (`22 lead/partner`) era sconnessa sia dai lettori attivi reali sia dai tre flussi reali di contatti (**CRM proprio Sponsor**, **Pool Cross-Sponsor orchestrato dalla Startup**, **DB Proprietario selezionato dalla Startup** a `20.000` contatti/azienda), e mancava il **Customer Lifetime Value (CLV)** differenziato per **B2C/Brand (`€500`)** e **B2B Filiera Tech (`€2.500`)**.
4. In **Fondazioni ed Enti (`S1`)**, la provenienza dei contatti ("DB") appariva astratta e attiva anche con `0` contratti, mentre in `Istituzioni (S3)` esisteva un rischio di doppio conteggio sulle azioni monetizzate da DB Ente e una sovrastima dell'Engagement.

---

## 2. Architettura Causale della `v2` Approvata

### 2.1 Motore Core: Contest Online con Trailer (Compagnie & Scuole di Danza)
- **Partecipanti in gara (Input):** `cCompagnieContest` (`default 25`) × `cStudentiPerCompagnia` (`default 12`) + `cScuoleContest` (`default 60`) × `cStudentiPerScuola` (`default 35`) $\implies$ `Totale_Studenti_In_Gara` (`2.400`).
- **Viralità reale calcolata del Contest:** `cInvitiMediPerStudente` (`default 8`) × `cConvInvitiContestPct` (`default 30%`) $\implies$ **$K_{\text{contest}} = 2,40$** $\implies$ `Spettatori_Votanti_Contest` (deduplicati al `cSovrapposizioneContestPct`).
- **3 Monetizzazioni Dirette dei Contest (Input liberi):**
  1. **Prezzo partecipazione Contest:** `(Compagnie × P_comp) + (Scuole × P_scuola)` (default `€120` ciascuna, editabile da `€0`).
  2. **Acquisto Licenze Multimediali del Concorso:** `(Compagnie + Scuole) × licenze_medie_per_realtà × P_licenza` (default `6` licenze × `€35`).
  3. **"Vota Donando" + "Sblocca Donando €2" (Reader):**
     $$\text{Fondo\_Lordo} = (\text{Votanti\_Contest} \times r_{\text{donanti}} \times \text{Donazione\_Media}) + (\text{Lettori\_Attivi} \times r_{\text{sblocca\_donando}} \times €_{\text{sblocco}})$$
     Ripartizione netta (dopo gateway `2,5%` e `fee_Startup` default `0%`): **80% Community Danza (`S4`)**, **20% Fondazioni/Enti Territoriali (`S1`)**, **0% Aziende ESG (`S2`)** — tutte percentuali modificabili liberamente!
- **Costi Variabili Contest:** `Costo_per_realtà_partecipante` (`€65`) + `Costo_tappa_giuria` (`€600/tappa`) + `Costi_ops_bandi` (`€18.000`).

### 2.2 Origine delle Scuole e dei Contatti in `Fondazioni ed Enti` (`S1`)
Per totale chiarezza semantica:
- **Le Scuole e le Compagnie sono di Danza** (non istituti generici scollegati).
- **Fondazioni** (bancarie o emanazione di imprese private) e **Enti Pubblici / Comuni** acquistano pacchetti di licenze (es. un Comune acquista `100` o `500` licenze) **per distribuirle a cittadini, spettatori teatrali e scuole di danza del proprio territorio allo scopo di promuovere spettacoli o Contest locali**.
- Pertanto nella `v2`, **le licenze distribuite (`fContratti × fLicenzeMediePerEnte`) e le scuole/realtà di danza sostenute (`fContratti × fScuoleDanzaPerEnte`) derivano direttamente dai contratti B2B/B2G chiusi**: con `0` contratti, i risultati da Fondazioni/Comuni scendono coerentemente a `0`.

### 2.3 Aziende e Brand (`S2`) — 3 Basi di Contatti, Trailer Sponsor & CLV Duale (`€500` / `€2.500`)
- **Sponsorizzazione dei Trailer Contest:** si esplicita che la sponsorizzazione dei trailer rientra normalmente nel costo della licenza/pacchetto sponsor acquistato dall'impresa (senza sommarlo due volte); è comunque presente l'input separato `aSponsorTrailerAutonomi × aPrezzoSponsorTrailer` (default `€0` se incluso nella licenza).
- **3 Basi di Contatti Esplicite:**
  1. **CRM Proprio del Singolo Sponsor (`aCrmProprioPerAzienda`, default `20.000`/azienda):** su questi contatti che l'impresa già possiede si generano **Retention, Brand Loyalty e Crisis Management**, valorizzati con il **CLV**.
  2. **Orchestrazione Pool Cross-Sponsor Startup:** grazie alla regia della Startup, le aziende partecipanti scambiano visibilità sulle rispettive basi clienti (attivo solo se `N_aziende >= 2`: `(N_aziende - 1) × aCrmProprioPerAzienda × N_aziende` ponderato da `aQuotaScambioCrossSponsorPct`, es. `20%–50%` del pool condiviso di `200.000` su `10` sponsor!).
  3. **Database Proprietario Segmentato dalla Startup (`aDbProprioStartupPerAzienda`, default `20.000`/Azienda Cliente):** contatti nuovi selezionati e segmentati direttamente dalla Startup per ciascuna azienda cliente + audience esposta dell'opera e dei trailer contest.
- **CLV Duale (Input Liberi):**
  - **`aClvB2cEur = €500` (default)** per nuovi clienti e retention di Brand Consumer (`3.3-B2B`).
  - **`aClvB2bTechEur = €2.500` (default)** per nuovi clienti B2B e retention della Filiera Tech (`4.5`, es. teatri, compagnie, scuole di danza).

### 2.4 Eliminazione Doppio Conteggio `3.4`, Engagement `S3`, Costanti Hardcoded & DSO Duale
- **DB Istituzioni (`3.4`):** rimosso il ricavo fittizio duplicato sulle licenze. Nessuna vendita di ulteriori licenze viene contata sulla diffusione di licenze già acquistate da Sponsor, Fondazioni, Enti, Istituzioni o Compagnie. Il DB Istituzione genera **Traffico Qualificato** verso gli imbuti reali (Turismo `4.4` con commissioni, Contest `3.2`) + **Halo Effect (`+40%` autorevolezza)**.
- **Engagement Istituzionale (`3.4`):** separato in **Micro-obiettivi (es. loyalty/retention abbonato a `€30`)** + **Macro-obiettivi discreti (es. progetti finanziati in conferenza stampa a `€100.000`)**.
- **Zero costanti hardcoded:** tutti i parametri nascosti nella `v1` sono ora variabili di input o derivati dai flussi reali; DSO applicato sia al B2G/PA (`Fondazioni`, `Living Archive`, `White-Label PA`, default `90 gg`) sia al B2B privato (`Aziende`, default `45 gg`).
