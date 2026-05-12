export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          13 Model AI Premium — Satu API Key
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          AI Premium untuk Semua.
          <br />
          <span className="text-primary-600">Harga Mampu Milik.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Akses Claude, DeepSeek, Qwen dan 13 model AI lain dengan satu API key.
          Drop-in replacement untuk OpenAI — tukar URL, terus guna.
          Bermula dari <strong>RM13/bulan</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/login"
            className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200"
          >
            Mula Sekarang
          </a>
          <a
            href="#pricing"
            className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary-300 hover:text-primary-600 transition"
          >
            Lihat Harga
          </a>
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-6 max-w-2xl mx-auto text-left shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-gray-400 text-sm ml-2">config.json</span>
          </div>
          <pre className="text-sm text-green-400 overflow-x-auto">
{`{
  "apiKey": "aimudah-xxxxxxxxxxxxxxxxxxxx",
  "baseUrl": "https://aimudah.my.id/api/v1",
  "model": "aimudah/claude-sonnet-4.5"
}`}
          </pre>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Tukar Base URL dan API Key — selesai. Guna di Cursor, VS Code, Kilo Code, dan lain-lain.
        </p>
      </div>
    </section>
  );
}
