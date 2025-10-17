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

interface Materialprops {
  _id: string;
  MaterialTitle: string;
  UploadImages: string;
  GoogledriveLink: string;
}

const Page = () => {
  const {
    data: materials,
    isLoading,
    isError,
  } = useAllMaterilQuery({}, { pollingInterval: 2000 });
  const [deleteMaterial] = useDeleteMaterialMutation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );

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
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
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
                      onClick={() => deleteMaterial(material._id)}
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
