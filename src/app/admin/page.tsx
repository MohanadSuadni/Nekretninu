'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
window.location.href = "/admin/properties";
      } else {
        setUser(data.session.user);
      }
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <main>
      <h1>ADMIN DASHBOARD</h1>
      <p>Welcome, {user.email}</p>
    </main>
  );
}
