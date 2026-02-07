'use client';

import { useState, useEffect } from 'react';
import { RootState } from '@/redux/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
  HeartIcon,
  ArrowPathIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import DynamicTitle from '@/components/DynamicTitle';
import {
  useAllSessionQuery,
  useAllUserQuery,
  useAllMaterilQuery,
  useUpdateUserProfileMutation,
} from '@/redux/endApi';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { setUser } from '@/redux/features/authentication/userSlice';
import { toast } from 'sonner';

export default function AdminProfilePage() {
  const admin = useSelector((state: RootState) => state?.user?.user);
  const { data: sessionsData, isLoading: sessionsLoading } =
    useAllSessionQuery(undefined);
  const { data: usersData, isLoading: usersLoading } =
    useAllUserQuery(undefined);
  const { data: materialsData, isLoading: materialsLoading } =
    useAllMaterilQuery(undefined);

  const totalSessions = Array.isArray(sessionsData) ? sessionsData.length : 0;
  const totalUsers = Array.isArray(usersData) ? usersData.length : 0;
  const totalMaterials = Array.isArray(materialsData)
    ? materialsData.length
    : 0;

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state?.user?.token);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState(admin?.name || '');
  const [editImage, setEditImage] = useState(admin?.photoUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (admin) {
      setEditName(admin.name || '');
      setEditImage(admin.photoUrl || '');
    }
  }, [admin]);

  const handleProfileUpdate = async () => {
    if (!admin?._id) return;
    setIsSubmitting(true);
    try {
      await updateUserProfile({
        id: admin._id,
        body: { name: editName, photoUrl: editImage },
      }).unwrap();

      dispatch(
        setUser({
          user: { ...admin, name: editName, photoUrl: editImage },
          token: token || '',
        }),
      );

      toast.success('Profile updated successfully');
      setOpenEdit(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const adminInfo = {
    name: admin?.name || 'Md Abdul Kader Molla',
    email: admin?.email || 'admin@edunest.com',
    role: admin?.role || 'Admin',
    joined: 'May 5, 2025',
    lastLogin: 'June 27, 2025',
    bio: 'Building a better education platform for all learners.',
    profilePic:
      admin?.photoUrl ||
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740',
  };

  return (
    <div>
      <DynamicTitle />
      <section className="min-h-screen bg-gray-100 py-12 px-4 md:px-12">
        <div className="max-w-344 mx-auto bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-10">Admin Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Profile Info Card */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-md text-center w-full max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-300">
                <Image
                  src={adminInfo.profilePic}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {adminInfo.name}
              </h2>
              <p className="text-sm text-gray-600">{adminInfo.email}</p>
              <span className="mt-2 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                {adminInfo.role}
              </span>

              <div className="mt-4">
                <button
                  onClick={() => setOpenEdit(true)}
                  className="bg-black text-white py-2 px-6 rounded-full shadow hover:bg-gray-600 transition-all cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>

              {/* Edit Profile Dialog */}
              <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Profile Image URL
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter image URL"
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                      />
                    </div>
                    {editImage && (
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-blue-300">
                        <Image
                          src={editImage}
                          alt="Preview"
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenEdit(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleProfileUpdate}
                      disabled={isSubmitting}
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Facebook Post */}
              <div className="mt-8 p-4 bg-white rounded-lg shadow-md text-left">
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  Facebook Post
                </h3>
                <p className="text-gray-700 mb-4">
                  Excited to share the latest updates from our admin dashboard!
                  Stay tuned for more improvements.
                </p>
                {/* Facebook actions */}
                <div className="flex flex-wrap justify-between text-gray-600">
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                    <HandThumbUpIcon className="w-5 h-5" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                    <ShareIcon className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Twitter Post */}
              <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-left">
                <h3 className="text-lg font-semibold mb-2 text-blue-500">
                  Twitter Post
                </h3>
                <p className="text-gray-700 mb-4">
                  Just updated the admin profile with new features! #AdminLife
                  #DashboardUpdate
                </p>
                {/* Twitter actions */}
                <div className="flex flex-wrap justify-between text-gray-600">
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500 transition">
                    <ArrowPathIcon className="w-5 h-5" />
                    <span>Retweet</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-red-500 transition">
                    <HeartIcon className="w-5 h-5" />
                    <span>Like</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="text-md font-semibold text-gray-600 mb-2">
                  Joined Date
                </h3>
                <p className="text-lg text-gray-800">{adminInfo.joined}</p>
              </div>
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h4 className="text-md font-semibold text-gray-600 mb-2">
                  Last Login
                </h4>
                <p className="text-lg text-gray-800">{adminInfo.lastLogin}</p>
              </div>
              <div className="md:col-span-2 bg-white border rounded-lg p-6 shadow-sm">
                <h5 className="text-md font-semibold text-gray-600 mb-2">
                  Bio
                </h5>
                <p className="text-gray-700 leading-relaxed">{adminInfo.bio}</p>
              </div>

              {/* Widgets */}
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="bg-yellow-100 p-5 rounded-xl shadow-sm text-center">
                  <h6 className="text-xl font-bold text-yellow-800">
                    {sessionsLoading ? '...' : totalSessions}
                  </h6>
                  <p className="text-sm text-yellow-700">
                    Total Sessions Created
                  </p>
                </div>
                <div className="bg-purple-100 p-5 rounded-xl shadow-sm text-center">
                  <h1 className="text-xl font-bold text-purple-800">
                    {materialsLoading ? '...' : totalMaterials}
                  </h1>
                  <p className="text-sm text-purple-700">
                    Study Materials Uploaded
                  </p>
                </div>
                <div className="bg-green-100 p-5 rounded-xl shadow-sm text-center">
                  <h2 className="text-xl font-bold text-green-800">
                    {usersLoading ? '...' : totalUsers}
                  </h2>
                  <p className="text-sm text-green-700">
                    Total Users Registered
                  </p>
                </div>
              </div>

              {/* Admin Shortcuts */}
              <div className="md:col-span-2 mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <button className="bg-black text-white py-3 px-4 rounded-full shadow hover:bg-gray-600 transition-all">
                    <Link href="/dashboard/admin/all-user">All User</Link>
                  </button>
                  <button className="bg-black text-white py-3 px-4 rounded-full shadow hover:bg-gray-600 transition-all">
                    <Link href="/dashboard/admin/all-session">All Session</Link>
                  </button>
                  <button className="bg-black text-white py-3 px-4 rounded-full shadow hover:bg-gray-600 transition-all">
                    <Link href="/dashboard/admin/all-material">
                      All Material
                    </Link>
                  </button>
                </div>
              </div>

              {/* Security Tips */}
              <div className="md:col-span-2 mt-8 bg-gray-50 p-6 rounded-xl shadow-inner">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Security Tip
                </h4>
                <p className="text-gray-600 text-sm">
                  Always use a strong password and avoid sharing your
                  credentials. Check activity logs regularly to ensure secure
                  admin access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
