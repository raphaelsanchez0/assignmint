"use client";
import { deleteExam } from "@/server/apis/exams";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import EditExamDialog from "@/components/dialogs/exams/EditExamDialog";
import ViewExamDialog from "../dialogs/exams/ViewExamDialog";

interface ExamProps {
  exam: Exam;
}

const Exam: React.FC<ExamProps> = ({ exam }) => {
  const queryClient = useQueryClient();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [menuKey, setMenuKey] = useState(0);

  const deleteExamMutation = useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  function handleDeleteExam() {
    deleteExamMutation.mutate(exam.id as unknown as number);
  }

  function handleDialogOpenChange(open: boolean) {
    setOpenEditDialog(open);

    if (open == false) {
      setMenuKey((prev) => prev + 1);
    }
  }

  function swapDialog(to: "edit" | "view") {
    setOpenViewDialog(false);
    if (to === "edit") {
      setOpenEditDialog(true);
    } else {
      setOpenEditDialog(true);
    }
  }

  function handleViewDialogOpenChange(open: boolean, swapTo?: string) {
    setOpenViewDialog(open);
    if (swapTo === "edit") {
      setOpenEditDialog(true);
    }
    if (open == false) {
      setMenuKey((prev) => prev + 1);
    }
  }

  function handleDeleteExamFromDialog() {
    setOpenViewDialog(false);
    handleDeleteExam();
  }

  return (
    <>
      <hr className="h-px w-full bg-gray-400  border-0" />

      <ContextMenu key={menuKey}>
        <ContextMenuTrigger>
          <div className="h-16 flex flex-row w-full">
            <div
              className="w-1 h-full"
              style={{ backgroundColor: exam.course.color }}
            ></div>
            <div className="p-2 flex justify-between w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
              <div>
                <h4 className="text-md font-medium text-off-black">
                  {exam.title}
                </h4>
                <h5 className="text-sm text-gray-500 dark:text-gray-400">
                  {exam.course.title}
                </h5>
              </div>
              <div>
                <h5 className="text-sm text-gray text-off-black">
                  {format(utcToZonedTime(exam.examDate, "Etc/UTC"), "MMM d")}
                </h5>
              </div>
            </div>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent hidden={openEditDialog}>
          <ContextMenuItem onSelect={handleDeleteExam}>Delete</ContextMenuItem>
          {/*Edit Button*/}
          <Dialog open={openEditDialog} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </ContextMenuItem>
            </DialogTrigger>
            <EditExamDialog
              exam={exam}
              setOpen={setOpenEditDialog}
              handleDialogOpenChangeFn={handleDialogOpenChange}
            />
          </Dialog>
          {/* View Button */}
          <Dialog
            open={openViewDialog}
            onOpenChange={handleViewDialogOpenChange}
          >
            <DialogTrigger asChild>
              <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                View
              </ContextMenuItem>
            </DialogTrigger>
            <ViewExamDialog
              exam={exam}
              swapDialogFn={() => swapDialog("edit")}
              handleDeleteExam={handleDeleteExamFromDialog}
            />
          </Dialog>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};
export default Exam;
