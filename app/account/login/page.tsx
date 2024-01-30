"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false); // [1
  const supabase = createSupabaseFrontendClient();
  const router = useRouter();

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (data) {
      router.push("/dashboard");
    }
    if (error) {
      console.log(error.cause);
    }
  };
  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-xl font-semibold">
                Email
              </Label>
              <Input
                id="name"
                placeholder="Enter Email"
                type="text"
                value={user.email}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-xl font-semibold">
                Password
              </Label>
              <Input
                id="name"
                placeholder="Enter Password"
                type="password"
                value={user.password}
                onChange={(e) =>
                  setUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              className="btn font-semibold text-lg"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
