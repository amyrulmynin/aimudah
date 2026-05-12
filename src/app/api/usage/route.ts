import { NextRequest, NextResponse } from "next/server";
import { readUsage, getUsageStats } from "@/lib/usage";

export async function GET(req: NextRequest) {
  const entries = await readUsage();
  const stats = getUsageStats(entries);

  // Get recent logs (last 50)
  const recent = entries
    .slice(-50)
    .reverse()
    .map((e) => ({
      id: e.id,
      model: e.model,
      inputTokens: e.inputTokens,
      outputTokens: e.outputTokens,
      totalTokens: e.totalTokens,
      status: e.status,
      latencyMs: e.latencyMs,
      createdAt: e.createdAt,
    }));

  return NextResponse.json({ stats, recent });
}
