import { supabaseServer } from "@/app/lib/supabaseServer";

export async function isAdmin(userId: string) {
  const { data, error } = await supabaseServer
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();

  if (error) return false;
  return !!data;
}
