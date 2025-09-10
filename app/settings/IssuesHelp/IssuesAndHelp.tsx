import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import React from "react";

export default function IssuesAndHelp() {
  return (
    <Card className="flex flex-col gap-2">
      <CardTitle>Feedback + Suggestions</CardTitle>
      <CardDescription>
        I am always trying to make AssignMint better! If you have any feedback,
        bugs, or feature requests, please don't hesitate to reach out:
      </CardDescription>
      <CardDescription className="font-bold">
        sanchezraphael0@gmail.com
      </CardDescription>
    </Card>
  );
}
