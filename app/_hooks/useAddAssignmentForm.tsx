import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getCourses, createAssignment } from "@/server/actions";
import { assignmentFormSchema } from "@/lib/schemas";
import { assignmentFormSchema as formSchema } from "@/lib/schemas";

export default function useAddAssignmentForm(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      title: "",
      dueDate: new Date(),
      priority: false,
      notes: "",
    },
  });

  const createAssignmentMutation = useMutation({
    mutationFn: createAssignment,
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
  } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  function onSubmit(input: z.infer<typeof formSchema>) {
    createAssignmentMutation.mutate(input);
  }

  return {
    form,
    courses,
    error,
    isLoading,
    onSubmit,
    createAssignmentMutation,
  };
}
