"use client";

import { useEffect, useState } from "react";
import { cn, timeAgo, formatUsd } from "@/lib/utils";
import { SeverityBadge } from "./SeverityBadge";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  protocol?: string;
  agent: string;
  confidence: number;
  timestamp: string;
}

interface ActivityFeedProps {
  className?: string;
}

export function ActivityFeed({ className }: ActivityFeedProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch alerts
    fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        protocols: [
          { name: "Lido", tvl: 33_500_000_000, change_1d: 1.5, change_7d: 3.2 },
          { name: "Aave", tvl: 12_800_000_000, change_1d: 0.8, change_7d: 2.1 },
          { name: "EigenLayer", tvl: 11_200_000_000, change_1d: 2.3, change_7d: 8.5 },
        ],
        prices: [
          { id: "bitcoin", price: 97_500, change_24h: 2.1 },
          { id: "ethereum", price: 3_450, change_24h: 1.8 },
        ],
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        setAlerts(d.alerts ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Activity Feed</h3>
          <p className="text-xs text-text-muted">Real-time alerts from MiMo agents</p>
        </div>
        <span className="text-[10px] font-mono text-text-muted">
          {alerts.length} events
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface-panel rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-surface-elevated rounded w-3/4 mb-2" />
              <div className="h-3 bg-surface-elevated rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "bg-surface-panel rounded-lg p-4 border transition-all hover:border-surface-elevated",
                alert.type === "critical" && "border-sentinel-red/20",
                alert.type === "warning" && "border-sentinel-amber/20",
                alert.type === "info" && "border-surface-elevated/50"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <SeverityBadge level={alert.type} size="sm" />
                  {alert.protocol && (
                    <span className="text-[10px] font-mono text-text-muted bg-surface-elevated px-1.5 py-0.5 rounded">
                      {alert.protocol}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-text-muted">
                  {alert.confidence}% confidence
                </span>
              </div>
              <h4 className="text-sm font-medium text-text-primary mb-1">
                {alert.title}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {alert.message}
              </p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-surface-elevated/50">
                <span className="text-[10px] font-mono text-text-muted">
                  {alert.agent} Agent
                </span>
                <span className="text-[10px] text-text-muted">
                  {timeAgo(new Date(alert.timestamp))}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
