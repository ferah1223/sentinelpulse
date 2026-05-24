import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ids =
      "bitcoin,ethereum,binancecoin,matic-network,arbitrum,optimism,solana,avalanche-2,fantom";
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`,
      { next: { revalidate: 15 } }
    );

    if (!response.ok) {
      throw new Error("CoinGecko API error");
    }

    const data = await response.json();

    const prices = Object.entries(data as Record<string, Record<string, number>>).map(
      ([id, info]) => ({
        id,
        symbol: id.toUpperCase(),
        price: info.usd,
        change_24h: info.usd_24h_change ?? 0,
        market_cap: info.usd_market_cap ?? 0,
      })
    );

    return NextResponse.json({
      prices,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Prices API error:", error);
    return NextResponse.json({
      prices: [
        { id: "bitcoin", symbol: "BTC", price: 97_500, change_24h: 2.1, market_cap: 1_920_000_000_000 },
        { id: "ethereum", symbol: "ETH", price: 3_450, change_24h: 1.8, market_cap: 415_000_000_000 },
        { id: "binancecoin", symbol: "BNB", price: 620, change_24h: -0.5, market_cap: 92_000_000_000 },
        { id: "solana", symbol: "SOL", price: 185, change_24h: 4.2, market_cap: 85_000_000_000 },
        { id: "matic-network", symbol: "MATIC", price: 0.72, change_24h: -1.2, market_cap: 7_200_000_000 },
      ],
      timestamp: new Date().toISOString(),
      fallback: true,
    });
  }
}
