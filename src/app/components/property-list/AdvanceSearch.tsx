'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import Image from 'next/image';
import HeroSub from '../shared/hero-sub';
import { PropertyContext } from '@/context-api/PropertyContext';
import PropertyCard from '../home/property-list/property-card';

type Props = {
  category?: string;
  location?: string;
  tag?: string;
};

export default function AdvanceSearch({ category, location = '', tag = '' }: Props) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { properties, updateFilter, filters } = useContext(PropertyContext)!;
    const [sortOrder, setSortOrder] = useState("none");
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/properties/properties-list", text: "Property List" },
    ];

    const handleSelectChange = (key: any, value: any) => {
        updateFilter(key, value);
    };

    const toggleOffCanvas = () => {
        setIsOffCanvasOpen(!isOffCanvasOpen);
    };

    const normalize = (str: string) => str.toLowerCase().replace(/s$/, '');

    // Filtriranje po category / location / tag
    const filteredProperties = properties.filter((data: any) => {
        const categoryMatch = category
            ? normalize(data.category) === normalize(category)
            : true;

        const locationMatch = location
            ? data.location?.toLowerCase() === location.toLowerCase()
            : true;

        const tagMatch = tag
            ? data.tag?.toLowerCase() === tag.toLowerCase()
            : true;

        return categoryMatch && locationMatch && tagMatch;
    });

    const sortedProperties = [...filteredProperties].sort((a, b) => {
        const titleA = a.property_title?.toLowerCase() || "";
        const titleB = b.property_title?.toLowerCase() || "";
        if (sortOrder === "asc") return titleA.localeCompare(titleB);
        if (sortOrder === "desc") return titleB.localeCompare(titleA);
        return 0;
    });

    const filteredCount = sortedProperties.length;

    return (
        <>
            <HeroSub
                title={(filters?.category) ? filters?.category: "Properties List"}
                description="Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
                breadcrumbLinks={breadcrumbLinks}
            />

            <section className='dark:bg-darkmode  px-4'>
                <div className='lg:max-w-screen-xl max-w-screen-md mx-auto'>
                    {/* OFF CANVAS & Filters omitted for brevity */}
                    <div className='lg:grid lg:grid-cols-12 gap-4'>
                        <div className='col-span-12 lg:col-span-8'>
                            <div className="flex lg:flex-nowrap flex-wrap lg:gap-0 gap-6 w-full justify-between items-center pb-8">
                                <div className="flex w-full justify-between px-4 flex-1">
                                    <h5 className='text-xl '>{filteredCount} Properties Found</h5>
                                    <p className='flex text-gray dark:text-gray gap-2 items-center'>
                                        Sort by
                                        <span>
                                            <Icon
                                                icon="fa6-solid:arrow-trend-up"
                                                width="20"
                                                height="20"
                                            />
                                        </span>
                                    </p>
                                </div>
                                <div className="flex-1 flex gap-3 px-4">
                                    <select
                                        name="short"
                                        className="custom-select border border-border dark:border-dark_border dark:bg-darkmode text-midnight_text focus:border-primary rounded-lg p-3 pr-9"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                    >
                                        <option value="none">Sort by Title</option>
                                        <option value="asc">Title (A-Z)</option>
                                        <option value="desc">Title (Z-A)</option>
                                    </select>

                                    <button onClick={() => setViewMode('list')} className={`${viewMode == "list" ? 'bg-primary text-white' : 'bg-transparent text-primary'} p-3 border border-primary text-primary hover:text-white rounded-lg text-base`}>
                                        <Icon icon="famicons:list" width="21" height="21" />
                                    </button>
                                    <button onClick={() => setViewMode('grid')} className={`${viewMode == "grid" ? 'bg-primary text-white' : 'bg-transparent text-primary'} p-3 border border-primary text-primary hover:text-white rounded-lg text-base`}>
                                        <Icon icon="ion:grid-sharp" width="21" height="21" />
                                    </button>
                                </div>
                            </div>

                            {filteredProperties.length > 0 ?
                                <div className={`${viewMode === 'grid' ? 'grid sm:grid-cols-2 '  : 'flex flex-col'} gap-6 px-4`}>
                                    {sortedProperties.map((data: any, index: any) => (
                                        <PropertyCard key={index} property={data} viewMode={viewMode} />
                                    ))}
                                </div>
                                :
                                <div className='flex flex-col gap-5 items-center justify-center pt-20'>
                                    <Image src={"/images/not-found/no-results.png"} alt='no-result' width={100} height={100} />
                                    <p className='text-gray'>No result found</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
