"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import Link from "next/link";

import { ArrowUpFromDot, ChevronRightSquare, Settings } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

const UserAccountNav = () => {
  const { isLoaded, user } = useUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Avatar className="rounded-full">
            <AvatarImage
              src={user?.imageUrl}
              alt={user?.fullName}
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.fullName}
              </p>

              <p className="w-[200px] truncate text-xs text-zinc-500">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm">
              <ChevronRightSquare className="w-4 h-4 font-normal text-slate-600" />{" "}
              dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 font-normal text-slate-600" />{" "}
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <ArrowUpFromDot className="w-4 h-4 font-normal text-slate-600 mr-2" />{" "}
            <SignOutButton>Signout</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAccountNav;
