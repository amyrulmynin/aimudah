"use client";

const plans = [
  {
    id: "FREE",
    name: "PERCUMA",
    price: "RM0",
    period: "/bulan",
    features: ["100 request/hari", "6 req/minit", "1 concurrent", "Model percuma"],
    current: true,
  },
  {
    id: "PRO",
    name: "PRO",
    price: "RM13",
    period: "/bulan",
    features: ["500 request/hari", "30 req/minit", "2 concurrent", "Semua model PRO"],
    current: false,
  },
  {
    id: "PREMIUM",
    name: "PREMIUM",
    price: "RM26",
    period: "/bulan",
    features: ["2,000 request/hari", "60 req/minit", "4 concurrent", "Semua model PRO"],
    current: false,
  },
  {
    id: "SULTAN",
    name: "SULTAN",
    price: "RM45",
    period: "/bulan",
    features: ["Unlimited", "90 req/minit", "10 concurrent", "Semua model"],
    current: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Langganan</h1>

      {/* Current plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Plan Semasa
        </h2>
        <div className="flex items-center gap-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            PERCUMA
          </span>
          <span className="text-sm text-gray-500">Aktif</span>
        </div>
      </div>

      {/* Upgrade options */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border-2 p-5 ${
              plan.current
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <h3 className="font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-2xl font-bold">{plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-1.5 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="text-sm text-gray-600 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={`w-full py-2 rounded-lg text-sm font-medium transition ${
                plan.current
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              {plan.current ? "Plan Semasa" : "Naik Taraf"}
            </button>
          </div>
        ))}
      </div>

      {/* Billing history */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Sejarah Bil
        </h2>
        <p className="text-sm text-gray-500">Tiada sejarah pembayaran.</p>
      </div>
    </div>
  );
}
