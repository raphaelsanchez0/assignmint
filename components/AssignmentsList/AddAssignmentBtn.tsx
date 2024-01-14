"use client";
import React from "react";
import Link from "next/link";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AddAssignmentDialogTransition from "../dialogs/addEvent/AddAssigmentDialogTransition";

export default function AddAssignmentBtn() {
  return (
    <>
      {/* <Link href="/dashboard?addassignment=y"> */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="btn">Add</button>
        </DialogTrigger>
        <AddAssignmentDialogTransition />
      </Dialog>
      {/* </Link> */}
    </>
  );
}
