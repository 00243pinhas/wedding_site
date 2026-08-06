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

// Body copy: serif, regular weight. 600 is loaded only for the RSVP
// deadline line, which is the sole piece of body copy that needs emphasis.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
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
