"use client";

import { useEffect, useState } from "react";

interface UsageLog {
  id: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  status: number;
  latencyMs: number;
  createdAt: string;
}

interface UsageStats {
  today: { requests: number; tokens: number };
  month: { requests: number; tokens: number };
  total: { requests: number; tokens: number };
}

export default function UsagePage() {
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats);
        setLogs(d.recent || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Penggunaan</h1>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Hari Ini</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats ? `${stats.today.requests} request` : "..."}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {stats ? `${formatNumber(stats.today.tokens)} token` : ""}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Bulan Ini</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats ? `${stats.month.requests} request` : "..."}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {stats ? `${formatNumber(stats.month.tokens)} token` : ""}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Jumlah Keseluruhan</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats ? `${stats.total.requests} request` : "..."}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {stats ? `${formatNumber(stats.total.tokens)} token` : ""}
          </p>
        </div>
      </div>

      {/* Usage table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Log Penggunaan Terkini
        </h2>

        {loading ? (
          <p className="text-gray-400 text-sm">Memuatkan...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            Tiada log penggunaan lagi.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Masa</th>
                  <th className="text-left py-3 px-2 text-gray-500 font-medium">Model</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">Input</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">Output</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">Jumlah</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">Latensi</th>
                  <th className="text-center py-3 px-2 text-gray-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-2 text-gray-600 whitespace-nowrap">
                      {formatTime(log.createdAt)}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-xs text-primary-700">
                      {log.model}
                    </td>
                    <td className="py-2.5 px-2 text-right text-gray-600">
                      {formatNumber(log.inputTokens)}
                    </td>
                    <td className="py-2.5 px-2 text-right text-gray-600">
                      {formatNumber(log.outputTokens)}
                    </td>
                    <td className="py-2.5 px-2 text-right font-medium text-gray-900">
                      {formatNumber(log.totalTokens)}
                    </td>
                    <td className="py-2.5 px-2 text-right text-gray-500">
                      {log.latencyMs}ms
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          log.status === 200
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ms-MY", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
