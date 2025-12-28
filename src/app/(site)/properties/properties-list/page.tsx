"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyCard from "@/app/components/home/property-list/property-card";

export default function PropertiesListPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const tag = searchParams.get("tag");

  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/propertydata", {
        cache: "no-store",
      });

      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    };

    fetchData();
  }, []);

  return (
    <section className="container mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
