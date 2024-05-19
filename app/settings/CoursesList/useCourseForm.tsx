import useOnClickOutside from "@/app/_hooks/useOnClickOutside";
import { courseFormSchema } from "@/lib/schemas";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/server/apis/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseCourseFormOptions {
  initialValues: Partial<z.infer<typeof courseFormSchema>>;
  onSubmitCallback: () => void;
  courseID?: string;
}

export default function useCourseForm({
  initialValues,
  onSubmitCallback,
  courseID,
}: UseCourseFormOptions) {
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
      queryClient.invalidateQueries({ queryKey: ["course", courseID] });
      form.reset();
      onSubmitCallback();
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteCourse(id);
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

  function handleDeleteCourse() {
    if (courseID) {
      deleteCourseMutation.mutate(courseID);
    } else
      throw new Error("CourseID must be defined (Must be an edit operation)");
  }

  return {
    form,
    selectedColor,
    colorPickerOpen,
    setColorPickerOpen,
    colorPickerRef,
    inputRef,
    handleColorChange,
    handleInputChange,
    handleDeleteCourse,
    onSubmit,
  };
}
