export type propertyData = {
  id: string;
  slug: string;

  property_title: string;
  property_price: string;

  property_img?: string;     // glavna slika
  images?: string[];         // slider slike

  location: string;

  category: string;
  category_img: string;

  type: string;              // stan / kuća
  status: string;            // prodaja / izdavanje
  tag: string;               // featured / rent / sale

  beds: number;    
  bedrooms?: number;       // možeš zadržati ako ti baza ima
                            // ✔ koristi se svuda
  bathrooms: number;
  garages: number;           // ✔ POSTOJI U BAZI
  livingArea: string;

  floor?: string;
  has_elevator?: boolean;
  bus_line?: string;
  has_school?: boolean;
  has_kindergarten?: boolean;

  check: boolean;
  name: string;
    description?: string;   // <-- OVDJE

};
