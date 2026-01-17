'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    authorimage: '',
    adorm: '',
    coverimage: '',
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: form.content,
    onUpdate: ({ editor }) =>
      setForm((prev) => ({ ...prev, content: editor.getHTML() })),
    immediatelyRender: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('blogs').select('*').order('date', { ascending: false });
    setPosts(data || []);
  };

  // ⬅⬅⬅ VRACAJ SAMO PATH, NE URL !!
  const uploadImage = async (file: File) => {
    const fileName = `blog-${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('properties')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      return '';
    }

  return `properties/${fileName}`; // VAŽNO: samo path, sa folderom
  };

  const handleCoverChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const path = await uploadImage(file);
    setForm({ ...form, coverimage: path });
  };

  const savePost = async () => {
    if (!form.title || !form.slug) return alert('Title i slug su obavezni');

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      date: new Date().toISOString(),
      coverimage: form.coverimage || null,
      author: form.author,
      authorimage: form.authorimage || null,
      adorm: form.adorm || null,
    };

    let result;
    if (editingId) {
      result = await supabase.from('blogs').update(payload).eq('id', editingId);
    } else {
      result = await supabase.from('blogs').insert([payload]);
    }

    if (result.error) {
      alert(`Greška: ${result.error.message}`);
      return;
    }

    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      authorimage: '',
      adorm: '',
      coverimage: '',
    });
    editor?.commands.setContent('');
    fetchPosts();
  };

  const editPost = (post: any) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author,
      authorimage: post.authorimage || '',
      adorm: post.adorm || '',
      coverimage: post.coverimage || '',
    });
    editor?.commands.setContent(post.content);
  };

  const deletePost = async (id: number) => {
    if (!confirm('Obrisati post?')) return;
    await supabase.from('blogs').delete().eq('id', id);
    fetchPosts();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto pt-24">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? 'Edit Post' : 'Add Post'}
      </h1>

      <div className="grid gap-3 mb-10 bg-white p-4 rounded shadow">
        <input
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm({
              ...form,
              title,
              slug: title
                .toLowerCase()
                .trim()
                .replace(/ /g, '-')
                .replace(/[^a-z0-9\-]/g, ''),
            });
          }}
        />

        <input
          placeholder="Slug"
          className="border p-2 rounded"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <input
          placeholder="Author"
          className="border p-2 rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <input
          placeholder="Author image (upload separately)"
          className="border p-2 rounded"
          value={form.authorimage}
          onChange={(e) => setForm({ ...form, authorimage: e.target.value })}
        />

        <input
          placeholder="Ador image (upload separately)"
          className="border p-2 rounded"
          value={form.adorm}
          onChange={(e) => setForm({ ...form, adorm: e.target.value })}
        />

        <textarea
          placeholder="Excerpt"
          className="border p-2 rounded"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />

        <label>
          Cover Image
          <input type="file" accept="image/*" onChange={handleCoverChange} />
        </label>

        <div className="border p-2 rounded">
          <EditorContent editor={editor} />
        </div>

        <button
          onClick={savePost}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Save Changes' : 'Add Post'}
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded flex justify-between">
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.slug}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editPost(post)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
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
