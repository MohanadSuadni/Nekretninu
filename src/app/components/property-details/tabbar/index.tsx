'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Property } from '@/app/types/property';

interface TabbarProps {
  property: Property;
}

export default function Tabbar({ property }: TabbarProps) {
  const [activeTab, setActiveTab] = useState('Osnovne informacije');

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2 justify-center mb-6">
          {['Osnovne informacije', 'Galerija', 'Opis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t-md ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rounded-b-lg rounded-tr-lg bg-white dark:bg-darkmode p-4">
          {activeTab === 'Osnovne informacije' && (
            <p>Naziv: {property.property_title} | Lokacija: {property.location}</p>
          )}
          {activeTab === 'Opis' && <p>{property.description || 'Nema opisa'}</p>}
          {activeTab === 'Galerija' && property.images?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {property.images.map((img, i) => (
                <Image key={i} src={img} alt={`Slika ${i}`} width={200} height={150} className="rounded" />
              ))}
            </div>
          ) : activeTab === 'Galerija' ? (
            <p>Nema slika</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
