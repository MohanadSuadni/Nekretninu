import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

// ================= GET ALL =================

export async function getAllPosts(): Promise<Blog[]> {
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
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,

    coverImage: post.coverimage,
    author: post.author,
    authorImage: post.authorimage,
    adorImage: post.adorm,
  }));
}

// ================= GET BY SLUG =================

export async function getPostBySlug(slug: string): Promise<Blog | null> {
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
    excerpt: data.excerpt,
    content: data.content,
    date: data.date,

    coverImage: data.coverimage,
    author: data.author,
    authorImage: data.authorimage,
    adorImage: data.adorm,
  };
}

// ================= IMAGE URL =================

export function getPublicImageUrl(path?: string | null) {
  if (!path) return "/images/blog/default-blog-image.jpg";

  return `https://xsrwaqbirpnycvtvbqju.supabase.co/storage/v1/object/public/${path}`;
}
