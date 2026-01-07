'use client';
import { PropertyContext } from '@/context-api/PropertyContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function DiscoverProperties() {
    const { updateFilter } = useContext(PropertyContext)!;
    const [propertiesData, setPropertiesData] = useState<any[]>([]);

    // Mapa ikonica kategorija
const categoryIcons: Record<string, string> = {
  Stan: "/images/property_option/apartment.svg",
  Kuća: "/images/property_option/house.svg",
  Vila: "/images/property_option/villa.svg",
  Kancelarija: "/images/property_option/office.svg",
  Lokal: "/images/property_option/shop.svg",
  Magacin: "/images/property_option/warehouse.svg",
};


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/propertydata');
                if (!res.ok) throw new Error('Failed to fetch');

                const data = await res.json();

                // Grupisanje po kategoriji i broj nekretnina
                const categoryMap: Record<string, { category: string, category_img: string, count: number }> = {};

                data.forEach((item: any) => {
                    if (categoryMap[item.category]) {
                        categoryMap[item.category].count += 1;
                    } else {
                        categoryMap[item.category] = {
                            category: item.category,
                            category_img: categoryIcons[item.category] || "/icons/default.svg", // default ikona
                            count: 1,
                        };
                    }
                });

                const uniqueCategoryData = Object.values(categoryMap);
                setPropertiesData(uniqueCategoryData);

            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='dark:bg-darkmode'>
            <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-midnight_text dark:text-white" data-aos="fade-left">
                    Otkrijte Nekretnine
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4 gap-8">
                    {propertiesData.map((property, index) => (
                        <div 
                            key={index} 
                            className="image-item block" 
                            onClick={() => updateFilter('category', property.category)} 
                            data-aos="fade-up" 
                            data-aos-delay={`${index * 100}`}
                        >
                            <Link href={`/properties/properties-list`} className='group'>
                                <Image
                                    src={property.category_img || '/icons/default.svg'} // fallback za sliku
                                    alt={property.category || 'Property category'} // fallback za alt
                                    className='p-4 border-2 rounded-lg border-border dark:border-dark_border mb-6 group-hover:-translate-y-1 group-hover:duration-500'
                                    height={85}
                                    width={85}
                                />
                                <p className="text-[22px] leading-[1.2] font-semibold mt-2 text-midnight_text text-opacity-80 group-hover:text-opacity-100 dark:text-white dark:group-hover:text-white dark:group-hover:text-opacity-100 dark:text-opacity-70 mb-1 capitalize">
                                    {property.category || 'Nepoznata kategorija'}
                                </p>
                                <p className="text-base text-gray">{property.count || 0} Nekretnina</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
