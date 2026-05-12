import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/users";

const USAGE_FILE = path.join(process.cwd(), "data", "usage.json");

interface UsageEntry {
  id: string;
  userId: string;
  apiKeyPrefix: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  status: number;
  latencyMs: number;
  createdAt: string;
}

async function readUsageFile(): Promise<UsageEntry[]> {
  try {
    const data = await fs.readFile(USAGE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sila log masuk." }, { status: 401 });
  }

  const email = session.user.email;
  const userId = (session.user as any).id || email;
  const allEntries = await readUsageFile();

  // Admin sees all, normal user sees own only
  const entries = isAdmin(email)
    ? allEntries
    : allEntries.filter((e) => e.userId === userId || e.userId === email);

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const today = entries.filter((e) => e.createdAt >= todayStart);
  const thisMonth = entries.filter((e) => e.createdAt >= monthStart);

  const modelUsage: Record<string, { count: number; tokens: number }> = {};
  for (const e of thisMonth) {
    if (!modelUsage[e.model]) modelUsage[e.model] = { count: 0, tokens: 0 };
    modelUsage[e.model].count++;
    modelUsage[e.model].tokens += e.totalTokens;
  }

  const stats = {
    today: { requests: today.length, tokens: today.reduce((s, e) => s + e.totalTokens, 0) },
    month: { requests: thisMonth.length, tokens: thisMonth.reduce((s, e) => s + e.totalTokens, 0) },
    total: { requests: entries.length, tokens: entries.reduce((s, e) => s + e.totalTokens, 0) },
    modelUsage,
  };

  const recent = entries.slice(-50).reverse();
  return NextResponse.json({ stats, recent });
}
