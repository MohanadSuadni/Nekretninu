export interface Property {
  id: string;
  slug: string;
  property_title: string;
  property_img?: string;
  images?: string[];
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  livingArea?: number;
  floor?: number;
  has_elevator?: boolean;
  bus_line?: string;
  has_school?: boolean;
  has_kindergarten?: boolean;
  description?: string;
}
