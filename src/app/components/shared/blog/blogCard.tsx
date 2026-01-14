import React, { FC } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Blog, getPublicImageUrl } from "@/app/lib/supabase/service";

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
  const { title, coverImage, date, slug } = blog;
  const coverImageUrl = getPublicImageUrl(coverImage);

  return (
    <Link
      href={`/blogs/${slug}`}
      className="flex gap-4 group"
      aria-label={`Read blog ${title}`}
    >
      <div className="overflow-hidden rounded-lg flex-shrink-0 w-52 h-48">
        <Image
          src={coverImageUrl}
          alt={title}
          className="transition group-hover:scale-125 w-full h-full object-cover"
          width={190}
          height={163}
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col justify-evenly">
        <span className="text-sm sm:text-base md:text-lg font-medium text-gray-500 leading-loose">
          {format(new Date(date), "MMM dd, yyyy")}
        </span>
        <h3 className="mt-2 text-xl sm:text-[22px] md:text-2xl font-medium text-midnight_text group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-4 text-primary text-base sm:text-lg">Read More</p>
      </div>
    </Link>
  );
};

export default BlogCard;
