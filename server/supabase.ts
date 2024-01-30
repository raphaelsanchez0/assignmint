import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xmocjymusxbarcghxjqr.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is not set");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
