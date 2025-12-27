'use client';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    alert('Login successful!');
    window.location.href = '/admin/properties'; // direktno na properties formu
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}
