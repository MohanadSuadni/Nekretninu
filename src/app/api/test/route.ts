import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase.from("properties").select("*");
  return NextResponse.json({ data, error });
}
