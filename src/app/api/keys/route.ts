import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const KEYS_FILE = path.join(process.cwd(), "data", "keys.json");

interface StoredKey {
  id: string;
  userId: string;
  name: string;
  prefix: string;
  hash: string;
  createdAt: string;
  lastUsed: string | null;
}

async function ensureDataDir() {
  const dir = path.dirname(KEYS_FILE);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

async function readKeys(): Promise<StoredKey[]> {
  try {
    const data = await fs.readFile(KEYS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeKeys(keys: StoredKey[]) {
  await ensureDataDir();
  await fs.writeFile(KEYS_FILE, JSON.stringify(keys, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nama key diperlukan." },
        { status: 400 }
      );
    }

    // Generate key: aimudah- + 22 hex characters
    const raw = randomBytes(11).toString("hex"); // 11 bytes = 22 hex chars
    const key = `aimudah-${raw}`;
    const prefix = `aimudah-${raw.slice(0, 8)}`;
    const hash = createHash("sha256").update(key).digest("hex");
    const id = randomBytes(12).toString("hex");

    const apiKey: StoredKey = {
      id,
      userId: "dev-user", // TODO: get from session
      name,
      prefix,
      hash,
      createdAt: new Date().toISOString(),
      lastUsed: null,
    };

    const keys = await readKeys();
    keys.push(apiKey);
    await writeKeys(keys);

    return NextResponse.json({
      key, // Only returned once
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        prefix: apiKey.prefix,
        createdAt: apiKey.createdAt,
        lastUsed: apiKey.lastUsed,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Ralat dalaman: ${err.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  const keys = await readKeys();
  const allKeys = keys
    .filter((k) => !(k as any).revoked)
    .map((k) => ({
      id: k.id,
      name: k.name,
      prefix: k.prefix,
      createdAt: k.createdAt,
      lastUsed: k.lastUsed,
    }));

  return NextResponse.json({ keys: allKeys });
}
