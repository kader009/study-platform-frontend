'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormEvent, useState } from 'react';

const Page = () => {
  const [date, setDate] = useState<Date>();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log();
  };
  return (
    <div>
      <div className="flex justify-center items-center px-4 mt-4">
        <div className="max-w-[800px] w-full mx-auto p-6 bg-white rounded-lg shadow-md">
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
                disabled
                placeholder='Session title'
                className="border border-black"
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
            <div>
              <Label htmlFor="description" className="mb-2 font-semibold">
                Registration start
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 font-semibold">
              Registration end
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 font-semibold">
                Class start
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 font-semibold">
                Class end
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div>
              <Label htmlFor="session-duration" className="mb-2 font-semibold mt-2">
                Session duration
              </Label>
              <Input
                id="session-duration"
                type="session-duration"
                placeholder="session duration"
                className="border border-black"
              />
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
                className="border border-black"
              />
            </div>
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
