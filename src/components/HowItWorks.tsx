export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Daftar & Log Masuk",
      desc: "Klik satu butang — log masuk dengan Google. Tiada borang, tiada password.",
    },
    {
      num: "2",
      title: "Dapatkan API Key",
      desc: "Generate API key dari dashboard. Salin Base URL dan key.",
    },
    {
      num: "3",
      title: "Mula Coding",
      desc: "Paste ke Cursor, VS Code, atau mana-mana OpenAI-compatible client. Siap!",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          3 Langkah Mudah
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Tak perlu setup complicated. Dalam 2 minit, dah boleh guna AI premium.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="text-center p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition"
            >
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
