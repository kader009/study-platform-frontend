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
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import {
  useMaterialPostMutation,
  useTutorApprovedSessionQuery,
} from '@/redux/endApi';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ResetMaterialForm,
  SetGoogledriveLink,
  SetMaterialTitle,
  SetSessionId,
  SetTutorEmail,
  SetUploadImages,
} from '@/redux/features/uploadMaterial';
import { toast } from 'sonner';
import { Approveprops } from '@/types/materialApprove';

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const {
    data: approved,
    isLoading,
    isError,
  } = useTutorApprovedSessionQuery(user?.email, { pollingInterval: 2000 });
  const [openModal, setOpenModal] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState<Approveprops | null>(
    null
  );
  const {
    MaterialTitle,
    SessionId,
    TutorEmail,
    UploadImages,
    GoogledriveLink,
  } = useAppSelector((state: RootState) => state.uploadMaterial);
  const [uploadmaterial] = useMaterialPostMutation();
  const dispatch = useAppDispatch();

  const handleOpenModal = (approve: Approveprops) => {
    setSelectedUpload(approve);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedUpload) return;

    try {
      const response = await uploadmaterial({
        MaterialTitle,
        SessionId,
        TutorEmail,
        UploadImages,
        GoogledriveLink,
      });

      console.log('uploadmeterial', response);
      setOpenModal(false);
      toast.success('material upload successful');
      dispatch(ResetMaterialForm());
    } catch (error) {
      console.log(error);
      toast.error('something went wrong.');
    }
  };

  useEffect(() => {
    if (selectedUpload) {
      dispatch(SetSessionId(selectedUpload._id));
      dispatch(SetTutorEmail(selectedUpload.tutorEmail));
    }
  }, [selectedUpload, dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
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
        <h1 className="text-center font-semibold my-6 capitalize text-xl">
          upload material
        </h1>
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
                    <TableCell className="capitalize">
                      {approve.status}
                    </TableCell>
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded my-2"
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
      {openModal && selectedUpload && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Material for: {selectedUpload.sessionTitle}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Label htmlFor="form" className="font-semibold">
                Material title
              </Label>
              <Input
                type="text"
                placeholder="Material title"
                value={MaterialTitle}
                onChange={(e) => dispatch(SetMaterialTitle(e.target.value))}
              />

              <Label htmlFor="form" className="font-semibold">
                Session id
              </Label>
              <Input
                type="text"
                placeholder="Session id"
                disabled
                defaultValue={selectedUpload._id}
                value={SessionId}
              />

              <Label htmlFor="form" className="font-semibold">
                Tutor email
              </Label>
              <Input
                type="text"
                placeholder="Tutor email"
                disabled
                defaultValue={selectedUpload.tutorEmail}
                value={TutorEmail}
              />

              <Label htmlFor="form" className="font-semibold">
                Upload images (link or from hosting site)
              </Label>
              <Input
                type="text"
                placeholder="upload image"
                value={UploadImages}
                onChange={(e) => dispatch(SetUploadImages(e.target.value))}
                className="file-input"
              />

              <Label htmlFor="form" className="font-semibold">
                Google drive link
              </Label>
              <Input
                type="text"
                placeholder="Google drive link"
                value={GoogledriveLink}
                onChange={(e) => dispatch(SetGoogledriveLink(e.target.value))}
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
