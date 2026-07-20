import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { LenisProvider } from "@/lib/motion/lenis-provider";
import "./globals.css";

// Display / headings: high-contrast serif.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body copy: clean, readable sans.
const bodySans = Inter({
  variable: "--font-body-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jerry & Pam",
  description: "Jerry & Pam — 10 September",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${bodySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
