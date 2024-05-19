"use client";
import { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../../_hooks/useOnClickOutside";
import Image from "next/image";

import { Sketch } from "@uiw/react-color";
import { Link, Trash, Pencil } from "lucide-react";
import {
  createOrUpdateCourse,
  deleteCourse,
  getCourse,
} from "../../../server/apis/courses";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditCourseDialog from "./EditCourseDialog";

interface CourseProps {
  courseID: string;
}

const Course: React.FC<CourseProps> = ({ courseID }) => {
  const { data: course } = useQuery<Course>({
    queryKey: ["course", courseID],
    queryFn: () => getCourse(courseID),
  });

  const [editCourseDialogOpen, setEditCourseDialogOpen] = useState(false);

  if (!course) return null;

  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />

      <div className="h-16 flex flex-row w-full">
        <div className="p-2 flex  items-center w-full">
          <div
            className="w-6 h-6 rounded-full flex-shrink-0"
            style={{ backgroundColor: course.color }}
          ></div>
          <div className="flex justify-between w-full align-middle">
            <h4 className="text-xl font-semibold ml-2">{course.title}</h4>

            <div>
              <Dialog
                open={editCourseDialogOpen}
                onOpenChange={setEditCourseDialogOpen}
              >
                <DialogTrigger asChild>
                  <button className="font-semibold">Edit</button>
                </DialogTrigger>
                <EditCourseDialog
                  course={course}
                  closeDialog={() => setEditCourseDialogOpen(false)}
                />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
