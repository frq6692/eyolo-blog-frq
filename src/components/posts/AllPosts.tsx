import PostTwo from "@/components/posts/Post-2";
import payloadConfig from "@/payload.config";
import { Post } from "@/types/post";
import { getPayload } from "payload";
import Pagination from "./Pagination";

interface Props {
  page: number | null;
  postsPerPage: number;
}

const AllPosts = async ({ page, postsPerPage }: Props) => {
  const payload = await getPayload({
    config: payloadConfig,
  });
  const { docs: PostsDocs, ...metadata } = await payload.find({
    collection: "posts",
    limit: postsPerPage,
    sort: "-dateCreated",
    page: page || 1,
    where: {
      _status: {
        equals: "published",
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      category: true,
      excerpt: true,
      readTime: true,
      publishedAt: true,
      author: true,
    },
  });
  const posts = PostsDocs as unknown as Post[];

  return (
    <section className="py-16 sm:py-24 min-h-[500px]">
      <div className="container overflow-clip">
        <div className="row gx-5 gy-6 -mt-[9.5rem]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="xl:col-4 lg:col-6 md:col-6 mb-3 sm:mb-8"
            >
              <PostTwo post={post as Post} />
            </div>
          ))}
        </div>

        {metadata.totalPages > 1 && <Pagination metadata={metadata} />}
      </div>
    </section>
  );
};

export default AllPosts;
