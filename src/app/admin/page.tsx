'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase/client';
import AdminBlog from '@/app/admin/blog/page';
import AdminProperty from '@/app/admin/properties/page';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<'blog' | 'properties'>('blog');

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) router.push('/admin/login');
      else setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 pt-36 ">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${section === 'blog' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setSection('blog')}
        >
          Blog
        </button>
        <button
          className={`px-4 py-2 rounded ${section === 'properties' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setSection('properties')}
        >
          Oglasi
        </button>
      </div>

      <div>{section === 'blog' ? <AdminBlog /> : <AdminProperty />}</div>
    </div>
  );
}
