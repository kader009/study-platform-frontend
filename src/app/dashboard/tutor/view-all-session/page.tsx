'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { useTutorSessionQuery } from '@/redux/endApi';

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: sessions,
    isLoading,
    isError,
  } = useTutorSessionQuery(user?.email, { pollingInterval: 1000 });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center text-red-600">
        Something went wrong
      </div>
    );
  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">
          A list of your create session
        </h2>
        <div className="overflow-x-auto w-full">
          <p>session: 0</p>

          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Session name</TableHead>
                <TableHead>Register deadline</TableHead>
                <TableHead>status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions?.length > 0 ? (
                sessions?.map((session, index) => (
                  <TableRow key={session._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{session.sessionTitle}</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="">$250.00</TableCell>
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                    >
                      View Detail
                    </Button>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No sessions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
