"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface AssignmentProps {
  title: string;
  course: string;
  due?: string;
  color: string;
  id: number;
}
/**
 * Represents an assignment
 *
 * @param {string} title - The title of the assignment
 * @param {string} course - The course the assignment is for
 * @param {string} color  - The color of the course the assignment is for
 * @param {number} id - The id of the assignment
 * @param {string} due - The due date of the assignment. If not provided, no due date is rendered
 *
 */
const Assignment: React.FC<AssignmentProps> = ({
  title,
  course,
  due,
  color,
  id,
}) => {
  const path = usePathname();
  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />

      <Link href={`${path}?assignment=${id}`}>
        <div className="h-16 flex flex-row w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
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
