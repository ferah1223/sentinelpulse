import { NextResponse } from "next/server";

const CHAIN_COLORS: Record<string, string> = {
  Ethereum: "#627EEA",
  "BSC": "#F0B90B",
  Polygon: "#8247E5",
  Arbitrum: "#28A0F0",
  Optimism: "#FF0420",
  Base: "#0052FF",
  Solana: "#9945FF",
  Avalanche: "#E84142",
  Fantom: "#1969FF",
  "Cronos": "#002D74",
};

export async function GET() {
  try {
    const response = await fetch("https://api.llama.fi/v2/chains", {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error("DeFiLlama API error");
    }

    const chains = await response.json();

    const chainTvls = chains.slice(0, 15).map((chain: Record<string, unknown>) => ({
      name: chain.name,
      tvl: chain.tvl as number,
      change_24h: (chain.change_1d as number) ?? 0,
      color: CHAIN_COLORS[chain.name as string] ?? "#8B8FA3",
    }));

    const totalTvl = chainTvls.reduce(
      (sum: number, c: { tvl: number }) => sum + c.tvl,
      0
    );

    return NextResponse.json({
      totalTvl,
      chains: chainTvls,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("TVL API error:", error);
    // Return fallback data
    return NextResponse.json({
      totalTvl: 85_000_000_000,
      chains: [
        { name: "Ethereum", tvl: 52_000_000_000, change_24h: 1.2, color: "#627EEA" },
        { name: "BSC", tvl: 5_200_000_000, change_24h: -0.5, color: "#F0B90B" },
        { name: "Arbitrum", tvl: 3_100_000_000, change_24h: 2.1, color: "#28A0F0" },
        { name: "Base", tvl: 2_800_000_000, change_24h: 5.3, color: "#0052FF" },
        { name: "Polygon", tvl: 1_200_000_000, change_24h: -1.1, color: "#8247E5" },
        { name: "Optimism", tvl: 900_000_000, change_24h: 0.8, color: "#FF0420" },
        { name: "Solana", tvl: 8_500_000_000, change_24h: 3.2, color: "#9945FF" },
        { name: "Avalanche", tvl: 1_100_000_000, change_24h: -0.3, color: "#E84142" },
      ],
      timestamp: new Date().toISOString(),
      fallback: true,
    });
  }
}
