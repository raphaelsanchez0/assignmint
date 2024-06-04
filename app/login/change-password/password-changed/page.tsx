import LoadingCard from "@/components/Loading/LoadingCard";
import React, { Suspense } from "react";
import ChangePasswordForm from "../ChangePasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ConfirmPasswordChanged() {
  return (
    <Card>
      <CardTitle>Password Changed</CardTitle>
      <CardDescription className="py-2">
        Password has been changed successfully.
      </CardDescription>

      <Link className="btn" href="/login?login=true">
        Go to Login
      </Link>
    </Card>
  );
}
