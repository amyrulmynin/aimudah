import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { activateUser } from "@/lib/users";

const PLAN_DAYS: Record<string, number> = {
  PRO_1D_200M: 1,
  PRO_3D_200M: 3,
  PRO_7D_50M: 7,
  PRO_7D_100M: 7,
  PRO_7D_200M: 7,
  PROMAX_1D_200M: 1,
  PROMAX_7D_150M: 7,
  PROMAX_7D_30M: 7,
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Sila log masuk." }, { status: 401 });
  }

  const { plan } = await req.json();
  if (!PLAN_DAYS[plan]) {
    return NextResponse.json({ error: "Plan tidak sah." }, { status: 400 });
  }

  // Dummy payment — auto activate
  await activateUser(session.user.email, plan, PLAN_DAYS[plan]);

  return NextResponse.json({ success: true, plan });
}
