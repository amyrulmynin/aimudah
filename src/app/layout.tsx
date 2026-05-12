import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIMudah — AI API Proxy Murah untuk Developer Malaysia",
  description:
    "Akses 10+ model AI premium (Claude, GPT, Gemini) dengan satu API key. Harga bermula RM0. Tanpa kad kredit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
