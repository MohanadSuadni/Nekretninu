export interface Property {
 id: string;
  name: string;
  slug: string;
  property_title: string;
  property_img?: string;
  images?: string[];
  location?: string;
  livingArea?: number;
  beds?: number;           // dodaj ovo
  bedrooms?: number;       // možeš zadržati ako ti baza ima
  bathrooms?: number;
  floor?: number;
  has_elevator?: boolean;
  bus_line?: string;
  has_school?: boolean;
  has_kindergarten?: boolean;
  description?: string;
  garages: number;
}
