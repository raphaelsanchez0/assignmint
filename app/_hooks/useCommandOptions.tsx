import React from "react";
import { SelectItem } from "@/components/ui/select";
import { CommandItem } from "@/components/ui/command";

interface CommandOption {
  id: string;
  value: string;
}

export default function useCommandOptions(
  options: CommandOption[],
  setValue: (value: string) => void,
  currentValue: string,
) {
  return options.map((option) => (
    <CommandItem
      key={option.id}
      value={option.value}
      onSelect={() => {
        setValue(option.value === currentValue ? "" : option.value);
      }}
    >
      {option.value}
    </CommandItem>
  ));
}
