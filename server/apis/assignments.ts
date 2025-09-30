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
import { addYearToDate } from "@/utils/addYearToDate/addYearToDate";
import { progress } from "framer-motion";

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
    .eq("completed", false)
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
    .eq("completed", false)
    .order("dueDate", { ascending: true });

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
}

export async function getFutureAssignments() {
  const twoWeeks = 2;
  const startDate = startOfDay(addWeeks(new Date(), twoWeeks));

  const { data, error } = await supabase
    .from("assignments")
    .select(
      `
      *,
      course(*)
    `,
    )
    .gte("dueDate", formatISO(startDate))
    .eq("completed", false)
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
  isCompleted? :boolean
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
  isCompleted = false
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
    ).eq("completed", isCompleted)
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

  console.log(data)

  if (error) {
    console.error("Error getting assignments:", error);
    throw error;
  }

  return data;
}

export async function fetchAssignmentsCompletedToday(date:Date): Promise<Assignment[]>
{
  //Adjusts date to fix time
  const formattedDate = date.toISOString().split("T")[0];

  let query = supabase
  .from("assignments")
  .select(
      `
      *,
      course(*)
    `,
  )
  .eq("completed", true)
  .eq("completedDate", formattedDate)
  .order("completedDate", { ascending: true });

  const {data, error} = await query;

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

export async function getAssignment(id: string): Promise<Assignment> {
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

export async function deleteAssignment(id: string) {
  const { data, error } = await supabase
    .from("assignments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting assignment: ", error);
    throw error;
  }
}

export async function completeAssignment(id:string)
{
  const {data, error} = await supabase
  .from("assignments")
  .update({completed:true, completedDate: new Date().toISOString()})
  .eq("id",id)
}

export async function restoreAssignment(id:string)
{
  const ZERO_PERCENT = 0;
  const {data, error} = await supabase
  .from("assignments")
  .update({completed:false, completedDate: null, progress: ZERO_PERCENT})
  .eq("id",id);
}

export async function modifyAssignmentProgress(id: string, newProgress: number)
{
  const COMPLETE_PROGRESS = 100;
  if(newProgress >= COMPLETE_PROGRESS)
  {
    await supabase
    .from("assignments")
    .update({
      completed: true,
      completedDate: new Date().toISOString(),
      progress: null,
    })
    .eq("id", id);
  }
  else{
    await supabase
    .from("assignments")
    .update({ progress: newProgress })
    .eq("id", id);
  }
}

export async function hasActiveAssignments(): Promise<boolean> {
  const { data, error } = await supabase
    .from("assignments")
    .select("id")
    .eq("completed", false)
    .limit(1);

  if (error) {
    throw error;
  }

  return data.length > 0;
}

export async function importAssignmentsToPlanner(assignments: {[key: string]: CanvasImportAssignment}){
  for (const [key, assignment] of Object.entries(assignments)) {
    if(assignment.importToPlanner)
    {
      const dueDateObject = new Date(assignment.dueDate);
      const dateWithYear = addYearToDate(dueDateObject)
      const formattedDueDate = formatISO(dateWithYear);

      const { error } = await supabase
        .from('assignments')
        .insert({
          title: assignment.title,
          dueDate: formattedDueDate,
          course: assignment.selectedCourseID,
          priority:false,
        });

        
    }
  }
}


