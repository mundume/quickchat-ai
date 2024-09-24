import Link from "next/link";
import { Home, Settings, Users } from "lucide-react";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaxWidthWrapper className="max-w-full">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-16 sm:w-64 ">
          <nav className="mt-5">
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              <Home className="inline-block mr-2" size={18} />
              <span className="hidden sm:inline">Home</span>
              <span className="sr-only sm:hidden">Home</span>
            </Link>
            <Link
              href="/dashboard/users"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              <Users className="inline-block mr-2" size={18} />
              <span className="hidden sm:inline">Users</span>
              <span className="sr-only sm:hidden">Users</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              <Settings className="inline-block mr-2" size={18} />
              <span className="hidden sm:inline">Settings</span>
              <span className="sr-only sm:hidden">Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-8 overflow-auto">{children}</main>
      </div>
    </MaxWidthWrapper>
  );
}
