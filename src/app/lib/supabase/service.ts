import { supabase } from "@/app/lib/supabase/client";

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

  adorImages?: string[]; // ✅ VIŠE SLIKA
};

// ================= IMAGE PUBLIC URL =================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function getPublicImageUrl(path?: string | null): string {
  if (!path) return "/images/blog/default-blog-image.jpg";

  if (path.startsWith("http")) return path;

  if (!supabaseUrl) return "/images/blog/default-blog-image.jpg";

  return `${supabaseUrl}/storage/v1/object/public/${path}`;
}

// ================= GET ALL POSTS =================
export async function getAllPosts(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("date", { ascending: false });

  if (error || !data) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data.map((post) => {
    // ================= ADOR IMAGES =================
    let adorImages: string[] = [];
    if (post.adorm) {
      if (Array.isArray(post.adorm)) {
        adorImages = post.adorm;
      } else if (typeof post.adorm === "string") {
        adorImages = [post.adorm];
      }
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? null,
      content: post.content,
      date: post.date,

      coverImage: post.coverimage ?? null,
      author: post.author,
      authorImage: post.authorimage ?? null,

      adorImages,
    };
  });
}

// ================= GET POST BY SLUG =================
export async function getPostBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching post:", error);
    return null;
  }

 // ✅ Ako je adorm string JSON niza, parse, inače string u niz
  let adorImages: string[] = [];
  if (data.adorm) {
    if (typeof data.adorm === "string") {
      try {
        const parsed = JSON.parse(data.adorm);
        if (Array.isArray(parsed)) adorImages = parsed;
        else adorImages = [data.adorm];
      } catch {
        adorImages = [data.adorm]; // običan string
      }
    } else if (Array.isArray(data.adorm)) {
      adorImages = data.adorm;
    }
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

    adorImages,
  };
}
