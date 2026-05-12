import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasActiveSubscription, getUserPlan, isAdmin } from "@/lib/users";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ active: false, error: "Tidak log masuk." }, { status: 401 });
  }

  const email = session.user.email;
  const active = await hasActiveSubscription(email);
  const user = await getUserPlan(email);

  return NextResponse.json({
    active,
    plan: user?.plan || null,
    isAdmin: isAdmin(email),
    expiresAt: user?.expiresAt || null,
  });
}
