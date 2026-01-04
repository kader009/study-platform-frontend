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
    <div className="min-h-screenflex items-center justify-center px-4 mt-10">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h1 className="text-center text-3xl font-extrabold text-black mb-8">
            Create Your Note
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block mb-2 font-medium text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                disabled
                value={email}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm placeholder-gray-400"
              />
            </div>

            <div>
              <Label htmlFor="title" className="block mb-2 font-medium text-sm">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter a title for your note"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm"
                value={title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
                required
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="block mb-2 font-medium text-sm"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Write your notes here"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm h-44 resize-none"
                value={description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                required
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full max-w-2xl mx-auto bg-black text-white py-4 rounded-full text-lg"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
