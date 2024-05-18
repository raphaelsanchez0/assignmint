import { assignmentFormSchema } from "@/lib/schemas";
import { getCourses, updateAssignment } from "@/server/actions";
import { getAssignment } from "@/server/apis/assignments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { utcToZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useEditAssignmentForm(
  assignmentID: string,
  onSuccessCallback?: () => void,
) {
  const queryClient = useQueryClient();

  const {
    data: assignment,
    error: assignmentError,
    isLoading: assignmentLoading,
  } = useQuery<Assignment>({
    queryKey: ["assignment", assignmentID],
    queryFn: () => getAssignment(assignmentID),
  });

  const form = useForm({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      course: assignment?.course.id ?? "",
      title: assignment?.title ?? "",
      dueDate: assignment?.dueDate
        ? utcToZonedTime(assignment.dueDate, "UTC")
        : new Date(),
      priority: assignment?.priority ?? false,
      notes: assignment?.notes,
    },
  });

  const updateAssignmentMutation = useMutation({
    mutationFn: updateAssignment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({
        queryKey: ["assignment", assignmentID],
      });
      form.reset();
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then((courseData) => {
      setCourses(courseData);
    });
  }, []);

  function onSubmit(input: z.infer<typeof assignmentFormSchema>) {
    updateAssignmentMutation.mutate({ input, id: assignmentID });
  }

  return {
    form,
    courses,
    onSubmit,
    updateAssignmentMutation,
  };
}
