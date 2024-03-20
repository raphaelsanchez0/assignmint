import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { examFormSchema } from "@/lib/schemas";
import { getCourses, updateExam } from "@/server/actions";

export function useEditExamForm(exam: Exam, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      course: exam.course.id,
      title: exam.title,
      examDate: new Date(exam.examDate),
      notes: exam.notes,
    },
  });

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then((courseData) => {
      setCourses(courseData);
    });
  }, []);

  const updateExamMutation = useMutation({
    mutationFn: updateExam,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      form.reset();
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  function onSubmit(input: z.infer<typeof examFormSchema>) {
    updateExamMutation.mutate({ input, id: exam.id });
  }

  return { form, courses, onSubmit, updateExamMutation };
}
