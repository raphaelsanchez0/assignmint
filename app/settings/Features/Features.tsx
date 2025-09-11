import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Features() {
  return (
    <Card className="flex flex-col gap-2">
      <CardTitle>Changelog + Upcoming</CardTitle>
      <CardDescription>
        Here are some features that I am working on:
      </CardDescription>
      <ul className="list-disc pl-5">
        <li>Progress slider for assignments</li>
        <li>
          Assignment/Exam history page and "Completed Today" tab in Dashboard
        </li>
      </ul>
      <CardDescription>Where is what we just added:</CardDescription>
      <ul className="list-disc pl-5">
        <li>Fix: View Assignments/Exams popup shows notes - 9/10</li>
      </ul>
      <CardDescription>
        Please bear with me, I'm just one guy! More help coming soon. Stay
        tuned!
      </CardDescription>
    </Card>
  );
}
