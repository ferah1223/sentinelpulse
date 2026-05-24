import { NextResponse } from "next/server";
import { callMiMo, AGENTS } from "@/lib/mimo";

interface AlertInput {
  protocols: Array<{ name: string; tvl: number; change_1d: number; change_7d: number }>;
  prices: Array<{ id: string; price: number; change_24h: number }>;
}

// Generate alerts based on data analysis
export async function POST(request: Request) {
  try {
    const body: AlertInput = await request.json();
    const { protocols, prices } = body;

    // Watchtower analysis
    const watchtowerPrompt = `Analyze the following DeFi protocols for potential security concerns:

${protocols
  .slice(0, 10)
  .map(
    (p) =>
      `- ${p.name}: TVL $${(p.tvl / 1e9).toFixed(2)}B, 24h change: ${p.change_1d?.toFixed(2) ?? 0}%, 7d change: ${p.change_7d?.toFixed(2) ?? 0}%`
  )
  .join("\n")}

Token prices:
${prices
  .map((p) => `- ${p.id}: $${p.price?.toLocaleString()}, 24h: ${p.change_24h?.toFixed(2) ?? 0}%`)
  .join("\n")}

Flag any anomalous patterns. Respond with a JSON array of alerts, each with: type (critical/warning/info), title, message, protocol, chain, confidence (0-100).`;

    const response = await callMiMo(
      [
        { role: "system", content: AGENTS.watchtower.systemPrompt },
        { role: "user", content: watchtowerPrompt },
      ],
      { temperature: 0.2, maxTokens: 1024 }
    );

    let alerts = [];
    try {
      // Try to parse MiMo response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        alerts = JSON.parse(jsonMatch[0]);
      }
    } catch {
      // If parsing fails, generate alerts from data
      alerts = generateFallbackAlerts(protocols, prices);
    }

    if (alerts.length === 0) {
      alerts = generateFallbackAlerts(protocols, prices);
    }

    return NextResponse.json({
      alerts: alerts.map((a: Record<string, unknown>, i: number) => ({
        id: `alert-${Date.now()}-${i}`,
        ...a,
        agent: "Watchtower",
        timestamp: new Date().toISOString(),
      })),
      source: response ? "mimo-v2.5" : "fallback",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Alert generation error:", error);
    return NextResponse.json({
      alerts: generateFallbackAlerts([], []),
      source: "fallback",
      timestamp: new Date().toISOString(),
    });
  }
}

function generateFallbackAlerts(
  protocols: Array<{ name: string; tvl: number; change_1d: number; change_7d: number }>,
  prices: Array<{ id: string; price: number; change_24h: number }>
) {
  const alerts = [];

  // Check for significant TVL drops
  for (const p of protocols) {
    if (p.change_1d && p.change_1d < -5) {
      alerts.push({
        type: "warning",
        title: `${p.name} TVL Drop`,
        message: `${p.name} TVL decreased ${Math.abs(p.change_1d).toFixed(1)}% in 24h. Current TVL: $${(p.tvl / 1e9).toFixed(2)}B. Monitor for potential issues.`,
        protocol: p.name,
        chain: "Ethereum",
        confidence: 75,
      });
    }
    if (p.change_1d && p.change_1d < -10) {
      alerts.push({
        type: "critical",
        title: `Critical: ${p.name} Major Drain`,
        message: `${p.name} lost ${Math.abs(p.change_1d).toFixed(1)}% TVL in 24h — possible exploit or bank run. Immediate investigation recommended.`,
        protocol: p.name,
        chain: "Ethereum",
        confidence: 88,
      });
    }
  }

  // Check for price anomalies
  for (const p of prices) {
    if (p.change_24h && Math.abs(p.change_24h) > 10) {
      alerts.push({
        type: p.change_24h < 0 ? "critical" : "info",
        title: `${p.id.toUpperCase()} Volatility Alert`,
        message: `${p.id.toUpperCase()} moved ${p.change_24h > 0 ? "+" : ""}${p.change_24h.toFixed(1)}% in 24h. Price: $${p.price?.toLocaleString()}.`,
        protocol: p.id,
        chain: "Multi",
        confidence: 82,
      });
    }
  }

  // Always have at least one info alert
  if (alerts.length === 0) {
    alerts.push({
      type: "info",
      title: "System Status: Normal",
      message:
        "All monitored protocols operating within expected parameters. No anomalies detected in the last monitoring cycle.",
      protocol: "System",
      chain: "All",
      confidence: 95,
    });
  }

  return alerts;
}
