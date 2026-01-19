'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { uploadImage } from '@/app/lib/supabase/uploadImage';
import { v4 as uuidv4 } from 'uuid';

/* ================= OPTIONS ================= */
const categoryOptions = [
  { value: '', label: 'Kategorija' },
  { value: 'Stan', label: 'Stan' },
  { value: 'Vila', label: 'Vila' },
  { value: 'Kancelarija', label: 'Kancelarija' },
  { value: 'Lokal', label: 'Lokal' },
  { value: 'Kuća', label: 'Kuća' },
  { value: 'Magacin', label: 'Magacin' },
  { value: 'Zemljište', label: 'Zemljište' },
];

const statusOptions = [
  { value: '', label: 'Status' },
  { value: 'prodaja', label: 'Prodaja' },
  { value: 'izdavanje', label: 'Izdavanje' },
];

const tagOptions = [
  { value: '', label: 'Tag' },
  { value: 'featured', label: 'Featured' },
  { value: 'prodaja', label: 'Prodaja' },
  { value: 'izdavanje', label: 'Izdavanje' },
];

/* ================= TYPES ================= */
export type Property = {
  id: string;
  slug: string;
  property_title: string;
  property_price: string;
  property_img?: string;
  images?: string[];
  location: string;
  category: string;
  type: string;
  status: string;
  tag: string;
  beds: number;
  bathrooms: number;
  garages: number;
  livingArea: string;
  floor?: number | string;
  has_elevator?: boolean;
  Uknjižen?: boolean;
  bus_line?: string;
  has_school?: boolean;
  has_kindergarten?: boolean;
  check: boolean;
  name: string;
  description?: string;
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
    Uknjižen: false,
    bus_line: '',
    has_school: false,
    has_kindergarten: false,
    check: false,
    name: '',
    description: '',
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  /* ================= AUTH + FETCH ================= */
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

  /* ================= HANDLERS ================= */
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
      Uknjižen: false,
      bus_line: '',
      has_school: false,
      has_kindergarten: false,
      check: false,
      name: '',
      description: '',
    });
    setEditingId(null);
    setMainImage(null);
    setGalleryImages(null);
  };

  /* ================= SAVE ================= */
  const saveProperty = async () => {
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
      floor: form.floor,
      has_elevator: form.has_elevator,
      Uknjižen: form.Uknjižen,
      bus_line: form.bus_line,
      has_school: form.has_school,
      has_kindergarten: form.has_kindergarten,
      check: form.check,
      name: form.name,
      description: form.description,
    };

    if (editingId) {
      await supabase.from('properties').update(payload).eq('id', editingId);
    } else {
      await supabase.from('properties').insert([payload]);
    }

    resetForm();

    const { data } = await supabase
      .from('properties')
      .select('*')
      .order('id', { ascending: false });

    setProperties(data || []);
  };

  /* ================= EDIT ================= */
  const editProperty = (p: Property) => {
    setEditingId(p.id);
    setForm({
      ...p,
      beds: p.beds,
      bathrooms: p.bathrooms,
      garages: p.garages,
    });
  };

  /* ================= DELETE ================= */
  const deleteProperty = async (id: string) => {
    if (!confirm('Da li si siguran da želiš da obrišeš nekretninu?')) return;
    await supabase.from('properties').delete().eq('id', id);
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 mb-12 flex justify-between items-center mt-24 sticky top-0 z-40">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Panel - Nekretnine
        </h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Odjavi se
        </button>
      </header>

      {/* ================= FORM ================= */}
      <section className="bg-white shadow rounded p-6 mb-8 mx-4 md:mx-20">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? 'Izmeni nekretninu' : 'Dodaj nekretninu'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} className="border p-2 rounded" />
          <input name="property_title" placeholder="Naziv nekretnine" value={form.property_title} onChange={handleChange} className="border p-2 rounded" />
          <input name="property_price" placeholder="Cena" value={form.property_price} onChange={handleChange} className="border p-2 rounded" />
          <input name="location" placeholder="Lokacija" value={form.location} onChange={handleChange} className="border p-2 rounded" />

          <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
            {categoryOptions.map(o => (
              <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
            ))}
          </select>

          <input name="type" placeholder="Tip (stan/kuća)" value={form.type} onChange={handleChange} className="border p-2 rounded" />

          <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
            {statusOptions.map(o => (
              <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
            ))}
          </select>

          <select name="tag" value={form.tag} onChange={handleChange} className="border p-2 rounded">
            {tagOptions.map(o => (
              <option key={o.value} value={o.value} disabled={o.value === ''}>{o.label}</option>
            ))}
          </select>

          <input name="name" placeholder="Ime" value={form.name} onChange={handleChange} className="border p-2 rounded" />
          <input name="beds" type="number" placeholder="Broj soba" value={form.beds} onChange={handleChange} className="border p-2 rounded" />
          <input name="bathrooms" type="number" placeholder="Broj kupatila" value={form.bathrooms} onChange={handleChange} className="border p-2 rounded" />
          <input name="garages" type="number" placeholder="Parking" value={form.garages} onChange={handleChange} className="border p-2 rounded" />
          <input name="livingArea" placeholder="Kvadratura" value={form.livingArea} onChange={handleChange} className="border p-2 rounded" />
          <input name="floor" placeholder="Sprat" value={form.floor} onChange={handleChange} className="border p-2 rounded" />
          <input name="bus_line" placeholder="Autobus linija" value={form.bus_line} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="description" placeholder="Opis" value={form.description} onChange={handleChange} className="border p-2 rounded col-span-1 md:col-span-2" />

          {/* Checkbox */}
          <label className="flex items-center gap-2"><input type="checkbox" name="has_elevator" checked={form.has_elevator} onChange={handleChange} /> Lift</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="Uknjižen" checked={form.Uknjižen} onChange={handleChange} /> Uknjižen</label>
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

      {/* ================= PROPERTIES LIST ================= */}
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
                <div className="flex gap-2">
                  <button onClick={() => editProperty(p)} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-sm">Izmeni</button>
                  <button onClick={() => deleteProperty(p.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">Obriši</button>
                </div>
                <span className={`text-sm font-semibold ${p.check ? 'text-green-600' : 'text-red-500'}`}>{p.check ? 'Aktivno' : 'Neaktivno'}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
