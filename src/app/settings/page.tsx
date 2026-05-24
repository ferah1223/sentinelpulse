"use client";

import { useState } from "react";
import { SideNav } from "@/components/SideNav";
import { TopBar } from "@/components/TopBar";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [alertThreshold, setAlertThreshold] = useState(5);
  const [whaleThreshold, setWhaleThreshold] = useState(1_000_000);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableSounds, setEnableSounds] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-void">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4 lg:p-6 space-y-6 max-w-3xl">
          <div>
            <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
              <Settings className="w-6 h-6 text-text-muted" />
              Settings
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Configure SentinelPulse monitoring parameters
            </p>
          </div>

          {/* Monitoring Settings */}
          <section className="bg-surface-card rounded-xl border border-surface-elevated/50 p-6">
            <h2 className="text-sm font-semibold text-text-primary mb-4">
              Monitoring
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-text-primary">Refresh Interval</div>
                  <div className="text-xs text-text-muted">
                    How often data is fetched from APIs
                  </div>
                </div>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="bg-surface-panel border border-surface-elevated rounded-lg px-3 py-2 text-sm text-text-primary"
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-text-primary">TVL Alert Threshold</div>
                  <div className="text-xs text-text-muted">
                    Minimum TVL change % to trigger alert
                  </div>
                </div>
                <select
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(Number(e.target.value))}
                  className="bg-surface-panel border border-surface-elevated rounded-lg px-3 py-2 text-sm text-text-primary"
                >
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                  <option value={10}>10%</option>
                  <option value={15}>15%</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-text-primary">Whale Threshold</div>
                  <div className="text-xs text-text-muted">
                    Minimum USD value to track whale transactions
                  </div>
                </div>
                <select
                  value={whaleThreshold}
                  onChange={(e) => setWhaleThreshold(Number(e.target.value))}
                  className="bg-surface-panel border border-surface-elevated rounded-lg px-3 py-2 text-sm text-text-primary"
                >
                  <option value={100_000}>$100K</option>
                  <option value={500_000}>$500K</option>
                  <option value={1_000_000}>$1M</option>
                  <option value={5_000_000}>$5M</option>
                  <option value={10_000_000}>$10M</option>
                </select>
              </div>
            </div>
          </section>

          {/* MiMo Agent Config */}
          <section className="bg-surface-card rounded-xl border border-surface-elevated/50 p-6">
            <h2 className="text-sm font-semibold text-text-primary mb-4">
              MiMo V2.5 Agent Configuration
            </h2>
            <div className="space-y-3">
              <div className="bg-surface-panel rounded-lg p-4 border border-surface-elevated/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">
                    API Endpoint
                  </span>
                  <span className="text-xs font-mono text-sentinel-cyan">
                    mimo.ccode.dev
                  </span>
                </div>
                <div className="text-xs text-text-muted font-mono">
                  https://mimo.ccode.dev/v1/chat/completions
                </div>
              </div>
              <div className="bg-surface-panel rounded-lg p-4 border border-surface-elevated/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">Model</span>
                  <span className="text-xs font-mono text-sentinel-green">mimo-v2.5</span>
                </div>
                <div className="text-xs text-text-muted">
                  Xiaomi MiMo V2.5 — Multi-agent pipeline for DeFi intelligence
                </div>
              </div>
              <div className="bg-surface-panel rounded-lg p-4 border border-surface-elevated/30">
                <div className="text-sm font-medium text-text-primary mb-2">
                  Active Agents
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Watchtower", "Validator", "Alert", "Analyst"].map((agent) => (
                    <div
                      key={agent}
                      className="flex items-center gap-2 text-xs text-text-secondary"
                    >
                      <span className="w-2 h-2 rounded-full bg-sentinel-green" />
                      {agent}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-surface-card rounded-xl border border-surface-elevated/50 p-6">
            <h2 className="text-sm font-semibold text-text-primary mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm text-text-primary">Push Notifications</div>
                  <div className="text-xs text-text-muted">
                    Receive browser notifications for critical alerts
                  </div>
                </div>
                <button
                  onClick={() => setEnableNotifications(!enableNotifications)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors relative",
                    enableNotifications ? "bg-sentinel-green" : "bg-surface-elevated"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                      enableNotifications ? "left-5" : "left-0.5"
                    )}
                  />
                </button>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm text-text-primary">Alert Sounds</div>
                  <div className="text-xs text-text-muted">
                    Play sound on critical alerts
                  </div>
                </div>
                <button
                  onClick={() => setEnableSounds(!enableSounds)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors relative",
                    enableSounds ? "bg-sentinel-green" : "bg-surface-elevated"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                      enableSounds ? "left-5" : "left-0.5"
                    )}
                  />
                </button>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm text-text-primary">Reduced Motion</div>
                  <div className="text-xs text-text-muted">
                    Disable animations and visual effects
                  </div>
                </div>
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors relative",
                    reducedMotion ? "bg-sentinel-green" : "bg-surface-elevated"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                      reducedMotion ? "left-5" : "left-0.5"
                    )}
                  />
                </button>
              </label>
            </div>
          </section>

          {/* Data Sources */}
          <section className="bg-surface-card rounded-xl border border-surface-elevated/50 p-6">
            <h2 className="text-sm font-semibold text-text-primary mb-4">
              Data Sources
            </h2>
            <div className="space-y-3">
              {[
                { name: "CoinGecko", desc: "Token prices, market caps", status: "active" },
                { name: "DeFiLlama", desc: "TVL, protocol data", status: "active" },
                { name: "MiMo V2.5", desc: "AI agent intelligence", status: "active" },
              ].map((source) => (
                <div
                  key={source.name}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-sentinel-green" />
                    <div>
                      <div className="text-sm text-text-primary">{source.name}</div>
                      <div className="text-xs text-text-muted">{source.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sentinel-green uppercase">
                    {source.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-4 text-xs text-text-muted">
            SentinelPulse v1.0.0 — Powered by{" "}
            <span className="text-sentinel-green">Xiaomi MiMo V2.5</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
