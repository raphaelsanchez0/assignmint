import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface AssignmentProps {
  title: string;
  course: string;
  due?: string;
  color: string;
  id: number;
}

const Assignment: React.FC<AssignmentProps> = ({
  title,
  course,
  due,
  color,
  id,
}) => {
  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />
      <Dialog>
        <DialogTrigger asChild>
          {/* <Link href={`/dashboard?assignment=${id}`}> */}
          <div className="h-16 flex flex-row w-full hover:bg-gray-100">
            <div
              className="w-1 h-full"
              style={{ backgroundColor: color }}
            ></div>
            <div className="p-2 flex justify-between w-full">
              <div>
                <h4 className="text-md font-medium text-off-black">{title}</h4>
                <h5 className="text-sm text-gray-500">{course}</h5>
              </div>
              <div>
                <h5 className="text-sm text-off-black">{due}</h5>
              </div>
            </div>
          </div>
          {/* </Link> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Username
              </label>
              <input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <button type="submit">Save changes</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Assignment;
