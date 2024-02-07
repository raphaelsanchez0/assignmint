"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const supabase = createClientComponentClient();

  const redirectURL = `${location.origin}/auth/callback`;

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
      options: {
        emailRedirectTo: ``,
        data: {
          name: newUser.name,
        },
      },
    });
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      router.push("/account/check-email");
    }
  };
  return (
    <Card>
      <CardHeader className="text-center">Sign Up</CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-xl font-semibold">
                Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={newUser.name}
                onChange={(e) =>
                  setNewUser((prevNewUser) => ({
                    ...prevNewUser,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-xl font-semibold">
                Email
              </Label>
              <Input
                id="name"
                placeholder="johndoe@example.com"
                required
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prevNewUser) => ({
                    ...prevNewUser,
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
                required
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((prevNewUser) => ({
                    ...prevNewUser,
                    password: e.target.value,
                  }))
                }
              />
            </div>

            <Button
              className="btn font-semibold text-lg"
              type="submit"
              onClick={(e) => handleSignUp(e)}
            >
              Sign Up
            </Button>

            <div className="text-center ">
              <p className="text-gray-500">
                Already have an account?
                <Link
                  href="/account/login"
                  className="underline underline-offset-2 ml-1"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
