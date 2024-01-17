import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
export default function SignUp() {
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
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-xl font-semibold">
                Email
              </Label>
              <Input id="name" placeholder="johndoe@example.com" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-xl font-semibold">
                Password
              </Label>
              <Input id="name" required type="password" />
            </div>
            <Button className="btn font-semibold text-lg" type="submit">
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
