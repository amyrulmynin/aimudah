import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin, readUsers, activateUser } from "@/lib/users";
import { promises as fs } from "fs";
import path from "path";

const KEYS_FILE = path.join(process.cwd(), "data", "keys.json");
const USAGE_FILE = path.join(process.cwd(), "data", "usage.json");

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const users = await readUsers();

  let keys: any[] = [];
  try {
    keys = JSON.parse(await fs.readFile(KEYS_FILE, "utf-8"));
  } catch {}

  let usageCount = 0;
  try {
    const usage = JSON.parse(await fs.readFile(USAGE_FILE, "utf-8"));
    usageCount = usage.length;
  } catch {}

  return NextResponse.json({ users, totalKeys: keys.length, totalUsage: usageCount });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
  }

  const { action, email, plan, days } = await req.json();

  if (action === "activate" && email && plan && days) {
    await activateUser(email, plan, days);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Action tidak sah." }, { status: 400 });
}
