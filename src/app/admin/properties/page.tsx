'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { uploadImage } from '@/app/lib/supabase/uploadImage';
import { v4 as uuidv4 } from 'uuid';

type Property = {
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
  check: boolean;
};

export default function AdminPropertiesPage() {
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<any>({
    property_title: '',
    slug: '',
    property_img: '',
    images: [],
    location: '',
    bedrooms: '',
    bathrooms: '',
    livingArea: '',
    floor: '',
    has_elevator: false,
    bus_line: '',
    has_school: false,
    has_kindergarten: false,
    description: '',
    check: false,
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  /* =======================
     LOGIN + FETCH PROPERTIES
  ======================= */
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

  /* =======================
     HANDLERS
  ======================= */
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const resetForm = () => {
    setForm({
      property_title: '',
      slug: '',
      property_img: '',
      images: [],
      location: '',
      bedrooms: '',
      bathrooms: '',
      livingArea: '',
      floor: '',
      has_elevator: false,
      bus_line: '',
      has_school: false,
      has_kindergarten: false,
      description: '',
      check: false,
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
        property_img: mainImageUrl,
        images: galleryUrls,
        location: form.location,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        livingArea: Number(form.livingArea),
        floor: Number(form.floor),
        has_elevator: form.has_elevator,
        bus_line: form.bus_line,
        has_school: form.has_school,
        has_kindergarten: form.has_kindergarten,
        description: form.description,
        check: form.check,
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
      property_title: p.property_title,
      slug: p.slug,
      property_img: p.property_img,
      images: p.images,
      location: p.location,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      livingArea: p.livingArea,
      floor: p.floor,
      has_elevator: p.has_elevator,
      bus_line: p.bus_line,
      has_school: p.has_school,
      has_kindergarten: p.has_kindergarten,
      description: p.description,
      check: p.check,
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 mb-12 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel - Nekretnine</h1>
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
          <input name="property_title" placeholder="Naziv nekretnine" value={form.property_title} onChange={handleChange} className="border p-2 rounded" />
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} className="border p-2 rounded" />
          <input name="location" placeholder="Lokacija" value={form.location} onChange={handleChange} className="border p-2 rounded" />
          <input name="livingArea" placeholder="Kvadratura" value={form.livingArea} onChange={handleChange} className="border p-2 rounded" />
          <input name="bedrooms" placeholder="Broj soba" value={form.bedrooms} onChange={handleChange} className="border p-2 rounded" />
          <input name="bathrooms" placeholder="Broj kupatila" value={form.bathrooms} onChange={handleChange} className="border p-2 rounded" />
          <input name="floor" placeholder="Sprat" value={form.floor} onChange={handleChange} className="border p-2 rounded" />
          <input name="bus_line" placeholder="Autobus linija" value={form.bus_line} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="description" placeholder="Opis" value={form.description} onChange={handleChange} className="border p-2 rounded col-span-1 md:col-span-2" />
          
          {/* Checkbox fields */}
          <label className="flex items-center gap-2"><input type="checkbox" name="has_elevator" checked={form.has_elevator} onChange={handleChange} /> Lift</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="has_school" checked={form.has_school} onChange={handleChange} /> Škola</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="has_kindergarten" checked={form.has_kindergarten} onChange={handleChange} /> Vrtić</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="check" checked={form.check} onChange={handleChange} /> Aktivno</label>

          {/* Images */}
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
            
            {/* Galerija */}
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
                <span>Sobe: {p.bedrooms ?? '-'}</span>
                <span>Kupatila: {p.bathrooms ?? '-'}</span>
                <span>Površina: {p.livingArea ?? '-'} m²</span>
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
