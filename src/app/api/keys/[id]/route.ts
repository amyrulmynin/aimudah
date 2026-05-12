import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const KEYS_FILE = path.join(process.cwd(), "data", "keys.json");

async function readKeys(): Promise<any[]> {
  try {
    const data = await fs.readFile(KEYS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeKeys(keys: any[]) {
  await fs.writeFile(KEYS_FILE, JSON.stringify(keys, null, 2));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "Sila log masuk terlebih dahulu." },
      { status: 401 }
    );
  }

  const userId = (session.user as any).id || session.user.email;
  const { id } = await params;
  const keys = await readKeys();
  const key = keys.find((k) => k.id === id && k.userId === userId);

  if (!key) {
    return NextResponse.json({ error: "Key tidak dijumpai." }, { status: 404 });
  }

  key.revoked = true;
  await writeKeys(keys);

  return NextResponse.json({ success: true });
}
