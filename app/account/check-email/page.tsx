import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function page() {
  return (
    <Card>
      <CardHeader className="text-center">Verify your email</CardHeader>
      <CardContent className="text-center">
        Please verify your email using the email we just sent you
      </CardContent>
    </Card>
  );
}
