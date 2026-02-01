'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ImageSlider from '@/app/components/property-details/ImageSlider';
import TextSection from '@/app/components/property-details/text-section';
import Tabbar from '@/app/components/property-details/tabbar';
import Availability from '@/app/components/property-details/availability';
import { Property } from '@/app/types/property';

export default function PropertyDetailsPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch('/api/propertydata');
        if (!res.ok) throw new Error('Failed to fetch property data');

        const data: Property[] = await res.json();
        const found = data.find((p) => p.slug === slug);
        setProperty(found || null);
      } catch (err) {
        console.error(err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [slug]);

  if (loading) return <p>Učitavanje...</p>;
  if (!property) return <p>Nekretnina nije pronađena.</p>;

  const sliderImages =
    property.images && property.images.length > 0
      ? property.images
      : property.property_img
      ? [property.property_img]
      : [];

  return (
    <div>
      {/* Hero / Title */}
      <section className=" mb-2  pt-36 pb-10 bg-gradient-to-b from-white dark:from-darkmode to-herobg dark:to-darklight">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-[50px] font-bold dark:text-white">
            {property.property_title}
          </h2>
        </div>
      </section>

      {/* Image Slider */}
      {sliderImages.length > 0 && (
        <section>
          
          <div className="container mx-auto">
            
<div
  className="
    relative w-full max-w-5xl mx-auto
    h-[200px] sm:h-[300px] md:h-[420px] lg:h-[580px]
    px-4 sm:px-0
    rounded-2xl overflow-hidden
    shadow-lg sm:shadow-none
  "
>
   
            <ImageSlider images={sliderImages} title={property.property_title} />
            </div>
          </div>

        </section>
      )}

      {/* Property Description */}
                <TextSection description={property.description || ''} />

      {/* Tabs + Availability */}
      <Tabbar property={property} />
      <Availability property={property} />
    </div>
  );
}
