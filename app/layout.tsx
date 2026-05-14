import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fix-Worx",
  description:
    "Find trusted local tradespeople, artisans, and contractors near you across South Africa.",
  keywords: [
    "Fix-Worx",
    "South Africa tradespeople",
    "plumbers",
    "electricians",
    "builders",
    "roofers",
    "local contractors",
    "home services",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}