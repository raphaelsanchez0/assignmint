"use client";
import { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../_hooks/useOnClickOutside";
import Image from "next/image";

import { Sketch } from "@uiw/react-color";
import { Link, Trash } from "lucide-react";
import { createOrUpdateCourse, deleteCourse } from "../../server/apis/courses";
import { useQueryClient } from "@tanstack/react-query";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

interface CourseProps {
  course: Course;
  editEnabled?: boolean;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  openLinkDialogFn: (course: Course) => void;
}

const Course: React.FC<CourseProps> = ({
  course,
  editEnabled = false,
  setCourses,
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [colorPickerValue, setColorPickerValue] = useState(course.color);
  const colorPickerRef = useRef(null);
  const courseRef = useRef(null);

  const queryClient = useQueryClient();

  //Color Picker Functions
  const handleColorClick = () => {
    setIsColorPickerOpen(true);
  };

  const handleColorChange = (color: any) => {
    setColorPickerValue(color.hex);
  };

  useOnClickOutside([colorPickerRef], () => {
    setIsColorPickerOpen(false);
    createOrUpdateCourse(course.id, course.title, colorPickerValue);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  });

  useOnClickOutside([courseRef], () => {
    setCollapsibleOpen(false);
    createOrUpdateCourse(course.id, course.title, colorPickerValue);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  });

  //Course name change functions
  const [isEditing, setIsEditing] = useState(editEnabled);
  const [courseTitle, setCourseTitle] = useState(course.title);

  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseTitle(event.target.value);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  };

  const handleNameSubmit = () => {
    if (courseTitle.trim() !== "") {
      setIsEditing(false);
      createOrUpdateCourse(course.id, courseTitle, colorPickerValue);
    }
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  };

  const handleBlur = () => {
    if (courseTitle.trim() !== "") {
      setIsEditing(false);
    }
  };

  const handleTrashClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setCourses((courses) =>
      courses.filter((currentCourse) => currentCourse.id !== course.id),
    );
    await deleteCourse(course.id);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  };

  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setCollapsibleOpen(!collapsibleOpen);
  };

  return (
    <Collapsible
      open={collapsibleOpen}
      onOpenChange={setCollapsibleOpen}
      ref={courseRef}
    >
      <hr className="h-px w-full bg-gray-400 border-0" />

      <div className="h-16 flex flex-row w-full">
        <div className="p-2 flex  items-center w-full">
          <div
            className="w-6 h-6 rounded-full flex-shrink-0"
            style={{ backgroundColor: colorPickerValue }}
            onClick={handleColorClick}
          >
            {isColorPickerOpen && (
              <Sketch
                style={{ marginLeft: 20 }}
                color={course.color}
                onChange={handleColorChange}
                ref={colorPickerRef}
              />
            )}
          </div>
          <div className="flex justify-between w-full align-middle">
            {isEditing ? (
              <input
                type="text"
                value={courseTitle}
                onChange={handleNameChange}
                onBlur={handleBlur}
                autoFocus
                placeholder="Course Name"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault(); // Prevent form submission
                    handleNameSubmit(); // Call the function that disab les editing
                  }
                }}
                className="text-xl font-semibold ml-2 w-full"
              />
            ) : (
              <h4 className="text-xl font-semibold ml-2">{courseTitle}</h4>
            )}
            <div className="">
              {!isEditing ? (
                <button onClick={handleEditClick} className="font-semibold">
                  Edit
                </button>
              ) : (
                <div className="flex gap-2 ml-2">
                  <button onMouseDown={handleTrashClick}>
                    <Trash size={30} color="red" />
                  </button>
                  <button onMouseDown={handleLinkClick}>
                    <Link size={30} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CollapsibleContent className="px-2 text-center font-bold">
        {course.canvasCourseID && course.canvasCourseName ? (
          <p>
            Canvas Course ID: {course.canvasCourseID}
            {course.canvasCourseName}
          </p>
        ) : (
          <p>Not linked to any Canvas course</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Course;
