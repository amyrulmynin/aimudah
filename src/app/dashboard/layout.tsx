"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Gambaran" },
  { href: "/dashboard/keys", label: "API Keys" },
  { href: "/dashboard/usage", label: "Penggunaan" },
  { href: "/dashboard/subscription", label: "Langganan" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch("/api/subscription")
        .then((r) => r.json())
        .then((d) => {
          setHasAccess(d.active);
          setChecking(false);
          if (!d.active) {
            window.location.href = "/payment";
          }
        })
        .catch(() => setChecking(false));
    } else if (status === "unauthenticated") {
      setChecking(false);
    }
  }, [status, session]);

  if (status === "loading" || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary-600">
            AIMudah
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-gray-500 hover:text-red-600 transition"
            >
              Log Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar nav (horizontal on mobile) */}
        <nav className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                pathname === item.href
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
