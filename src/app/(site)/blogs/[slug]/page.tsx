import type { Blog } from "@/app/lib/supabase/service";
import { getPostBySlug, getPublicImageUrl } from "@/app/lib/supabase/service";
import { format } from "date-fns";
import Image from "next/image";
import Markdown from "react-markdown";
import AdorImageSlider from "@/app/components/AdorImageSlider";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const post: Blog | null = await getPostBySlug(slug);

  if (!post) {
    return <p className="pt-40 text-center">Post not found</p>;
  }

  // ================= SAFE IMAGE URLS =================
  const coverImageUrl: string = post.coverImage
    ? getPublicImageUrl(post.coverImage)
    : "/default-cover.png";

  const authorImageUrl: string = post.authorImage
    ? getPublicImageUrl(post.authorImage)
    : "/default-avatar.png";

  // ================= ADOR IMAGES =================
  const adorImages: string[] = (post.adorImages || []).map(getPublicImageUrl);

  return (
    <>
      {/* ================= HEADER ================= */}
      <section className="relative pt-44 bg-gradient-to-b from-white dark:from-darkmode to-herobg dark:to-darklight">
        <div className="container lg:max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {format(new Date(post.date), "dd MMM yyyy")}
              </p>
              <h1 className="text-4xl font-bold mt-4 text-midnight_text dark:text-white">
                {post.title}
              </h1>
            </div>

            <div className="md:col-span-4 flex gap-4 items-center mt-6 md:mt-0">
              <Image
                src={authorImageUrl}
                alt={post.author || "Author"}
                width={84}
                height={84}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-midnight_text dark:text-white">{post.author}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <section className="pb-20 pt-20 dark:bg-darkmode lg:pt-32">
        {/* ===== COVER IMAGE ===== */}
        {coverImageUrl && (
          <div className="container lg:max-w-screen-xl mx-auto px-4">
            <div className="z-20 mb-16 h-80 overflow-hidden rounded md:h-25 lg:h-31.25">
              <Image
                src={coverImageUrl}
                alt={post.title}
                width={1170}
                height={766}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        )}

        {/* ================= CONTENT + SIDEBAR ================= */}
        <div className="container lg:max-w-screen-xl mx-auto px-4 flex flex-wrap mt-16">
          {/* ===== CONTENT ===== */}
          <div className="w-full lg:w-8/12 px-4">
            {/* TAG */}
            <div className="mb-6">
              <span className="inline-block rounded-full border border-primary px-4 py-1 text-sm font-medium text-primary">
                {post.title}
              </span>
            </div>

            {/* DECORATIVE LINE */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm text-gray-500">
               Posted {format(new Date(post.date), "dd MMM yyyy")}
              </span>
            </div>

            {/* MARKDOWN CONTENT */}
       <div className="prose prose-lg dark:prose-invert max-w-none">
  <div dangerouslySetInnerHTML={{ __html: post.content }} />

  {/* ================= ADOR SLIDER ================= */}
  {adorImages.length > 0 && (
    <div className="mt-12">
      <AdorImageSlider images={adorImages} />
    </div>
  )}
</div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="w-full lg:w-4/12 px-4">
            <div className="flex flex-col gap-8">
              {/* SHARE */}
              <div className="py-12 px-11 bg-white dark:bg-semidark shadow-lg border-b-2 border-border dark:border-dark_border">
                <h2 className="mb-5 dark:text-white text-midnight_text font-medium text-2xl">
                  Share
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="bg-[#526fa3] py-4 px-6 text-xl rounded-lg text-white">Facebook</div>
                  <div className="bg-[#46C4FF] py-4 px-6 text-xl rounded-lg text-white">Twitter</div>
                  <div className="bg-[#3C86AD] py-4 px-6 text-xl rounded-lg text-white">LinkedIn</div>
                </div>
              </div>

              {/* NEWSLETTER */}
              <div className="py-12 px-11 bg-white dark:bg-semidark shadow-lg">
                <p className="text-midnight_text text-2xl font-medium mb-4 dark:text-white">
                  Join our Newsletter
                </p>
                <input
                  placeholder="Email address"
                  className="p-3 border border-border dark:border-dark_border rounded-lg mb-3 w-full dark:bg-semidark"
                />
                <button className="w-full py-4 text-lg font-medium bg-primary rounded-lg text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
