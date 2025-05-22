import { Author } from "./author";
import { Media } from "./media";

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: Record<string, unknown>;
  readTime: string;
  updatedAt: string;
  createdAt: string;
  publishedAt: string;
  thumbnail: Media;
  category: Category;
  author: Author;
  relatedPosts: Post[];
  _status: "published" | "draft";
};
