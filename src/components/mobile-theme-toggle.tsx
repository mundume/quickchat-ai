"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const MobileThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  let themeContent;
  switch (theme) {
    case "light":
      themeContent = (
        <span className="flex items-center justify-center gap-1 ">
          <Sun className="mr-1.5 dark:text-slate-400 text-slate-600" /> Light
        </span>
      );
      break;
    case "dark":
      themeContent = (
        <span className="flex items-center justify-center gap-1 ">
          <Moon className="mr-1.5 dark:text-slate-400 text-slate-600" /> Dark
        </span>
      );
      break;
    default:
      themeContent = (
        <span className="flex items-center justify-center gap-1">
          <Monitor className="mr-1.5 dark:text-slate-400 text-slate-600" />{" "}
          System
        </span>
      );
  }

  return (
    <Select onValueChange={(theme) => setTheme(theme)}>
      <SelectTrigger className="w-[150px] dark:text-slate-500">
        <SelectValue placeholder={themeContent} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light" className="">
          <span className="flex items-center justify-center gap-1 ">
            <Sun className=" mr-1.5 dark:text-slate-400 text-slate-600" /> Light
          </span>
        </SelectItem>
        <SelectItem value="dark" className="">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            <Moon className=" mr-1.5 dark:text-slate-400 text-slate-600" /> Dark
          </span>
        </SelectItem>
        <SelectItem value="system">
          <span className="flex items-center justify-center gap-1 dark:text-slate-50 ">
            <Monitor className=" mr-1.5 dark:text-slate-400 text-slate-600" />{" "}
            System
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default MobileThemeToggle;
