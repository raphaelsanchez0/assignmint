import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { examFormSchema } from "@/lib/schemas";
import { updateExam } from "@/server/actions";
import { getCourses } from "@/server/apis/courses";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { getExam } from "@/server/apis/exams";

export function useEditExamForm(
  examID: string,
  onSuccessCallback?: () => void,
) {
  const queryClient = useQueryClient();

  const {
    data: exam,
    error: examError,
    isLoading: examLoading,
  } = useQuery<Exam>({
    queryKey: ["exam", examID],
    queryFn: () => getExam(examID),
  });

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      course: exam?.course.id,
      title: exam?.title,
      examDate: exam?.examDate
        ? utcToZonedTime(exam.examDate, "UTC")
        : new Date(),
      notes: exam?.notes,
    },
  });

  const { data: courses } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const updateExamMutation = useMutation({
    mutationFn: updateExam,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({
        queryKey: ["exam", examID],
      });
      form.reset();
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  function onSubmit(input: z.infer<typeof examFormSchema>) {
    updateExamMutation.mutate({ input, id: examID });
  }

  return { form, courses, onSubmit, updateExamMutation };
}
