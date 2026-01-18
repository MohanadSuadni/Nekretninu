import { createClient } from "@supabase/supabase-js";

// ================= SUPABASE CLIENT =================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL ili ANON KEY nisu definisani! API pozivi neće raditi."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://example.supabase.co", // fallback
  supabaseAnonKey || "fake-anon-key"
);

// ================= TYPES =================
export type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  date: string;

  coverImage?: string | null;
  author: string;
  authorImage?: string | null;
  adorImage?: string | null;
};

// ================= IMAGE PUBLIC URL =================
export function getPublicImageUrl(path?: string | null): string {
  if (!path) return "/images/blog/default-blog-image.jpg";

  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  if (!supabaseUrl) return "/images/blog/default-blog-image.jpg";

  return `${supabaseUrl}/storage/v1/object/public/${path}`;
}

// ================= GET ALL POSTS =================
export async function getAllPosts(): Promise<Blog[]> {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("date", { ascending: false });

  if (error || !data) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    content: post.content,
    date: post.date,

    coverImage: post.coverimage ?? null,
    author: post.author,
    authorImage: post.authorimage ?? null,
    adorImage: post.adorm ?? null,
  }));
}

// ================= GET POST BY SLUG =================
export async function getPostBySlug(slug: string): Promise<Blog | null> {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching post by slug:", error);
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt ?? null,
    content: data.content,
    date: data.date,

    coverImage: data.coverimage ?? null,
    author: data.author,
    authorImage: data.authorimage ?? null,
    adorImage: data.adorm ?? null,
  };
}
