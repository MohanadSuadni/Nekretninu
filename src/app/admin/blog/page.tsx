'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Kreiramo Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    author_image: '',
    adorm_image: '',
    cover_image: '',
  });

  // TipTap editor - SSR safe
  const editor = useEditor({
    extensions: [StarterKit],
    content: form.content,
    onUpdate: ({ editor }) =>
      setForm({ ...form, content: editor.getHTML() }),
    immediatelyRender: false, // bitno za SSR
  });

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });

    if (!error) setPosts(data || []);
    else console.error('Fetch posts error:', error);
  };

  // Upload image na Supabase storage
  const uploadImage = async (file: File) => {
    const fileName = `blog-${uuidv4()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('properties') // kreiraj folder 'blog-images'
      .upload(fileName, file);

    if (!error && data) {
      const url = supabase.storage
        .from('properties')
        .getPublicUrl(fileName).data.publicUrl;
      return url;
    }

    console.error('Upload error:', error);
    return '';
  };

  // Handle cover image
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    const url = await uploadImage(file);
    setForm({ ...form, cover_image: url });
  };

  // Save ili update post
  const savePost = async () => {
    if (!form.title || !form.slug) return alert('Title i slug su obavezni');

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      date: new Date().toISOString(),
      coverimage: form.cover_image || null,
      author: form.author,
  authorimage: form.author_image || null, // <-- ovo je ime iz baze
      adorm: form.adorm_image || null, // TAČNO ime iz baze
    };

    console.log('Payload koji šaljem u supabase:', payload);

    let data, error;
    if (editingId) {
      const res = await supabase.from('blogs').update(payload).eq('id', editingId);
      data = res.data;
      error = res.error;
    } else {
      const res = await supabase.from('blogs').insert([payload]);
      data = res.data;
      error = res.error;
    }

    if (error) {
      console.error('Insert/update error:', error);
      alert(`Došlo je do greške: ${error.message}`);
      return;
    }

    console.log('Insert/update uspešan:', data);

    // Reset forme i editor
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      author_image: '',
      adorm_image: '',
      cover_image: '',
    });
    editor?.commands.setContent('');
    fetchPosts();
  };

  // Edit post
  const editPost = (post: any) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author,
  author_image: post.authorimage || '',   // <-- mapiraš iz baze u state
      adorm_image: post.adorm || '', // TAČNO ime iz baze
      cover_image: post.coverImage || '',
    });
    editor?.commands.setContent(post.content || '');
  };

  // Delete post
  const deletePost = async (id: number) => {
    if (!confirm('Da li ste sigurni da želite da obrišete post?')) return;
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) console.error('Delete error:', error);
    fetchPosts();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto pt-24"> {/* pt-24 da bude ispod navbar-a */}
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? 'Edit Post' : 'Add Post'}
      </h1>

      {/* FORM */}
      <div className="grid gap-3 mb-10 bg-white p-4 rounded shadow">
        <input
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={e => {
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
          onChange={e => setForm({ ...form, slug: e.target.value })}
        />
        <input
          placeholder="Author"
          className="border p-2 rounded"
          value={form.author}
          onChange={e => setForm({ ...form, author: e.target.value })}
        />
        <textarea
          placeholder="Excerpt"
          className="border p-2 rounded"
          value={form.excerpt}
          onChange={e => setForm({ ...form, excerpt: e.target.value })}
        />

        <label>
          Cover Image
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="mt-1 border rounded p-1 w-full"
          />
        </label>

        <div className="border p-2 rounded">
          <EditorContent editor={editor} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={savePost}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Save Changes' : 'Add Post'}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                editor?.commands.setContent('');
              }}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="grid gap-4">
        {posts.map(post => (
          <div
            key={post.id}
            className="border rounded p-4 flex justify-between items-center"
          >
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
