"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { examFormSchema as formSchema } from "@/lib/schemas";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCourses } from "@/server/apis/courses";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { updateExam } from "@/server/actions";
import { useEditExamForm } from "@/app/_hooks/forms/useEditExamForm";

interface EditExamDialogProps {
  exam: Exam;
  setOpen: (open: boolean) => void;
  handleDialogOpenChangeFn: (open: boolean) => void;
}

const EditExamDialog: React.FC<EditExamDialogProps> = ({
  exam,
  setOpen,
  handleDialogOpenChangeFn,
}) => {
  const { form, courses, onSubmit, updateExamMutation } = useEditExamForm(
    exam,
    () => {
      setOpen(false);
      handleDialogOpenChangeFn(false);
    },
  );

  return (
    <DialogContent className="w-1/2">
      <DialogHeader>
        <DialogTitle>Edit Exam</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 grid-rows-2 items-center gap-4">
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="CHEM Midterm" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="examDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <div>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Notes"
                        className="resize-none"
                        {...field}
                      ></Textarea>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn mt-4">
              Edit Exam
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
export default EditExamDialog;
