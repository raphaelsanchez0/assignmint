"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { assignmentFormSchema as formSchema } from "@/lib/schemas";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssignment } from "@/server/apis/assignments";

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
import { updateAssignment } from "@/server/actions";

interface EditAssignmentDialogProps {
  assignment: Assignment;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditAssignmentDialog: React.FC<EditAssignmentDialogProps> = ({
  assignment,
  open,
  setOpen,
}) => {
  const queryClient = useQueryClient();
  const updateAssignmentMutation = useMutation({
    mutationFn: updateAssignment,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      setOpen(false);
      form.reset();
    },
  });
  const {
    data: courses,
    error: coursesError,
    isLoading: coursesIsLoading,
  } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: assignment?.course.id,
      title: assignment?.title,
      dueDate: new Date(assignment?.dueDate || Date.now()),
      priority: assignment?.priority,
      notes: assignment?.notes,
    },
  });

  function onSubmit(input: z.infer<typeof formSchema>) {
    updateAssignmentMutation.mutate({ input, id: assignment.id });
  }
  return (
    <DialogContent className="w-1/2">
      <DialogHeader>
        <DialogTitle>Edit Assignment</DialogTitle>
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
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel></FormLabel>
                  <div className="flex items-center justify-center space-x-2 h-full">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                        onCheckedChange={() => field.onChange(!field.value)}
                      />
                    </FormControl>
                    <div className="space-x-1 leading-none">
                      <FormLabel className="text-lg">Priority</FormLabel>
                    </div>
                  </div>
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
              Edit Assignment
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditAssignmentDialog;
