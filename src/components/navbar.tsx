"use client";
import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

import MobileNav from "./mobile-nav";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import UserAccountNav from "./user-dropdown";

export const NavBar = () => {
  const { user, isLoaded } = useUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 flex items-center w-full transition-all border-b border-gray-200 dark:border-none h-14 backdrop-blur-lg ">
      <MaxWidthWrapper className="max-w-full ">
        <div className="flex items-center justify-between border-b h-14 border-zinc-200 dark:border-none ">
          <Link href="/" className="z-40 flex font-semibold">
            <span>plebresume.</span>
          </Link>
          <MobileNav user={user} />

          {isLoaded ? (
            <div className="items-center hidden space-x-4 sm:flex">
              {!user ? (
                <>
                  <Link
                    href={"/sign-in"}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    login
                  </Link>

                  <Link
                    href={"/sign-up"}
                    className={cn(
                      buttonVariants({
                        size: "sm",
                      })
                    )}
                  >
                    register
                    <ArrowRightIcon className="ml-1.5 h-4 w-4 text-purple-500" />
                  </Link>
                  {/* <ModeToggle /> */}
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    <UserAccountNav />
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
