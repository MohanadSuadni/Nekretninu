"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CompanyInfo from "@/app/components/home/info";
import Availability from "@/app/components/property-details/availability";
import Tabbar from "@/app/components/property-details/tabbar";
import TextSection from "@/app/components/property-details/text-section";
import DiscoverProperties from "@/app/components/home/property-option";
import ImageSlider from "@/app/components/property-details/ImageSlider";

// ✅ Definisanje tipa za PageProps
type PageProps = {
  searchParams?: {
    location?: string;
    tag?: string;
  };
};

// ✅ Tip za Property
type Property = {
  id: string;
  slug: string;
  property_title: string;
  images?: string[];
  property_img?: string;
  location?: string;
  [key: string]: any; // Za ostale polja ako ih ima
};

export default function Details({ searchParams }: PageProps) {
  const { slug } = useParams();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/propertydata");
        if (!res.ok) throw new Error("Failed to fetch property data");

        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []); // ✅ osiguravamo da je niz
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchData();
  }, []);

  const item = properties.find((p) => p.slug === slug);
  if (!item) return <p>Property not found</p>;

  return (
    <div>
      {/* HERO */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-white dark:from-darkmode to-herobg dark:to-darklight">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-[50px] font-bold dark:text-white">
            {item.property_title}
          </h2>
        </div>
      </section>

      {/* SLIDER */}
      <section>
        <div className="container mx-auto">
          <div className="relative w-full max-w-5xl mx-auto h-[240px] sm:h-[320px] md:h-[420px] lg:h-[580px]">
            {(item.images?.length || item.property_img) && (
              <ImageSlider
                images={item.images?.length ? item.images : [item.property_img || ""]}
                title={item.property_title}
              />
            )}
          </div>
        </div>
      </section>

      <TextSection />
      <CompanyInfo />
      <Tabbar />
      <Availability />
      <DiscoverProperties />
    </div>
  );
}
