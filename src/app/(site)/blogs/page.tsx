// 📁 app/(site)/nova-gradnja/page.tsx
import BlogCard from "@/app/components/shared/blog/blogCard";
import HeroSub from "@/app/components/shared/hero-sub";
import { getAllPosts } from "@/app/lib/supabase/service";

export const metadata = {
  title: "Nova gradnja | Artopolis 369",
};

export const dynamic = "force-dynamic";

export default async function NovaGradnjaPage() {
  // SSR – učitava podatke pri svakom zahtevu
  const posts = await getAllPosts();

  const breadcrumbLinks = [
    { href: "/", text: "Početna" },
    { href: "/nova-gradnja", text: "Novagradnja" },
  ];

  return (
    <>
      <HeroSub
        title="Novagradnja"
        description="Pregled najnovijih projekata novogradnje i aktuelnih ponuda nekretnina."
        breadcrumbLinks={breadcrumbLinks}
      />

      <section className="flex flex-wrap justify-center px-4">
        <div className="container lg:max-w-screen-xl mx-auto">
          <div className="grid grid-cols-12 gap-6 lg:gap-14">
            {posts.map((blog) => (
              <div key={blog.id} className="col-span-12 lg:col-span-6">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
