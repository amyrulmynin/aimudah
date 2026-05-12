import { promises as fs } from "fs";
import path from "path";

const USAGE_FILE = path.join(process.cwd(), "data", "usage.json");

export interface UsageEntry {
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

async function ensureDataDir() {
  const dir = path.dirname(USAGE_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

export async function readUsage(): Promise<UsageEntry[]> {
  try {
    const data = await fs.readFile(USAGE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsage(entries: UsageEntry[]) {
  await ensureDataDir();
  await fs.writeFile(USAGE_FILE, JSON.stringify(entries, null, 2));
}

export async function logUsage(entry: Omit<UsageEntry, "id" | "createdAt">) {
  const entries = await readUsage();
  const newEntry: UsageEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  entries.push(newEntry);

  // Keep last 10000 entries max
  if (entries.length > 10000) {
    entries.splice(0, entries.length - 10000);
  }

  await writeUsage(entries);
  return newEntry;
}

export function getUsageStats(entries: UsageEntry[]) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const today = entries.filter((e) => e.createdAt >= todayStart);
  const thisMonth = entries.filter((e) => e.createdAt >= monthStart);

  const todayTokens = today.reduce((sum, e) => sum + e.totalTokens, 0);
  const monthTokens = thisMonth.reduce((sum, e) => sum + e.totalTokens, 0);

  // Per model breakdown
  const modelUsage: Record<string, { count: number; tokens: number }> = {};
  for (const e of thisMonth) {
    if (!modelUsage[e.model]) {
      modelUsage[e.model] = { count: 0, tokens: 0 };
    }
    modelUsage[e.model].count++;
    modelUsage[e.model].tokens += e.totalTokens;
  }

  return {
    today: {
      requests: today.length,
      tokens: todayTokens,
    },
    month: {
      requests: thisMonth.length,
      tokens: monthTokens,
    },
    total: {
      requests: entries.length,
      tokens: entries.reduce((sum, e) => sum + e.totalTokens, 0),
    },
    modelUsage,
  };
}
