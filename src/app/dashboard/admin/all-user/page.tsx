import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const page = () => {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
      { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Editor" },
    ];
  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">A list of all users</h2>
        <div className="w-full">
          <div className="flex w-full max-w-sm items-center space-x-2 mx-2 my-4">
            <Input type="text" placeholder="Search by name and email" />
            {/* <Button type="submit">Search</Button> */}
          </div>
          <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">User Name</th>
            <th className="px-4 py-2 border">User Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="text-left hover:bg-gray-50">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
      </div>
    </div>
  );
};

export default page;
