"use client";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { CoursesDataTable } from "./CoursesDataTable";
import { CanvasCourses, columns } from "./columns";
import { useEffect, useState } from "react";
import { getAllCanvasCourses } from "@/server/canvasAPIActions";
import {
  fetchAssignments,
  getPriorityAssignments,
} from "@/server/apis/assignments";
import { getCourses } from "@/server/actions";

export function ImportCanvasCoursesDialog() {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["canvasAssignments"],
  //   queryFn: getCourses,
  // });
  // if (data) console.log(data);
  // if (error) console.log(error);

  // if (isLoading) return <DialogContent>Loading...</DialogContent>;
  useEffect(() => {
    async function fetchData() {
      const courses = await getCourses();
      console.log(courses);
    }
    fetchData();
  });

  return (
    <DialogContent>
      {/* <DialogHeader>Import Canvas Courses</DialogHeader>
      <CoursesDataTable columns={columns} data={data || []} /> */}
    </DialogContent>
  );
}

export default ImportCanvasCoursesDialog;
