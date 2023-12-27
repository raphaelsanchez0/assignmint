"use client";

import iconEdit from "../_assets/icons/edit.svg";

import { useState, useRef, useEffect } from "react";
import useOnClickOutside from "../_hooks/useOnClickOutside";
import Image from "next/image";

import {
  Slider,
  Sketch,
  Material,
  Colorful,
  Compact,
  Circle,
  Wheel,
  Block,
  Github,
  Chrome,
} from "@uiw/react-color";
import {
  Alpha,
  Hue,
  ShadeSlider,
  Saturation,
  Interactive,
  hsvaToHslaString,
} from "@uiw/react-color";
import {
  EditableInput,
  EditableInputRGBA,
  EditableInputHSLA,
} from "@uiw/react-color";

interface CourseProps {
  name: string;
  color: string;
}

const Course: React.FC<CourseProps> = ({ name, color }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [colorPickerValue, setColorPickerValue] = useState(color);
  const colorPickerRef = useRef(null);

  const handleColorClick = () => {
    setIsColorPickerOpen(true);
  };

  const handleColorChange = (color: any) => {
    console.log(color);
    setColorPickerValue(color.hex);
  };

  useOnClickOutside(colorPickerRef, () => setIsColorPickerOpen(false));

  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />
      <div className="h-16 flex flex-row w-full">
        <div className="p-2 flex  items-center w-full">
          <div
            className="w-6 h-6 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
            onClick={handleColorClick}
          >
            {isColorPickerOpen && (
              <Sketch
                style={{ marginLeft: 20 }}
                color={colorPickerValue}
                onChange={handleColorChange}
                ref={colorPickerRef}
              />
            )}
          </div>
          <div className="flex justify-between w-full">
            <h4 className="text-xl font-semibold ml-2">{name}</h4>
            <Image src={iconEdit} alt="edit" width={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
