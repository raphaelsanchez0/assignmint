"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { deleteAssignment } from "@/server/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import EditAssignmentDialog from "../event-dialogs/assignments/EditAssignmentDialog";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useState } from "react";
import ViewAssignmentDialog from "../event-dialogs/assignments/ViewAssignmentDialog";

interface AssignmentProps {
  assignment: Assignment;
}
/**
 * Represents an assignment
 *
 * @param {string} title - The title of the assignment
 * @param {string} course - The course the assignment is for
 * @param {string} color  - The color of the course the assignment is for
 * @param {number} id - The id of the assignment
 * @param {string} due - The due date of the assignment. If not provided, no due date is rendered
 *
 */
const Assignment: React.FC<AssignmentProps> = ({ assignment }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [menuKey, setMenuKey] = useState(0);
  const path = usePathname();
  const queryClient = useQueryClient();

  const deleteAssignmentMutation = useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  function handleDeleteAssignment() {
    deleteAssignmentMutation.mutate(assignment.id as unknown as number);
  }

  function handleDialogOpenChange(open: boolean) {
    setOpenEditDialog(open);

    if (open == false) {
      setMenuKey((prev) => prev + 1);
    }
  }

  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />

      <ContextMenu key={menuKey}>
        <ContextMenuTrigger>
          <div className="flex flex-row w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
            <div
              className="w-1"
              style={{ backgroundColor: assignment.course.color }}
            ></div>
            <div className="p-2 flex justify-between w-full">
              <div>
                <h4 className="text-md font-medium text-off-black">
                  {assignment.title}
                </h4>
                <h5 className="text-sm text-gray-500">
                  {assignment.course.title}
                </h5>
              </div>
              <div>
                <h5 className="text-sm text-off-black text-nowrap">
                  {format(
                    utcToZonedTime(assignment.dueDate, "Etc/UTC"),
                    "MMM d",
                  )}
                </h5>
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent hidden={openEditDialog}>
          <ContextMenuItem>
            <button onClick={handleDeleteAssignment}>Complete</button>
          </ContextMenuItem>

          {/* Edit Button */}
          <Dialog open={openEditDialog} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </ContextMenuItem>
            </DialogTrigger>
            <EditAssignmentDialog
              assignment={assignment}
              setOpen={setOpenEditDialog}
              handleDialogOpenChangeFn={handleDialogOpenChange}
            />
          </Dialog>
          {/* View Button */}
          <Dialog>
            <DialogTrigger asChild>
              <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                View
              </ContextMenuItem>
            </DialogTrigger>
            <ViewAssignmentDialog
              assignment={assignment}
              setOpen={setOpenEditDialog}
              handleDialogOpenChangeFn={handleDialogOpenChange}
            />
          </Dialog>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};
export default Assignment;
