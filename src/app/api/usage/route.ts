import { NextResponse } from "next/server";
import { readUsage, getUsageStats } from "@/lib/usage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const entries = await readUsage();
    const stats = getUsageStats(entries);

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
  } catch (err: any) {
    return NextResponse.json({ stats: { today: { requests: 0, tokens: 0 }, month: { requests: 0, tokens: 0 }, total: { requests: 0, tokens: 0 }, modelUsage: {} }, recent: [] });
  }
}
