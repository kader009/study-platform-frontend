'use client';

import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetbookByemailQuery, useAllSessionQuery } from '@/redux/endApi';
import BookedSessionSkeleton from '@/components/skeleton/BookedSessionSkeleton';
import { RootState } from '@/redux/store/store';
import { useAppSelector } from '@/redux/hook';
import type { BookedSession, SessionInfo } from '@/types/bookedSession';

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);

  const {
    data: bookedSessions,
    isLoading,
    isError,
  } = useGetbookByemailQuery(user?.email, { pollingInterval: 1000 });

  const { data: allSessions } = useAllSessionQuery(undefined);

  // Map sessionId → sessionTitle for quick lookup
  const titleBySessionId = useMemo(() => {
    const map = new Map<string, string>();
    if (Array.isArray(allSessions)) {
      allSessions.forEach((session: SessionInfo) => {
        map.set(session._id, session.sessionTitle);
      });
    }
    return map;
  }, [allSessions]);

  if (isLoading) return <BookedSessionSkeleton />;
  if (isError) return <div>Something went wrong..</div>;

  return (
    <div>
      <div>
        <h1 className="text-center font-semibold my-6 text-xl">
          A list of your recent booked session
        </h1>
        <div className="overflow-x-auto w-full">
          <Table className=" min-w-150 w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">No</TableHead>
                <TableHead>Session Title</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Tutor Email</TableHead>
                <TableHead>Transaction (free/paid)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookedSessions?.length > 0 ? (
                bookedSessions.map((booking: BookedSession, index: number) => (
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium text-sm">{index + 1}</TableCell>
                    <TableCell className="text-sm">
                      {titleBySessionId.get(booking.sessionId) || 'Loading...'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {booking.sessionId}
                    </TableCell>
                    <TableCell className="text-sm">{booking.tutorEmail}</TableCell>
                    <TableCell className="text-sm">${booking.registrationFee}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No sessions found
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
