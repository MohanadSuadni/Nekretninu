'use client';

import { DM_Sans } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from 'next-themes';
import Aoscompo from '@/utils/aos';
import NextTopLoader from 'nextjs-toploader';
import { AppContextProvider } from '../context-api/PropertyContext';
import Footer from './components/layout/footer';
import ScrollToTop from './components/scroll-to-top';
import Header from './components/layout/header';
import SessionProviderComp from './provider/SessionProviderComp';
import { usePathname } from 'next/navigation';

const dmsans = DM_Sans({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  // Liste ruta gde navbar treba da bude sakriven
  const hideNavbarOn = ['/admin/login'];
  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmsans.className}>
        <AppContextProvider>
          {/* SessionProviderComp sada uzima session podatke iz API ili hook-a */}
          <SessionProviderComp>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
              <Aoscompo>
                {/* Navbar se prikazuje samo ako ruta nije u hide listi */}
                {!shouldHideNavbar && <Header />}

                {/* Top loader */}
                <NextTopLoader />

                {/* Glavni content */}
                {children}

                {/* Footer i scroll-to-top */}
                <Footer />
                <ScrollToTop />
              </Aoscompo>
            </ThemeProvider>
          </SessionProviderComp>
        </AppContextProvider>
      </body>
    </html>
  );
}
