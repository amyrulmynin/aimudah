"use client";

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Penggunaan</h1>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Hari Ini</p>
          <p className="text-2xl font-bold text-gray-900">0 request</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Bulan Ini</p>
          <p className="text-2xl font-bold text-gray-900">0 token</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Baki Kuota Harian</p>
          <p className="text-2xl font-bold text-green-600">100 request</p>
        </div>
      </div>

      {/* Usage table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Log Penggunaan
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-gray-500 font-medium">
                  Masa
                </th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">
                  Model
                </th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">
                  Input
                </th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">
                  Output
                </th>
                <th className="text-left py-3 px-2 text-gray-500 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  Tiada log penggunaan lagi.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
