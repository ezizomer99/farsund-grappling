import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollEffectsWrapper from "@/components/ScrollEffectsWrapper";
import StudioLink from "@/components/StudioLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farsund Grappling",
  description: "Welcome to Farsund Grappling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="bg-grappling-image fixed inset-0 z-[-1]"></div>
        <div className="bg-grappling-overlay fixed inset-0 z-[-1]"></div>
        <ScrollEffectsWrapper />
        <Navigation />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <StudioLink />
      </body>
    </html>
  );
}
