import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { z } from "zod";

const supabase = createSupabaseFrontendClient();
export async function getEventsOnDate(
  type: "assignments" | "exams",
  date: Date,
) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const formatedDate = targetDate.toISOString();

  const fieldName = type === "exams" ? "examDate" : "dueDate";
  const { data, error } = await supabase
    .from(type)
    .select(
      `
  *,
  course(*)`,
    )
    .eq(fieldName, formatedDate);

  if (error) {
    console.error(`Error getting ${type}"`, error);
    throw error;
  }

  return data || [];
}
