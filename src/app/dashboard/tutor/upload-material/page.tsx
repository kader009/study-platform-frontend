'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { useTutorApprovedSessionQuery } from '@/redux/endApi';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Approveprops | null>(null);

  const handleOpenModal = (note: Approveprops) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedNote) return;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading..
      </div>
    );
  if (isError)
    return (
      <div className="text-center font-bold text-red-600">
        Something went wrong
      </div>
    );

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
                      onClick={() => handleOpenModal(approve)}
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

      {/* Modal */}
      {openModal && selectedNote && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Label htmlFor="form">Material title</Label>
              <Input type="text" placeholder="Material title" />

              <Label htmlFor="form">Session id</Label>
              <Input type="text" placeholder="Session id" disabled/>

              <Label htmlFor="form">Tutor email</Label>
              <Input type="text" placeholder="Tutor email" disabled/>

              <Label htmlFor="form">Upload images</Label>
              <Input type="file" placeholder="upload image" accept="image/**" />

              <Label htmlFor="form">Google drive link</Label>
              <Input type="text" placeholder="Google drive link" />
            </div>
            <DialogFooter>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Page;
