import Post from "@/components/posts/Post";
import allPosts from "@/data/posts.json";
import { popularCategories } from "@/libs/functions/categories";
import payloadConfig from "@/payload.config";
import styles from "@/styles/modules/Style.module.scss";
import { Category } from "@/types/category";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const slug = params.category;
  const categories = popularCategories(allPosts);
  const currentCategory = categories.find(
    (category) => category.name === slug.split("-").join(" ")
  );

  if (!currentCategory) {
    return notFound();
  }

  const { name, image } = currentCategory;

  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: `All ${name} posts`,
    openGraph: {
      images: [{ url: image }],
    },
  };
}

const CategorySingle = async (props: Props) => {
  const params = await props.params;
  const slug = params.category;

  const payload = await getPayload({
    config: payloadConfig,
  });

  const { docs: categoriesDocs } = await payload.find({
    collection: "categories",
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });
  const categories = categoriesDocs as unknown as Category[];

  const { docs: PostsDocs } = await payload.find({
    collection: "posts",
    where: {
      "category.slug": {
        equals: slug,
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
          <div className="row items-end gy-4">
            <div className="col-12">
              <p className="flex items-center justify-center gap-x-2 mb-6 sm:mb-8">
                <span>Category</span>
              </p>
              <h1 className="text-4xl md:text-5x text-white font-normal text-balance leading-tight capitalize relative z-10 mix-blend-difference text-center">
                <span className="inline-block bg-white w-6 md:w-10 h-px align-middle mr-4 md:mr-6"></span>
                {slug.split("-").join(" ")}
                <span className="inline-block bg-white w-6 md:w-10 h-px align-middle ml-4 md:ml-6"></span>
              </h1>
            </div>

            <div className="md:col-10 mx-auto">
              <div className="post-card mt-8 sm:mt-16">
                <div className="post-category !static !flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {categories.map((category, key) => (
                    <Link
                      className={`min-h-[40px] py-2 px-3 border-border transition-all duration-300 hover:bg-dark hover:text-white hover:border-dark !flex items-center gap-x-1 sm:w-auto w-[calc(50%-0.5rem)] justify-center text-center ${
                        slug === category.slug
                          ? "bg-dark text-white border-dark"
                          : ""
                      }`}
                      href={`/category/${category.slug}`}
                      key={key}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.waveBg} py-16 md:py-24 overflow-clip`}>
        <div className="container">
          {posts.length > 0 && (
            <div className="row g-6 justify-center">
              {posts.map((post) => (
                <div key={post.id} className="col-12 md:col-6 lg:col-4">
                  <Post post={post as Post} text="light" />
                </div>
              ))}
            </div>
          )}
        </div>

        {posts.length === 0 && (
          <div className="col-12">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl text-white font-normal text-balance leading-tight capitalize relative z-10 mix-blend-difference text-center">
                <span className="inline-block bg-white w-6 md:w-10 h-px align-middle mr-4 md:mr-6"></span>
                No posts found
                <span className="inline-block bg-white w-6 md:w-10 h-px align-middle ml-4 md:ml-6"></span>
              </h2>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CategorySingle;
