import { NextResponse } from "next/server";

// In-memory storage for agent statuses
let agentStatuses = [
  {
    name: "Watchtower",
    status: "active" as const,
    lastRun: new Date().toISOString(),
    tasksCompleted: 1247,
    tokensUsed: 45_820,
  },
  {
    name: "Validator",
    status: "active" as const,
    lastRun: new Date(Date.now() - 30000).toISOString(),
    tasksCompleted: 892,
    tokensUsed: 32_150,
  },
  {
    name: "Alert",
    status: "active" as const,
    lastRun: new Date(Date.now() - 15000).toISOString(),
    tasksCompleted: 2_103,
    tokensUsed: 67_430,
  },
  {
    name: "Analyst",
    status: "idle" as const,
    lastRun: new Date(Date.now() - 120000).toISOString(),
    tasksCompleted: 456,
    tokensUsed: 89_200,
  },
];

export async function GET() {
  return NextResponse.json({
    agents: agentStatuses,
    timestamp: new Date().toISOString(),
  });
}
