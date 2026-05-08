import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "AISANCE — Road Intelligence Platform",
  description: "Passive road health monitoring using vehicle sensors. AISANCE turns every vehicle into a passive sensor, continuously scoring road health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${bebasNeue.variable} ${dmSans.variable} font-sans min-h-full flex flex-col selection:bg-amber-alert selection:text-asphalt`}>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
