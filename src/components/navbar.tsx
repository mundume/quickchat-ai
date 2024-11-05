"use client";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 flex items-center w-full transition-all border-b border-gray-200 dark:border-none h-14 backdrop-blur-lg ">
      <MaxWidthWrapper className="max-w-full ">
        <div className="flex items-center justify-between border-b h-14 border-zinc-200 dark:border-none ">
          <Link href="/" className="z-40 flex font-semibold">
            <span>😀plebUis😀.</span>
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
