import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { z } from "zod";

const supabase = createSupabaseFrontendClient();
export async function getEventsOnDate(
  type: "assignments" | "exams",
  date: Date,
  includeCompletedEvents: boolean = false
) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const formattedDate = targetDate.toISOString();

  const fieldName = type === "exams" ? "examDate" : "dueDate";

  let query = supabase
    .from(type)
    .select(
      `
    *,
    course(*)`,
    )
    .eq(fieldName, formattedDate);

  if(type === "assignments")
  {
    query.eq("completed", includeCompletedEvents)
  }

  const { data, error } = await query

  if (error) {
    console.error(`Error getting ${type}"`, error);
    throw error;
  }

  return data || [];
}
