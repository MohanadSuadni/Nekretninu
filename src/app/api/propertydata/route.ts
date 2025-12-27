// src/app/api/propertydata/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("properties")
    .select("*");

  if (error) {
    console.error("Supabase error:", error); // ✅ loguj grešku
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
