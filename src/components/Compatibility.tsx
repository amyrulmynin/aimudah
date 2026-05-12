export default function Compatibility() {
  const tools = [
    "Cursor",
    "VS Code",
    "Kilo Code",
    "Cline",
    "Continue",
    "Windsurf",
    "OpenCode",
    "Aider",
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Serasi dengan Semua Tools
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          AIMudah 100% compatible dengan format OpenAI API. Tukar Base URL, terus guna.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tools.map((tool) => (
            <div
              key={tool}
              className="bg-white border border-gray-200 rounded-xl px-6 py-3 font-medium text-gray-700 hover:border-primary-300 hover:text-primary-600 transition"
            >
              {tool}
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 max-w-xl mx-auto text-left">
          <p className="text-gray-400 text-sm mb-3">Contoh setup untuk Cursor / VS Code:</p>
          <pre className="text-sm text-green-400 overflow-x-auto">
{`// settings.json
{
  "openai.baseUrl": "https://aimudah.my.id/api/v1",
  "openai.apiKey": "sk-aimudah-xxxxx",
  "openai.model": "claude-sonnet-4.5"
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}
