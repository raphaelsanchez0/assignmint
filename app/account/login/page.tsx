"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
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
            <Button className="btn font-semibold text-lg" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
