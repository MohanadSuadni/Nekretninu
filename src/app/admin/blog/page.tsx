'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  created_at: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
  });

  // FETCH
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setPosts(data || []);
  };

  // SAVE (insert / update)
  const savePost = async () => {
    if (!form.title || !form.slug) {
      alert('Title i slug su obavezni');
      return;
    }

    if (editingId) {
      await supabase
        .from('blog_posts')
        .update(form)
        .eq('id', editingId);
    } else {
      await supabase
        .from('blog_posts')
        .insert([form]);
    }

    resetForm();
    fetchPosts();
  };

  // EDIT
  const editPost = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      published: post.published,
    });
  };

  // DELETE
  const deletePost = async (id: string) => {
    if (!confirm('Obrisati blog post?')) return;

    await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    fetchPosts();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? 'Izmeni blog post' : 'Dodaj blog post'}
      </h1>

      {/* FORM */}
      <div className="grid gap-3 mb-10 bg-white p-4 rounded shadow">
        <input
          className="border p-2 rounded"
          placeholder="Naslov"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Slug (npr: novi-stanovi)"
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Kratak opis"
          value={form.excerpt}
          onChange={e => setForm({ ...form, excerpt: e.target.value })}
        />
        <textarea
          className="border p-2 rounded h-40"
          placeholder="Sadržaj blog posta"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={e => setForm({ ...form, published: e.target.checked })}
          />
          Objavljen
        </label>

        <div className="flex gap-2">
          <button
            onClick={savePost}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Sačuvaj izmene' : 'Dodaj post'}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Otkaži
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="grid gap-4">
        {posts.map(p => (
          <div
            key={p.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.slug}</p>
            </div>

            <div className="flex gap-2 items-center">
              <span
                className={`text-sm font-semibold ${
                  p.published ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {p.published ? 'Objavljen' : 'Draft'}
              </span>

              <button
                onClick={() => editPost(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deletePost(p.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
