"use client";

import { useState, useEffect } from "react";

interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string | null;
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [showNewKey, setShowNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load existing keys on mount
  useEffect(() => {
    fetch("/api/keys")
      .then((res) => res.json())
      .then((data) => {
        if (data.keys) setKeys(data.keys);
      })
      .catch(console.error);
  }, []);

  const generateKey = async () => {
    if (!newKeyName.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });
      const data = await res.json();
      if (data.key) {
        setShowNewKey(data.key);
        setKeys((prev) => [data.apiKey, ...prev]);
        setNewKeyName("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const revokeKey = async (id: string) => {
    try {
      await fetch(`/api/keys/${id}`, { method: "DELETE" });
      setKeys((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>

      {/* Generate new key */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Key Baru
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Nama key (cth: Cursor, VS Code)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={generateKey}
            disabled={loading || !newKeyName.trim()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? "..." : "Generate"}
          </button>
        </div>

        {showNewKey && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 font-medium mb-2">
              Key berjaya dicipta! Salin sekarang — tidak akan ditunjukkan lagi.
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white border border-green-300 rounded px-3 py-2 text-sm font-mono break-all">
                {showNewKey}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(showNewKey);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
              >
                Salin
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Key list */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Keys Aktif
        </h2>

        {keys.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Tiada API key lagi. Generate satu untuk mula.
          </p>
        ) : (
          <div className="space-y-3">
            {keys.map((key) => (
              <div
                key={key.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{key.name}</p>
                  <p className="text-sm text-gray-500 font-mono">
                    {key.prefix}...
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">
                    {key.lastUsed
                      ? `Terakhir: ${key.lastUsed}`
                      : "Belum digunakan"}
                  </span>
                  <button
                    onClick={() => revokeKey(key.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
