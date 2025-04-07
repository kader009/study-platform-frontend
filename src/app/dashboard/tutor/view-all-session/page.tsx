'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { useTutorSessionQuery } from '@/redux/endApi';

interface Sessionprops {
  _id: string;
  sessionTitle: string;
  tutorName: string;
  tutorEmail: string;
  sessionDescription: string;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartDate: string;
  status: string;
}

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
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Session name</TableHead>
                <TableHead>Register deadline</TableHead>
                <TableHead>status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions?.length > 0 ? (
                sessions?.map((session: Sessionprops, index: number) => (
                  <TableRow key={session._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{session.sessionTitle}</TableCell>
                    <TableCell>{session.registrationEndDate}</TableCell>
                    <TableCell>{session.status}</TableCell>
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
