'use client';

import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { Filters } from '@/app/types/property/filtertypes';
import { propertyData } from '@/app/types/property/propertyData';

interface PropertyContextType {
  properties: propertyData[];
  setProperties: Dispatch<SetStateAction<propertyData[]>>;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  updateFilter: (key: keyof Filters, value: string) => void;
}

export const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allProperties, setAllProperties] = useState<propertyData[]>([]);
  const [properties, setProperties] = useState<propertyData[]>([]);
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    location: '',
    region: '',
    status: '',
    category: '',
    beds: '',
    baths: '',
    garages: '',
    tag: '',
  });

  // ================= FETCH PROPERTIES =================
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/propertydata');
        const data: propertyData[] = await res.json();
        setAllProperties(data);
        setProperties(data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };
    fetchProperties();
  }, []);

  // ================= FILTER PROPERTIES =================
  useEffect(() => {
   const filteredProperties = allProperties.filter((property) => {
  const category = property.category ?? '';
  const tag = property.tag ?? '';
  const status = property.status ?? '';
  const location = property.location ?? '';
  const title = property.property_title ?? '';

  return (
    (!filters.keyword || title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
    (!filters.location || location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.tag || tag.toLowerCase().includes(filters.tag.toLowerCase())) &&
    (!filters.status || status.toLowerCase().includes(filters.status.toLowerCase())) &&
    (!filters.category || category.toLowerCase().includes(filters.category.toLowerCase())) &&
    (!filters.beds || property.beds === Number(filters.beds)) &&
    (!filters.baths || property.bathrooms === Number(filters.baths)) &&
    (!filters.garages || property.garages === Number(filters.garages))
  );
});


    setProperties(filteredProperties);
  }, [filters, allProperties]);

  // ================= UPDATE FILTER =================
  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PropertyContext.Provider value={{ properties, setProperties, filters, setFilters, updateFilter }}>
      {children}
    </PropertyContext.Provider>
  );
};
