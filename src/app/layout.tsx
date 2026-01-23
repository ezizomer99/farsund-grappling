import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getBackground } from "@/lib/data";
import ClientScrollEffects from "@/components/ClientScrollEffects";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
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
  const background = getBackground();
  
  const backgroundImageUrl = background?.backgroundImage?.url || null;
  
  const overlayOpacity = background?.overlayOpacity ?? 0.7;
  const overlayColor = background?.overlayColor ?? 'black';
  
  return (
    <html lang="en" className={roboto.variable}>
      <body
        className="antialiased flex flex-col min-h-screen"
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
