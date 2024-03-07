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

  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />

      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={`${path}?assignment=${assignment.id}`}>
            <div className="h-16 flex flex-row w-full hover:bg-gray-100 dark:hover:bg-zinc-800">
              <div
                className="w-1 h-full"
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
                  <h5 className="text-sm text-off-black">
                    {format(
                      utcToZonedTime(assignment.dueDate, "Etc/UTC"),
                      "MMM d",
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <button onClick={handleDeleteAssignment}>Complete</button>
          </ContextMenuItem>

          <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
            <DialogTrigger asChild>
              <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </ContextMenuItem>
            </DialogTrigger>
            <EditAssignmentDialog
              assignment={assignment}
              open={openEditDialog}
              setOpen={setOpenEditDialog}
            />
          </Dialog>
          <ContextMenuItem>View</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};
export default Assignment;
// id={assignment.id}
// title={assignment.title}
// course={assignment.course.title}
// due={format(utcToZonedTime(assignment.dueDate, "Etc/UTC"), "MMM d")}
// color={assignment.course.color}
