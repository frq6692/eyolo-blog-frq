import PostCard from "@/components/posts/Post";
import payloadConfig from "@/payload.config";
import { Author } from "@/types/author";
import type { Post } from "@/types/post";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const slug = params.slug;
  const payload = await getPayload({
    config: payloadConfig,
  });
  const { docs } = await payload.find({
    collection: "users",
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      occupation: true,
    },
  });

  const currentAuthor = docs?.[0] || null;

  return {
    title: `${currentAuthor.name} | Author`,
    description: `${currentAuthor.name} is a ${currentAuthor.occupation}`,
    // openGraph: {
    //   images: [{ url: image }],
    // },
  };
}

async function AuthorSingle(props: Props) {
  const params = await props.params;
  const slug = params.slug;

  const payload = await getPayload({
    config: payloadConfig,
  });
  const { docs: usersDocs } = await payload.find({
    collection: "users",
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      occupation: true,
    },
  });

  const currentAuthor = usersDocs?.[0] as Author;

  if (!currentAuthor) {
    return notFound();
  }

  const { docs: PostsDocs } = await payload.find({
    collection: "posts",
    where: {
      author: {
        equals: currentAuthor.id,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      category: true,
      excerpt: true,
      publishedAt: true,
      author: true,
    },
  });

  const posts = PostsDocs as unknown as Post[];

  return (
    <>
      <section className="py-16 md:py-24 border-b border-border overflow-clip">
        <div className="container">
          <div className="row justify-center gy-4">
            <div className="col-12">
              {/* <Image
                src={image}
                alt={title}
                height={128}
                width={128}
                className="rounded-lg sm:h-32 h-28 sm:w-32 w-28 mx-auto bg-white/10 mb-8 sm:mb-12"
              /> */}
              <h1 className="text-4xl md:text-5xl text-white font-normal text-balance leading-tight capitalize relative z-10 mix-blend-difference text-center">
                <span className="inline-block bg-white w-6 md:w-10 h-px align-middle mr-4 md:mr-6"></span>
                {currentAuthor.name}
                <span className="inline-block bg-white w-6 md:w-10 h-px align-middle ml-4 md:ml-6"></span>
              </h1>
              <p className="flex items-center justify-center gap-x-2 mt-5">
                <span>{currentAuthor.occupation}</span>
              </p>
            </div>

            {/* <div className="md:col-7">
              <div className="prose content max-w-none text-center">
                {currentAuthor.content}
              </div>
            </div> */}

            <div className="md:col-12">
              <hr className="h-px border-dark/10 my-4 md:my-8 max-w-[200px] mx-auto" />
            </div>

            <div className="md:col-12 -mb-4">
              <div className="row g-6">
                {posts.map((post, key) => (
                  <div key={key} className="md:col-6 lg:col-4 mb-4">
                    <PostCard post={post as Post} text="dark" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AuthorSingle;
