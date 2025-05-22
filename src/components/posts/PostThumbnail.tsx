"use client";

import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface Props {
  post: Post;
  text: "dark" | "light";
}

function PostThumbnail({ post, text }: Props) {
  const categoryRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="relative">
      <span
        className={`post-category z-10 ${
          text === "light" ? "text-white" : "text-dark"
        }`}
      >
        <Link
          ref={categoryRef}
          href={`/category/${post.category.slug}`}
          className={`transition duration-300    ${
            text === "light"
              ? "border-white/30 hover:bg-white hover:text-dark"
              : "border-dark hover:bg-dark hover:text-white"
          }`}
        >
          {post.category.title}
        </Link>
      </span>
      <Image
        className="post-image rounded-xl md:rounded-2xl h-[360px] w-full object-cover bg-white/10"
        style={{
          ["--charLen" as string]: post.category.title.length,
        }}
        ref={(el) => {
          if (!el) return;
          const catWidth = categoryRef.current?.offsetWidth;
          if (catWidth) el.style.setProperty("--catWidth", `${catWidth}px`);
        }}
        src={post.thumbnail.url}
        height={post.thumbnail.width}
        width={post.thumbnail.height}
        alt={post.title}
      />
    </div>
  );
}

export default PostThumbnail;
