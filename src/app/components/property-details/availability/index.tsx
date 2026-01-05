'use client';

import { Property } from '@/app/types/property';
import { propertyData } from "@/app/types/property/propertyData";


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

        {/* ================= MOBILE CARD ================= */}
        <div className="block md:hidden bg-white dark:bg-darkmode rounded-xl shadow p-6 space-y-4">
          <Info label="Naziv" value={property.property_title} />
          <Info label="Lokacija" value={property.location} />
          <Info label="Kvadratura" value={`${property.livingArea ?? '-'} m²`} />
          <Info label="Sobe" value={property.beds} />
          <Info label="Kupatila" value={property.bathrooms} />
          <Info label="Sprat" value={property.floor} />
           <Info label="Parking" value={property.garages} />
          <Info label="Lift" value={yesNo(property.has_elevator)} />
          <Info label="Autobus" value={property.bus_line || '-'} />
          <Info label="Škola" value={yesNo(property.has_school)} />
          <Info label="Vrtić" value={yesNo(property.has_kindergarten)} />
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white dark:bg-darkmode rounded-xl shadow overflow-hidden">
            <thead className="bg-gray-100 dark:bg-dark_border">
              <tr className="text-sm font-semibold">
                <th className="py-4 px-3">Naziv</th>
                <th>Lokacija</th>
                <th>m²</th>
                <th>Sobe</th>
                <th>Kupatila</th>
                <th>Sprat</th>
                <th>Parking</th>
                <th>Lift</th>
                <th>Autobus</th>
                <th>Škola</th>
                <th>Vrtić</th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-center border-t hover:bg-gray-50 dark:hover:bg-dark_border">
                <td className="py-4 px-3 font-semibold">
                  {property.property_title}
                </td>
                <td>{property.location || '-'}</td>
                <td>{property.livingArea ?? '-'}</td>
                <td>{property.beds ?? '-'}</td>
                <td>{property.bathrooms ?? '-'}</td>
                <td>{property.floor ?? '-'}</td>
                <td>{property.garages ?? '-'}</td>
                <td>{yesNo(property.has_elevator)}</td>
                <td>{property.bus_line || '-'}</td>
                <td>{yesNo(property.has_school)}</td>
                <td>{yesNo(property.has_kindergarten)}</td>
              </tr>
            </tbody>
          </table>
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
    <div className="flex justify-between items-center border-b pb-2 text-sm">
      <span className="text-gray font-medium">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}
