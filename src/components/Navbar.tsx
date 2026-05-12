"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            AIMudah
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#models" className="text-gray-600 hover:text-primary-600 transition">
              Model
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition">
              Harga
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition">
              Cara Guna
            </a>
            <Link
              href="/docs"
              className="text-gray-600 hover:text-primary-600 transition"
            >
              Docs
            </Link>
            {session ? (
              <Link
                href="/dashboard"
                className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Log Masuk
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#models" className="block text-gray-600 hover:text-primary-600">Model</a>
            <a href="#pricing" className="block text-gray-600 hover:text-primary-600">Harga</a>
            <a href="#how-it-works" className="block text-gray-600 hover:text-primary-600">Cara Guna</a>
            <Link href="/docs" className="block text-gray-600 hover:text-primary-600">Docs</Link>
            {session ? (
              <Link href="/dashboard" className="block bg-primary-600 text-white px-5 py-2 rounded-lg text-center font-medium">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="block bg-primary-600 text-white px-5 py-2 rounded-lg text-center font-medium">
                Log Masuk
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
