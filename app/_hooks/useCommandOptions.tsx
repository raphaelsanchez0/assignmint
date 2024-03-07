import React from "react";
import { SelectItem } from "@/components/ui/select";
import { CommandItem } from "@/components/ui/command";

interface CommandOption {
  id: string;
  value: string;
}

export default function useCommandOptions(
  courses: Course[],
  setValue: (value: string) => void,
  setOpen: (open: boolean) => void,
  currentValue: string,
) {
  const options: CommandOption[] = courses.map((course) => ({
    id: course.id,
    value: course.title,
  }));
  return options.map((option) => (
    <CommandItem
      key={option.id}
      value={option.value}
      onSelect={() => {
        setValue(option.value === currentValue ? "" : option.value);
        setOpen(false);
      }}
    >
      {option.value}
    </CommandItem>
  ));
}
