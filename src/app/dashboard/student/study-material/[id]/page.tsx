'use client';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useAllMaterilQuery, useGetbookByemailQuery } from '@/redux/endApi';
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
import StudyMaterialSkeleton from '@/components/skeleton/StudyMaterialSkeleton';
import { Material } from '@/types/studyMaterial';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import type { BookedSession } from '@/types/bookedSession';

const Page = () => {
  const { id } = useParams(); // booking _id from the URL
  const { email } = useAppSelector((state: RootState) => state.user.user) || {};

  const { data: bookedSessions, isLoading: bookingsLoading } =
    useGetbookByemailQuery(email, { skip: !email });

  const { data: allMaterials, isLoading: materialsLoading, isError } =
    useAllMaterilQuery(email, { skip: !email });

  // Get sessionId of the booking the user clicked on,
  // then flatMap all materials to keep only the ones that match that sessionId
  const filteredMaterials = useMemo(() => {
    if (!Array.isArray(bookedSessions) || !Array.isArray(allMaterials)) return [];
    return bookedSessions
      .filter((book: BookedSession) => book._id === id)
      .flatMap((book: BookedSession) =>
        allMaterials.filter((material: Material) => material.SessionId === book.sessionId)
      );
  }, [bookedSessions, allMaterials, id]);

  if (bookingsLoading || materialsLoading) return <StudyMaterialSkeleton />;

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
          <Table className=" min-w-150 w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">No</TableHead>
                <TableHead>Material name</TableHead>
                <TableHead>Download image</TableHead>
                <TableHead>Drive link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material: Material, index: number) => (
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
                        <Button className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-full mt-2 cursor-pointer">
                          Image
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-full mt-2 cursor-pointer"
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
                    No material found for this session
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
