"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseFrontendClient } from "@/utils/supabase/supabaseFrontendClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { login } from "./action";

export default function Login() {
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false); // [1
  const supabase = createSupabaseFrontendClient();
  const router = useRouter();

  return (
    <Card>
      <CardHeader>Login</CardHeader>
      <CardContent>
        <form action={login}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-xl font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter Email"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-xl font-semibold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter Password"
                type="password"
              />
            </div>
            <Button className="btn font-semibold text-lg">Login</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
