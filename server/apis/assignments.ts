import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import {
  addDays,
  addWeeks,
  differenceInDays,
  endOfWeek,
  formatISO,
  startOfDay,
  startOfToday,
  startOfWeek,
  sub,
  subDays,
} from "date-fns";

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
  const today = startOfToday();
  const year = 365;

  return await fetchAssignments({
    comparison: "lt",
    baseDate: today,
  });
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
/**
 * Gets assignments due today
 * @returns Assignments due today
 */
export async function getDueTodayAssignments() {
  return await fetchAssignments({});
}

/**
 * Gets assignments due tomorrow
 * @returns Assignments due tomorrow
 */
export async function getDueTomorrowAssignments() {
  return await fetchAssignments({ offsetDays: 1 });
}

/**
 * Gets assignments due this week, but excludes assignments due today and
 * tomorrow, as they are already shown.
 * @returns
 */
export async function getThisWeekAssignments(): Promise<Assignment[]> {
  const todayAndTomorrowOffset = 2;
  const startDate = startOfDay(addDays(new Date(), todayAndTomorrowOffset));

  const endOfWeekOffset = 4;
  const endDate = startOfDay(addDays(startDate, endOfWeekOffset));

  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
      *,
      course(*)
    `,
    )
    .gte("dueDate", formatISO(startDate))
    .lte("dueDate", formatISO(endDate))
    .order("dueDate", { ascending: true });

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
}

export async function getNextWeekAssignments() {
  const oneWeek = 1;
  const startOfNextWeek = startOfDay(addWeeks(new Date(), oneWeek));

  const oneDay = 1;
  const endOfNextWeek = subDays(
    startOfDay(addWeeks(startOfNextWeek, oneWeek)),
    oneDay,
  );
  console.log(startOfNextWeek, endOfNextWeek);

  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
      *,
      course(*)
    `,
    )
    .gte("dueDate", formatISO(startOfNextWeek))
    .lte("dueDate", formatISO(endOfNextWeek))
    .order("dueDate", { ascending: true });

  if (error) {
    console.log(error);
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

export async function fetchAssignmentsInRange(startDate: Date, endDate: Date) {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  const startIsoDate = startDate.toISOString();
  const endIsoDate = endDate.toISOString();

  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
      *,
      course(*)
    `,
    )
    .gte("dueDate", startIsoDate)
    .lte("dueDate", endIsoDate)
    .order("dueDate", { ascending: true });

  if (error) {
    console.log(error);
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
