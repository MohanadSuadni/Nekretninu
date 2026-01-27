// 📁 src/app/page.tsx
export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import Script from "next/script";

import Hero from './components/home/hero';
import Calculator from './components/home/calculator';
import History from './components/home/history';
import Features from './components/shared/features';
import CompanyInfo from './components/home/info';
import BlogSmall from './components/shared/blog';
import DiscoverProperties from './components/home/property-option';
import Listing from './components/home/property-list';
import Testimonials from './components/home/testimonial';

export const metadata: Metadata = {
  title: "ARTOPOLIS 369",
};

export default function Home() {
  return (
    <>
      {/* Tawk.to chat */}
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),
                  s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69787a19bef0aa197b29c135/1jfv9ptg7';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />

      <main>
        <Hero />
        <DiscoverProperties />
        <Listing />
        <Calculator />
        <Features />
        <History />
        <Testimonials />
        <CompanyInfo />
        <BlogSmall />
      </main>
    </>
  );
}
