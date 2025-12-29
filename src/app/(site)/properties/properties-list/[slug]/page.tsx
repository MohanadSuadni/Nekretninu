'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageSlider from "@/app/components/property-details/ImageSlider";
import TextSection from "@/app/components/property-details/text-section";
import CompanyInfo from "@/app/components/home/info";
import Tabbar from "@/app/components/property-details/tabbar";
import Availability from "@/app/components/property-details/availability";
import DiscoverProperties from "@/app/components/home/property-option";

interface Property {
  slug: string;
  property_title: string;
  property_img?: string;
  images?: string[];
  location?: string;
  beds?: number;
  baths?: number;
  garages?: number;
  tag?: string;
  status?: string;
  category?: string;
}

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/propertydata");
        if (!res.ok) throw new Error("Failed to fetch properties");

        const data: Property[] = await res.json();
        const found = data.find((p) => p.slug === slug);
        setProperty(found || null);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading property details...</p>;
  if (!property) return <p>Property not found.</p>;

  const sliderImages =
    property.images && property.images.length > 0
      ? property.images
      : property.property_img
      ? [property.property_img]
      : [];

  return (
    <div>
      {/* HERO / Title */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-white dark:from-darkmode to-herobg dark:to-darklight">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-[50px] font-bold dark:text-white">
            {property.property_title}
          </h2>
        </div>
      </section>

      {/* IMAGE SLIDER */}
      {sliderImages.length > 0 && (
        <section>
          <div className="container mx-auto">
            <div className="relative w-full max-w-5xl mx-auto h-[240px] sm:h-[320px] md:h-[420px] lg:h-[580px]">
              <ImageSlider images={sliderImages} title={property.property_title} />
            </div>
          </div>
        </section>
      )}

      {/* PROPERTY DETAILS */}
      <TextSection />
      <CompanyInfo />
      <Tabbar />
      <Availability />
      <DiscoverProperties />
    </div>
  );
}
