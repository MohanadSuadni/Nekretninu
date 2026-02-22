'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Property } from '@/app/types/property';

interface TabbarProps {
  property: Property;
}

const phoneNumber = '+381693693698';

/* ---------- HELPERS ---------- */
const yesNoColor = (value?: boolean | null) => {
  if (value === true) return { text: 'Da', className: 'text-emerald-600' };
  if (value === false) return { text: 'Ne', className: 'text-red-500' };
  return { text: '-', className: 'text-gray-400' };
};

/* ---------- LEPA INFO KOMPONENTA SA IKONOM ---------- */
interface InfoProps {
  label: string;
  value: string | number;
  icon: string;
  valueClassName?: string;
}

const Info = ({ label, value, icon, valueClassName }: InfoProps) => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-dark_border bg-white dark:bg-darkmode p-4 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
      <Icon icon={icon} className="text-xl" />
    </div>

    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`font-semibold text-gray-900 dark:text-white ${valueClassName || ''}`}>
        {value}
      </span>
    </div>
  </div>
);

/* ---------- COMPONENT ---------- */
export default function Tabbar({ property }: TabbarProps) {
  const [activeTab, setActiveTab] = useState('Osnovne informacije');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
 <section className="bg-[#F0F6FA] dark:bg-[#111929] py-20">
        <h2 className="text-3xl font-bold text-center mb-3">
          Dostupne informacije
        </h2>          <div className="max-w-6xl mx-auto px-4">
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
          {/* -------- OSNOVNE INFORMACIJE -------- */}
          {activeTab === 'Osnovne informacije' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <Info icon="mdi:home-outline" label="Naziv" value={property.property_title} />
              <Info icon="mdi:map-marker-outline" label="Lokacija" value={property.location || '-'} />
              <Info
                icon="mdi:cash"
                label="Cena"
                value={property.property_price && property.property_price.trim() !== ''
                  ? property.property_price
                  : 'Na upit'}
              />
              <Info
                icon="mdi:ruler-square"
                label="Kvadratura"
                value={property.livingArea ? `${property.livingArea} m²` : '-'}
              />
              <Info icon="mdi:bed-outline" label="Sobe" value={property.beds ?? '-'} />
              <Info icon="mdi:shower" label="Kupatila" value={property.bathrooms ?? '-'} />
              <Info icon="mdi:stairs" label="Sprat" value={property.floor ?? '-'} />
              <Info icon="mdi:car-outline" label="Parking" value={property.garages ?? '-'} />
              <Info
                icon="mdi:elevator"
                label="Lift"
                value={yesNoColor(property.has_elevator).text}
                valueClassName={yesNoColor(property.has_elevator).className}
              />
              <Info
                icon="mdi:file-check-outline"
                label="Uknjižen"
                value={yesNoColor(property.Uknjižen).text}
                valueClassName={yesNoColor(property.Uknjižen).className}
              />
              <Info icon="mdi:bus" label="Prevoz" value={property.bus_line || '-'} />
              <Info
                icon="mdi:school-outline"
                label="Škola"
                value={yesNoColor(property.has_school).text}
                valueClassName={yesNoColor(property.has_school).className}
              />
              <Info
                icon="mdi:baby-face-outline"
                label="Vrtić"
                value={yesNoColor(property.has_kindergarten).text}
                valueClassName={yesNoColor(property.has_kindergarten).className}
              />
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
            <div className="space-y-6">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {property.description || 'Nema opisa.'}
              </p>

              {/* CALL / SMS DUGMAD */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition"
                >
                  <Icon icon="mdi:phone" className="text-xl" />
                  Pozovi
                </a>

                <a
                  href={`sms:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 transition"
                >
                  <Icon icon="mdi:message-text" className="text-xl" />
                  Pošalji SMS
                </a>
              </div>
            </div>
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