"use client";

import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
  glowColor?: "green" | "red" | "cyan" | "amber";
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  className,
  glowColor,
}: MetricCardProps) {
  const glowClasses = {
    green: "shadow-glow-green",
    red: "shadow-glow-red",
    cyan: "shadow-glow-cyan",
    amber: "",
  };

  return (
    <div
      className={cn(
        "bg-surface-card border border-surface-elevated/50 rounded-xl p-5 transition-all duration-200",
        glowColor && glowClasses[glowColor],
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          {title}
        </span>
        {icon && <span className="text-text-muted">{icon}</span>}
      </div>
      <div className="text-2xl font-bold text-text-primary font-mono mb-1">{value}</div>
      <div className="flex items-center gap-2">
        {trend && trendValue && (
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" && "text-sentinel-green",
              trend === "down" && "text-sentinel-red",
              trend === "neutral" && "text-text-secondary"
            )}
          >
            {trend === "up" && "↑ "}
            {trend === "down" && "↓ "}
            {trendValue}
          </span>
        )}
        {subtitle && (
          <span className="text-xs text-text-muted">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
