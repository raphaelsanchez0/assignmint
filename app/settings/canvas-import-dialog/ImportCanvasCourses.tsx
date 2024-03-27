"use client";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { CoursesDataTable } from "./CoursesDataTable";
import { CanvasCourses, columns } from "./columns";
import { useEffect, useState } from "react";
import { getAllCanvasCourses } from "@/server/canvasAPI";

export function ImportCanvasCourses() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["canvas-assignments"],
    queryFn: getAllCanvasCourses,
  });
  if (data) console.log(data);

  if (isLoading) return <DialogContent>Loading...</DialogContent>;

  return (
    <DialogContent>
      <DialogHeader>Import Canvas Courses</DialogHeader>
      <CoursesDataTable columns={columns} data={data || []} />
    </DialogContent>
  );
}

export default ImportCanvasCourses;
