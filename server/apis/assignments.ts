//import supabase from "@/server/supabase";

import { createServerClient, type CookieOptions } from "@supabase/ssr";

import { cookies } from "next/headers";

import supabase from "@/server/supabase";

import { createSupabaseFrontendClient } from "@/server/supabaseClients";

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
  console.log(data);

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
