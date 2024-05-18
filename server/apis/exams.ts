//import supabase from "@/server/supabase";
import { QueryClient } from "@tanstack/react-query";
import { createSupabaseFrontendClient } from "../../utils/supabase/supabaseFrontendClient";

export async function getExams() {
  const supabase = createSupabaseFrontendClient();
  const { data: exams, error } = await supabase.from("exams").select(`
      *,
      course(*)
      `);

  if (error) {
    console.error("Error getting exams: ", error);
    throw error;
  }
  exams.sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime(),
  );
  return exams || [];
}

export async function getExam(id: string): Promise<Exam> {
  const supabase = createSupabaseFrontendClient();
  const { data, error } = await supabase
    .from("exams")
    .select(
      `
        *,
        course(*)
        `,
    )
    .eq("id", id); // Use ISO formatted date

  if (error) {
    console.error("Error getting exam: ", error);
    throw error;
  }
  return data[0];
}

export async function deleteExam(id: number) {
  const supabase = createSupabaseFrontendClient();
  const { data, error } = await supabase.from("exams").delete().eq("id", id);

  if (error) {
    console.error("Error deleting exam: ", error);
    throw error;
  }
}
