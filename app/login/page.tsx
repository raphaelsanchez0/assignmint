"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingListShorter from "@/components/Loading/LoadingListShorter";
import LoginCard from "./LoginCard";

export default function AuthForm() {
  return (
    <Suspense fallback={<LoadingListShorter />}>
      <LoginCard />
    </Suspense>
  );
}
