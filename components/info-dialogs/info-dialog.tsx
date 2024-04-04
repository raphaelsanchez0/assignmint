import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Info } from "lucide-react";
import Image from "next/image";

interface InfoDialogProps {
  title: string;
  info: React.ElementType;
}

const InfoDialog: React.FC<InfoDialogProps> = ({
  title,
  info: InfoComponent,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="pl-2">
          <Info size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <InfoComponent />
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
