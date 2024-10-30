import CombinedUploadInput from "@/components/upload-button-input";

export default function UsersPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      <CombinedUploadInput />
      <ul>
        <li className="mb-2">User 1</li>
        <li className="mb-2">User 2</li>
        <li className="mb-2">User 3</li>
      </ul>
    </div>
  );
}
