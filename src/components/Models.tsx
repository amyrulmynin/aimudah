export default function Models() {
  const models = [
    { name: "Claude Haiku 4.5", provider: "Anthropic", tier: "PERCUMA" },
    { name: "Claude Sonnet 4.5", provider: "Anthropic", tier: "PERCUMA" },
    { name: "Claude Sonnet 4.5 (1M)", provider: "Anthropic", tier: "PERCUMA" },
    { name: "DeepSeek 3.2", provider: "DeepSeek", tier: "PERCUMA" },
    { name: "MiniMax M2.1", provider: "MiniMax", tier: "PERCUMA" },
    { name: "MiniMax M2.5", provider: "MiniMax", tier: "PERCUMA" },
    { name: "Claude Opus 4.6", provider: "Anthropic", tier: "PRO" },
    { name: "Claude Opus 4.7", provider: "Anthropic", tier: "PRO" },
    { name: "Claude Sonnet 4", provider: "Anthropic", tier: "PRO" },
    { name: "GPT-5", provider: "OpenAI", tier: "PRO" },
    { name: "GPT-5.4", provider: "OpenAI", tier: "PRO" },
    { name: "GPT-5.5", provider: "OpenAI", tier: "SULTAN" },
    { name: "Gemini 2.5 Pro", provider: "Google", tier: "PRO" },
    { name: "Gemini 3 Flash", provider: "Google", tier: "PRO" },
    { name: "Gemini 3.1 Pro", provider: "Google", tier: "PRO" },
    { name: "Kimi K2.5", provider: "Moonshot", tier: "PRO" },
    { name: "Auto (Smart Routing)", provider: "AIMudah", tier: "PRO" },
  ];

  const tierColor: Record<string, string> = {
    PERCUMA: "bg-green-100 text-green-700",
    PRO: "bg-blue-100 text-blue-700",
    SULTAN: "bg-purple-100 text-purple-700",
  };

  return (
    <section id="models" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          10+ Model AI Premium
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Satu API key, akses semua. Dari Claude hingga GPT-5, Gemini dan lain-lain.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <div
              key={model.name}
              className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-900">{model.name}</p>
                <p className="text-sm text-gray-500">{model.provider}</p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${tierColor[model.tier]}`}
              >
                {model.tier}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
