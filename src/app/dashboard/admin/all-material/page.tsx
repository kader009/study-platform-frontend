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
import { useAllMaterilQuery } from '@/redux/endApi';
import Link from 'next/link';

interface Materialprops {
  _id: string;
  MaterialTitle: string;
  UploadImages: string;
  GoogledriveLink: string;
}

const Page = () => {
  const { data: materials, isLoading, isError } = useAllMaterilQuery('');

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
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
      <div>
        <h2 className="text-center font-semibold my-6">
          A list of your all material
        </h2>
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
                      <Link href={material.UploadImages} target="_blank"></Link>
                      <Button
                        type="submit"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                      >
                        Image link
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link href={material.GoogledriveLink} target="_blank">
                        <Button
                          type="submit"
                          className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                        >
                          Drive link
                        </Button>
                      </Link>
                    </TableCell>
                    <Button
                      type="submit"
                      className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
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
