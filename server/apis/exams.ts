import supabase from "@/server/supabase";

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
  return exams || [];
}

export async function getExam(id: number) {
  const { data, error } = await supabase
    .from("exams")
    .select(
      `
        *,
        course(*)
        `,
    )
    .eq("id", id) // Use ISO formatted date
    .order("dueDate", { ascending: true });
}