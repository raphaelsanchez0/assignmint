import { Plus } from "lucide-react";
import React from "react";

interface AccentAddButtonProps {
  onClick?: () => void;
}

export default function AccentAddButton({ onClick }: AccentAddButtonProps) {
  return (
    <button className="btn-icon" onClick={onClick} aria-label="Add">
      <Plus color="white" />
    </button>
  );
}
