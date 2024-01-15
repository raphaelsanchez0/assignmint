"use client";
import ComboBox from "@/components/forms/ComboBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createAssignment } from "@/server/actions";
import { getCourses } from "@/server/apis/courses";
import { useQuery } from "@tanstack/react-query";
import { useFormState } from "react-dom";

export default function AddAssignmentDialog() {
  const [assignment, formAction] = useFormState(createAssignment, null);

  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["course"],
    queryFn: getCourses,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Assignment</DialogTitle>
        <DialogDescription>Create a new assignment</DialogDescription>
      </DialogHeader>

      <form action={formAction}>
        <div className="grid gap-6 mb-6 grid-cols-2 ">
          <ComboBox courses={courses} placeholder="Select Course" />
        </div>
      </form>
    </DialogContent>
  );
}
