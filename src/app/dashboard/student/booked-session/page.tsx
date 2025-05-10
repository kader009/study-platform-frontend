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
import { useGetbookByemailQuery } from '../../../../redux/endApi';
import { RootState } from '@/redux/store/store';
import { useAppSelector } from '@/redux/hook';
import Link from 'next/link';

interface SessionProps {
  _id: string;
  sessionId: string;
  tutorEmail: string;
  registrationFee: string;
}

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: sessions,
    isLoading,
    isError,
  } = useGetbookByemailQuery(user?.email);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">Loading..</div>
    );
  if (isError) return <div>Something went wrong..</div>;

  return (
    <div>
      <div>
        <h1 className="text-center font-semibold my-6 text-xl">
          A list of your recent booked session
        </h1>
        <div className="overflow-x-auto w-full">
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Session id</TableHead>
                <TableHead>Tutor email</TableHead>
                <TableHead>Transaction (free/paid)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions?.length > 0 ? (
                sessions.map((session: SessionProps, index: number) => (
                  <TableRow key={session._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{session.sessionId}</TableCell>
                    <TableCell>{session.tutorEmail}</TableCell>
                    <TableCell>${session.registrationFee}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/student/booked-session/${session._id}`}>
                        <Button className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded mt-2">
                          View Detail
                        </Button>
                      </Link>
                    </TableCell>
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
