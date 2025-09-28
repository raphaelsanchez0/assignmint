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
        <li>Detailed Assignment/Exam history page</li>
        <li>
          Day in calendar page uses colors on day to show if an event is
          happening
        </li>
      </ul>
      <CardDescription>Where is what we just added:</CardDescription>
      <ul className="list-disc pl-5">
        <li>
          "Completed Today" under Assignments in Dashboard and restore
          assignment feature - 9/24
        </li>
        <li>Fix: View Assignments/Exams popup shows notes - 9/10</li>
      </ul>
      <CardDescription>
        Please bear with us, we are just two students who work on this in our
        free time! More help coming soon. Stay tuned!
      </CardDescription>
    </Card>
  );
}
