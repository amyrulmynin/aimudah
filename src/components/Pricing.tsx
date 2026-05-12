"use client";

import { useState } from "react";

export default function Pricing() {
  const [tab, setTab] = useState<"bulanan" | "harian">("bulanan");

  const bulanan = [
    {
      name: "PERCUMA",
      price: "RM0",
      period: "/bulan",
      features: [
        "100 request/hari",
        "6 req/minit",
        "1 concurrent",
        "Model percuma sahaja",
      ],
      cta: "Mula Percuma",
      highlight: false,
    },
    {
      name: "PRO",
      price: "RM13",
      period: "/bulan",
      features: [
        "500 request/hari",
        "30 req/minit",
        "2 concurrent",
        "Semua model PRO",
      ],
      cta: "Langgan PRO",
      highlight: true,
    },
    {
      name: "PREMIUM",
      price: "RM26",
      period: "/bulan",
      features: [
        "2,000 request/hari",
        "60 req/minit",
        "4 concurrent",
        "Semua model PRO",
      ],
      cta: "Langgan Premium",
      highlight: false,
    },
    {
      name: "SULTAN",
      price: "RM45",
      period: "/bulan",
      features: [
        "Unlimited request",
        "90 req/minit",
        "10 concurrent",
        "Semua model termasuk GPT-5.5",
      ],
      cta: "Langgan Sultan",
      highlight: false,
    },
  ];

  const harian = [
    {
      name: "Harian Biasa",
      price: "RM13",
      period: "/hari",
      features: ["75M token", "60 req/minit", "Semua model PRO"],
      cta: "Beli Harian",
      highlight: false,
    },
    {
      name: "Harian Kenyang",
      price: "RM22",
      period: "/hari",
      features: ["250M token", "90 req/minit", "Semua model PRO"],
      cta: "Beli Kenyang",
      highlight: true,
    },
    {
      name: "Harian Sultan",
      price: "RM45",
      period: "/hari",
      features: ["500M token", "90 req/minit", "Semua model termasuk GPT-5.5"],
      cta: "Beli Sultan",
      highlight: false,
    },
  ];

  const plans = tab === "bulanan" ? bulanan : harian;

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
              onClick={() => setTab("bulanan")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                tab === "bulanan"
                  ? "bg-white text-primary-600 shadow"
                  : "text-gray-600"
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setTab("harian")}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                tab === "harian"
                  ? "bg-white text-primary-600 shadow"
                  : "text-gray-600"
              }`}
            >
              Harian
            </button>
          </div>
        </div>

        <div className={`grid gap-6 ${tab === "bulanan" ? "md:grid-cols-4" : "md:grid-cols-3"} max-w-5xl mx-auto`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border-2 ${
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
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/login"
                className={`block text-center py-2.5 rounded-lg font-medium transition ${
                  plan.highlight
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Semua harga termasuk SST. Pembayaran melalui FPX, e-wallet, atau bank transfer.
        </p>
      </div>
    </section>
  );
}
