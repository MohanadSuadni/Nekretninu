'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { uploadImage } from '@/app/lib/supabase/uploadImage';
import { v4 as uuidv4 } from 'uuid';

type Property = {
  id: string;
  property_title: string;   // ⬅ obavezno polje
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
    property_title: '',  // ⬅ obavezno
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

  if (!user) return <p>Loading...</p>;

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

  /* =======================
     SAVE PROPERTY
  ======================= */
  const saveProperty = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in');

      const propertyId = editingId || uuidv4();
      let mainImageUrl = form.property_img;
      const galleryUrls: string[] = [];

      // Upload main image
      if (mainImage) {
        const url = await uploadImage(mainImage, propertyId);
        if (url) mainImageUrl = url;
      }

      // Upload gallery images
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

      console.log('PAYLOAD:', payload);

      // Insert or update
      if (editingId) {
        const { data, error } = await supabase
          .from('properties')
          .update(payload)
          .eq('id', editingId)
          .select();
        console.log('UPDATE RESULT:', data);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('properties')
          .insert([payload])
          .select(); // ⬅ ovo je ključno da se vrati insertovani red
        console.log('INSERT RESULT:', data);
        if (error) throw error;
      }

      resetForm();

      // Refresh properties
      const { data: refreshed } = await supabase
        .from('properties')
        .select('*')
        .order('id', { ascending: false });
      setProperties(refreshed || []);
    } catch (err: any) {
      console.log('=========== SAVE ERROR ===========');
      console.log(err); // ⬅ ovde ceo error objekt
      alert(err.message || 'Failed to save property');
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
    <main style={{ padding: 20 }}>
      <h1>Admin Properties</h1>
      <button onClick={logout}>Logout</button>

      <div style={{ border: '1px solid #ccc', padding: 16, margin: '20px 0' }}>
        <h2>{editingId ? 'Edit Property' : 'Add Property'}</h2>

        <input name="property_title" placeholder="Property Title" value={form.property_title} onChange={handleChange} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
        <input name="livingArea" placeholder="Living Area" value={form.livingArea} onChange={handleChange} />
        <input name="bathrooms" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} />

        <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files?.[0] || null)} />
        <input type="file" accept="image/*" multiple onChange={(e) => setGalleryImages(e.target.files)} />

        <label>
          <input type="checkbox" name="check" checked={form.check} onChange={handleChange} />
          Active
        </label>

        <br />
        <button onClick={saveProperty}>{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button onClick={resetForm}>Cancel</button>}
      </div>

      <ul>
        {properties.map((p) => (
          <li key={p.id}>
            <strong>{p.property_title}</strong> – {p.location}
            <button onClick={() => editProperty(p)}>Edit</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
