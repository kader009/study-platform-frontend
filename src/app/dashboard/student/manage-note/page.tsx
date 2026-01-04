'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ManageNoteSkeleton from '@/components/skeleton/ManageNoteSkeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/hook';
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useUserNoteQuery,
} from '@/redux/endApi';
import { RootState } from '@/redux/store/store';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Noteprops {
  _id: string;
  title: string;
  description: string;
}

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: notes,
    isLoading,
    isError,
  } = useUserNoteQuery(user?.email, { pollingInterval: 1000 });
  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Noteprops | null>(null);

  const handleOpenModal = (note: Noteprops) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedNote) return;

    try {
      const response = await updateNote({
        id: selectedNote._id,
        title: selectedNote.title,
        description: selectedNote.description,
      });

      console.log('update response', response);
      setOpenModal(false);
      toast.success('note update successfully');
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      toast.success('delete note successfully');
    } catch (error) {
      toast.error('delete note successfully');
      console.error(error);
    }
  };

  if (isLoading) return <ManageNoteSkeleton />;

  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold">
        Something went wrong..
      </div>
    );

  return (
    <div>
      <div>
        <h1 className="text-center font-semibold my-6 text-xl">
          Manage your notes
        </h1>
        <div className="overflow-x-auto">
          <Table className=" min-w-150 w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">No</TableHead>
                <TableHead>Note name</TableHead>
                <TableHead>Note description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes?.length > 0 ? (
                notes?.map((note: Noteprops, index: number) => (
                  <TableRow key={note._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{note.title}</TableCell>
                    <TableCell>{note.description}</TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 mx-2 text-white py-2 rounded-full mt-2"
                        onClick={() => handleOpenModal(note)}
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-full mt-2"
                        onClick={() => handleDelete(note._id)}
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

      {/* Modal */}
      {openModal && selectedNote && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Title"
                value={selectedNote.title}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, title: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Description"
                value={selectedNote.description}
                onChange={(e) =>
                  setSelectedNote({
                    ...selectedNote,
                    description: e.target.value,
                  })
                }
              />
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
