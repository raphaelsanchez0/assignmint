"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import React from "react";
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

export default function AddAssignmentDialog() {
  const formSchema = z.object({
    course: z.string({ required_error: "Course is required" }),
    title: z.string({ required_error: "Title is required" }).min(2).max(50),
    dueDate: z.date({ required_error: "Due date is required" }),
    priority: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      title: "",
      dueDate: new Date(),
      priority: false,
    },
  });

  function onSubmit(input: z.infer<typeof formSchema>) {
    console.log(input);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn">Add</button>
      </DialogTrigger>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder>
                            "Select a course"
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Math</SelectItem>
                        <SelectItem value="2">Science</SelectItem>
                        <SelectItem value="3">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
