"use client";

import { Button } from "@/components/ui/button";
import getURL from "@/utils/getURL";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";

export default function OAuthForm() {
  const supabase = createSupabaseFrontendClient();
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button className="w-full" onClick={loginWithGoogle}>
      Login with Google
    </Button>
  );
}
