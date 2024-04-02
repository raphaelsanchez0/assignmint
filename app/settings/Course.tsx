"use client";

import iconEdit from "@/public/icons/blackEdit.svg";
import iconTrash from "@/public/icons/trash.svg";
``;
import { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../_hooks/useOnClickOutside";
import Image from "next/image";

import { Sketch } from "@uiw/react-color";
import { Link, Trash } from "lucide-react";
import { createOrUpdateCourse, deleteCourse } from "../../server/apis/courses";
import { twJoin } from "tailwind-merge";
import { useQueryClient } from "@tanstack/react-query";
import LinkCoursesDialog from "@/components/dialogs/courses/LinkCoursesDialog";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CourseProps {
  id: string;
  name: string;
  color: string;
  editEnabled?: boolean;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  openLinkDialogFn: (course: Course) => void;
}

const Course: React.FC<CourseProps> = ({
  id,
  name,
  color,
  editEnabled = false,
  setCourses,
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [colorPickerValue, setColorPickerValue] = useState(color);
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
    createOrUpdateCourse(id, courseName, colorPickerValue);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  });

  useOnClickOutside([courseRef], () => {
    setCollapsibleOpen(false);
  });

  //Course name change functions
  const [isEditing, setIsEditing] = useState(editEnabled);
  const [courseName, setCourseName] = useState(name);

  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(event.target.value);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  };

  const handleNameSubmit = () => {
    if (courseName.trim() !== "") {
      setIsEditing(false);
      createOrUpdateCourse(id, courseName, colorPickerValue);
    }
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  };

  const handleBlur = () => {
    if (courseName.trim() !== "") {
      setIsEditing(false);
    }
  };

  const handleTrashClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setCourses((courses) => courses.filter((course) => course.id !== id));
    await deleteCourse(id);
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
                color={color}
                onChange={handleColorChange}
                ref={colorPickerRef}
              />
            )}
          </div>
          <div className="flex justify-between w-full align-middle">
            {/* <h4 className="text-xl font-semibold ml-2">{name}</h4> */}
            {isEditing ? (
              <input
                type="text"
                value={courseName}
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
              <h4 className="text-xl font-semibold ml-2">{courseName}</h4>
            )}
            <div className="">
              {!isEditing ? (
                <button onClick={handleEditClick} className="font-semibold">
                  Edit
                </button>
              ) : (
                <div className="flex gap-2 ml-2">
                  <button onMouseDown={handleLinkClick}>
                    <Link size={24} />
                  </button>

                  <button onMouseDown={handleTrashClick}>
                    <Trash size={24} color="red" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CollapsibleContent className="px-2">Linked To:</CollapsibleContent>
    </Collapsible>
  );
};

export default Course;
