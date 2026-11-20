/* =========================================================================
   Finestre sulla Danza — modello dei contenuti
   Framework: multimedia-book-dance-ecosystem v1.1.0
   ========================================================================= */

export type StakeholderId = "fondazioni" | "aziende" | "istituzioni" | "community" | "tecnologia";
export type EditionId = StakeholderId | "integrale";
export type WindowKind = "gothic" | "romanesque" | "classical" | "balcony" | "pediment";
export type MediaKind = "video" | "gallery" | "audio" | "map" | "text" | "quiz";

export interface Kpi {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  extra?: string;
  baseline: string;
  /** 0..1 riempimento della barra rispetto alla scala di riferimento */
  ratio: number;
  /** 0..1 posizione del marcatore di baseline */
  baseRatio?: number;
  desc: string;
}

export interface Shot {
  id: number;
  caption: string;
}

export interface Module {
  id: string;
  domain: "A" | "B";
  short: string;
  title: string;
  claim: string;
  editorialTitle: string;
  editorial: string;
  publicValue: string;
  partnerValue: string;
  media: { kind: MediaKind; label: string; meta: string }[];
  activities: string[];
  benefits: string[];
  engines: [string, string];
  lever: string;
  kpis: [Kpi, Kpi];
  video: { src: string; poster: string };
  gallery: Shot[];
  captions: string[];
}

export interface Engine {
  id: string;
  short: string;
  mapTag: string;
  name: string;
  tagline: string;
  what: string;
  how: string;
  kpis: { label: string; value: string }[];
}

export interface Stakeholder {
  id: StakeholderId;
  label: string;
  lines: [string, string];
  filterLabel: string;
  audience: string;
  editionTitle: string;
  kind: WindowKind;
  color: string;
  ink: string;
  accent: string;
  modules: string[];
  engines: string[];
  message: string;
  benefits: string[];
  kpis: { value: string; label: string }[];
}

/* ---------- Media (Pexels) ---------- */

export const photo = (id: number, w = 1400, h = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const vposter = (path: string) =>
  `https://images.pexels.com/videos/${path}?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=788`;

export const VIDEOS = {
  mirror: {
    src: "https://videos.pexels.com/video-files/8176782/8176782-hd_1920_1080_24fps.mp4",
    poster: vposter("8176782/pexels-photo-8176782.jpeg"),
  },
  stageDark: {
    src: "https://videos.pexels.com/video-files/26607119/11972136_1920_1080_30fps.mp4",
    poster: vposter("26607119/pexels-photo-26607119.jpeg"),
  },
  stageGroup: {
    src: "https://videos.pexels.com/video-files/26590492/11967101_1920_1080_30fps.mp4",
    poster: vposter("26590492/pexels-photo-26590492.jpeg"),
  },
  stageBW: {
    src: "https://videos.pexels.com/video-files/26607073/11972318_1920_1080_30fps.mp4",
    poster: vposter("26607073/pexels-photo-26607073.jpeg"),
  },
  soloBW: {
    src: "https://videos.pexels.com/video-files/26607140/11972337_1920_1080_30fps.mp4",
    poster: vposter("26607140/pexels-photo-26607140.jpeg"),
  },
  oldHouse: {
    src: "https://videos.pexels.com/video-files/5111183/5111183-hd_1920_1080_25fps.mp4",
    poster: vposter("5111183/pexels-photo-5111183.jpeg"),
  },
  oldHouseLong: {
    src: "https://videos.pexels.com/video-files/4990394/4990394-hd_1920_1080_30fps.mp4",
    poster: vposter("4990394/abandoned-house-anamorphic-lens-ancient-interior-ballerina-4990394.jpeg"),
  },
};

export const P = {
  shoesHold: 5255117,
  shoesFeet: 8463090,
  shoesStage: 17098758,
  shoesFloor: 17098764,
  tailorFit: 4620632,
  tailorCut: 4620635,
  tailorShop: 41067767,
  scalaStage: 39641859,
  redCurtain: 39591661,
  boxes: 39608316,
  scala: 5468933,
  classTeacher: 5888321,
  classMirror: 5149654,
  classStudio: 5149649,
  classKids: 6718450,
  borgoStreet: 14015644,
  borgoDusk: 8117565,
  hilltown: 10804673,
  towersNight: 28572715,
  spotlights: 12092991,
  stageLights: 976862,
  beams: 9271247,
  newspaper: 4936215,
  magazines: 9981358,
  audience: 18238117,
  audienceLights: 34623535,
};

/* ---------- Colori della mappa ---------- */
export const MAP_COLORS = { A: "#F08C76", B: "#9CC3B0", engine: "#D9C08F" };

/* =========================================================================
   13 LINEE DI VALORIZZAZIONE
   ========================================================================= */

export const modules: Module[] = [
  {
    id: "3.1",
    domain: "A",
    short: "B2B/B2G & Referral",
    title: "Acquisto B2B/B2G, Diffusione Verticale e Motore Referral",
    claim: "Superare i vincoli di finanziamento al non profit trasformando l’opera in un bene culturale acquistabile e virale.",
    editorialTitle: "Atlante Vivo della Danza e dei Mestieri d’Arte",
    editorial:
      "Monografie digitali d’autore che raccontano il dialogo tra coreografia e alto artigianato italiano: sartoria teatrale, scarpette fatte a mano, scenografia, liuteria e design del movimento. Ogni monografia è arricchita da brevi documentari in 4K, gallery fotografiche ad alta risoluzione e schede di approfondimento storico-tecnico.",
    publicValue: "Monografie d’autore e documentari 4K sul dialogo tra coreografia e alto artigianato.",
    partnerValue: "Ricavi immediati e non diluitivi, pubblico profilato a costo di acquisizione quasi nullo.",
    media: [
      { kind: "video", label: "Documentario 4K “Le mani della danza”", meta: "14 min" },
      { kind: "gallery", label: "Galleria ad alta risoluzione", meta: "56 foto" },
      { kind: "text", label: "Schede storico-tecniche", meta: "8 schede" },
      { kind: "audio", label: "Voci di bottega", meta: "9 min" },
    ],
    activities: [
      "Pacchetti di copie digitali e licenze personalizzabili — con prefazione istituzionale o ex-libris digitale — acquistabili da fondazioni bancarie, aziende ed enti come bene culturale o omaggio di valore.",
      "Accesso distribuito tramite landing page dedicate a database verticali profilati: associazioni dell’artigianato, scuole di danza, circoli culturali.",
      "Referral culturale a fine capitolo: chi invita 3 colleghi o appassionati sblocca una masterclass filmata o il backstage integrale di uno spettacolo, non uno sconto commerciale.",
    ],
    benefits: [
      "Ricavi immediati e non diluitivi, pienamente conformi alle regole di acquisto di beni e servizi di fondazioni ed enti.",
      "Pubblico altamente profilato con costi di acquisizione (CAC) drasticamente ridotti.",
      "Diffusione organica e tracciabile delle iniziative prima ancora del lancio commerciale dei servizi core.",
    ],
    engines: ["5.2", "5.6"],
    lever: "Esclusività istituzionale + sblocco di valore",
    kpis: [
      {
        label: "Tasso di viralità organica (K-factor)",
        value: 1.35,
        decimals: 2,
        baseline: "Baseline ebook culturale tradizionale: 0,25",
        ratio: 0.675,
        baseRatio: 0.125,
        desc: "Nuovi lettori unici generati in media da ogni lettore iniziale tramite i contenuti sbloccabili.",
      },
      {
        label: "Valore medio per contratto B2B/B2G (ACV)",
        value: 12500,
        prefix: "€",
        extra: "per fondazione o ente acquirente",
        baseline: "= 520× il prezzo di copertina della copia singola (€24)",
        ratio: 0.62,
        desc: "Ricavo medio generato per singolo contratto istituzionale rispetto al valore della copia singola.",
      },
    ],
    video: VIDEOS.oldHouse,
    gallery: [
      { id: P.shoesHold, caption: "Scarpette consumate dal lavoro: la materia prima di ogni monografia." },
      { id: P.tailorFit, caption: "Sartoria teatrale: il costume si prova sul corpo che dovrà danzare." },
      { id: P.tailorShop, caption: "La bottega come archivio vivente di gesti e saperi." },
    ],
    captions: [
      "Ogni scarpetta richiede ore di lavoro a mano, punto dopo punto.",
      "La sartoria teatrale cuce il movimento prima ancora che accada.",
      "Coreografia e artigianato: due grammatiche, un solo gesto.",
      "Legno, seta, gesso: materiali che imparano a danzare.",
    ],
  },
  {
    id: "3.2",
    domain: "A",
    short: "Serialità & Giurie",
    title: "Format Immersivi, Serialità, Territorio e Giornalisti-Giurati",
    claim: "Estendere la vita del libro oltre la lettura singola, trasformandolo in un appuntamento seriale e partecipato.",
    editorialTitle: "Cronache del Movimento: Storie, Luoghi e Sfide",
    editorial:
      "Un racconto a puntate mensili strutturato come un festival digitale permanente: trailer cinematografici, mappe interattive dei teatri e degli spazi non convenzionali della danza in Italia, micro-documentari realizzati da scuole e compagnie locali e una caccia al dettaglio nascosta tra testi e video, che premia la curiosità artistica.",
    publicValue: "Un festival digitale a puntate con mappe, micro-documentari e una caccia al dettaglio.",
    partnerValue: "Community fidelizzata, contenuti co-creati e copertura stampa locale spontanea.",
    media: [
      { kind: "video", label: "Trailer di stagione", meta: "2 min" },
      { kind: "map", label: "Mappa dei teatri e degli spazi non convenzionali", meta: "240 luoghi" },
      { kind: "video", label: "Micro-documentari delle scuole", meta: "12 episodi" },
      { kind: "quiz", label: "Caccia al dettaglio", meta: "36 indizi" },
    ],
    activities: [
      "Calendario editoriale a episodi — 6 o 12 uscite annuali — che trasforma il libro in un appuntamento ricorrente.",
      "Contest territoriali per scuole e compagnie: video-racconti e coreografie originali entrano nelle puntate; il pubblico vota con una micro-donazione mirata (“dona con il voto”) per borse di studio e progetti locali.",
      "Tavole rotonde multimediali — video-dibattiti e saggi brevi — tra opinion leader della danza e di altri settori sul valore condiviso.",
      "Giornalisti culturali e generalisti coinvolti come firme editoriali e come giurati nelle tappe locali dei concorsi in diverse città italiane.",
    ],
    benefits: [
      "Ciclo di vita del prodotto editoriale drasticamente allungato e community fidelizzata nel tempo.",
      "Contenuti originali co-creati a costo contenuto: scuole e compagnie portano con sé i propri pubblici.",
      "Copertura mediatica locale e nazionale moltiplicata spontaneamente dai giornalisti-giurati.",
    ],
    engines: ["5.5", "5.7"],
    lever: "Orgoglio territoriale e mobilitazione del voto",
    kpis: [
      {
        label: "Tasso di ritenzione seriale (Episode Retention)",
        value: 64,
        suffix: "%",
        baseline: "Baseline serie digitali culturali: 22%",
        ratio: 0.64,
        baseRatio: 0.22,
        desc: "Lettori della prima puntata che aprono e completano almeno il 60% delle puntate successive.",
      },
      {
        label: "Partecipazione attiva & rassegna stampa locale",
        value: 48000,
        suffix: " voti",
        extra: "+ 140 articoli e servizi per stagione",
        baseline: "12 tappe territoriali · 48 borse di studio finanziate",
        ratio: 0.8,
        desc: "Voti e interazioni generati dai contest e articoli pubblicati dai giornalisti coinvolti nelle giurie.",
      },
    ],
    video: VIDEOS.stageGroup,
    gallery: [
      { id: P.borgoStreet, caption: "Puntata 4 · Il borgo come palcoscenico diffuso." },
      { id: P.audience, caption: "Le giurie locali: giornalisti e pubblico, insieme." },
      { id: P.classKids, caption: "Micro-documentari realizzati dalle scuole del territorio." },
    ],
    captions: [
      "Puntata 4 — Il teatro che non c’era: una palestra diventa palcoscenico.",
      "Dodici città, dodici giurie, un’unica stagione.",
      "Chi vota, dona: ogni voto sostiene una borsa di studio locale.",
      "Trova il dettaglio nascosto: la caccia continua nella prossima puntata.",
    ],
  },
  {
    id: "3.3",
    domain: "A",
    short: "Sponsor & Territori",
    title: "Sponsorizzazioni Private e Partnership con Enti Pubblici Territoriali",
    claim: "Trasformare il libro in un veicolo di reputazione per i brand privati e di valorizzazione per Regioni e Comuni.",
    editorialTitle: "Geografie della Danza e dell’Eccellenza",
    editorial:
      "Edizioni speciali tematiche o territoriali — la danza nei borghi storici e nei teatri delle Marche, oppure un dossier su benessere, postura, estetica e sostenibilità nel corpo in movimento — in cui il territorio o il tema affine al brand viene esplorato con rigore giornalistico, reportage fotografici e audio-guide d’autore.",
    publicValue: "Reportage e audio-guide d’autore su borghi, teatri e temi legati al corpo in movimento.",
    partnerValue: "Accesso legittimato ai database di aziende ed enti, posizionamento di pregio.",
    media: [
      { kind: "gallery", label: "Reportage fotografico nei borghi", meta: "64 foto" },
      { kind: "audio", label: "Audio-guide d’autore", meta: "11 tracce" },
      { kind: "text", label: "Dossier benessere e postura", meta: "5 capitoli" },
      { kind: "video", label: "Ritratti di territorio", meta: "8 min" },
    ],
    activities: [
      "Pacchetti di cultural sponsorship: il brand sostiene un capitolo tematico coerente con i propri valori e ottiene il diritto di distribuirlo gratuitamente come omaggio esclusivo a clienti (CRM) e prospect.",
      "Edizioni territoriali co-progettate con Unioni di Comuni e Regioni: patrocinio istituzionale, licenze per cittadini e turisti, diffusione coordinata su newsletter e portali dell’ente.",
    ],
    benefits: [
      "Monetizzazione scalabile che supera di ordini di grandezza la marginalità della vendita al dettaglio.",
      "Accesso diretto e legittimato ai database proprietari di aziende ed enti pubblici.",
      "Sponsor associati a un prodotto culturale di pregio, non a banner pubblicitari invasivi.",
    ],
    engines: ["5.1", "5.4"],
    lever: "Benefit gratuito per clienti e cittadini",
    kpis: [
      {
        label: "Tasso di riscatto sui database partner",
        value: 27,
        suffix: "%",
        baseline: "Baseline DEM promozionale: 3%",
        ratio: 0.675,
        baseRatio: 0.075,
        desc: "Clienti o cittadini che scaricano o aprono l’ebook tramite i canali di distribuzione dello sponsor o dell’ente.",
      },
      {
        label: "Tempo medio sul contenuto sponsorizzato",
        value: 11.5,
        decimals: 1,
        suffix: " min",
        baseline: "Baseline advertorial: 0,8 min",
        ratio: 0.77,
        baseRatio: 0.053,
        desc: "Minuti medi trascorsi nei moduli sostenuti dal partner: indicatore diretto di brand affinity.",
      },
    ],
    video: VIDEOS.oldHouseLong,
    gallery: [
      { id: P.borgoDusk, caption: "Geografie della danza: i borghi al tramonto, prima dello spettacolo." },
      { id: P.hilltown, caption: "Itinerari d’autore tra colline, teatri storici e piazze." },
      { id: P.shoesFeet, caption: "Postura ed equilibrio: il dossier sul corpo in movimento." },
    ],
    captions: [
      "Il borgo si accende quando il sipario si apre in piazza.",
      "Teatri storici e borghi: una rete di palcoscenici diffusi.",
      "Postura, respiro, equilibrio: la scienza del corpo che danza.",
      "Ascolta il territorio, passo dopo passo.",
    ],
  },
  {
    id: "3.4",
    domain: "A",
    short: "Festival & Istituzioni",
    title: "Alleanze con Grandi Istituzioni Culturali ed Earned Media",
    claim: "Usare la forza editoriale come chiave d’accesso a festival e istituzioni prestigiose.",
    editorialTitle: "Quaderni d’Autore e Diari di Festival",
    editorial:
      "Speciali monografici dedicati alle grandi rassegne internazionali: interviste inedite ai coreografi ospiti, saggi critici sugli spettacoli in cartellone, archivi fotografici storici e clip di prove commentate. Un approfondimento d’autore che accompagna il pubblico prima, durante e dopo il festival.",
    publicValue: "Interviste inedite, saggi critici e prove commentate dei grandi festival.",
    partnerValue: "Halo effect istituzionale, earned media e accesso ai vertici decisionali.",
    media: [
      { kind: "video", label: "Prove commentate", meta: "6 clip" },
      { kind: "text", label: "Interviste inedite ai coreografi", meta: "9 interviste" },
      { kind: "gallery", label: "Archivio fotografico storico", meta: "120 foto" },
      { kind: "text", label: "Saggi critici sul cartellone", meta: "7 saggi" },
    ],
    activities: [
      "Partnership editoriale a costo zero per l’ente: la startup opera come editore indipendente che produce e distribuisce approfondimenti dedicati al programma del festival.",
      "In cambio della copertura editoriale qualificata, distribuzione dell’ebook nella mailing list ufficiale e sui canali social dell’istituzione.",
      "La credibilità della collaborazione diventa leva di go-to-market per presentare all’istituzione — e alla sua rete — i servizi tecnologici e strategici della startup.",
    ],
    benefits: [
      "Trasferimento immediato di autorevolezza (halo effect) dall’istituzione storica alla startup.",
      "Earned media e reach qualificata di appassionati, mecenati e addetti ai lavori, difficilmente raggiungibili con l’advertising.",
      "Canali relazionali diretti con i vertici decisionali del settore culturale.",
    ],
    engines: ["5.1", "5.4"],
    lever: "Halo effect e approfondimento d’autore",
    kpis: [
      {
        label: "Earned Media Value & reach istituzionale",
        value: 420000,
        prefix: "€",
        extra: "350.000 utenti unici raggiunti",
        baseline: "Stima per singolo speciale istituzionale",
        ratio: 0.7,
        desc: "Valore mediatico stimato e utenti unici raggiunti attraverso newsletter, social e sito dell’istituzione partner.",
      },
      {
        label: "Conversione relazionale (pipeline B2B)",
        value: 45,
        suffix: " contatti",
        extra: "12 trattative aperte per speciale",
        baseline: "Tasso di conversione in trattativa: 27%",
        ratio: 0.6,
        desc: "Nuovi contatti istituzionali e trattative commerciali generate a valle della pubblicazione dello speciale.",
      },
    ],
    video: VIDEOS.stageDark,
    gallery: [
      { id: P.redCurtain, caption: "Il sipario prima della prima: il diario di festival comincia qui." },
      { id: P.boxes, caption: "Archivi fotografici storici dei palchi e delle sale." },
      { id: P.audience, caption: "Il pubblico del festival, raggiunto con i canali ufficiali." },
    ],
    captions: [
      "Diario di festival, giorno 3: la prova generale comincia al tramonto.",
      "Il coreografo racconta il gesto che non è mai andato in scena.",
      "Dall’archivio: decenni di fotografie di sala.",
      "Il programma di sala diventa un portale: inquadra il QR.",
    ],
  },
  {
    id: "3.5",
    domain: "A",
    short: "Stampa Phygital",
    title: "Sinergia con l’Editoria a Stampa: Allegati e Collezionabili",
    claim: "Unire la capillarità e l’autorevolezza della carta stampata con l’interattività del digitale.",
    editorialTitle: "La Biblioteca della Danza Contemporanea",
    editorial:
      "Una collana di fascicoli e inserti a stampa d’autore — ritratti di grandi maestri, storia dei balletti iconici, guide alla visione degli spettacoli — progettati in formato phygital: ogni pagina integra QR code editoriali che aprono video-analisi, estratti coreografici e contenuti multimediali estesi sull’ebook.",
    publicValue: "Fascicoli collezionabili in cui ogni pagina apre video-analisi ed estratti coreografici.",
    partnerValue: "Visibilità di massa per l’opera; vendite e fidelizzazione per gli editori.",
    media: [
      { kind: "text", label: "Fascicoli collezionabili", meta: "12 uscite" },
      { kind: "video", label: "Video-analisi via QR", meta: "48 clip" },
      { kind: "gallery", label: "Ritratti dei maestri", meta: "24 tavole" },
      { kind: "text", label: "Guide alla visione", meta: "10 guide" },
    ],
    activities: [
      "Accordi di co-edizione o distribuzione con quotidiani locali e nazionali, settimanali, mensili e riviste specialistiche di danza e spettacolo.",
      "L’opera come allegato collezionabile in edicola o come benefit digitale riservato agli abbonati della testata.",
      "Un ponte fluido dalla carta al digitale: il lettore occasionale di edicola diventa utente registrato della piattaforma.",
    ],
    benefits: [
      "Visibilità massiva e legittimazione immediata presso il pubblico generalista e gli addetti ai lavori.",
      "Un contenuto innovativo e collezionabile che aiuta gli editori tradizionali ad aumentare vendite e fidelizzazione.",
    ],
    engines: ["5.4", "5.3"],
    lever: "Collezionabilità e ponte carta-video",
    kpis: [
      {
        label: "Tasso di attivazione phygital (QR-to-Digital)",
        value: 14,
        suffix: "%",
        baseline: "Baseline QR su stampa: 4%",
        ratio: 0.56,
        baseRatio: 0.16,
        desc: "Copie cartacee distribuite che generano almeno un accesso effettivo ai contenuti multimediali.",
      },
      {
        label: "Tiratura e diffusione complessiva",
        value: 180000,
        suffix: " copie",
        extra: "copie e abbonati esposti all’inserto",
        baseline: "4 testate partner: 2 nazionali, 2 locali",
        ratio: 0.72,
        desc: "Numero totale di copie o abbonati esposti all’inserto sulle testate partner.",
      },
    ],
    video: VIDEOS.soloBW,
    gallery: [
      { id: P.newspaper, caption: "L’inserto in edicola: ogni pagina è un portale." },
      { id: P.magazines, caption: "Fascicoli collezionabili, dalla carta allo schermo." },
      { id: P.shoesStage, caption: "Guide alla visione: il dettaglio che sulla carta non si muove." },
    ],
    captions: [
      "Il maestro sulla carta, il movimento sullo schermo.",
      "Inquadra la pagina: la variazione riprende da qui.",
      "Storia dei balletti iconici, fascicolo 7 di 12.",
      "La carta non finisce: continua in video.",
    ],
  },
  {
    id: "3.6",
    domain: "A",
    short: "Inchieste & Pagina Bianca",
    title: "Opinion Leader, Format Inchiesta e Advocacy (“La Pagina Bianca”)",
    claim: "Posizionare il libro come piattaforma di dibattito pubblico e di pressione costruttiva sul sistema culturale.",
    editorialTitle: "Stati Generali della Danza: Inchieste e Prese di Posizione",
    editorial:
      "Dossier giornalistici rigorosi sui nodi strutturali del settore — sostenibilità economica, tutela e carriere dei danzatori, riforma dei finanziamenti, accesso alla cultura — con sezioni firmate da autorevoli opinion leader e uno spazio istituzionale dedicato al confronto diretto con i decisori pubblici.",
    publicValue: "Inchieste rigorose, video-editoriali d’autore e il confronto diretto con i decisori.",
    partnerValue: "Una voce autorevole riconosciuta e una forte risonanza mediatica organica.",
    media: [
      { kind: "text", label: "Dossier d’inchiesta", meta: "4 dossier" },
      { kind: "video", label: "Video-editoriali d’autore", meta: "10 firme" },
      { kind: "text", label: "“La Pagina Bianca”", meta: "1 spazio istituzionale" },
      { kind: "gallery", label: "Infografiche sui dati di settore", meta: "18 tavole" },
    ],
    activities: [
      "Format Inchiesta: coreografi, economisti della cultura, direttori di teatro e giuristi firmano una pagina multimediale — testo e video-editoriale breve — con dati e proposte concrete.",
      "Format Advocacy “La Pagina Bianca”: domande chiare e costruttive a un’istituzione chiave, con data di chiusura comunicata in anticipo; in caso di mancata risposta la pagina resta bianca, con nota esplicita.",
      "Ufficio stampa mirato verso testate nazionali, agenzie di stampa e programmi di approfondimento culturale.",
    ],
    benefits: [
      "Da semplice operatore di mercato a voce autorevole e osservatorio riconosciuto del settore.",
      "Risonanza mediatica organica e dibattito social generati dalla forza simbolica della pagina bianca.",
    ],
    engines: ["5.3", "5.5"],
    lever: "Dibattito pubblico e pressione civica",
    kpis: [
      {
        label: "Share of voice & citazioni media",
        value: 85,
        suffix: " riprese",
        extra: "2.400 menzioni social · 9 inviti istituzionali",
        baseline: "Per singolo ciclo d’inchiesta",
        ratio: 0.68,
        desc: "Riprese giornalistiche, menzioni social di stakeholder di settore e inviti a tavoli o convegni istituzionali.",
      },
      {
        label: "Tasso di risposta istituzionale",
        value: 60,
        suffix: "%",
        baseline: "Baseline interpellanze pubbliche: 15%",
        ratio: 0.6,
        baseRatio: 0.15,
        desc: "Decisori pubblici interpellati che forniscono una presa di posizione ufficiale, prima o dopo la pubblicazione.",
      },
    ],
    video: VIDEOS.stageBW,
    gallery: [
      { id: P.scalaStage, caption: "Stati Generali: il confronto con i decisori pubblici." },
      { id: P.audienceLights, caption: "Il dibattito che si accende in sala e sui social." },
      { id: P.stageLights, caption: "Dati, proposte, firme: l’inchiesta sotto i riflettori." },
    ],
    captions: [
      "Quanto guadagna un danzatore a trent’anni? Abbiamo chiesto i dati.",
      "Dieci firme, dieci proposte concrete per il sistema danza.",
      "Questa pagina potrebbe restare bianca. Ecco perché.",
      "Il dialogo resta aperto: la risposta può arrivare anche dopo la stampa.",
    ],
  },
  {
    id: "4.1",
    domain: "B",
    short: "Living Archive",
    title: "Edizione “Living Archive” e Dossier di Settore",
    claim: "Trasformare i capitoli enciclopedici in una risorsa permanente di riferimento per il settore.",
    editorialTitle: "Annuario Dinamico delle Arti Performative",
    editorial:
      "Un archivio vivo e aggiornabile che riunisce schede storiche, case study gestionali, analisi delle tendenze internazionali, video-interviste tecniche e repertori catalogati per stili e territori. Una biblioteca di riferimento che cresce insieme al settore, trimestre dopo trimestre.",
    publicValue: "Schede storiche, case study e video-interviste in un archivio sempre aggiornato.",
    partnerValue: "Ricavi ricorrenti da licenze e un asset di conoscenza proprietario.",
    media: [
      { kind: "text", label: "Schede storiche", meta: "1.200 voci" },
      { kind: "text", label: "Case study gestionali", meta: "40 casi" },
      { kind: "video", label: "Video-interviste tecniche", meta: "60 interviste" },
      { kind: "map", label: "Repertori per stili e territori", meta: "20 regioni" },
    ],
    activities: [
      "Capitoli enciclopedici strutturati in un database editoriale consultabile e aggiornato ogni trimestre.",
      "Licenze d’accesso annuali multi-utente per università, biblioteche, accademie, osservatori culturali e associazioni di categoria.",
    ],
    benefits: [
      "Ricavi ricorrenti — abbonamenti e licenze B2B — svincolati dalla singola campagna di lancio.",
      "Un asset proprietario di conoscenza unico nel panorama nazionale.",
    ],
    engines: ["5.2", "5.3"],
    lever: "Autorevolezza scientifica e utilità B2B",
    kpis: [
      {
        label: "Ricavo ricorrente annuale da licenze (ARR)",
        value: 240000,
        prefix: "€",
        extra: "80 licenze istituzionali × €3.000",
        baseline: "Obiettivo a 24 mesi: €400.000",
        ratio: 0.6,
        desc: "Valore complessivo degli abbonamenti istituzionali e accademici attivi.",
      },
      {
        label: "Tasso di rinnovo annuale",
        value: 85,
        suffix: "%",
        baseline: "Soglia di sostenibilità: 70%",
        ratio: 0.85,
        baseRatio: 0.7,
        desc: "Enti e biblioteche che rinnovano l’accesso all’archivio nell’anno successivo.",
      },
    ],
    video: VIDEOS.oldHouseLong,
    gallery: [
      { id: P.scala, caption: "Annuario dinamico: schede storiche delle grandi sale." },
      { id: P.boxes, caption: "Case study gestionali, catalogati per territori." },
      { id: P.tailorCut, caption: "Video-interviste tecniche con i mestieri della scena." },
    ],
    captions: [
      "Aggiornamento trimestrale: 86 nuove voci, 4 nuovi case study.",
      "Dal barocco al contemporaneo, catalogato per stili e territori.",
      "Come si gestisce una compagnia di dodici danzatori? Un caso di studio.",
      "L’archivio che cresce con il settore.",
    ],
  },
  {
    id: "4.2",
    domain: "B",
    short: "Kit Didattico",
    title: "Kit Didattico Interattivo per Scuole, Conservatori e Accademie",
    claim: "Portare la cultura della danza nell’educazione formale con strumenti multimediali.",
    editorialTitle: "Capire il Movimento: Guida Multimediale per Studenti e Docenti",
    editorial:
      "Moduli educativi che abbinano video-analisi passo-passo di coreografie storiche e contemporanee, glossari illustrati, approfondimenti su musica e storia dell’arte e tracce per laboratori in classe. Uno strumento pensato per insegnare il movimento come linguaggio, cultura e cittadinanza.",
    publicValue: "Video-analisi passo-passo, glossari illustrati e tracce per laboratori in classe.",
    partnerValue: "Accesso al mercato EdTech-culturale e formazione del pubblico di domani.",
    media: [
      { kind: "video", label: "Video-analisi passo-passo", meta: "30 lezioni" },
      { kind: "text", label: "Glossario illustrato", meta: "350 voci" },
      { kind: "text", label: "Schede PCTO per docenti", meta: "24 schede" },
      { kind: "quiz", label: "Verifiche interattive", meta: "120 quiz" },
    ],
    activities: [
      "Pedagogisti e docenti di storia della danza nel comitato editoriale, per schede didattiche allineate ai programmi scolastici e ai percorsi PCTO.",
      "Adozioni multi-licenza presso istituti superiori, licei coreutici, conservatori e progetti educativi finanziati da fondazioni o bandi regionali.",
    ],
    benefits: [
      "Apertura del vasto mercato EdTech e culturale-scolastico, altamente finanziabile da enti pubblici e fondazioni.",
      "Formazione strutturale del pubblico di domani (audience development).",
    ],
    engines: ["5.1", "5.5"],
    lever: "Innovazione pedagogica e PCTO",
    kpis: [
      {
        label: "Istituti e classi adottanti",
        value: 320,
        suffix: " istituti",
        extra: "1.100 classi adottanti",
        baseline: "Obiettivo triennale: 500 istituti",
        ratio: 0.64,
        desc: "Scuole, licei coreutici e accademie che integrano il kit nei propri percorsi formativi.",
      },
      {
        label: "Tasso di completamento dei moduli didattici",
        value: 72,
        suffix: "%",
        baseline: "Baseline e-learning scolastico: 35%",
        ratio: 0.72,
        baseRatio: 0.35,
        desc: "Studenti e classi che completano i percorsi interattivi assegnati.",
      },
    ],
    video: VIDEOS.mirror,
    gallery: [
      { id: P.classTeacher, caption: "Capire il movimento: la lezione diventa multimediale." },
      { id: P.classKids, caption: "Laboratori in classe guidati da tracce video." },
      { id: P.classStudio, caption: "Video-analisi passo-passo per studenti e docenti." },
    ],
    captions: [
      "Lezione 7 — Il port de bras, rallentato cinque volte.",
      "Perché la Sagra della Primavera fece scandalo? La musica spiegata ai corpi.",
      "Dal glossario: “plié”, dal francese piegato.",
      "Ora tocca a voi: il laboratorio in classe.",
    ],
  },
  {
    id: "4.3",
    domain: "B",
    short: "Bandi & Audizioni",
    title: "Portale e Vetrina per Bandi, Residenze, Casting e Audizioni",
    claim: "Affiancare al valore culturale un’utilità pratica e ricorrente per i professionisti.",
    editorialTitle: "Bussola delle Opportunità e Storie di Carriera",
    editorial:
      "Una sezione viva che alterna interviste a direttori di residenze artistiche e guide pratiche per affrontare un’audizione internazionale a una bacheca multimediale curata di bandi, borse di studio, residenze e casting. Il luogo in cui la carriera di un danzatore trova orientamento e occasioni.",
    publicValue: "Interviste, guide pratiche e una bacheca curata di bandi, residenze e casting.",
    partnerValue: "Ritorni frequenti e una community verticale di professionisti.",
    media: [
      { kind: "text", label: "Bacheca bandi e casting", meta: "90+ call al mese" },
      { kind: "video", label: "Schede video delle residenze", meta: "35 residenze" },
      { kind: "text", label: "Guide all’audizione", meta: "12 guide" },
      { kind: "audio", label: "Storie di carriera", meta: "20 podcast" },
    ],
    activities: [
      "Un modulo aggiornabile dedicato alle call artistiche, con schede video di presentazione delle residenze e dei teatri ospitanti.",
      "Accordi con festival, fondazioni e compagnie per pubblicare in evidenza le call e raccogliere in modo strutturato candidature e portfolio.",
    ],
    benefits: [
      "Il libro diventa uno strumento di utilità frequente: i ritorni spontanei degli utenti professionali aumentano drasticamente.",
      "Una community verticalissima di danzatori, coreografi e operatori culturali.",
    ],
    engines: ["5.7", "5.1"],
    lever: "Utilità pratica urgente e passaparola",
    kpis: [
      {
        label: "Utenti attivi mensili di ritorno (Returning MAU)",
        value: 9500,
        suffix: " utenti",
        extra: "professionisti che tornano ogni mese",
        baseline: "Frequenza media: 3,2 visite al mese",
        ratio: 0.63,
        desc: "Professionisti che tornano regolarmente a consultare la sezione opportunità.",
      },
      {
        label: "Click-through sulle call",
        value: 18,
        suffix: "%",
        extra: "≈ 6.200 candidature l’anno",
        baseline: "Baseline bacheche generaliste: 4%",
        ratio: 0.72,
        baseRatio: 0.16,
        desc: "Interazioni qualificate generate verso bandi, residenze e audizioni ospitate.",
      },
    ],
    video: VIDEOS.mirror,
    gallery: [
      { id: P.classMirror, caption: "Prepararsi a un’audizione: guide pratiche e storie di carriera." },
      { id: P.shoesFloor, caption: "Residenze artistiche: schede video dei luoghi ospitanti." },
      { id: P.stageLights, caption: "Bandi e casting curati, inoltrabili con un tap." },
    ],
    captions: [
      "Audizione all’estero: cosa portare, cosa evitare.",
      "La residenza tra gli ulivi che accoglie sei coreografi l’anno.",
      "Scadenza tra 5 giorni: inoltra la call a un collega.",
      "Storie di carriera: dal corpo di ballo alla direzione artistica.",
    ],
  },
  {
    id: "4.4",
    domain: "B",
    short: "Cultural Tourism",
    title: "Progetto “Cultural Tourism & Itinerari”",
    claim: "Connettere la narrazione della danza alla scoperta lenta e sostenibile dei territori.",
    editorialTitle: "Sulle Tracce della Danza: Itinerari tra Teatri Storici, Borghi e Festival",
    editorial:
      "Guide esperienziali multimediali con mappe geolocalizzate, audio-racconti da ascoltare in cammino, interviste agli artigiani del posto e calendari stagionali degli spettacoli dal vivo sul territorio. Un invito a viaggiare lentamente, guardando danzare i luoghi.",
    publicValue: "Itinerari geolocalizzati, audio-racconti in cammino e calendari degli spettacoli.",
    partnerValue: "Accesso ai budget del turismo culturale e ai viaggiatori internazionali.",
    media: [
      { kind: "map", label: "Mappe geolocalizzate", meta: "18 itinerari" },
      { kind: "audio", label: "Audio-racconti in cammino", meta: "42 tappe" },
      { kind: "video", label: "Interviste agli artigiani", meta: "15 ritratti" },
      { kind: "text", label: "Calendario degli spettacoli", meta: "stagionale" },
    ],
    activities: [
      "Collaborazioni con DMO (Destination Management Organization), consorzi turistici, reti di hotel di charme e operatori di turismo culturale.",
      "Il libro come guida digitale di benvenuto co-brandizzata per gli ospiti delle strutture ricettive e i visitatori della destinazione.",
    ],
    benefits: [
      "Accesso ai budget del turismo culturale e del destination marketing, tipicamente più ampi di quelli del solo spettacolo dal vivo.",
      "Pubblico allargato dagli appassionati di danza ai viaggiatori culturali italiani e internazionali.",
    ],
    engines: ["5.4", "5.1"],
    lever: "Scoperta esperienziale del territorio",
    kpis: [
      {
        label: "Accessi per destinazione turistica",
        value: 48000,
        suffix: " attivazioni",
        extra: "10 destinazioni · 4.800 ciascuna",
        baseline: "QR/NFC in 220 strutture partner",
        ratio: 0.6,
        desc: "Viaggiatori che attivano la guida tramite strutture ricettive o info-point partner.",
      },
      {
        label: "Click verso esperienze e biglietterie locali",
        value: 22,
        suffix: "%",
        extra: "≈ 10.500 prenotazioni generate",
        baseline: "Baseline guide turistiche digitali: 6%",
        ratio: 0.733,
        baseRatio: 0.2,
        desc: "Lettori che passano dall’itinerario alla prenotazione di spettacoli, visite o servizi sul territorio.",
      },
    ],
    video: VIDEOS.oldHouse,
    gallery: [
      { id: P.towersNight, caption: "Sulle tracce della danza: i borghi si accendono di sera." },
      { id: P.borgoStreet, caption: "Audio-racconti da ascoltare passeggiando." },
      { id: P.hilltown, caption: "Itinerari geolocalizzati tra teatri storici e festival." },
    ],
    captions: [
      "Tappa 3 — Il teatro all’italiana più piccolo del borgo.",
      "Ascolta mentre cammini: il calzolaio che risuolava le scarpette.",
      "Stasera in piazza: il calendario degli spettacoli è a un tap.",
      "Viaggiare lenti, guardare danzare.",
    ],
  },
  {
    id: "4.5",
    domain: "B",
    short: "Tech & Craft",
    title: "Format “Behind the Scenes” e Tech/Craft Showcase",
    claim: "Valorizzare la filiera tecnica, tecnologica e scientifica che rende possibile lo spettacolo.",
    editorialTitle: "L’Ingegneria dell’Invisibile",
    editorial:
      "Reportage multimediali e video-esplosi interattivi dedicati a ciò che il pubblico non vede: illuminotecnica, acustica, pavimentazioni tecniche, biomeccanica e fisioterapia del danzatore, materiali tessili innovativi e tecnologie digitali per la scena. La bellezza che accade dietro le quinte, raccontata con taglio divulgativo.",
    publicValue: "Video-esplosi interattivi su luce, acustica, biomeccanica e materiali della scena.",
    partnerValue: "Sponsor tecnici ad alta capacità di spesa e lead B2B qualificati.",
    media: [
      { kind: "video", label: "Video-esplosi interattivi", meta: "9 esplosi" },
      { kind: "video", label: "Reportage dietro le quinte", meta: "22 min" },
      { kind: "text", label: "Schede tecnico-scientifiche", meta: "14 schede" },
      { kind: "gallery", label: "Materiali e prototipi", meta: "40 foto" },
    ],
    activities: [
      "Selezione di aziende eccellenti della filiera tecnica, medicale-sportiva e tecnologica interessate a raccontare il proprio know-how attraverso casi d’uso reali e di alto prestigio estetico.",
      "Capitoli tecnico-scientifici in cui l’innovazione del partner è mostrata in azione, nel contesto autentico della preparazione artistica, con taglio divulgativo e mai pubblicitario.",
    ],
    benefits: [
      "Sponsor tecnici B2B e aziende tech/health ad alta capacità di spesa, normalmente lontane dalle sponsorizzazioni culturali tradizionali.",
      "Un valore educativo e divulgativo dell’opera ancora più ricco.",
    ],
    engines: ["5.4", "5.2"],
    lever: "Prestigio tecnologico e casi d’uso reali",
    kpis: [
      {
        label: "Valore delle sponsorizzazioni tecniche",
        value: 360000,
        prefix: "€",
        extra: "di cui 30% in fornitura tecnica (barter)",
        baseline: "Obiettivo a 24 mesi: €500.000",
        ratio: 0.72,
        desc: "Ricavo diretto o valore di fornitura tecnica generato dai partner di filiera.",
      },
      {
        label: "Lead B2B qualificati",
        value: 640,
        suffix: " lead",
        extra: "da teatri, scuole e professionisti",
        baseline: "Costo per lead stimato: €18",
        ratio: 0.64,
        desc: "Richieste di contatto o approfondimento verso i partner tecnici generate dai lettori.",
      },
    ],
    video: VIDEOS.stageDark,
    gallery: [
      { id: P.spotlights, caption: "L’ingegneria dell’invisibile: la luce che racconta." },
      { id: P.beams, caption: "Illuminotecnica e acustica, in video-esplosi interattivi." },
      { id: P.shoesStage, caption: "Biomeccanica e materiali: ciò che sostiene il gesto." },
    ],
    captions: [
      "Un pavimento che restituisce il salto: anatomia di un linoleum tecnico.",
      "La luce non illumina: racconta.",
      "Biomeccanica del grand jeté, fotogramma per fotogramma.",
      "Ciò che non vedi è ciò che rende possibile lo spettacolo.",
    ],
  },
  {
    id: "4.6",
    domain: "B",
    short: "Zero-Party Data",
    title: "Raccolta Dati e Insight di Mercato (Zero-Party Data)",
    claim: "Trasformare la lettura interattiva in conoscenza strategica sul pubblico della danza.",
    editorialTitle: "Ritratti del Pubblico: Sondaggi d’Autore e Mappe dei Gusti",
    editorial:
      "Micro-interazioni editoriali integrate con eleganza tra i capitoli — test come “Quale stile coreografico racconta la tua estetica?”, sondaggi sulle abitudini di fruizione culturale, mappe partecipative dei desideri del pubblico — i cui risultati aggregati tornano ai lettori sotto forma di infografiche editoriali.",
    publicValue: "Test d’autore e mappe dei gusti, restituiti come infografiche editoriali.",
    partnerValue: "Un patrimonio di dati proprietari e report di mercato esclusivi.",
    media: [
      { kind: "quiz", label: "Test “La tua estetica coreografica”", meta: "8 profili" },
      { kind: "quiz", label: "Sondaggi d’autore", meta: "15 sondaggi" },
      { kind: "map", label: "Mappa partecipativa dei desideri", meta: "nazionale" },
      { kind: "gallery", label: "Infografiche restituite", meta: "12 tavole" },
    ],
    activities: [
      "Punti di raccolta di dati dichiarativi (zero-party) trasparenti e conformi al GDPR, motivati dalla curiosità del lettore e dalla co-creazione di report di settore.",
      "Analisi dei dati aggregati per orientare lo sviluppo dei prodotti e redigere report di mercato esclusivi per sponsor, teatri e istituzioni.",
    ],
    benefits: [
      "Un patrimonio informativo proprietario in un settore spesso privo di dati aggiornati sui comportamenti del pubblico.",
      "Valore percepito delle proposte commerciali verso sponsor e partner istituzionali drasticamente aumentato.",
    ],
    engines: ["5.6", "5.3"],
    lever: "Curiosità identitaria e benchmark",
    kpis: [
      {
        label: "Completamento dei micro-sondaggi",
        value: 58,
        suffix: "%",
        baseline: "Baseline survey online: 12%",
        ratio: 0.58,
        baseRatio: 0.12,
        desc: "Lettori che rispondono volontariamente ai moduli interattivi.",
      },
      {
        label: "Profili segmentati e consensati",
        value: 42000,
        suffix: " profili",
        extra: "preferenze tematiche e territoriali",
        baseline: "Opt-in progressivo: 46%",
        ratio: 0.7,
        desc: "Utenti unici con preferenze profilate nel pieno rispetto della normativa privacy.",
      },
    ],
    video: VIDEOS.stageGroup,
    gallery: [
      { id: P.audience, caption: "Ritratti del pubblico: chi siamo quando guardiamo danzare." },
      { id: P.audienceLights, caption: "Mappe dei gusti costruite insieme ai lettori." },
      { id: P.newspaper, caption: "Infografiche editoriali restituite alla community." },
    ],
    captions: [
      "Che danzatore saresti? Otto profili estetici, un test d’autore.",
      "I vostri desideri, mappati: dove vorreste vedere danzare?",
      "Ogni risposta torna a voi come infografica.",
      "Dati dichiarati, consensati, restituiti.",
    ],
  },
  {
    id: "4.7",
    domain: "B",
    short: "White-Label",
    title: "Edizioni White-Label o Co-Branded “Chiavi in Mano”",
    claim: "Scalare l’architettura del libro trasformandola in un prodotto replicabile per altri settori creativi.",
    editorialTitle: "Piattaforma Editoriale per le Arti e la Cultura",
    editorial:
      "Lo stesso formato multimediale — struttura a capitoli, video, mappe, referral, inchieste — declinato su temi richiesti da committenti terzi: la stagione di un teatro lirico, il centenario di una fondazione, la rassegna di un museo, un progetto di design o di musica.",
    publicValue: "Lo stesso linguaggio d’autore applicato a lirica, musei, design e musica.",
    partnerValue: "Margini elevati da tecnologia già ammortizzata e leadership di settore.",
    media: [
      { kind: "text", label: "Template editoriale modulare", meta: "13 moduli" },
      { kind: "video", label: "Case: il centenario di una fondazione", meta: "4 min" },
      { kind: "text", label: "Analytics e referral integrati", meta: "dashboard" },
      { kind: "gallery", label: "Edizioni attive", meta: "8 committenti" },
    ],
    activities: [
      "Standardizzazione del template tecnologico, del flusso redazionale e dei moduli di analytics sviluppati per il libro sulla danza.",
      "Infrastruttura proposta come servizio editoriale-tecnologico chiavi in mano — white-label o co-branded — a fondazioni, festival, musei e grandi imprese culturali.",
    ],
    benefits: [
      "Ricavi diversificati con margini elevati grazie al riutilizzo di tecnologia e know-how già ammortizzati.",
      "Posizionamento come leader tecnologico-editoriale per l’intero comparto delle industrie creative.",
    ],
    engines: ["5.2", "5.6"],
    lever: "Replicabilità comprovata e scalabilità",
    kpis: [
      {
        label: "Margine operativo per edizione replicata",
        value: 62,
        suffix: "%",
        extra: "ricavo pari a 2,6× il costo marginale",
        baseline: "Baseline produzione editoriale ex novo: 18%",
        ratio: 0.62,
        baseRatio: 0.18,
        desc: "Rapporto tra ricavo della commessa white-label e costo marginale di produzione e personalizzazione.",
      },
      {
        label: "Commesse extra-danza attivate",
        value: 8,
        suffix: " commesse",
        extra: "in 24 mesi",
        baseline: "Lirica, musei, design, musica",
        ratio: 0.67,
        desc: "Edizioni realizzate per settori culturali o istituzionali affini nell’arco di 12–24 mesi.",
      },
    ],
    video: VIDEOS.stageBW,
    gallery: [
      { id: P.scala, caption: "Un formato replicabile per la lirica e le grandi sale." },
      { id: P.redCurtain, caption: "Centenari, stagioni, rassegne: la stessa architettura." },
      { id: P.spotlights, caption: "Analytics e referral integrati in ogni edizione." },
    ],
    captions: [
      "Stessa architettura, nuova voce: la stagione di un teatro lirico.",
      "Un centenario raccontato in tredici capitoli.",
      "Dal template alla pubblicazione in otto settimane.",
      "Powered by Innovation Multimedial.",
    ],
  },
];

/* =========================================================================
   7 MOTORI DI DIFFUSIONE
   ========================================================================= */

export const engines: Engine[] = [
  {
    id: "5.1",
    short: "Partner-Led",
    mapTag: "Co-marketing di rete",
    name: "Partner-Led Distribution & Audience Borrowing",
    tagline: "Co-marketing di rete",
    what: "L’uso strategico dei canali proprietari — newsletter, portali soci, CRM, app — di associazioni culturali, festival, sindacati di categoria, reti di scuole e aziende sponsor.",
    how: "Landing co-brandizzata con URL dedicato (es. libro.it/nome-festival) ed ex-libris digitale: il partner invia l’opera ai propri iscritti come regalo culturale esclusivo, non come pubblicità di terzi.",
    kpis: [
      { label: "Partner Redemption Rate", value: "27%" },
      { label: "CAC effettivo", value: "€0,40" },
    ],
  },
  {
    id: "5.2",
    short: "ABM",
    mapTag: "Decisori chiave",
    name: "Account-Based Content Marketing & “Trojan Horse” Seeding",
    tagline: "Micro-edizioni per i decisori",
    what: "Distribuzione chirurgica di micro-edizioni iper-personalizzate a pochi decisori chiave: presidenti di fondazioni bancarie, assessori alla cultura, direttori marketing dei grandi sponsor.",
    how: "Prima di ogni appuntamento, il decisore riceve un cofanetto phygital o un accesso VIP a un capitolo che contiene già un’analisi dedicata al suo territorio o settore: il libro legittima e apre la porta.",
    kpis: [
      { label: "Account Engagement Score", value: "78/100" },
      { label: "Meeting Conversion Rate", value: "34%" },
    ],
  },
  {
    id: "5.3",
    short: "Hub-and-Spoke",
    mapTag: "Syndication",
    name: "Content Atomization & Modello Hub-and-Spoke",
    tagline: "Syndication multipiattaforma",
    what: "Il libro è l’hub centrale ad alta densità da cui si estraggono decine di micro-contenuti, adattati ai linguaggi delle piattaforme e ceduti in syndication a testate e partner.",
    how: "Da ogni capitolo: 3 clip verticali da 45″, 2 caroselli infografici per LinkedIn, 1 estratto per riviste culturali partner e 1 pillola audio. Ogni asset invita all’opera integrale.",
    kpis: [
      { label: "Hub Referral Traffic", value: "31%" },
      { label: "Content Amplification Ratio", value: "12×" },
    ],
  },
  {
    id: "5.4",
    short: "Phygital",
    mapTag: "Luoghi fisici",
    name: "Phygital Proximity Triggers",
    tagline: "Ingressi contestuali nel mondo reale",
    what: "Luoghi fisici ad alta densità emotiva trasformati in punti d’accesso immediati al libro digitale.",
    how: "Totem, segnalibri d’autore, tag NFC e QR contestuali nei foyer prima dello spettacolo, nelle scuole di danza, negli inserti in edicola, nelle camere degli hotel partner e negli stand fieristici.",
    kpis: [
      { label: "Scan-to-Read Conversion", value: "41%" },
      { label: "Punti fisici attivi", value: "650" },
    ],
  },
  {
    id: "5.5",
    short: "Ego-Bait",
    mapTag: "Ambassador",
    name: "Creator, Juror & Micro-Ambassador Loops",
    tagline: "Ego-bait positivo e advocacy",
    what: "Coreografi intervistati, artigiani, giornalisti-giurati, docenti e scuole partecipanti diventano distributori entusiasti dell’opera.",
    how: "A ogni protagonista un media kit personalizzato: grafiche con la propria citazione, badge ufficiale “Membro della Giuria / Autore Ospite” e link tracciato alla propria pagina.",
    kpis: [
      { label: "Ambassador Share Rate", value: "68%" },
      { label: "Traffico da link personali", value: "22%" },
    ],
  },
  {
    id: "5.6",
    short: "Viral / PLG",
    mapTag: "Sblocco & referral",
    name: "Gated Value-Exchange & Viral Referral / PLG Loops",
    tagline: "Sblocco progressivo e propagazione nativa",
    what: "Meccanismi che premiano l’azione dell’utente con ulteriore valore editoriale e trasformano ogni edizione in un vettore commerciale.",
    how: "Peer-to-peer unlock del Director’s Cut (3 inviti o una micro-donazione), social quiz con schede condivisibili, badge “Powered by” nel footer delle edizioni white-label.",
    kpis: [
      { label: "Viral Coefficient (K)", value: "1,35" },
      { label: "Progressive Opt-in Rate", value: "46%" },
    ],
  },
  {
    id: "5.7",
    short: "Dark Social",
    mapTag: "Chat private",
    name: "Dark Social & Niche Community Seeding",
    tagline: "Circolazione nelle chat private",
    what: "Ottimizzazione per la circolazione invisibile ma ad altissima conversione nelle chat private (WhatsApp, Telegram) e nelle community chiuse di professionisti.",
    how: "Ogni bando, scheda didattica o video-inchiesta ha un deep-link mobile-first con anteprima OpenGraph curata e il pulsante “Inoltra a un collega su WhatsApp”.",
    kpis: [
      { label: "Dark Social Traffic Share", value: "38%" },
      { label: "Deep-link inoltrati al mese", value: "14.000" },
    ],
  },
];

/* =========================================================================
   5 STAKEHOLDER (Sezione 7)
   ========================================================================= */

export const stakeholders: Stakeholder[] = [
  {
    id: "fondazioni",
    label: "Fondazioni ed Enti",
    lines: ["Fondazioni", "ed Enti"],
    filterLabel: "Sono una Fondazione / Ente",
    audience: "Fondazioni bancarie, Regioni, Comuni",
    editionTitle: "Edizione Mecenati & Territori",
    kind: "gothic",
    color: "#D4C7A6",
    ink: "#2E1A33",
    accent: "#E3D2A8",
    modules: ["3.1", "3.3", "4.2", "4.4"],
    engines: ["5.1", "5.2", "5.4"],
    message:
      "Sostieni la cultura e il territorio acquistando un’opera misurabile che entra nelle scuole, nei borghi e nei database cittadini.",
    benefits: [
      "Acquisti un bene culturale, non eroghi un contributo: licenze conformi alle regole di acquisto di beni e servizi.",
      "Prefazione istituzionale ed ex-libris digitale: la tua firma su un’opera d’autore, non su un banner.",
      "L’opera entra in 320 istituti e nei borghi del tuo territorio, con kit didattici e itinerari.",
      "Dashboard d’impatto: redemption, tempo di lettura, classi coinvolte, accessi per destinazione.",
    ],
    kpis: [
      { value: "€12.500", label: "valore medio per contratto" },
      { value: "320", label: "istituti scolastici raggiunti" },
      { value: "27%", label: "riscatto sui database" },
    ],
  },
  {
    id: "aziende",
    label: "Aziende e Brand",
    lines: ["Aziende", "e Brand"],
    filterLabel: "Sono un’Azienda / Brand",
    audience: "Sponsor privati, filiera Tech/Craft",
    editionTitle: "Edizione Brand & Filiera",
    kind: "romanesque",
    color: "#A43A46",
    ink: "#FFF4F1",
    accent: "#F2939A",
    modules: ["3.3", "4.5", "4.6"],
    engines: ["5.1", "5.4", "5.6"],
    message:
      "Trasforma la tua base clienti in una community culturale e raccogli insight proprietari con contenuti autentici, mai invasivi.",
    benefits: [
      "Un capitolo tematico coerente con i tuoi valori, firmato da autori indipendenti.",
      "Un omaggio culturale esclusivo per clienti e prospect: il tuo CRM diventa una community.",
      "QR e NFC in punti vendita, eventi e fiere: ingressi contestuali all’opera.",
      "Insight zero-party e lead B2B qualificati da teatri, scuole e professionisti.",
    ],
    kpis: [
      { value: "11,5 min", label: "tempo medio sul capitolo" },
      { value: "640", label: "lead B2B qualificati" },
      { value: "42.000", label: "profili zero-party" },
    ],
  },
  {
    id: "istituzioni",
    label: "Istituzioni e Media",
    lines: ["Istituzioni", "e Media"],
    filterLabel: "Sono un’Istituzione / Media",
    audience: "Festival, teatri, editori a stampa",
    editionTitle: "Edizione Festival & Media",
    kind: "classical",
    color: "#E8E4CF",
    ink: "#1F3A33",
    accent: "#ECE7D2",
    modules: ["3.4", "3.5", "3.6"],
    engines: ["5.1", "5.3", "5.4", "5.5"],
    message:
      "Amplifica la tua programmazione e il dibattito pubblico con un motore phygital, di content atomization e co-marketing a costo zero.",
    benefits: [
      "Speciali d’autore sul tuo festival o sulla tua stagione, a costo zero per l’ente.",
      "Allegati collezionabili e benefit per abbonati che aumentano vendite e fidelizzazione.",
      "Un motore di content atomization: clip, caroselli e pillole audio da ogni capitolo.",
      "Inchieste e “Pagina Bianca”: un ruolo da protagonista nel dibattito pubblico.",
    ],
    kpis: [
      { value: "€420k", label: "earned media value" },
      { value: "180.000", label: "copie e abbonati esposti" },
      { value: "85", label: "riprese stampa per ciclo" },
    ],
  },
  {
    id: "community",
    label: "Community Danza",
    lines: ["Community", "Danza"],
    filterLabel: "Faccio parte della Community",
    audience: "Scuole, compagnie, danzatori",
    editionTitle: "Edizione Community",
    kind: "balcony",
    color: "#8E9B8D",
    ink: "#18161A",
    accent: "#B9CDB7",
    modules: ["3.2", "4.1", "4.3"],
    engines: ["5.2", "5.5", "5.7"],
    message: "Racconta il tuo territorio, mobilita il tuo pubblico, accedi a bandi e archivi condivisibili con un tap.",
    benefits: [
      "Il tuo video-racconto o la tua coreografia diventano parte dell’opera.",
      "Contest con “dona con il voto”: il tuo pubblico ti sostiene e finanzia borse di studio.",
      "Bandi, residenze, casting e audizioni curati, inoltrabili su WhatsApp con un tap.",
      "Un archivio vivo di schede, case study e video-interviste per crescere come professionista.",
    ],
    kpis: [
      { value: "48.000", label: "voti nei contest territoriali" },
      { value: "9.500", label: "professionisti di ritorno al mese" },
      { value: "64%", label: "ritenzione seriale" },
    ],
  },
  {
    id: "tecnologia",
    label: "Tecnologia & White-Label",
    lines: ["Tecnologia &", "White-Label"],
    filterLabel: "Cerco un formato White-Label",
    audience: "Imprese creative, musei, altri settori",
    editionTitle: "Edizione Piattaforma",
    kind: "pediment",
    color: "#E36F5A",
    ink: "#241A2E",
    accent: "#F4977F",
    modules: ["4.6", "4.7"],
    engines: ["5.2", "5.6"],
    message: "Un formato scalabile, data-driven e nativamente virale, pronto a dare voce anche al tuo progetto culturale.",
    benefits: [
      "Un template editoriale-tecnologico collaudato: dal brief alla pubblicazione in 8 settimane.",
      "Analytics, referral e sondaggi zero-party integrati nativamente.",
      "Edizioni white-label o co-branded per teatri lirici, musei, fondazioni e design.",
      "Un formato nativamente virale: badge “Powered by” e quiz condivisibili.",
    ],
    kpis: [
      { value: "62%", label: "margine per edizione replicata" },
      { value: "8", label: "commesse extra-danza in 24 mesi" },
      { value: "1,35", label: "K-factor di viralità" },
    ],
  },
];

/* ---------- Indici ---------- */

export const moduleById: Record<string, Module> = Object.fromEntries(modules.map((m) => [m.id, m]));
export const engineById: Record<string, Engine> = Object.fromEntries(engines.map((e) => [e.id, e]));
export const stakeholderById = Object.fromEntries(stakeholders.map((s) => [s.id, s])) as Record<StakeholderId, Stakeholder>;

export const stakeholdersForModule = (id: string) => stakeholders.filter((s) => s.modules.includes(id));
export const primaryStakeholder = (id: string) => stakeholdersForModule(id)[0];
export const modulesForEngine = (id: string) => modules.filter((m) => m.engines.includes(id));
export const stakeholdersForEngine = (id: string) => stakeholders.filter((s) => s.engines.includes(id));

/* ---------- Edizioni del Reader ---------- */

export interface Edition {
  id: EditionId;
  title: string;
  subtitle: string;
  kind: WindowKind | null;
  color: string;
  ink: string;
  accent: string;
  modules: string[];
  stakeholder?: StakeholderId;
}

export function getEdition(id: EditionId): Edition {
  if (id === "integrale") {
    return {
      id,
      title: "Edizione Integrale",
      subtitle: "13 capitoli · tutti gli stakeholder",
      kind: null,
      color: "#E36F5A",
      ink: "#17121B",
      accent: "#F4977F",
      modules: modules.map((m) => m.id),
    };
  }
  const s = stakeholderById[id];
  return {
    id,
    title: s.editionTitle,
    subtitle: `${s.label} · ${s.modules.length} capitoli`,
    kind: s.kind,
    color: s.color,
    ink: s.ink,
    accent: s.accent,
    modules: s.modules,
    stakeholder: s.id,
  };
}

/* =========================================================================
   IMPATTO
   ========================================================================= */

export const headlineMetrics = [
  { value: 1.2, decimals: 1, suffix: " M", label: "persone raggiunte", note: "Reach cumulata a 24 mesi su canali partner, media e community" },
  { value: 180000, decimals: 0, label: "lettori attivi", note: "Sessioni di lettura superiori a 4 minuti" },
  { value: 1.52, decimals: 2, prefix: "€", suffix: " M", label: "ricavi non diluitivi", note: "Licenze, sponsorship ed edizioni su misura" },
  { value: 0.4, decimals: 2, prefix: "€", label: "CAC medio per lettore", note: "Contro circa €6,50 stimati su paid social" },
  { value: 420, decimals: 0, prefix: "€", suffix: "k", label: "earned media value", note: "Per singolo speciale istituzionale" },
  { value: 1.35, decimals: 2, label: "K-factor", note: "Nuovi lettori generati da ogni lettore" },
];

export const socialMetrics = [
  { value: 1100, label: "classi coinvolte", note: "in 320 istituti scolastici" },
  { value: 48, label: "borse di studio", note: "finanziate con “dona con il voto”" },
  { value: 6200, label: "candidature", note: "a bandi, residenze e audizioni" },
  { value: 240, label: "luoghi mappati", note: "teatri e spazi non convenzionali" },
];

export const revenueMix = [
  { label: "Licenze B2B/B2G", value: 500000, color: "#D4C7A6" },
  { label: "Sponsorship tecniche", value: 360000, color: "#C2505B" },
  { label: "Cultural sponsorship", value: 240000, color: "#E36F5A" },
  { label: "Living Archive (ARR)", value: 240000, color: "#9CC3B0" },
  { label: "White-label", value: 180000, color: "#ECE7D2" },
];

/* =========================================================================
   SOCIAL PROOF, TESTIMONIANZE, PREZZI, FAQ
   ========================================================================= */

export const partnerNetwork = [
  "Fondazione Arti & Territorio",
  "Rete Licei Coreutici",
  "Festival Corpi Contemporanei",
  "Teatri Storici dei Borghi",
  "Il Quotidiano della Cultura",
  "Distretto Turistico Appennino",
  "Accademia del Movimento",
  "Museo della Scena",
  "Osservatorio Spettacolo dal Vivo",
  "Consorzio Mestieri d’Arte",
];

export const testimonials: {
  quote: string;
  name: string;
  role: string;
  org: string;
  stakeholder: StakeholderId;
  metric: { value: string; label: string };
}[] = [
  {
    quote:
      "Per la prima volta abbiamo acquistato un bene culturale che entra davvero nelle scuole e nei borghi, e che ci restituisce dati verificabili: riscatto, tempo di lettura, classi coinvolte. Il consiglio ha approvato il rinnovo in una sola seduta.",
    name: "Elena Marchetti",
    role: "Segretaria generale",
    org: "Fondazione di origine bancaria · Centro Italia",
    stakeholder: "fondazioni",
    metric: { value: "31%", label: "riscatto sui database cittadini" },
  },
  {
    quote:
      "Il capitolo sulla biomeccanica del danzatore ha generato più lead qualificati della nostra ultima fiera. E nessun lettore l’ha percepito come pubblicità: lo hanno letto, in media, per dodici minuti.",
    name: "Davide Rinaldi",
    role: "Direttore marketing",
    org: "Azienda di tessuti tecnici per lo sport",
    stakeholder: "aziende",
    metric: { value: "12 min", label: "tempo medio sul capitolo" },
  },
  {
    quote:
      "Il diario di festival ha raggiunto il nostro pubblico più fedele con un approfondimento d’autore che da soli non avremmo potuto produrre. A costo zero per noi, con un ritorno d’immagine enorme.",
    name: "Giulia Ferraro",
    role: "Direttrice artistica",
    org: "Festival internazionale di danza contemporanea",
    stakeholder: "istituzioni",
    metric: { value: "350k", label: "utenti raggiunti dai canali del festival" },
  },
  {
    quote:
      "I nostri allievi hanno visto il loro video-racconto diventare parte dell’opera. Le famiglie hanno votato, condiviso, donato: abbiamo finanziato due borse di studio con il voto del pubblico.",
    name: "Marco Bellini",
    role: "Coreografo e direttore",
    org: "Compagnia e scuola di danza · Marche",
    stakeholder: "community",
    metric: { value: "2", label: "borse di studio finanziate" },
  },
  {
    quote:
      "Abbiamo adottato il formato white-label per il nostro anniversario: stessa qualità editoriale, analytics già pronti, pubblicazione in otto settimane. Il badge “Powered by” ci ha persino portato richieste da altri musei.",
    name: "Sara Conti",
    role: "Responsabile progetti digitali",
    org: "Museo d’arte e design",
    stakeholder: "tecnologia",
    metric: { value: "8 sett.", label: "dal brief alla pubblicazione" },
  },
];

export interface Plan {
  id: string;
  name: string;
  audience: string;
  stakeholder: StakeholderId;
  price: number;
  from?: boolean;
  unit: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
}

export const plans: Plan[] = [
  {
    id: "lettore",
    name: "Lettore",
    audience: "Community Danza",
    stakeholder: "community",
    price: 0,
    unit: "per sempre",
    description: "L’opera aperta a danzatori, scuole e appassionati, con contenuti sbloccabili attraverso la condivisione.",
    features: [
      "Primi capitoli e Cronache del Movimento",
      "Mappe dei teatri e degli spazi della danza",
      "Bussola delle Opportunità: bandi e audizioni",
      "Director’s Cut con 3 inviti o una micro-donazione",
    ],
    cta: "Inizia a leggere",
  },
  {
    id: "istituzionale",
    name: "Istituzionale",
    audience: "Fondazioni ed Enti",
    stakeholder: "fondazioni",
    price: 9800,
    unit: "per edizione",
    description: "Il bene culturale per fondazioni, Regioni e Comuni: misurabile, personalizzato, pronto per scuole e territori.",
    features: [
      "1.000 licenze digitali personalizzate",
      "Prefazione istituzionale ed ex-libris digitale",
      "Landing co-brandizzata con URL dedicato",
      "Kit didattico per 20 classi incluso",
      "Dashboard KPI in tempo reale",
      "Report d’impatto trimestrale",
    ],
    cta: "Richiedi una proposta",
    highlight: true,
    badge: "Il più scelto da fondazioni ed enti",
  },
  {
    id: "sponsorship",
    name: "Cultural Sponsorship",
    audience: "Aziende e Brand",
    stakeholder: "aziende",
    price: 24000,
    unit: "per capitolo",
    description: "Un capitolo d’autore coerente con i tuoi valori, da regalare alla tua base clienti e misurare in brand affinity.",
    features: [
      "Capitolo tematico firmato da autori indipendenti",
      "Distribuzione gratuita al tuo CRM e ai prospect",
      "Trigger phygital QR/NFC per punti vendita ed eventi",
      "Report di insight zero-party (GDPR)",
      "Analytics di dwell time e brand affinity",
      "Media kit e contenuti atomizzati",
    ],
    cta: "Diventa mecenate",
  },
  {
    id: "whitelabel",
    name: "White-Label",
    audience: "Musei e imprese creative",
    stakeholder: "tecnologia",
    price: 45000,
    from: true,
    unit: "per progetto",
    description: "L’intera architettura editoriale-tecnologica, chiavi in mano, per dare voce al tuo progetto culturale.",
    features: [
      "Template editoriale-tecnologico chiavi in mano",
      "Direzione editoriale e flusso redazionale",
      "Analytics, referral e sondaggi integrati",
      "Distribuzione multicanale e syndication",
      "Pubblicazione in 8 settimane",
      "Badge “Powered by” opzionale",
    ],
    cta: "Progetta la tua edizione",
  },
];

export const faqs = [
  {
    q: "Il libro è una brochure promozionale degli sponsor?",
    a: "No, ed è il nostro principio non negoziabile: Editorial First, Business by Design. Sponsor, fondazioni ed enti sono mecenati e abilitatori, non protagonisti della narrazione. Ogni capitolo, video, mappa o inchiesta deve reggere il confronto con le migliori riviste culturali e i documentari d’autore; i meccanismi di crescita vivono intorno al valore culturale, senza mai interromperlo.",
  },
  {
    q: "Come può una fondazione o un ente pubblico acquistare l’opera?",
    a: "Come bene culturale: pacchetti di licenze digitali personalizzabili — prefazione istituzionale, ex-libris digitale, landing dedicata — conformi alle regole di acquisto di beni e servizi. Non è un contributo a fondo perduto, ma l’acquisto di un’opera misurabile che entra nelle scuole, nei borghi e nei database cittadini.",
  },
  {
    q: "Come vengono misurati i risultati?",
    a: "Ogni modulo ha due KPI con valori target e baseline di riferimento: 26 indicatori in tutto, dal K-factor al tasso di riscatto, dal tempo di permanenza all’Earned Media Value. I partner accedono a una dashboard in tempo reale e ricevono un report d’impatto trimestrale basato su link tracciati, analytics proprietari e dati dei canali partner.",
  },
  {
    q: "I dati dei lettori sono trattati nel rispetto del GDPR?",
    a: "Sì. Raccogliamo solo dati dichiarativi (zero-party), in modo trasparente e consensato, motivati dalla curiosità del lettore e dalla co-creazione di report di settore. Ai partner restituiamo insight aggregati, mai dati personali senza consenso esplicito.",
  },
  {
    q: "Possiamo avere un’edizione dedicata al nostro territorio o al nostro festival?",
    a: "Certo: edizioni territoriali co-progettate con Regioni e Comuni, speciali monografici dedicati a festival e stagioni, capitoli tematici per i brand. Con le istituzioni culturali operiamo come editore indipendente, con una partnership editoriale a costo zero per l’ente.",
  },
  {
    q: "Che cos’è “La Pagina Bianca”?",
    a: "È il format di advocacy degli Stati Generali della Danza: uno spazio formale dedicato a un’istituzione chiave, con domande chiare e costruttive e una data di chiusura comunicata in anticipo. Se la risposta non arriva, la pagina resta deliberatamente bianca, con una nota esplicita. Il dialogo resta sempre aperto ad aggiornamenti successivi.",
  },
  {
    q: "Su quali dispositivi si legge l’opera?",
    a: "Ovunque: è una web-app mobile-first, accessibile e leggera, che si apre da link, QR code o tag NFC senza installazioni. Video, gallery, audio-guide e mappe si adattano a smartphone, tablet e desktop; i deep-link sono ottimizzati per la condivisione su WhatsApp e Telegram.",
  },
  {
    q: "Quanto tempo serve per lanciare un’edizione?",
    a: "In media 8–12 settimane dal brief alla pubblicazione per un’edizione dedicata; 8 settimane per un’edizione white-label basata sul nostro template collaudato. Le uscite seriali seguono un calendario di 6 o 12 puntate annuali.",
  },
];

/* ---------- Formattazione numeri (it-IT) ---------- */

export function formatNumber(n: number, decimals = 0): string {
  const fixed = Math.abs(n).toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${n < 0 ? "−" : ""}${dec ? `${intFmt},${dec}` : intFmt}`;
}

export const formatKpi = (k: Kpi, v = k.value) => `${k.prefix ?? ""}${formatNumber(v, k.decimals ?? 0)}${k.suffix ?? ""}`;
