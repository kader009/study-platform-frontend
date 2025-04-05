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
import {
  useAllSessionQuery,
  useApproveSessionMutation,
  useDeleteSessionMutation,
} from '@/redux/endApi';
import Loader from '@/components/Loader';

interface Sessionprops {
  _id: string;
  sessionTitle: string;
  tutorName: string;
  registrationFee: string;
  status: string;
}

const Page = () => {
  const {
    data: sessions,
    isLoading,
    isError,
  } = useAllSessionQuery({}, { pollingInterval: 2000 });
  const [deleteSession] = useDeleteSessionMutation();
  const [approveSession] = useApproveSessionMutation();

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red-500 text-center font bold"></div>;

  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">
          A list of all study session
        </h2>
        <div className="overflow-x-auto w-full">
          <Table className="min-w-[600px] w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Session name</TableHead>
                <TableHead>Tutor name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>fee</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions?.length > 0 ? (
                sessions?.map((session: Sessionprops, index: number) => (
                  <TableRow key={session._id}>
                    <TableCell className="font-medium">{index + 1}.</TableCell>
                    <TableCell>{session.sessionTitle}</TableCell>
                    <TableCell>{session.tutorName}</TableCell>
                    <TableCell>
                      {session.status === 'approved' ? (
                        <span className="text-black ">
                          Approved
                        </span>
                      ) : (
                        <Button
                          className="bg-black text-white py-1 px-3 rounded-md"
                          onClick={() => approveSession(session._id)}
                        >
                          Reject
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>${session.registrationFee}</TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2 mx-2"
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                        onClick={() => deleteSession(session._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No notes found
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
