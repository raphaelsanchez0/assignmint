import useOnClickOutside from "@/app/_hooks/useOnClickOutside";
import { courseFormSchema } from "@/lib/schemas";
import { createCourse, updateCourse } from "@/server/apis/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useCourseForm(
  initialValues: Partial<z.infer<typeof courseFormSchema>>,
  onSubmitCallback: () => void,
  courseID?: string,
) {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const colorPickerRef = useRef(null);
  const inputRef = useRef(null);

  useOnClickOutside([colorPickerRef, inputRef], () => {
    setColorPickerOpen(false);
  });

  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: initialValues,
  });

  const [selectedColor, setSelectColor] = useState<string>(
    form.getValues("color"),
  );

  function handleColorChange({ hex }: { hex: string }) {
    setSelectColor(hex);
    form.setValue("color", hex);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSelectColor(value);
    form.setValue("color", value);
  }
  const queryClient = useQueryClient();
  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      form.reset();
      onSubmitCallback();
    },
  });

  interface CourseUpdateData {
    id: string;
    newValues: any;
  }

  const updateCourseMutation = useMutation({
    mutationFn: (courseUpdateData: CourseUpdateData) => {
      return updateCourse(courseUpdateData.id, courseUpdateData.newValues);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      form.reset();
      onSubmitCallback();
    },
  });

  function onSubmit(input: z.infer<typeof courseFormSchema>) {
    if (courseID) {
      updateCourseMutation.mutate({ id: courseID, newValues: input });
    } else {
      createCourseMutation.mutate(input);
    }
  }

  return {
    form,
    selectedColor,
    colorPickerOpen,
    colorPickerRef,
    inputRef,
    handleColorChange,
    handleInputChange,
    onSubmit,
  };
}
