'use client';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAllUserQuery } from '@/redux/endApi';
import { FaUserTie, FaUserShield } from 'react-icons/fa'; // Import Icons

interface Userprops {
  _id: string;
  no: number;
  name: string;
  email: string;
  role: string;
}

const Page = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useAllUserQuery({},{
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="flex justify-center items-center text-2xl text-red-600">
        something went wrong with the api
      </div>
    );

  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">A list of all users</h2>
        <div className="w-full">
          <div className="flex w-full max-w-sm items-center space-x-2 my-4">
            <Input type="text" placeholder="Search by name and email" />
            {/* <Button type="submit">Search</Button> */}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">User Name</th>
                  <th className="px-4 py-2 border">User Email</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: Userprops, index: number) => (
                  <tr key={user._id} className="text-left hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.role}</td>
                    <td className="px-4 py-2 border">
                      <Button className=" text-white px-3 py-1 rounded hover:bg-blue-6">
                        {user.role === 'admin' ? (
                          <>
                            <FaUserShield /> Admin
                          </>
                        ) : (
                          <>
                            <FaUserTie /> Make Admin
                          </>
                        )}
                      </Button>
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

export default Page;
