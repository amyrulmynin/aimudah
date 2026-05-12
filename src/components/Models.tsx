export default function Models() {
  const models = [
    { name: "Claude 3.7 Sonnet", id: "aimudah/claude-3.7-sonnet", provider: "Anthropic" },
    { name: "Claude Haiku 4.5", id: "aimudah/claude-haiku-4.5", provider: "Anthropic" },
    { name: "Claude Opus 4.5", id: "aimudah/claude-opus-4.5", provider: "Anthropic" },
    { name: "Claude Opus 4.6", id: "aimudah/claude-opus-4.6", provider: "Anthropic" },
    { name: "Claude Opus 4.7", id: "aimudah/claude-opus-4.7", provider: "Anthropic" },
    { name: "Claude Sonnet 4", id: "aimudah/claude-sonnet-4", provider: "Anthropic" },
    { name: "Claude Sonnet 4.5", id: "aimudah/claude-sonnet-4.5", provider: "Anthropic" },
    { name: "Claude Sonnet 4.6", id: "aimudah/claude-sonnet-4.6", provider: "Anthropic" },
    { name: "DeepSeek 3.2", id: "aimudah/deepseek-3.2", provider: "DeepSeek" },
    { name: "GLM-5", id: "aimudah/glm-5", provider: "Zhipu AI" },
    { name: "MiniMax M2.1", id: "aimudah/minimax-m2.1", provider: "MiniMax" },
    { name: "MiniMax M2.5", id: "aimudah/minimax-m2.5", provider: "MiniMax" },
    { name: "Qwen3 Coder Next", id: "aimudah/qwen3-coder-next", provider: "Alibaba" },
  ];

  return (
    <section id="models" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          13 Model AI Premium
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Satu API key, akses semua. Dari Claude hingga DeepSeek, Qwen dan lain-lain.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-900">{model.name}</p>
                <p className="text-xs text-gray-400 font-mono">{model.id}</p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {model.provider}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
