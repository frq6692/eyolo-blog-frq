"use client";

import { pageParam } from "@/app/(frontend)/blog/searchParams";
import { useQueryState } from "nuqs";

interface Props {
  metadata: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: number | null | undefined;
    page?: number | undefined;
    pagingCounter: number;
    prevPage?: number | null | undefined;
    totalDocs: number;
    totalPages: number;
  };
}

function Pagination({ metadata }: Props) {
  const [, setPage] = useQueryState("page", pageParam);

  return (
    <>
      <div className="col-12">
        <hr className="border-border" />
        <div className="flex flex-col justify-center items-center gap-y-4 mt-12">
          <div className="flex gap-x-5 [&>*]:cursor-pointer [&>*]:flex [&>*]:items-center [&>*]:gap-x-2 [&>*]:px-5 [&>*]:py-3 [&>*]:rounded-md">
            <button
              className={`group ${
                !metadata.hasPrevPage ? "pointer-events-none opacity-25" : ""
              }`}
              onClick={() => setPage(() => metadata.prevPage || 1)}
            >
              {/* prettier-ignore */}
              <svg className="-ml-2 transition duration-300 group-hover:-translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Previous
            </button>
            <button
              className={`group ${
                !metadata.hasNextPage ? "pointer-events-none opacity-25" : ""
              }`}
              onClick={() =>
                setPage(() => metadata.nextPage || metadata.totalPages)
              }
            >
              Next
              {/* prettier-ignore */}
              <svg className="-mr-2 transition duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
          <p>
            Page {metadata.page}{" "}
            <span className="px-5 -translate-y-px inline-block opacity-20">
              |
            </span>
            {metadata.limit * (metadata.page || 1) < metadata.totalDocs
              ? metadata.limit * (metadata.page || 1)
              : metadata.totalDocs}{" "}
            of {metadata.totalDocs} Posts
          </p>
        </div>
      </div>

      {/* <pre>{JSON.stringify(metadata, null, 4)}</pre> */}
    </>
  );
}

export default Pagination;
