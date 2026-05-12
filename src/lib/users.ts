import { promises as fs } from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

const ADMIN_EMAIL = "amyrulmynin@gmail.com";

export interface UserRecord {
  email: string;
  plan: string; // "PRO" | "PREMIUM" | "SULTAN" | "ADMIN"
  paidAt: string | null;
  expiresAt: string | null;
}

async function ensureDataDir() {
  try {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  } catch {}
}

export async function readUsers(): Promise<UserRecord[]> {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users: UserRecord[]) {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export function isAdmin(email: string): boolean {
  return email === ADMIN_EMAIL;
}

export async function getUserPlan(email: string): Promise<UserRecord | null> {
  if (isAdmin(email)) {
    return { email, plan: "ADMIN", paidAt: null, expiresAt: null };
  }
  const users = await readUsers();
  return users.find((u) => u.email === email) || null;
}

export async function hasActiveSubscription(email: string): Promise<boolean> {
  if (isAdmin(email)) return true;
  const user = await getUserPlan(email);
  if (!user || !user.expiresAt) return false;
  return new Date(user.expiresAt) > new Date();
}

export async function activateUser(email: string, plan: string, days: number) {
  const users = await readUsers();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

  const existing = users.find((u) => u.email === email);
  if (existing) {
    existing.plan = plan;
    existing.paidAt = now.toISOString();
    existing.expiresAt = expiresAt;
  } else {
    users.push({ email, plan, paidAt: now.toISOString(), expiresAt });
  }

  await writeUsers(users);
}
