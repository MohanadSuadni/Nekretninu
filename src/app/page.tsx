import React from 'react';
import { Metadata } from "next";
import Hero from './components/home/hero';
import Calculator from './components/home/calculator';
import History from './components/home/history';
import Features from './components/shared/features';
import CompanyInfo from './components/home/info';
import BlogSmall from './components/shared/blog';
import DiscoverProperties from './components/home/property-option';
import Listing from './components/home/property-list';
import Testimonials from './components/home/testimonial';
import { v4 as uuidv4 } from 'uuid';

export const metadata: Metadata = {
  title: "Property",
};

export default function Home() {
  return (
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
  )
}
