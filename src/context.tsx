import { createContext, useContext } from "react";
import type { EditionId, StakeholderId } from "./data/content";

export interface ProposalRequest {
  profile?: StakeholderId;
  plan?: string;
  nonce: number;
}

export interface AppContextValue {
  openReader: (edition: EditionId, moduleId?: string) => void;
  requestProposal: (profile?: StakeholderId, plan?: string) => void;
  proposal: ProposalRequest;
}

export const AppContext = createContext<AppContextValue>({
  openReader: () => {},
  requestProposal: () => {},
  proposal: { nonce: 0 },
});

export const useApp = () => useContext(AppContext);
