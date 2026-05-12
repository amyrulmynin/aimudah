"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gambaran Keseluruhan</h1>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Plan Semasa" value="PERCUMA" color="green" />
        <StatCard label="Request Hari Ini" value="0 / 100" color="blue" />
        <StatCard label="Token Digunakan" value="0" color="purple" />
        <StatCard label="API Keys Aktif" value="0" color="orange" />
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
              Pergi ke <a href="/dashboard/keys" className="text-primary-600 hover:underline">API Keys</a> untuk generate.
            </p>
          </div>
        </div>
      </div>

      {/* Recent usage */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Penggunaan Terkini</h2>
        <p className="text-gray-500 text-sm">Tiada penggunaan lagi. Mula dengan generate API key.</p>
      </div>
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
