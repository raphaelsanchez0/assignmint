import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { examFormSchema } from "@/lib/schemas";
import { getCourses, updateExam } from "@/server/actions";
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

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses().then((courseData) => {
      setCourses(courseData);
    });
  }, []);

  const updateExamMutation = useMutation({
    mutationFn: updateExam,

    onSuccess: () => {
      ``;
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      form.reset();
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  function onSubmit(input: z.infer<typeof examFormSchema>) {
    updateExamMutation.mutate({ input, id: examID });
  }

  return { form, courses, onSubmit, updateExamMutation };
}
