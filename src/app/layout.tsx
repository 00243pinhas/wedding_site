import type { Metadata } from "next";
import { Della_Respira, Cormorant_Garamond } from "next/font/google";
import { LenisProvider } from "@/lib/motion/lenis-provider";
import "./globals.css";

// Display / headings: high-contrast serif. Regular weight only — no bold cut exists.
const dellaRespira = Della_Respira({
  variable: "--font-della-respira",
  subsets: ["latin"],
  weight: ["400"],
});

// Body copy: serif, regular weight — nothing in the site relies on bold body text.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${dellaRespira.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
