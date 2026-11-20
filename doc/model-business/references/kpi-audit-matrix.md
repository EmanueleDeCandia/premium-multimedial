# Matrice di Audit Forense dei KPI e Parametri del Sito Web

Questo documento di riferimento censisce integralmente i parametri numerici implementati nel sito web (`src/data/content.ts`, `src/components/Impact.tsx`, `src/components/EcosystemMap.tsx`, `src/components/Pricing.tsx`, `src/components/Stakeholders.tsx`) rispetto al framework guida `doc/premium-multimedia-ebook-skill`, ricostruendone i denominatori impliciti, le scale di visualizzazione e le incongruenze rilevate.

---

## 1. Audit Completo dei 26 KPI di Livello 1 (13 Moduli × 2 KPI)

| Modulo | KPI | Valore Sito | Baseline Sito | Scala Implicita Barra (`value / ratio`) | Logica / Formula Implicita Ricostruita | Criticità / Ambiguità per il Business Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **3.1** | K-factor | `1,35` | `0,25` | `0 – 2,00` (`0,675` / `0,125`) | $K = i \times c$ (es. `3 inviti × 45%` su coorte attiva) | Se $K > 1$ senza smorzamento, diverge all'infinito: va trattato come $K_{\text{ondata1}}$ con decadimento di rete. |
| **3.1** | ACV B2B/B2G | `€12.500` | `520× copia €24` | `€0 – €20.161` (`0,62`) | $520,83 \times €24 \approx €12.500$; `€500k / €12.500 = 40` contratti | Incongruenza con Pricing `Istituzionale` (`€9.800` per `1.000` licenze = `€9,80`/copia): manca il ponte tra pacchetto base e upsell. |
| **3.2** | Ritenzione Seriale | `64%` | `22%` | `0 – 100%` (`0,64` / `0,22`) | Lettori Ep. 1 che completano $\ge 60\%$ degli episodi successivi | Dipende dal numero di puntate (`6` vs `12` annuali) e dal ritmo di pubblicazione. |
| **3.2** | Voti & Stampa | `48.000 voti` + `140 articoli` | `12 tappe · 48 borse` | `0 – 60.000 voti` (`0,80`) | `4.000 voti/tappa`; `11,67 articoli/tappa`; `1.000 voti = 1 borsa da €1.000` | I `€48.000` raccolti ("dona €2 per le borse" o `€1/voto`) sono **fondi pass-through** alla Community, non ricavi Startup. |
| **3.3** | Partner Redemption | `27%` | `3%` (DEM) | `0 – 40%` (`0,675` / `0,075`) | Scarichi / Invii DEM partner (`9×` vs baseline) | Non distingue tra CRM privati (`aziende`) e newsletter/portali di Comuni/Regioni (`fondazioni`). |
| **3.3** | Average Dwell Time | `11,5 min` | `0,8 min` (adv.) | `0 – 15 min` (`0,77` / `0,053`) | Durata media sessione sul capitolo sostenuto (`14,4×` vs adv.) | Indicatore non monetario di *brand affinity* per lo sponsor; non traduce direttamente in conversione commerciale. |
| **3.4** | EMV & Reach Festival | `€420.000` / `350k utenti` | Per singolo speciale | `€0 – €600.000` (`0,70`) | $\text{EMV} = 350.000 \times €1,20/\text{utente unico}$ | Moltiplicatore `€1,20/utente` implicito non documentato; non contabilizza il costo di produzione sostenuto dalla Startup ("costo zero" per l'ente). |
| **3.4** | Pipeline B2B | `45 contatti` (`12 trattative`) | `27%` conv. | `0 – 75 contatti` (`0,60`) | $12 / 45 = 26,67\% \approx 27\%$ | Manca il valore atteso (€) delle 12 trattative e l'attribuzione al rispettivo buyer finale per evitare doppi conteggi. |
| **3.5** | Attivazione Phygital | `14%` | `4%` (QR stampa) | `0 – 25%` (`0,56` / `0,16`) | $\text{Scansioni uniche} / \text{Copie esposte}$ (`3,5×` vs baseline) | Non esplicita quanti degli scan diventano lettori attivi > 4 min né il costo di produzione degli inserti. |
| **3.5** | Tiratura Complessiva | `180.000 copie` | `4 testate (2 naz., 2 loc.)` | `0 – 250.000` (`0,72`) | $180.000 \times 14\% = 25.200$ accessi digitali | La tiratura esposta (reach lorda) non equivale ai lettori effettivi. |
| **3.6** | Share of Voice | `85 riprese` (+ `2.400` social, `9` inviti) | Per ciclo d'inchiesta | `0 – 125 riprese` (`0,68`) | Rassegna stampa + menzioni social + inviti istituzionali | Beneficio reputazionale e PR per Startup e Media partner; costo redazionale non esplicitato. |
| **3.6** | Risposta Istituzionale | `60%` | `15%` | `0 – 100%` (`0,60` / `0,15`) | $\text{Enti rispondenti} / \text{Enti interpellati ("Pagina Bianca")}$ | Indicatore civico e di autorevolezza non monetaria (`4×` vs interpellanze ordinarie). |
| **4.1** | ARR Licenze B2B | `€240.000` | Target 24M: `€400.000` | `€0 – €400.000` (`0,60`) | `80 licenze istituzionali × €3.000/anno` | **Criticità contabile:** in `revenueMix` 24M viene sommato come `€240k`, confondendo *ARR run-rate* con *ricavo cumulato 24 mesi*; inoltre in `Stakeholders.tsx` `4.1` è assegnato a `community` anziché ad università/biblioteche. |
| **4.1** | Tasso di Rinnovo | `85%` | Soglia `70%` | `0 – 100%` (`0,85` / `0,70`) | $\text{Licenze rinnovate}_{t} / \text{Licenze attive}_{t-1}$ | Implica una vita media attesa della licenza di $1 / (1 - 0,85) = 6,67$ anni (LTV lordo ~`€20.000`). |
| **4.2** | Istituti Adottanti | `320 istituti` (`1.100 classi`) | Target 3Y: `500` | `0 – 500` (`0,64`) | Media `3,44 classi/istituto` (`1.100 / 320`) | Nel Piano `Istituzionale` (`€9.800`) sono incluse `20` classi (`40 × 20 = 800`), quindi `300` classi extra derivano da upsell o bandi scolastici non prezzati a listino. |
| **4.2** | Completamento Didattico | `72%` | `35%` (e-learning) | `0 – 100%` (`0,72` / `0,35`) | $\text{Classi/studenti che completano il kit} / \text{Adottanti}$ | KPI di impatto educativo per Fondazioni e USR (`2,06×` vs e-learning scolastico standard). |
| **4.3** | Returning MAU | `9.500 utenti` | `3,2 visite/mese` | `0 – 15.000` (`0,633`) | Professionisti unici mensili di ritorno (`30.400` visite/mese) | Non è chiaro come si monetizzi direttamente la community (nessuna fee B2C; potenziale *Featured Call* B2B). |
| **4.3** | CTR sulle Call | `18%` (`≈ 6.200 cand./anno`) | `4%` (bacheche gen.) | `0 – 25%` (`0,72` / `0,16`) | `6.200 / 0,18 ≈ 34.444` visitatori/sessioni qualificate su call/anno | Il denominatore (`~34,4k`) non è pubblicato accanto a `9.500 MAU` (`9.500 × 3,2 × 12 = 364.800` visite totali -> `~9,4%` delle visite vede una call specifica o `~3,6` call/utente/anno). |
| **4.4** | Accessi Turistici | `48.000 attivazioni` | `10 dest. × 4.800`; `220` strutture | `0 – 80.000` (`0,60`) | `48.000 / 220 = 218` attivazioni/struttura in 24M (~`9/mese`) | Ricavo Startup per destinazione non esplicitato (incluso implicitamente nei `€500k` B2B/B2G). |
| **4.4** | Click Prenotazioni | `22%` (`≈ 10.500` pren.) | `6%` (guide dig.) | `0 – 30%` (`0,733` / `0,20`) | `48.000 × 0,22 = 10.560 ≈ 10.500` prenotazioni locali | Beneficio economico diretto per gli operatori del territorio (es. `10.500 × €32 ≈ €336k` indotto), non per la Startup. |
| **4.5** | Sponsorizzazioni Tech | `€360.000` (`30% barter`) | Target 24M: `€500.000` | `€0 – €500.000` (`0,72`) | `€252.000` cash (`70%`) + `€108.000` barter tecnico (`30%`) | **Criticità contabile:** l'intero `€360k` (incluso il barter non monetario) entra nei `"ricavi non diluitivi"` (`€1,52M`) del sito. |
| **4.5** | Lead B2B Qualificati | `640 lead` | `Costo per lead stimato: €18` | `0 – 1.000` (`0,64`) | `640 × €18 = €11.520` (costo interno di generazione lead, oppure benchmark errato rispetto al CPL fiera B2B `€200–€300`) | Ambiguità critica: per lo sponsor che paga `€25k–€30k` per ~53 lead, il costo effettivo per il partner è `~€470–€560/lead` (ma include brand affinity e asset video), non `€18`. |
| **4.6** | Completamento Sondaggi | `58%` | `12%` (survey online) | `0 – 100%` (`0,58` / `0,12`) | Rispondenti volontari / lettori esposti ai moduli quiz | Elevato grazie alla natura identitaria ("che estetica hai") e restituzione in infografica (`4,8×` vs survey standard). |
| **4.6** | Profili Zero-Party | `42.000 profili` | `Opt-in progressivo: 46%` | `0 – 60.000` (`0,70`) | `180.000 lettori × 0,875 (dedup) × 58% × 46% = 42.021` profili | Equazione implicita ricostruibile con precisione quasi esatta (`42.021 ≈ 42.000`). |
| **4.7** | Margine White-Label | `62%` | `18%` (ex novo); `2,6×` costo marg. | `0 – 100%` (`0,62` / `0,18`) | $\text{Costo marg.} = 38\%$; $1 / 0,38 = 2,63\times \approx 2,6\times$ | Calcolo internamente coerente sul margine di contribuzione; omette però l'ammortamento del Capex iniziale di piattaforma. |
| **4.7** | Commesse Extra-Danza | `8 commesse` (24M) | Lirica, musei, design, musica | `0 – 12` (`0,667`) | `€180.000 / 8 = €22.500` ricavo medio per commessa | **Incongruenza di 2× con Pricing:** il listino dichiara `"White-Label da €45.000"`; `8 × €45.000 = €360.000` (o `€180.000 / €45.000 = 4` commesse). |

---

## 2. Audit delle Metriche Aggregate (`Impact.tsx`, `Engines.tsx`, `EcosystemMap.tsx`, `Pricing.tsx`)

### 2.1 Headline & Mix Ricavi (`€1,52 M` in 24 mesi)
- **Mix dichiarato (`revenueMix`):** Licenze B2B/B2G `€500k` (`33%`) + Sponsorship tecniche `€360k` (`24%`) + Cultural sponsorship `€240k` (`16%`) + Living Archive ARR `€240k` (`16%`) + White-label `€180k` (`12%`) = `€1.520.000`.
- **Somma verificata:** $500 + 360 + 240 + 240 + 180 = 1.520\text{ k€}$. (Nota: le % mostrate arrotondate sommano $33 + 24 + 16 + 16 + 12 = 101\%$ per arrotondamento all'intero).
- **Scomposizione finanziaria mancante:** `€108.000` sono barter tecnico (`4.5`), `€240.000` sono una metrica annuale (`ARR`) sommata a flussi biennali, e mancano totalmente Capex/Opex/EBITDA.

### 2.2 Metriche di Audience & Acquisizione
- **Reach `1,2 M` -> Lettori attivi `180.000` (`> 4 min`):** conversione globale implicita `15,0%`. Nel sito manca la deduplicazione tra i canali (`3.3`, `3.4`, `3.5`, `4.4`, `3.2`).
- **CAC diretto `€0,40` vs Paid Social `€6,50`:** implica una spesa diretta totale di acquisizione/distribuzione su 24 mesi pari a $180.000 \times €0,40 = €72.000$ (es. `650` punti phygital × `€40` = `€26.000` + `€46.000` media kit, landing dedicate e seeding). **Non include** il costo fisso del team commerciale/ABM né i costi di produzione editoriale dei moduli a "costo zero" (`3.4`, `3.6`).

### 2.3 Topologia Mappa Ecosistema (`54` vs `55` connessioni)
- Connessioni effettive in `src/data/content.ts`:
  - `L0 -> L1`: **13** (`1` per ciascuno dei 13 moduli)
  - `L1 -> L2`: **26** (`2` motori per ciascuno dei 13 moduli)
  - `L2 -> L3`: **15** (`fondazioni`: 3; `aziende`: 3; `istituzioni`: 4; `community`: 3; `tecnologia`: 2)
  - **Totale reale:** $13 + 26 + 15 = \mathbf{54}$ connessioni dirette (il testo del sito indica `55` in `EcosystemMap.tsx` e `SocialProof.tsx`).
- **Sovrapposizioni e collegamenti secondari non mappati in `L2 -> L3`:**
  - `3.3` converge su due buyer incompatibili (`fondazioni` B2G territoriali e `aziende` B2B brand) condividendo un'unica coppia di KPI.
  - `4.6` converge su due usi distinti (`aziende` data-insight e `tecnologia` piattaforma nativa).
  - `4.1` è legato solo a `community` (`5.2, 5.3`), benché il pagante (`€3.000/anno`) sia istituzionale/accademico e `5.3` non compaia in `community.engines`.
  - Motori secondari di modulo omessi dal profilo Stakeholder in `EcosystemMap.tsx`: `5.6` su `3.1` e `5.5` su `4.2` (`fondazioni`), `5.2` su `4.5` e `5.3` su `4.6` (`aziende`), `5.1` su `4.3` e `5.3` su `4.1` (`community`), `5.3` su `4.6` (`tecnologia`).
