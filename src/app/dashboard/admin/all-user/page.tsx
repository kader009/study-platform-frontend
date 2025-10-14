'use client';

import DynamicTitle from '@/components/DynamicTitle';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAllUserQuery, useUpdateUserMutation } from '@/redux/endApi';
import { useState } from 'react';
import { FaUserTie, FaUserShield } from 'react-icons/fa';
import { toast } from 'sonner';

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
  } = useAllUserQuery(
    {},
    {
      pollingInterval: 1000,
    }
  );

  const [updateUser] = useUpdateUserMutation();
  const [searchTerm, setsearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  const Handleview = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleRole = async (id: string, currentRole: string) => {
    if (currentRole !== 'admin') {
      try {
        await updateUser({ id, role: 'admin' });
        toast.success('user role updated');
      } catch (error) {
        console.log(error);
        toast.error('something went wrong');
      }
    }
  };

  const visibleData = users?.slice(0, visibleCount);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="flex justify-center items-center text-2xl text-red-600">
        something went wrong with api fetching
      </div>
    );

  const filterUser = visibleData?.filter(
    (user: Userprops) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DynamicTitle />
      <div>
        <h1 className="text-center font-semibold my-6 text-xl capitalize">
          A list of all users
        </h1>
        <div className="w-full">
          <div className="flex w-full max-w-sm items-center space-x-2 my-4">
            <Input
              type="text"
              placeholder="Search by name and email"
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />
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
                {filterUser && filterUser.length > 0 ? (
                  filterUser.map((user: Userprops, index: number) => (
                    <tr key={user._id} className="text-left hover:bg-gray-50">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.role}</td>
                      <td className="px-4 py-2 border">
                        <Button
                          disabled={user.role === 'admin'}
                          className=" text-white px-3 py-1 rounded hover:bg-blue-6"
                          onClick={() => handleRole(user?._id, user?.role)}
                        >
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      🚫 No user found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {visibleCount < users?.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={Handleview}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full transition cursor-pointer mb-3"
                >
                  View More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
