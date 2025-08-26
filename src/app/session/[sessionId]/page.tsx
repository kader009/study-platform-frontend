'use client';
import DynamicTitle from '@/components/DynamicTitle';
import { useBookPostMutation } from '@/redux/endApi';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface SessionData {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  tutorName: string;
  tutorEmail: string;
  averageRating?: number;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartDate: string;
  classEndDate: string;
  sessionDuration: number;
  registrationFee: string;
  reviews: string[];
}

const SessionDetails = () => {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const [data, setData] = useState<SessionData | null>(null);
  const [booksession, { isLoading }] = useBookPostMutation();
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(
          `https://study-platform-backend-drxm.onrender.com/api/v1/session/${sessionId}`
        );
        if (!res.ok) throw new Error('Failed to fetch session');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching session:', err);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleBook = async () => {
    try {
      const payload = {
        sessionId: data?._id,
        studentEmail: user?.email,
        tutorEmail: data?.tutorEmail,
        registrationFee: data?.registrationFee,
      };
      const postData = await booksession(payload);
      console.log(postData);
      toast.success('booked session successfully');
    } catch (error) {
      console.log('data posting error', error);
      toast.error('something went wrong');
    }
  };

  return (
    <div>
      <DynamicTitle />
      <div className="my-8 mx-5">
        <div className="max-w-lg w-full mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <h1 className="text-2xl font-bold">{data?.sessionTitle}</h1>
          <p className="text-md font-semibold text-gray-700">
            <span className="font-bold">Tutor:</span> {data?.tutorName}
          </p>
          <div className="flex items-center gap-2 text-gray-700">
            Rating:
            {data?.averageRating ? (
              <span className="font-medium text-yellow-500">
                {data?.averageRating}★
              </span>
            ) : (
              <span className="text-yellow-500">⭐ No ratings yet</span>
            )}
          </div>
          <p className="text-gray-600">{data?.sessionDescription}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <span className="font-bold">Registration Start:</span>{' '}
              {data?.registrationStartDate}
            </p>
            <p>
              <span className="font-bold">Registration End:</span>{' '}
              {data?.registrationEndDate}
            </p>
            <p>
              <span className="font-bold">Class Start:</span>{' '}
              {data?.classStartDate
                ? new Date(data.classStartDate).toLocaleDateString()
                : 'N/A'}
            </p>
            <p>
              <span className="font-bold">Class End:</span>{' '}
              {data?.classEndDate
                ? new Date(data.classEndDate).toLocaleDateString()
                : 'N/A'}
            </p>
            <p>
              <span className="font-bold">Duration:</span>{' '}
              {data?.sessionDuration} hours
            </p>
            <p>
              <span className="font-bold">Fee:</span> ${data?.registrationFee}
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-800">Reviews:</p>
            {(data?.reviews ?? []).length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {data?.reviews.map((review: string, index: number) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          <button
            onClick={handleBook}
            disabled={
              isLoading ||
              !user ||
              user?.role === 'admin' ||
              user?.role === 'tutor'
            }
            className={`cursor-pointer w-36 font-semibold py-2 rounded 
        ${
          isLoading || !user || user?.role === 'admin' || user?.role === 'tutor'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black hover:bg-gray-600 text-white'
        }`}
          >
            {isLoading ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
