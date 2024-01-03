"use client";

import iconEdit from "../_assets/icons/edit.svg";
import iconTrash from "../_assets/icons/trash.svg";

import { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../_hooks/useOnClickOutside";
import Image from "next/image";

import { Sketch } from "@uiw/react-color";
import Link from "next/link";

interface CourseProps {
    name: string;
    color: string;
    editEnabled?: boolean;
}

const Course: React.FC<CourseProps> = ({
    name,
    color,
    editEnabled = false,
}) => {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [colorPickerValue, setColorPickerValue] = useState(color);
    const colorPickerRef = useRef(null);
    const trashPickerRef = useRef(null);

    //Color Picker Functions
    const handleColorClick = () => {
        setIsColorPickerOpen(true);
    };

    const handleColorChange = (color: any) => {
        console.log(color.hex);
        setColorPickerValue(color.hex);
    };

    useOnClickOutside([colorPickerRef], () => setIsColorPickerOpen(false));

    //Course name change functions

    const [isEditing, setIsEditing] = useState(editEnabled);
    const [courseName, setCourseName] = useState(name);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseName(event.target.value);
    };

    const handleNameSubmit = () => {
        if (courseName.trim() !== "") {
            setIsEditing(false);
            // Save the new course name...
        }
    };

    const handleDeleteClick = () => {};

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
                    <div className="flex justify-between w-full">
                        {/* <h4 className="text-xl font-semibold ml-2">{name}</h4> */}
                        {isEditing ? (
                            <input
                                type="text"
                                value={courseName}
                                onChange={handleNameChange}
                                onBlur={handleNameSubmit}
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
                            <h4 className="text-xl font-semibold ml-2">
                                {courseName}
                            </h4>
                        )}
                        {!isEditing ? (
                            <button onClick={handleEditClick}>
                                <Image src={iconEdit} alt="edit" width={20} />
                            </button>
                        ) : (
                            <Link href="/settings?removecourse=y">
                                <button ref={trashPickerRef}>
                                    <Image
                                        src={iconTrash}
                                        alt="delete"
                                        width={30}
                                    />
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Course;
