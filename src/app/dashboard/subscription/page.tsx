"use client";

import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/subscription")
      .then((r) => r.json())
      .then((d) => {
        setCurrentPlan(d.plan);
        setExpiresAt(d.expiresAt);
        setIsAdmin(d.isAdmin);
      })
      .catch(() => {});
  }, []);

  const planLabel = (id: string) => {
    const labels: Record<string, string> = {
      PRO_1D_200M: "PRO — 1 Hari, 200M tokens",
      PRO_3D_200M: "PRO — 3 Hari, 200M tokens",
      PRO_7D_50M: "PRO — 7 Hari, 50M/hari",
      PRO_7D_100M: "PRO — 7 Hari, 100M/hari",
      PRO_7D_200M: "PRO — 7 Hari, 200M/hari",
      PROMAX_1D_200M: "PRO MAX — 1 Hari, 200M tokens",
      PROMAX_7D_150M: "PRO MAX — 7 Hari, 150M tokens",
      PROMAX_7D_30M: "PRO MAX — 7 Hari, 30M/hari",
      ADMIN: "ADMIN",
    };
    return labels[id] || id;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Langganan</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Plan Semasa</h2>
        {currentPlan ? (
          <>
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {isAdmin ? "ADMIN" : planLabel(currentPlan)}
              </span>
              <span className="text-sm text-gray-500">Aktif</span>
            </div>
            {expiresAt && !isAdmin && (
              <p className="text-sm text-gray-500 mt-2">
                Tamat: {new Date(expiresAt).toLocaleDateString("ms-MY", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
            {isAdmin && (
              <p className="text-sm text-gray-500 mt-2">Akses penuh tanpa had.</p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">Memuatkan...</p>
        )}
      </div>

      {!isAdmin && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tukar / Renew Plan</h2>
          <a
            href="/payment"
            className="inline-block bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition"
          >
            Lihat Semua Plan
          </a>
        </div>
      )}
    </div>
  );
}
