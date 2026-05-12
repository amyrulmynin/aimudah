"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UsageStats {
  today: { requests: number; tokens: number };
  month: { requests: number; tokens: number };
  total: { requests: number; tokens: number };
  modelUsage: Record<string, { count: number; tokens: number }>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [keyCount, setKeyCount] = useState(0);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then((d) => setStats(d.stats))
      .catch(() => {});

    fetch("/api/keys")
      .then((r) => r.json())
      .then((d) => setKeyCount(d.keys?.length || 0))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gambaran Keseluruhan</h1>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Request Hari Ini"
          value={stats ? `${stats.today.requests}` : "..."}
          color="blue"
        />
        <StatCard
          label="Token Hari Ini"
          value={stats ? formatNumber(stats.today.tokens) : "..."}
          color="purple"
        />
        <StatCard
          label="Request Bulan Ini"
          value={stats ? `${stats.month.requests}` : "..."}
          color="green"
        />
        <StatCard
          label="API Keys Aktif"
          value={`${keyCount}`}
          color="orange"
        />
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mula Cepat</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-1">Base URL</h3>
            <code className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded">
              https://aimudah.my.id/api/v1
            </code>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-1">API Key</h3>
            <p className="text-sm text-gray-500">
              Pergi ke{" "}
              <a href="/dashboard/keys" className="text-primary-600 hover:underline">
                API Keys
              </a>{" "}
              untuk generate.
            </p>
          </div>
        </div>
      </div>

      {/* Model usage breakdown */}
      {stats && Object.keys(stats.modelUsage).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Penggunaan Per Model (Bulan Ini)
          </h2>
          <div className="space-y-3">
            {Object.entries(stats.modelUsage)
              .sort((a, b) => b[1].tokens - a[1].tokens)
              .map(([model, data]) => (
                <div
                  key={model}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{model}</p>
                    <p className="text-xs text-gray-500">{data.count} request</p>
                  </div>
                  <span className="text-sm font-mono text-gray-700">
                    {formatNumber(data.tokens)} token
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${colors[color]} inline-block px-2 py-0.5 rounded`}>
        {value}
      </p>
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}
