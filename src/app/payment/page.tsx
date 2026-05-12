"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const proPlans = [
  { id: "PRO_1D_200M", duration: "1 Hari", price: "RM10", tokens: "200M tokens", reset: "No daily reset" },
  { id: "PRO_3D_200M", duration: "3 Hari", price: "RM15", tokens: "200M tokens", reset: "No daily reset" },
  { id: "PRO_7D_50M", duration: "7 Hari", price: "RM25", tokens: "50M tokens/hari", reset: "Daily reset (00:00 MYT)" },
  { id: "PRO_7D_100M", duration: "7 Hari", price: "RM35", tokens: "100M tokens/hari", reset: "Daily reset (00:00 MYT)", highlight: true },
  { id: "PRO_7D_200M", duration: "7 Hari", price: "RM50", tokens: "200M tokens/hari", reset: "Daily reset (00:00 MYT)" },
];

const promaxPlans = [
  { id: "PROMAX_1D_200M", duration: "1 Hari", price: "RM13", tokens: "200M tokens", reset: "No daily reset" },
  { id: "PROMAX_7D_150M", duration: "7 Hari", price: "RM18", tokens: "150M tokens", reset: "No daily reset" },
  { id: "PROMAX_7D_30M", duration: "7 Hari", price: "RM25", tokens: "30M tokens/hari", reset: "Daily reset (01:00 MYT)", highlight: true },
];

export default function PaymentWallPage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState<"pro" | "promax">("pro");
  const [selected, setSelected] = useState("PRO_7D_100M");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const plans = tab === "pro" ? proPlans : promaxPlans;

  const handlePay = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Pembayaran berjaya! Mengalihkan ke dashboard...");
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      } else {
        setMessage(data.error || "Pembayaran gagal.");
      }
    } catch {
      setMessage("Ralat rangkaian. Cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            AIMudah
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-6">Pilih Plan Anda</h1>
          <p className="text-gray-600 mt-2">Langgan untuk mula guna AI premium. Bayar dalam RM.</p>
        </div>

        {/* Tab */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-xl p-1 inline-flex">
            <button
              onClick={() => { setTab("pro"); setSelected("PRO_7D_100M"); }}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                tab === "pro" ? "bg-white text-primary-600 shadow" : "text-gray-600"
              }`}
            >
              PRO
            </button>
            <button
              onClick={() => { setTab("promax"); setSelected("PROMAX_7D_30M"); }}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                tab === "promax" ? "bg-white text-primary-600 shadow" : "text-gray-600"
              }`}
            >
              PRO MAX
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className={`grid gap-4 ${plans.length > 3 ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" : "md:grid-cols-3"} mb-8`}>
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`rounded-xl p-4 border-2 text-left transition ${
                selected === plan.id
                  ? "border-primary-500 bg-primary-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {plan.highlight && (
                <span className="text-xs font-bold text-primary-600 uppercase">Popular</span>
              )}
              <div className="text-xs text-gray-500 uppercase font-medium mt-1">{plan.duration}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{plan.price}</div>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p>{plan.tokens}</p>
                <p>{plan.reset}</p>
                <p>30 RPM</p>
              </div>
            </button>
          ))}
        </div>

        {/* Pay button */}
        <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-200 p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">
              Pembayaran dummy — klik bayar untuk aktifkan terus.
            </p>
          </div>
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : `Bayar & Aktifkan`}
          </button>
          {message && (
            <p className={`mt-3 text-sm text-center ${message.includes("berjaya") ? "text-green-700" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
