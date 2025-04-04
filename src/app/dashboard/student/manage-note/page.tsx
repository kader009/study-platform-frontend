'use client'
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
import { useDeleteNoteMutation, useUserNoteQuery } from '@/redux/endApi';
import { RootState } from '@/redux/store/store';

interface Noteprops {
  _id: string;
  title: string;
  description: string;
}

const Page = () => {
  const { user } = useAppSelector((state:RootState) => state.user);
  const { data: notes, isLoading, isError } = useUserNoteQuery(user?.email, { pollingInterval :1000});
  const [deleteNote] = useDeleteNoteMutation()
  // const dispatch = useAppDispatch()

  if (isLoading) return <div className='flex justify-center items-center h-screen'>Loading..</div>;
  if (isError) return <div>Something went wrong..</div>;
  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">Manage your notes</h2>
        <div className="overflow-x-auto">
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
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
                      className="w-24 bg-black hover:bg-gray-900 mx-2 text-white py-2 rounded-lg mt-2"
                    >
                      Update
                    </Button>
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-lg mt-2"
                      onClick={() => deleteNote(note._id)}
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
