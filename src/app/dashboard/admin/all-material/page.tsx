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
import { useAllMaterilQuery, useDeleteMaterialMutation } from '@/redux/endApi';
import Link from 'next/link';
import DynamicTitle from '@/components/DynamicTitle';
import MaterialTableSkeleton from '@/components/skeleton/MaterialTableSkeleton';
import { Materialprops } from '@/types/adminMaterialprops';
import { toast } from 'sonner';

const Page = () => {
  const {
    data: materials,
    isLoading,
    isError,
  } = useAllMaterilQuery({}, { pollingInterval: 2000 });
  const [deleteMaterial] = useDeleteMaterialMutation();

  const handleDelete = (id: string) => {
    deleteMaterial(id);
    toast.success('Material deleted successfully');
  };

  if (isLoading) return <MaterialTableSkeleton />;

  if (isError)
    return (
      <div className="text-red-600 font-bold text-center">
        Something went wrong
      </div>
    );

  return (
    <div>
      <DynamicTitle />
      <div>
        <h1 className="text-center font-semibold my-6 text-xl capitalize">
          A list of your all material
        </h1>
        <div className="overflow-x-auto w-full">
          <Table className=" min-w-150 w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Drive link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials?.length > 0 ? (
                materials?.map((material: Materialprops, index: number) => (
                  <TableRow key={material._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{material.MaterialTitle}</TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-full mt-2"
                      >
                        <Link href={material.UploadImages} target="_blank">
                          Image link
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link href={material.GoogledriveLink} target="_blank">
                        <Button
                          type="submit"
                          className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-full mt-2 cursor-pointer"
                        >
                          Drive link
                        </Button>
                      </Link>
                    </TableCell>
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-full mt-2 cursor-pointer"
                      onClick={() => handleDelete(material._id)}
                    >
                      Delete
                    </Button>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No material found
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
