'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Property } from '@/app/types/property';
import { Icon } from '@iconify/react';

interface TabbarProps {
  property: Property;
}

export default function Tabbar({ property }: TabbarProps) {
  const [activeTab, setActiveTab] = useState('Osnovne informacije');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // ESC zatvaranje modala
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* ================= TABS ================= */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {['Osnovne informacije', 'Galerija', 'Opis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-2 text-sm font-medium rounded-full transition
                ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow'
                    : 'bg-gray-100 dark:bg-dark_border text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="bg-white dark:bg-darkmode rounded-2xl shadow p-6 md:p-10">
          {/* -------- OSNOVNE INFO -------- */}
          {activeTab === 'Osnovne informacije' && (
            <div className="space-y-3 text-sm">
              <p><b>Naziv:</b> {property.property_title}</p>
              <p><b>Lokacija:</b> {property.location || '-'}</p>
            </div>
          )}

          {/* -------- GALERIJA -------- */}
          {activeTab === 'Galerija' && (
            <>
              {property.images?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className="group relative overflow-hidden rounded-xl"
                    >
                      <Image
                        src={img}
                        alt={`Slika ${i + 1}`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">Nema dostupnih slika.</p>
              )}
            </>
          )}

          {/* -------- OPIS -------- */}
          {activeTab === 'Opis' && (
            <p className="leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {property.description || 'Nema opisa.'}
            </p>
          )}
        </div>
      </div>

      {/* ================= MODAL / LIGHTBOX ================= */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              <Icon icon="mdi:close" />
            </button>

            <Image
              src={activeImage}
              alt="Galerija"
              width={1600}
              height={1000}
              className="rounded-xl object-contain w-full h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
