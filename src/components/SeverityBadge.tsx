"use client";

import { cn, getSeverityColor } from "@/lib/utils";

interface SeverityBadgeProps {
  level: "critical" | "warning" | "info" | "safe";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SeverityBadge({ level, size = "md", className }: SeverityBadgeProps) {
  const labels = {
    critical: "CRITICAL",
    warning: "WARNING",
    info: "INFO",
    safe: "SAFE",
  };

  const sizes = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-semibold uppercase tracking-wider rounded",
        getSeverityColor(level),
        sizes[size],
        level === "critical" && "bg-sentinel-red/10 border border-sentinel-red/30",
        level === "warning" && "bg-sentinel-amber/10 border border-sentinel-amber/30",
        level === "info" && "bg-sentinel-cyan/10 border border-sentinel-cyan/30",
        level === "safe" && "bg-sentinel-green/10 border border-sentinel-green/30",
        className
      )}
    >
      {level === "critical" && <span className="w-1.5 h-1.5 rounded-full bg-sentinel-red mr-1.5 live-pulse" />}
      {labels[level]}
    </span>
  );
}
