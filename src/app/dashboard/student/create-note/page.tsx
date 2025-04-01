'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';

const page = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log();
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="max-w-[800px] w-full mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold text-black mb-4">
            Create Your Note
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                disabled
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

export default page;
