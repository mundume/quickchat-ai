"use client";
import Image from "next/image";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import GroqSvg from "./groq-svg";
import { buttonVariants } from "./ui/button";
import { Github } from "lucide-react";

export const NavBar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 flex items-center w-full transition-all border-b border-gray-200 dark:border-none h-14 backdrop-blur-lg ">
      <MaxWidthWrapper className="max-w-full ">
        <div className="flex items-center justify-between border-b h-14 border-zinc-200 dark:border-none ">
          <Link href="/" className="z-40 flex font-semibold">
            <span>😀plebUis😀.</span>
          </Link>
          <div className="flex items-center gap-2 ">
            <h1 className="  text-slate-600">Powered by</h1>
            <Link href={"https://groq.com/"}>
              <Image src={"/groq.png"} height={50} width={50} alt="pleb" />
            </Link>
            X
            <Link href={"https://ai.meta.com/"}>
              <Image src={"/llama.png"} height={50} width={50} alt="pleb" />
            </Link>
          </div>
          <Link
            href={"https://github.com/mundume/quickchat-ai"}
            className={buttonVariants({
              size: "icon",
            })}
          >
            <Github className="w-4 h-4 text-slate-600" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
