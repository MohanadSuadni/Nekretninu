'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { uploadImage } from '@/app/lib/supabase/uploadImage';
import { v4 as uuidv4 } from 'uuid';

export type Property = {
  id: string;
  slug: string;
  property_title: string;
  property_price: string;
  property_img?: string;    // glavna slika
  images?: string[];        // slider slike
  location: string;
  category: string;
  type: string;             // stan / kuća
  status: string;           // prodaja / izdavanje
  tag: string;              // featured / rent / sale
  beds: number;
  bathrooms: number;
  garages: number;
  livingArea: string;
  floor?: number;
  has_elevator?: boolean;
  bus_line?: string;
  has_school?: boolean;
  has_kindergarten?: boolean;
  check: boolean;
  name: string;
  description?: string;      // <--- OVDE
};

export default function AdminPropertiesPage() {
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<any>({
    slug: '',
    property_title: '',
    property_price: '',
    property_img: '',
    images: [],
    location: '',
    category: '',
    type: '',
    status: '',
    tag: '',
    beds: '',
    bathrooms: '',
    garages: '',
    livingArea: '',
    floor: '',
    has_elevator: false,
    bus_line: '',
    has_school: false,
    has_kindergarten: false,
    check: false,
    name: '',
    description: '', // <-- DODATO
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  // ================= LOGIN + FETCH PROPERTIES =================
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.href = '/admin/login';
        return;
      }
      setUser(data.user);

      const { data: props } = await supabase
        .from('properties')
        .select('*')
        .order('id', { ascending: false });

      setProperties(props || []);
    };
    init();
  }, []);

  if (!user) return <p>Učitavanje...</p>;

  // ================= HANDLERS =================
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const resetForm = () => {
    setForm({
      slug: '',
      property_title: '',
      property_price: '',
      property_img: '',
      images: [],
      location: '',
      category: '',
      type: '',
      status: '',
      tag: '',
      beds: '',
      bathrooms: '',
      garages: '',
      livingArea: '',
      floor: '',
      has_elevator: false,
      bus_line: '',
      has_school: false,
      has_kindergarten: false,
      check: false,
      name: '',
      description: '', // <-- DODATO
    });
    setEditingId(null);
    setMainImage(null);
    setGalleryImages(null);
  };

  const saveProperty = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Morate biti prijavljeni');

      const propertyId = editingId || uuidv4();
      let mainImageUrl = form.property_img;
      const galleryUrls: string[] = [];

      if (mainImage) {
        const url = await uploadImage(mainImage, propertyId);
        if (url) mainImageUrl = url;
      }

      if (galleryImages) {
        for (const file of Array.from(galleryImages)) {
          const url = await uploadImage(file, propertyId);
          if (url) galleryUrls.push(url);
        }
      }

      
      const payload: Property = {
        id: propertyId,
        slug: form.slug || propertyId,
        property_title: form.property_title,
        property_price: form.property_price,
        property_img: mainImageUrl,
        images: galleryUrls,
        location: form.location,
        category: form.category,
        type: form.type,
        status: form.status,
        tag: form.tag,
        beds: Number(form.beds),
        bathrooms: Number(form.bathrooms),
        garages: Number(form.garages),
        livingArea: form.livingArea,
        floor: Number(form.floor),
        has_elevator: form.has_elevator,
        bus_line: form.bus_line,
        has_school: form.has_school,
        has_kindergarten: form.has_kindergarten,
        check: form.check,
        name: form.name,
        description: form.description, // <-- DODATO
      };

      if (editingId) {
        const { error } = await supabase
          .from('properties')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([payload]);
        if (error) throw error;
      }

      resetForm();

      const { data: refreshed } = await supabase
        .from('properties')
        .select('*')
        .order('id', { ascending: false });
      setProperties(refreshed || []);
    } catch (err: any) {
      console.log(err);
      alert(err.message || 'Neuspešno čuvanje nekretnine');
    }
  };

  const editProperty = (p: Property) => {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      property_title: p.property_title,
      property_price: p.property_price,
      property_img: p.property_img,
      images: p.images,
      location: p.location,
      category: p.category,
      type: p.type,
      status: p.status,
      tag: p.tag,
      beds: p.beds,
      bathrooms: p.bathrooms,
      garages: p.garages,
      livingArea: p.livingArea,
      floor: p.floor,
      has_elevator: p.has_elevator,
      bus_line: p.bus_line,
      has_school: p.has_school,
      has_kindergarten: p.has_kindergarten,
      check: p.check,
      name: p.name,
      description: p.description || '', // <-- DODATO
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
<header className="bg-white shadow p-4 mb-12 flex justify-between items-center mt-24 sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-gray-800 ">Admin Panel - Nekretnine</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Odjavi se
        </button>
      </header>

      {/* Form */}
      <section className="bg-white shadow rounded p-6 mb-8 mx-4 md:mx-20">
        <h3 className="text-xl font-semibold mb-4">{editingId ? 'Izmeni nekretninu' : 'Dodaj nekretninu'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tekstualna polja */}
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} className="border p-2 rounded" />
          <input name="property_title" placeholder="Naziv nekretnine" value={form.property_title} onChange={handleChange} className="border p-2 rounded" />
          <input name="property_price" placeholder="Cena" value={form.property_price} onChange={handleChange} className="border p-2 rounded" />
          <input name="location" placeholder="Lokacija" value={form.location} onChange={handleChange} className="border p-2 rounded" />
          <input name="category" placeholder="Kategorija" value={form.category} onChange={handleChange} className="border p-2 rounded" />
          <input name="type" placeholder="Tip (stan/kuća)" value={form.type} onChange={handleChange} className="border p-2 rounded" />
          <input name="status" placeholder="Status (prodaja/izdavanje)" value={form.status} onChange={handleChange} className="border p-2 rounded" />
          <input name="tag" placeholder="Tag (featured/rent/sale)" value={form.tag} onChange={handleChange} className="border p-2 rounded" />
          <input name="name" placeholder="Ime" value={form.name} onChange={handleChange} className="border p-2 rounded" />
<input
  name="beds"
  type="number"
  placeholder="Broj soba"
  value={form.beds}
  onChange={(e) => {
    const val = Number(e.target.value);
    setForm({ ...form, beds: val, bedrooms: val }); // oba se update-uju
  }}
  className="border p-2 rounded"
/>



          <input name="bathrooms" placeholder="Broj kupatila" value={form.bathrooms} onChange={handleChange} className="border p-2 rounded" />
          <input name="garages" placeholder="Parking" value={form.garages} onChange={handleChange} className="border p-2 rounded" />
          <input name="livingArea" placeholder="Kvadratura" value={form.livingArea} onChange={handleChange} className="border p-2 rounded" />
          <input name="floor" placeholder="Sprat" value={form.floor} onChange={handleChange} className="border p-2 rounded" />
          <input name="bus_line" placeholder="Autobus linija" value={form.bus_line} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="description" placeholder="Opis" value={form.description} onChange={handleChange} className="border p-2 rounded col-span-1 md:col-span-2" />

          {/* Checkbox */}
          <label className="flex items-center gap-2"><input type="checkbox" name="has_elevator" checked={form.has_elevator} onChange={handleChange} /> Lift</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="has_school" checked={form.has_school} onChange={handleChange} /> Škola</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="has_kindergarten" checked={form.has_kindergarten} onChange={handleChange} /> Vrtić</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="check" checked={form.check} onChange={handleChange} /> Aktivno</label>

          {/* Slike */}
          <label className="block">
            Glavna slika
            <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files?.[0] || null)} className="mt-1 border rounded p-1 w-full" />
          </label>
          <label className="block mt-4">
            Slike za galeriju / slider
            <input type="file" accept="image/*" multiple onChange={(e) => setGalleryImages(e.target.files)} className="mt-1 border rounded p-1 w-full" />
          </label>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={saveProperty} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">{editingId ? 'Izmeni' : 'Dodaj'}</button>
          {editingId && <button onClick={resetForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">Otkaži</button>}
        </div>
      </section>

      {/* Properties List */}
      <section className="mx-4 md:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
          <div key={p.id} className="bg-white shadow rounded overflow-hidden">
            {p.property_img && <img src={p.property_img} alt={p.property_title} className="w-full h-48 object-cover rounded-t" />}
            {p.images && p.images.length > 0 && (
              <div className="flex overflow-x-auto gap-2 mt-2 p-2">
                {p.images.map((img, i) => (
                  <img key={i} src={img} alt={`Galerija ${i}`} className="h-20 w-auto rounded" />
                ))}
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.property_title}</h3>
              <p className="text-gray-600 text-sm mb-2">{p.location}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span>Sprat: {p.floor ?? '-'}</span>
                <span>Lift: {p.has_elevator ? '✔' : '✖'}</span>
                <span>Autobus: {p.bus_line ?? '-'}</span>
                <span>Škola: {p.has_school ? '✔' : '✖'}</span>
                <span>Vrtić: {p.has_kindergarten ? '✔' : '✖'}</span>
                <span>Sobe: {p.beds ?? '-'}</span>
                <span>Kupatila: {p.bathrooms ?? '-'}</span>
                <span>Garaže: {p.garages ?? '-'}</span>
                <span>Površina: {p.livingArea ?? '-'}</span>
              </div>
              <p className="text-gray-700 text-sm mt-1">{p.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <button onClick={() => editProperty(p)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm">Izmeni</button>
                <span className={`text-sm font-semibold ${p.check ? 'text-green-600' : 'text-red-500'}`}>
                  {p.check ? 'Aktivno' : 'Neaktivno'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
