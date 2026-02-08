'use client';

import DynamicTitle from '@/components/DynamicTitle';
import UserTableSkeleton from '@/components/skeleton/UserTableSkeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAllUserQuery, useUpdateUserProfileMutation } from '@/redux/endApi';
import { Userprops } from '@/types/userProps';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'sonner';

const Page = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useAllUserQuery(
    {},
    {
      pollingInterval: 1000,
    },
  );

  const [searchTerm, setsearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Userprops | null>(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditClick = (user: Userprops) => {
    setSelectedUser(user);
    setEditName(user.name || '');
    setEditImage('');
    setOpenEdit(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedUser?._id) return;
    setIsSubmitting(true);
    try {
      const body: { name?: string; photoUrl?: string } = {};
      if (editName.trim()) body.name = editName;
      if (editImage.trim()) body.photoUrl = editImage;

      await updateUserProfile({ id: selectedUser._id, body }).unwrap();
      toast.success('User updated successfully');
      setOpenEdit(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Handleview = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleData = users?.slice(0, visibleCount);

  if (isLoading) return <UserTableSkeleton />;
  if (isError)
    return (
      <div className="flex justify-center items-center text-2xl text-red-600">
        something went wrong with api fetching
      </div>
    );

  const filterUser = visibleData?.filter(
    (user: Userprops) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
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
                  <th className="px-4 py-2 border">Action</th>
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
                        <button
                          onClick={() => handleEditClick(user)}
                          className="p-2 hover:bg-gray-200 rounded-full transition cursor-pointer"
                          title="Edit user"
                        >
                          <FiEdit className="w-5 h-5 text-black" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No user found...
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

      {/* Edit User Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <Input type="text" value={selectedUser?.email || ''} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Name
              </label>
              <Input
                type="text"
                placeholder="Enter new name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            {selectedUser?.photoUrl && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Current Image URL
                </label>
                <Input
                  type="text"
                  value={selectedUser.photoUrl}
                  disabled
                  className="text-gray-500"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                New Image URL
              </label>
              <Input
                type="text"
                placeholder="Enter new image URL"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSubmit}
              disabled={isSubmitting}
              className="bg-black hover:bg-gray-800 text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
