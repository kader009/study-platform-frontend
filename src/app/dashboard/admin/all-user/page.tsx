import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const page = () => {
  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">A list of all users</h2>
        <div className="overflow-x-auto w-full">
          <div className="flex w-full max-w-sm items-center space-x-2 ml-2 my-4">
            <Input type="text" placeholder="Search by name and email" />
            <Button type="submit">Search</Button>
          </div>
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>User name</TableHead>
                <TableHead>User email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="">$250.00</TableCell>
                <Button
                  type="submit"
                  className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                >
                  View Detail
                </Button>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default page;
