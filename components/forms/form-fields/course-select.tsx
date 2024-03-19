import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface CourseSelectProps<T extends FieldValues> {
  courses: Course[] | undefined;
  form: UseFormReturn<T>;
}

export const CourseSelect: React.FC<CourseSelectProps<any>> = ({
  courses,
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="course"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Course</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder {...field}></SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {courses?.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
