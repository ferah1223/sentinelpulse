import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chain = searchParams.get("chain");

  try {
    let url = "https://api.llama.fi/protocols";
    if (chain) {
      url = `https://api.llama.fi/protocols?chain=${chain}`;
    }

    const response = await fetch(url, { next: { revalidate: 30 } });

    if (!response.ok) {
      throw new Error("DeFiLlama protocols API error");
    }

    const protocols = await response.json();

    const topProtocols = protocols
      .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
        (b.tvl as number) - (a.tvl as number)
      )
      .slice(0, 50)
      .map((p: Record<string, unknown>) => ({
        id: p.slug,
        name: p.name,
        symbol: (p.symbol as string)?.toUpperCase() ?? "—",
        tvl: p.tvl as number,
        change_1h: (p.change_1h as number) ?? 0,
        change_1d: (p.change_1d as number) ?? 0,
        change_7d: (p.change_7d as number) ?? 0,
        chain: (p.chains as string[])?.[0] ?? "Multi",
        category: (p.category as string) ?? "DeFi",
        logo: p.logo,
      }));

    return NextResponse.json({
      protocols: topProtocols,
      count: topProtocols.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Protocols API error:", error);
    return NextResponse.json({
      protocols: [
        { id: "lido", name: "Lido", symbol: "LDO", tvl: 33_500_000_000, change_1h: 0.1, change_1d: 1.5, change_7d: 3.2, chain: "Ethereum", category: "Liquid Staking" },
        { id: "aave", name: "Aave", symbol: "AAVE", tvl: 12_800_000_000, change_1h: -0.2, change_1d: 0.8, change_7d: 2.1, chain: "Ethereum", category: "Lending" },
        { id: "eigenlayer", name: "EigenLayer", symbol: "EIGEN", tvl: 11_200_000_000, change_1h: 0.5, change_1d: 2.3, change_7d: 8.5, chain: "Ethereum", category: "Restaking" },
        { id: "makerdao", name: "MakerDAO", symbol: "MKR", tvl: 8_400_000_000, change_1h: 0, change_1d: 0.5, change_7d: 1.8, chain: "Ethereum", category: "CDP" },
        { id: "uniswap", name: "Uniswap", symbol: "UNI", tvl: 6_200_000_000, change_1h: 0.3, change_1d: -0.5, change_7d: -1.2, chain: "Multi", category: "DEX" },
        { id: "rocket-pool", name: "Rocket Pool", symbol: "RPL", tvl: 4_800_000_000, change_1h: 0.1, change_1d: 0.9, change_7d: 2.5, chain: "Ethereum", category: "Liquid Staking" },
        { id: "compound", name: "Compound", symbol: "COMP", tvl: 3_200_000_000, change_1h: -0.1, change_1d: -1.2, change_7d: -2.8, chain: "Ethereum", category: "Lending" },
        { id: "curve", name: "Curve", symbol: "CRV", tvl: 2_800_000_000, change_1h: 0.2, change_1d: 0.3, change_7d: 1.5, chain: "Multi", category: "DEX" },
        { id: "pendle", name: "Pendle", symbol: "PENDLE", tvl: 4_500_000_000, change_1h: 0.8, change_1d: 3.5, change_7d: 12.3, chain: "Multi", category: "Yield" },
        { id: "morpho", name: "Morpho", symbol: "MORPHO", tvl: 3_100_000_000, change_1h: 0.4, change_1d: 2.1, change_7d: 7.8, chain: "Ethereum", category: "Lending" },
      ],
      count: 10,
      timestamp: new Date().toISOString(),
      fallback: true,
    });
  }
}
