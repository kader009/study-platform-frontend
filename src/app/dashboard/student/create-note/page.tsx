'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store/store';
import { useCreateNoteMutation } from '@/redux/endApi';
import { setDescription, setEmail, setTitle } from '@/redux/features/noteSlice';
import { toast } from 'sonner';

const Page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { email, title, description } = useAppSelector(
    (state: RootState) => state.note
  );
  const [createNote] = useCreateNoteMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const userNote = await createNote({ email, title, description });
      console.log('user note data', userNote);
      toast.success('Create note successfully');

      dispatch(setTitle(''));
      dispatch(setDescription(''));
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };

  useEffect(() => {
    if (user?.email) {
      dispatch(setEmail(user.email));
    }
  }, [user?.email, dispatch]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="max-w-[800px] w-full mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-center text-2xl font-bold text-black mb-4">
            Create Your Note
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                disabled
                defaultValue={user?.email}
                value={email}
                className="border border-black"
              />
            </div>
            <div>
              <Label htmlFor="title" className="mb-2 font-semibold">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter a title"
                className="border border-black"
                value={title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
                required
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
                value={description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-full"
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
