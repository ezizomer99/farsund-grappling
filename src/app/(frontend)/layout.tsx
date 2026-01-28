import type { Metadata } from "next";
import { Roboto, Oswald } from "next/font/google";
import { unstable_noStore as noStore } from 'next/cache';
import "../globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getBackground } from "@/lib/payload-data";
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

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

export const metadata: Metadata = {
  title: "Farsund Grappling",
  description: "Welcome to Farsund Grappling",
  icons: {
    icon: '/logo.svg',
  },
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore(); // Get fresh background data
  const background = await getBackground();
  
  const backgroundImageUrl = background?.backgroundImage?.url || null;
  
  return (
    <html lang="en" className={`${roboto.variable} ${oswald.variable}`}>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Dynamic Background Image - always show, no gradient fallback */}
            <div 
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                backgroundColor: '#F0F0DB',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            
            <ClientScrollEffects />
            <Navigation />
            <main style={{ flexGrow: 1, paddingTop: '72px' }}>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
