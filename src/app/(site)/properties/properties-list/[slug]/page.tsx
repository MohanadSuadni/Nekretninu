"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CompanyInfo from "@/app/components/home/info";
import Availability from "@/app/components/property-details/availability";
import Tabbar from "@/app/components/property-details/tabbar";
import TextSection from "@/app/components/property-details/text-section";
import DiscoverProperties from "@/app/components/home/property-option";
import ImageSlider from "@/app/components/property-details/ImageSlider";

export default function Details() {
  const { slug } = useParams();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/propertydata");
        if (!res.ok) throw new Error("Failed to fetch property data");
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []); // ✅ osiguraj da je niz
      } catch (err) {
        console.error("Error fetching properties:", err);
        setProperties([]); // fallback
      }
    };
    fetchData();
  }, []);

  // ✅ sigurni item
  const item = Array.isArray(properties)
    ? properties.find((p) => p.slug === slug)
    : undefined;

  if (!item) return <p>Property not found.</p>;

  // fallback za slider slike
  const sliderImages = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : item.property_img
    ? [item.property_img]
    : [];

  return (
    <div>
      {/* HERO */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-white dark:from-darkmode to-herobg dark:to-darklight">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-[50px] font-bold dark:text-white">
            {item.property_title || "Property Details"}
          </h2>
        </div>
      </section>

      {/* SLIDER */}
      {sliderImages.length > 0 && (
        <section>
          <div className="container mx-auto">
            <div className="relative w-full max-w-5xl mx-auto h-[240px] sm:h-[320px] md:h-[420px] lg:h-[580px]">
              <ImageSlider images={sliderImages} title={item.property_title} />
            </div>
          </div>
        </section>
      )}

      <TextSection />
      <CompanyInfo />
      <Tabbar />
      <Availability />
      <DiscoverProperties />
    </div>
  );
}
