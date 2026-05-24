"use client";

import { useEffect, useState } from "react";
import { SideNav } from "@/components/SideNav";
import { TopBar } from "@/components/TopBar";
import { SeverityBadge } from "@/components/SeverityBadge";
import { cn, formatUsd, formatPercent } from "@/lib/utils";
import { TrendingUp, ArrowUpDown } from "lucide-react";

interface Protocol {
  id: string;
  name: string;
  symbol: string;
  tvl: number;
  change_1h: number;
  change_1d: number;
  change_7d: number;
  chain: string;
  category: string;
}

export default function TvlMonitorPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"tvl" | "change_1d" | "change_7d">("tvl");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedChain, setSelectedChain] = useState<string>("all");

  useEffect(() => {
    fetch("/api/protocols")
      .then((r) => r.json())
      .then((d) => {
        setProtocols(d.protocols ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const chains = ["all", ...new Set(protocols.map((p) => p.chain))];

  const filtered = protocols
    .filter((p) => selectedChain === "all" || p.chain === selectedChain)
    .sort((a, b) => {
      const dir = sortDir === "desc" ? -1 : 1;
      return (a[sortBy] - b[sortBy]) * dir;
    });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortDir("desc");
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-void">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-sentinel-green" />
              TVL Monitor
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Track Total Value Locked across all DeFi protocols
            </p>
          </div>

          {/* Chain Filter */}
          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChain(chain)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  selectedChain === chain
                    ? "bg-sentinel-green/10 text-sentinel-green border border-sentinel-green/30"
                    : "bg-surface-panel text-text-muted hover:text-text-secondary border border-transparent"
                )}
              >
                {chain === "all" ? "All Chains" : chain}
              </button>
            ))}
          </div>

          {/* Protocol Table */}
          <div className="bg-surface-card border border-surface-elevated/50 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-elevated">
                  <th className="text-left text-[10px] uppercase tracking-widest text-text-muted font-medium px-5 py-3">
                    Protocol
                  </th>
                  <th className="text-left text-[10px] uppercase tracking-widest text-text-muted font-medium px-5 py-3">
                    Chain
                  </th>
                  <th
                    className="text-right text-[10px] uppercase tracking-widest text-text-muted font-medium px-5 py-3 cursor-pointer hover:text-text-secondary"
                    onClick={() => toggleSort("tvl")}
                  >
                    <span className="inline-flex items-center gap-1">
                      TVL <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="text-right text-[10px] uppercase tracking-widest text-text-muted font-medium px-5 py-3 cursor-pointer hover:text-text-secondary"
                    onClick={() => toggleSort("change_1d")}
                  >
                    <span className="inline-flex items-center gap-1">
                      24h <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="text-right text-[10px] uppercase tracking-widest text-text-muted font-medium px-5 py-3 cursor-pointer hover:text-text-secondary"
                    onClick={() => toggleSort("change_7d")}
                  >
                    <span className="inline-flex items-center gap-1">
                      7d <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="text-left text-[10px] uppercase tracking-widest text-text-muted font-medium px-5 py-3">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="border-b border-surface-elevated/30">
                        <td colSpan={6} className="px-5 py-4">
                          <div className="h-4 bg-surface-panel rounded animate-pulse w-32" />
                        </td>
                      </tr>
                    ))
                  : filtered.map((protocol, i) => (
                      <tr
                        key={protocol.id}
                        className={cn(
                          "border-b border-surface-elevated/30 hover:bg-surface-panel/50 transition-colors",
                          i < 3 && "bg-surface-panel/20"
                        )}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-primary">
                              {i + 1}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-text-primary">
                                {protocol.name}
                              </div>
                              <div className="text-[10px] font-mono text-text-muted">
                                {protocol.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-text-secondary font-mono">
                            {protocol.chain}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="text-sm font-mono font-medium text-text-primary">
                            {formatUsd(protocol.tvl)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span
                            className={cn(
                              "text-sm font-mono",
                              protocol.change_1d >= 0
                                ? "text-sentinel-green"
                                : "text-sentinel-red"
                            )}
                          >
                            {formatPercent(protocol.change_1d)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span
                            className={cn(
                              "text-sm font-mono",
                              protocol.change_7d >= 0
                                ? "text-sentinel-green"
                                : "text-sentinel-red"
                            )}
                          >
                            {formatPercent(protocol.change_7d)}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-mono text-text-muted bg-surface-elevated px-2 py-0.5 rounded">
                            {protocol.category}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
