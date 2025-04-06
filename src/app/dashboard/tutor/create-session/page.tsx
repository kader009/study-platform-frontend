'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormEvent} from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { usePostSessionMutation } from '@/redux/endApi';
import {
  SetclassEndDate,
  SetclassStartDate,
  SetregistrationEndDate,
  SetregistrationStartDate,
  SetsessionDescription,
  SetsessionDuration,
  SetSessionTitle,
} from '@/redux/features/createSessionSlice';

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [postSession] = usePostSessionMutation();
  const {
    sessionTitle,
    classEndDate,
    classStartDate,
    registrationEndDate,
    registrationFee,
    registrationStartDate,
    sessionDescription,
    sessionDuration,
    status,
    tutorName,
  } = useAppSelector((state) => state.createSession);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const sessionData = await postSession({
        sessionTitle,
        classEndDate,
        classStartDate,
        registrationEndDate,
        registrationFee,
        registrationStartDate,
        sessionDescription,
        sessionDuration,
        status,
        tutorName,
      });

      console.log('post session', sessionData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center px-4 mt-4">
        <div className="max-w-[800px] w-full mx-auto p-6 bg-white rounded-lg shadow-md mb-6">
          <h2 className="text-center text-2xl font-bold text-black mb-2">
            Create study session
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="session-title" className="mb-2 font-semibold">
                Session title
              </Label>
              <Input
                id="session-title"
                type="session-title"
                placeholder="Session title"
                className="border border-black"
                value={sessionTitle}
                onChange={(e) => dispatch(SetSessionTitle(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="tutor-name" className="mb-2 font-semibold">
                Tutor Name
              </Label>
              <Input
                id="tutor-name"
                type="tutor-name"
                placeholder="Enter a title"
                disabled
                defaultValue={user?.name}
                className="border border-black"
              />
            </div>
            <div>
              <Label htmlFor="tutor-email" className="mb-2 font-semibold">
                Tutor Email
              </Label>
              <Input
                id="tutor-email"
                type="tutor-email"
                disabled
                defaultValue={user?.email}
                placeholder="Enter a title"
                className="border border-black"
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Write your notes here"
                className="border border-black"
                value={sessionDescription}
                onChange={(e) =>
                  dispatch(SetsessionDescription(e.target.value))
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* Registration start */}
              <div>
                <label className="block font-semibold mb-1">
                  Registration start
                </label>
                <input
                  type="date"
                  value={registrationStartDate}
                  onChange={(e) => SetregistrationStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              {/* Registration end */}
              <div>
                <label className="block font-semibold mb-1">
                  Registration end
                </label>
                <input
                  type="date"
                  value={registrationEndDate}
                  onChange={(e) => SetregistrationEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              {/* Class start */}
              <div>
                <label className="block font-semibold mb-1">Class start</label>
                <input
                  type="date"
                  value={classStartDate}
                  onChange={(e) => SetclassStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>

              {/* Class end */}
              <div>
                <label className="block font-semibold mb-1">Class end</label>
                <input
                  type="date"
                  value={classEndDate}
                  onChange={(e) => SetclassEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="registration" className="mb-2 font-semibold mt-2">
                Registration fee
              </Label>
              <Input
                id="registration"
                type="registration"
                placeholder="Registratio fee"
                disabled
                defaultValue="0"
                className="border border-black"
              />
            </div>
            <div>
              <Label htmlFor="status" className="mb-2 font-semibold mt-2">
                Status
              </Label>
              <Input
                id="status"
                type="status"
                disabled
                placeholder="status here.."
                defaultValue="pending"
                className="border border-black"
              />
            </div>

            <Button
              type="submit"
              className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-lg"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
