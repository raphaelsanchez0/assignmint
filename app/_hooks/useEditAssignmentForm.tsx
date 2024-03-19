import { assignmentFormSchema } from "@/lib/schemas";
import { getCourses, updateAssignment } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useEditAssignmentForm(
  assignment: Assignment,
  onSuccessCallback?: () => void,
) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(assignmentFormSchema),
    defaultValues: {
      course: assignment.course.id,
      title: assignment.title,
      dueDate: new Date(assignment.dueDate),
      priority: assignment.priority,
      notes: assignment.notes,
    },
  });

  const updateAssignmentMutation = useMutation({
    mutationFn: updateAssignment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      form.reset();
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  const {
    data: courses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  function onSubmit(input: z.infer<typeof assignmentFormSchema>) {
    updateAssignmentMutation.mutate({ input, id: assignment.id });
  }

  return {
    form,
    courses,
    error,
    isLoading,
    onSubmit,
    updateAssignmentMutation,
  };
}
