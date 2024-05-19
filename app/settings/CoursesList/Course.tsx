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

  // const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  // const [colorPickerValue, setColorPickerValue] = useState(course.color);
  const colorPickerRef = useRef(null);
  const courseRef = useRef(null);

  const queryClient = useQueryClient();

  // //Color Picker Functions
  // const handleColorClick = () => {
  //   setIsColorPickerOpen(true);
  // };

  // const handleColorChange = (color: any) => {
  //   setColorPickerValue(color.hex);
  // };

  // useOnClickOutside([colorPickerRef], () => {
  //   setIsColorPickerOpen(false);
  //   createOrUpdateCourse(course.id, course.title, colorPickerValue);
  //   queryClient.invalidateQueries({ queryKey: ["courses"] });
  // });

  // useOnClickOutside([courseRef], () => {
  //   setCollapsibleOpen(false);
  //   createOrUpdateCourse(course.id, course.title, colorPickerValue);
  //   queryClient.invalidateQueries({ queryKey: ["courses"] });
  // });

  // //Course name change functions
  // const [isEditing, setIsEditing] = useState(editEnabled);
  // const [courseTitle, setCourseTitle] = useState(course.title);

  // const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCourseTitle(event.target.value);
  //   queryClient.invalidateQueries({ queryKey: ["courses"] });
  // };

  // const handleNameSubmit = () => {
  //   if (courseTitle.trim() !== "") {
  //     setIsEditing(false);
  //     createOrUpdateCourse(course.id, courseTitle, colorPickerValue);
  //   }
  //   queryClient.invalidateQueries({ queryKey: ["courses"] });
  // };

  // const handleBlur = () => {
  //   if (courseTitle.trim() !== "") {
  //     setIsEditing(false);
  //   }
  // };

  // const handleTrashClick = async (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   setCourses((courses) =>
  //     courses.filter((currentCourse) => currentCourse.id !== course.id),
  //   );
  //   await deleteCourse(course.id);
  //   queryClient.invalidateQueries({ queryKey: ["courses"] });
  // };
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
