"use client";

import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function RiskGauge({ score, size = "md", showLabel = true, className }: RiskGaugeProps) {
  const getColor = (s: number) => {
    if (s <= 25) return "#00FFB2";
    if (s <= 50) return "#FFB800";
    if (s <= 75) return "#FF6B2B";
    return "#FF3B5C";
  };

  const getLabel = (s: number) => {
    if (s <= 25) return "LOW";
    if (s <= 50) return "MODERATE";
    if (s <= 75) return "ELEVATED";
    return "CRITICAL";
  };

  const sizes = {
    sm: { width: 80, height: 48, fontSize: "text-lg", labelSize: "text-[9px]" },
    md: { width: 120, height: 72, fontSize: "text-2xl", labelSize: "text-xs" },
    lg: { width: 180, height: 108, fontSize: "text-4xl", labelSize: "text-sm" },
  };

  const { width, height, fontSize, labelSize } = sizes[size];
  const color = getColor(score);
  const radius = width * 0.38;
  const strokeWidth = width * 0.06;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Background arc */}
        <path
          d={`M ${width * 0.1} ${height * 0.85} A ${radius} ${radius} 0 0 1 ${width * 0.9} ${height * 0.85}`}
          fill="none"
          stroke="#232740"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d={`M ${width * 0.1} ${height * 0.85} A ${radius} ${radius} 0 0 1 ${width * 0.9} ${height * 0.85}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out, stroke 0.5s ease",
            filter: `drop-shadow(0 0 6px ${color}40)`,
          }}
        />
        {/* Score text */}
        <text
          x={width / 2}
          y={height * 0.65}
          textAnchor="middle"
          fill={color}
          className={cn("font-mono font-bold", fontSize)}
          style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
        >
          {score}
        </text>
      </svg>
      {showLabel && (
        <span
          className={cn("font-mono font-semibold tracking-widest", labelSize)}
          style={{ color }}
        >
          {getLabel(score)}
        </span>
      )}
    </div>
  );
}
