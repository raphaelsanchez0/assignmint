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
import EditAssignmentDialog from "@/components/dialogs/assignments/EditAssignmentDialog";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useContext, useEffect, useState } from "react";
import ViewAssignmentDialog from "@/components/dialogs/assignments/ViewAssignmentDialog";
import { IsInteractiveContext } from "./AssignmentCatagories";
import {
  completeAssignment,
  restoreAssignment,
} from "@/server/apis/assignments";

interface AssignmentProps {
  assignment: Assignment;
}

const Assignment: React.FC<AssignmentProps> = ({ assignment }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const queryClient = useQueryClient();

  const completeAssignmentMutation = useMutation({
    mutationFn: completeAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  const restoreAssignmentMutation = useMutation({
    mutationFn: restoreAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });

  function handleAssignmentQuickAction() {
    if (assignment.completed) {
      restoreAssignmentMutation.mutate(assignment.id);
    } else {
      completeAssignmentMutation.mutate(assignment.id);
    }
  }

  const isInteractive = useContext(IsInteractiveContext);

  return (
    <>
      <hr className="h-px w-full bg-gray-400 border-0" />

      <ContextMenu>
        <ContextMenuTrigger disabled={!isInteractive}>
          <Dialog
            open={openViewDialog}
            onOpenChange={(open) => {
              if (isInteractive) {
                setOpenViewDialog(open);
              }
            }}
          >
            <DialogTrigger asChild disabled={!isInteractive}>
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
                    <h5 className="text-sm text-gray-500 dark:text-gray-400">
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
            </DialogTrigger>
            <ViewAssignmentDialog
              assignmentID={assignment.id}
              closeDialog={() => setOpenViewDialog(false)}
            />
          </Dialog>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={handleAssignmentQuickAction}>
            {assignment.completed ? "Restore" : "Complete"}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};
export default Assignment;
