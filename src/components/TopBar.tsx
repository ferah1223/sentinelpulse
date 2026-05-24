"use client";

import { useState, useEffect } from "react";
import { cn, formatUsd } from "@/lib/utils";
import { AgentStatusIndicator } from "./AgentStatusIndicator";

interface TopBarProps {
  threatScore?: number;
}

export function TopBar({ threatScore = 25 }: TopBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { name: "Watchtower", status: "active" as const },
    { name: "Validator", status: "active" as const },
    { name: "Alert", status: "active" as const },
    { name: "Analyst", status: "idle" as const },
  ];

  const threatColor =
    threatScore <= 25
      ? "text-sentinel-green"
      : threatScore <= 50
        ? "text-sentinel-amber"
        : threatScore <= 75
          ? "text-orange-400"
          : "text-sentinel-red";

  return (
    <header className="h-14 bg-surface-deep/80 backdrop-blur-md border-b border-surface-panel flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
      {/* Left: Search placeholder */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-panel rounded-lg text-sm text-text-muted hover:text-text-secondary transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-card rounded text-[10px] font-mono text-text-muted border border-surface-elevated">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Center: Threat score */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-medium">
            Threat Level
          </span>
          <span className={cn("text-lg font-mono font-bold", threatColor)}>
            {threatScore}
          </span>
          <span className="text-xs text-text-muted">/100</span>
        </div>
        <div className="h-6 w-px bg-surface-elevated" />
        <AgentStatusIndicator agents={agents} />
      </div>

      {/* Right: Time + status */}
      <div className="flex items-center gap-4">
        <div className="text-xs font-mono text-text-muted">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sentinel-green live-pulse" />
          <span className="text-[10px] font-medium text-sentinel-green uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>
    </header>
  );
}
