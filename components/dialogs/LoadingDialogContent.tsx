import React from "react";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LoadingListShorter from "../Loading/LoadingListShorter";

interface LoadingDialogContentProps {
  title: string;
}

export default function LoadingDialog({ title }: LoadingDialogContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <LoadingListShorter />
    </DialogContent>
  );
}
