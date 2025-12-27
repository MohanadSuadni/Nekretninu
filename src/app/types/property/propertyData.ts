export type propertyData = {
  id: string;
  property_img?: string;   // optional (za kartice)
  images?: string[];       // ✅ DODATO (za slideshow)
  property_title: string;
  property_price: string;
  category: string;
  category_img: string;
  rooms: number;
  bathrooms: number;
  location: string;
  livingArea: string;
  tag: string;
  check: boolean;
  status: string;
  type: string;
  beds: number;
  garages: number;
  region: string;
  name: string;
  slug: string;
};
