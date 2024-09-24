export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <div className="bg-white shadow-md rounded-lg p-6">{children}</div>
    </div>
  );
}
