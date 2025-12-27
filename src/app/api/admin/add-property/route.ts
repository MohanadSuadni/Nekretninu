import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabaseServer.from("properties").insert([
    {
      property_title: body.title,
      location: body.location,
      tag: body.tag,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
