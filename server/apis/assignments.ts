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
    .eq("dueDate", currentDateIso) // Use ISO formatted date
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
}

export async function getDueTomorrowAssignments() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
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
    .eq("dueDate", currentDateIso) // Use ISO formatted date
    .order("dueDate", { ascending: true });

  if (error) {
    console.error("Error getting assignments: ", error);
    throw error;
  }
  return data;
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
