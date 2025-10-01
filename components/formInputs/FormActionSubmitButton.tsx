import { Loader2Icon } from "lucide-react";
import React from "react";

interface FormActionSubmitButtonProps {
  buttonText: string;
  isPending: boolean;
  onClick?: () => void;
}

export default function FormActionSubmitButton({
  buttonText,
  isPending,
  onClick,
}: FormActionSubmitButtonProps) {
  return (
    <>
      {isPending ? (
        <button className="btn mt-4" disabled>
          <Loader2Icon className="animate-spin " color="black" />
        </button>
      ) : (
        <button type="submit" className="btn mt-4" onClick={onClick}>
          {buttonText}
        </button>
      )}
    </>
  );
}
