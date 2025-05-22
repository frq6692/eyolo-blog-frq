import { Post } from "@/types/post";

export const isPostInArray = (post: Post, array: Post[]) =>
  array.some((item) => item.slug === post.slug);
