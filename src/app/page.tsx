"use client";

import { useEffect, useState } from "react";
import { SideNav } from "@/components/SideNav";
import { TopBar } from "@/components/TopBar";
import { RiskGauge } from "@/components/RiskGauge";
import { MetricCard } from "@/components/MetricCard";
import { TvlChart } from "@/components/TvlChart";
import { ChainMap } from "@/components/ChainMap";
import { ActivityFeed } from "@/components/ActivityFeed";
import { formatUsd, formatPercent, cn } from "@/lib/utils";
import { Shield, Activity, AlertTriangle, Cpu } from "lucide-react";

interface TvlData {
  totalTvl: number;
  chains: Array<{ name: string; tvl: number; change_24h: number; color: string }>;
}

interface AgentStatus {
  name: string;
  status: "active" | "idle" | "error";
  tasksCompleted: number;
  tokensUsed: number;
}

export default function DashboardPage() {
  const [tvlData, setTvlData] = useState<TvlData | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [threatScore, setThreatScore] = useState(23);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/tvl").then((r) => r.json()),
      fetch("/api/agents").then((r) => r.json()),
    ])
      .then(([tvl, agentData]) => {
        setTvlData(tvl);
        setAgents(agentData.agents ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalTvl = tvlData?.totalTvl ?? 85_000_000_000;
  const tvlChange = tvlData?.chains?.[0]?.change_24h ?? 1.2;
  const activeAgents = agents.filter((a) => a.status === "active").length;
  const totalTokens = agents.reduce((sum, a) => sum + a.tokensUsed, 0);

  return (
    <div className="flex min-h-screen bg-surface-void">
      <SideNav />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar threatScore={threatScore} />

        <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-y-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
              <p className="text-sm text-text-secondary mt-1">
                Real-time DeFi intelligence from MiMo V2.5 agents
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sentinel-green live-pulse" />
              <span className="text-xs text-sentinel-green font-mono">LIVE</span>
            </div>
          </div>

          {/* Threat Level + Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Threat Level Card */}
            <div className="lg:col-span-1 bg-surface-card border border-surface-elevated/50 rounded-xl p-6 flex flex-col items-center justify-center">
              <div className="text-[10px] uppercase tracking-widest text-text-muted mb-4">
                System Threat Level
              </div>
              <RiskGauge score={threatScore} size="lg" />
              <div className="mt-3 text-[10px] text-text-muted text-center">
                Last updated: just now
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Value Locked"
                value={formatUsd(totalTvl)}
                trend={tvlChange >= 0 ? "up" : "down"}
                trendValue={formatPercent(tvlChange)}
                subtitle="24h change"
                glowColor="green"
                icon={<Shield className="w-4 h-4" />}
              />
              <MetricCard
                title="Active Alerts"
                value="3"
                trend="down"
                trendValue="-2 from yesterday"
                subtitle="2 warnings, 1 info"
                glowColor={threatScore > 50 ? "red" : undefined}
                icon={<AlertTriangle className="w-4 h-4" />}
              />
              <MetricCard
                title="Anomalies (24h)"
                value="7"
                trend="up"
                trendValue="+3 from avg"
                subtitle="Across all chains"
                glowColor="cyan"
                icon={<Activity className="w-4 h-4" />}
              />
              <MetricCard
                title="MiMo Agents"
                value={`${activeAgents}/4`}
                subtitle={`${(totalTokens / 1000).toFixed(0)}K tokens today`}
                glowColor="cyan"
                icon={<Cpu className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-surface-card border border-surface-elevated/50 rounded-xl p-5">
              <TvlChart />
            </div>
            <div className="bg-surface-card border border-surface-elevated/50 rounded-xl p-5">
              <ChainMap />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-surface-card border border-surface-elevated/50 rounded-xl p-5">
              <ActivityFeed />
            </div>

            {/* Agent Pipeline Status */}
            <div className="bg-surface-card border border-surface-elevated/50 rounded-xl p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-text-primary">
                  MiMo Agent Pipeline
                </h3>
                <p className="text-xs text-text-muted">Multi-agent monitoring status</p>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: "Watchtower",
                    desc: "TVL & pool monitoring",
                    status: "active",
                  },
                  {
                    name: "Validator",
                    desc: "Oracle & consensus checks",
                    status: "active",
                  },
                  {
                    name: "Alert",
                    desc: "Whale & flash loan detection",
                    status: "active",
                  },
                  {
                    name: "Analyst",
                    desc: "Risk synthesis & reports",
                    status: "idle",
                  },
                ].map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-panel"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          agent.status === "active"
                            ? "bg-sentinel-green live-pulse"
                            : "bg-sentinel-amber"
                        )}
                      />
                      <div>
                        <div className="text-xs font-medium text-text-primary">
                          {agent.name}
                        </div>
                        <div className="text-[10px] text-text-muted">{agent.desc}</div>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-mono uppercase",
                        agent.status === "active"
                          ? "text-sentinel-green"
                          : "text-sentinel-amber"
                      )}
                    >
                      {agent.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-surface-elevated/50 text-center">
                <span className="text-[10px] text-text-muted">
                  Model:{" "}
                  <span className="text-sentinel-cyan font-mono">mimo-v2.5</span>
                  {" ·"} Endpoint:{" "}
                  <span className="text-sentinel-cyan font-mono">mimo.ccode.dev</span>
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center py-6 border-t border-surface-panel">
            <p className="text-xs text-text-muted">
              SentinelPulse — AI-powered DeFi security, always watching.
            </p>
            <p className="text-[10px] text-text-muted mt-1">
              Powered by{" "}
              <span className="text-sentinel-green font-semibold">
                Xiaomi MiMo V2.5
              </span>{" "}
              · Data from CoinGecko & DeFiLlama
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
