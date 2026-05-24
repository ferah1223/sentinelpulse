"use client";

import { useEffect, useState } from "react";
import { SideNav } from "@/components/SideNav";
import { TopBar } from "@/components/TopBar";
import { SeverityBadge } from "@/components/SeverityBadge";
import { cn, formatUsd, timeAgo } from "@/lib/utils";
import { Activity } from "lucide-react";

interface WhaleTx {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  token: string;
  chain: string;
  timestamp: Date;
  type: "transfer" | "swap" | "flash-loan";
  riskScore: number;
}

export default function WhaleWatchPage() {
  const [transactions, setTransactions] = useState<WhaleTx[]>([]);
  const [threshold, setThreshold] = useState(1_000_000);

  useEffect(() => {
    // Generate mock whale transactions
    const mockTxs: WhaleTx[] = Array.from({ length: 15 }, (_, i) => {
      const types: WhaleTx["type"][] = ["transfer", "swap", "flash-loan"];
      const tokens = ["ETH", "WBTC", "USDC", "USDT", "DAI"];
      const chains = ["Ethereum", "Arbitrum", "Base", "Polygon"];
      const value = Math.random() * 50_000_000 + 1_000_000;

      return {
        id: `whale-${i}`,
        hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        from: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
        to: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
        value,
        token: tokens[Math.floor(Math.random() * tokens.length)],
        chain: chains[Math.floor(Math.random() * chains.length)],
        timestamp: new Date(Date.now() - Math.random() * 3600000),
        type: types[Math.floor(Math.random() * types.length)],
        riskScore: Math.floor(Math.random() * 100),
      };
    }).sort((a, b) => b.value - a.value);

    setTransactions(mockTxs);
  }, []);

  const filtered = transactions.filter((tx) => tx.value >= threshold);

  return (
    <div className="flex min-h-screen bg-surface-void">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                <Activity className="w-6 h-6 text-sentinel-cyan" />
                Whale Watch
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Monitor large transactions and whale movements
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted">Min threshold:</span>
              <select
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="bg-surface-panel border border-surface-elevated rounded-lg px-3 py-1.5 text-sm text-text-primary"
              >
                <option value={100_000}>$100K</option>
                <option value={500_000}>$500K</option>
                <option value={1_000_000}>$1M</option>
                <option value={5_000_000}>$5M</option>
                <option value={10_000_000}>$10M</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-card rounded-xl p-4 border border-surface-elevated/50">
              <div className="text-[10px] text-text-muted uppercase tracking-widest">
                Transactions
              </div>
              <div className="text-2xl font-mono font-bold text-text-primary mt-1">
                {filtered.length}
              </div>
            </div>
            <div className="bg-surface-card rounded-xl p-4 border border-surface-elevated/50">
              <div className="text-[10px] text-text-muted uppercase tracking-widest">
                Total Volume
              </div>
              <div className="text-2xl font-mono font-bold text-text-primary mt-1">
                {formatUsd(filtered.reduce((s, tx) => s + tx.value, 0))}
              </div>
            </div>
            <div className="bg-surface-card rounded-xl p-4 border border-surface-elevated/50">
              <div className="text-[10px] text-text-muted uppercase tracking-widest">
                Flash Loans
              </div>
              <div className="text-2xl font-mono font-bold text-sentinel-amber mt-1">
                {filtered.filter((tx) => tx.type === "flash-loan").length}
              </div>
            </div>
            <div className="bg-surface-card rounded-xl p-4 border border-surface-elevated/50">
              <div className="text-[10px] text-text-muted uppercase tracking-widest">
                High Risk
              </div>
              <div className="text-2xl font-mono font-bold text-sentinel-red mt-1">
                {filtered.filter((tx) => tx.riskScore > 70).length}
              </div>
            </div>
          </div>

          {/* Transaction Feed */}
          <div className="space-y-2">
            {filtered.map((tx) => (
              <div
                key={tx.id}
                className={cn(
                  "bg-surface-card rounded-xl p-4 border transition-all hover:border-surface-elevated",
                  tx.riskScore > 70
                    ? "border-sentinel-red/20"
                    : tx.riskScore > 40
                      ? "border-sentinel-amber/20"
                      : "border-surface-elevated/50"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold",
                        tx.type === "flash-loan"
                          ? "bg-sentinel-red/10 text-sentinel-red"
                          : tx.type === "swap"
                            ? "bg-sentinel-amber/10 text-sentinel-amber"
                            : "bg-sentinel-cyan/10 text-sentinel-cyan"
                      )}
                    >
                      {tx.type === "flash-loan" ? "⚡" : tx.type === "swap" ? "⇄" : "→"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-medium text-text-primary">
                          {formatUsd(tx.value)}
                        </span>
                        <span className="text-xs font-mono text-text-muted">{tx.token}</span>
                        <span className="text-[10px] font-mono text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded">
                          {tx.chain}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-text-muted">
                          {tx.from} → {tx.to}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div
                      className={cn(
                        "text-xs font-mono font-medium",
                        tx.riskScore > 70
                          ? "text-sentinel-red"
                          : tx.riskScore > 40
                            ? "text-sentinel-amber"
                            : "text-sentinel-green"
                      )}
                    >
                      Risk: {tx.riskScore}/100
                    </div>
                    <span className="text-[10px] text-text-muted">
                      {timeAgo(tx.timestamp)}
                    </span>
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
