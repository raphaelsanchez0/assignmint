"use client";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface ExamProps {
  exam: Exam;
}

const Exam: React.FC<ExamProps> = ({ exam }) => {
  const path = usePathname();
  return (
    <>
      <hr className="h-px w-full bg-gray-400  border-0" />
      <Link href={`${path}?exam=${exam.id}`}>
        <div className="h-16 flex flex-row w-full">
          <div
            className="w-1 h-full"
            style={{ backgroundColor: exam.course.color }}
          ></div>
          <div className="p-2 flex justify-between w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
            <div>
              <h4 className="text-md font-medium text-off-black">
                {exam.title}
              </h4>
              <h5 className="text-sm text-gray-500">{exam.course.title}</h5>
            </div>
            <div>
              <h5 className="text-sm text-gray text-off-black">
                {format(utcToZonedTime(exam.examDate, "Etc/UTC"), "MMM d")}
              </h5>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default Exam;
