"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Features() {
  const [propertiesData, setPropertiesData] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProperties, resPage] = await Promise.all([
          fetch("/api/propertydata"),
          fetch("/api/pagedata"),
        ]);

        if (!resProperties.ok || !resPage.ok) {
          throw new Error("Neuspešno učitavanje podataka");
        }

        const properties = await resProperties.json();
        const page = await resPage.json();

        setPropertiesData(properties || []);
        setPageData(page.features || []);
      } catch (error) {
        console.error("Greška pri učitavanju:", error);
      }
    };

    fetchData();
  }, []);

  // uzmi samo izdvojene (featured) nekretnine
  const featuredProperties = propertiesData.filter((item) => !item.check);

  return (
    <section className="dark:bg-darkmode">
      <div className="container px-4 lg:max-w-screen-xl md:max-w-screen-md mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <div className="relative" data-aos="fade-right">
              <Image
                src="/images/features/features_iimage.jpg"
                alt="nekretnina"
                width={640}
                height={615}
                className="w-full h-auto"
              />

              <div className="lg:max-w-96 max-w-[90%] absolute bottom-0 left-0 right-0 mx-auto lg:mr-6 space-y-4">
                {featuredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white shadow-lg rounded-t-lg overflow-hidden group relative"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    {/* TAGS */}
           <div className="absolute top-2 left-2 z-20">
  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
    Preporučeno – od agencije
  </span>
</div>

                    {/* IMAGE */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={property.property_img.trim()}
                        alt={property.property_title}
                        height={235}
                        width={370}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* FAVORITE ICON */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-[10px] right-[10px] bg-white p-2 rounded-lg z-10"
                        viewBox="0 0 24 24"
                        width="38"
                        height="38"
                        fill="#2F73F2"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 dark:bg-[#111929]">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-2xl">
                          {property.property_price}
                        </div>
                        <div className="text-xs bg-herobg dark:bg-white dark:text-blue-500 py-2 px-4 rounded-lg font-bold">
                          {property.location}
                        </div>
                      </div>
                      <p className="text-base text-gray">{property.property_title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">
            <div className="lg:pl-20 flex flex-col justify-center h-full">
              <p
                className="mb-8 text-4xl font-bold text-midnight_text dark:text-white"
                data-aos="fade-left"
              >
                Zašto klijenti biraju nas
              </p>

              {pageData.map((feature) => (
                <div
                  key={feature.id}
                  className="flex mb-8 items-center gap-8"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <div className="bg-primary/20 p-4 rounded-full">
                    <Image
                      src={feature.imgSrc}
                      alt={feature.title}
                      height={78}
                      width={78}
                    />
                  </div>
                  <div>
                    <p className="text-2xl mb-2">{feature.title}</p>
                    <p className="text-gray text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
