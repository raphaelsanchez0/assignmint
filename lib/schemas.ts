import { z } from "zod";

export const addAssignmentFormSchema = z.object({
  course: z.string({ required_error: "Course is required" }),
  title: z.string({ required_error: "Title is required" }).min(2).max(50),
  dueDate: z.date(),
  priority: z.boolean(),
  notes: z.string().max(500).optional(),
});
