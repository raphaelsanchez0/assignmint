import Link from "next/link";

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
      <Link href={`/dashboard?assignment=${id}`}>
        <div className="h-16 flex flex-row w-full hover:bg-gray-100">
          <div className="w-1 h-full" style={{ backgroundColor: color }}></div>
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
      </Link>
    </>
  );
};
export default Assignment;
