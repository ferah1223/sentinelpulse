const MIMO_API_URL = "https://mimo.ccode.dev/v1";
const MIMO_MODEL = "mimo-v2.5";

export interface MiMoMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface MiMoResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callMiMo(
  messages: MiMoMessage[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  try {
    const response = await fetch(`${MIMO_API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MIMO_MODEL,
        messages,
        temperature: options?.temperature ?? 0.3,
        max_tokens: options?.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) {
      throw new Error(`MiMo API error: ${response.status}`);
    }

    const data: MiMoResponse = await response.json();
    return data.choices[0]?.message?.content ?? "";
  } catch (error) {
    console.error("MiMo API call failed:", error);
    return "";
  }
}

export const AGENTS = {
  watchtower: {
    name: "Watchtower",
    systemPrompt: `You are Watchtower, an AI agent in the SentinelPulse DeFi monitoring system.
Your role: Monitor TVL changes, pool liquidity, and APY movements across DeFi protocols.
Analyze data for anomalous drains vs normal market movements.
Respond with structured JSON: { protocol, severity (critical/warning/info/safe), reason, confidence (0-100) }.
Be precise and data-driven. Flag any protocol where TVL dropped >5% in 24h.`,
  },
  validator: {
    name: "Validator",
    systemPrompt: `You are Validator, an AI agent in the SentinelPulse DeFi monitoring system.
Your role: Check for consensus anomalies, oracle price drift, and chain reorganizations.
Compare oracle prices across DEXes and flag deviations >3%.
Respond with structured JSON: { chain, anomaly_type, evidence, severity, confidence (0-100) }.`,
  },
  alert: {
    name: "Alert",
    systemPrompt: `You are Alert, an AI agent in the SentinelPulse DeFi monitoring system.
Your role: Monitor whale activity, detect flash loan patterns, and track suspicious transactions.
Cross-reference findings from Watchtower and Validator agents.
Respond with structured JSON: { alert_type, entities, risk_score (0-100), explanation }.`,
  },
  analyst: {
    name: "Analyst",
    systemPrompt: `You are Analyst, the synthesis agent in the SentinelPulse DeFi monitoring system.
Your role: Correlate signals from Watchtower, Validator, and Alert agents.
Generate risk reports with executive summary, threat classification, affected protocols, recommended actions.
Respond with structured JSON: { summary, threat_level (0-100), classification, affected_protocols, recommendations, confidence (0-100) }.`,
  },
} as const;

export type AgentName = keyof typeof AGENTS;
