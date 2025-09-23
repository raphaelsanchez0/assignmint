import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { z } from "zod";

const supabase = createSupabaseFrontendClient();

export async function checkIfEventsOnDate(date:Date)
{
  //Get all exams/assignments on date
  //Make a hashmap of courses with event on date
  //Convert the hashmap back into a list w/ course ids
  //return that list w/ only colors
}
