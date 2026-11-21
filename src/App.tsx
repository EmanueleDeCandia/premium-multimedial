import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { AppContext, type AppContextValue, type ProposalRequest } from "./context";
import type { EditionId, StakeholderId } from "./data/content";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Manifesto } from "./components/Manifesto";
import { Showcase } from "./components/Showcase";
import { Modules } from "./components/Modules";
import { EcosystemMap } from "./components/EcosystemMap";
import { Stakeholders } from "./components/Stakeholders";
import { Engines } from "./components/Engines";
import { Impact } from "./components/Impact";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Reader } from "./components/Reader";
import { SimulatorPage } from "./components/simulator/SimulatorPage";

const isSimulatorRoute = () => {
  if (typeof window === "undefined") return false;
  const h = window.location.hash.toLowerCase();
  const q = new URLSearchParams(window.location.search).get("page")?.toLowerCase();
  return h === "#/simulatore" || h === "#simulatore" || q === "simulatore";
};

export default function App() {
  const [simulator, setSimulator] = useState(isSimulatorRoute);
  const [reader, setReader] = useState<{ edition: EditionId; moduleId?: string } | null>(null);
  const [proposal, setProposal] = useState<ProposalRequest>({ nonce: 0 });

  useEffect(() => {
    const sync = () => setSimulator(isSimulatorRoute());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const exitSimulator = useCallback(() => {
    const url = new URL(window.location.href);
    url.hash = "";
    url.searchParams.delete("page");
    window.history.pushState({}, "", url.toString());
    setSimulator(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const openReader = useCallback((edition: EditionId, moduleId?: string) => setReader({ edition, moduleId }), []);
  const closeReader = useCallback(() => setReader(null), []);

  const requestProposal = useCallback((profile?: StakeholderId, plan?: string) => {
    setProposal((p) => ({ profile, plan, nonce: p.nonce + 1 }));
    window.setTimeout(() => document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth", block: "start" }), 380);
  }, []);

  const ctx = useMemo<AppContextValue>(() => ({ openReader, requestProposal, proposal }), [openReader, requestProposal, proposal]);

  if (simulator) {
    return (
      <MotionConfig reducedMotion="user">
        <SimulatorPage onBack={exitSimulator} />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <AppContext.Provider value={ctx}>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Vai al contenuto principale
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <SocialProof />
          <Manifesto />
          <Showcase />
          <Modules />
          <EcosystemMap />
          <Stakeholders />
          <Engines />
          <Impact />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <AnimatePresence>
          {reader && (
            <Reader key={`${reader.edition}-${reader.moduleId ?? ""}`} state={reader} onClose={closeReader} />
          )}
        </AnimatePresence>
      </AppContext.Provider>
    </MotionConfig>
  );
}
