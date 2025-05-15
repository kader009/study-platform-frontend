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
import { RootState } from '@/redux/store/store';
import {
  useDeleteMaterialMutation,
  useGetMaterialByemailQuery,
  useUpdateMaterialMutation,
} from '@/redux/endApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  SetGoogledriveLink,
  SetMaterialtitle,
  SetUploadImages,
} from '@/redux/features/updateMaterial';
import { toast } from 'sonner';

interface Materislprops {
  _id: string;
  MaterialTitle: string;
  SessionId: string;
}

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: materials,
    isLoading,
    isError,
  } = useGetMaterialByemailQuery(user?.email, {
    pollingInterval: 2000,
  });
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] =
    useState<Materislprops | null>(null);
  const [updateMaterial] = useUpdateMaterialMutation();
  const { MaterialTitle, GoogledriveLink, UploadImages } = useAppSelector(
    (state: RootState) => state.updateMaterial
  );
  const dispatch = useAppDispatch();

  const handleOpenModal = (material: Materislprops) => {
    setSelectedMaterial(material);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedMaterial) return;

    try {
      const response = await updateMaterial({
        id: selectedMaterial._id,
        MaterialTitle,
        GoogledriveLink,
        UploadImages,
      });
      console.log(response);
      setOpenModal(false);
      toast.success('update material successfully');
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    try {
      await deleteMaterial(id);
      toast.success('Material deleted successfully');
    } catch (error) {
      toast.error('Failed to delete material');
      console.error(error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold">
        Something went wrong..
      </div>
    );

  return (
    <div>
      <div>
        <h1 className="text-center font-semibold my-6 text-xl capitalize">
          your session material
        </h1>
        <div className="overflow-x-auto w-full">
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Session id</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials?.length > 0 ? (
                materials.map((material: Materislprops, index: number) => (
                  <TableRow key={material._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{material.MaterialTitle}</TableCell>
                    <TableCell>{material.SessionId}</TableCell>
                    <div className="my-2 flex flex-wrap gap-2">
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-lg"
                        onClick={() => handleOpenModal(material)}
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-lg"
                        onClick={() => handleDeleteMaterial(material._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No materials found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      {openModal && selectedMaterial && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Material</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Title"
                value={selectedMaterial.MaterialTitle}
                onChange={(e) => dispatch(SetMaterialtitle(e.target.value))}
              />
              <Input
                type="file"
                placeholder="Upload images"
                value={UploadImages}
                onChange={(e) => dispatch(SetUploadImages(e.target.value))}
              />
              <Input
                type="text"
                placeholder="Google drive link"
                value={GoogledriveLink}
                onChange={(e) => dispatch(SetGoogledriveLink(e.target.value))}
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
              <Button onClick={handleUpdate}>Update Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Page;
