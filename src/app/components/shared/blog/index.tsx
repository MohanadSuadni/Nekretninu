// 📁 src/app/components/shared/blog/index.tsx
import React from "react";
import BlogCard from "./blogCard";
import { getAllPosts, getPublicImageUrl } from "@/app/lib/supabase/service";

// ⚡ FORCE DYNAMIC – fetchuje svaki put nove podatke
export const dynamic = "force-dynamic";

const BlogSmall: React.FC = async () => {
  // Fetch svih postova
  const allPosts = await getAllPosts();

  // Debug log da vidiš šta Vercel fetchuje
  console.log(
    "BlogSmall posts:",
    allPosts.map((p) => ({ id: p.id, title: p.title, cover: p.coverImage }))
  );

  // Uzmi samo prva dva posta za Home card
  const posts = allPosts.slice(0, 2);

  return (
    <section className="flex flex-col dark:bg-darkmode px-4 md:px-4">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-0">
        <div className="items-center sm:mb-11 mb-7 flex justify-center">
          <h2 className="text-2xl sm:text-4xl text-midnight_text dark:text-white text-center font-bold">
            Blog Post
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {posts.map((blog, i) => (
            <div
              key={blog.id}
              className="w-full"
              data-aos="fade-up"
              data-aos-delay={`${i * 200}`}
              data-aos-duration="1000"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSmall;
