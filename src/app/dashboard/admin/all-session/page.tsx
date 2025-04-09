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
  useUpdateSessionMutation,
} from '@/redux/endApi';
import Loader from '@/components/Loader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Sessionprops | null>(
    null
  );
  const [isFree, setIsFree] = useState(true);
  const [fee, setFee] = useState('');
  const [updateSession] = useUpdateSessionMutation();

  const handleUpdateClick = (session: Sessionprops) => {
    setSelectedSession(session);
    const isFreeSession = Number(session.registrationFee) === 0;
    setIsFree(isFreeSession);
    setFee(session.registrationFee);
    setIsOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedSession) return;

    try {
      await updateSession({
        id: selectedSession._id,
        body: {
          registrationFee: isFree ? '0' : fee,
        },
      });
      setIsOpen(false);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

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
                <TableHead>Fee</TableHead>
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
                        <span className="text-black ">Approved</span>
                      ) : (
                        <Button
                          className="bg-black text-white py-1 px-3 rounded-md"
                          onClick={() => approveSession(session._id)}
                        >
                          Pending
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>${session.registrationFee}</TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2 mx-2"
                        onClick={() => handleUpdateClick(session)}
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

      {/* modal */}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Session</DialogTitle>
            <DialogDescription>
              Modify the session fee and save changes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className='mb-2'>Session Title</Label>
              <Input disabled value={selectedSession?.sessionTitle || ''} />
            </div>

            <div>
              <Label>Fee Type</Label>
              <RadioGroup
                defaultValue={isFree ? 'free' : 'paid'}
                onValueChange={(value) => {
                  setIsFree(value === 'free');
                  if (value === 'free') setFee('0');
                }}
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="r1" />
                  <Label htmlFor="r1">Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="r2" />
                  <Label htmlFor="r2">Paid</Label>
                </div>
              </RadioGroup>
            </div>

            {!isFree && (
              <div>
                <Label htmlFor="fee" className='mb-2'>Registration Fee ($)</Label>
                <Input
                  id="fee"
                  type="number"
                  min="1"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={handleUpdateSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
