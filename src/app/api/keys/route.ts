import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";

// TODO: Replace with Prisma when deployed
// For now, in-memory store for development
const keys: Map<string, { id: string; userId: string; name: string; prefix: string; hash: string; createdAt: string }> = new Map();

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nama key diperlukan." },
        { status: 400 }
      );
    }

    // Generate key
    const raw = randomBytes(32).toString("hex");
    const key = `sk-aimudah-${raw}`;
    const prefix = `sk-aimudah-${raw.slice(0, 8)}`;
    const hash = createHash("sha256").update(key).digest("hex");
    const id = randomBytes(12).toString("hex");

    const apiKey = {
      id,
      userId: "dev-user", // TODO: get from session
      name,
      prefix,
      hash,
      createdAt: new Date().toISOString(),
      lastUsed: null,
    };

    keys.set(id, apiKey);

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
  } catch {
    return NextResponse.json(
      { error: "Ralat dalaman." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const allKeys = Array.from(keys.values()).map((k) => ({
    id: k.id,
    name: k.name,
    prefix: k.prefix,
    createdAt: k.createdAt,
    lastUsed: null,
  }));

  return NextResponse.json({ keys: allKeys });
}
