import { CommandDialog } from "cmdk";
import React, { useEffect } from "react";
import CommandBarDialog from "./CommandDialog";

export default function CommandBar() {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandBarDialog open={open} onOpenChange={(open) => setOpen(open)} />
  );
}
