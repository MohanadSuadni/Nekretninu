'use client';

import { Property } from '@/app/types/property';

interface AvailabilityProps {
  property: Property;
}

export default function Availability({ property }: AvailabilityProps) {
  if (!property) return null;

  const yesNo = (val?: boolean) => (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold
      ${val ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
    >
      {val ? 'Da' : 'Ne'}
    </span>
  );

  return (
    <section className="bg-[#F0F6FA] dark:bg-[#111929] py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">
          Dostupne informacije
        </h2>
        <p className="text-center text-gray mb-12">
          Osnovni podaci o ovoj nekretnini
        </p>

        {/* UNIVERSAL CARD (mobile + desktop) */}
        <div className="bg-white dark:bg-darkmode rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            <Info label="Naziv" value={property.property_title} />
            <Info label="Lokacija" value={property.location || '-'} />
            <Info label="Kvadratura" value={`${property.livingArea ?? '-'} m²`} />
            <Info label="Sobe" value={property.beds ?? '-'} />
            <Info label="Kupatila" value={property.bathrooms ?? '-'} />
            <Info label="Sprat" value={property.floor ?? '-'} />
            <Info label="Parking" value={property.garages ?? '-'} />
            <Info label="Lift" value={yesNo(property.has_elevator)} />
            <Info label="Uknjižen" value={yesNo(property.Uknjižen)} />
            <Info label="Linije gradskog prevoza" value={property.bus_line || '-'} />
            <Info label="Škola" value={yesNo(property.has_school)} />
            <Info label="Vrtić" value={yesNo(property.has_kindergarten)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= HELPER ================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-dark_border pb-2 text-sm">
      <span className="text-gray font-medium">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}
