import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";

const supabase = createSupabaseFrontendClient();

export async function getAssignmentsDueOnDate(date: string) {
  const { data, error } = await supabase
    .from("assignments")
    .select(
      `*,
      course(*)
      `,
    )
    .eq("dueDate", date);

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
}

//Catagories

export async function getOverdueAssignments() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const currentDateIso = currentDate.toISOString();
  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
          *,
          course(*)
          `,
    )
    .lt("dueDate", currentDateIso) // Use ISO formatted date
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
}

export async function getPriorityAssignments() {
  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
      *,
      course(*)
      `,
    )
    .eq("priority", true)
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
}

export async function getDueTodayAssignments() {
  return fetchAssignments({});
}

export async function getDueTomorrowAssignments() {
  return fetchAssignments({ offsetDays: 1 });
}

export async function getThisWeekAssignments() {
  const afterTomorrow = new Date();
  afterTomorrow.setDate(afterTomorrow.getDate() + 2);
  afterTomorrow.setHours(0, 0, 0, 0);
  const currentDateIso = afterTomorrow.toISOString();
  const nextWeek = new Date();

  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(0, 0, 0, 0);
  const nextWeekIso = nextWeek.toISOString();
  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
          *,
          course(*)
          `,
    )
    .gte("dueDate", currentDateIso) // Use ISO formatted date
    .lte("dueDate", nextWeekIso)
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
}

export async function getNextWeekAssignments() {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(0, 0, 0, 0);
  const currentDateIso = nextWeek.toISOString();
  const nextNextWeek = new Date();

  nextNextWeek.setDate(nextNextWeek.getDate() + 14);
  nextNextWeek.setHours(0, 0, 0, 0);
  const nextNextWeekIso = nextNextWeek.toISOString();
  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
          *,
          course(*)
          `,
    )
    .gte("dueDate", currentDateIso) // Use ISO formatted date
    .lte("dueDate", nextNextWeekIso)
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
}
/** */
interface FetchAssignmentsParams {
  comparison?: "eq" | "lt" | "lte" | "gt" | "gte";
  baseDate?: Date;
  priority?: boolean | null;
  offsetDays?: number;
  daysRange?: number | null;
}

/**
 * Fetches a list of assignments based on the provided parameters.
 *
 * @param comparison - The comparison operator to use when querying the database. Defaults to "eq".
 * @param baseDate - The date to base our calculations on. Defaults to the current date.
 * @param priority - Whether to filter by priority. Defaults to null.
 * @param daysOffset - The number of days to offset the base date by. Defaults to 0.
 * @param daysRange - The range of days from the offset date. If specified, fetches assignments due within this range.
 *
 * @returns
 */
export async function fetchAssignments({
  comparison = "eq",
  baseDate = new Date(),
  priority = false,
  offsetDays = 0,
  daysRange = null,
}: FetchAssignmentsParams): Promise<Assignment[]> {
  baseDate.setDate(baseDate.getDate() + offsetDays);
  baseDate.setHours(0, 0, 0, 0);

  let query = supabase
    .from("assignments")
    .select(
      `
      *,
      course(*)
    `,
    )
    .order("dueDate", { ascending: true });

  // If daysRange is specified, adjust the query to fetch assignments within a range
  if (daysRange !== null) {
    const endDate = new Date(baseDate);
    endDate.setDate(endDate.getDate() + daysRange);
    query = query
      .gte("dueDate", baseDate.toISOString())
      .lte("dueDate", endDate.toISOString());
  } else {
    // Apply comparison based on the provided parameters
    query = query[comparison]("dueDate", baseDate.toISOString());
  }

  if (priority) {
    query = query.eq("priority", priority);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error getting assignments:", error);
    throw error;
  }

  return data;
}

export async function getAssignment(id: number): Promise<Assignment> {
  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
        *,
        course(*)
        `,
    )
    .eq("id", id) // Use ISO formatted date
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignment: ", error);
    throw error;
  }

  return data[0];
}

export async function deleteAssignment(id: number) {
  const { data, error } = await supabase
    .from("assignments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting assignment: ", error);
    throw error;
  }
}
