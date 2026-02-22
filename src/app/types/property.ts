export interface Property {
 id: string;
  name: string;
  slug: string;
  property_title: string;
  property_img?: string;
  images?: string[];
  location?: string;
  livingArea?: number;
  beds?: string;           // dodaj ovo
  bedrooms?: number;       // možeš zadržati ako ti baza ima
  bathrooms?: number;
  floor?: number | string;
  has_elevator?: boolean;
  Uknjižen?: boolean;
  property_price: string;

  bus_line?: string;
  has_school?: boolean;
  has_kindergarten?: boolean;
  description?: string;
  garages: number;
}
