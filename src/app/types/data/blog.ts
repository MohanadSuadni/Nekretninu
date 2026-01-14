export type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  authorImage: string | null;
  date: string;
};
