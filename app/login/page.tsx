"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";

export default function AuthForm() {
  const router = useSearchParams();

  const login = router.get("login");

  const tab = login === "true" ? "signIn" : "signUp";

  return (
    <Card className="w-full p-4">
      <Tabs defaultValue="signUp" className="w-full" value={tab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
        </TabsList>
        <TabsContent value="signUp">
          <SignUpForm />{" "}
        </TabsContent>
        <TabsContent value="signIn">
          <SignInForm />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
