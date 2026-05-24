"use client";

import { useState } from "react";
import { SideNav } from "@/components/SideNav";
import { TopBar } from "@/components/TopBar";
import { SeverityBadge } from "@/components/SeverityBadge";
import { cn, timeAgo } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface Anomaly {
  id: string;
  type: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  protocol: string;
  chain: string;
  confidence: number;
  timestamp: Date;
  agentReasoning: string;
}

export default function AnomaliesPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  const anomalies: Anomaly[] = [
    {
      id: "1",
      type: "tvl_drain",
      severity: "warning",
      title: "Compound TVL Decline Accelerating",
      description: "Compound TVL dropped 2.8% in 7 days, outpacing market decline. Rate of decline increasing over last 48h.",
      protocol: "Compound",
      chain: "Ethereum",
      confidence: 78,
      timestamp: new Date(Date.now() - 1800000),
      agentReasoning: "Watchtower detected abnormal TVL decline pattern. 7d change (-2.8%) significantly exceeds market average. Validator confirms no oracle anomalies. Recommend monitoring for potential liquidity migration.",
    },
    {
      id: "2",
      type: "oracle_deviation",
      severity: "info",
      title: "Minor Price Feed Divergence on Arbitrum",
      description: "ETH price feed on Arbitrum DEXes shows 1.2% deviation from Ethereum mainnet. Within tolerance but trending upward.",
      protocol: "Uniswap",
      chain: "Arbitrum",
      confidence: 65,
      timestamp: new Date(Date.now() - 3600000),
      agentReasoning: "Validator agent identified minor oracle deviation on Arbitrum. Current delta: 1.2% (threshold: 3%). Cross-referenced with Watchtower — no correlated TVL anomalies. Continuing to monitor.",
    },
    {
      id: "3",
      type: "whale_movement",
      severity: "info",
      title: "Large ETH Transfer to Binance",
      description: "15,000 ETH ($51.75M) transferred from whale wallet to Binance deposit address. May indicate sell pressure.",
      protocol: "Binance",
      chain: "Ethereum",
      confidence: 72,
      timestamp: new Date(Date.now() - 5400000),
      agentReasoning: "Alert agent tracked whale wallet 0x742d...f44e transferring 15K ETH to Binance. Historical pattern shows this wallet typically sells within 24h of exchange deposit. Risk score: 45/100.",
    },
    {
      id: "4",
      type: "liquidity_shift",
      severity: "warning",
      title: "Pendle Pool Imbalance Detected",
      description: "Pendle PT-eETH pool showing 12% imbalance toward PT tokens. Unusual ahead of maturity date.",
      protocol: "Pendle",
      chain: "Ethereum",
      confidence: 81,
      timestamp: new Date(Date.now() - 900000),
      agentReasoning: "Watchtower flagged Pendle pool imbalance. PT-eETH pool ratio shifted from 52:48 to 64:36 in 6 hours. Analyst agent correlates this with upcoming maturity event. Potential arbitrage opportunity or informed trading.",
    },
    {
      id: "5",
      type: "gas_anomaly",
      severity: "info",
      title: "Elevated Gas on Base",
      description: "Base network gas prices spiking 340% above 7-day average. Possible NFT mint or coordinated activity.",
      protocol: "Base",
      chain: "Base",
      confidence: 58,
      timestamp: new Date(Date.now() - 7200000),
      agentReasoning: "Validator agent detected gas price anomaly on Base. Current median gas: 0.008 gwei vs 7d avg: 0.0018 gwei. No security implications — likely NFT minting event or popular app launch.",
    },
  ];

  const filtered = selectedSeverity === "all"
    ? anomalies
    : anomalies.filter((a) => a.severity === selectedSeverity);

  return (
    <div className="flex min-h-screen bg-surface-void">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-sentinel-amber" />
              Anomaly Explorer
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              AI-detected anomalies with MiMo agent reasoning chains
            </p>
          </div>

          {/* Severity Filter */}
          <div className="flex gap-2">
            {["all", "critical", "warning", "info"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                  selectedSeverity === sev
                    ? "bg-sentinel-green/10 text-sentinel-green border border-sentinel-green/30"
                    : "bg-surface-panel text-text-muted hover:text-text-secondary border border-transparent"
                )}
              >
                {sev === "all" ? "All Anomalies" : sev}
              </button>
            ))}
          </div>

          {/* Anomaly List */}
          <div className="space-y-4">
            {filtered.map((anomaly) => (
              <div
                key={anomaly.id}
                className="bg-surface-card rounded-xl border border-surface-elevated/50 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <SeverityBadge level={anomaly.severity} size="sm" />
                      <span className="text-[10px] font-mono text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded">
                        {anomaly.protocol}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded">
                        {anomaly.chain}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-muted">
                        {anomaly.confidence}% confidence
                      </span>
                      <span className="text-[10px] text-text-muted">
                        {timeAgo(anomaly.timestamp)}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    {anomaly.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {anomaly.description}
                  </p>

                  {/* Agent Reasoning */}
                  <div className="bg-surface-panel rounded-lg p-4 border border-surface-elevated/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-sentinel-cyan font-semibold">
                        MiMo Agent Reasoning
                      </span>
                      <span className="text-[10px] font-mono text-text-muted">
                        · {anomaly.type.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed font-mono">
                      {anomaly.agentReasoning}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
