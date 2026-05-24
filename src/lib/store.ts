import { create } from "zustand";

export interface Protocol {
  id: string;
  name: string;
  symbol: string;
  tvl: number;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  chain: string;
  category: string;
  logo?: string;
}

export interface ChainTvl {
  name: string;
  tvl: number;
  change_24h: number;
  color: string;
}

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  source: string;
  agent: string;
  confidence: number;
  timestamp: Date;
  protocol?: string;
  chain?: string;
}

export interface AgentStatus {
  name: string;
  status: "active" | "idle" | "error";
  lastRun: Date;
  tasksCompleted: number;
  tokensUsed: number;
}

export interface AgentLogEntry {
  id: string;
  agent: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface AgentReport {
  id: string;
  title: string;
  summary: string;
  content: string;
  agent: string;
  severity: "critical" | "warning" | "info" | "safe";
  confidence: number;
  timestamp: Date;
  protocols: string[];
  chains: string[];
}

interface AppState {
  protocols: Protocol[];
  chainTvls: ChainTvl[];
  alerts: Alert[];
  agentStatuses: AgentStatus[];
  agentLogs: AgentLogEntry[];
  agentReports: AgentReport[];
  threatScore: number;
  threatTrend: "rising" | "falling" | "stable";
  isLoading: boolean;
  selectedChains: string[];
  lastUpdated: Date | null;

  setProtocols: (protocols: Protocol[]) => void;
  setChainTvls: (chains: ChainTvl[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  setAgentStatuses: (statuses: AgentStatus[]) => void;
  addAgentLog: (log: AgentLogEntry) => void;
  setAgentLogs: (logs: AgentLogEntry[]) => void;
  setAgentReports: (reports: AgentReport[]) => void;
  setThreatScore: (score: number, trend: "rising" | "falling" | "stable") => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedChains: (chains: string[]) => void;
  setLastUpdated: (date: Date) => void;
}

export const useAppStore = create<AppState>((set) => ({
  protocols: [],
  chainTvls: [],
  alerts: [],
  agentStatuses: [],
  agentLogs: [],
  agentReports: [],
  threatScore: 25,
  threatTrend: "stable",
  isLoading: true,
  selectedChains: [],
  lastUpdated: null,

  setProtocols: (protocols) => set({ protocols }),
  setChainTvls: (chainTvls) => set({ chainTvls }),
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) =>
    set((state) => ({ alerts: [alert, ...state.alerts].slice(0, 100) })),
  setAgentStatuses: (agentStatuses) => set({ agentStatuses }),
  addAgentLog: (log) =>
    set((state) => ({ agentLogs: [log, ...state.agentLogs].slice(0, 500) })),
  setAgentLogs: (agentLogs) => set({ agentLogs }),
  setAgentReports: (agentReports) => set({ agentReports }),
  setThreatScore: (score, trend) => set({ threatScore: score, threatTrend: trend }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSelectedChains: (selectedChains) => set({ selectedChains }),
  setLastUpdated: (lastUpdated) => set({ lastUpdated }),
}));
