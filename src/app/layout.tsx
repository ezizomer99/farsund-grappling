import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StudioLink from "@/components/StudioLink";
import { getBackground, urlFor } from "@/lib/sanity.queries";
import ClientScrollEffects from "@/components/ClientScrollEffects";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const background = await getBackground();
  
  const backgroundImageUrl = background?.backgroundImage?.asset 
    ? urlFor(background.backgroundImage.asset).url()
    : null;
  
  const overlayOpacity = background?.overlayOpacity ?? 0.7;
  const overlayColor = background?.overlayColor ?? 'black';
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Dynamic Background Image */}
        {backgroundImageUrl ? (
          <div 
            className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          ></div>
        ) : (
          <div className="bg-grappling-image fixed inset-0 z-[-2]"></div>
        )}
        
        {/* Dynamic Overlay */}
        <div 
          className={`fixed inset-0 z-[-1] bg-${overlayColor}`}
          style={{ opacity: overlayOpacity }}
        ></div>
        
        <ClientScrollEffects />
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
