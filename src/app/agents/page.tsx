"use client";

import { useEffect, useState } from "react";
import { SideNav } from "@/components/SideNav";
import { TopBar } from "@/components/TopBar";
import { cn, timeAgo } from "@/lib/utils";
import { Cpu } from "lucide-react";

interface LogEntry {
  id: string;
  agent: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: Date;
}

export default function AgentLogsPage() {
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Generate mock logs
    const agents = ["Watchtower", "Validator", "Alert", "Analyst"];
    const messages = [
      { level: "info" as const, msg: "Monitoring cycle complete. 50 protocols scanned." },
      { level: "info" as const, msg: "TVL data refreshed. Total: $85.2B (+1.2% 24h)" },
      { level: "info" as const, msg: "Price feeds verified. All within tolerance." },
      { level: "warn" as const, msg: "Compound TVL decline rate accelerating. Elevated to warning." },
      { level: "info" as const, msg: "Whale wallet 0x742d...f44e activity detected. 15K ETH transfer." },
      { level: "info" as const, msg: "Flash loan pattern detected: Aave → Uniswap → Curve." },
      { level: "info" as const, msg: "Oracle deviation check complete. Arbitrum: 1.2% delta." },
      { level: "warn" as const, msg: "Pendle pool imbalance detected. PT-eETH ratio: 64:36." },
      { level: "info" as const, msg: "Report synthesis complete. Confidence: 92%." },
      { level: "info" as const, msg: "Agent health check passed. All 4 agents operational." },
      { level: "error" as const, msg: "CoinGecko API rate limit reached. Falling back to cache." },
      { level: "info" as const, msg: "Cache refreshed. TTL: 30s for TVL, 15s for prices." },
    ];

    const generated: LogEntry[] = [];
    for (let i = 0; i < 50; i++) {
      const agent = agents[i % agents.length];
      const { level, msg } = messages[i % messages.length];
      generated.push({
        id: `log-${i}`,
        agent,
        level,
        message: msg,
        timestamp: new Date(Date.now() - i * 120000),
      });
    }
    setLogs(generated);
  }, []);

  const filtered =
    selectedAgent === "all"
      ? logs
      : logs.filter((l) => l.agent === selectedAgent);

  const agentNames = ["all", "Watchtower", "Validator", "Alert", "Analyst"];

  return (
    <div className="flex min-h-screen bg-surface-void">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Cpu className="w-6 h-6 text-sentinel-green" />
              Agent Logs
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Real-time log stream from MiMo V2.5 agent pipeline
            </p>
          </div>

          {/* Agent Selector */}
          <div className="flex gap-2">
            {agentNames.map((agent) => (
              <button
                key={agent}
                onClick={() => setSelectedAgent(agent)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  selectedAgent === agent
                    ? "bg-sentinel-green/10 text-sentinel-green border border-sentinel-green/30"
                    : "bg-surface-panel text-text-muted hover:text-text-secondary border border-transparent"
                )}
              >
                {agent === "all" ? "All Agents" : agent}
              </button>
            ))}
          </div>

          {/* Log Stream */}
          <div className="bg-surface-card rounded-xl border border-surface-elevated/50 overflow-hidden">
            <div className="border-b border-surface-elevated px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted">
                {filtered.length} entries
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sentinel-green live-pulse" />
                <span className="text-[10px] font-mono text-sentinel-green uppercase">
                  Streaming
                </span>
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto font-mono text-xs">
              {filtered.map((log) => (
                <div
                  key={log.id}
                  className={cn(
                    "px-5 py-2.5 border-b border-surface-elevated/20 hover:bg-surface-panel/50 transition-colors flex items-start gap-3",
                    log.level === "error" && "bg-sentinel-red/5",
                    log.level === "warn" && "bg-sentinel-amber/5"
                  )}
                >
                  <span className="text-text-muted whitespace-nowrap mt-0.5">
                    {log.timestamp.toLocaleTimeString("en-US", { hour12: false })}
                  </span>
                  <span
                    className={cn(
                      "uppercase font-semibold w-12 shrink-0",
                      log.level === "info" && "text-sentinel-cyan",
                      log.level === "warn" && "text-sentinel-amber",
                      log.level === "error" && "text-sentinel-red"
                    )}
                  >
                    {log.level}
                  </span>
                  <span className="text-text-muted w-20 shrink-0">[{log.agent}]</span>
                  <span className="text-text-secondary flex-1">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
