import { createExam, getCourses } from "@/server/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { examFormSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

export default function useAddExamForm(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  const createExamMutation = useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      form.reset();
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      course: "",
      title: "",
      examDate: new Date(),
      notes: "",
    },
  });

  function onSubmit(input: z.infer<typeof examFormSchema>) {
    createExamMutation.mutate(input);
  }

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then((courseData) => {
      setCourses(courseData);
    });
  }, []);

  return {
    form,
    courses,
    onSubmit,
    createExamMutation,
  };
}
