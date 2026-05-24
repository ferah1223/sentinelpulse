"use client";

import { cn } from "@/lib/utils";

interface PulseDotProps {
  status: "active" | "idle" | "error";
  color?: string;
  size?: number;
  className?: string;
}

export function PulseDot({ status, color, size = 8, className }: PulseDotProps) {
  const statusColors = {
    active: color ?? "bg-sentinel-green",
    idle: "bg-sentinel-amber",
    error: "bg-sentinel-red",
  };

  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        className={cn(
          "inline-block rounded-full",
          statusColors[status],
          status === "active" && "live-pulse"
        )}
        style={{ width: size, height: size }}
      />
      {status === "active" && (
        <span
          className={cn(
            "absolute inline-block rounded-full animate-ping opacity-75",
            statusColors[status]
          )}
          style={{ width: size, height: size }}
        />
      )}
    </span>
  );
}
