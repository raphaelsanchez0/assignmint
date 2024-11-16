import React from "react";
import Assignment from "./Assignment";
import { Card, CardTitle } from "@/components/ui/card";

export default function Date({
  date,
  assignments,
}: {
  date: string;
  assignments: string[];
}) {
  return (
    <Card className="mb-2">
      <CardTitle className="mb-2">{date}</CardTitle>
      {assignments.map((assignment, index) => (
        <Assignment key={index} name={assignment} />
      ))}
    </Card>
  );
}
