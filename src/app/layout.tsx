'use client';

import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Aoscompo from '@/utils/aos';
import NextTopLoader from 'nextjs-toploader';
import { AppContextProvider } from '@/context-api/PropertyContext';
import Footer from './components/layout/footer';
import ScrollToTop from './components/scroll-to-top';
import Header from './components/layout/header';
import SessionProviderComp from './provider/SessionProviderComp';
import { usePathname } from 'next/navigation';

const dmsans = DM_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarOn = ['/admin/login'];
  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmsans.className}>
        <AppContextProvider>
          <SessionProviderComp>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
              <Aoscompo>
                {!shouldHideNavbar && <Header />}
                <NextTopLoader />
                {children}
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
