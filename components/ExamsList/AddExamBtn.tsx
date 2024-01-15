import React from "react";
import Link from "next/link";

export default function AddAssignmentBtn() {
  return (
    <>
      <Link href="/dashboard?addexam=y">
        <button className="btn">Add</button>
      </Link>
    </>
  );
}
