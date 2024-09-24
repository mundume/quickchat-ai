import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-screen-xl w-full mx-auto px-2.5 md:px-20  dark:bg-background ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
