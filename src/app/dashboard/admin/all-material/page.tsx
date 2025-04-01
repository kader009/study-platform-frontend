import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div>
      <div>
        <h2 className="text-center font-semibold my-6">
          A list of your recent booked session
        </h2>
        <div className="overflow-x-auto w-full">
          <Table className=" min-w-[600px] w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Drive link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                  >
                    Image lin
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                  >
                    Drive link
                  </Button>
                </TableCell>
                <Button
                  type="submit"
                  className="w-24 bg-black hover:bg-gray-900 text-white py-2 rounded-md mt-2"
                >
                  Delete
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
