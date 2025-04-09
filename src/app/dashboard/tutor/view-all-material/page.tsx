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
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">Loading..</div>
    );
  if (isError) return <div>Something went wrong..</div>;

  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">
          your session material
        </h2>
        <div className="overflow-x-auto w-full">
          <p>user information</p>
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
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-lg mt-2 mx-2"
                      onClick={() => handleOpenModal(material)}
                    >
                      Update
                    </Button>
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-lg mt-2"
                      onClick={() => deleteMaterial(material._id)}
                    >
                      Delete
                    </Button>
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
