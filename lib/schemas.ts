import { z } from "zod";

export const assignmentFormSchema = z.object({
  course: z.string({ required_error: "Course is required" }).max(50),
  title: z.string({ required_error: "Title is required" }).min(2).max(50),
  dueDate: z.date(),
  priority: z.boolean(),
  notes: z.string().max(500).optional(),
});

export const examFormSchema = z.object({
  course: z.string({ required_error: "Course is required" }).max(50),
  title: z.string({ required_error: "Title is required" }).min(2).max(50),
  examDate: z.date(),
  notes: z.string().max(500).optional(),
});

export const canvasAPIFormSchema = z.object({
  canvasAPIKey: z.string().max(100),
});

export const assignmintCourseFormSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(2).max(50),
  color: z.string().max(20),
});
