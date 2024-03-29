import React from "react";

export default function ImportCanvasTableHeader() {
  return (
    <div className="grid grid-cols-10 items-center justify-items-center h-12">
      <div className="col-span-1 font-bold">Import?</div>
      <div className="col-span-5 font-bold">Canvas Course Name</div>
      <div className="col-span-4 font-bold">AssignMint Course Name</div>
    </div>
  );
}
