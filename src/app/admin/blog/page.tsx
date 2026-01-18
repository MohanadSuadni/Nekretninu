'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Upload function - vraća PUBLIC URL
const uploadImage = async (file: File, folder: string) => {
const fileName = `${uuidv4()}-${file.name}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from('properties')
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error('Upload error:', error);
    return '';
  }

  // Public URL da radi i na Vercel-u
  const { data } = supabase.storage.from('properties').getPublicUrl(filePath);
  return data.publicUrl;
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    cover_image: '',
    author_image: '',
    adorm_image: '',
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [authorFile, setAuthorFile] = useState<File | null>(null);
  const [adormFile, setAdormFile] = useState<File | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: form.content,
    onUpdate: ({ editor }) => setForm(prev => ({ ...prev, content: editor.getHTML() })),
    immediatelyRender: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });
    if (!error) setPosts(data || []);
  };

  // Handleri za upload
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    const url = await uploadImage(file, 'blog');
    setForm(prev => ({ ...prev, cover_image: url }));
  };

  const handleAuthorChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAuthorFile(file);
    const url = await uploadImage(file, 'blog');
    setForm(prev => ({ ...prev, author_image: url }));
  };

  const handleAdormChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAdormFile(file);
    const url = await uploadImage(file, 'blog');
    setForm(prev => ({ ...prev, adorm_image: url }));
  };

  const savePost = async () => {
    if (!form.title || !form.slug) return alert('Title i slug su obavezni');

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      date: new Date().toISOString(),
      coverimage: form.cover_image || null,
      authorimage: form.author_image || null,
      adorm: form.adorm_image || null,
      author: form.author,
    };

    try {
      if (editingId) {
        const { error } = await supabase.from('blogs').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert([payload]);
        if (error) throw error;
      }

      setEditingId(null);
      setForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        cover_image: '',
        author_image: '',
        adorm_image: '',
      });
      editor?.commands.setContent('');
      fetchPosts();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Greška pri čuvanju posta');
    }
  };

  const editPost = (post: any) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author,
      cover_image: post.coverimage || '',
      author_image: post.authorimage || '',
      adorm_image: post.adorm || '',
    });
    editor?.commands.setContent(post.content || '');
  };

  const deletePost = async (id: string) => {
    if (!confirm('Da li ste sigurni da želite da obrišete post?')) return;
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) console.error(error);
    fetchPosts();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto pt-24">
      <h1 className="text-2xl font-bold mb-6">{editingId ? 'Edit Post' : 'Add Post'}</h1>

      {/* FORM */}
      <div className="grid gap-3 mb-10 bg-white p-4 rounded shadow">
        <input
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={e => {
            const title = e.target.value;
            setForm(prev => ({
              ...prev,
              title,
              slug: title.toLowerCase().trim().replace(/ /g, '-').replace(/[^a-z0-9\-]/g, ''),
            }));
          }}
        />
        <input placeholder="Slug" className="border p-2 rounded" value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} />
        <input placeholder="Author" className="border p-2 rounded" value={form.author} onChange={e => setForm(prev => ({ ...prev, author: e.target.value }))} />
        <textarea placeholder="Excerpt" className="border p-2 rounded" value={form.excerpt} onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))} />

        <label>
          Cover Image
          <input type="file" accept="image/*" onChange={handleCoverChange} className="mt-1 border rounded p-1 w-full" />
        </label>
        <label>
          Author Image
          <input type="file" accept="image/*" onChange={handleAuthorChange} className="mt-1 border rounded p-1 w-full" />
        </label>
        <label>
          Adorm Image
          <input type="file" accept="image/*" onChange={handleAdormChange} className="mt-1 border rounded p-1 w-full" />
        </label>

        <div className="border p-2 rounded">
          <EditorContent editor={editor} />
        </div>

        <div className="flex gap-2">
          <button onClick={savePost} className="bg-green-600 text-white px-4 py-2 rounded">{editingId ? 'Save Changes' : 'Add Post'}</button>
          {editingId && (
            <button onClick={() => { setEditingId(null); editor?.commands.setContent(''); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          )}
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div className="flex items-center gap-2">
              {post.coverimage && <img src={post.coverimage} alt="Cover" className="w-24 h-24 object-cover rounded" />}
              {post.authorimage && <img src={post.authorimage} alt="Author" className="w-12 h-12 object-cover rounded-full" />}
              {post.adorm && <img src={post.adorm} alt="Adorm" className="w-12 h-12 object-cover rounded-full" />}
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.slug}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => editPost(post)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => deletePost(post.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
