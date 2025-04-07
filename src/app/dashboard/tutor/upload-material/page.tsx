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
import { useTutorApprovedSessionQuery } from '@/redux/endApi';

interface Approveprops {
  _id: string;
  sessionTitle: string;
  status: string;
}

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: approved,
    isLoading,
    isError,
  } = useTutorApprovedSessionQuery(user?.email, { pollingInterval: 2000 });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading..
      </div>
    );
  if (isError)
    return <div className="text-center font-bold text-red-600">Something went wrong</div>;

  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">upload material</h2>
        <div className="overflow-x-auto w-full">
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Session Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approved?.length > 0 ? (
                approved.map((approve: Approveprops, index: number) => (
                  <TableRow key={approve._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{approve.sessionTitle}</TableCell>
                    <TableCell>{approve.status}</TableCell>
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                    >
                      Upload
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
