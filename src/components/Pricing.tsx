"use client";

import { useState } from "react";

export default function Pricing() {
  const [tab, setTab] = useState<"pro" | "promax">("pro");

  const pro = [
    {
      id: "PRO_1D_200M",
      duration: "1 Hari",
      price: "RM10",
      tokens: "200M tokens",
      reset: "No daily reset",
      rpm: "30 RPM",
    },
    {
      id: "PRO_3D_200M",
      duration: "3 Hari",
      price: "RM15",
      tokens: "200M tokens",
      reset: "No daily reset",
      rpm: "30 RPM",
    },
    {
      id: "PRO_7D_50M",
      duration: "7 Hari",
      price: "RM25",
      tokens: "50M tokens / hari",
      reset: "Daily reset (00:00 MYT)",
      rpm: "30 RPM",
    },
    {
      id: "PRO_7D_100M",
      duration: "7 Hari",
      price: "RM35",
      tokens: "100M tokens / hari",
      reset: "Daily reset (00:00 MYT)",
      rpm: "30 RPM",
      highlight: true,
    },
    {
      id: "PRO_7D_200M",
      duration: "7 Hari",
      price: "RM50",
      tokens: "200M tokens / hari",
      reset: "Daily reset (00:00 MYT)",
      rpm: "30 RPM",
    },
  ];

  const promax = [
    {
      id: "PROMAX_1D_200M",
      duration: "1 Hari",
      price: "RM13",
      tokens: "200M tokens",
      reset: "No daily reset",
      rpm: "30 RPM",
    },
    {
      id: "PROMAX_7D_150M",
      duration: "7 Hari",
      price: "RM18",
      tokens: "150M tokens",
      reset: "No daily reset",
      rpm: "30 RPM",
    },
    {
      id: "PROMAX_7D_30M",
      duration: "7 Hari",
      price: "RM25",
      tokens: "30M tokens / hari",
      reset: "Daily reset (01:00 MYT)",
      rpm: "30 RPM",
      highlight: true,
    },
  ];

  const plans = tab === "pro" ? pro : promax;

  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          Harga Berpatutan
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Bayar dalam RM. Tanpa kad kredit. Pilih plan yang sesuai.
        </p>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-xl p-1 inline-flex">
            <button
              onClick={() => setTab("pro")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                tab === "pro"
                  ? "bg-white text-primary-600 shadow"
                  : "text-gray-600"
              }`}
            >
              PRO
            </button>
            <button
              onClick={() => setTab("promax")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                tab === "promax"
                  ? "bg-white text-primary-600 shadow"
                  : "text-gray-600"
              }`}
            >
              PRO MAX
            </button>
          </div>
        </div>

        <div className={`grid gap-4 ${plans.length > 3 ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" : "md:grid-cols-3"} max-w-6xl mx-auto`}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-5 border-2 ${
                plan.highlight
                  ? "border-primary-500 shadow-xl shadow-primary-100"
                  : "border-gray-100"
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-bold text-primary-600 uppercase mb-2">
                  Popular
                </div>
              )}
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                {plan.duration}
              </div>
              <div className="mb-3">
                <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
              </div>
              <ul className="space-y-2 mb-5 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.tokens}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.reset}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.rpm}
                </li>
              </ul>
              <a
                href="/login"
                className={`block text-center py-2.5 rounded-lg font-medium transition ${
                  plan.highlight
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Beli Sekarang
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Semua harga termasuk SST. Routed through dedicated infrastructure with HA load balancing.
        </p>
      </div>
    </section>
  );
}
