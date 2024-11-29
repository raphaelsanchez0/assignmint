import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
                 bg-gradient-to-br from-green-400 to-green-950 "
    >
      <div className="lg:w-3/12 lg:grow-0 lg:m-0 w-full grow m-3">
        <Card className="w-full p-2">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to log in to view this page. Please sign in or create an
              account to continue.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-start gap-2">
            <Link href="/login?login=true">
              <Button>Log in</Button>
            </Link>
            <Link href="/login">
              <Button>Sign Up</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
