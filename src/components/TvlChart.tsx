"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface TvlChartProps {
  className?: string;
}

export function TvlChart({ className }: TvlChartProps) {
  const [data, setData] = useState<Array<{ time: string; tvl: number }>>([]);

  useEffect(() => {
    // Generate historical TVL data
    const now = Date.now();
    const points = 30;
    const baseTvl = 85_000_000_000;
    const generated = Array.from({ length: points }, (_, i) => {
      const variation = (Math.sin(i * 0.5) + Math.random() * 0.5) * 3_000_000_000;
      return {
        time: new Date(now - (points - i) * 86400000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        tvl: baseTvl + variation + i * 200_000_000,
      };
    });
    setData(generated);
  }, []);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Total Value Locked</h3>
          <p className="text-xs text-text-muted">30-day overview across all chains</p>
        </div>
        <div className="flex gap-1">
          {["24H", "7D", "30D", "90D"].map((range) => (
            <button
              key={range}
              className="px-2 py-1 text-[10px] font-mono text-text-muted hover:text-text-primary rounded transition-colors data-[active=true]:bg-sentinel-green/10 data-[active=true]:text-sentinel-green"
              data-active={range === "30D"}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00FFB2" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00FFB2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fill: "#5A5E72", fontSize: 10 }}
              axisLine={{ stroke: "#232740" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#5A5E72", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1e9).toFixed(0)}B`}
            />
            <Tooltip
              contentStyle={{
                background: "#1C1F2E",
                border: "1px solid #232740",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#8B8FA3" }}
              itemStyle={{ color: "#00FFB2" }}
              formatter={(value) => [`$${(Number(value) / 1e9).toFixed(2)}B`, "TVL"]}
            />
            <Area
              type="monotone"
              dataKey="tvl"
              stroke="#00FFB2"
              strokeWidth={2}
              fill="url(#tvlGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
