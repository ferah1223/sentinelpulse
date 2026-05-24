"use client";

import { cn } from "@/lib/utils";

interface AgentStatusIndicatorProps {
  agents: Array<{
    name: string;
    status: "active" | "idle" | "error";
  }>;
  className?: string;
}

export function AgentStatusIndicator({ agents, className }: AgentStatusIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {agents.map((agent) => (
        <div
          key={agent.name}
          className="flex items-center gap-1.5 group relative"
          title={`${agent.name}: ${agent.status}`}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              agent.status === "active" && "bg-sentinel-green live-pulse",
              agent.status === "idle" && "bg-sentinel-amber",
              agent.status === "error" && "bg-sentinel-red"
            )}
          />
          <span className="text-xs text-text-muted font-mono hidden lg:inline">
            {agent.name.charAt(0)}
          </span>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
            <div className="bg-surface-elevated border border-surface-card rounded-lg px-3 py-2 whitespace-nowrap">
              <div className="text-xs font-medium text-text-primary">{agent.name}</div>
              <div
                className={cn(
                  "text-[10px] font-mono uppercase",
                  agent.status === "active" && "text-sentinel-green",
                  agent.status === "idle" && "text-sentinel-amber",
                  agent.status === "error" && "text-sentinel-red"
                )}
              >
                {agent.status}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
