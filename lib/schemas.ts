import { z } from "zod";

export const addAssignmentFormSchema = z.object({
  course: z.string({ required_error: "Course is required" }).max(50),
  title: z.string({ required_error: "Title is required" }).min(2).max(50),
  dueDate: z.date(),
  priority: z.boolean(),
  notes: z.string().max(500).optional(),
});

export const addExamFormSchema = z.object({
  course: z.string({ required_error: "Course is required" }).max(50),
  title: z.string({ required_error: "Title is required" }).min(2).max(50),
  examDate: z.date(),
  notes: z.string().max(500).optional(),
});
