//import supabase from "@/server/supabase";
import { QueryClient } from "@tanstack/react-query";
import { createSupabaseFrontendClient } from "../../utils/supabase/supabaseFrontendClient";

const queryClient = new QueryClient();

const supabase = createSupabaseFrontendClient();
export async function getExams() {
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
  console.log("test");
  return exams || [];
}

export async function getExam(id: number): Promise<Exam> {
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
  const { data, error } = await supabase.from("exams").delete().eq("id", id);

  if (error) {
    console.error("Error deleting exam: ", error);
    throw error;
  }
}
