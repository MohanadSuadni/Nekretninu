'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { uploadImage } from '@/app/lib/supabase/uploadImage';
import { v4 as uuidv4 } from 'uuid';

type Property = {
  id: string;
  property_title: string;
  property_img: string;
  images: string[];
  livingArea: number;
  name: string;
  bathrooms: number;
  type: string;
  location: string;
  check: boolean;
};

export default function AdminPropertiesPage() {
  const [user, setUser] = useState<any>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    property_title: '',
    property_img: '',
    livingArea: '',
    name: '',
    bathrooms: '',
    type: '',
    location: '',
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
      property_img: '',
      livingArea: '',
      name: '',
      bathrooms: '',
      type: '',
      location: '',
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

      const payload = {
        id: propertyId,
        property_title: form.property_title,
        property_img: mainImageUrl,
        images: galleryUrls,
        livingArea: Number(form.livingArea),
        name: form.name,
        bathrooms: Number(form.bathrooms),
        type: form.type,
        location: form.location,
        check: form.check,
      };

      if (editingId) {
        const { data, error } = await supabase
          .from('properties')
          .update(payload)
          .eq('id', editingId)
          .select();
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('properties')
          .insert([payload])
          .select();
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
      property_img: p.property_img,
      livingArea: String(p.livingArea),
      name: p.name,
      bathrooms: String(p.bathrooms),
      type: p.type,
      location: p.location,
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
      {/* Glavni navigacioni bar sajta */}
      <header className="bg-white shadow p-1 mb-24">
        <h1 className="text-2xl font-bold text-gray-800"></h1>
      </header>

      {/* Admin panel */}
      <section className="bg-white shadow rounded p-6 mb-8 mx-4 md:mx-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Admin Panel - Nekretnine</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Odjavi se
          </button>
        </div>

        {/* Form za dodavanje/izmenu */}
        <h3 className="text-xl font-semibold mb-4">{editingId ? 'Izmeni nekretninu' : 'Dodaj nekretninu'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="property_title"
            placeholder="Naziv nekretnine"
            value={form.property_title}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="name"
            placeholder="Ime"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="location"
            placeholder="Lokacija"
            value={form.location}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="type"
            placeholder="Tip nekretnine"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="livingArea"
            placeholder="Površina"
            value={form.livingArea}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="bathrooms"
            placeholder="Broj kupatila"
            value={form.bathrooms}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages(e.target.files)}
            className="border p-2 rounded"
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="check" checked={form.check} onChange={handleChange} />
            Aktivno
          </label>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={saveProperty}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {editingId ? 'Izmeni' : 'Dodaj'}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Otkaži
            </button>
          )}
        </div>
      </section>

      {/* Lista nekretnina */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 md:mx-20">
        {properties.map((p) => (
          <div key={p.id} className="bg-white shadow rounded overflow-hidden">
            {p.property_img && (
              <img src={p.property_img} alt={p.property_title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.property_title}</h3>
              <p className="text-gray-600">{p.location}</p>
              <div className="mt-2 flex justify-between items-center">
                <button
                  onClick={() => editProperty(p)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm"
                >
                  Izmeni
                </button>
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
