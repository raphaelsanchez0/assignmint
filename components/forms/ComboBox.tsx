"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useCommandOptions from "@/app/_hooks/useCommandOptions";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import React from "react";
import { ChevronsUpDown } from "lucide-react";

interface ComboboxProps {
  courses: Course[];
  placeholder: string;
}

const ComboBox: React.FC<ComboboxProps> = ({ placeholder, courses }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const commandOptions = useCommandOptions(courses, setValue, setOpen, value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between btn"
        >
          {value
            ? courses.find((courses) => courses.title === value)?.title
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select Course" />
          <CommandEmpty>No Course found</CommandEmpty>
          <CommandGroup>{commandOptions}</CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
