import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { SectionCounter } from "@/components/SectionCounter";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://franz.dev"),
  title: "Franz | Developer & Artist",
  description:
    "Franz — creative developer, artist, and builder based in Toronto. Computer Programming & Analysis at Seneca Polytechnic.",
  keywords: ["Franz", "portfolio", "developer", "creative", "Toronto", "React", "TypeScript"],
  authors: [{ name: "Franz" }],
  openGraph: {
    title: "Franz | Developer & Artist",
    description: "Creative developer, artist, and builder based in Toronto.",
    url: "https://franz.dev",
    type: "website",
    siteName: "Franz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franz | Developer & Artist",
    description: "Creative developer, artist, and builder based in Toronto.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={[outfit.variable, jetbrainsMono.variable].join(" ")}>
        <ScrollProgressBar />
        <Cursor />
        <SectionCounter />
        {children}
      </body>
    </html>
  );
}
