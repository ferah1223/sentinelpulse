"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { formatUsd } from "@/lib/utils";

interface ChainMapProps {
  className?: string;
}

export function ChainMap({ className }: ChainMapProps) {
  const [data, setData] = useState<Array<{ name: string; tvl: number; color: string }>>([]);

  useEffect(() => {
    fetch("/api/tvl")
      .then((r) => r.json())
      .then((d) => {
        if (d.chains) {
          setData(d.chains.slice(0, 8));
        }
      })
      .catch(() => {
        setData([
          { name: "Ethereum", tvl: 52_000_000_000, color: "#627EEA" },
          { name: "Solana", tvl: 8_500_000_000, color: "#9945FF" },
          { name: "BSC", tvl: 5_200_000_000, color: "#F0B90B" },
          { name: "Arbitrum", tvl: 3_100_000_000, color: "#28A0F0" },
          { name: "Base", tvl: 2_800_000_000, color: "#0052FF" },
          { name: "Polygon", tvl: 1_200_000_000, color: "#8247E5" },
          { name: "Optimism", tvl: 900_000_000, color: "#FF0420" },
          { name: "Avalanche", tvl: 1_100_000_000, color: "#E84142" },
        ]);
      });
  }, []);

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Chain Distribution</h3>
        <p className="text-xs text-text-muted">TVL by blockchain network</p>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis
              type="number"
              tick={{ fill: "#5A5E72", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1e9).toFixed(0)}B`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#8B8FA3", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                background: "#1C1F2E",
                border: "1px solid #232740",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => [formatUsd(Number(value)), "TVL"]}
            />
            <Bar dataKey="tvl" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
