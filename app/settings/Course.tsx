"use client";

import iconEdit from "@/public/icons/blackEdit.svg";
import iconTrash from "@/public/icons/trash.svg";

import { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../_hooks/useOnClickOutside";
import Image from "next/image";

import { Sketch } from "@uiw/react-color";
import Link from "next/link";
import { createOrUpdateCourse, deleteCourse } from "../../server/apis/courses";
import { twJoin } from "tailwind-merge";
import { useQueryClient } from "@tanstack/react-query";

interface CourseProps {
  id: string;
  name: string;
  color: string;
  editEnabled?: boolean;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
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

  //Course name change functions
  const [isEditing, setIsEditing] = useState(editEnabled);
  const [courseName, setCourseName] = useState(name);

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

  const editStyle = {
    color: "red",
  };

  return (
    <>
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
                <Link href="/settings?removecourse=y">
                  <button onMouseDown={handleTrashClick}>
                    <Image src={iconTrash} alt="delete" width={30} />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
