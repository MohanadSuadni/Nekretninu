import BlogCard from "@/app/components/shared/blog/blogCard";
import HeroSub from "@/app/components/shared/hero-sub";
import { getAllPosts } from "@/app/lib/supabase/service";

export const metadata = {
  title: "Blog | Property-pro",
};

export default async function BlogListPage() {
  const posts = await getAllPosts();

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/blogs", text: "Blog List" },
  ];

  return (
    <>
      <HeroSub
        title="Blog List"
        description="Latest news and articles"
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
