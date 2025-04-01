import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard/student/create-note" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Students
          </Link>
        </li>
        <li>
          <Link href="/dashboard/courses" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Courses
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;