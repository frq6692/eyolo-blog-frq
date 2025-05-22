import Skeleton from "@/components/blog/Skeleton";
import AllPosts from "@/components/posts/AllPosts";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { loadSearchParams } from "./searchParams";

export const metadata = {
  title: "All Blog Posts",
  description: "All of Eyolo's Blog Posts",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

async function AllBlog({ searchParams }: Props) {
  const { page } = await loadSearchParams(searchParams);
  const postsPerPage = 6;

  return (
    <>
      <section className="py-16 md:py-24 border-b border-border overflow-clip">
        <div className="container">
          <div className="row items-end gy-4">
            <div className="md:col-8">
              <p className="flex items-center justify-center md:justify-start gap-x-2 mb-6 sm:mb-8">
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2h18" /><rect width="18" height="12" x="3" y="6" rx="2" /><path d="M3 22h18" /></svg>
                <span>Explorer All</span>
              </p>
              <h1 className="text-4xl md:text-5xl text-white font-normal text-balance leading-tight capitalize relative z-10 mix-blend-difference text-center md:text-left">
                <span className="hidden md:inline-block bg-white w-6 md:w-10 h-px align-middle mr-4 md:mr-6"></span>
                Blogs from Eyolo
              </h1>
            </div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="container">
            <div className="row gx-5 gy-6">
              <div className="xl:col-4 lg:col-6 md:col-6 mb-3 sm:mb-8">
                <Skeleton dark />
              </div>
              <div className="xl:col-4 lg:col-6 md:col-6 mb-3 sm:mb-8">
                <Skeleton dark />
              </div>
              <div className="xl:col-4 lg:col-6 md:col-6 mb-3 sm:mb-8">
                <Skeleton dark />
              </div>
              <div className="xl:col-4 lg:col-6 md:col-6 mb-3 sm:mb-8">
                <Skeleton dark />
              </div>
            </div>
          </div>
        }
      >
        <AllPosts page={page} postsPerPage={postsPerPage} />
      </Suspense>
    </>
  );
}

export default AllBlog;
