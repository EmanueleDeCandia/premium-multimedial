# Specifiche e Piano di Implementazione: Simulatore Parametrico Multi-Stakeholder (`#/simulatore`)

> **Stato:** Documento di specifica e piano d'implementazione per il branch `model-business`  
> **Obiettivo:** Superare definitivamente i valori fissi e i bias di attribuzione del sito originario trasformando il modello in un **Simulatore Pure-Input per la Startup e per ciascuno dei 5 Stakeholder**, in una pagina web separata e indipendente (`#/simulatore`).

---

## 1. Cambio di Paradigma: Zero Costanti Arbitrarie — Tutto è INPUT

L'audit del sito originario e della prima calibrazione ha dimostrato che **qualsiasi prezzo, tasso di viralità, commissione o valore d'impatto fissato a priori è sbagliato per definizione** rispetto al singolo caso concreto:
- Una campagna di **viralità** (`K`) può valere `0` (nessun passaparola) o `2` (forte propagazione), e il suo valore economico non è un costo fisso per lettore (`€0,40`), ma dipende dall'**obiettivo concreto** dello stakeholder (es. un invito a una conferenza stampa per presentare un progetto da finanziare a privati può valere `€100.000` anche con poche decine di accessi qualificati).
- Un contenuto multimediale interattivo **non misura solo "minuti di lettura"**: traccia azioni specifiche e intenzionali (*"lettura/visione di qualcosa di importante"*: click su un popup video che spiega cosa ha fatto o non ha fatto l'Istituzione o l'Impresa su temi di **Brand Loyalty**, **Crisis Management**, **Fundraising**, **Lead B2B**).
- Una **commissione** applicata dalla Startup su servizi turistici, ricettivi o esperienziali organizzati tramite l'ecosistema può variare da **`0%` fino all'`80%`** (e oltre) a seconda della natura del servizio.

Per questo motivo il simulatore adotta una **regola architetturale assoluta**:

1. **Ogni parametro economico, di diffusione e di conversione è una variabile di INPUT libera** editabile dall'utente (i numeri proposti al caricamento sono esclusivamente *valori di default modificabili*).
2. **Ogni catena `Input → Formula → Output` espone la formula trasparente live** (con i numeri inseriti dall'utente sostituiti in tempo reale) e **una Nota Esplicativa di Audit** che spiega il bias del sito originario e la correzione introdotta.
3. **Ogni risultato distingue sempre 4 quadranti separati di attribuzione:**
   - **Startup · Monetario** *(Ricavi Cash, Commissioni, Cost-Offset Barter separato, Costi, EBITDA, Fabbisogno di Cassa/DSO)*
   - **Startup · Non Monetario** *(Reach propria incrementale, Dati Zero-Party, Pipeline, Brand Asset)*
   - **Stakeholder · Monetario** *(Valore Obiettivi Raggiunti, Costi Evitati, Indotto Territoriale, Borse Raccolte)*
   - **Stakeholder · Non Monetario** *(Brand Loyalty, Crisis Management, Presenze Turistiche, Impatto Didattico/Civico)*

---

## 2. Le 4 Correzioni Metodologiche Fondamentali (Oltre il Modello Precedente)

### 2.1 Doppia Diffusione & CPM Culturale (`3.4`, `3.3`, `3.5`)
Nel sito originario si confondeva la mailing list già posseduta dall'istituzione/azienda con una nuova reach mediatica, applicando un arbitrario `€1,20/contatto` (`€1.200 CPM`). Nel simulatore i canali di diffusione sono rigorosamente divisi in due flussi indipendenti (entrambi editabili):

1. **Flusso A — Diffusione su Contatti Propri dello Stakeholder ($\text{Reach}_{\text{Stakeholder}}$):**
   - L'Istituzione o l'Impresa invia l'opera al proprio database/abbonati/CRM.
   - **Nessun CPM fittizio:** lo stakeholder possiede già quei contatti. Il valore generato per lo Stakeholder deriva dal **costo di produzione editoriale evitato**, dalla **retention** della propria base e dalle **conversioni verso il proprio obiettivo** (es. *Brand Loyalty*, biglietteria, abbonamenti).
   - **Doppio beneficio fondamentale per la Startup dal DB dell'Istituzione:**
     - *Monetizzabile:* i lettori raggiunti tramite il DB istituzionale vengono invitati a compiere azioni monetizzabili nell'ecosistema Startup (prenotazioni/pernottamenti, servizi, donazioni, acquisti) tramite le variabili editabili `% conversione azioni Startup` × `valore/margine medio azione`.
     - *Non monetizzabile (Halo Effect / Autorevolezza):* essere presentati da una grande Istituzione alla propria community legittima una startup sconosciuta e funge da moltiplicatore di credibilità per coinvolgere altre Istituzioni e partner.
2. **Flusso B — Diffusione Pubblicata dalla Startup su Contatti Diversi ($\text{Reach}_{\text{Startup\_Incrementale}}$):**
   - La Startup distribuisce e amplifica il contenuto su audience **nuove e non sovrapposte** rispetto a quelle dell'istituzione/brand (network editoriale Startup, hub-and-spoke, dark social, altre scuole/territori).
   - Solo su questa quota incrementale netta si applica il **Valore Media Culturale (`CPM_culturale`)**, impostato di **default a `€90,00 CPM`** (modificabile liberamente dall'utente, range suggerito `€0 – €300`):
     $$\text{Valore\_Reach\_Incrementale} = \frac{\text{Reach}_{\text{Startup\_Incrementale}} \times (1 - \delta_{\text{sovrapposizione}})}{1.000} \times \text{CPM}_{\text{culturale}}$$

### 2.2 Engagement Interattivo Orientato all'Obiettivo ("Lettura di Qualcosa di Importante")
Sia per le **Istituzioni** che per le **Imprese Private** (che nel sito originario non avevano alcun indicatore di impatto strategico qualitativo), il simulatore sostituisce il semplice *"tempo di permanenza"* con la misurazione delle **micro-interazioni multimediali critiche** (*click su popup video, apertura card comparativa, download dossier strategico, adesione a call/evento*):

$$N_{\text{eventi\_importanti}} = \text{Utenti\_Esposti\_Totali} \times r_{\text{apertura\_opera}} \times r_{\text{click\_evento\_importante}}$$
$$N_{\text{conversioni\_obiettivo}} = N_{\text{eventi\_importanti}} \times r_{\text{conversione\_obiettivo}}$$
$$\text{Valore\_Engagement\_Obiettivo} = N_{\text{conversioni\_obiettivo}} \times V_{\text{obiettivo\_unitario}}$$

*(Opzione alternativa attivabile dall'utente: inserire direttamente un **Valore Complessivo del Progetto/Obiettivo** $V_{\text{progetto}}$ moltiplicato per la probabilità di successo raggiunta tramite la campagna, es. Conferenza Stampa Fundraising `€100.000` o Tutela Crisi Reputazionale `€50.000`.)*

Esempi d'uso già configurabili come preset rapidi:
- **Brand Loyalty (Impresa Privata / Istituzione):** l'utente clicca sul popup video che documenta *"cosa ha fatto l'organizzazione su qualità/sostenibilità/territorio"* $\rightarrow$ aumento fedeltà/rinnovo o riduzione churn.
- **Crisis Management (Impresa Privata / Istituzione):** l'utente clicca sul popup interattivo di chiarimento/trasparenza (*"perché non è stato fatto Y / come è stato gestito il problema X"*) $\rightarrow$ contenimento danno reputazionale / recupero fiducia.
- **Conferenza Stampa & Fundraising Privato (Istituzione):** la viralità ($K$ anche `0` o `2`) moltiplica gli inviti qualificati a una presentazione progettuale $\rightarrow$ se porta al finanziamento del progetto da parte di privati, il valore generato è **`€100.000+`**, indipendentemente dal numero grezzo di lettori.

### 2.3 Turismo `4.4` — Doppia Attribuzione (Presenze Istituzionali vs Commissioni Startup `0%–80%+`)
L'indicatore unico *"Accessi per destinazione"* viene smontato in due catene distinte e non sovrapposte:
1. **Quota Non Monetizzabile $\rightarrow$ Attribuita alle Istituzioni / DMO / Territorio:**
   - Accessi gratuiti alle mappe e audio-guide nei borghi/info-point:
     $$\text{Giornate\_Presenza\_Locali} = \text{Accessi\_Turistici} \times r_{\text{estensione\_permanenza}} \times \text{Giorni\_Extra}$$
     $$\text{Spesa\_Indotta\_Territorio} = \text{Giornate\_Presenza\_Locali} \times \text{Spesa\_Media\_Giornaliera}$$
   - *(Output puro dello Stakeholder Pubblico / Territoriale; `€0` ricavi Startup).*
2. **Quota Transazionale $\rightarrow$ Attribuita alla Startup (Ricavo Commissioni Variabili `0%–80%+`):**
   - Prenotazioni di pernottamenti, esperienze, visite o servizi organizzati direttamente dalla Startup tramite i propri contenuti digitali:
     $$\text{GMV\_Servizi\_Turistici} = \text{Accessi\_Startup\_Booking} \times r_{\text{conversione\_booking}} \times \text{Scontrino\_Medio\_Servizio}$$
     $$\text{Ricavo\_Commissioni\_Startup} = \text{GMV\_Servizi\_Turistici} \times c_{\text{commissione}}$$
     $$\text{Ricavo\_Netto\_Operatori\_Ricettivi} = \text{GMV\_Servizi\_Turistici} \times (1 - c_{\text{commissione}})$$
   - La percentuale $c_{\text{commissione}}$ è un **INPUT libero da `0%` a `80%` (e fino a `100%`)**: ad es. `10%–15%` su intermediazione hotel/ristorazione, fino all'`80%` su servizi/esperienze organizzati direttamente dalla Startup.

### 2.4 Viralità ($K$) e Prezzi Come INPUT Puri (Eliminazione di `€0,40` e `K=1,35` Fissi)
- **$K_{\text{input}}$ libero (`0,00` – `3,00+`):** L'utente imposta il proprio $K$ stimato (incluso `0` per assenza totale di viralità, `0,25` prudente, `1` o `2` per lanci ad alta risonanza) e decide se applicare uno **smorzamento di saturazione di rete** ($\lambda_{\text{decay}} \in [0\%, 90\%]$).
- **Nessun CAC fisso:** Il CAC non è un dato d'ingresso, ma **solo un risultato** calcolato dividendo i costi reali sostenuti (distribuzione phygital + seeding + eventuale quota ABM/redazionale imputata) per i lettori effettivi ottenuti.
- **Tutti i prezzi e ticket sono INPUT modificabili:** inclusi eventuali servizi a `€0` o personalizzati per singolo stakeholder.

---

## 3. Registro Completo delle Variabili di INPUT (con Default Consigliati vs Sito Originario)

Tutte le variabili sottostanti saranno editabili nell'interfaccia del simulatore. I valori di **Default Realistico Proposto** fungono da base iniziale immediatamente modificabile.

### 3.1 Blocco Globale · Diffusione, Viralità, CPM, Engagement Obiettivo & Finanza Startup

| ID Variabile | Descrizione INPUT | Range Libero | Default Sito Originario | **Default Proposto (Modificabile)** | Nota Esplicativa / Correzione |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `cpm_culturale_eur` | CPM su contatti **nuovi** pubblicati dalla Startup | `€0 – €400` | *Implicito €1.200* | **`€90,00`** | Sostituisce il falso `€1,20/contatto` su reach propria dell'ente; `€90 CPM` riflette media culturali verticali ad alta affinità. |
| `reach_startup_incrementale` | Contatti diversi da quelli dell'Istituzione raggiunti dalla Startup | `0 – 5.000.000` | *Non distinto* | **`80.000`** | Separa esplicitamente l'audience portata dalla Startup da quella già nel CRM dell'Istituzione/Azienda. |
| `sovrapposizione_audience_pct` | % sovrapposizione tra canali (deduplicazione) | `0% – 80%` | `0%` *(non calc.)* | **`20%`** | Evita di contare lo stesso lettore 2–3 volte tra festival, stampa e social. |
| `k_viralita` | Coefficiente di viralità ($K$-factor) | `0,00 – 3,00` | `1,35` *(fisso)* | **`0,25`** | Input libero (può essere `0` o `2`); `0,25` è realistico per editoria culturale di nicchia senza forzature. |
| `decadimento_virale_pct` | Smorzamento di rete tra ondate successive | `0% – 90%` | `0%` *(diverge)* | **`50%`** | Impedisce esplosioni matematiche infinite se l'utente imposta `K ≥ 1`. |
| `engagement_click_importante_pct` | % lettori che clicca su evento chiave (popup video Loyalty / Crisis / Call) | `0% – 100%` | *Assente* | **`22%`** | Misura la "lettura/visione di qualcosa di importante", non i soli minuti passivi. |
| `engagement_conv_obiettivo_pct` | % di chi clicca che raggiunge l'obiettivo dello stakeholder | `0% – 100%` | *Assente* | **`8%`** | Conversione effettiva verso l'obiettivo strategico (es. adesione, loyalty, mitigazione crisi, meeting). |
| `valore_obiettivo_unitario_eur` | Valore economico unitario (o equivalente) di 1 obiettivo raggiunto | `€0 – €500.000` | *Assente* | **`€180`** | Esempi: `€80–€250` per *brand loyalty*; oppure **`€100.000`** con `1` conversione su *conferenza stampa fundraising*. |
| `dso_giorni_incasso_b2g` | Giorni medi di incasso da Enti/Fondazioni (DSO) | `0 – 240 gg` | *Assente* | **`90 gg`** | Determina il fabbisogno di cassa reale Anno 1 (anche a fronte di ricavi contrattualizzati). |
| `capex_piattaforma_24m` | Investimento piattaforma tech & moduli interattivi (24M) | `€0 – €300.000` | *Assente* | **`€65.000`** | Include sviluppo web-app, tracking popup interattivi, QR/NFC e moduli White-Label. |
| `costi_fissi_redazione_24m` | Redazione core, direzione editoriale, inchieste `3.6` (24M) | `€0 – €500.000` | *Assente* | **`€130.000`** | Copre la produzione editoriale "Editorial First" indipendente dalle singole vendite. |
| `costi_sales_abm_24m` | Team commerciale, cofanetti ABM, PM & account (24M) | `€0 – €400.000` | *Assente* | **`€78.000`** | Rende trasparente il CAC *fully-loaded* rispetto al solo costo di seeding. |
| `costi_distribuzione_seeding_24m` | Spesa diretta phygital (QR/NFC), media kit & seeding | `€0 – €250.000` | *Implicito €72k* | **`€32.000`** | Diviso per i lettori totali genera il CAC diretto derivato (mai impostato a priori). |
| `costi_ga_cdn_gdpr_24m` | Struttura, streaming video, cloud, legali GDPR & amministrazione | `€0 – €200.000` | *Assente* | **`€46.000`** | Completa il Conto Economico fino all'EBITDA reale. |

---

### 3.2 Variabili di INPUT per i 5 Stakeholder (con Default Modificabili)

#### Stakeholder 1 — Fondazioni ed Enti (`3.1`, `3.3-B2G`, `4.2`, `4.4`)
- **Contratti & Prezzi (Input):**
  - `f1_contratti_24m` (`default 10`) × `f1_prezzo_eur` (`default €9.800`, 1.000 licenze + 20 classi `4.2`)
  - `f2_contratti_24m` (`default 5`) × `f2_prezzo_eur` (`default €14.500`, edizione territoriale `3.3-B2G` + `4.4`)
  - `f3_contratti_24m` (`default 2`) × `f3_prezzo_eur` (`default €18.400`, programma regionale annuale `-20%`)
  - `f_cogs_pct` (`default 25%`) — costo variabile di personalizzazione, adattamento mappe e tutoraggio docenti.
- **Scuole & DB Cittadini (Input):**
  - `f_contatti_db_ente_tot` (`default 75.000`), `f_redemption_db_pct` (`default 8%` vs `27%` del sito), `f_lettura_profonda_pct` (`default 45%`).
  - `f_istituti_attivati` (`default 110`), `f_classi_per_istituto` (`default 3,2`), `f_completamento_didattico_pct` (`default 58%`).
  - `f_capex_evitato_per_ente_eur` (`default €28.000`) — costo di una pubblicazione digitale/didattica realizzata autonomamente.
- **Turismo `4.4` — Doppia Attribuzione Istituzioni vs Startup (Input):**
  - `t_accessi_turistici_gratuiti` (`default 24.000`) — fruizione gratuita in borghi/info-point.
  - `t_estensione_soggiorno_pct` (`default 12%`) × `t_giorni_extra` (`default 1,4`) × `t_spesa_giornaliera_eur` (`default €85`) $\rightarrow$ **Giornate di presenza e Indotto Territoriale attribuiti alle Istituzioni**.
  - `t_accessi_startup_booking` (`default 18.000`) × `t_conv_booking_pct` (`default 10%`) × `t_scontrino_medio_servizio_eur` (`default €95`) $\rightarrow$ **GMV prenotato**.
  - **`t_commissione_startup_pct`** (`range 0% – 80%+`, **`default 15%`** su partner ricettivi; preset servizi organizzati Startup fino a **`80%`**) $\rightarrow$ **Ricavo Diretto Commissioni Startup**.

#### Stakeholder 2 — Aziende e Brand (`3.3-B2B`, `4.5`, `4.6-Insight` + Indicatori di Loyalty / Crisis)
- **Cultural & Tech Sponsorship (Input):**
  - `a_cult_contratti_24m` (`default 5`) × `a_cult_prezzo_eur` (`default €18.000` vs `€24.000` sito); `a_cult_crm_tot` (`default 110.000`), `a_cult_redemption_pct` (`default 6%` vs `27%` sito).
  - `a_tech_contratti_24m` (`default 5`) × `a_tech_ticket_lordo_eur` (`default €15.000` vs `€30.000` sito); `a_tech_barter_pct` (`default 20%`, solo se sostituisce costi di produzione già a budget).
  - `a_cogs_cult_pct` (`default 30%`); `a_cogs_tech_lordo_pct` (`default 38%`).
- **Lead B2B, Zero-Party Data & Nuovi Indicatori Strategici (Input):**
  - `a_lead_b2b_per_partner` (`default 22` vs `53` sito), `a_sql_rate_pct` (`default 30%` lead qualificati a trattativa), `a_cpl_fiera_comparabile_eur` (`default €180`).
  - `a_survey_completion_pct` (`default 24%` vs `58%` sito) × `a_gdpr_optin_pct` (`default 32%` vs `46%` sito).
  - `a_valore_ricerca_evitata_eur` (`default €6.000` per brand).
  - **Nuovo — Engagement Strategico Impresa (`Loyalty / Crisis / Product Education`):**
    `a_click_popup_critico_pct` (`default 25%`) × `a_conv_obiettivo_brand_pct` (`default 10%`) × `a_valore_obiettivo_brand_eur` (`default €150`, es. cliente fidelizzato/crisi contenuta).

#### Stakeholder 3 — Istituzioni Culturali e Media (`3.4`, `3.5`, `3.6`)
- **Festival & Istituzioni `3.4` (Input):**
  - `i_speciali_24m` (`default 3`), `i_reach_propria_ente` (`default 240.000` contatti propri dei festival), `i_reach_startup_incrementale` (`default 80.000` contatti diversi portati dalla Startup), `cpm_culturale_eur` (**`default €90`**).
  - `i_costo_prod_evitato_ente_eur` (`default €18.000`/speciale), `i_costo_diretto_startup_per_speciale_eur` (`default €4.800`).
  - **Engagement Obiettivo Istituzionale** (es. *Brand Loyalty* / *Crisis Management* / *Invito Conferenza Stampa Fundraising*): `i_click_evento_importante_pct` (`default 20%`), `i_conv_obiettivo_pct` (`default 5%`), `i_valore_obiettivo_eur` (`default €500` oppure preset speciale **`€100.000`** su obiettivo unico conferenza stampa!).
  - **Pipeline Commerciale Originate per la Startup:** `i_contatti_b2b_per_speciale` (`default 10`), `i_conv_pipeline_pct` (`default 25%`), `i_valore_medio_deal_eur` (`default €14.000`). *(Mostrato come origination tracciata; sommato ai ricavi solo dove non già contato nei contratti `S1/S2/S5` per evitare doppi conteggi).*
- **Editoria Stampa `3.5` & Advocacy `3.6` (Input):**
  - `i_copie_stampa_esposte` (`default 120.000`), `i_qr_scan_pct` (`default 2,0%` vs `14%` sito), `i_costo_ponte_startup_eur` (`default €6.000`).
  - `i_cicli_inchiesta` (`default 2`), `i_riprese_stampa_per_ciclo` (`default 22` vs `85` sito), `i_risposta_istituzionale_pct` (`default 30%` vs `60%` sito).

#### Stakeholder 4 — Community Danza & Ricerca Istituzionale (`3.2`, `4.3`, `4.1`)
- **Contest & Borse `3.2` (Input):**
  - `c_tappe_24m` (`default 8`), `c_voti_per_tappa` (`default 2.500`), `c_tasso_donanti_su_votanti_pct` (`default 10%` vs `100%` implicito sul sito!), `c_donazione_media_eur` (`default €3,00`), `c_fee_gestione_startup_pct` (`range 0%–20%`, `default 0%` netto costi gateway `2,5%`), `c_valore_borsa_eur` (`default €1.000`).
- **Portale Bandi `4.3` (Input):**
  - `c_returning_mau` (`default 2.800` vs `9.500` sito), `c_ctr_call_pct` (`default 15%`), `c_featured_calls_24m` (`default 24`) × `c_featured_call_prezzo_eur` (`default €300`), `c_costi_community_ops_24m` (`default €28.000`).
- **Living Archive `4.1` — Buyer Accademici/Biblioteche (Input):**
  - `c_archive_licenze_y1` (`default 10`), `c_archive_nuove_y2` (`default 14`), `c_archive_rinnovo_pct` (`default 80%`), `c_archive_prezzo_annuo_eur` (`default €1.600` vs `€3.000` sito), `c_archive_cogs_pct` (`default 10%`).

#### Stakeholder 5 — Tecnologia & White-Label (`4.7`, `4.6-Platform`)
- **Commesse & SaaS (Input):**
  - `t_commesse_sottosoglia_24m` (`default 3`) × `t_prezzo_sottosoglia_eur` (`default €24.000`).
  - `t_commesse_enterprise_24m` (`default 1`) × `t_prezzo_enterprise_eur` (`default €45.000`).
  - `t_canone_saas_annuo_eur` (`default €3.600`) sulle edizioni consegnate in Y1.
  - `t_costo_marginale_produzione_pct` (`default 45%` inclusivo PM/Account, vs `38%` del sito) $\rightarrow$ margine operativo progetto **55%**.
  - `t_capex_sviluppo_alternativo_cliente_eur` (`default €40.000` vs `€95.000` sito) $\rightarrow$ risparmio netto reale per il museo/ente rispetto a un'agenzia CMS.

---

## 4. Architettura UI/UX della Pagina Separata (`#/simulatore`)

La pagina sarà costruita in **React + Tailwind CSS v4** mantenendo la coerenza tipografica ed estetica del progetto (*Fraunces / Inter / JetBrains Mono*, palette *ivory/night/coral/sage*), ma strutturata come **cruscotto analitico interattivo** separato dalla landing page:

1. **Header di Regia Fisso (Control Bar):**
   - Switch rapido tra **3 Preset Modificabili** (*Sito Originario con Bias* | *Default Realistico Revisionato* | *Stress-Test Conservativo*) + indicatore *"Personalizzato"* appena modifichi un input.
   - **KPI Bar Live 24 Mesi (Sempre Visibile):** Ricavi Cash Startup, Ricavi da Commissioni, Barter (separato), EBITDA 24M, Picco Cassa (con impatto DSO), Lettori Unici Totali, CAC Diretto vs Fully-Loaded (calcolati live).
   - Pulsante **Torna al Sito** + Pulsante **Esporta JSON / Riepilogo Markdown** (per salvare i tuoi valori definitivi e passarli alla fase successiva di aggiornamento del sito).

2. **Doppia Modalità di Navigazione a Schede:**
   - **Vista "Per Stakeholder & Esigenza" (Simulatore Verticale per Decisioni Reali):**
     - Scegli uno dei **5 Stakeholder** + seleziona una sua **Esigenza Specifica** (es. *Istituzione → Conferenza Stampa Fundraising / Loyalty / Crisis Management*; *Impresa → Brand Loyalty / Tech Lead B2B*; *Ente Locale → Turismo con Commissioni 0%–80%*; *Fondazione → Scuole PCTO*; *Museo → White-Label*).
     - Puoi simulare in isolamento quello specifico caso d'uso, variare `K`, `CPM`, `commissioni%`, `valore obiettivo` e vedere immediatamente il ROI per lo Stakeholder e il margine per la Startup.
   - **Vista "Ecosistema Completo & P&L Startup (24 Mesi)":**
     - Aggrega tutti i 5 flussi nel Conto Economico consolidato della Startup (Anno 1, Anno 2, Totale 24M, Break-Even, Working Capital da DSO) e nella Matrice di Valore Totale dei 5 Stakeholder.

3. **Anatomia di Ogni Modulo di Simulazione (3 Colonne Trasparenti):**
   - **Colonna 1 — Variabili di Input:** Slider + campo numerico diretto sbloccato (l'utente può digitare qualsiasi numero, incl. `0`, `2`, `80%`, `€100.000`).
   - **Colonna 2 — Motore Matematico & Nota Esplicativa:**
     - Mostra la formula algebrica con i valori correnti sostituiti dentro.
     - Box **"Audit & Correzione"** che spiega cosa c'era nel sito originario, quale bias è stato rimosso e perché è stata introdotta la nuova logica.
   - **Colonna 3 — Tabella Output 4 Quadranti:**
     - **Startup (Monetario / Non Monetario)** vs **Stakeholder (Monetario / Non Monetario)**, con badge `Δ` rispetto al preset *Sito Originario*.

---

## 5. Piano Operativo di Implementazione Tecnica

| Fase | File Coinvolti | Descrizione Lavoro |
| :--- | :--- | :--- |
| **1. Modello Matematico Pure-Input** | `src/data/simulatorModel.ts` | Definizione interfacce TypeScript, 3 preset di default (tra cui `€90 CPM`, commissioni `0%–80%+`, engagement Loyalty/Crisis/Fundraising, $K$ libero, DSO) e funzioni pure di calcolo con tracciamento delle formule live e note di audit. |
| **2. Componenti UI del Simulatore** | `src/components/simulator/SimulatorPage.tsx`, `InputField.tsx`, `ChainCard.tsx`, `StakeholderSandbox.tsx`, `StartupPnLView.tsx` | Interfaccia modulare a schede con slider+input numerici liberi, formula live inline, nota esplicativa per ogni catena causale, selettore esigenza specifica per stakeholder ed export JSON/Markdown. |
| **3. Routing Separato Zero-Impatto** | `src/App.tsx` | Routing hash `#/simulatore` (con fallback `?page=simulatore`) compatibile con `vite-plugin-singlefile`: il sito principale su `/` rimane inalterato. |
| **4. Verifica Build & Test Numerici** | `npm install`, `tsc --noEmit`, `npm run build` | Verifica assenza errori TypeScript, build Vite single-file funzionante e controllo visivo/funzionale nel browser sul branch `model-business`. |

---

## 6. Punti di Conferma Prima di Iniziare lo Sviluppo

Dopo aver letto questo documento nella cartella `doc`:
1. Confermi l'impostazione **Pure-Input** e le 4 nuove architetture (doppia Reach con default `€90 CPM`, Engagement interattivo su *Loyalty / Crisis / Obiettivo Specifico*, Commissioni `0%–80%+` su `4.4`, Viralità e Prezzi completamente liberi)?
2. Sul sito principale (`/`), preferisci **non aggiungere alcun link visibile** (accesso al simulatore solo via URL `#/simulatore`) oppure inserire un collegamento discreto nel Footer?
3. Confermi l'esecuzione di `npm install` locale (escluso da Git via `.gitignore`) per eseguire type-check e build di verifica prima del push sul branch `model-business`?
