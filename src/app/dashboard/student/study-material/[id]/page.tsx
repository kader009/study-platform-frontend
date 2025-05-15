'use client';
import { useAllMaterilQuery } from '@/redux/endApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Material {
  _id: string;
  MaterialTitle: string;
  SessionId: string;
  TutorEmail: string;
  UploadImages: string;
  GoogledriveLink: string;
}

const Page = () => {
  const { data: materials, isLoading, isError } = useAllMaterilQuery(undefined);

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
          A list of your material item
        </h1>
        <div className="overflow-x-auto w-full">
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Material name</TableHead>
                <TableHead>Download image</TableHead>
                <TableHead>Drive link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials?.length > 0 ? (
                materials.map((material: Material, index: number) => (
                  <TableRow key={material._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{material.MaterialTitle}</TableCell>
                    <TableCell>
                      <Link
                        href={material.UploadImages}
                        download={`${material.MaterialTitle || 'material'}.jpg`}
                        className="inline-block"
                        target="_blank"
                      >
                        <Button className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded mt-2">
                          Image
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded mt-2 cursor-pointer"
                        onClick={() =>
                          window.open(material.GoogledriveLink, '_blank')
                        }
                      >
                        Drive link
                      </Button>
                    </TableCell>
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
