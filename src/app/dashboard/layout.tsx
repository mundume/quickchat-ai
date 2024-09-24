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
        <aside className="w-12 sm:w-64">
          <nav className="mt-5">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              <Home className="w-4 h-4 font-normal text-slate-900 mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              <Users className="w-4 h-4 font-normal text-slate-900 mr-2" />
              <span className="hidden sm:inline">Users</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              <Settings className="w-4 h-4 font-normal text-slate-900 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-8 overflow-auto ">{children}</main>
      </div>
    </MaxWidthWrapper>
  );
}
