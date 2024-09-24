"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useSession, useUser } from "@clerk/nextjs";

import Image from "next/image";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { session } = useSession();

  return (
    <nav className="   transition-all  fixed w-full">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full justify-between items-center">
            <div className=" flex items-center md:justify-between">
              <Link href="/">
                <Image
                  src="/Rendercon-wb.png"
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="">
              <p className=" text-slate-400 text-xs">
                created by
                <Link
                  href="https://github.com/mundume"
                  className={buttonVariants({
                    variant: "link",
                  })}
                >
                  {" "}
                  yours truly
                </Link>
              </p>
            </div>
          </div>
          {session && (
            <div className=" sm:ml-6 sm:flex items-center justify-center flex  sm:items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.imageUrl} alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-800">
                        {user?.fullName}
                      </p>
                      <p className="text-xs leading-none text-slate-700">
                        {user?.emailAddresses[0].emailAddress}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-white"
                    onClick={() => signOut({ redirectUrl: "/" })}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
