import Image from "next/image";
import React from "react";
import Link from "next/link";
import "../../../../style/index.css";
import { propertyData } from "@/app/types/property/propertyData";

interface PropertyCardProps {
  property: propertyData;
  viewMode?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode }) => {
  return (
    <div
      key={property.id}
      className="bg-white shadow-sm dark:bg-darklight rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
      data-aos="fade-up"
    >
      <Link
        href={`/properties/properties-list/${property.slug}`}
        className={`group ${viewMode === "list" ? "flex" : ""}`}
      >
        {/* IMAGE */}
        <div className={`relative ${viewMode === "list" ? "w-[38%]" : ""}`}>
          <div
            className={`
              imageContainer 
              h-[250px] w-full overflow-hidden
              ${viewMode === "list" ? "h-full md:h-52" : ""}
            
            `}
          >
            <Image
              src={
                property.property_img?.trim() ||
                property.images?.[0]?.trim() ||
                "/images/placeholder.jpg"
              }
              alt={`Slika nekretnine: ${property.property_title}`}
              width={400}
              height={250}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>

          {/* TAG */}
          <p className="absolute top-[10px] left-[10px] py-1 px-4 bg-white rounded-md text-primary text-sm font-semibold">
            {property.tag === "izdavanje" ? "Izdavanje" : "Prodaja"}
          </p>

          {/* HEART ICON */}
          {viewMode !== "list" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[10px] right-[10px] bg-white p-2 rounded-lg transition-transform duration-300 hover:scale-110"
              viewBox="0 0 24 24"
              width="38"
              height="38"
              fill="#2F73F2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>

        {/* CONTENT */}
        <div
          className={`p-5 sm:p-8 dark:text-white ${
            viewMode === "list"
              ? "w-[70%] flex flex-col justify-center"
              : ""
          }`}
        >
          <div className="flex flex-col gap-1 border-b border-border dark:border-dark_border mb-6">
            <p className="text-base text-gray">{property.property_title}</p>

            <div className="flex justify-between items-center pb-4">
              <div className="font-bold text-2xl text-midnight_text dark:text-white group-hover:text-primary transition">
                {property.property_price}
              </div>
              <div className="text-xs bg-[#DAE7FF] dark:bg-white text-midnight_text dark:text-primary py-1 px-2 rounded-lg font-bold">
                {property.location}
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="flex gap-4 flex-wrap justify-between">
            <div className="flex flex-col">
              <p className="md:text-xl text-lg font-bold flex gap-2 items-center">
                <Image src="/images/svgs/icon-bed.svg" alt="Sobe" width={18} height={18} />
                {property.beds}
              </p>
              <p className="text-sm text-gray">Sobe</p>
            </div>

            <div className="flex flex-col">
              <p className="md:text-xl text-lg font-bold flex gap-2 items-center">
                <Image src="/images/svgs/icon-tub.svg" alt="Kupatila" width={18} height={18} />
                {property.bathrooms}
              </p>
              <p className="text-sm text-gray">Kupatila</p>
            </div>

            <div className="flex flex-col">
              <p className="md:text-xl text-lg font-bold flex gap-2 items-center">
                <Image src="/images/svgs/stairs-floor-svgrepo-com (4).svg" alt="Sprat" width={23} height={23} />
                {property.floor}
              </p>
              <p className="text-sm text-gray">Sprat</p>
            </div>

            <div className="flex flex-col">
              <p className="md:text-s text-s font-bold flex gap-2 items-center">
                <Image src="/images/svgs/icon-layout.svg" alt="Površina" width={18} height={18} />
                {`${property.livingArea ?? '-'}`}
              </p>
              <p className="text-sm text-gray">Kvadratura</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;