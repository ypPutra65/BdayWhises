import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#090809",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Bella — Chapter XXII",
  description: "A Cinematic Interactive Birthday Experience for Bella's 22nd Birthday",
  openGraph: {
    title: "Bella — Chapter XXII",
    description: "A Cinematic Interactive Birthday Experience for Bella's 22nd Birthday",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-ivory antialiased min-h-screen selection:bg-burgundy selection:text-ivory overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
