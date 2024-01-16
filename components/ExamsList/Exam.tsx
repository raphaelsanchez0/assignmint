"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface ExamProps {
  name: string;
  course: string;
  date?: string;
  color: string;
  id: number | string;
}

const Exam: React.FC<ExamProps> = ({ name, course, date, color, id }) => {
  const path = usePathname();
  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />
      <Link href={`${path}?exam=${id}`}>
        <div className="h-16 flex flex-row w-full">
          <div className="w-1 h-full" style={{ backgroundColor: color }}></div>
          <div className="p-2 flex justify-between w-full hover:bg-gray-100">
            <div>
              <h4 className="text-md font-medium text-off-black">{name}</h4>
              <h5 className="text-sm text-gray-500">{course}</h5>
            </div>
            <div>
              <h5 className="text-sm text-gray text-off-black">{date}</h5>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Exam;
