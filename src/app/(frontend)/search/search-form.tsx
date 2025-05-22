"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { queryParam } from "./searchParams";

function SearchForm() {
  const [, setQuery] = useQueryState("q", queryParam);

  return (
    <div className="relative">
      <label htmlFor="search" className="relative">
        {/* prettier-ignore */}
        <svg className="absolute -top-[2px] sm:-top-2 left-0 h-5 sm:h-7 w-5 sm:w-7" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3241 18.7231L14.5858 12.9807C15.7171 11.624 16.3975 9.89022 16.3975 7.99659C16.3975 3.67647 12.852 0.163818 8.49092 0.163818C4.12981 0.163818 0.576172 3.68057 0.576172 8.00069C0.576172 12.3208 4.12162 15.8335 8.48272 15.8335C10.3354 15.8335 12.0405 15.1981 13.3931 14.1366L19.1518 19.8953C19.4879 20.2314 19.988 20.2314 20.3241 19.8953C20.6602 19.5592 20.6602 19.0592 20.3241 18.7231ZM2.25667 8.00069C2.25667 4.6069 5.05204 1.84842 8.48272 1.84842C11.9134 1.84842 14.7088 4.6069 14.7088 8.00069C14.7088 11.3945 11.9134 14.153 8.48272 14.153C5.05204 14.153 2.25667 11.3904 2.25667 8.00069Z" fill="#817E61"/></svg>
        <input
          type="text"
          aria-label="search-query"
          placeholder="Search entire blog..."
          className="bg-transparent border-b border-borderLight focus:ring-0 focus:outline-none w-full text-dark py-3 sm:py-4 text-xl sm:text-3xl font-primary placeholder:text-[#817E61] px-9 sm:px-12 focus:border-primary transition-all duration-500 outline-none shadow-none"
          onChange={(e) => setQuery(e.target.value || null)}
        />
      </label>

      <Link
        href="/"
        className={`absolute top-6 sm:top-14 right-3 sm:right-7 xl:right-8 border border-primary text-primary z-[999] h-9 sm:h-11 w-9 sm:w-11 grid place-items-center cursor-pointer rounded-full hover:bg-primary hover:text-white hover:scale-105 has-transition focus:outline-none`}
      >
        {/* prettier-ignore */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </Link>
    </div>
  );
}

export default SearchForm;
