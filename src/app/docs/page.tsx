"use client";

import { useState } from "react";
import Link from "next/link";

const sections = [
  { id: "getting-started", label: "Mula Cepat" },
  { id: "api-reference", label: "API Reference" },
  { id: "models", label: "Senarai Model" },
  { id: "setup-cursor", label: "Setup Cursor" },
  { id: "setup-vscode", label: "Setup VS Code" },
  { id: "setup-kilocode", label: "Setup Kilo Code" },
  { id: "setup-cline", label: "Setup Cline" },
  { id: "setup-opencode", label: "Setup OpenCode" },
  { id: "errors", label: "Kod Ralat" },
];

export default function DocsPage() {
  const [active, setActive] = useState("getting-started");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary-600">
            AIMudah
          </Link>
          <span className="text-sm text-gray-500">Dokumentasi</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar */}
        <nav className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                className={`block px-3 py-2 rounded-lg text-sm transition ${
                  active === s.id
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 min-w-0 prose prose-gray max-w-none">
          {/* Getting Started */}
          <section id="getting-started">
            <h1 className="text-3xl font-bold text-gray-900">Mula Cepat</h1>
            <p className="text-gray-600 mt-2">
              Dalam 2 minit, anda boleh mula guna AI premium melalui AIMudah.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Daftar Akaun</h2>
            <p>
              Pergi ke{" "}
              <a href="/login" className="text-primary-600 hover:underline">
                halaman login
              </a>{" "}
              dan log masuk dengan Google. Tiada borang, tiada password.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Generate API Key</h2>
            <p>
              Selepas log masuk, pergi ke{" "}
              <a href="/dashboard/keys" className="text-primary-600 hover:underline">
                Dashboard → API Keys
              </a>{" "}
              dan klik &quot;Generate&quot;. Salin key yang dipaparkan.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Guna di Client</h2>
            <p>Tukar Base URL dan API Key dalam mana-mana OpenAI-compatible client:</p>

            <div className="bg-gray-900 rounded-xl p-5 mt-4 overflow-x-auto">
              <pre className="text-sm text-green-400">
{`Base URL: https://aimudah.my.id/api/v1
API Key:  aimudah-xxxxxxxxxxxxxxxxxxxx
Model:    aimudah/claude-sonnet-4.5`}
              </pre>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Test dengan cURL</h2>
            <div className="bg-gray-900 rounded-xl p-5 mt-4 overflow-x-auto">
              <pre className="text-sm text-green-400">
{`curl https://aimudah.my.id/api/v1/chat/completions \\
  -H "Authorization: Bearer aimudah-xxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "aimudah/claude-haiku-4.5",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": false
  }'`}
              </pre>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">API Reference</h1>
            <p className="text-gray-600 mt-2">
              AIMudah 100% compatible dengan format OpenAI API.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Base URL</h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <code className="text-sm font-mono text-primary-700">
                https://aimudah.my.id/api/v1
              </code>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Authentication</h2>
            <p>Gunakan header <code>Authorization</code> dengan format Bearer token:</p>
            <div className="bg-gray-100 rounded-lg p-4 mt-2">
              <code className="text-sm font-mono">
                Authorization: Bearer aimudah-xxxxxxxxxxxxxxxxxxxx
              </code>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">POST /chat/completions</h2>
            <p>Endpoint utama untuk chat completion. Menyokong streaming dan non-streaming.</p>

            <h3 className="text-lg font-medium mt-6 mb-3">Request Body</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 border-b">Parameter</th>
                    <th className="text-left p-3 border-b">Jenis</th>
                    <th className="text-left p-3 border-b">Wajib</th>
                    <th className="text-left p-3 border-b">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b font-mono">model</td>
                    <td className="p-3 border-b">string</td>
                    <td className="p-3 border-b">Ya</td>
                    <td className="p-3 border-b">ID model (cth: aimudah/claude-sonnet-4.5)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b font-mono">messages</td>
                    <td className="p-3 border-b">array</td>
                    <td className="p-3 border-b">Ya</td>
                    <td className="p-3 border-b">Array mesej (role + content)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b font-mono">stream</td>
                    <td className="p-3 border-b">boolean</td>
                    <td className="p-3 border-b">Tidak</td>
                    <td className="p-3 border-b">Aktifkan streaming (default: false)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b font-mono">max_tokens</td>
                    <td className="p-3 border-b">integer</td>
                    <td className="p-3 border-b">Tidak</td>
                    <td className="p-3 border-b">Had token output</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">temperature</td>
                    <td className="p-3">number</td>
                    <td className="p-3">Tidak</td>
                    <td className="p-3">Kreativiti (0-2)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-3">Response (Non-streaming)</h3>
            <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
              <pre className="text-sm text-green-400">
{`{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1700000000,
  "model": "aimudah/claude-haiku-4.5",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello! Apa yang boleh saya bantu?"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25
  }
}`}
              </pre>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">GET /models</h2>
            <p>Senarai semua model yang tersedia.</p>
            <div className="bg-gray-900 rounded-xl p-5 mt-4 overflow-x-auto">
              <pre className="text-sm text-green-400">
{`curl https://aimudah.my.id/api/v1/models \\
  -H "Authorization: Bearer aimudah-xxxxxxxxxxxxxxxxxxxx"`}
              </pre>
            </div>
          </section>

          {/* Models */}
          <section id="models" className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">Senarai Model</h1>
            <p className="text-gray-600 mt-2">
              Semua model menggunakan prefix <code>aimudah/</code>.
            </p>

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 border-b">Model ID</th>
                    <th className="text-left p-3 border-b">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["aimudah/claude-3.7-sonnet", "Claude 3.7 Sonnet — balanced"],
                    ["aimudah/claude-haiku-4.5", "Claude Haiku 4.5 — pantas & murah"],
                    ["aimudah/claude-sonnet-4", "Claude Sonnet 4 — balanced"],
                    ["aimudah/claude-sonnet-4.5", "Claude Sonnet 4.5 — terbaru"],
                    ["aimudah/claude-sonnet-4.6", "Claude Sonnet 4.6 — terbaru"],
                    ["aimudah/claude-opus-4.5", "Claude Opus 4.5 — paling bijak"],
                    ["aimudah/claude-opus-4.6", "Claude Opus 4.6 — paling bijak"],
                    ["aimudah/claude-opus-4.7", "Claude Opus 4.7 — paling bijak"],
                    ["aimudah/deepseek-3.2", "DeepSeek 3.2 — coding"],
                    ["aimudah/glm-5", "GLM-5 — general"],
                    ["aimudah/minimax-m2.1", "MiniMax M2.1"],
                    ["aimudah/minimax-m2.5", "MiniMax M2.5"],
                    ["aimudah/qwen3-coder-next", "Qwen3 Coder Next — coding"],
                  ].map(([id, desc]) => (
                    <tr key={id}>
                      <td className="p-3 border-b font-mono text-primary-700">{id}</td>
                      <td className="p-3 border-b">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Setup Cursor */}
          <section id="setup-cursor" className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">Setup Cursor</h1>
            <ol className="list-decimal list-inside space-y-3 mt-4">
              <li>Buka Cursor → Settings → Models</li>
              <li>Klik &quot;Add Model&quot;</li>
              <li>Masukkan:
                <div className="bg-gray-900 rounded-xl p-5 mt-2 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`API Key: aimudah-xxxxxxxxxxxxxxxxxxxx
Base URL: https://aimudah.my.id/api/v1
Model: aimudah/claude-sonnet-4.5`}
                  </pre>
                </div>
              </li>
              <li>Klik Save. Siap!</li>
            </ol>
          </section>

          {/* Setup VS Code */}
          <section id="setup-vscode" className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">Setup VS Code (Continue)</h1>
            <p className="mt-2">Untuk extension Continue di VS Code:</p>
            <ol className="list-decimal list-inside space-y-3 mt-4">
              <li>Install extension &quot;Continue&quot; dari marketplace</li>
              <li>Buka config (<code>~/.continue/config.json</code>)</li>
              <li>Tambah provider:
                <div className="bg-gray-900 rounded-xl p-5 mt-2 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`{
  "models": [{
    "title": "AIMudah Claude",
    "provider": "openai",
    "model": "aimudah/claude-sonnet-4.5",
    "apiBase": "https://aimudah.my.id/api/v1",
    "apiKey": "aimudah-xxxxxxxxxxxxxxxxxxxx"
  }]
}`}
                  </pre>
                </div>
              </li>
            </ol>
          </section>

          {/* Setup Kilo Code */}
          <section id="setup-kilocode" className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">Setup Kilo Code</h1>
            <ol className="list-decimal list-inside space-y-3 mt-4">
              <li>Buka Kilo Code → Settings</li>
              <li>Pilih provider: &quot;OpenAI Compatible&quot;</li>
              <li>Masukkan:
                <div className="bg-gray-900 rounded-xl p-5 mt-2 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`Base URL: https://aimudah.my.id/api/v1
API Key: aimudah-xxxxxxxxxxxxxxxxxxxx
Model ID: aimudah/claude-sonnet-4.5`}
                  </pre>
                </div>
              </li>
              <li>Save dan mula guna.</li>
            </ol>
          </section>

          {/* Setup Cline */}
          <section id="setup-cline" className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">Setup Cline</h1>
            <ol className="list-decimal list-inside space-y-3 mt-4">
              <li>Buka Cline → Settings</li>
              <li>Pilih API Provider: &quot;OpenAI Compatible&quot;</li>
              <li>Masukkan:
                <div className="bg-gray-900 rounded-xl p-5 mt-2 overflow-x-auto">
                  <pre className="text-sm text-green-400">
{`Base URL: https://aimudah.my.id/api/v1
API Key: aimudah-xxxxxxxxxxxxxxxxxxxx
Model ID: aimudah/claude-sonnet-4.5`}
                  </pre>
                </div>
              </li>
            </ol>
          </section>

          {/* Setup OpenCode */}
          <section id="setup-opencode" className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">Setup OpenCode</h1>
            <p className="mt-2">Tambah dalam <code>opencode.json</code>:</p>
            <div className="bg-gray-900 rounded-xl p-5 mt-4 overflow-x-auto">
              <pre className="text-sm text-green-400">
{`{
  "provider": {
    "aimudah": {
      "api": "https://aimudah.my.id/api/v1",
      "name": "AIMudah",
      "options": {
        "apiKey": "aimudah-xxxxxxxxxxxxxxxxxxxx"
      },
      "models": {
        "claude-sonnet": {
          "id": "aimudah/claude-sonnet-4.5",
          "name": "Claude Sonnet 4.5",
          "limit": {
            "context": 200000,
            "output": 8192
          }
        }
      }
    }
  },
  "model": "aimudah/claude-sonnet"
}`}
              </pre>
            </div>
          </section>

          {/* Error Codes */}
          <section id="errors" className="mt-16 mb-16">
            <h1 className="text-3xl font-bold text-gray-900">Kod Ralat</h1>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 border-b">Kod</th>
                    <th className="text-left p-3 border-b">Jenis</th>
                    <th className="text-left p-3 border-b">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b font-mono">401</td>
                    <td className="p-3 border-b">invalid_api_key</td>
                    <td className="p-3 border-b">API key tidak sah atau tiada</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b font-mono">400</td>
                    <td className="p-3 border-b">invalid_request</td>
                    <td className="p-3 border-b">Request body tidak lengkap</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b font-mono">400</td>
                    <td className="p-3 border-b">invalid_model</td>
                    <td className="p-3 border-b">Model tidak disokong</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b font-mono">429</td>
                    <td className="p-3 border-b">rate_limit</td>
                    <td className="p-3 border-b">Had request dicapai</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">500</td>
                    <td className="p-3">server_error</td>
                    <td className="p-3">Ralat dalaman server</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
// force rebuild
